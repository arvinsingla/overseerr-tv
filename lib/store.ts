import { Platform } from 'react-native'
import { create } from 'zustand'
import { Settings } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OverseerrClient, RadarrSettings, SonarrSettings, User } from './OverseerrClient'
import { DEFAULT_OVERSEERR_CONNECTION_TYPE, DEFAULT_OVERSEERR_PORT } from './constants'

interface AppState {
    user: User | null
    radarr: RadarrSettings[]
    sonarr: SonarrSettings[]
		apiConnectionType: string
    apiKey: string
    apiAddress: string
    apiPort: string
    client: OverseerrClient | null
    setUser: (user: User) => void
    setRadarr: (settings: RadarrSettings[]) => void
    setSonarr: (settings: SonarrSettings[]) => void
		setClientConfig: (key: string, address: string) => Promise<void>
    setOverseerClient: (connectionType: string, key: string, address: string, port: string) => Promise<void>
		fetchInitialData: () => Promise<void>
}

const instantiateClient = (apiConnectionType: string, apiKey: string, apiAddress: string, apiPort: string): OverseerrClient => {
  return new OverseerrClient({
		BASE: `${apiConnectionType}://${apiAddress}${apiPort ? `:${apiPort}` : ''}/api/v1`,
		HEADERS: {
			'X-Api-Key': apiKey
		}
	})
}

const useAppStore = create<AppState>()((set) => ({
    user: null,
    radarr: [],
    sonarr: [],
		apiConnectionType: DEFAULT_OVERSEERR_CONNECTION_TYPE,
    apiKey: '',
    apiAddress: '',
    apiPort: DEFAULT_OVERSEERR_PORT,
    client: null,
    setUser: (user) => {
			set(() => ({ user }))
    },
    setRadarr: (settings) => {
			set(() => ({ radarr: settings }))
    },
    setSonarr: (settings) => {
			set(() => ({ sonarr: settings }))
    },
		setClientConfig: async (apiKey: string, apiAddress: string) => {
			if (Platform.OS === 'ios') {
				Settings.set({ apiConnectionType: DEFAULT_OVERSEERR_CONNECTION_TYPE })
				Settings.set({ apiKey })
				Settings.set({ apiAddress })
				Settings.set({ apiPort: DEFAULT_OVERSEERR_PORT })
			} else {
				await AsyncStorage.setItem('apiConnectionType', DEFAULT_OVERSEERR_CONNECTION_TYPE)
				await AsyncStorage.setItem('apiKey', apiKey)
				await AsyncStorage.setItem('apiAddress', apiAddress)
				await AsyncStorage.setItem('apiPort', DEFAULT_OVERSEERR_PORT)
			}
			set(() => ({ apiAddress, apiKey, apiPort: DEFAULT_OVERSEERR_PORT }))
		},
		setOverseerClient: async (apiConnectionType: string, apiKey: string, apiAddress: string, apiPort: string) => {
			if (Platform.OS === 'ios') {
				Settings.set({ apiConnectionType })
				Settings.set({ apiKey })
				Settings.set({ apiAddress })
				Settings.set({ apiPort })
			} else {
				await AsyncStorage.setItem('apiConnectionType', apiConnectionType)
				await AsyncStorage.setItem('apiKey', apiAddress)
				await AsyncStorage.setItem('apiAddress', apiAddress)
				await AsyncStorage.setItem('apiPort', apiPort)
			}
			const client = instantiateClient(apiConnectionType, apiKey, apiAddress, apiPort)
			set(() => ({ apiConnectionType, apiKey, apiAddress, apiPort, client}))
		},
		fetchInitialData: async () => {
			let apiConnectionType = ''
			let apiKey = ''
			let apiAddress = ''
			let apiPort = ''
			if (Platform.OS === 'ios') {
				apiConnectionType = Settings.get('apiConnectionType') ?? DEFAULT_OVERSEERR_CONNECTION_TYPE
				apiKey = Settings.get('apiKey') ?? ''
				apiAddress = Settings.get('apiAddress') ?? ''
				apiPort = Settings.get('apiPort') ?? DEFAULT_OVERSEERR_PORT
			} else {
				apiConnectionType = await AsyncStorage.getItem('apiConnectionType') ?? DEFAULT_OVERSEERR_CONNECTION_TYPE
				apiKey = await AsyncStorage.getItem('apiKey') ?? ''
				apiAddress = await AsyncStorage.getItem('apiAddress') ?? ''
				apiPort = await AsyncStorage.getItem('apiPort') ?? DEFAULT_OVERSEERR_PORT
			}
			if (apiKey && apiAddress) {
				const client = instantiateClient(apiConnectionType, apiKey, apiAddress, apiPort)
				set({ apiConnectionType, apiKey, apiAddress, apiPort, client })
			}
		},
}))

useAppStore.getState().fetchInitialData()

export default useAppStore
