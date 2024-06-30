<template>
    <v-card class="ma-2" elevation="3">
        <v-card-title>
            {{ title }}
        </v-card-title>
    </v-card>
</template>
<script setup lang="ts">
interface Props {
    title?: string | null
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Day Summary'
});
</script>
