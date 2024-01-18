import { View, Text, SafeAreaView } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';

type RequestScreenRouteProp = RouteProp<RootStackParamList, 'Request'>;

function RequestScreen(): JSX.Element {
  const route = useRoute<RequestScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { item } = route.params

  // Satisfy typescript
  const mediaType = item.mediaType === 'movie' ? 'movie' : 'tv'

  const submitRequest = async () => {
    await client?.request.postRequest({
      mediaId: item.id,
      mediaType
    })
  }

  return (
    <SafeAreaView>
      <View>
        <Text>{item.id}</Text>
      </View>
    </SafeAreaView>
  );
}

export default RequestScreen