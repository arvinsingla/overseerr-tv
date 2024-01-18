import { View, Text, StyleSheet} from 'react-native'
import TvButton from "../TvButton/TvButton";
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    children: string;
    tintColor?: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ children: title }) => {
    const navigation = useNavigation()
    const isSettingsPage = title === "Settings"

    function onPress() {
        navigation.navigate('Settings')
    }

    return(
        <View style={style.wrapper}>
            <Text style={style.headerText}>{title}</Text>
            {!isSettingsPage &&
                <TvButton title="Settings" onPress={onPress} />
            }
        </View>
    )
}

const style = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 60,
        flexGrow: 1
    }
})

export default Header