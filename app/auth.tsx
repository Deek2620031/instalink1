import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Mail, Lock, ArrowLeft, UserCheck } from 'lucide-react-native';

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    // In a real app, we would handle authentication here
    // For now, we'll just navigate to the main app
    router.replace('/(tabs)');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSocialAuth = (provider: string) => {
    // In a real app, we would handle social authentication here
    console.log(`Authenticating with ${provider}`);
    router.replace('/(tabs)');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={['#8A2BE2', '#4B0082', '#191970']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeIn.delay(300).duration(800)} style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>InstaLink</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Log in to access your account' : 'Sign up to start networking'}
          </Text>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <UserCheck size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#6B7280"
                value={name}
                onChangeText={setName}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Mail size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#6B7280"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#6B7280"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {isLogin && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {isLogin ? 'Log In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialAuth('Google')}
            >
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialAuth('LinkedIn')}
            >
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' }}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={toggleAuthMode}>
              <Text style={styles.toggleButton}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    marginTop: 20,
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 28,
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8A2BE2',
  },
  submitButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginHorizontal: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toggleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  toggleButton: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8A2BE2',
  },
});