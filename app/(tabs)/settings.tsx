import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Alert, TextInput, useColorScheme } from 'react-native';
import { useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Picker from '@/components/Picker/Picker';
import TvButton, { TvButtonType } from '@/components/TvButton/TvButton';
import { useScale } from '@/hooks/useScale';
import { OverseerrClient } from '@/lib/OverseerrClient';
import useAppStore from '@/lib/store';
import { logError, normalizeSize } from '@/lib/utils';
import { getTheme } from "@/lib/theme";

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

export default function SettingScreen() {
  const styles = useSettingScreenStyles();
  const scale = useScale();
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
    // if (navigation.canGoBack()) {
    //   navigation.goBack()
    // } else {
    //   navigation.navigate('Discovery')
    // }
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


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={310 * scale}
          name="settings-sharp"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      <ThemedText style={[styles.title]}>{SETTINGS_HELP}</ThemedText>
      <Picker
        label="Connection Type"
        options={connectionTypeOptions}
        selectedOption={connectionType}
        onOptionSelected={setConnectionType}
      />
      <ThemedText style={[theme.title]}>{SETTINGS_KEY}</ThemedText>
      <TextInput
        value={key}
        onChangeText={setKey}
        style={[styles.input, theme.input]}
        placeholder={SETTINGS_KEY_PLACEHOLDER}
      />
      <ThemedText style={[theme.title]}>{SETTINGS_ADDRESS}</ThemedText>
      <TextInput
        value={address}
        onChangeText={setAddress}
        style={[styles.input, theme.input]}
        placeholder={SETTINGS_ADDRESS_PLACEHOLDER}
      />
      <ThemedText style={[theme.title]}>{SETTINGS_PORT}</ThemedText>
      <TextInput
        value={port}
        onChangeText={setPort}
        style={[styles.input, theme.input]}
        placeholder={SETTINGS_PORT_PLACEHOLDER}
        keyboardType='numeric'
      />
      <ThemedView style={styles.buttonRow}>
				<TvButton disabled={!key && !address && !port} onPress={clear} type={TvButtonType.destructive} title="Clear" />
				<TvButton disabled={!key && !address && !port} onPress={test} title="Test" />
				<TvButton disabled={!isValid} onPress={save} type={TvButtonType.cancel} title="Save" />
			</ThemedView>
    </ParallaxScrollView>
  );
}

const useSettingScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -45 * scale,
      left: 0,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
    },
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
  });
};
