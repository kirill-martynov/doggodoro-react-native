import * as React from 'react';

import { ButtonContainer, ButtonText } from './Button.styles';

interface IProps {
  name?: string;
  isTimerStarted?: boolean;
  onPress?: () => void;
}

export const Button = ({ isTimerStarted, onPress }: IProps) => {
  const handlePress = () => {
    if (!onPress) {
      return;
    }

    onPress();
  };

  return (
    <ButtonContainer onPress={handlePress}>
      <ButtonText>{isTimerStarted ? 'Cancel' : 'Start'}</ButtonText>
    </ButtonContainer>
  );
};
