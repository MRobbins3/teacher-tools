<template>
    <v-navigation-drawer
        permanent
        touchless
        :rail="shrinkSidebar"
        :model-value="true"
        @click="isManuallyExpanded=true; isCollapsed=false"
        @mouseover="mouseover"
        @mouseleave="isBeingHovered=false"
    >
        <div style="height: 0">
        <v-btn
            v-if="!shouldExpandOnHover"
            size="x-small"
            class="handlebar"
            @click.stop="toggleSidebar"
            icon
            :style="{top:'0px', transform:`translate(${isCollapsed ? '120' : '740'}%, 300%)`, 'z-index': 1111, position: 'fixed'}"
        >
            <v-icon
                size="24"
                v-if="isCollapsed"
            >
                fa fa-circle-chevron-right
            </v-icon>
            <v-icon
                size="24"
                v-else
            >
                fa fa-circle-chevron-left
            </v-icon>
        </v-btn>
    </div>
    </v-navigation-drawer>
</template>
<script setup lang="ts">
const isCollapsed: Ref<boolean> = ref(true);
const isManuallyExpanded: Ref<boolean> = ref(false);
const isBeingHovered = ref(false);
const debounce = ref(false);
const shrinkSidebar = computed(() => {
    return !isManuallyExpanded.value && (!isBeingHovered.value || getIsSmallScreen.value);
});

const display = useDisplay();
const getIsSmallScreen = computed((): boolean => {
    return display.smAndDown.value;
});

function collapseSidebar () {
    debounce.value = true;
    new Promise<void>((resolve) => setTimeout(resolve, 200)).then(() => {
        debounce.value = false;
    });
    isManuallyExpanded.value = false;
    isBeingHovered.value = false;
    isCollapsed.value = true;
}

function expandSidebar () {
    isManuallyExpanded.value = true;
    isCollapsed.value = false;
}

function toggleSidebar () {
    if (isCollapsed.value) expandSidebar();
    else collapseSidebar();
}

function mouseover () {
    if (debounce.value || !shouldExpandOnHover.value) return;
    isBeingHovered.value = true;
}

const shouldExpandOnHover = computed(() => {
    return !getIsSmallScreen.value && !isManuallyExpanded.value;
});

</script>
<style lang="scss" scoped>

.handlebar {
    background-color: rebeccapurple;
}

.v-navigation-drawer--mini-variant, .v-navigation-drawer {
    overflow: visible !important;
}
</style>
