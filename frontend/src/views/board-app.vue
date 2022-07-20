<template>
  <section>
    <board-nav-bar />
    <h1>board app</h1>
    <group-list />
    <pre>{{ board }}</pre>
  </section>
</template>
<script>
export default {
    name: 'board-app',
    props: { type: Object },
    data() {
        return {}
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
    components: {},
}
</script>
