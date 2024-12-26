# First, remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Update package.json dependencies
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@clerk/clerk-expo": "^0.19.27",
    "expo": "~50.0.0",
    "expo-secure-store": "~12.8.1",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@react-navigation/stack": "^6.3.20",
    "expo-image-picker": "~14.7.1",
    "expo-media-library": "~15.9.1",
    "@shopify/flash-list": "1.6.3",
    "react-native-reanimated": "~3.6.1"
  }
}

# Reinstall with legacy peer deps
npm install --legacy-peer-deps
