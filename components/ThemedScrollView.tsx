import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useScale } from '@/hooks/useScale';

export type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedScrollView({ style, lightColor, darkColor, ...otherProps }: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
	const scale = useScale();
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
