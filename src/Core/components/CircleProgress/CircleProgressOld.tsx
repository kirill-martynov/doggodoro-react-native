import * as React from 'react';
import { View, Dimensions, Animated } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

interface IProps {
  progress: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircleProgress: React.FC<IProps> = ({ progress }) => {
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();

  const size = 250;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;


  React.useEffect(() => {
    animated.addListener((v) => {
  const strokeDashoffset = circumference - (circumference * progress) / 100;
    });
  }, [progress]);

  return (
    <View>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#eaeffd"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke="#216ef7"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>
    </View>
  );
};
