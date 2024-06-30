<template>
    <h2> Unit View </h2>
    <h2> List of Days in the Unit </h2>
<!--    <NuxtLink to="/DayView">Day 1</NuxtLink>-->
    <ul ref="parentRef" class="no-bullets">
        <li
            v-for='day in days'
            :key='day.title'
        >
            <div>
                <day-summary-card :day="day" />
            </div>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { useDragAndDrop } from '@formkit/drag-and-drop/vue';
import DaySummaryCard from '~/components/DaySummaryCard.vue';

const [parentRef, days] = useDragAndDrop(
    [
        { title: 'Day 1', summary: 'Do something' },
        { title: 'Day 2', summary: 'Do another thing.'  },
        { title: 'Day 3', summary: 'Do a third thing.'  }
    ]
)
</script>

<style>
ul.no-bullets {
    list-style-type: none;
}
</style>
