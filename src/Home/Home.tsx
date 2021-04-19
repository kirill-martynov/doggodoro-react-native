import * as React from 'react';
import { Vibration, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInSeconds, differenceInMilliseconds } from 'date-fns';

import { VIBRATE_PATTERN, DEFAULT_TIME } from './homeConstants';

import { Button } from '../Core/components/Button';
import { CircleProgress } from '../Core/components/CircleProgress';

import { Timer } from '../Timer';

import { HomeContainer, ActionsContainer, TimerContainer } from './Home.styles';

const convertMillisToMinutes = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));

  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutesString}:${secondsString}`;
};

export const Home = () => {
  const appState = React.useRef<any>(AppState.currentState);
  const interval = React.useRef<any>(null);

  const [isTimerStarted, setIsTimerStarted] = React.useState<boolean>(false);
  const [timer, setTimer] = React.useState<number>(DEFAULT_TIME);
  const [progress, setProgress] = React.useState<number>(0);

  const time = convertMillisToMinutes(timer);

  const updateTimer = () => {
    setTimer((prevState): number => {
      const timeLeft = prevState - 1000;
      const progressData = Math.abs((timeLeft * 100) / timer - 100).toFixed(2);

      setProgress(Number(progressData));

      return timeLeft;
    });
  };

  const handleStart = async () => {
    if (isTimerStarted) {
      setIsTimerStarted(false);

      setTimer(DEFAULT_TIME);
      setProgress(0);

      clearInterval(interval.current);

      return;
    }

    const startTime = new Date().toISOString();

    await AsyncStorage.setItem('@start_time', startTime);

    setIsTimerStarted(true);

    interval.current = setInterval(updateTimer, 1000);
  };

  const handleTimer = (type: string) => {
    if (isTimerStarted) {
      return;
    }

    const timerInMinutes = Math.floor(timer / 60000);
    const millisecondStep = 5 * 60000;

    const isInc = type === 'inc';
    const isDec = type === 'dec';
    const isMax = timerInMinutes === 120 && isInc;
    const isMin = timerInMinutes === 5 && isDec;

    if (isMax || isMin) {
      return;
    }

    if (isInc) {
      setTimer(timer + millisecondStep);
    }

    if (isDec) {
      setTimer(timer - millisecondStep);
    }
  };

  const handleAppStateChange = async (nextAppState: string) => {
    const isAppActive =
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active';

    if (isAppActive) {
      const elapsedTime = await getElapsedTime();
      const updateTime = elapsedTime < 0 ? DEFAULT_TIME : elapsedTime;

      console.log('elapseTime', elapsedTime);

      setTimer(updateTime);
    }

    appState.current = nextAppState;
  };

  const getElapsedTime = async () => {
    try {
      const startTime = await AsyncStorage.getItem('@start_time');
      const now = new Date();

      const elapsedTime = differenceInMilliseconds(now, Date.parse(startTime!));

      return timer - elapsedTime;
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (progress > 100) {
      clearInterval(interval.current);

      Vibration.vibrate(VIBRATE_PATTERN, false);

      setIsTimerStarted(false);
      setTimer(DEFAULT_TIME);
      setProgress(0);
    }
  }, [progress]);

  React.useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return (
    <HomeContainer>
      <TimerContainer>
        <CircleProgress percentage={progress} color="#216EF7" />
        <Timer time={time} onPress={handleTimer} />
      </TimerContainer>

      <ActionsContainer>
        <Button isTimerStarted={isTimerStarted} onPress={handleStart} />
      </ActionsContainer>
    </HomeContainer>
  );
};
