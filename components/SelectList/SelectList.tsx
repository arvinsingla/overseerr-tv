import React, { useState } from 'react'
import { Text, FlatList, TouchableOpacity } from 'react-native'

export interface SelectListItem {
    id: string
    label: string
}

interface SelectListProps {
    data: SelectListItem[]
}

const SelectList: React.FC<SelectListProps> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<SelectListItem>()

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => setSelectedItem(item)}
                onFocus={() => console.log(`Focused on ${item.id}`)}
                style={{ ...styles.item, backgroundColor: selectedItem === item ? 'blue' : 'gray' }}
                >
                <Text style={styles.itemText}>{item.label}</Text>
            </TouchableOpacity>
        )
      }}
      keyExtractor={(item) => item.id}
      style={styles.list}
    />
  )
}

// Styles for your components
const styles = {
  list: {
    // Your styles for the list
  },
  item: {
    // Styles for each item
  },
  itemText: {
    // Text styles
  }
}

export default SelectList