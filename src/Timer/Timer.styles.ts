import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
`;

export const TimeText = styled(Text)`
  width: 200px;
  font-size: 52px;
  font-weight: bold;
  text-align: center;
`;

export const TimeButton = styled(Text)`
  padding: 5px 10px;
  font-size: 42px;
  font-weight: bold;
  text-align: center;
`;
