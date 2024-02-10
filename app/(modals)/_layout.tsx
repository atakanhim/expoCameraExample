import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack initialRouteName='exscreen'>
            <Stack.Screen name="exscreen" options={{ presentation: 'modal' }} />

            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
    )
}

export default _layout
