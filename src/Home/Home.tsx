import * as React from 'react';
import { Vibration } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

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
  const interval = React.useRef<any>(null);

  const [isTimerStarted, setIsTimerStarted] = React.useState<boolean>(false);
  const [timer, setTimer] = React.useState<number>(DEFAULT_TIME);
  const [progress, setProgress] = React.useState<number>(0);

  const time = convertMillisToMinutes(timer);

  React.useEffect(() => {
    if (progress > 100) {
      BackgroundTimer.stopBackgroundTimer();

      Vibration.vibrate(VIBRATE_PATTERN, false);

      setIsTimerStarted(false);
      setTimer(DEFAULT_TIME);
      setProgress(0);
    }
  }, [progress]);

  const updateTimer = () => {
    setTimer((prevState): number => {
      const timeLeft = prevState - 1000;
      const progressData = Math.abs((timeLeft * 100) / timer - 100).toFixed(2);

      setProgress(Number(progressData));

      return timeLeft;
    });
  };

  const handleStart = () => {
    if (isTimerStarted) {
      setIsTimerStarted(false);

      setTimer(DEFAULT_TIME);
      setProgress(0);

      interval.current = null;

      BackgroundTimer.stopBackgroundTimer();

      return;
    }

    setIsTimerStarted(true);

    interval.current = BackgroundTimer.runBackgroundTimer(updateTimer, 1000);
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
