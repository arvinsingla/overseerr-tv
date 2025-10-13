import { NativeTabs, Label, Icon } from 'expo-router/unstable-native-tabs';
import { useRouter } from 'expo-router';
import useAppStore from '@/lib/store';

export default function TabLayout() {
	const router = useRouter()
	const { apiAddress } = useAppStore()
	const hasServerSettings = apiAddress

	// if (!hasServerSettings) {
	// 	router.replace('/(tabs)/settings')
	// }

  return (
		<NativeTabs>
			<NativeTabs.Trigger
				name="index"
				hidden={!hasServerSettings}
			>
				<Label>Discovery</Label>
				<Icon sf="tv.fill" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger
				name="search"
				hidden={!hasServerSettings}
			>
				<Label>Search</Label>
				<Icon sf="magnifyingglass" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="settings">
				<Label>Settings</Label>
				<Icon sf="gear" />
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
