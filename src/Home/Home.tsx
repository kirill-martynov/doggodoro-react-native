import * as React from 'react';
import { Vibration } from 'react-native';

import { Button } from '../Core/components/Button';
import { CircleProgress } from '../Core/components/CircleProgress';

import {
  HomeContainer,
  ActionsContainer,
  TimerContainer,
  Timer,
} from './Home.styles';

const DEFAULT_MINUTES = 0.3;
const DEFAULT_TIME = DEFAULT_MINUTES * 60000;

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

  const updateTimer = () => {
    setTimer((prevState): number => {
      if (prevState === 0) {
        clearInterval(interval.current);

        const vibratePattern = [
          200,
          200,
          200,
          400,
          400,
          400,
          600,
          600,
          800,
          800,
          1000,
          1000,
          1000,
        ];
        Vibration.vibrate(vibratePattern, false);

        setIsTimerStarted(false);
        setTimer(DEFAULT_TIME);
        setProgress(0);

        return prevState;
      }

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
      clearInterval(interval.current);

      return;
    }

    setIsTimerStarted(true);
    interval.current = setInterval(updateTimer, 1000);
  };

  return (
    <HomeContainer>
      <TimerContainer>
        <CircleProgress percentage={progress} color="#216EF7" />
        <Timer>{time}</Timer>
      </TimerContainer>
      <ActionsContainer>
        <Button isTimerStarted={isTimerStarted} onPress={handleStart} />
      </ActionsContainer>
    </HomeContainer>
  );
};
