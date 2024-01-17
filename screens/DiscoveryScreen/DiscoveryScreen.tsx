import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from '@tanstack/react-query'
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
import HorizontalMovieList from '../../components/HorizontalMovieList/HorizontalMovieList'
import { OverseerrClient } from '../../lib/OverseerrClient'
import useAppStore from "../../lib/store";

function DiscoveryScreen(): JSX.Element {
  const { apiKey, apiAddress} = useAppStore()
  // const overseerrClient = new OverseerrClient({
  //   BASE: `http://${apiAddress}/api/v1`,
  //   HEADERS: {
  //     'X-Api-Key': apiKey
  //   }
  // })
  const overseerrClient = new OverseerrClient({
    BASE: 'http://192.168.10.15:5055/api/v1',
    HEADERS: {
      'X-Api-Key': 'MTY3OTk0NDc3NDcxOWM1YWQyOWE0LWY3MDItNGRiYi1hOTliLWI0ZjNjZTM0MDVlOCk='
    }
  })
    // const isDarkMode = useColorScheme() === 'dark';
    // const backgroundStyle = {
    //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // };
  const {error: discoverMoviesError, isPending: discoverMoviesPending, isSuccess: discoverMoviesSuccess, data: discoverMoviesData } = useQuery({
    queryKey: ['discover-movies'],
    queryFn: () => overseerrClient.search.getDiscoverMovies()
  })

  return (
      <SafeAreaView>
        <View>
            {discoverMoviesSuccess ? <HorizontalMovieList movies={discoverMoviesData?.results || []} /> : null}
            {discoverMoviesPending ? <Text>Nothing to show you</Text> : null }
        </View>
      </SafeAreaView>
  );
}

export default DiscoveryScreen

// return (
//   <QueryClientProvider client={queryClient}>
//     <SafeAreaView style={backgroundStyle}>
//       <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}
//         >
//           {discoverMoviesSuccess ? <HorizontalMovieList movies={discoverMoviesData?.results || []} /> : null}
//           {discoverMoviesPending ? <Text>Nothing to show you</Text> : null }
//       </View>
//     </SafeAreaView>
//   </QueryClientProvider>
// );