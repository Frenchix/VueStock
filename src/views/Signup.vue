<template>
    <div>
      <main>
        <section class="absolute w-full h-full">
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
                    <div class="text-gray-500 text-center mb-3 font-bold text-xl">
                      Inscription
                    </div>
                    <form @submit.prevent="signup()">
                        <div class="relative w-full mb-3">
                            <label
                            class="block uppercase text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                            >Pseudo</label
                            ><input
                            type="text"
                            v-model="pseudo"
                            class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Pseudo"
                            style="transition: all 0.15s ease 0s;"
                            required
                            />
                      </div>
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                          >Email</label
                        ><input
                          type="email"
                          v-model="email"
                          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style="transition: all 0.15s ease 0s;"
                          required
                        />
                      </div>
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                          >Mot de passe</label
                        ><input
                          type="password"
                          v-model="password"
                          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Mot de passe"
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
                          S'inscrire
                        </button>
                      </div>
                      <div v-if="showError" class="text-red-500">
                          Une erreur est survenue!  
                      </div>
                    </form>
                  </div>
                  <div class="flex justify-around mb-3">
                    <div>
                        <a href="/login" class="text-gray-700"
                        ><small>Déja un compte? Se connecter</small></a
                        >
                    </div>
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
import { createUser } from '../models/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref()
const password = ref()
const pseudo = ref()
const showError = ref(false)

async function signup() {
    try {
        await createUser(email.value, password.value, pseudo.value);
        router.replace('/');
    } catch (error) {
        showError.value = true
    }
}
</script>