import * as React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styled from 'styled-components/native';

import StartIcon from '../../../assets/start.svg';
import PauseIcon from '../../../assets/pause.svg';

const ButtonContainer = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #216ef7;
  border-radius: 50;
  shadow-offset: 0 5px;
  shadow-radius: 6px;
  shadow-color: #000;
  shadow-opacity: 0.3;
`;

const StartIconWrapper = styled(StartIcon)`
  margin-left: 5px;
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-size: 24px;
`;

const IconProps = {
  width: 32,
  height: 32,
  fill: '#fff',
};

interface IProps {
  name?: string;
  isTimerStarted?: boolean;
  onPress?: () => void;
}

export const Button = ({ isTimerStarted, onPress }) => {
  const handlePress = () => {
    console.log('handlePress');

    if (onPress) {
      onPress();
    }
  };

  return (
    <ButtonContainer onPress={handlePress}>
      {isTimerStarted ? (
        <PauseIcon {...IconProps} />
      ) : (
        <StartIconWrapper {...IconProps} />
      )}
    </ButtonContainer>
  );
};
