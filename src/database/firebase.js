import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDatabase } from 'vuefire'

const firebaseConfig = {
    apiKey: "AIzaSyD9-HuSkYeNGJa_aU0ZDrOMWVl12BX7zco",
    authDomain: "vuestock-8db09.firebaseapp.com",
    projectId: "vuestock-8db09",
    storageBucket: "vuestock-8db09.appspot.com",
    messagingSenderId: "94688918004",
    appId: "1:94688918004:web:1d8b48ca63e1e5c1e9a1a1",
    databaseURL: "https://vuestock-8db09-default-rtdb.europe-west1.firebasedatabase.app"
  };

export const firebaseApp = initializeApp(firebaseConfig)
export const db = useDatabase();
export const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
        // this.$cookie.set('pseudo', user.displayName);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
        console.log("user log out")
      // User is signed out
      // ...
    }
  });

// used for the databas refs
// const db = getDatabase(app)
// export default db
// here we can export reusable database references
// export const todosRef = dbRef(db, 'todos')