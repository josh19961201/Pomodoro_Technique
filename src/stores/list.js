import { defineStore } from 'pinia'

const time = parseInt(import.meta.env.VITE_TIME)
const timeBreak = parseInt(import.meta.env.VITE_TIME_BREAK)

export const useListStore = defineStore({
  id: 'list',
  state () {
    return {
      items: [],
      finishedItems: [],
      currentItem: '',
      id: 1,
      break: false, // 是否為休息時間
      timeleft: time// 剩餘時間
    }
  },
  // 這裡放所有修改 state 的 function
  actions: {
    addItem (name) {
      // 用 this. 指向 state
      this.items.push({
        id: this.id++,
        name,
        edit: false,
        model: name
      })
    },
    editItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].edit = true
    },
    delItem (id) {
      const i = this.getItemIndexById(id)
      this.items.splice(i, 1)
    },
    confirmEditItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].name = this.items[i].model
      this.items[i].edit = false
    },
    undoEditItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].model = this.items[i].name
      this.items[i].edit = false
    },
    getItemIndexById (id) {
      return this.items.findIndex(item => item.id === id)
    },
    start () {
      this.currentItem = this.break ? '休息一下' : this.items.shift().name // 取陣列第一個值
    },
    countdown () {
      this.timeleft--
    },
    finish () {
      if (!this.break) {
        this.finishedItems.push({
          name: this.currentItem,
          id: this.id++
        })
      }
      this.currentItem = ''
      if (this.items.length > 0) {
        this.break = !this.break
      }
      this.timeleft = this.break ? timeBreak : time
    },
    delFinishedItem (id) {
      const i = this.finishedItems.findIndex(item => item.id === id)
      this.finishedItems.splice(i, 1)
    }
  },
  persist: {
    key: 'pomodoro-list'
  }
})
