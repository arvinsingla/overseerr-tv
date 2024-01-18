import { View, Text, StyleSheet } from 'react-native';

export enum PillColor {
    'green' = 'green',
    'blue' = 'blue',
    'purple' = 'purple'
}

interface PillProps {
    color: PillColor
    text: String
    isUppercase: Boolean
}

const Pill: React.FC<PillProps> = ({ color, isUppercase, text }) => {
    let pillBackgroundColor: string

    switch(color) {
        case PillColor.blue:
            pillBackgroundColor = 'rgba(59,130,246, 0.9)'
            break
        case PillColor.green:
            pillBackgroundColor = 'rgba(34, 197, 94, 0.9)'
            break
        case PillColor.purple:
            pillBackgroundColor = 'rgba(147, 51, 234, 0.9)'
            break
    }

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: pillBackgroundColor }
            ]}
        >
            <Text
                style={[
                    styles.text,
                    { textTransform: isUppercase ? 'uppercase' : 'none'}
                ]}
            >
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#aaaaaa',
        borderWidth: 1,
        borderRadius: 15,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default Pill