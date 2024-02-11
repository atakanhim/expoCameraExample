import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (

    <Stack  >
      <Stack.Screen name="(tabs)" options={{ headerShown: false, }} />
      <Stack.Screen name="(modals)/modal" options={{
        headerLeft: () => {
          return <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={28} /></Pressable>
        }, headerBackVisible: false, title: "Kamera ile ekle", headerTitleAlign: "center", presentation: "modal", animation: "slide_from_right"
      }} />
      <Stack.Screen name="(modals)/exscreen" options={{
        headerBackVisible: false, headerRight: () => {
          return <Pressable onPress={() => router.back()}><Ionicons name="arrow-forward" size={28} /></Pressable>
        }, title: "Galeri ile ekle", headerTitleAlign: "center", presentation: "modal", animation: "slide_from_left"
      }} />



    </Stack>

  );
}
// import { View, Text } from 'react-native'
// import React from 'react'
// import { Stack } from 'expo-router'

// const _layout = () => {
//     return (
//         <Stack >

//             <Stack.Screen name="modal" options={{ title: "Kamera ile ekle", headerTitleAlign: "center", presentation: "modal", animation: "slide_from_right" }} />


//             <Stack.Screen name="exscreen" options={{ title: "Galeri ile ekle", headerTitleAlign: "center", presentation: "modal", animation: "slide_from_bottom" }} />

//         </Stack >
//     )
// }

// export default _layout
