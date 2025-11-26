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
  index?: number;
}

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400',
  'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400',
  'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400',
];

export const LogoCard = ({ logo, onPress, index = 0 }: LogoCardProps) => {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const imageUrl = PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={[styles.logoContainer, { backgroundColor: theme.surface }]}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>
            <Text style={[styles.logoText, { color: theme.text }]}>
              {logo.title.substring(0, 2).toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {logo.title}
          </Text>
          <View style={styles.footer}>
            <View style={styles.categoryBadge}>
              <Text style={[styles.category, { color: theme.textSecondary }]}>
                {logo.category}
              </Text>
            </View>
            <View style={styles.likesContainer}>
              <Ionicons name="heart" size={12} color={theme.textSecondary} />
              <Text style={[styles.likes, { color: theme.textSecondary }]}>
                {logo.likes}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoContainer: {
    width: '100%',
    aspectRatio: 0.8,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: Typography.bold,
    letterSpacing: 2,
  },
  info: {
    padding: Spacing.md,
  },
  title: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  category: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likes: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
  },
});

