import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import CategoryListItem from '../CategoryListItem/CategoryListItem'
import { normalizeSize } from '../../lib/utils'

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
    marginRight: normalizeSize(30),
  }
})

export default HorizontalCategoryList
