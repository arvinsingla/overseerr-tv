import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkNavigationTheme, DefaultNavigationTheme } from '@/lib/theme';

const queryClient = new QueryClient()

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
	  <QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkNavigationTheme : DefaultNavigationTheme}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
					<Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="tv/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="person/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="media-list" options={{ headerShown: false }} />
					<Stack.Screen name="movie-genre" options={{ headerShown: false }} />
					<Stack.Screen name="tv-genre" options={{ headerShown: false }} />
					<Stack.Screen name="movie-studio" options={{ headerShown: false }} />
					<Stack.Screen name="tv-network" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
			</ThemeProvider>
		</QueryClientProvider>
  );
}
