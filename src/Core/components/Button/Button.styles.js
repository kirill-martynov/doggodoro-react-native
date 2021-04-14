import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

export const ButtonContainer = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  padding: 15px 40px;
  background-color: #216ef7;
  border-radius: 6px;
  shadow-offset: 0 5px;
  shadow-radius: 6px;
  shadow-color: #000;
  shadow-opacity: 0.3;
`;

export const ButtonText = styled(Text)`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 3px;
`;
