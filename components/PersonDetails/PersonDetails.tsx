import { Image, Text, View, StyleSheet, Pressable, useColorScheme } from "react-native"
import { PersonDetails as PersonDetailsType } from "../../lib/OverseerrClient"
import { TMDB_IMAGE_URL } from "../../lib/constants"
import { getTheme } from "../../lib/theme";

interface PersonDetailsProps {
	person: PersonDetailsType
}

const PersonDetails: React.FC<PersonDetailsProps> = ({ person }) => {
	const {
		name,
		birthday,
		deathday,
		biography,
		placeOfBirth,
		profilePath,
	} = person
	const personData = []
	const scheme = useColorScheme()
	const theme = getTheme(scheme)

	if (birthday) personData.push({ title: 'Birthday', value: birthday })
	if (deathday) personData.push({ title: 'Died', value: deathday })
	if (placeOfBirth) personData.push({ title: 'Birthplace', value: placeOfBirth })

	return (
		<View style={style.content}>
			<View style={style.contentLeft}>
				<View style={style.header}>
					<Pressable><Image source={{ uri: `${TMDB_IMAGE_URL}${profilePath}` }} style={style.headerPoster} /></Pressable>
					<View style={style.headerDetails}>
						<View style={style.HeaderDetailsTitle}>
							<Text>
								<Text style={[style.headerDetailsTitleMain, theme.text]}>{name}</Text>
							</Text>
						</View>
					</View>
				</View>
				{biography &&
					<>
						<Text style={[{ fontSize: 40, fontWeight: 'bold' }, theme.text]}>Biography</Text>
						<Text style={[style.contentLeftOverview, theme.text]}>{biography}</Text>
					</>
				}
			</View>
			<View style={style.contentRight}>
				{personData.length &&
					<View style={[style.contentRightTable, theme.border]}>
						{personData.map((data, index) => {
							const isLastItem = index === personData.length - 1
							return (
								<View key={index} style={[style.contentRightItem, { borderBottomWidth: isLastItem ? 0 : 1 }, theme.border]}>
									<Text style={[style.bold, style.contentRightItemText, theme.text]}>{data.title}:</Text>
									<Text style={[style.contentRightItemText, theme.text]}>{data.value}</Text>
								</View>
							)
						})}
					</View>
				}
			</View>
		</View>
	)
}

const style = StyleSheet.create({
	bold: {
		fontWeight: 'bold'
	},
	noBorder: {
		borderWidth: 0,
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 50,
	},
	contentLeft: {
		maxWidth: 1200,
	},
	contentRight: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginBottom: 50,
	},
	headerPoster: {
		width: 300,
		height: 400,
		borderRadius: 20,
		marginRight: 30,
	},
	headerDetails: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	HeaderDetailsTitle: {
		maxWidth: 800,
	},
	headerDetailsTitleMain: {
		fontSize: 60,
		fontWeight: 'bold',
	},
	headerDetailsTitleDate: {
		fontSize: 50,
		fontWeight: 'bold',
		paddingLeft: 20
	},
	HeaderDetailsSubtitle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	HeaderDetailsSubtitleText: {
		fontSize: 30
	},
	contentRightButton: {
		marginBottom: 20
	},
	contentLeftTagline: {
		fontSize: 35,
		fontStyle: 'italic',
		marginBottom: 30
	},
	contentLeftOverview: {
		fontSize: 26,
		marginTop: 10,
		lineHeight: 40,
		marginBottom: 30,
	},
	contentRightTable: {
		borderWidth: 1,
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		width: 550,
	},
	contentRightItem: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20,
	},
	contentRightItemText: {
		fontSize: 25,
		textAlign: 'right',
	}
})

export default PersonDetails
