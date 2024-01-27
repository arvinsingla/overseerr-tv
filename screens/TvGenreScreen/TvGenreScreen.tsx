import { SafeAreaView, StyleSheet, Text } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import TvList from "../../components/TvList/TvList";
import { TvResult } from "../../lib/OverseerrClient";

type TvGenreScreenRouteProp = RouteProp<RootStackParamList, 'MovieGenre'>;

function TvGenreScreen(): JSX.Element {
  const route = useRoute<TvGenreScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { category } = route.params

  const {error, isPending, isSuccess, data } = useQuery({
    queryKey: ['genre-tv', category.id],
    queryFn: () => client?.search.getDiscoverTvGenre(category.id.toString())
  })

  const onPress = (item: TvResult) => {
    navigation.navigate("Tv", { item })
  }

  return(
    <SafeAreaView>
      {isSuccess && data?.results?.length &&
        <TvList
          tv={data?.results}
          onPress={onPress}
          header={<Text style={styles.title}>Series: {category.name}</Text>}
        />
      }
    </SafeAreaView>
  ) 
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 60,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default TvGenreScreen