<template>
  <section class="task-details-attachments flex align-center">
    <div class="icon-lg i-clock"></div>
    <h3>Attachments</h3>
  </section>
  <section>
    <div></div>
    <section>
      <div v-for="attachment in attachments" class="attachment flex">
        <div class="link-box">Icon</div>
        <div class="link-text">
          <a :href="attachment.link">{{ attachment.name }}</a>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  name: 'task-details-attachments',
  props: { attachments: Array },
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
