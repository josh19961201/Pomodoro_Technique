<template lang="pug">
v-app
  v-app-bar(color="primary")
    v-btn( id="logo" variant="plain" color="white" to="/") Pomodoro
    v-spacer
    v-tabs
      v-tab(prepend-icon="mdi-timer" to="/") 計時
      v-tab(prepend-icon="mdi-format-list-bulleted" to="/list") 待辦事項
      v-tab(prepend-icon="mdi-cog" to="/settings") 設定
    v-spacer
    v-btn(:icon="notify ? 'mdi-bell' : 'mdi-bell-off'" variant="text" @click="toggleNotify")

  v-main
    v-container
      v-row
        v-col(class="ma-10 ")
          router-view(v-slot="{ Component }")
            //- 換頁保留元件不被銷毀
            //- 設定 include 指定要保留的元件
            keep-alive(include="HomeView")
              //- 動態元件，將元件以 is 傳入
              component(:is="Component")
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
const settings = useSettingsStore()
const { notify } = storeToRefs(settings)
const { toggleNotify } = settings
</script>

<style lang="scss">
#logo{
  &,& .v-btn--active {
    opacity: 1;
    height: 100%;
  }
}
</style>
