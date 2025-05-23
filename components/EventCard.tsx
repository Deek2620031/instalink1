import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { CalendarDays, MapPin, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

type EventProps = {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  location: string;
  attendees: number;
};

type EventCardProps = {
  event: EventProps;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.title}>{event.title}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <CalendarDays size={16} color="#6B7280" />
          <Text style={styles.detailText}>{event.date}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.detailText}>{event.location}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Users size={16} color="#6B7280" />
          <Text style={styles.detailText}>{event.attendees} attending</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.interestedButton}>
          <Text style={styles.interestedButtonText}>Interested</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.goingButton}>
          <Text style={styles.goingButtonText}>Going</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 150,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  detailsContainer: {
    padding: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
  },
  interestedButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  interestedButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#4B5563',
  },
  goingButton: {
    flex: 1,
    backgroundColor: '#8A2BE2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  goingButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});