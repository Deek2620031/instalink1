import { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Edit3, Settings, Link, BarChart4, MessageCircle, ExternalLink } from 'lucide-react-native';

import { ProfileHeader } from '@/components/ProfileHeader';
import { ProfileStats } from '@/components/ProfileStats';
import { ProfileTabs } from '@/components/ProfileTabs';

const TABS = ['Posts', 'Links', 'Analytics'];

const PROFILE = {
  name: 'Jessica Anderson',
  username: 'jessica_',
  avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png',
  bio: 'UI/UX Designer | Frontend Developer | Currently @CreativeLabs | Sharing my journey in tech and design',
  location: 'New York, NY',
  connections: 324,
  posts: 28,
};

const SKILLS = ['UI/UX Design', 'React', 'Figma', 'Typography', 'Animation'];

const LINKS = [
  { id: '1', title: 'Portfolio', url: 'jessicadesign.co', icon: 'ExternalLink' },
  { id: '2', title: 'LinkedIn', url: 'linkedin.com/in/jessicaa', icon: 'Linkedin' },
  { id: '3', title: 'Behance', url: 'behance.net/jessicaa', icon: 'Aperture' },
  { id: '4', title: 'GitHub', url: 'github.com/jess-code', icon: 'Github' },
];

const ANALYTICS = {
  profileViews: 238,
  postReach: 1842,
  linkClicks: 74,
  growth: '+12%',
};

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Posts');
  const scrollRef = useRef<ScrollView>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Posts':
        return (
          <View style={styles.postsGrid}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Animated.View key={item} entering={FadeIn.delay(100 * item).duration(400)} style={styles.postItem}>
                <Image
                  source={{ uri: `https://images.pexels.com/photos/${3180800 + item}/pexels-photo-${3180800 + item}.jpeg` }}
                  style={styles.postImage}
                />
              </Animated.View>
            ))}
          </View>
        );
      case 'Links':
        return (
          <View style={styles.linksContainer}>
            {LINKS.map((link, index) => (
              <Animated.View 
                key={link.id} 
                entering={FadeInDown.delay(100 * index).duration(400)}
                style={styles.linkCard}
              >
                <View style={styles.linkIconContainer}>
                  <ExternalLink size={20} color="#8A2BE2" />
                </View>
                <View style={styles.linkContent}>
                  <Text style={styles.linkTitle}>{link.title}</Text>
                  <Text style={styles.linkUrl}>{link.url}</Text>
                </View>
                <TouchableOpacity style={styles.visitButton}>
                  <Text style={styles.visitButtonText}>Visit</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        );
      case 'Analytics':
        return (
          <View style={styles.analyticsContainer}>
            <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.analyticsCard}>
              <LinearGradient
                colors={['#8A2BE2', '#4B0082']}
                style={styles.analyticsGradient}
              >
                <View style={styles.analyticsHeader}>
                  <Text style={styles.analyticsTitle}>Profile Growth</Text>
                  <View style={styles.growthBadge}>
                    <Text style={styles.growthText}>{ANALYTICS.growth}</Text>
                  </View>
                </View>
                
                <View style={styles.analyticsStats}>
                  <View style={styles.analyticsStatItem}>
                    <Text style={styles.analyticsStatValue}>{ANALYTICS.profileViews}</Text>
                    <Text style={styles.analyticsStatLabel}>Profile Views</Text>
                  </View>
                  
                  <View style={styles.analyticsStatItem}>
                    <Text style={styles.analyticsStatValue}>{ANALYTICS.postReach}</Text>
                    <Text style={styles.analyticsStatLabel}>Post Reach</Text>
                  </View>
                  
                  <View style={styles.analyticsStatItem}>
                    <Text style={styles.analyticsStatValue}>{ANALYTICS.linkClicks}</Text>
                    <Text style={styles.analyticsStatLabel}>Link Clicks</Text>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.activityChart}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Weekly Activity</Text>
                <TouchableOpacity>
                  <Text style={styles.chartPeriodText}>Last 30 Days</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.chart}>
                {/* Placeholder for chart */}
                <View style={styles.chartPlaceholder}>
                  <BarChart4 size={48} color="#8A2BE2" opacity={0.5} />
                  <Text style={styles.chartPlaceholderText}>Activity data visualization</Text>
                </View>
              </View>
            </Animated.View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ProfileHeader />

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: PROFILE.avatar }} style={styles.profileImage} />
            
            <View style={styles.profileActions}>
              <TouchableOpacity style={styles.editButton}>
                <Edit3 size={16} color="#FFFFFF" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingsButton}>
                <Settings size={20} color="#1F2937" />
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={styles.name}>{PROFILE.name}</Text>
          <Text style={styles.username}>@{PROFILE.username}</Text>
          
          <Text style={styles.bio}>{PROFILE.bio}</Text>
          <Text style={styles.location}>{PROFILE.location}</Text>
          
          <View style={styles.skillsContainer}>
            {SKILLS.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
          
          <ProfileStats connections={PROFILE.connections} posts={PROFILE.posts} />
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <MessageCircle size={16} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Link size={16} color="#8A2BE2" />
              <Text style={styles.secondaryButtonText}>Share Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
        
        <View style={styles.tabContent}>
          {renderTabContent()}
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const postSize = (width - 48) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileSection: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#8A2BE2',
  },
  profileActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8A2BE2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  username: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 22,
    marginBottom: 8,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  skillBadge: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A2BE2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
    marginRight: 12,
  },
  primaryButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
  },
  secondaryButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#8A2BE2',
    marginLeft: 8,
  },
  tabContent: {
    paddingTop: 16,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  postItem: {
    width: postSize,
    height: postSize,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  linksContainer: {
    paddingHorizontal: 16,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  linkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  linkUrl: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  visitButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  visitButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8A2BE2',
  },
  analyticsContainer: {
    paddingHorizontal: 16,
  },
  analyticsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  analyticsGradient: {
    padding: 20,
  },
  analyticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  analyticsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  growthBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  growthText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  analyticsStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyticsStatItem: {
    alignItems: 'center',
  },
  analyticsStatValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  analyticsStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activityChart: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
  },
  chartPeriodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8A2BE2',
  },
  chart: {
    height: 200,
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  chartPlaceholderText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
});