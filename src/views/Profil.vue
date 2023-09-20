<template>
    <div>
      <main>
        <section class="absolute w-full">
          <div
            class="absolute top-0 w-full h-full bg-gray-900"
            style="background-size: 100%; background-repeat: no-repeat;"
          ></div>
          <div class="container mx-auto px-4 h-full">
            <div class="flex content-center items-center justify-center h-full">
              <div class="w-full lg:w-4/12 px-4">
                <div
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
                >
                  <div class="flex-auto px-4 lg:px-10 py-10 pt-0 mt-5">
                    <div class="w-full flex justify-between items-center mb-3">
                        <div>

                        </div>
                        <div class="text-gray-500 text-center font-bold text-xl">
                            Mon Profil
                        </div>
                        <button @click="router.push('/')" class="bg-blue-500 text-white active:bg-blue-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none">
                            Accueil
                        </button>
                    </div>
                    <form @submit.prevent="editPseudo()">
                        <div class="relative w-full mb-3">
                            <label
                            class="block uppercase text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                            >Pseudo</label
                            ><input
                            type="text"
                            v-model="userName"
                            class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Pseudo"
                            style="transition: all 0.15s ease 0s;"
                            required
                            />
                      </div>
                      <div v-if="provider !== 'google.com'" class="text-center mt-6">
                        <button
                          class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style="transition: all 0.15s ease 0s;"
                        >
                          Modifier mon pseudo
                        </button>
                      </div>
                    </form>
                    <form @submit.prevent="editEmail()">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                          >Email</label
                        ><input
                          type="email"
                          v-model="userMail"
                          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style="transition: all 0.15s ease 0s;"
                          required
                        />
                      </div>
                      <div v-if="emailVerified" class="mt-6">
                        <label v-if="provider !== 'google.com'"
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                          >Rentre ton mot de passe</label
                        ><input v-if="provider !== 'google.com'"
                          type="password"
                          v-model="passwordMail"
                          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full mb-6"
                          placeholder="Mot de passe actuel"
                          style="transition: all 0.15s ease 0s;"
                          required
                        />
                        <button v-if="provider !== 'google.com'"
                          class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-6 w-full"
                          type="submit"
                          style="transition: all 0.15s ease 0s;"
                        >
                          Modifier mon email
                        </button>
                      </div>
                      <div v-else class="text-center my-6">
                        Veuillez valider votre email
                        <button @click="sendEmailVerification" class="bg-green-500 text-white active:bg-green-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-1">
                            Envoyer lien de validation
                        </button>
                      </div>
                    </form>
                    <form v-if="provider !== 'google.com'" @submit.prevent="changePassword()">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                          >Ancien Mot de passe</label
                        ><input
                          type="password"
                          v-model="password"
                          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Ancien mot de passe"
                          style="transition: all 0.15s ease 0s;"
                          required
                        />
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold my-2"
                          for="grid-password"
                          >Nouveau Mot de passe</label
                        ><input
                          type="password"
                          v-model="newPassword"
                          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Nouveau mot de passe"
                          style="transition: all 0.15s ease 0s;"
                          required
                        />
                      </div>
                      <div class="text-center mt-6">
                        <button
                          class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style="transition: all 0.15s ease 0s;"
                        >
                          Modifier mon mot de passe
                        </button>
                      </div>
                      <div v-if="showError" class="text-red-500">
                          Une erreur est survenue!  
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>

<script setup>
import { updateUser, updateUserEmail, sendUserEmailVerification, changeUserPassword } from '../models/user'
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore();
const $toast = useToast();
const { userName, userMail, emailVerified, provider } = storeToRefs(store);
const password = ref();
const passwordMail = ref();
const newPassword = ref();
const showError = ref(false);

async function editPseudo() {
    try {
        await updateUser(userName);
        let instance = $toast.success('Modification bien enregistrée');
    } catch (error) {
        showError.value = true
    }
}

async function editEmail() {
    try {
        await updateUserEmail(userMail, passwordMail.value);
        let instance = $toast.success('Modification bien enregistrée');
    } catch (error) {
        showError.value = true
    }
}

async function sendEmailVerification() {
    try {
        await sendUserEmailVerification()
        let instance = $toast.success('Email envoyé');
    } catch (error) {
        showError.value = true
    }
}

async function changePassword() {
    try {
        await changeUserPassword(password.value, newPassword.value);
        let instance = $toast.success('Changement de mot de passe avec succès');
    } catch (error) {
        showError.value = true
    }
}
</script>