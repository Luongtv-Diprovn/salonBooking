import firebase from '@react-native-firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBWFq7ql4OxKVq_TkO-qB0K_QJq7X99-G4",
    authDomain: "salonbooking-e4035.firebaseapp.com",
    projectId: "salonbooking-e4035",
    storageBucket: "salonbooking-e4035.appspot.com",
    messagingSenderId: "721112877365",
    appId: "1:721112877365:web:73ea33bae8bda79c37a47c",
    measurementId: "G-1KG83PGJRQ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)

}

