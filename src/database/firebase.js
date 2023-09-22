import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { useDatabase } from 'vuefire'
import { onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE__FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DB_URL
  };

export const firebaseApp = initializeApp(firebaseConfig)
export const db = useDatabase();
export const auth = getAuth(firebaseApp);


export function getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe()
          resolve(user)
        },
        reject
      )
    })
  }
// used for the databas refs
// const db = getDatabase(app)
// export default db
// here we can export reusable database references
// export const todosRef = dbRef(db, 'todos')