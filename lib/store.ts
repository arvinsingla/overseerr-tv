import { create } from 'zustand'
import { Settings } from 'react-native'
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
		setClientConfig: (key: string, address: string) => void
    setOverseerClient: (key?: string, address?: string) => void
}

const instantiateClient = (apiKey?: string, apiAddress?: string, apiPort?: string): OverseerrClient | null => {
  const key = apiKey ?? Settings.get('apiKey')
  const address = apiAddress ?? Settings.get('apiAddress')
  const port = apiPort ?? Settings.get('apiPort') ?? DEFAULT_OVERSEERR_PORT
  if (key && address) {
    return new OverseerrClient({
      BASE: `http://${address}:${port}/api/v1`,
      HEADERS: {
        'X-Api-Key': key
      }
    })
  }
  return null
}

const useAppStore = create<AppState>()((set) => ({
    user: null,
    radarr: [],
    sonarr: [],
    apiKey: Settings.get('apiKey'),
    apiAddress: Settings.get('apiAddress'),
    apiPort: Settings.get('apiPort') || DEFAULT_OVERSEERR_PORT,
    client: instantiateClient(),
    setUser: (user) => {
			set(() => ({ user }))
    },
    setRadarr: (settings) => {
			set(() => ({ radarr: settings }))
    },
    setSonarr: (settings) => {
			set(() => ({ sonarr: settings }))
    },
		setClientConfig: (key: string, address: string) => {
			Settings.set({ apiKey: key })
			Settings.set({ apiAddress: address})
			set(() => ({ apiAddress: address, apiKey: key}))
		},
		setOverseerClient: (key?: string, address?: string) => {
			Settings.set({ apiKey: key })
			Settings.set({ apiAddress: address})
			const client = key && address ? instantiateClient(key, address) : instantiateClient()
			set(() => ({ apiAddress: address, apiKey: key, client}))
		},
}))

export default useAppStore
