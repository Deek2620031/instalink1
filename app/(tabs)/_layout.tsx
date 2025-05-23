import { Tabs } from 'expo-router';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { 
  Home, 
  Search, 
  PlusSquare, 
  MessageSquare, 
  User
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';

function TabBarIcon({ 
  Icon, 
  color, 
  size = 24,
  focused
}: { 
  Icon: any; 
  color: string; 
  size?: number;
  focused: boolean;
}) {
  return (
    <View style={styles.iconContainer}>
      <Icon size={size} color={color} strokeWidth={focused ? 2.5 : 2} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#8A2BE2',
        tabBarInactiveTintColor: '#6B7280',
        tabBarBackground: () => (
          <BlurView tint="light" intensity={80} style={StyleSheet.absoluteFill} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <TabBarIcon Icon={Home} color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => <TabBarIcon Icon={Search} color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.createButtonContainer}>
              <View style={styles.createButton}>
                <TabBarIcon Icon={PlusSquare} color="#FFFFFF" focused={true} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => <TabBarIcon Icon={MessageSquare} color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <TabBarIcon Icon={User} color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    elevation: 0,
    height: 80,
    paddingBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    backgroundColor: '#8A2BE2',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});