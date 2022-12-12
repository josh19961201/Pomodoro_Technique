<template lang="pug">
v-row#list
  v-col(cols="12")
    h1.text-center 待辦事項
  v-col(cols="12")
    v-text-field(ref="input" v-model="newItem" label="新增事項" :rules="[rules.required,rules.length]" @keydown.enter=" onInputSubmit")
      template(#append)
        v-btn(icon="mdi-plus" variant="text" @click=" onInputSubmit")
    v-table
      thead
        tr
          th 名稱
          th 操作
      tbody
      tr(v-for="item in items" :key="item.id")
          td
            v-text-field(v-if="item.edit" v-model="item.model" autofocus @keydown.enter="confirmEditItem(item.id)" @keydown.esc="undoEditItem(item.id)")
            span(v-else) {{ item.name }}
          td
            span(v-if="item.edit")
              v-btn(icon="mdi-check" variant="text" color="#006400" @click="confirmEditItem(item.id)")
              v-btn(icon="mdi-undo" variant="text" color="#B22222" @click="undoEditItem(item.id)")
            span(v-else)
              v-btn(icon="mdi-pencil" variant="text" color="#006400" @click="editItem(item.id)")
              v-btn(icon="mdi-delete" variant="text" color="#B22222" @click="delItem(item.id)")
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'

const list = useListStore()
const { addItem, editItem, delItem, confirmEditItem, undoEditItem } = list
const { items } = storeToRefs(list)

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
  input.value.reset()
}
</script>
