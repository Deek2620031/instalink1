import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { MapPin, DollarSign, Clock } from 'lucide-react-native';

type JobProps = {
  id: string;
  company: string;
  title: string;
  logo: string;
  location: string;
  salary: string;
  posted: string;
};

type JobCardProps = {
  job: JobProps;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: job.logo }} style={styles.logo} />
        <View style={styles.companyInfo}>
          <Text style={styles.company}>{job.company}</Text>
          <Text style={styles.title}>{job.title}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.detailText}>{job.location}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <DollarSign size={16} color="#6B7280" />
          <Text style={styles.detailText}>{job.salary}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.detailText}>Posted {job.posted}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
  },
  companyInfo: {
    flex: 1,
  },
  company: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
  },
  detailsContainer: {
    marginBottom: 16,
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
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#8A2BE2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  applyButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#4B5563',
  },
});