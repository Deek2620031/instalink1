import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Image as ImageIcon, Video, X, Type, CheckCircle2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { Header } from '@/components/Header';

const POST_TYPES = [
  { id: 'photo', icon: ImageIcon, label: 'Photo' },
  { id: 'video', icon: Video, label: 'Video' },
  { id: 'text', icon: Type, label: 'Text' },
];

export default function CreateScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('photo');
  const [caption, setCaption] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>('https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg');

  const handlePost = () => {
    // In a real app, we would handle post creation here
    console.log('Post created');
    router.back();
  };

  const selectPostType = (type: string) => {
    setSelectedType(type);
    // In a real app, we would handle media selection here
    if (type === 'text') {
      setPreviewImage(null);
    } else {
      setPreviewImage('https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg');
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Create Post" 
        showBackButton 
        rightComponent={
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content}>
        <View style={styles.typeSelector}>
          {POST_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                selectedType === type.id && styles.selectedTypeButton,
              ]}
              onPress={() => selectPostType(type.id)}
            >
              <type.icon 
                size={20} 
                color={selectedType === type.id ? '#FFFFFF' : '#4B5563'} 
              />
              <Text 
                style={[
                  styles.typeButtonText,
                  selectedType === type.id && styles.selectedTypeButtonText,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.captionContainer}>
          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            placeholderTextColor="#6B7280"
            multiline
            value={caption}
            onChangeText={setCaption}
          />
        </View>

        {selectedType !== 'text' && previewImage && (
          <Animated.View entering={FadeIn} style={styles.previewContainer}>
            <Image source={{ uri: previewImage }} style={styles.previewImage} />
            <TouchableOpacity style={styles.removePreviewButton}>
              <X size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
        )}

        {selectedType === 'text' && (
          <Animated.View entering={FadeIn} style={styles.textPostContainer}>
            <LinearGradient
              colors={['#8A2BE2', '#4B0082']}
              style={styles.textPostContent}
            >
              <Text style={styles.textPostText}>
                {caption || 'Type your thoughts here...'}
              </Text>
            </LinearGradient>
          </Animated.View>
        )}

        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Post Options</Text>
          
          <View style={styles.optionItem}>
            <Text style={styles.optionText}>Add location</Text>
            <CheckCircle2 size={24} color="#8A2BE2" />
          </View>
          
          <View style={styles.optionItem}>
            <Text style={styles.optionText}>Tag people</Text>
            <CheckCircle2 size={24} color="#E5E7EB" />
          </View>
          
          <View style={styles.optionItem}>
            <Text style={styles.optionText}>Add as job post</Text>
            <CheckCircle2 size={24} color="#E5E7EB" />
          </View>
          
          <View style={styles.optionItem}>
            <Text style={styles.optionText}>Add as event</Text>
            <CheckCircle2 size={24} color="#E5E7EB" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  postButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  selectedTypeButton: {
    backgroundColor: '#8A2BE2',
  },
  typeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
  },
  selectedTypeButtonText: {
    color: '#FFFFFF',
  },
  captionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  captionInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  previewContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 300,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removePreviewButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  textPostContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 300,
  },
  textPostContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  textPostText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  optionsContainer: {
    padding: 16,
    marginTop: 16,
  },
  optionsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
});