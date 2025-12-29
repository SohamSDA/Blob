import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const FLOW_STEPS = [
  { icon: 'bulb-outline' as const, label: 'Give a Topic' },
  { icon: 'sparkles-outline' as const, label: 'AI Generates Material' },
  { icon: 'fitness-outline' as const, label: 'Practice' },
  { icon: 'trophy-outline' as const, label: 'Ace It!' },
];

export default function LoginScreen() {
  const { width } = useWindowDimensions();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const flowFade = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.95)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(titleFade, {
        toValue: 1,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(flowFade, {
        toValue: 1,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleGoogleSignIn = () => {
    // UI only - authentication will be implemented separately
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-950" edges={['top', 'left', 'right']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-between px-6 py-8"
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Animated.View
          className="flex-1 justify-center"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}>
          <Animated.View style={{ opacity: titleFade }}>
            <Text className="mb-2 text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              How <Text className="text-orange-500">Blob</Text> Works
            </Text>
            <Text className="mb-8 text-center text-base text-gray-500 dark:text-gray-400">
              Your AI-powered study companion
            </Text>
          </Animated.View>

          <Animated.View style={{ opacity: flowFade }} className="mb-6">
            {FLOW_STEPS.map((step, index) => (
              <View key={step.label} className="items-center">
                <View className="flex-row items-center w-full px-4">
                  <View className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 items-center justify-center">
                    <Ionicons name={step.icon} size={24} color="#f97316" />
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-base font-semibold text-gray-800 dark:text-gray-200">
                      {step.label}
                    </Text>
                  </View>
                  <Text className="text-orange-500 font-bold text-lg">{index + 1}</Text>
                </View>
                {index < FLOW_STEPS.length - 1 && (
                  <View className="w-0.5 h-6 bg-orange-200 dark:bg-orange-800 ml-6 self-start left-5" />
                )}
              </View>
            ))}
          </Animated.View>
        </Animated.View>

        <Animated.View
          className="mt-6"
          style={{ transform: [{ scale: buttonScale }], opacity: buttonOpacity }}>
          <Pressable
            className="mb-4 h-14 flex-row items-center justify-center rounded-2xl bg-white border border-gray-300 shadow-sm active:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:active:bg-gray-800"
            onPress={handleGoogleSignIn}>
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text className="ml-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Continue with Google
            </Text>
          </Pressable>

          <Text className="px-4 text-center text-xs leading-5 text-gray-400 dark:text-gray-500">
            By continuing, you agree to our Terms and Privacy Policy
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
