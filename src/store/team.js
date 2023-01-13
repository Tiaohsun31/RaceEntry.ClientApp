import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', {
    state: () => ({
        teamId:'',
        userInfoId:''
    }),
    persist: {
        storage: sessionStorage,
    }
});