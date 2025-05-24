import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import { Bell, ArrowLeft, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  showNotification?: boolean;
  rightComponent?: React.ReactNode;
};

type Notification = {
  id: string;
  message: string;
  time: string;
  read: boolean;
};

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    message: 'Dr. Sarah Johnson is available for consultation',
    time: '2m ago',
    read: false,
  },
  {
    id: '2',
    message: 'New mental health resources available',
    time: '1h ago',
    read: false,
  },
  {
    id: '3',
    message: 'Reminder: Weekly check-in tomorrow',
    time: '3h ago',
    read: true,
  },
];

export function Header({ title, showBackButton = false, showNotification = false, rightComponent }: HeaderProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleBack = () => {
    router.back();
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ArrowLeft size={24} color="#1B4D3E" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightSection}>
          {showNotification && (
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => setShowNotifications(true)}
            >
              <Bell size={24} color="#1B4D3E" />
              {unreadCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          {rightComponent}
        </View>
      </View>

      <Modal
        visible={showNotifications}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity 
                onPress={() => setShowNotifications(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#1B4D3E" />
              </TouchableOpacity>
            </View>

            {notifications.map(notification => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.unreadNotification
                ]}
                onPress={() => markAsRead(notification.id)}
              >
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
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
    color: '#1B4D3E',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 32,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1B4D3E',
  },
  closeButton: {
    padding: 8,
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  unreadNotification: {
    backgroundColor: 'rgba(27, 77, 62, 0.05)',
  },
  notificationMessage: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  notificationTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
});