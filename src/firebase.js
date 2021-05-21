
import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC84ee_xWzbTEGwJnZZoAfonjgEOu1vp_c",
    authDomain: "insta-clone-a7185.firebaseapp.com",
    databaseURL: "https://insta-clone-a7185-default-rtdb.firebaseio.com",
    projectId: "insta-clone-a7185",
    storageBucket: "insta-clone-a7185.appspot.com",
    messagingSenderId: "1088341742880",
    appId: "1:1088341742880:web:a87b5377ed328651f07345",
    measurementId: "G-EG6LXHMN6X"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage =  firebase.storage();

  export {db,auth,storage};