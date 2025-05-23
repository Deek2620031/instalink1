import { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Search, Sliders } from 'lucide-react-native';

import { Header } from '@/components/Header';
import { JobCard } from '@/components/JobCard';
import { EventCard } from '@/components/EventCard';
import { PeopleCard } from '@/components/PeopleCard';

const TABS = ['People', 'Jobs', 'Events'];

// Sample data
const PEOPLE = [
  {
    id: '1',
    name: 'Alex Johnson',
    title: 'UX/UI Designer',
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    mutualConnections: 3,
  },
  {
    id: '2',
    name: 'Samantha Davis',
    title: 'Frontend Developer',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    mutualConnections: 5,
  },
  {
    id: '3',
    name: 'Michael Brown',
    title: 'Product Manager',
    imageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    mutualConnections: 2,
  },
];

const JOBS = [
  {
    id: '1',
    company: 'TechCorp',
    title: 'Junior Frontend Developer',
    logo: 'https://images.pexels.com/photos/15013262/pexels-photo-15013262.jpeg',
    location: 'New York, NY (Remote)',
    salary: '$60K - $80K',
    posted: '2d ago',
  },
  {
    id: '2',
    company: 'DesignHub',
    title: 'UI/UX Designer',
    logo: 'https://images.pexels.com/photos/15086155/pexels-photo-15086155.jpeg',
    location: 'San Francisco, CA',
    salary: '$70K - $90K',
    posted: '5d ago',
  },
  {
    id: '3',
    company: 'StartupX',
    title: 'Marketing Intern',
    logo: 'https://images.pexels.com/photos/15034528/pexels-photo-15034528.jpeg',
    location: 'Austin, TX (Hybrid)',
    salary: '$20/hr',
    posted: '1w ago',
  },
];

const EVENTS = [
  {
    id: '1',
    title: 'Tech Networking Mixer',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    date: 'May 15, 2025',
    location: 'New York City',
    attendees: 120,
  },
  {
    id: '2',
    title: 'Women in Code Summit',
    imageUrl: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg',
    date: 'June 3-5, 2025',
    location: 'San Francisco',
    attendees: 300,
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    imageUrl: 'https://images.pexels.com/photos/7245363/pexels-photo-7245363.jpeg',
    date: 'May 28, 2025',
    location: 'Los Angeles',
    attendees: 85,
  },
];

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState('People');
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'People':
        return (
          <FlatList
            data={PEOPLE}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PeopleCard person={item} />}
            contentContainerStyle={styles.listContent}
          />
        );
      case 'Jobs':
        return (
          <FlatList
            data={JOBS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <JobCard job={item} />}
            contentContainerStyle={styles.listContent}
          />
        );
      case 'Events':
        return (
          <FlatList
            data={EVENTS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EventCard event={item} />}
            contentContainerStyle={styles.listContent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Explore" />

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search people, jobs, events..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Sliders size={20} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View entering={FadeIn} style={styles.contentContainer}>
        {renderContent()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
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
  filterButton: {
    marginLeft: 12,
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeTab: {
    backgroundColor: '#8A2BE2',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    marginTop: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});