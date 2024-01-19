import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useAppStore from './lib/store'
import DiscoveryScreen from './screens/DiscoveryScreen/DiscoveryScreen'
import SettingsScreen from './screens/SettingsScreen/SettingsScreen'
import RequestScreen from './screens/RequestScreen/RequestScreen'
import Header from './components/Header/Header'
import { MovieResult, TvResult } from './lib/OverseerrClient'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Discovery: undefined
  Settings: undefined
  Request: { item: MovieResult | TvResult }
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const queryClient = new QueryClient()

function App(): JSX.Element {
  const { apiKey, apiAddress, setOverseerClient } = useAppStore()
  const hasServerSettings = apiKey && apiAddress
  setOverseerClient()
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={hasServerSettings ? 'Discovery' : 'Settings'}
          screenOptions={{
            header: (props) => <Header header={props} />
          }}
        >
          <Stack.Group>
            <Stack.Screen name="Discovery" component={DiscoveryScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'fullScreenModal'}}>
            <Stack.Screen name="Request" component={RequestScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App
