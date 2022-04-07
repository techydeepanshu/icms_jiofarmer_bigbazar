import firebase from 'firebase'
// import { getFirestore } from "firebase/firestore"
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: "AIzaSyDmK-zcj0LVrrQKbAfflUa-Hi_kRT4-ZWM",
  //   authDomain: "pos-inventory-management.firebaseapp.com",
  //   projectId: "pos-inventory-management",
  //   storageBucket: "pos-inventory-management.appspot.com",
  //   messagingSenderId: "806321755660",
  //   appId: "1:806321755660:web:0a48131e25b711b86c0029",
  // };

  const firebaseConfig = {
    apiKey: "AIzaSyC-H7PNeXtm7cv6TaQhnPEkkcBnfFgkxcQ",
    authDomain: "sunil-sir-apna-bazaar-delaware.firebaseapp.com",
    projectId: "sunil-sir-apna-bazaar-delaware",
    storageBucket: "sunil-sir-apna-bazaar-delaware.appspot.com",
    messagingSenderId: "351048275374",
    appId: "1:351048275374:web:a8b00f87ab03eb5db8a43f",
    measurementId: "G-X3LVF9E3PS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase
