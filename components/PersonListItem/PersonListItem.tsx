import React, { useState } from 'react'
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { PersonResult } from '@/lib/OverseerrClient'
import { TMDB_IMAGE_URL } from '@/lib/constants'
import { trunc } from '@/lib/utils'
interface PersonListItemProps {
  person: PersonResult
  onPress: (person: PersonResult) => void
}

const PersonListItem: React.FC<PersonListItemProps> = ({ person, onPress }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const name: string = person.name ?? ''

  return (
    <TouchableOpacity
      activeOpacity={1}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPress={() => onPress(person)}
      style={styles.container}
      tvParallaxProperties={{
        enabled: true,
        magnification: 1.1,
        tiltAngle: 0
      }}
    >
      {person.profilePath &&
				<Image
					source={{ uri: `${TMDB_IMAGE_URL}${person.profilePath}` }}
					style={[
						styles.poster,
						{ opacity: isFocused ? 0.6 : 1 }
					]}
				/>
			}
			{!person.profilePath &&
				<Image
				source={require('./img/person-not-found.png')}
					style={[
						styles.poster,
						{ opacity: isFocused ? 0.6 : 1 }
					]}
				/>
			}
			<Text
				style={[
					styles.infoName,
					{ opacity: isFocused ? 0.6 : 1 }
				]}
			>
				{trunc(name, 30, true)}
			</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#000000",
    display: 'flex',
    flexDirection: 'column',
		alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 400,
		gap: 40
  },
  poster: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  info: {
    padding: 10,
  },
  infoName: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 5,
  },
})

export default PersonListItem
