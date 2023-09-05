import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        name: "",
        state: "",
        grade: null,
        num: null,
        classes: null,
    }),

    actions: {
        logout() {
            this.$patch({
                name: '',
                isAdmin: false,
            })
        },
    },
})