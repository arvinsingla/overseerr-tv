import { View, type ViewProps } from 'react-native';
import { useTheme } from '@react-navigation/native';


export function ThemedView({ style, ...otherProps }: ViewProps) {
	const theme = useTheme();
  const backgroundColor = theme.colors.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
