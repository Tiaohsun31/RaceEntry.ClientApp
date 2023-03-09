import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filterStore', {
  state: () => ({
      filter: {
        selectedYears:[],
        selectedMonths:[],
        selectedCategories:[],
        startTime:null,
        endTime:null
    },
  }),
});