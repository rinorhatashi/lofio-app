import { View, StyleSheet, Dimensions } from 'react-native';
import { ReactNode } from 'react';
import { Logo } from '@/types';

interface DynamicMasonryGridProps {
  data: Logo[];
  renderItem: (item: Logo, size: 'small' | 'medium' | 'large' | 'full', index: number) => ReactNode;
  gap?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const DynamicMasonryGrid = ({
  data,
  renderItem,
  gap = 16,
}: DynamicMasonryGridProps) => {
  // Sort by likes to prioritize high-engagement content
  const sortedData = [...data].sort((a, b) => b.likes - a.likes);
  
  // Determine card size based on likes
  const getCardSize = (logo: Logo, index: number): 'small' | 'medium' | 'large' | 'full' => {
    if (logo.likes > 80 && index === 0) return 'full'; // Top liked item gets full width
    if (logo.likes > 60) return 'large'; // High likes get large cards
    if (logo.likes > 40) return 'medium'; // Medium likes get medium cards
    return 'small'; // Default small cards
  };

  const getCardWidth = (size: 'small' | 'medium' | 'large' | 'full'): number => {
    const availableWidth = SCREEN_WIDTH - (gap * 3);
    switch (size) {
      case 'full':
        return SCREEN_WIDTH - (gap * 2);
      case 'large':
        return (availableWidth * 0.65);
      case 'medium':
        return (availableWidth * 0.48);
      case 'small':
        return (availableWidth * 0.48);
    }
  };

  const renderGrid = () => {
    const rows: ReactNode[] = [];
    let currentRow: { logo: Logo; size: string; index: number }[] = [];
    let currentRowWidth = 0;
    const maxRowWidth = SCREEN_WIDTH - (gap * 2);

    sortedData.forEach((logo, index) => {
      const size = getCardSize(logo, index);
      const cardWidth = getCardWidth(size);

      // If adding this card would exceed row width, start a new row
      if (currentRowWidth + cardWidth + gap > maxRowWidth && currentRow.length > 0) {
        rows.push(
          <View key={`row-${rows.length}`} style={[styles.row, { gap }]}>
            {currentRow.map((item, idx) => (
              <View key={`${item.logo.id}-${idx}`} style={{ width: getCardWidth(item.size as any) }}>
                {renderItem(item.logo, item.size as any, item.index)}
              </View>
            ))}
          </View>
        );
        currentRow = [];
        currentRowWidth = 0;
      }

      // Add card to current row
      currentRow.push({ logo, size, index });
      currentRowWidth += cardWidth + gap;

      // Full width cards get their own row
      if (size === 'full') {
        rows.push(
          <View key={`row-${rows.length}`} style={[styles.row, { gap }]}>
            <View style={{ width: getCardWidth('full') }}>
              {renderItem(logo, 'full', index)}
            </View>
          </View>
        );
        currentRow = [];
        currentRowWidth = 0;
      }
    });

    // Add remaining cards in the last row
    if (currentRow.length > 0) {
      rows.push(
        <View key={`row-${rows.length}`} style={[styles.row, { gap }]}>
          {currentRow.map((item, idx) => (
            <View key={`${item.logo.id}-${idx}`} style={{ width: getCardWidth(item.size as any) }}>
              {renderItem(item.logo, item.size as any, item.index)}
            </View>
          ))}
        </View>
      );
    }

    return rows;
  };

  return (
    <View style={[styles.container, { gap }]}>
      {renderGrid()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
});

