import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import { getTheme } from "../../lib/theme";

interface ShrugProps {
	text?: string
}

const Shrug: React.FC<ShrugProps> = ({ text = '¯\\_(ツ)_/¯' }) => {
	const scheme = useColorScheme()
	const theme = getTheme(scheme)

	return <View style={style.wrapper}><Text style={[style.text, theme.text]}>{text}</Text></View>
}

const style = StyleSheet.create({
	wrapper: {
		padding: 50
	},
	text: {
		fontSize: 100,
		textAlign: 'center'
	}
})

export default Shrug