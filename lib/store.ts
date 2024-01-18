import { create } from 'zustand'
import { Settings } from 'react-native'
import { OverseerrClient } from './OverseerrClient'

interface AppState {
    apiKey: string
    apiAddress: string
    client: OverseerrClient | null
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
    apiKey: Settings.get('apiKey'),
    apiAddress: Settings.get('apiAddress'),
    client: instantiateClient(),
    setApiKey: (key) => {
      Settings.set({ apiKey: key })
      set((state) => ({ apiKey: key}))
    },
    setApiAddress: (address) => {
      Settings.set({ apiAddress: address})
      set((state) => ({ apiAddress: address}))
    },
    setOverseerClient: () => {
      const client = instantiateClient()
      Settings.set({ client })
    }
}))

export default useAppStore