import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// the below imports are option - comment out what you don't need
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const Firebase = initializeApp(clientCredentials);


export default Firebase;
