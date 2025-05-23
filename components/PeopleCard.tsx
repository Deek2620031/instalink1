import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Users } from 'lucide-react-native';

type PersonProps = {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  mutualConnections: number;
};

type PeopleCardProps = {
  person: PersonProps;
};

export function PeopleCard({ person }: PeopleCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: person.imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{person.name}</Text>
        <Text style={styles.title}>{person.title}</Text>
        
        <View style={styles.mutualContainer}>
          <Users size={14} color="#6B7280" />
          <Text style={styles.mutualText}>
            {person.mutualConnections} mutual connections
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  mutualContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mutualText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  connectButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  connectButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});