import { NativeTabs, Label, Icon } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {

  return (
		<NativeTabs>
			<NativeTabs.Trigger name="index">
				<Label>Discovery</Label>
				<Icon sf="tv.fill" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="search">
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
