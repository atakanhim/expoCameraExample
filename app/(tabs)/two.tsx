import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { getStorage } from "firebase/storage";
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
const two = () => {
  const [image, setImage] = useState<string | undefined>(undefined)
  const [uploading, setUploading] = useState<boolean>(false)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const uploadMedia = async () => {
    setUploading(false);
    const { uri } = await FileSystem.getInfoAsync(image as string);
    const blob = new Promise<Blob>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.response) {
          resolve(xhr.response);
        } else {
          reject(new TypeError('network request failed'));
        }
      };
      xhr.onerror = () => {
        reject(new TypeError('network request failed'));
      };
      xhr.open('GET', uri, true); // Bu kısımda bir URL belirtmeniz gerekiyor.
      xhr.responseType = 'blob';
      xhr.send();
    });

    const filename = image?.substring(image.lastIndexOf('/') + 1);

  }


  return (

    <View style={styles.container}>
      <Text>two</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  }
})
export default two