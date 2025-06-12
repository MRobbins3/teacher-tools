<template>
    <h1> It is {{ timeString }} </h1>
    <h2> It is currently: {{getCurrentPeriod(new Date(), 'A')}}</h2>
    <h2> If it was 11:33 am, it would be: {{getCurrentPeriod(new Date(2025, 5, 11, 11, 33), 'A')}}</h2>
    <h2> If it was 1:33 pm, it would be: {{getCurrentPeriod(new Date(2025, 5, 11, 13, 33), 'A')}}</h2>
</template>
<script setup lang="ts">
import { getCurrentPeriod } from '~/utils/classDisplayUtils';

import { ref, onMounted, onUnmounted } from 'vue'

const timeString = ref('')

function updateTime() {
    const now = new Date()
    timeString.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

let intervalId: ReturnType<typeof setInterval>

onMounted(() => {
    updateTime()
    intervalId = setInterval(updateTime, 1000)
})

onUnmounted(() => {
    clearInterval(intervalId)
})
</script>
