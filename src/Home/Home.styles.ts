import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export const HomeContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TimerContainer = styled(View)`
  flex: 0.8;
  align-items: center;
  justify-content: center;
`;

export const Timer = styled(Text)`
  margin-top: 50px;
  font-size: 52px;
  font-weight: bold;
`;

export const ActionsContainer = styled(View)`
  margin-top: auto;
`;
