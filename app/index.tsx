import { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ArrowRight } from 'lucide-react-native';

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    // In a real app, we would check if the user is already logged in
    // and redirect to the main app if they are
  }, []);

  const handleGetStarted = () => {
    router.push('/auth');
  };

  return (
    <LinearGradient
      colors={['#8A2BE2', '#4B0082', '#191970']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View entering={FadeIn.delay(300).duration(1000)} style={styles.logoContainer}>
          <Text style={styles.logo}>InstaLink</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(1000)} style={styles.textContainer}>
          <Text style={styles.title}>Network Like a Pro</Text>
          <Text style={styles.subtitle}>
            Connect with professionals, showcase your skills, and discover opportunities tailored for Gen Z
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(900).duration(1000)} style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg' }}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1200).duration(1000)} style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
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
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginTop: 40,
  },
  logo: {
    fontFamily: 'Poppins-Bold',
    fontSize: 42,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
    marginVertical: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FF3366',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 8,
  },
});