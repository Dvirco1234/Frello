<template>
    <section class="group-list grid">
        <group-preview v-for="group in groups" :key="group.id" :group="group" />
    </section>
</template>
<script>
import groupPreview from '../cmps/group-preview.vue'

export default {
    name: 'group-list',
    props: { groups: Array },
    data() {
        return {}
    },
    created() {
    },
    methods: {},
    computed: {},
    unmounted() {},
    components: {
        groupPreview,
    },
}
</script>

<style>
.group-list {
    grid-template-columns: repeat(5 , 280px);
}
</style>
