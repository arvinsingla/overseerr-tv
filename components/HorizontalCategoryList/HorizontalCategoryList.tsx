import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import CategoryListItem from '../CategoryListItem/CategoryListItem'

export interface Category {
  id: number
  backdrops: Array<string>
  name?: string
}

interface HorizontalCategoryListProps {
  isLogo?: boolean
  categories: Category[]
  onPress: (category: Category) => void
}

const HorizontalCategoryList: React.FC<HorizontalCategoryListProps> = ({ categories, onPress, isLogo = false }) => {
  return (
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
  )
}

const styles = StyleSheet.create({
  list: {
    overflow: 'visible',
  },
  item: {
    marginRight: 30,
  }
})

export default HorizontalCategoryList
