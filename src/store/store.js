import { reactive } from 'vue'

export const store = reactive({
    filter: {
        selectedYears:[],
        selectedCategories:[],
        startTime:'',
        endTime:''
    },
    setFilter(data) {
      this.filter = JSON.parse(JSON.stringify(data))
    }
  })