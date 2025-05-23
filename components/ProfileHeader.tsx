import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export function ProfileHeader() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity style={styles.settingsButton}>
        <Settings size={24} color="#1F2937" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#1F2937',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});