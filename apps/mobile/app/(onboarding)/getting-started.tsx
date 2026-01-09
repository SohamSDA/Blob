import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

export default function GettingStartedScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
        
        {/* Logo */}
        <Animated.Image
          entering={FadeInDown.duration(500)}
          source={require('../../assets/adaptive-icon.png')}
          style={{ width: 120, height: 120, marginBottom: 32 }}
          resizeMode="contain"
        />

        {/* Title */}
        <Animated.Text
          entering={FadeInDown.delay(150).duration(500)}
          style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}
        >
          Learn Smarter with <Text style={{ color: '#f97316' }}>Blob</Text>
        </Animated.Text>

        {/* Description */}
        <Animated.Text
          entering={FadeInDown.delay(300).duration(500)}
          style={{ fontSize: 14, textAlign: 'center', color: '#666', lineHeight: 22, paddingHorizontal: 20 }}
        >
          Your AI-powered study companion. Transform notes into interactive flashcards and quizzes instantly.
        </Animated.Text>
      </View>

      {/* Bottom Section */}
      <Animated.View
        entering={FadeInUp.delay(450).duration(500)}
        style={{ paddingHorizontal: 24, paddingBottom: 32 }}
      >
        <Pressable
          style={{
            backgroundColor: '#f97316',
            paddingVertical: 16,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => router.push('/(onboarding)/login')}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', marginRight: 8 }}>
            Continue
          </Text>
          <Ionicons name="arrow-forward" size={18} color="white" />
        </Pressable>

        <Text style={{ fontSize: 11, textAlign: 'center', color: '#999', marginTop: 16 }}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}
