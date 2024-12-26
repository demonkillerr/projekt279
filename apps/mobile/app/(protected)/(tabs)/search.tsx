import { View, TextInput } from 'react-native';

export default function SearchScreen() {
 return (
   <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
     <TextInput 
       style={{ height: 40, backgroundColor: '#f3f4f6', borderRadius: 8, paddingHorizontal: 16 }}
       placeholder="Search photos..."
     />
   </View>
 );
}