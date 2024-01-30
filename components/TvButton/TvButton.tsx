import { useState } from 'react';
import { ButtonProps, GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native'

export enum TvButtonType {
	'default' = 'default',
	'cancel' = 'cancel',
	'destructive' = 'destructive'
}

interface TvButtonProps extends ButtonProps {
	type?: TvButtonType
}

const TvButton: React.FC<TvButtonProps> = ({ onPress, title, disabled, type = TvButtonType.default }) => {
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const handlePress = (event: GestureResponderEvent) => {
		if (!disabled && onPress) {
			onPress(event);
		}
	};

	let buttonBackgroundColor = isFocused ? '#e8e8e8' : '#a7a7ad'
	let buttonTextColor = '#000000'

	if (type === TvButtonType.cancel) {
		buttonBackgroundColor = isFocused ? '#4489e7' : '#9eb2cc'
		buttonTextColor = isFocused ? '#ffffff' : '#2465c9'
	}

	if (type === TvButtonType.destructive) {
		buttonBackgroundColor = isFocused ? '#db6455' : '#c4a5a2'
		buttonTextColor = isFocused ? '#ffffff' : '#d86152'
	}

	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				{ opacity: disabled ? 0.5 : pressed ? 0.8 : 1 },
				{ backgroundColor: buttonBackgroundColor },
			]}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			onPress={handlePress}
			disabled={disabled}
			tvParallaxProperties={{
				enabled: true,
				magnification: 1.1,
				tiltAngle: 0
			}}
		>
			<Text
				style={[
					styles.text,
					{ color : buttonTextColor }
				]}
			>
				{title}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		elevation: 3,
		width: 340,
		height: 66
	},
	text: {
		fontSize: 32,
		lineHeight: 50,
	},
})

export default TvButton
