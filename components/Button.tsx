import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';



export default function Button({ title, onPress, icon, color, size }: { title?: string, onPress?: () => void, icon?: any, color?: string, size?: number }) {
    return (
        <Pressable onPress={onPress} style={{ minHeight: 40, flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
            <Entypo name={icon} size={size ? size : 26} color={color ? color : "gray"} />
            {title ? <Text style={{ fontWeight: 'bold', fontSize: 16, color: "gray", marginLeft: 10 }}>{title} </Text> : <></>}

        </Pressable>
    );
}
