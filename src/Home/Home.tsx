import * as React from 'react';
import { Vibration, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInMilliseconds } from 'date-fns';

import { VIBRATE_PATTERN, DEFAULT_TIME } from './homeConstants';
import { convertMillisToMinutes, calculateProgress } from './homeHelpers';

import { Button } from '../Core/components/Button';
import { CircleProgress } from '../Core/components/CircleProgress';

import { Timer } from '../Timer';

import { HomeContainer, ActionsContainer, TimerContainer } from './Home.styles';

export const Home = () => {
  const appState = React.useRef<any>(AppState.currentState);
  const interval = React.useRef<any>(null);

  const [isTimerStarted, setIsTimerStarted] = React.useState<boolean>(false);
  const [timer, setTimer] = React.useState<number>(DEFAULT_TIME);
  const [progress, setProgress] = React.useState<number>(0);

  const time = convertMillisToMinutes(timer);

  const setDefaults = () => {
    setIsTimerStarted(false);
    setProgress(0);
    setTimer(DEFAULT_TIME);
  };

  const updateTimer = () => {
    setTimer(prevState => {
      if (prevState <= 0) {
        clearInterval(interval.current);

        interval.current = null;

        Vibration.vibrate(VIBRATE_PATTERN, false);

        setDefaults();

        return prevState;
      }

      const timeLeft = prevState - 1000;
      const progressValue = calculateProgress(timeLeft, timer);

      setProgress(Number(progressValue));

      return timeLeft;
    });
  };

  const onPressStart = async () => {
    if (isTimerStarted) {
      setIsTimerStarted(false);

      setTimer(DEFAULT_TIME);
      setProgress(0);

      clearInterval(interval.current);

      interval.current = null;

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

    if (isAppActive && interval.current) {
      const elapsedTime = await getElapsedTime();

      if (elapsedTime <= 0 && interval.current) {
        clearInterval(interval.current);

        interval.current = null;

        setProgress(100);
        setTimer(0);

        return;
      }

      setProgress(Number(calculateProgress(elapsedTime, timer)));
      setTimer(elapsedTime);
    }

    appState.current = nextAppState;
  };

  const getElapsedTime = async () => {
    try {
      const startTime = await AsyncStorage.getItem('@start_time');
      const now = new Date();

      const differenceInMillis = differenceInMilliseconds(
        now,
        Date.parse(startTime!),
      );
      const elapsedTime = timer - differenceInMillis;

      return Math.round(elapsedTime / 1000) * 1000;
    } catch (error) {
      console.error(error);

      return 0;
    }
  };

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
        <Button isTimerStarted={isTimerStarted} onPress={onPressStart} />
      </ActionsContainer>
    </HomeContainer>
  );
};
