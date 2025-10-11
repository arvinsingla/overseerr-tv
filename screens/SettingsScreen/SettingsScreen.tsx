import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Alert, useColorScheme, Pressable, Platform } from "react-native";
import useAppStore from '@/lib/store';
import { getTheme } from "@/lib/theme";
import { logError, normalizeSize } from '@/lib/utils';
import { OverseerrClient } from '@/lib/OverseerrClient';
import TvButton, { TvButtonType } from '@/components/TvButton/TvButton'
import Picker from '@/components/Picker/Picker.tsx';
import {
	CONNECTION_FAILD,
	CONNECTION_SUCCESSFUL,
	DEFAULT_OVERSEERR_CONNECTION_TYPE,
	DEFAULT_OVERSEERR_PORT,
	SETTINGS_ADDRESS,
	SETTINGS_ADDRESS_PLACEHOLDER,
	SETTINGS_HELP,
	SETTINGS_KEY,
	SETTINGS_KEY_PLACEHOLDER,
	SETTINGS_PORT,
	SETTINGS_PORT_PLACEHOLDER
} from '@/lib/constants';

function SettingsScreen(): JSX.Element {
	const navigation = useNavigation()
	const { apiConnectionType, apiKey, apiAddress, apiPort, setClientConfig, setOverseerClient } = useAppStore()
	const [connectionType, setConnectionType] = useState<string>(apiConnectionType)
	const [key, setKey] = useState<string>(apiKey)
	const [address, setAddress] = useState<string>(apiAddress)
	const [port, setPort] = useState<string>(apiPort)
	const [isValid, setIsValid] = useState<boolean>(false)
	const scheme = useColorScheme()
	const theme = getTheme(scheme)

	const connectionTypeOptions = [
		{ id: 'http', label: 'HTTP' },
		{ id: 'https', label: 'HTTPS' },
	]

	async function test() {
		// Test the API
		const overseerrClient = new OverseerrClient({
			BASE: `${connectionType}://${address}${port ? `:${port}` : ''}/api/v1`,
			HEADERS: {
				'X-Api-Key': key
			}
		})
		try {
			await overseerrClient.settings.getSettingsAbout()
			setIsValid(true)
			Alert.alert(CONNECTION_SUCCESSFUL)
		} catch (e: any) {
			logError('Settings Test', e)
			Alert.alert(CONNECTION_FAILD)
		}
	}

	function save() {
		setOverseerClient(connectionType, key, address, port)
		if (navigation.canGoBack()) {
			navigation.goBack()
		} else {
			navigation.navigate('Discovery')
		}
	}

	function clear() {
		Alert.alert(
			`Clear settings`,
			`Are you sure you want to clear your settings?`,
			[
				{
					text: 'Confirm',
					onPress: async () => {
						setClientConfig('', '')
						setConnectionType(DEFAULT_OVERSEERR_CONNECTION_TYPE)
						setAddress('')
						setKey('')
						setPort(DEFAULT_OVERSEERR_PORT)
					},
					style: 'destructive',
					isPreferred: true
				},
				{
					text: 'Cancel',
					style: 'cancel'
				}
			],
		)
	}

	const settingsInputApple = (
		<View>
				<Picker
					label="Connection Type"
					options={connectionTypeOptions}
					selectedOption={connectionType}
					onOptionSelected={setConnectionType}
				/>
				<Text style={[theme.title]}>{SETTINGS_KEY}</Text>
				<TextInput
					value={key}
					onChangeText={setKey}
					style={[style.input, theme.input]}
					placeholder={SETTINGS_KEY_PLACEHOLDER}
				/>
				<Text style={[theme.title]}>{SETTINGS_ADDRESS}</Text>
				<TextInput
					value={address}
					onChangeText={setAddress}
					style={[style.input, theme.input]}
					placeholder={SETTINGS_ADDRESS_PLACEHOLDER}
				/>
				<Text style={[theme.title]}>{SETTINGS_PORT}</Text>
				<TextInput
					value={port}
					onChangeText={setPort}
					style={[style.input, theme.input]}
					placeholder={SETTINGS_PORT_PLACEHOLDER}
					keyboardType='numeric'
				/>
			</View>
	)
	const settingsInputAndroid = (
		<View>
				<Text style={[theme.title]}>{SETTINGS_KEY}</Text>
				<Pressable onPress={() => this.keyInput.focus()}>
					<TextInput
						value={key}
						onChangeText={setKey}
						style={[style.input, theme.input]}
						placeholder={SETTINGS_KEY_PLACEHOLDER}
						ref={(input) => { this.keyInput = input; }}
					/>
				</Pressable>
				<Text style={[theme.title]}>{SETTINGS_ADDRESS}</Text>
				<Pressable onPress={() => this.addressInput.focus()}>
					<TextInput
						value={address}
						onChangeText={setAddress}
						style={[style.input, theme.input]}
						placeholder={SETTINGS_ADDRESS_PLACEHOLDER}
						ref={(input) => { this.addressInput = input; }}
					/>
				</Pressable>
				<Text style={[theme.title]}>{SETTINGS_PORT}</Text>
				<Pressable onPress={() => this.portInput.focus()}>
					<TextInput
						value={port}
						onChangeText={setPort}
						style={[style.input, theme.input]}
						placeholder={SETTINGS_PORT_PLACEHOLDER}
						keyboardType='numeric'
						ref={(input) => { this.portInput = input; }}
					/>
				</Pressable>
			</View>
	)

	const input = Platform.OS === 'ios' ? settingsInputApple : settingsInputAndroid

	return (
		<View style={style.wrapper}>
			<Text style={[style.title]}>{SETTINGS_HELP}</Text>
			{input}
			<View style={style.buttonRow}>
				<TvButton disabled={!key && !address && !port} onPress={clear} type={TvButtonType.destructive} title="Clear" />
				<TvButton disabled={!key && !address && !port} onPress={test} title="Test" />
				<TvButton disabled={!isValid} onPress={save} type={TvButtonType.cancel} title="Save" />
			</View>
		</View>
	);
}

const style = StyleSheet.create({
	wrapper: {
		paddingTop: normalizeSize(40),
		paddingLeft: normalizeSize(80),
		paddingRight: normalizeSize(80),
	},
	input: {
		marginBottom: normalizeSize(20),
		fontSize: normalizeSize(38),
		height: normalizeSize(80),
		borderRadius: normalizeSize(10),
	},
	buttonRow: {
		marginTop: normalizeSize(40),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	title: {
		padding: normalizeSize(30),
		backgroundColor: '#1E2836',
		color: '#ffffff',
		fontSize: normalizeSize(38),
		alignContent: 'center',
		marginBottom: normalizeSize(30),
	}
})

export default SettingsScreen
