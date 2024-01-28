import { useEffect } from 'react'
import { StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import useAppStore from '../../lib/store';
import { useQuery } from '@tanstack/react-query';

interface HeaderProps {
    header: NativeStackHeaderProps
}

const Header: React.FC<HeaderProps> = ({ header}) => {
    const navigation = useNavigation()
    const { client, setUser } = useAppStore()
    const { route } = header
    const isSettingsPage = route.name === "Settings"

    if (!client) {
        return null
    }

    const {error, isPending, isSuccess, data } = useQuery({
        queryKey: ['user'],
        queryFn: () => client.auth.getAuthMe()
    })

    useEffect(() => {
        if (data) {
            setUser(data)
        }
    }, [data]);

    function onPress() {
        navigation.navigate('Settings')
    }

    return(
        <SafeAreaView style={style.wrapper}>
            <Image source={require('./img/logo.png')} />
            {!isSettingsPage &&
                <TouchableOpacity
                    activeOpacity={0.6}
                    tvParallaxProperties={{
                        enabled: true,
                        magnification: 1.1,
                        tiltAngle: 0
                    }}
                    style={{ opacity: 1 }}
                    onPress={onPress}
                >
                    {data?.avatar &&
                        <Image
                            source={{ uri: data.avatar}}
                            style={style.avatar}
                        />
                    }

                </TouchableOpacity>
            }
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
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#ffffff'
    }
})

export default Header