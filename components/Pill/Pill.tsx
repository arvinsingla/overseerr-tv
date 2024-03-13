import { View, Text, StyleSheet } from 'react-native';
import { normalizeSize } from '../../lib/utils'

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
        paddingTop: normalizeSize(6),
        paddingBottom: normalizeSize(6),
        paddingLeft: normalizeSize(10),
        paddingRight: normalizeSize(10),
        borderColor: '#aaaaaa',
        borderWidth: 1,
        borderRadius: normalizeSize(15),
    },
    text: {
        color: '#fff',
        fontSize: normalizeSize(20),
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default Pill
