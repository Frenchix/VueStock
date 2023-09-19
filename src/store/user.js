import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const userName = ref()
    const userMail = ref()
    const emailVerified = ref()
    
    function updateUser(userName, userMail, emailVerified) {
      this.userName = userName;
      this.userMail = userMail;
      this.emailVerified = emailVerified;
    }

    function logout() {
        this.userName = ''
        this.userMail = ''
        this.emailVerified = ''
    }

    return { userName, userMail, emailVerified, updateUser, logout }
  })