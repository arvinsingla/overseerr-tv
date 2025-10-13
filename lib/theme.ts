import { Theme } from "@react-navigation/native";
import { ColorSchemeName, Platform, StyleSheet } from "react-native";
import { useScale } from "../hooks/useScale";

const scale = useScale();

export const DarkNavigationTheme: Theme = {
  dark: true,
  colors: {
		primary: 'rgb(10, 132, 255)',
    background: '#171E2E',
    card: '#232c3f',
    text: 'rgb(229, 229, 231)',
    border: 'rgba(81, 81, 83, 1)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts: Platform.select({
    ios: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '700',
      },
    },
    default: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      bold: {
        fontFamily: 'sans-serif',
        fontWeight: '600',
      },
      heavy: {
        fontFamily: 'sans-serif',
        fontWeight: '700',
      },
    },
  }),
};

export const DefaultNavigationTheme: Theme = {
  dark: false,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgba(188, 188, 188, 1)',
    notification: 'rgb(255, 59, 48)',
  },
  fonts: Platform.select({
    ios: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '700',
      },
    },
    default: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      bold: {
        fontFamily: 'sans-serif',
        fontWeight: '600',
      },
      heavy: {
        fontFamily: 'sans-serif',
        fontWeight: '700',
      },
    },
  }),
};

const baseStylesheetTheme = StyleSheet.create({
	title: {
		fontSize: 38 * scale,
    lineHeight: 66 * scale,
	}
})

const lightStylesheetTheme = StyleSheet.create({
	title: {
    ...baseStylesheetTheme.title,
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
	},
	inputTextFocus: {
		color: '#000000'
	}
})

const darkStylesheetTheme = StyleSheet.create({
	title: {
		...baseStylesheetTheme.title,
		color: 'rgb(209, 213, 219)'
	},
	text: {
		color: '#D1D5DB'
	},
	border: {
		borderColor: '#374151'
	},
	input: {
		backgroundColor: '#323232'
	},
	inputFocus: {
		backgroundColor: '#ffffff'
	},
	inputTextFocus: {
		color: '#000000'
	}
})

export const getStylesheetTheme = (scheme: ColorSchemeName) => {
	return scheme === 'dark' ? darkStylesheetTheme : lightStylesheetTheme;
}
