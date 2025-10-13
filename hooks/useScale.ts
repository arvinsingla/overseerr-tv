import { Platform, Dimensions } from 'react-native';

// Get dimensions
export function useScale(): number {
	const width = Dimensions.get('window').width;
  return Platform.isTV ? width / 1000 : 1;
}
