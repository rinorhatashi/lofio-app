import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
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

// Icon options for logo placeholders
const LOGO_ICONS = [
  'shapes-outline',
  'diamond-outline',
  'triangle-outline',
  'square-outline',
  'ellipse-outline',
  'star-outline',
  'heart-outline',
  'flash-outline',
  'leaf-outline',
  'flame-outline',
];

export const LogoCard = ({ logo, onPress, height, index = 0 }: LogoCardProps) => {
  const { theme, isDark } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const iconName = LOGO_ICONS[index % LOGO_ICONS.length];

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      delay: index * 30,
      useNativeDriver: true,
    }).start();
  }, []);

  // Determine icon size based on card height
  const getIconSize = () => {
    if (!height) return 48;
    if (height > 300) return 80;
    if (height > 250) return 64;
    if (height > 200) return 56;
    return 48;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: isDark ? '#000000' : '#FFFFFF',
            borderColor: theme.border,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.95}
      >
        {/* Main Content Area */}
        <View style={[styles.contentContainer, height ? { height } : { aspectRatio: 1 }]}>
          {/* Likes Badge - Top Left */}
          <View style={styles.likesContainer}>
            <Ionicons name="heart" size={12} color={theme.textSecondary} />
            <Text style={[styles.likesText, { color: theme.textSecondary }]}>
              {logo.likes}
            </Text>
          </View>

          {/* Logo Icon - Center */}
          <View style={styles.iconContainer}>
            <Ionicons
              name={iconName as any}
              size={getIconSize()}
              color={theme.text}
            />
          </View>
        </View>

        {/* Title - Bottom */}
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, { color: theme.text }]}
            numberOfLines={1}
          >
            {logo.title}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contentContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likesContainer: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  likesText: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  title: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    textAlign: 'center',
  },
});
