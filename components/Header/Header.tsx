import { StyleSheet, SafeAreaView, Image} from 'react-native'
import TvButton from "../TvButton/TvButton";
import { useNavigation } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

interface HeaderProps {
    header: NativeStackHeaderProps
}

const Header: React.FC<HeaderProps> = ({ header}) => {
    const navigation = useNavigation()
    const { route } = header
    const isSettingsPage = route.name === "Settings"

    function onPress() {
        navigation.navigate('Settings')
    }

    return(
        <SafeAreaView style={style.wrapper}>
            <Image source={require('./img/logo.png')} />
            {/* {!isSettingsPage &&
                <TvButton title="Settings" onPress={onPress} />
            } */}
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        verticalAlign: 'middle',
        width: '100%',
        height: 200,
        backgroundColor: '#1E2836',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 80,
        paddingRight: 80,
    },
    headerText: {
        fontSize: 60,
        color: '#ffffff'
    }
})

export default Header