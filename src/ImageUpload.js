import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './ImageUpload.css';
import {storage , db} from './firebase';
import firebase from './firebase';

const ImageUpload = ({username}) => {
    const [image,setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }

    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=> {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);

            },
            (error) => {
                //error function\
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function
                storage.ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //posyt the image
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username

                    });
                    setProgress(0);
                    setCaption(null);
                    setImage(null);
                }) 
                 
            }

        )
    }




    return (
    <div className="imageupload">
        <progress className="progress" value={progress} max="100"></progress>
        <input type="text" placeholder="Enter a caption" onChange={(e) => setCaption(e.target.value)} value={caption} />
        <input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>Upload</Button>
    </div>


    )

}
export default ImageUpload;
