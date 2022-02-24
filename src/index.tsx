import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { ScreenContainer } from './components/screen_container/ScreenContainer';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import FaceDetectionCamera from './components/FaceDetectionCamera/FaceDetectionCamera';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    // <SafeAreaProvider>
    //   <ScreenContainer>
        <FaceDetectionCamera></FaceDetectionCamera>
    //   </ScreenContainer>
    // </SafeAreaProvider>
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
