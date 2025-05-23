import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Search, CreditCard as Edit } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { Header } from '@/components/Header';
import { MessageItem } from '@/components/MessageItem';

// Sample data
const MESSAGES = [
  {
    id: '1',
    sender: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    lastMessage: 'Would love to discuss the project further! When are you available for a call?',
    time: '5m',
    unread: true,
    online: true,
  },
  {
    id: '2',
    sender: 'Samantha Davis',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    lastMessage: 'Thanks for connecting! I checked out your portfolio and I\'m impressed.',
    time: '1h',
    unread: true,
    online: false,
  },
  {
    id: '3',
    sender: 'TechCorp Recruiting',
    avatar: 'https://images.pexels.com/photos/15013262/pexels-photo-15013262.jpeg',
    lastMessage: 'We reviewed your application and would like to schedule an interview.',
    time: '3h',
    unread: false,
    online: true,
  },
  {
    id: '4',
    sender: 'Michael Brown',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    lastMessage: 'The networking event was great! Let\'s connect again soon.',
    time: '1d',
    unread: false,
    online: false,
  },
  {
    id: '5',
    sender: 'DesignHub Team',
    avatar: 'https://images.pexels.com/photos/15086155/pexels-photo-15086155.jpeg',
    lastMessage: 'Your portfolio submission has been received. We\'ll review it shortly.',
    time: '2d',
    unread: false,
    online: true,
  },
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = MESSAGES.filter(message => 
    message.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Messages" 
        rightComponent={
          <TouchableOpacity style={styles.newMessageButton}>
            <Edit size={20} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages"
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInRight.delay(100 * index).duration(400)}>
            <MessageItem message={item} />
          </Animated.View>
        )}
        contentContainerStyle={styles.messagesList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  newMessageButton: {
    backgroundColor: '#8A2BE2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  messagesList: {
    paddingBottom: 100,
  },
});