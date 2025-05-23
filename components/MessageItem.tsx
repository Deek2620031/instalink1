import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

type MessageProps = {
  id: string;
  sender: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  online: boolean;
};

type MessageItemProps = {
  message: MessageProps;
};

export function MessageItem({ message }: MessageItemProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: message.avatar }} style={styles.avatar} />
        {message.online && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.sender}>{message.sender}</Text>
          <Text style={styles.time}>{message.time}</Text>
        </View>
        
        <Text 
          style={[styles.message, message.unread && styles.unreadMessage]} 
          numberOfLines={2}
        >
          {message.lastMessage}
        </Text>
      </View>
      
      {message.unread && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sender: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  unreadMessage: {
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8A2BE2',
    marginLeft: 8,
  },
});