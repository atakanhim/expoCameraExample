import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { Camera, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera'
import { Entypo } from '@expo/vector-icons';
import Button from '@/components/Button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { uploadImageFunc } from '@/components/uploadImageFunc';

const Modal = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)
  const [image, setImage] = useState<string | undefined>(undefined)

  const [type, setType] = useState<number | CameraType | undefined>(CameraType.back)
  const [flash, setFlash] = useState<number | FlashMode | undefined>(FlashMode.off)


  const [video, setVideo] = useState<any>("")
  const [progressBar, setProgress] = useState<number>(0)


  const cameraRef = useRef<any>()
  useEffect(() => {
    console.log(flash)
  }, [flash, setFlash])
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
        setImage(data?.uri);
      } catch (e) {
        console.log(e);
      }
    }
  }
  const savePicture = async () => {
    if (cameraRef) {
      try {

        await uploadImageFunc({
          uri: image as string,
          filetype: "image",
          fileTuru: "jpg",
          saveRecord,
          setImage,
          setProgress,
          setVideo,
          fileDirectory: "CameraModal/"
        });


      } catch (e) {
        console.log(e);
      }
    }
  }
  async function saveRecord({ uri, filetype, fileTuru, createdAt }: { uri: string; filetype: string, fileTuru: string, createdAt: string }) {
    try {
      const docRef = await addDoc(collection(db, "modalFiles"), {
        fileType: filetype,
        fileUrl: uri,
        fileCreatingTime: createdAt,
        fileExtention: fileTuru
      });
      console.log("document saved corretyl", docRef.id)
    }
    catch (e) {
      console.log(e);
    }
  }
  const switchCameraType = (type: CameraType) => {

    switch (type) {
      case CameraType.front:
        setType(CameraType.back)
        break;
      case CameraType.back:
        setType(CameraType.front)
        break;

      default:
        break;
    }
  }
  const switchFlashType = (flash: FlashMode) => {

    switch (flash) {
      case FlashMode.on:
        setFlash(FlashMode.off)
        break;
      case FlashMode.off:
        setFlash(FlashMode.on)
        break;

      default:
        break;
    }
  }
  if (hasCameraPermission === false)
    return <Text>no premiison</Text>
  return (
    <View style={styles.container}>
      {!image ?
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ratio='16:9'
          ref={cameraRef}
        >
          <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 15, paddingTop: 15 }}>
            <Button size={45} icon={"retweet"} title={''} onPress={() => switchCameraType(type as CameraType)} />
            <Button size={45} icon={"flash"} onPress={() => switchFlashType(flash as FlashMode)} color={flash === FlashMode.off ? 'gray' : '#fff'} />
          </View>

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
    paddingBottom: 25
  },
  camera: {
    flex: 1,
    borderWidth: 1,
    borderColor: "red",
  }
})
export default Modal;