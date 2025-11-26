import { View, StyleSheet, Dimensions } from 'react-native';
import { ReactNode } from 'react';

interface MasonryGridProps {
  data: any[];
  numColumns?: number;
  renderItem: (item: any, index: number) => ReactNode;
  columnGap?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const MasonryGrid = ({
  data,
  numColumns = 2,
  renderItem,
  columnGap = 16,
}: MasonryGridProps) => {
  const columns: any[][] = Array.from({ length: numColumns }, () => []);
  
  // Distribute items across columns
  data.forEach((item, index) => {
    const columnIndex = index % numColumns;
    columns[columnIndex].push({ item, index });
  });

  const columnWidth = (SCREEN_WIDTH - (columnGap * (numColumns + 1))) / numColumns;

  return (
    <View style={styles.container}>
      {columns.map((column, columnIndex) => (
        <View
          key={columnIndex}
          style={[
            styles.column,
            {
              width: columnWidth,
              marginLeft: columnIndex === 0 ? columnGap : columnGap / 2,
              marginRight: columnIndex === numColumns - 1 ? columnGap : columnGap / 2,
            },
          ]}
        >
          {column.map(({ item, index }) => (
            <View key={index} style={{ marginBottom: columnGap }}>
              {renderItem(item, index)}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
});

