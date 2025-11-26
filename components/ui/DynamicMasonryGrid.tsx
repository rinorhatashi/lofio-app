import { View, StyleSheet, Dimensions } from 'react-native';
import { ReactNode } from 'react';
import { Logo } from '@/types';

interface DynamicMasonryGridProps {
  data: Logo[];
  renderItem: (item: Logo, height: number, index: number) => ReactNode;
  gap?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const DynamicMasonryGrid = ({
  data,
  renderItem,
  gap = 16,
}: DynamicMasonryGridProps) => {
  // Calculate column width
  const columnWidth = (SCREEN_WIDTH - (gap * 3)) / 2;

  // Determine card height based on likes (more likes = taller cards)
  const getCardHeight = (logo: Logo): number => {
    if (logo.likes > 80) return columnWidth * 1.6; // Very tall
    if (logo.likes > 60) return columnWidth * 1.4; // Tall
    if (logo.likes > 40) return columnWidth * 1.2; // Medium-tall
    if (logo.likes > 20) return columnWidth * 1.0; // Square
    return columnWidth * 0.8; // Short
  };

  // Distribute items into two columns, balancing heights
  const distributeToColumns = () => {
    const leftColumn: { logo: Logo; height: number; index: number }[] = [];
    const rightColumn: { logo: Logo; height: number; index: number }[] = [];
    let leftHeight = 0;
    let rightHeight = 0;

    data.forEach((logo, index) => {
      const height = getCardHeight(logo);
      
      // Add to shorter column to balance layout
      if (leftHeight <= rightHeight) {
        leftColumn.push({ logo, height, index });
        leftHeight += height + gap;
      } else {
        rightColumn.push({ logo, height, index });
        rightHeight += height + gap;
      }
    });

    return { leftColumn, rightColumn };
  };

  const { leftColumn, rightColumn } = distributeToColumns();

  return (
    <View style={styles.container}>
      {/* Left Column */}
      <View style={[styles.column, { width: columnWidth }]}>
        {leftColumn.map((item) => (
          <View key={item.logo.id} style={{ marginBottom: gap }}>
            {renderItem(item.logo, item.height, item.index)}
          </View>
        ))}
      </View>

      {/* Right Column */}
      <View style={[styles.column, { width: columnWidth }]}>
        {rightColumn.map((item) => (
          <View key={item.logo.id} style={{ marginBottom: gap }}>
            {renderItem(item.logo, item.height, item.index)}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
  },
  column: {
    flexDirection: 'column',
  },
});
