import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
import { ResizeMode, Video } from 'expo-av';
import ProgressBar from './ProgressBar';


const UpLoading = ({ image, video, progress }: { image?: string | undefined, video?: any, progress?: number }) => {

    return (
        <View style={{ top: 0, right: 0, width: "100%", height: "100%", borderWidth: 1, zIndex: 1, position: "absolute", alignItems: "center", justifyContent: "center", backgroundColor: "black", opacity: 1 }}>

            <BlurView intensity={99} tint="dark" style={styles.blurContainer}>

                {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, resizeMode: "contain", borderRadius: 6 }} />}
                {video && <Video shouldPlay source={{ uri: video }} videoStyle={{}} rate={1.0} volume={1.0} isMuted={false} resizeMode={ResizeMode.CONTAIN} useNativeControls style={{ width: 200, height: 100 }} />}
                <Text style={[styles.text, { color: '#fff' }]}>Uploading ...</Text>
                <ProgressBar progress={progress} />

                <Pressable onPress={() => { alert("Video has been deleted") }} >
                    <Text style={{ fontSize: 15, color: "lightblue", fontWeight: "500", borderWidth: 1, borderRadius: 11, padding: 15, borderColor: "red", shadowColor: "blue", shadowOpacity: 1, textShadowColor: "red", shadowOffset: { width: 100, height: 100 } }} >Cansel</Text>
                </Pressable>
            </BlurView>
        </View >
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // varsayılan arka plan rengi
    },
    box: {
        width: 50,
        height: 50,
        margin: 5,
    },
    boxEven: {
        backgroundColor: 'lightblue', // çift kutuların arka plan rengi
    },
    boxOdd: {
        backgroundColor: 'lightgreen', // tek kutuların arka plan rengi
    },
    blurContainer: {

        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        width: "80%",

        gap: 30, borderWidth: 1,

    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
export default UpLoading