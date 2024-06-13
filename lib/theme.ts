import { Theme } from "@react-navigation/native";
import { StyleSheet, ColorSchemeName } from "react-native";
import { normalizeSize }from './utils';

const baseTheme = StyleSheet.create({
	title: {
		fontSize: normalizeSize(38),
    lineHeight: normalizeSize(66),
	}
})

const lightTheme = StyleSheet.create({
	title: {
    ...baseTheme.title,
		color: '#000000'
  },
	text: {
		color: '#000000'
	},
	border: {
		borderColor: '#000000'
	},
	input: {
		backgroundColor: '#c0c0c0'
	},
	inputFocus: {
		backgroundColor: '#ffffff'
	}
})

const darkTheme = StyleSheet.create({
	title: {
		...baseTheme.title,
		color: 'rgb(209, 213, 219)'
	},
	text: {
		color: '#D1D5DB'
	},
	border: {
		borderColor: '#374151'
	},
	input: {
		backgroundColor: '#c0c0c0'
	},
	inputFocus: {
		backgroundColor: '#ffffff'
	}
})

export const getTheme = (scheme: ColorSchemeName) => {
	return scheme === 'dark' ? darkTheme : lightTheme;
}

export const navigationDarkTheme : Theme = {
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: '#171E2E',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
}
