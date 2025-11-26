import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LogoCard } from '@/components/logo/LogoCard';
import { MasonryGrid } from '@/components/ui/MasonryGrid';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { dummyLogos, categories } from '@/constants/dummyData';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Category } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';

export default function ExploreScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [refreshing, setRefreshing] = useState(false);

  const filteredLogos = selectedCategory === 'All'
    ? dummyLogos
    : dummyLogos.filter(logo => logo.category === selectedCategory);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleLogoPress = (logoId: string) => {
    console.log('Logo pressed:', logoId);
  };

  const renderCategoryItem = (category: string) => {
    const isSelected = category === selectedCategory;
    return (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryChip,
          { backgroundColor: isSelected ? theme.text : theme.surface, borderColor: theme.border },
        ]}
        onPress={() => setSelectedCategory(category as Category)}
        activeOpacity={0.7}
      >
        <Text style={[styles.categoryText, { color: isSelected ? theme.background : theme.textSecondary }]}>
          {category}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.logo, { color: theme.text }]}>LOFIO</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Discover amazing logos</Text>
          </View>
          <ThemeToggle />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoriesScroll}
      >
        {categories.map(renderCategoryItem)}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.text}
          />
        }
      >
        <MasonryGrid
          data={filteredLogos}
          numColumns={2}
          columnGap={16}
          renderItem={(logo, index) => (
            <LogoCard logo={logo} onPress={() => handleLogoPress(logo.id)} index={index} />
          )}
        />
        {filteredLogos.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="images-outline" size={64} color={theme.textTertiary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No logos found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.bold,
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: Typography.sm,
    marginTop: Spacing.xs,
  },
  categoriesScroll: {
    maxHeight: 50,
    marginBottom: Spacing.md,
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
  categoryText: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['3xl'],
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: Typography.base,
  },
});
