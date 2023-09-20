import { createUserWithEmailAndPassword, updateProfile, deleteUser, signOut, signInWithEmailAndPassword, updatePassword, sendEmailVerification, verifyBeforeUpdateEmail, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
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

export function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return new Promise((resolve, reject) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                resolve();
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                reject();
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