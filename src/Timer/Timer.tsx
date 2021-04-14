import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, TimeText, TimeButton } from './Timer.styles';

interface IProps {
  time: number;
  onPress: (type: string) => void;
}

export const Timer = (props: IProps) => {
  const { time, onPress } = props;

  const handleOnPress = (type: string) => {
    if (!onPress) {
      return;
    }

    onPress(type);
  };

  return (
    <Container>
      <TouchableOpacity onPress={() => handleOnPress('dec')}>
        <TimeButton>-</TimeButton>
      </TouchableOpacity>

      <TimeText>{time}</TimeText>

      <TouchableOpacity onPress={() => handleOnPress('inc')}>
        <TimeButton>+</TimeButton>
      </TouchableOpacity>
    </Container>
  );
};
