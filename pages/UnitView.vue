<template>
    <h2> Unit View </h2>
    <h2> List of Days in the Unit </h2>
<!--    <NuxtLink to="/DayView">Day 1</NuxtLink>-->
    <ul ref="parentRef" class="no-bullets">
        <li
            v-for='day in days'
            :key='day'
        >
            <div>
                <day-summary-card :title="day" />
            </div>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { useDragAndDrop } from '@formkit/drag-and-drop/vue';
import DaySummaryCard from '~/components/DaySummaryCard.vue';

const [parentRef, days] = useDragAndDrop(
    ['Day 1', 'Day 2', 'Day 3']
)
</script>

<style>
ul.no-bullets {
    list-style-type: none;
}
</style>
