import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { Users, Brain, Briefcase, Heart, Sparkles } from 'lucide-react-native';

const PURPOSE_OPTIONS = [
  { id: 'help', label: 'Seek Professional Help', icon: Heart },
  { id: 'network', label: 'Network with Other Professionals', icon: Users },
  { id: 'job', label: 'Find Job Opportunities', icon: Briefcase },
];

const PERSONALITY_QUESTIONS = [
  {
    question: 'How do you typically handle stressful situations?',
    options: [
      'I prefer to process things internally',
      'I seek support from others',
      'I take immediate action',
      'I analyze and plan before acting'
    ]
  },
  {
    question: 'What environment helps you feel most comfortable?',
    options: [
      'Quiet and peaceful spaces',
      'Social and interactive settings',
      'Organized and structured environments',
      'Creative and flexible spaces'
    ]
  },
  {
    question: 'How do you prefer to communicate with others?',
    options: [
      'Direct and straightforward',
      'Empathetic and supportive',
      'Analytical and detailed',
      'Creative and expressive'
    ]
  },
  {
    question: 'What motivates you to seek support?',
    options: [
      'Personal growth and development',
      'Overcoming specific challenges',
      'Building better relationships',
      'Professional development'
    ]
  },
  {
    question: 'How do you prefer to learn and process information?',
    options: [
      'Through reading and reflection',
      'Through discussion and interaction',
      'Through practical experience',
      'Through visual and creative methods'
    ]
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep === 0 && !selectedPurpose) {
      return; // Don't proceed without purpose selection
    }

    if (currentStep < PERSONALITY_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Analysis complete, proceed to auth
      router.push('/auth');
    }
  };

  const renderPurposeSelection = () => (
    <View style={styles.purposeContainer}>
      <Text style={styles.question}>What brings you to InstaLink?</Text>
      {PURPOSE_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.purposeOption,
            selectedPurpose === option.id && styles.selectedPurpose
          ]}
          onPress={() => setSelectedPurpose(option.id)}
        >
          <option.icon
            size={24}
            color={selectedPurpose === option.id ? '#FFFFFF' : '#2D3250'}
          />
          <Text
            style={[
              styles.purposeText,
              selectedPurpose === option.id && styles.selectedPurposeText
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderPersonalityQuestion = () => {
    const question = PERSONALITY_QUESTIONS[currentStep - 1];
    return (
      <View style={styles.questionContainer}>
        <Brain size={48} color="#2D3250" style={styles.questionIcon} />
        <Text style={styles.question}>{question.question}</Text>
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                answers[currentStep - 1] === option && styles.selectedOption
              ]}
              onPress={() => {
                const newAnswers = [...answers];
                newAnswers[currentStep - 1] = option;
                setAnswers(newAnswers);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  answers[currentStep - 1] === option && styles.selectedOptionText
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInRight}
          exiting={FadeOutLeft}
          style={styles.content}
        >
          {currentStep === 0 ? renderPurposeSelection() : renderPersonalityQuestion()}
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: `${((currentStep + 1) / (PERSONALITY_QUESTIONS.length + 1)) * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} of {PERSONALITY_QUESTIONS.length + 1}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            currentStep === 0 && !selectedPurpose && styles.buttonDisabled
          ]}
          onPress={handleNext}
          disabled={currentStep === 0 && !selectedPurpose}
        >
          <Text style={styles.buttonText}>
            {currentStep === PERSONALITY_QUESTIONS.length ? 'Complete' : 'Next'}
          </Text>
          <Sparkles size={20} color="#FFFFFF" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  purposeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionIcon: {
    marginBottom: 24,
  },
  question: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#2D3250',
    textAlign: 'center',
    marginBottom: 32,
  },
  purposeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    marginBottom: 16,
  },
  selectedPurpose: {
    backgroundColor: '#2D3250',
  },
  purposeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#2D3250',
    marginLeft: 16,
  },
  selectedPurposeText: {
    color: '#FFFFFF',
  },
  optionsContainer: {
    width: '100%',
  },
  option: {
    padding: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    marginBottom: 16,
  },
  selectedOption: {
    backgroundColor: '#2D3250',
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#2D3250',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  footer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2D3250',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2D3250',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});