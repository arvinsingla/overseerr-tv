import { SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';

type GenreScreenRouteProp = RouteProp<RootStackParamList, 'Genre'>;

function GenreScreen(): JSX.Element {
  const route = useRoute<GenreScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { type, category } = route.params

  const {error, isPending, isSuccess, data } = useQuery({
    queryKey: ['genre-movies', category.id],
    queryFn: () => client?.search.getDiscoverMoviesGenre(category.id.toString())
  })

  return(
    <SafeAreaView>
        <Text>{category.name}</Text>
    </SafeAreaView>
  ) 
}

export default GenreScreen