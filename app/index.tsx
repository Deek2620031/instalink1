import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function Welcome() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/onboarding');
  };

  return (
    <LinearGradient
      colors={['#2D3250', '#424769', '#7077A1']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View entering={FadeIn.delay(300).duration(1000)} style={styles.logoContainer}>
          <Text style={styles.logo}>InstaLink</Text>
          <Text style={styles.tagline}>Connect. Create. Collaborate.</Text>
        </Animated.View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 100,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'Poppins-Bold',
    fontSize: 48,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 16,
  },
  loginButton: {
    backgroundColor: '#F6B17A',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#2D3250',
  },
});