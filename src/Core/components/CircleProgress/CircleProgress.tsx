import * as React from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const duration = 500;
const delay = 0;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface IProps {
  percentage: number;
  radius?: number;
  strokeWidth?: number;
  max?: number;
  color?: string;
}

export const CircleProgress = ({
  percentage = 0,
  max = 100,
  radius = 150,
  strokeWidth = 25,
  color = 'tomato',
}: IProps) => {
  const circleRef = React.useRef();
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  React.useEffect(() => {
    animation(percentage);
    animatedValue.addListener(
      v => {
        if (!circleRef?.current) {
          return;
        }

        const maxPercentage = (100 * v.value) / max;
        const strokeDashoffset =
          circumference - (circumference * maxPercentage) / 100;

        circleRef.current.setNativeProps({ strokeDashoffset });
      },
      [max, percentage],
    );

    return () => {
      animatedValue.removeAllListeners();
    };
  });

  const animation = (toValue: any) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            fill="transparent"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            fill="transparent"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </View>
  );
};
