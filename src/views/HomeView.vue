<template lang="pug">
div#hmoe(class="bg-grey-lighten-5 py-15 ")
  div#progress(class="d-flex flex-column justify-center align-center")
    v-progress-circular(color="primary" :model-value="progress" :size="circleSize" :width="35")
      div(class="timeInfo text-center mt-12 d-none d-sm-block" )
        h1 {{ currentText }}
        h1 {{ currentTime }}
        v-btn(v-if="status !== 1" icon="mdi-play" variant="text" @click="startTimer")
        v-btn(v-else icon="mdi-pause" variant="text" @click="pauseTimer")
        v-btn(v-if="currentItem.length > 0" icon="mdi-skip-next" variant="text" @click="finishTimer")
  div(class="timeInfo text-center mt-12 d-block d-sm-none " )
    h1 {{ currentText }}
    h1 {{ currentTime }}
    v-btn(v-if="status !== 1" icon="mdi-play" variant="text" @click="startTimer")
    v-btn(v-else icon="mdi-pause" variant="text" @click="pauseTimer")
    v-btn(v-if="currentItem.length > 0" icon="mdi-skip-next" variant="text" @click="finishTimer")

</template>

<script setup>
import { ref, computed } from 'vue'
import { useListStore } from '@/stores/list'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

const list = useListStore()
const { currentItem, items, timeleft, timeTotal } = storeToRefs(list)
const { start, countdown, finish } = list

const settings = useSettingsStore()
const { selectedAlarmFile, notify } = storeToRefs(settings)

// 0 = 停止、1 = 倒數中、2 = 暫停
const status = ref(0)
// 進度
const progress = ref(0)

const calcCircle = () => {
  if (window.innerWidth * 0.4 < 400) {
    return window.innerWidth * 0.5
  } else {
    return 400
  }
}

const circleSize = ref(calcCircle())

window.addEventListener('resize', () => {
  circleSize.value = calcCircle()
})

let timer = 0
const startTimer = () => {
  if (status.value === 0 && items.value.length > 0) {
    start()
    progress.value = 0
  }
  if (currentItem.value.length > 0) {
    status.value = 1

    timer = setInterval(() => {
      countdown()
      progress.value = (1 - timeleft.value / timeTotal.value) * 100
      if (timeleft.value === 0) {
        finishTimer()
      }
      // console.log(progress.value)
    }, 1000)
  }
}
const pauseTimer = () => {
  status.value = 2
  clearInterval(timer)
}

const finishTimer = () => {
  clearInterval(timer)
  status.value = 0

  const audio = new Audio()
  audio.src = selectedAlarmFile.value
  audio.play()
  if (notify.value) {
    // eslint-disable-next-line
    const notification = new Notification('時間到', {
      body: currentText.value,
      icon: '../../public/tomato.ico'
    })
  }
  finish()
  // 自動開始倒數
  // if (items.value.length > 0) {
  //   startTimer()
  // }
}

const currentText = computed(() => {
  // console.log(currentItem.value)
  return currentItem.value.length > 0 ? currentItem.value : items.value.length > 0 ? '點擊開始' : '無待辦事項'
})
const currentTime = computed(() => {
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})
</script>

<style lang="scss">
.timeInfo{
  color:#212121 !important;
}
</style>
