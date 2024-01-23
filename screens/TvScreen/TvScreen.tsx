import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';

type TvScreenRouteProp = RouteProp<RootStackParamList, 'Tv'>;

function TvScreen(): JSX.Element {
  const route = useRoute<TvScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { item } = route.params

  const submitRequest = async () => {
    await client?.request.postRequest({
      mediaId: item.id,
      mediaType: 'tv'
    })
    navigation.navigate('Discovery')
  }

  return (
    <SafeAreaView>
      <View>
        <Text>{item.id}</Text>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  
})

export default TvScreen