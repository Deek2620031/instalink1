import { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInRight, FadeInDown } from 'react-native-reanimated';
import { Bell, Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react-native';

import { StoryCircle } from '@/components/StoryCircle';
import { PostCard } from '@/components/PostCard';
import { Header } from '@/components/Header';

// Sample data
const STORIES = [
  { id: '1', username: 'jessica_', imageUrl: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png', hasStory: true },
  { id: '2', username: 'alex.tech', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', hasStory: true },
  { id: '3', username: 'sam_dev', imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', hasStory: true },
  { id: '4', username: 'maya.ui', imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', hasStory: true },
  { id: '5', username: 'kevin', imageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg', hasStory: true },
  { id: '6', username: 'taylor', imageUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg', hasStory: false },
];

const POSTS = [
  {
    id: '1',
    username: 'jessica_',
    userImage: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png',
    postImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    caption: 'Just wrapped up an amazing brainstorming session with the team! #StartupLife #Innovation',
    likes: 256,
    time: '32m',
    comments: 24,
  },
  {
    id: '2',
    username: 'alex.tech',
    userImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    postImage: 'https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg',
    caption: 'Coding late into the night. Building something exciting! 💻✨ #WebDevelopment #TechLife',
    likes: 432,
    time: '2h',
    comments: 56,
  },
  {
    id: '3',
    username: 'sam_dev',
    userImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    postImage: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg',
    caption: 'Excited to share that I just landed a job at Google! Thanks to everyone who supported me through this journey. #NewBeginnings #CareerGoals',
    likes: 987,
    time: '5h',
    comments: 112,
  },
];

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      <Header title="InstaLink" showNotification />

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stories */}
        <Animated.View entering={FadeInRight.delay(300).duration(500)}>
          <FlatList
            data={STORIES}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesContainer}
            renderItem={({ item }) => (
              <StoryCircle
                imageUrl={item.imageUrl}
                username={item.username}
                hasStory={item.hasStory}
              />
            )}
          />
        </Animated.View>

        {/* Posts */}
        <View style={styles.postsContainer}>
          {POSTS.map((post, index) => (
            <Animated.View 
              key={post.id} 
              entering={FadeInDown.delay(300 + index * 100).duration(500)}
            >
              <PostCard post={post} />
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  storiesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  postsContainer: {
    marginTop: 8,
  },
});