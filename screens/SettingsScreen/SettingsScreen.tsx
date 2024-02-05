import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAppStore from '../../lib/store';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Alert } from "react-native";
import TvButton from '../../components/TvButton/TvButton'
import { OverseerrClient } from '../../lib/OverseerrClient';
import {
	CONNECTION_FAILD,
	CONNECTION_SUCCESSFUL,
	SETTINGS_ADDRESS,
	SETTINGS_ADDRESS_PLACEHOLDER,
	SETTINGS_HELP,
	SETTINGS_KEY,
	SETTINGS_KEY_PLACEHOLDER
} from '../../lib/constants';
import { TvButtonType } from '../../components/TvButton/TvButton';

function SettingsScreen(): JSX.Element {
	const navigation = useNavigation()
	const { apiKey, apiAddress, setClientConfig, setOverseerClient } = useAppStore()
	const [key, setKey] = useState<string>(apiKey)
	const [address, setAddress] = useState<string>(apiAddress)
	const [isValid, setIsValid] = useState<boolean>(false)

	async function test() {
		// Test the API
		const overseerrClient = new OverseerrClient({
			BASE: `http://${address}:5055/api/v1`,
			HEADERS: {
				'X-Api-Key': key
			}
		})
		try {
			await overseerrClient.settings.getSettingsAbout()
			setIsValid(true)
			Alert.alert(CONNECTION_SUCCESSFUL)
		} catch (e) {
			Alert.alert(CONNECTION_FAILD)
		}
	}

	function save() {
		setOverseerClient(key, address)
		if (navigation.canGoBack()) {
			console.log('We entered canGoBack')
			navigation.goBack()
		} else {
			console.log('We entered the else')
			navigation.navigate('Discovery')
		}
	}

	function clear() {
		setClientConfig('', '')
		setAddress('')
		setKey('')
	}

	return (
		<SafeAreaView>
			<View style={style.wrapper}>
				<Text style={style.title}>{SETTINGS_HELP}</Text>
				<View>
					<Text style={style.label}>{SETTINGS_KEY}</Text>
					<TextInput
						value={key}
						onChangeText={setKey}
						style={style.input}
						placeholder={SETTINGS_KEY_PLACEHOLDER}
						placeholderTextColor="#000000"
					/>
					<Text style={style.label}>{SETTINGS_ADDRESS}</Text>
					<TextInput
						value={address}
						onChangeText={setAddress}
						style={style.input}
						placeholder={SETTINGS_ADDRESS_PLACEHOLDER}
						keyboardType='numeric'
					/>
				</View>
				<View style={style.buttonRow}>
					<TvButton disabled={!key && !address} onPress={test} title="Test" />
					<TvButton disabled={!key && !address} onPress={clear} type={TvButtonType.destructive} title="Clear" />
					<TvButton disabled={!isValid} onPress={save} type={TvButtonType.cancel} title="Save" />
				</View>
			</View>
		</SafeAreaView>
	);
}

const style = StyleSheet.create({
	wrapper: {
		paddingTop: 40,
	},
	label: {
		fontSize: 38,
		lineHeight: 66,
	},
	input: {
		marginBottom: 20,
		fontSize: 38,
		height: 80,
		borderRadius: 10,
		backgroundColor: '#DDDDDD'
	},
	buttonRow: {
		marginTop: 40,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	title: {
		padding: 30,
		backgroundColor: '#1E2836',
		color: '#ffffff',
		fontSize: 38,
		alignContent: 'center',
		marginBottom: 30,
	}
})

export default SettingsScreen
