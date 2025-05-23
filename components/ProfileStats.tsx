import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

type ProfileStatsProps = {
  connections: number;
  posts: number;
};

export function ProfileStats({ connections, posts }: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={styles.statValue}>{connections}</Text>
        <Text style={styles.statLabel}>Connections</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.stat}>
        <Text style={styles.statValue}>{posts}</Text>
        <Text style={styles.statLabel}>Posts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    marginTop: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
});