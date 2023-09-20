import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const userName = ref()
    const userMail = ref()
    const emailVerified = ref()
    const provider = ref()
    const uid = ref()
    
    function updateUser(userName, userMail, emailVerified, provider, uid) {
      this.userName = userName;
      this.userMail = userMail;
      this.emailVerified = emailVerified;
      this.provider = provider;
      this.uid = uid
    }

    function logout() {
        this.userName = ''
        this.userMail = ''
        this.emailVerified = ''
        this.provider = ''
        this.uid = ''
    }

    return { userName, userMail, emailVerified, provider, uid, updateUser, logout }
  })