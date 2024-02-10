import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Rect } from 'react-native-svg'
const ProgressBar = (progress: any) => {
    const barW = 230;
    const progressW = (progress.progress / 100) * barW;
    return (
        <View style={{ padding: 3, borderWidth: 1, borderColor: "red" }}>
            <Svg width={barW} height={"7"} fill={"#f5dacb"}  >
                <Rect width={progressW} height={"100%"} fill={"#3478f6"} />
            </Svg>
        </View>
    )
}

export default ProgressBar