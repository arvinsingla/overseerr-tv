import { Platform } from 'react-native'
import { create } from 'zustand'
import { Settings } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OverseerrClient, RadarrSettings, SonarrSettings, User } from './OverseerrClient'
import { DEFAULT_OVERSEERR_CONNECTION_TYPE, DEFAULT_OVERSEERR_PORT } from './constants'

interface AppState {
	apiConnectionType: string
	apiAddress: string
	apiPort: string
	apiUsername: string
	apiPassword: string
	hasValidSettings: boolean
	client: OverseerrClient | null
	unsetClientConfig: () => Promise<void>
	setOverseerClient: (
		connectionType: string,
		address: string,
		port: string,
		username: string,
		password: string
	) => Promise<void>
	fetchInitialData: () => Promise<void>
}

const instantiateClient = (apiConnectionType: string, apiAddress: string, apiPort: string): OverseerrClient => {
	return new OverseerrClient({
		BASE: `${apiConnectionType}://${apiAddress}${apiPort ? `:${apiPort}` : ''}/api/v1`,
	})
}

const useAppStore = create<AppState>()((set) => ({
	apiConnectionType: DEFAULT_OVERSEERR_CONNECTION_TYPE,
	apiAddress: '',
	apiPort: DEFAULT_OVERSEERR_PORT,
	apiUsername: '',
	apiPassword: '',
	hasValidSettings: false,
	client: null,
	unsetClientConfig: async () => {
		if (Platform.OS === 'ios') {
			Settings.set({ apiConnectionType: DEFAULT_OVERSEERR_CONNECTION_TYPE })
			Settings.set({ apiAddress: '' })
			Settings.set({ apiPort: DEFAULT_OVERSEERR_PORT })
			Settings.set({ apiUsername: '' })
			Settings.set({ apiPassword: '' })
		} else {
			await AsyncStorage.setItem('apiConnectionType', DEFAULT_OVERSEERR_CONNECTION_TYPE)
			await AsyncStorage.setItem('apiAddress', '')
			await AsyncStorage.setItem('apiPort', DEFAULT_OVERSEERR_PORT)
			await AsyncStorage.setItem('apiUsername', '')
			await AsyncStorage.setItem('apiPassword', '')
		}
		set(() => ({
			apiConnectionType: DEFAULT_OVERSEERR_CONNECTION_TYPE,
			apiAddress: '',
			apiPort: DEFAULT_OVERSEERR_PORT,
			apiUsername: '',
			apiPassword: '',
			client: null,
			hasValidSettings: false
		}))
	},
	setOverseerClient: async (apiConnectionType: string, apiAddress: string, apiPort: string, apiUsername: string, apiPassword: string) => {
		if (Platform.OS === 'ios') {
			Settings.set({ apiConnectionType })
			Settings.set({ apiAddress })
			Settings.set({ apiPort })
			Settings.set({ apiUsername })
			Settings.set({ apiPassword })
		} else {
			await AsyncStorage.setItem('apiConnectionType', apiConnectionType)
			await AsyncStorage.setItem('apiAddress', apiAddress)
			await AsyncStorage.setItem('apiPort', apiPort)
			AsyncStorage.setItem('apiUsername', apiUsername)
			AsyncStorage.setItem('apiPassword', apiPassword)
		}
		const client = instantiateClient(apiConnectionType, apiAddress, apiPort)
		set(() => ({ apiConnectionType, apiAddress, apiPort, apiUsername, apiPassword, client, hasValidSettings: true }))
	},
	fetchInitialData: async () => {
		let apiConnectionType = ''
		let apiAddress = ''
		let apiPort = ''
		let apiUsername = ''
		let apiPassword = ''
		if (Platform.OS === 'ios') {
			apiConnectionType = Settings.get('apiConnectionType') ?? DEFAULT_OVERSEERR_CONNECTION_TYPE
			apiAddress = Settings.get('apiAddress') ?? ''
			apiPort = Settings.get('apiPort') ?? DEFAULT_OVERSEERR_PORT
			apiUsername = Settings.get('apiUsername') ?? ''
			apiPassword = Settings.get('apiPassword') ?? ''
		} else {
			apiConnectionType = await AsyncStorage.getItem('apiConnectionType') ?? DEFAULT_OVERSEERR_CONNECTION_TYPE
			apiAddress = await AsyncStorage.getItem('apiAddress') ?? ''
			apiPort = await AsyncStorage.getItem('apiPort') ?? DEFAULT_OVERSEERR_PORT
			apiUsername = await AsyncStorage.getItem('apiUsername') ?? ''
			apiPassword = await AsyncStorage.getItem('apiPassword') ?? ''
		}
		if (apiAddress && apiUsername && apiPassword) {
			const client = instantiateClient(apiConnectionType, apiAddress, apiPort)
			set({ apiConnectionType, apiAddress, apiPort, apiUsername, apiPassword, client, hasValidSettings: true })
		}
	},
}))

useAppStore.getState().fetchInitialData()

export default useAppStore
