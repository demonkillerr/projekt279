import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ClerkProvider from './src/auth/ClerkProvider';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <ClerkProvider>
      <RootNavigator />
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
