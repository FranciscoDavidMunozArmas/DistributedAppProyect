import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const signUp = async(email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({
            code: errorCode,
            message: errorMessage
        })
    }
}

export const signIn = async(email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({
            code: errorCode,
            message: errorMessage
        });
    }
}

export const logOut = async() => {
    try {
        await signOut();
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({
            code: errorCode,
            message: errorMessage
        });
    }
}

export const googleSignIn = async() => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({
            code: errorCode,
            message: errorMessage
        });
    }
}