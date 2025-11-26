import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Logo } from '@/types';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface LogoCardProps {
  logo: Logo;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - Spacing.lg * 3) / 2;

export const LogoCard = ({ logo, onPress }: LogoCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoPlaceholder}>{logo.title.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {logo.title}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.category}>{logo.category}</Text>
          <Text style={styles.likes}>♥ {logo.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  logoContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholder: {
    fontSize: 48,
    fontWeight: Typography.bold,
    color: Colors.black,
  },
  info: {
    padding: Spacing.sm,
  },
  title: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  likes: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
});

