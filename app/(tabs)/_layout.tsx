import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, router } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
      }}>
      <Tabs.Screen
        name="index"
        options={{

          title: 'Sec Birini',
          headerTitleStyle: {
            fontSize: 24,
            fontStyle: "italic"
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (

            <Pressable onPress={() => router.push("/modal")} >
              {({ pressed }) => (
                <FontAwesome
                  name="camera"
                  size={25}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 25, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>

          ),
          headerLeft: () => (
            <Pressable onPress={() => router.push("/exscreen")} >
              {({ pressed }) => (
                <FontAwesome
                  name="image"
                  size={25}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginLeft: 25, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>

          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
