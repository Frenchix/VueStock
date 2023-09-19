import { createUserWithEmailAndPassword, updateProfile, deleteUser, signOut, signInWithEmailAndPassword, updatePassword, sendEmailVerification, verifyBeforeUpdateEmail, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail  } from "firebase/auth";
import { auth } from '../database/firebase'
import { useUserStore } from '@/store/user'

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

export function logoutUser(){
    const store = useUserStore();
    const { logout } = store;
    return new Promise((resolve, reject) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            logout();
            resolve();
        }).catch((error) => {
            // An error happened.
            reject();
        });
    });
}

export function signIn(email, password) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                resolve()
                // ...
            })
            .catch((error) => {
                reject()
            });
     });
}

export function updateUser(pseudo) {
    return new Promise((resolve, reject) => {
        updateProfile(auth.currentUser, {
            displayName: pseudo.value
          }).then(() => {
            // Profile updated!
            // ...
            resolve();
          }).catch((error) => {
            reject()
          });
     });
}

export function updateUserEmail(email, password) {
    return new Promise((resolve, reject) => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        );
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            // User re-authenticated.
            verifyBeforeUpdateEmail(auth.currentUser, email.value).then(() => {
                // Email updated!
                // ...
                resolve()
              }).catch((error) => {
                reject()
              });
          }).catch((error) => {
            reject()
          });
     });
}

export function changeUserPassword(password, newPassword) {
    return new Promise((resolve, reject) => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        );
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            // User re-authenticated.
            updatePassword(auth.currentUser, newPassword).then(() => {
                // Update successful.
                resolve();
              }).catch((error) => {
                // An error ocurred
                // ...
                reject();
              });
          }).catch((error) => {
            reject()
          });
     });
}

export function sendUserEmailVerification(){
    return new Promise((resolve, reject) => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
                resolve()
            }).catch((error) => {
              reject()
            });
     });
}

export function resetUserPassword(email){
    return new Promise((resolve, reject) => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            resolve();
        })
        .catch((error) => {
            reject();
        });
     });
}