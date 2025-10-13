import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { useScale } from '@/hooks/useScale';
import { useTheme } from '@react-navigation/core';

export function ThemedTextInput({
  style,
  ...rest
}: TextInputProps) {
	const scale = useScale();
	const styles = useThemedTextInputStyles(scale);
	const theme = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        {
					backgroundColor: theme.colors.card,
					color: theme.colors.text
				}
      ]}
      {...rest}
    />
  );
}

const useThemedTextInputStyles = function (scale: number) {
	return StyleSheet.create({
		input: {
			fontSize: 23 * scale,
			height: 45 * scale,
			borderRadius: 10 * scale,
		}
	});
};
