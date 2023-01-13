<template lang="pug">
v-row#list
  v-col(cols="12" class="mb-5")
    v-text-field(ref="input" v-model="newItem" label="新增事項" :rules="[rules.required,rules.length]" @keydown.enter=" onInputSubmit")
      template(#append)
        v-btn(icon="mdi-plus" variant="text" @click=" onInputSubmit")
  v-col(cols="12" )
    h1.text-center(class="my-3") 未完成事項
    v-table
      tbody
        tr(v-if="items.length === 0")
          td.text-center(colspan="2") 沒有事項
        tr(v-for="item in items" :key="item.id" ref="editInputs")
          td
            v-text-field(v-if="item.edit" v-model="item.model" autofocus :rules="[rules.required,rules.length]" @keydown.enter="confirmEditItem(item.id)" @keydown.esc="undoEditItem(item.id)")
            span(v-else) {{ item.name }}
          td
            span(v-if="item.edit")
              v-btn(icon="mdi-check" variant="text" color="secondary" @click="confirmEditItem(item.id)")
              v-btn(icon="mdi-undo" variant="text" color="primary" @click="undoEditItem(item.id)")
            span(v-else)
              v-btn(icon="mdi-pencil" variant="text" color="secondary" @click="editItem(item.id)")
              v-btn(icon="mdi-delete" variant="text" color="primary" @click="delItem(item.id)")
  v-divider(class="my-5")
  v-col(cols="12")
    h1.text-center(class="my-3") 已完成事項
  v-col(cols="12" class="mb-5")
    v-table
      tbody
        tr(v-if="finishedItems.length === 0")
          td.text-center(colspan="2") 沒有事項
        tr(v-for="item in finishedItems" v-else :key="item.id" ref="editInputs")
          td {{ item.name }}
          td
            v-btn(icon="mdi-delete" variant="text" color="primary" @click="delFinishedItem(item.id)")
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'

const list = useListStore()
const {
  addItem,
  editItem,
  delItem,
  confirmEditItem,
  undoEditItem,
  delFinishedItem
} = list
const { items, finishedItems } = storeToRefs(list)

const newItem = ref('')
const input = ref(null)

// 驗證
const rules = {
  required (v) {
    return !!v || '欄位必填'
  },
  length (v) {
    return v.length >= 3 || '請至少輸入三個字'
  }
}

const onInputSubmit = async () => {
  const valid = await input.value.validate()
  if (valid.length > 0) return
  addItem(newItem.value)
  input.value.$el.querySelector('input').blur() // 可以用$el抓到vue元件的html元素
  input.value.reset()
}
</script>

<style lang="scss">
#list{
  .v-input__append{
  padding: 0 !important;
  display: flex;
  align-items: center;
}
td:nth-child(1){
  width: 70%;
}
td:nth-child(2){
  text-align: right !important;
  width: 30%;
}
}

</style>
