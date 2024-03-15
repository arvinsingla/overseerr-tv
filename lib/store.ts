import { Platform } from 'react-native'
import { create } from 'zustand'
import { Settings } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OverseerrClient, RadarrSettings, SonarrSettings, User } from './OverseerrClient'
import { DEFAULT_OVERSEERR_PORT } from './constants'

interface AppState {
    user: User | null
    radarr: RadarrSettings[]
    sonarr: SonarrSettings[]
    apiKey: string
    apiAddress: string
    apiPort: string
    client: OverseerrClient | null
    setUser: (user: User) => void
    setRadarr: (settings: RadarrSettings[]) => void
    setSonarr: (settings: SonarrSettings[]) => void
		setClientConfig: (key: string, address: string) => Promise<void>
    setOverseerClient: (key: string, address: string, port: string) => Promise<void>
		fetchInitialData: () => Promise<void>
}

const instantiateClient = (apiKey: string, apiAddress: string, apiPort: string): OverseerrClient => {
  return new OverseerrClient({
		BASE: `http://${apiAddress}:${apiPort}/api/v1`,
		HEADERS: {
			'X-Api-Key': apiKey
		}
	})
}

const useAppStore = create<AppState>()((set) => ({
    user: null,
    radarr: [],
    sonarr: [],
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
				Settings.set({ apiKey })
				Settings.set({ apiAddress })
				Settings.set({ apiPort: DEFAULT_OVERSEERR_PORT })
			} else {
				await AsyncStorage.setItem('apiKey', apiKey)
				await AsyncStorage.setItem('apiAddress', apiAddress)
				await AsyncStorage.setItem('apiPort', DEFAULT_OVERSEERR_PORT)
			}
			set(() => ({ apiAddress, apiKey, apiPort: DEFAULT_OVERSEERR_PORT }))
		},
		setOverseerClient: async (apiKey: string, apiAddress: string, apiPort: string) => {
			if (Platform.OS === 'ios') {
				Settings.set({ apiKey })
				Settings.set({ apiAddress })
				Settings.set({ apiPort })
			} else {
				await AsyncStorage.setItem('apiKey', apiAddress)
				await AsyncStorage.setItem('apiAddress', apiAddress)
				await AsyncStorage.setItem('apiPort', apiPort)
			}
			const client = instantiateClient(apiKey, apiAddress, apiPort)
			set(() => ({ apiKey, apiAddress, apiPort, client}))
		},
		fetchInitialData: async () => {
			let apiKey = ''
			let apiAddress = ''
			let apiPort = ''
			if (Platform.OS === 'ios') {
				apiKey = Settings.get('apiKey') ?? ''
				apiAddress = Settings.get('apiAddress') ?? ''
				apiPort = Settings.get('apiPort') ?? DEFAULT_OVERSEERR_PORT
			} else {
				apiKey = await AsyncStorage.getItem('apiKey') ?? ''
				apiAddress = await AsyncStorage.getItem('apiAddress') ?? ''
				apiPort = await AsyncStorage.getItem('apiPort') ?? DEFAULT_OVERSEERR_PORT
			}
			if (apiKey && apiAddress) {
				const client = instantiateClient(apiKey, apiAddress, apiPort)
				set({ apiKey, apiAddress, apiPort, client })
			}
		},
}))

useAppStore.getState().fetchInitialData()

export default useAppStore
