import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAppStore from '../../lib/store';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Alert } from "react-native";
import TvButton from '../../components/TvButton/TvButton'
import { OverseerrClient } from '../../lib/OverseerrClient';

function SettingsScreen(): JSX.Element {
  const navigation = useNavigation()
  const { apiKey, apiAddress, setApiAddress, setApiKey } = useAppStore()
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
      Alert.alert('Successfully connected ✅')
    } catch (e) {
      Alert.alert('Oops... Something went wrong connecting to Overseerr. Please check your settings and try again')
    }
  }

  function save() {
    setApiKey(key)
    setApiAddress(address)
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <View style={style.wrapper}>
        <View>
          <Text style={style.label}>API Key:</Text>
          <TextInput
            value={key}
            onChangeText={setKey}
            style={style.input}
            placeholder='API Key from Overseerr'
          />
          <Text style={style.label}>Server IP Address:</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={style.input}
            placeholder='IP Address (e.g. 192.168.10.100)'
            keyboardType='numeric'
          />
        </View>
        <View style={style.buttonRow}>
          <TvButton disabled={!key && !address} onPress={test} title="Test" />
          <TvButton disabled={!isValid} onPress={save} title="Save" />
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
    height: 68,
  },
  buttonRow: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default SettingsScreen