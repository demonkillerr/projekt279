import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

export default function ProfileScreen() {
 const { signOut } = useAuth();

 return (
   <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
     <View style={{ flex: 1 }}>
       <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile</Text>
     </View>
     <TouchableOpacity 
       style={{ backgroundColor: '#ef4444', padding: 16, borderRadius: 8 }}
       onPress={() => signOut()}
     >
       <Text style={{ color: 'white', textAlign: 'center' }}>Sign Out</Text>
     </TouchableOpacity>
   </View>
 );
}