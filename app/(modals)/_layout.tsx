import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack >

            <Stack.Screen name="modal" options={{ title: "Kamera ile ekle", headerTitleAlign: "center", presentation: "modal", animation: "slide_from_right" }} />


            <Stack.Screen name="exscreen" options={{ title: "Galeri ile ekle", headerTitleAlign: "center", presentation: "transparentModal", animation: "slide_from_bottom" }} />

        </Stack >
    )
}

export default _layout
