<template lang="pug">
v-row#settings
  v-col(cols="12" class="my-3")
    h1.text-center 設定
  v-col(cols="12" class="my-3 px-10")
    v-table
      thead
        tr
          th 名稱
          th 試聽
          th 選擇
      tbody
        //- tr(v-for="alarm in settings.alarms" :key="alarm.id")
        tr(v-for="alarm in alarms" :key="alarm.id" )
          td(class="py-5" ) {{ alarm.name }}
          td(class="py-5 " )
            audio(:src="alarm.file" controls class="d-flex align-center")
          td(class="py-5")
            v-radio-group(v-model="selectedAlarms" class="d-flex align-center ")
              v-radio(:value="alarm.id")
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

const settings = useSettingsStore()
const { alarms, selectedAlarms } = storeToRefs(settings)

</script>

<style lang="scss">
#settings{
  th,td{
    text-align: center !important;
  }
  audio{
    width: 100%;
  }
  .v-input{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
