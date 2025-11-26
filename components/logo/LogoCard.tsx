import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from '@/types';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef, useEffect } from 'react';

interface LogoCardProps {
  logo: Logo;
  onPress: () => void;
  height?: number;
  index?: number;
}

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800',
  'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800',
  'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800',
];

export const LogoCard = ({ logo, onPress, height, index = 0 }: LogoCardProps) => {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const imageUrl = PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      delay: index * 30,
      useNativeDriver: true,
    }).start();
  }, []);

  // Determine text size based on card height
  const getTextSize = () => {
    if (!height) return { title: Typography.lg, likes: Typography.xs };
    
    if (height > 300) {
      return { title: Typography['2xl'], likes: Typography.base };
    } else if (height > 250) {
      return { title: Typography.xl, likes: Typography.sm };
    } else if (height > 200) {
      return { title: Typography.lg, likes: Typography.sm };
    }
    return { title: Typography.base, likes: Typography.xs };
  };

  const textSizes = getTextSize();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.95}
      >
        <View style={[styles.imageContainer, height ? { height } : { aspectRatio: 1 }]}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Gradient Overlay */}
          <View style={[styles.gradientOverlay, { backgroundColor: theme.overlay }]} />
          
          {/* Logo Name Overlay */}
          <View style={styles.contentOverlay}>
            <View style={styles.topContent}>
              <Text
                style={[styles.logoTitle, { color: '#FFFFFF', fontSize: textSizes.title }]}
                numberOfLines={2}
              >
                {logo.title}
              </Text>
            </View>
            
            {/* Likes at bottom */}
            <View style={styles.bottomContent}>
              <View style={styles.likesContainer}>
                <Ionicons name="heart" size={size === 'full' ? 18 : 14} color="#FFFFFF" />
                <Text style={[styles.likesText, { fontSize: textSizes.likes }]}>
                  {logo.likes}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  contentOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
    justifyContent: 'center',
  },
  logoTitle: {
    fontWeight: Typography.bold,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backdropFilter: 'blur(10px)',
  },
  likesText: {
    color: '#FFFFFF',
    fontWeight: Typography.semibold,
  },
});
