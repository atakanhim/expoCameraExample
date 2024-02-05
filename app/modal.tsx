import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { Camera, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera'
import { Entypo } from '@expo/vector-icons';
import Button from '@/components/Button';

const Modal = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)
  const [image, setImage] = useState<string | undefined>(undefined)

  const [type, setType] = useState<number | CameraType | undefined>(undefined)
  const [flash, setFlash] = useState<number | FlashMode | undefined>(undefined)

  const cameraRef = useRef<any>()

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      console.log(cameraStatus.status);
      setHasCameraPermission(cameraStatus.status === 'granted');

    })();

  }, [])
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current?.takePictureAsync();
        console.log(data?.uri);
        setImage(data?.uri);



      } catch (e) {
        console.log(e);
      }
    }
  }
  const savePicture = async () => {
    if (cameraRef) {
      try {
        console.log("saveledm")
      } catch (e) {
        console.log(e);
      }
    }
  }

  if (hasCameraPermission === false)
    return <Text>no premiison</Text>
  return (
    <View style={styles.container}>
      {!image ? <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >

      </Camera> : <Image source={{ uri: image }} style={styles.camera} />}
      {image ?
        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
          <Button icon={"retweet"} title={'Retweet'} onPress={() => setImage(undefined)} />
          <Button icon={"check"} title={'Save'} onPress={savePicture} />
        </View> :
        <View>
          <Button icon={"camera"} title={'Take A Picture'} onPress={takePicture} />
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 25
  },
  camera: {
    flex: 1
  }
})
export default Modal;