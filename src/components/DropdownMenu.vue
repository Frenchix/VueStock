<template>
    <div>
      <div class="relative w-fit">
        <!-- Dropdown toggle button -->
        <button
          @click="show = !show"
          class="flex items-center p-2 text-indigo-100 bg-indigo-600 rounded-md"
        >
          <span class="mr-4">{{ userName }}</span>
          <svg
            class="w-5 h-5 text-indigo-100 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
  
        <!-- Dropdown menu -->
        <div
          v-show="show"
          class="absolute right-0 py-2 mt-2 bg-indigo-500 rounded-md shadow-xl w-44 z-10">
          <router-link
            to="/profil"
            class="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100">
            Mon profil
          </router-link>
          <button @click="clickLogout()" class="w-full text-left px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100">
            Se déconnecter
        </button>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { logoutUser } from '../models/user'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'

const router = useRouter()
const $toast = useToast();

const store = useUserStore();
const { userName } = storeToRefs(store);
let show = ref(false);

async function clickLogout(){
    try {
       await logoutUser();   
       let instance = $toast.success('Vous êtes bien déconnecté');
       router.replace('Login')
    } catch (error) {
        let instance = $toast.error("Un problème est survenu lors de la déconnexion!");
    }
}
</script>