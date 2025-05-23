import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Bell, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  showNotification?: boolean;
  rightComponent?: React.ReactNode;
};

export function Header({ title, showBackButton = false, showNotification = false, rightComponent }: HeaderProps) {
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.rightSection}>
        {showNotification && (
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#1F2937" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        )}
        {rightComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#1F2937',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3366',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});