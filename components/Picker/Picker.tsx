import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { normalizeSize } from '../../lib/utils';

interface PickerProps {
  label: string;
  options: { id: string, label: string }[];
	selectedOption: string;
  onOptionSelected: (id: string) => void;
}

const Picker: React.FC<PickerProps> = ({ label, options, selectedOption, onOptionSelected }) => {
	const index = options.findIndex((option) => option.id === selectedOption);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(index !== -1 ? index : 0);
	const theme = useTheme()
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
						<Text style={[styles.label, { backgroundColor: theme.colors.card }]}>{label}</Text>
						<Text style={[styles.option, { color: theme.colors.text }]}>{options[selectedOptionIndex].label}</Text>
					</>
				)}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
		fontSize: normalizeSize(38),
    marginRight: normalizeSize(10),
  },
  button: {
		flexDirection: 'row',
		flexGrow: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: normalizeSize(20),
    borderRadius: normalizeSize(10),
		fontSize: normalizeSize(38),
		height: normalizeSize(80),
  },
  option: {
		fontSize: normalizeSize(38),
    color: '#000000',
  },
});

export default Picker;
