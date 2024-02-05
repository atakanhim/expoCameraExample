import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';



export default function Button({ title, onPress, icon, color }: { title: string, onPress?: () => void, icon?: any, color?: string }) {
    return (
        <Pressable onPress={onPress} style={{ height: 40, flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
            <Entypo name={icon} size={28} color={color ? color : "white"} />
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: "white", marginLeft: 10 }}>{title} </Text>
        </Pressable>
    );
}
