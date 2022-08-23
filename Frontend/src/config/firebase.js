import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBRshWQAHBHGDdLW5_7D-Nl8bFSqf-nesU",
    authDomain: "react-recipe-c11f1.firebaseapp.com",
    projectId: "react-recipe-c11f1",
    storageBucket: "react-recipe-c11f1.appspot.com",
    messagingSenderId: "356431584425",
    appId: "1:356431584425:web:84deb6dcb4aa473ab95db8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);