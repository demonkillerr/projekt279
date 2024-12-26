import { View, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { uploadPhoto } from '../../../src/services/upload';
import { useAuth } from '@clerk/clerk-expo';

export default function CreateScreen() {
 const [image, setImage] = useState<string | null>(null);

 const pickImage = async () => {
   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
   
   if (status !== 'granted') {
     alert('Permission denied');
     return;
   }

   const { getToken } = useAuth();
 
    const handleUpload = async (uri: string) => {
    try {
        const token = await getToken();
        const result = await uploadPhoto(uri, token);
        console.log('Upload success:', result.url);
    } catch (error) {
        console.error('Upload failed:', error);
    }
    };

   const result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
     quality: 1,
   });

   if (!result.canceled) {
     setImage(result.assets[0].uri);
     // Upload logic here
   }
 };

 return (
   <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
     <TouchableOpacity 
       style={{ backgroundColor: '#3b82f6', padding: 16, borderRadius: 8, marginBottom: 16 }}
       onPress={pickImage}
     >
       <Text style={{ color: 'white', textAlign: 'center' }}>Pick Image</Text>
     </TouchableOpacity>

     {image && (
       <Image 
         source={{ uri: image }}
         style={{ width: '100%', height: 300, borderRadius: 8 }}
       />
     )}
   </View>
 );
}