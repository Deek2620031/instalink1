import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react-native';

type PostProps = {
  id: string;
  username: string;
  userImage: string;
  postImage: string;
  caption: string;
  likes: number;
  comments: number;
  time: string;
};

type PostCardProps = {
  post: PostProps;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.userImage }} style={styles.userImage} />
          <Text style={styles.username}>{post.username}</Text>
        </View>
        <Text style={styles.time}>{post.time}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: post.postImage }} style={styles.postImage} />
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={24} color="#1F2937" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={24} color="#1F2937" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Bookmark size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.likes}>{post.likes.toLocaleString()} likes</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.captionUsername}>{post.username}</Text>
          <Text style={styles.caption}>{post.caption}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.commentsLink}>View all {post.comments} comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#1F2937',
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  likes: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 8,
  },
  captionContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  captionUsername: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#1F2937',
    marginRight: 4,
  },
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  commentsLink: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
});