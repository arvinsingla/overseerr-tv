import { useState } from 'react';
import { ButtonProps, GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native'

interface TvButtonProps extends ButtonProps {}

const TvButton: React.FC<TvButtonProps> = (props) => {
    const { onPress, title, disabled } = props;
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const handlePress = (event: GestureResponderEvent) => {
      if (!disabled && onPress) {
        onPress(event);
      }
    };

    return (
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: disabled ? 0.5 : pressed ? 0.8 : 1 },
          { backgroundColor: isFocused ? '#FEFDFF' : '#EEEEEE'}
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
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#FEFDFF',
        borderWidth: 2,
        borderColor: '#DDDDDD',
        width: 340,
        height: 66
    },
    text: {
        fontSize: 38,
        lineHeight: 66,
        color: 'black',
    },
})

export default TvButton