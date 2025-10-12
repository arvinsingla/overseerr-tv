import { Image, Text, View, StyleSheet, Pressable, useColorScheme } from "react-native"
import { PersonDetails as PersonDetailsType } from "@/lib/OverseerrClient"
import { TMDB_IMAGE_URL } from "@/lib/constants"
import { normalizeSize } from "@/lib/utils";
import { useTheme } from '@react-navigation/native';

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
	const theme = useTheme()

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
								<Text style={[style.headerDetailsTitleMain, { color: theme.colors.text }]}>{name}</Text>
							</Text>
						</View>
					</View>
				</View>
				{biography &&
					<>
						<Text style={[style.contentLeftOverview, { color: theme.colors.text }]}>{biography}</Text>
					</>
				}
			</View>
			<View style={style.contentRight}>
				{personData.length &&
					<View style={[style.contentRightTable, { borderColor: theme.colors.border }]}>
						{personData.map((data, index) => {
							const isLastItem = index === personData.length - 1
							return (
								<View key={index} style={[style.contentRightItem, { borderBottomWidth: isLastItem ? 0 : 1 }, { borderColor: theme.colors.border }]}>
									<Text style={[style.bold, style.contentRightItemText, { color: theme.colors.text }]}>{data.title}:</Text>
									<Text style={[style.contentRightItemText, { color: theme.colors.text }]}>{data.value}</Text>
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
		marginTop: normalizeSize(50),
	},
	contentLeft: {
		maxWidth: normalizeSize(1200),
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
		marginBottom: normalizeSize(50),
	},
	headerPoster: {
		width: normalizeSize(300),
		height: normalizeSize(400),
		borderRadius: normalizeSize(20),
		marginRight: normalizeSize(30),
	},
	headerDetails: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	HeaderDetailsTitle: {
		maxWidth: normalizeSize(800),
	},
	headerDetailsTitleMain: {
		fontSize: normalizeSize(60),
		fontWeight: 'bold',
	},
	headerDetailsTitleDate: {
		fontSize: normalizeSize(50),
		fontWeight: 'bold',
		paddingLeft: normalizeSize(20)
	},
	HeaderDetailsSubtitle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	HeaderDetailsSubtitleText: {
		fontSize: normalizeSize(30)
	},
	contentRightButton: {
		marginBottom: normalizeSize(20)
	},
	contentLeftTagline: {
		fontSize: normalizeSize(35),
		fontStyle: 'italic',
		marginBottom: normalizeSize(30)
	},
	contentLeftOverview: {
		fontSize: normalizeSize(26),
		marginTop: normalizeSize(10),
		lineHeight: normalizeSize(40),
		marginBottom: normalizeSize(30),
	},
	contentRightTable: {
		borderWidth: 1,
		borderRadius: normalizeSize(10),
		display: 'flex',
		flexDirection: 'column',
		width: normalizeSize(550),
	},
	contentRightItem: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: normalizeSize(20),
	},
	contentRightItemText: {
		fontSize: normalizeSize(25),
		textAlign: 'right',
	}
})

export default PersonDetails
