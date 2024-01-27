import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import CategoryListItem from '../CategoryListItem/CategoryListItem';

export interface Category {
  id: number;
  backdrops: Array<string>;
  name?: string;
}

interface HorizontalCategoryListProps {
  title: string
  isLogo?: boolean
  categories: Category[]
  onPress: (category: Category) => void
}

const HorizontalCategoryList: React.FC<HorizontalCategoryListProps> = ({ categories, title, onPress, isLogo = false }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <CategoryListItem category={item} onPress={onPress} isLogo={isLogo} />
            </View>
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    lineHeight: 66,
  },
  list: {
    overflow: 'visible',
    marginTop: 10
  },
  item: {
    marginRight: 30,
  }
});

export default HorizontalCategoryList;
