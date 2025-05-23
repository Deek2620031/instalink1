import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated';

type ProfileTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
};

export function ProfileTabs({ activeTab, setActiveTab, tabs }: ProfileTabsProps) {
  const activeIndex = tabs.indexOf(activeTab);
  
  const indicatorPosition = useDerivedValue(() => {
    return activeIndex * (100 / tabs.length);
  }, [activeIndex]);
  
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(indicatorPosition.value) }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              { width: `${100 / tabs.length}%` },
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
      
      <View style={styles.indicatorContainer}>
        <Animated.View
          style={[
            styles.indicator,
            { width: `${100 / tabs.length}%` },
            indicatorStyle,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    fontFamily: 'Inter-Bold',
    color: '#8A2BE2',
  },
  indicatorContainer: {
    height: 3,
    backgroundColor: '#F3F4F6',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#8A2BE2',
  },
});