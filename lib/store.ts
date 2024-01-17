import { create } from 'zustand'
import { Settings } from 'react-native'

interface AppState {
    apiKey: string
    apiAddress: string
    setApiKey: (key: string) => void
    setApiAddress: (address: string) => void
}
  
const useAppStore = create<AppState>()((set) => ({
    // apiKey: Settings.get('apiKey'),
    // apiAddress: Settings.get('apiAddress'),
    apiKey: '',
    apiAddress: '',
    setApiKey: (key) => {
      Settings.set({ apiKey: key })
      set((state) => ({ apiKey: key}))
    },
    setApiAddress: (address) => {
      Settings.set({ apiAddress: address})
      set((state) => ({ apiAddress: address}))
    }
}))

export default useAppStore