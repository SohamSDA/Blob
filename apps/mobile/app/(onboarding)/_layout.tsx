import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: isDark ? '#000000' : '#ffffff',
          },
          headerTintColor: isDark ? '#ffffff' : '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="getting-started"
          options={{
            title: 'Welcome to Blob',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: 'Login',
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
