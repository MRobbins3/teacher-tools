<template>
    <v-card class="ma-2" elevation="3">
        <v-card-title>
            <!--    <NuxtLink to="/DayView">Day 1</NuxtLink>-->
            {{ day?.title ?? ''}}
        </v-card-title>
        <v-card-text>
            {{ day?.summary ?? '' }}
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import type { Day } from '@/types/Day';

interface Props {
    day?: Day | null
}

const props = withDefaults(defineProps<Props>(), {
    day: null
});

</script>
