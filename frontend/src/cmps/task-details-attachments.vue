<template>
  <section class="flex align-center">
    <div class="icon-lg i-clock"></div>
    <h3>Attachments</h3>
  </section>
  <section>
    <div></div>
    <section class="attachments-container flex flex-col">
      <div
        v-for="attachment in attachments"
        class="attachment flex align-center"
        @click="goTo(attachment.link)"
      >
        <div class="link-box flex align-center justify-center">Icon</div>
        <div class="link-text">
          <h3>{{ attachment.name }}</h3>
          <p>
            {{ attachment.link.slice(0, 30) }}
            <div>
                <span v-if="attachment.link.length > 40">...</span>
              <span class="remove">Remove</span>
            </div>
          </p>
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
  methods: {
    goTo(url) {
      window.open(url, '_blank')
    },
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
