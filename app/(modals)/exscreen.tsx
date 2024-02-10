import { View, Text, Pressable, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import SvgComponent from '../components/SvgComponent'
import ProgressBar from '../components/ProgressBar'
import UpLoading from '../components/UpLoading'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { DocumentChange, addDoc, collection, onSnapshot } from "firebase/firestore"
import { db, storage } from "@/firebaseConfig"
import { ResizeMode, Video } from 'expo-av'
const exscreen = () => {
    const [files, setFiles] = useState<any>([])
    useEffect(() => {
        console.log("selam ")
        const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
            snapshot.docChanges().forEach((change: DocumentChange) => {
                if (change.type === "added") {
                    console.log("new file", change.doc.data())
                    setFiles((prevFiles: any) => ([...prevFiles, change.doc.data()]))
                }


            })
        })
        return () => unsubscribe()
    }, [])
    const [image, setImage] = useState<any>("")
    const [video, setVideo] = useState<any>("")
    const [progressBar, setProgress] = useState<number>(0)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.canceled) {
            console.log(result)
            setImage(result.assets[0].uri)
            await uploadImage({
                uri: result.assets[0].uri,
                filetype: "image",
                fileTuru: "jpg"
            });
        }
    }
    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.canceled) {
            console.log(result)
            setVideo(result.assets[0].uri)
            await uploadImage({
                uri: result.assets[0].uri,
                filetype: "video",
                fileTuru: "mp4"
            });
        }
    }
    async function saveRecord({ uri, filetype, fileTuru, createdAt }: { uri: string; filetype: string, fileTuru: string, createdAt: string }) {
        try {
            const docRef = await addDoc(collection(db, "files"), {
                filename: filetype,
                fileUrl: uri,
                olusturulmaZamani: createdAt,
                fileUzantisi: fileTuru
            });
            console.log("document saved corretyl", docRef.id)
        }
        catch (e) {
            console.log(e);
        }
    }
    async function uploadImage({ uri, filetype, fileTuru }: { uri: string; filetype: string, fileTuru: string }): Promise<void> {
        // You can add your own backend code here to save the image to a database or cloud storage
        const response = await fetch(uri)
        const blob = await response.blob();
        const storageRef = ref(storage, "Stuff/" + filetype + "/" + new Date().getTime() + "." + fileTuru);//Create a reference for Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, blob);

        // listen for events

        uploadTask.on("state_changed", (snapshot) => {
            const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Progress : " + progress + "%");
            setProgress(progress.toFixed() as any);
        }, (error) => {
            console.log('Error Uploading File');
        }, () => {
            console.log("completated");
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                //save record
                await saveRecord({ createdAt: new Date().toISOString(), fileTuru: fileTuru, filetype: filetype, uri: uri });
                console.log("download url : " + downloadUrl)
                setImage("")
                setVideo("")
            });
        })


    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ minHeight: 200, borderBottomWidth: 1, borderRadius: 99, borderColor: "green", padding: 15, justifyContent: "center", alignItems: "center" }}>
                <FlatList contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: "center",
                    justifyContent: "center"
                }} data={files} keyExtractor={(item) => item.url} renderItem={(item) => {
                    if (item.item.filename === "image") {
                        return (
                            <Image key={item.index} source={{ uri: item.item.fileUrl }} style={{ margin: 5, width: 100, height: 100, borderRadius: 99 }} />
                        )
                    }
                    return (
                        <Video
                            key={item.index}
                            source={{ uri: item.item.fileUrl }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode={ResizeMode.COVER}

                            // is looping
                            useNativeControls
                            style={{ width: 100, height: 100, borderWidth: 1, borderColor: "red" }}
                        />
                    )
                }} />
            </View >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                {/* <SvgComponent /> */}


                <Pressable style={{ position: "absolute", bottom: 90, right: 20, width: 44, height: 44, justifyContent: "center", alignItems: "center", backgroundColor: "black", borderRadius: 25 }}
                    onPress={() => pickImage()}>
                    <Ionicons name='image' size={24} color="white" />
                </Pressable>
                <Pressable style={{ position: "absolute", bottom: 30, right: 20, width: 44, height: 44, justifyContent: "center", alignItems: "center", backgroundColor: "black", borderRadius: 25 }}
                    onPress={() => pickVideo()}>
                    <Ionicons name='videocam' size={24} color="white" />
                </Pressable>
            </View>
            {image ? <UpLoading progress={progressBar} image={image} /> : video ? <UpLoading progress={progressBar} video={video} /> : <Text>upload ima ge</Text>}
        </View>
    )
}

export default exscreen

function uuidv4() {
    throw new Error('Function not implemented.')
}
