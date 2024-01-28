import { create } from 'zustand'
import { Settings } from 'react-native'
import { OverseerrClient, RadarrSettings, SonarrSettings, User } from './OverseerrClient'

interface AppState {
    user: User | null
    radarr: RadarrSettings[]
    sonarr: SonarrSettings[]
    apiKey: string
    apiAddress: string
    client: OverseerrClient | null
    setUser: (user: User) => void
    setRadarr: (settings: RadarrSettings[]) => void
    setSonarr: (settings: SonarrSettings[]) => void
    setApiKey: (key: string) => void
    setApiAddress: (address: string) => void
    setOverseerClient: (key?: string, address?: string) => void
}

const instantiateClient = (apiKey?: string, apiAddress?: string): OverseerrClient | null => {
  const key = apiKey ?? Settings.get('apiKey')
  const address = apiAddress ?? Settings.get('apiAddress')
  if (key && address) {
    return new OverseerrClient({
      BASE: `http://${address}:5055/api/v1`,
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
    client: instantiateClient(),
    setApiKey: (key) => {
      Settings.set({ apiKey: key })
      set(() => ({ apiKey: key}))
    },
    setApiAddress: (address) => {
      Settings.set({ apiAddress: address})
      set(() => ({ apiAddress: address}))
    },
    setOverseerClient: () => {
      const client = instantiateClient()
      Settings.set({ client })
    },
    setUser: (user) => {
      set(() => ({ user }))
    },
    setRadarr: (settings) => {
      set(() => ({ radarr: settings }))
    },
    setSonarr: (settings) => {
      set(() => ({ sonarr: settings }))
    },
}))

export default useAppStore