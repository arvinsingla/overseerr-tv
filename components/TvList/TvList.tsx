import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { TvResult } from '../../lib/OverseerrClient'
import MediaListItem from '../MediaListItem/MediaListItem'

interface TvListProps {
  header?: React.ReactElement
  footer?: React.ReactElement
  tv: TvResult[]
  isHorizontal?: boolean
  onPress: (item: TvResult) => void
	onEndReached?: () => void
}

const TvList: React.FC<TvListProps> = ({ tv, header, footer, isHorizontal = false, onPress, onEndReached = () => {} }) => {
  return (
    <FlatList
      horizontal={isHorizontal}
      numColumns={isHorizontal ? 1 : 5}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      style={styles.list}
      data={tv}
      keyExtractor={(item) => item.id.toString()}
			onEndReached={onEndReached}
      renderItem={({ item }) => {
        return (
          <View
            style={{
                marginRight: isHorizontal ? 30 : 65,
                marginBottom: isHorizontal ? 0 : 50
            }}
          >
            <MediaListItem media={item} onPress={onPress} />
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
})

export default TvList
