import firebase from 'firebase'

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyB_jKCUu6T-5FeaLqiY7hDxY1g1dqYK0Pg",
        authDomain: "messenger-clone-a3037.firebaseapp.com",
        projectId: "messenger-clone-a3037",
        storageBucket: "messenger-clone-a3037.appspot.com",
        messagingSenderId: "370267605799",
        appId: "1:370267605799:web:3a44e5a512d2a40c3eb702",
        measurementId: "G-G1LNR8RHJP"
    }
);

const DB = firebaseApp.firestore();

export {
    DB
}