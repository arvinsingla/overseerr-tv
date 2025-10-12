import type { PropsWithChildren } from 'react';
import { StyleSheet, ImageBackground, View, ScrollView, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';

export default function ParallaxScrollView({ children }: PropsWithChildren) {
  const styles = useParallaxScrollViewStyles();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={ styles.header }>
					<ImageBackground source={require('../assets/images/seerrtv-background.png')} style={{ flex: 1 }} resizeMode="cover" />
					<Image source={require('@/assets/images/seerrtv.png')} style={styles.logo} />
        </View>
        <ThemedView style={ styles.content }>
					{children}
				</ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const useParallaxScrollViewStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    container: {
      flex: 1,
			margin: 0,
			padding: 0,
    },
		logo: {
      width: 70 * scale,
      height: 70 * scale,
      bottom: 15,
      left: 32 * scale,
      position: 'absolute',
    },
    header: {
      height: 85 * scale,
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      padding: 32 * scale,
      gap: 16 * scale,
      overflow: 'hidden',
    },
  });
};
