import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error({
                code: errorCode,
                message: errorMessage
            })
        });
}

export const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error({
                code: errorCode,
                message: errorMessage
            })
        });
}

export const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error({
                code: errorCode,
                message: errorMessage
            })
        });
}