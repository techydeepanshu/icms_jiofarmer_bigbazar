import firebase from 'firebase'
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDmK-zcj0LVrrQKbAfflUa-Hi_kRT4-ZWM",
    authDomain: "pos-inventory-management.firebaseapp.com",
    projectId: "pos-inventory-management",
    storageBucket: "pos-inventory-management.appspot.com",
    messagingSenderId: "806321755660",
    appId: "1:806321755660:web:0a48131e25b711b86c0029",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
export default firebase