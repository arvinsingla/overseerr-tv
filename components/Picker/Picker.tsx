import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@react-navigation/native';
import { useScale } from '@/hooks/useScale';
interface PickerProps {
  label: string;
  options: { id: string, label: string }[];
	selectedOption: string;
  onOptionSelected: (id: string) => void;
}

const Picker: React.FC<PickerProps> = ({ label, options, selectedOption, onOptionSelected }) => {
	const index = options.findIndex((option) => option.id === selectedOption);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(index !== -1 ? index : 0);
	const scale = useScale();
	const styles = usePickerStyles(scale);
	const theme = useTheme();
  const handlePress = () => {
    const nextIndex = (selectedOptionIndex + 1) % options.length;
    setSelectedOptionIndex(nextIndex);
    onOptionSelected(options[nextIndex].id);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={({ focused }) => [
          styles.button,
					{ backgroundColor: theme.colors.card },
        ]}
        tvParallaxProperties={{
					enabled: true,
					magnification: 1.02
				}}
      >
				{({ focused }) => (
					<>
						<ThemedText style={[styles.label, { backgroundColor: theme.colors.card }]}>{label}</ThemedText>
						<ThemedText style={[styles.option, { color: theme.colors.text }]}>{options[selectedOptionIndex].label}</ThemedText>
					</>
				)}
      </Pressable>
    </View>
  );
};

const usePickerStyles = function (scale: number) {
	return StyleSheet.create({
		container: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
		label: {
			fontSize: 23 * scale,
			marginRight: 10 * scale,
		},
		button: {
			flexDirection: 'row',
			flexGrow: 1,
			justifyContent: 'space-between',
			alignItems: 'center',
			fontSize: 23 * scale,
			height: 45 * scale,
			borderRadius: 10 * scale,
			paddingHorizontal: 20 * scale,
		},
		option: {
			fontSize: 23 * scale,
			color: '#000000',
		}
	});
};

export default Picker;
