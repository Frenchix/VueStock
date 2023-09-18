import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const userName = ref()
    const userMail = ref()
    
    function updateUser(userName, userMail) {
      this.userName = userName;
      this.userMail = userMail;
    }

    function logout() {
        this.userName = ''
        this.userMail = ''
    }

    return { userName, userMail, updateUser, logout }
  })