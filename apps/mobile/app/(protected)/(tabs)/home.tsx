import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlashList
        data={[]}
        renderItem={({ item }) => null}
        estimatedItemSize={200}
      />
    </View>
  );
}