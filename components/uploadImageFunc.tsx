import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { DocumentChange, addDoc, collection, onSnapshot } from "firebase/firestore"
import { db, storage } from "@/firebaseConfig"

export async function uploadImageFunc({ fileDirectory, uri, filetype, fileTuru, setProgress, saveRecord, setImage, setVideo }: { fileDirectory: string, setVideo: (uri: string) => any, setImage: (uri: string) => any, saveRecord: ({ createdAt, fileTuru, filetype, uri }: { createdAt: string, fileTuru: string, filetype: string, uri: string }) => Promise<any>, setProgress: (progress: any) => any, uri: string; filetype: string, fileTuru: string }): Promise<void> {
    // You can add your own backend code here to save the image to a database or cloud storage
    const response = await fetch(uri)
    const blob = await response.blob();
    const storageRef = ref(storage, fileDirectory + filetype + "/" + new Date().getTime() + "." + fileTuru);//Create a reference for Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events

    uploadTask.on("state_changed", (snapshot) => {
        const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress && setProgress(progress.toFixed() as any);
    }, (error) => {
        console.log('Error Uploading File');
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            //save record
            await saveRecord({ createdAt: new Date().toISOString(), fileTuru: fileTuru, filetype: filetype, uri: uri });
            console.log("download url : " + downloadUrl)
            setImage && setImage("")
            setVideo && setVideo("")
        });
    })


}