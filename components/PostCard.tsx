import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
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
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setComments(prev => prev + 1);
      setNewComment('');
      setShowComments(false);
    }
  };

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
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Heart 
              size={24} 
              color={isLiked ? '#FF3B30' : '#1B4D3E'} 
              fill={isLiked ? '#FF3B30' : 'none'}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => setShowComments(!showComments)}
          >
            <MessageCircle size={24} color="#1B4D3E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={24} color="#1B4D3E" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
          <Bookmark 
            size={24} 
            color="#1B4D3E" 
            fill={isSaved ? '#1B4D3E' : 'none'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.likes}>{likesCount.toLocaleString()} likes</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.captionUsername}>{post.username}</Text>
          <Text style={styles.caption}>{post.caption}</Text>
        </View>
        <TouchableOpacity onPress={() => setShowComments(!showComments)}>
          <Text style={styles.commentsLink}>
            View all {comments} comments
          </Text>
        </TouchableOpacity>

        {showComments && (
          <View style={styles.commentInput}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity 
              style={[
                styles.postButton,
                !newComment.trim() && styles.disabledButton
              ]}
              onPress={handleComment}
              disabled={!newComment.trim()}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        )}
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
    padding: 4,
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
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1F2937',
    paddingVertical: 8,
    marginRight: 12,
  },
  postButton: {
    backgroundColor: '#1B4D3E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  postButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});