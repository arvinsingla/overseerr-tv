import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { normalizeSize } from '@/lib/utils'

interface MoreListItemProps {
	text?: string
  onPress: (media: any) => void
}

const MoreListItem: React.FC<MoreListItemProps> = ({ text = "See More", onPress }) => {

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.container}
      tvParallaxProperties={{
        enabled: true,
        magnification: 1.1,
        tiltAngle: 0
      }}
    >
			<Image source={require('./img/more-arrow.png')} style={{ width: normalizeSize(100), height: normalizeSize(100)}} />
			<Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: normalizeSize(15),
    backgroundColor: "#000000",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
		alignItems: 'center',
    width: normalizeSize(300),
    height: normalizeSize(400),
  },
	text: {
		marginTop: normalizeSize(20),
		fontWeight: 'bold',
		fontSize: normalizeSize(36),
		color: '#ffffff'
	}
})

export default MoreListItem
