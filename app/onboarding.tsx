import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { Users, Brain, Briefcase, Heart, Sparkles, Moon, Coffee } from 'lucide-react-native';

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

const PERSONAL_DETAILS = [
  { id: 'age', label: 'Age', type: 'number' },
  { id: 'profession', label: 'Profession', type: 'text' },
];

const SLEEP_CYCLE = [
  'Before 10 PM',
  '10 PM - 12 AM',
  '12 AM - 2 AM',
  'After 2 AM'
];

const MEAL_FREQUENCY = [
  '1-2 meals per day',
  '3 meals per day',
  '4-5 meals per day',
  'More than 5 meals per day'
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [personalDetails, setPersonalDetails] = useState({
    age: '',
    profession: '',
    sleepCycle: '',
    mealFrequency: '',
  });
  const router = useRouter();

  const handleNext = () => {
    if (currentStep === 0 && !selectedPurpose) {
      return;
    }

    if (selectedPurpose === 'help') {
      if (currentStep < PERSONALITY_QUESTIONS.length + 3) { // +3 for personal details, sleep, and meal
        setCurrentStep(currentStep + 1);
      } else {
        router.push('/auth');
      }
    } else {
      router.push('/auth');
    }
  };

  const renderContent = () => {
    if (currentStep === 0) {
      return renderPurposeSelection();
    }

    if (selectedPurpose === 'help') {
      if (currentStep <= PERSONALITY_QUESTIONS.length) {
        return renderPersonalityQuestion();
      } else if (currentStep === PERSONALITY_QUESTIONS.length + 1) {
        return renderPersonalDetails();
      } else if (currentStep === PERSONALITY_QUESTIONS.length + 2) {
        return renderSleepCycle();
      } else {
        return renderMealFrequency();
      }
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
            color={selectedPurpose === option.id ? '#FFFFFF' : '#1B4D3E'}
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
        <Brain size={48} color="#1B4D3E" style={styles.questionIcon} />
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

  const renderPersonalDetails = () => (
    <View style={styles.detailsContainer}>
      <Text style={styles.question}>Tell us about yourself</Text>
      {PERSONAL_DETAILS.map((detail) => (
        <View key={detail.id} style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{detail.label}</Text>
          <TextInput
            style={styles.input}
            value={personalDetails[detail.id]}
            onChangeText={(text) => setPersonalDetails({ ...personalDetails, [detail.id]: text })}
            keyboardType={detail.type === 'number' ? 'numeric' : 'default'}
            placeholder={`Enter your ${detail.label.toLowerCase()}`}
          />
        </View>
      ))}
    </View>
  );

  const renderSleepCycle = () => (
    <View style={styles.questionContainer}>
      <Moon size={48} color="#1B4D3E" style={styles.questionIcon} />
      <Text style={styles.question}>What's your typical bedtime?</Text>
      <View style={styles.optionsContainer}>
        {SLEEP_CYCLE.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              personalDetails.sleepCycle === time && styles.selectedOption
            ]}
            onPress={() => setPersonalDetails({ ...personalDetails, sleepCycle: time })}
          >
            <Text
              style={[
                styles.optionText,
                personalDetails.sleepCycle === time && styles.selectedOptionText
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderMealFrequency = () => (
    <View style={styles.questionContainer}>
      <Coffee size={48} color="#1B4D3E" style={styles.questionIcon} />
      <Text style={styles.question}>How many meals do you typically have per day?</Text>
      <View style={styles.optionsContainer}>
        {MEAL_FREQUENCY.map((frequency, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              personalDetails.mealFrequency === frequency && styles.selectedOption
            ]}
            onPress={() => setPersonalDetails({ ...personalDetails, mealFrequency: frequency })}
          >
            <Text
              style={[
                styles.optionText,
                personalDetails.mealFrequency === frequency && styles.selectedOptionText
              ]}
            >
              {frequency}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const totalSteps = selectedPurpose === 'help' 
    ? PERSONALITY_QUESTIONS.length + 3 
    : 1;

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
          {renderContent()}
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: `${((currentStep + 1) / totalSteps) * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} of {totalSteps}
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
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
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
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  questionIcon: {
    marginBottom: 24,
  },
  question: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#1B4D3E',
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
    backgroundColor: '#1B4D3E',
  },
  purposeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1B4D3E',
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
    backgroundColor: '#1B4D3E',
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1B4D3E',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1B4D3E',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1B4D3E',
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
    backgroundColor: '#1B4D3E',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1B4D3E',
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