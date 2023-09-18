import { createUserWithEmailAndPassword, updateProfile, deleteUser, signOut  } from "firebase/auth";
import { auth } from '../database/firebase'

export function createUser(email, password, pseudo) {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: pseudo
                  }).then(() => {
                    resolve();
                  }).catch((error) => {
                    deleteUser(auth.currentUser).then(() => {
                        // User deleted.
                      }).catch((error) => {
                        // An error ocurred
                        // ...
                      });
                    reject(error);
                  });
            })
            .catch((error) => {
                reject(error);
            });
     });
}

export function logout(){
    return new Promise((resolve, reject) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            resolve();
        }).catch((error) => {
            // An error happened.
            reject();
        });
    });
}