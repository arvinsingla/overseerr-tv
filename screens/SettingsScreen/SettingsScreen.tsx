import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAppStore from '../../lib/store';
import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TvButton from '../../components/TvButton/TvButton'
import { OverseerrClient } from '../../lib/OverseerrClient';

function SettingsScreen(): JSX.Element {
  const navigation = useNavigation()
  const { apiKey, apiAddress, setApiAddress, setApiKey } = useAppStore()
  const [key, setKey] = useState<string>(apiKey)
  const [address, setAddress] = useState<string>(apiAddress)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>()

  async function test() {
    // Test the API
    console.log('The test button was pressed')
    // setErrorText('Could not reach the API')
    const overseerrClient = new OverseerrClient({
      BASE: `http://${address}/api/v1`,
      HEADERS: {
        'X-Api-Key': key
      }
    })
    try {
      await overseerrClient.public.getStatus()
      setErrorText('')
      setIsValid(true)
    } catch (e) {
      setErrorText('Unable to communicate with the Overseerr API')
    }
  }

  function save() {
    setApiKey(key)
    setApiAddress(address)
    navigation.navigate('Discovery')
  }

  return (
      <SafeAreaView>
        <View>
            <TextInput value={key} onChangeText={setKey} />
            <TextInput value={address} onChangeText={setAddress} />
            <TvButton disabled={!key && !address} onPress={test} title="Test" />
            <TvButton disabled={!isValid} onPress={save} title="Save" />
            {errorText &&
              <Text>{errorText}</Text>
            }
        </View>
      </SafeAreaView>
  );
}

export default SettingsScreen