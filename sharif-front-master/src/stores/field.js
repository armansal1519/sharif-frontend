import { defineStore } from 'pinia';

export const useFieldStore = defineStore('field', {
  state: () => ({
    fields:[]
  }),

  getters: {
    getFields (state) {
      if (state.fields.length){
        return state.fields.map(item=>{
          return { label:item.farsi_name, value: item.value }
        })

      }else {
        return []
      }
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
