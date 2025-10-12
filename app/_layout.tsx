import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import useAppStore from '@/lib/store';
import { DarkNavigationTheme, DefaultNavigationTheme } from '@/lib/theme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// Disable reanimated warnings
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const queryClient = new QueryClient()

export default function RootLayout() {
  const { apiKey, apiAddress } = useAppStore()
  const hasServerSettings = apiKey && apiAddress
  const colorScheme = useColorScheme();
  // const [loaded, error] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //     if (error) {
  //       console.warn(`Error in loading fonts: ${error}`);
  //     }
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }

  return (
	  <QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkNavigationTheme : DefaultNavigationTheme}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
					<Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="tv/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="trending" options={{ headerShown: false }} />
					<Stack.Screen name="popular-movies" options={{ headerShown: false }} />
					<Stack.Screen name="popular-tv" options={{ headerShown: false }} />
					<Stack.Screen name="upcoming-movies" options={{ headerShown: false }} />
					<Stack.Screen name="upcoming-tv" options={{ headerShown: false }} />
					<Stack.Screen name="genre-movie/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="genre-tv/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="studio/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="network/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
			</ThemeProvider>
		</QueryClientProvider>
  );
}
