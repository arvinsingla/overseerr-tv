import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { useScale } from '@/hooks/useScale';
import { useTheme } from '@react-navigation/core';

export function ThemedScrollView({ style, ...otherProps }: ScrollViewProps) {
	const theme = useTheme();
	const backgroundColor = theme.colors.background;
	const styles = useThemedScrollViewStyles();

  return <ScrollView style={[{ backgroundColor }, styles.content, style]} {...otherProps} />;
}

const useThemedScrollViewStyles = function () {
	const scale = useScale();
	return StyleSheet.create({
		content: {
			flex: 1,
			padding: 32 * scale,
			gap: 16 * scale,
			overflow: 'hidden',
		},
	});
};
