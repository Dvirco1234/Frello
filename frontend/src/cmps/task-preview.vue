<template>
    <article class="task-preview">
        <div class="task-labels"></div>
        <p>{{task.title}}</p>
    </article>
</template>
<script>
export default {
    name: 'task-preview',
    props: { task: Object },
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
<style>
.task-preview {
    background-color: white;
    padding: 6px 8px;
    margin-bottom: 8px;
    box-shadow: 0 1px 0 #091e4240;
}
</style>