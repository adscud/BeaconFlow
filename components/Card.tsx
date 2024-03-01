import { PropsWithChildren } from "react";
import { Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { clamp, YStack } from "tamagui";

const { width } = Dimensions.get("window");

export function Card({ children }: PropsWithChildren) {
  const cardWidth = clamp(width - 32, [0, 500]);
  const cardHeight = cardWidth / 1.586;
  const y = useSharedValue<number>(0);
  const x = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);
  const rotate = useSharedValue<number>(0);

  const panGesture = Gesture.Pan()
    .onUpdate(({ translationY, translationX }) => {
      y.value = translationY;
      x.value = translationX;
    })
    .onEnd(() => {
      y.value = withSpring(0);
      x.value = withSpring(0);
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate(({ scale: s }) => {
      scale.value = s;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((e) => {
      rotate.value = e.rotation;
    })
    .onEnd(() => {
      rotate.value = withSpring(0);
    });

  const gestures = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    rotateGesture,
  );

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: y.value },
        { translateX: x.value },
        { scale: scale.value },
        { rotateZ: `${(rotate.value / Math.PI) * 180}deg` },
      ],
    };
  });

  return (
    <GestureDetector gesture={gestures}>
      <Animated.View style={animatedCardStyle}>
        <YStack
          width={cardWidth}
          height={cardHeight}
          opacity={1}
          mx="auto"
          borderRadius="$4"
          backgroundColor="$purple10"
          shadowColor="$purple8"
          shadowOpacity={1}
          shadowRadius={20}
          shadowOffset={{ width: 0, height: 10 }}
          enterStyle={{
            y: -600,
          }}
          animation="lazy"
        >
          {children}
        </YStack>
      </Animated.View>
    </GestureDetector>
  );
}
