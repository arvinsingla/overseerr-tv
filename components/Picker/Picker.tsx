import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet, useColorScheme } from 'react-native';
import { normalizeSize } from '../../lib/utils';
import { getTheme } from "../../lib/theme";

interface PickerProps {
  label: string;
  options: { id: string, label: string }[];
	selectedOption: string;
  onOptionSelected: (id: string) => void;
}

const Picker: React.FC<PickerProps> = ({ label, options, selectedOption, onOptionSelected }) => {
  console.log('selectedOption', selectedOption)
	const index = options.findIndex((option) => option.id === selectedOption);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(index !== -1 ? index : 0);
	const scheme = useColorScheme()
	const theme = getTheme(scheme)
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
					focused ? theme.inputFocus : theme.input,
        ]}
        tvParallaxProperties={{
					enabled: true,
					magnification: 1.02
				}}
      >
				<Text style={styles.label}>{label}</Text>
				<Text style={styles.label}>{options[selectedOptionIndex].label}</Text>
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
    color: '#000000',
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
