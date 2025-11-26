import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LogoCard } from '@/components/logo/LogoCard';
import { DynamicMasonryGrid } from '@/components/ui/DynamicMasonryGrid';
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
          {
            backgroundColor: isSelected ? theme.text : theme.surface,
            borderColor: isSelected ? theme.text : 'transparent',
          },
        ]}
        onPress={() => setSelectedCategory(category as Category)}
        activeOpacity={0.8}
      >
        <Text style={[styles.categoryText, { color: isSelected ? theme.background : theme.text }]}>
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

      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(renderCategoryItem)}
        </ScrollView>
      </View>

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
        {filteredLogos.length > 0 ? (
          <DynamicMasonryGrid
            data={filteredLogos}
            gap={16}
            renderItem={(logo, height, index) => (
              <LogoCard
                logo={logo}
                onPress={() => handleLogoPress(logo.id)}
                height={height}
                index={index}
              />
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="images-outline" size={64} color={theme.textTertiary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No logos found</Text>
          </View>
        )}
        <View style={{ height: Spacing.xl }} />
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
  categoriesWrapper: {
    marginBottom: Spacing.md,
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  categoryChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: 24,
    borderWidth: 2,
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
