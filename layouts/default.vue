<template>
    <top-app-bar v-if="showNavigation" />
    <sidebar v-if="showNavigation"/>
    <v-main>
        <v-container>
            <slot />
        </v-container>
    </v-main>
</template>

<script setup lang="ts">
import TopAppBar from '~/components/TopAppBar.vue'
import { useRoute } from '#imports'

const route = useRoute()
const showNavigation = computed(() => route.meta.showNavigation !== false)
</script>
