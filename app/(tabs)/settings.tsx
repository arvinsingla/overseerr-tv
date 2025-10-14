import { useRouter } from 'expo-router';
import { StyleSheet, Alert } from 'react-native';
import { useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import Picker from '@/components/Picker/Picker';
import TvButton, { TvButtonType } from '@/components/TvButton/TvButton';
import { useScale } from '@/hooks/useScale';
import { OverseerrClient } from '@/lib/OverseerrClient';
import useAppStore from '@/lib/store';
import { logError, normalizeSize } from '@/lib/utils';

import {
	CONNECTION_FAILD,
	CONNECTION_SUCCESSFUL,
	SETTINGS_ADDRESS,
	SETTINGS_ADDRESS_PLACEHOLDER,
	SETTINGS_PORT,
	SETTINGS_PORT_PLACEHOLDER,
	SETTINGS_PASSWORD,
	SETTINGS_PASSWORD_PLACEHOLDER,
	SETTINGS_USERNAME,
	SETTINGS_USERNAME_PLACEHOLDER,
	DEFAULT_OVERSEERR_CONNECTION_TYPE,
	DEFAULT_OVERSEERR_PORT
} from '@/lib/constants';

export default function SettingScreen() {
  const styles = useSettingScreenStyles();
  const {
		apiConnectionType,
		apiAddress,
		apiPort,
		apiUsername,
		apiPassword,
		hasValidSettings,
		unsetClientConfig,
		setOverseerClient
	} = useAppStore()
  const [connectionType, setConnectionType] = useState<string>(apiConnectionType)
	const [address, setAddress] = useState<string>(apiAddress)
	const [port, setPort] = useState<string>(apiPort)
	const [username, setUsername] = useState<string>(apiUsername)
	const [password, setPassword] = useState<string>(apiPassword)
	const [isValid, setIsValid] = useState<boolean>(hasValidSettings)
	const router = useRouter();

	const connectionTypeOptions = [
		{ id: 'http', label: 'HTTP' },
		{ id: 'https', label: 'HTTPS' },
	]

  async function test() {
    // Test the API
    const overseerrClient = new OverseerrClient({
      BASE: `${connectionType}://${address}${port ? `:${port}` : ''}/api/v1`,
    })
    try {
      await overseerrClient.auth.postAuthLocal({
				email: username,
				password: password
			})
      setIsValid(true)
      Alert.alert(CONNECTION_SUCCESSFUL)
    } catch (e: any) {
      logError('Settings Test', e)
      Alert.alert(CONNECTION_FAILD)
    }
  }

  async function save() {
    await setOverseerClient(connectionType, address, port, username, password)
    try {
      // Attempt to login with stored credentials
      const overseerrClient = new OverseerrClient({
        BASE: `${connectionType}://${address}${port ? `:${port}` : ''}/api/v1`,
      })
      await overseerrClient.auth.postAuthLocal({
        email: username,
        password: password
      })
    } catch (e) {
      logError('Settings Save Auth', e)
    }
		if(router.canGoBack()) {
			router.back()
		} else {
			router.navigate('/')
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
						setConnectionType(DEFAULT_OVERSEERR_CONNECTION_TYPE)
            setAddress('')
            setPort(DEFAULT_OVERSEERR_PORT)
						setUsername('')
						setPassword('')
						setTimeout(() => {
							unsetClientConfig() // or whatever your clear function is called
						}, 1000);
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


  return (
    <ParallaxScrollView>
      <Picker
        label="Connection Type"
        options={connectionTypeOptions}
        selectedOption={connectionType}
        onOptionSelected={setConnectionType}
      />
			<ThemedText>{SETTINGS_ADDRESS}</ThemedText>
      <ThemedTextInput
        value={address}
        onChangeText={setAddress}
        placeholder={SETTINGS_ADDRESS_PLACEHOLDER}
      />
      <ThemedText>{SETTINGS_PORT}</ThemedText>
      <ThemedTextInput
        value={port}
        onChangeText={setPort}
        placeholder={SETTINGS_PORT_PLACEHOLDER}
        keyboardType='numeric'
      />
      <ThemedText>{SETTINGS_USERNAME}</ThemedText>
      <ThemedTextInput
        value={username}
        onChangeText={setUsername}
        placeholder={SETTINGS_USERNAME_PLACEHOLDER}
      />
      <ThemedText>{SETTINGS_PASSWORD}</ThemedText>
      <ThemedTextInput
        value={password}
				secureTextEntry={true}
        onChangeText={setPassword}
        placeholder={SETTINGS_PASSWORD_PLACEHOLDER}
      />
      <ThemedView style={styles.buttonRow}>
				<TvButton disabled={!address && !port} onPress={clear} type={TvButtonType.destructive} title="Clear" />
				<TvButton disabled={!address && !port && !username && !password} onPress={test} title="Test" />
				<TvButton disabled={!isValid} onPress={save} type={TvButtonType.cancel} title="Save" />
			</ThemedView>
    </ParallaxScrollView>
  );
}

const useSettingScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    buttonRow: {
      marginTop: normalizeSize(40),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
			gap: normalizeSize(40),
    },
  });
};
