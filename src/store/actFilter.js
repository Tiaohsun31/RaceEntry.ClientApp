import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filterStore', {
  state: () => ({
      filter: {
        selectedYears:[],
        selectedCategories:[],
        startTime:'',
        endTime:''
    },
  }),
});