<template>
  <section
    class="attach-modal sidebar-modal"
    v-click-outside="closeAttachModal"
  >
    <header class="flex justify-center">
      <p>Attachment</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click="closeAttachModal"
      />
    </header>
    <main>
      <h4>Attach a link</h4>
      <input
        class="attachment-input"
        v-focus
        v-model="linkStr"
        type="text"
        placeholder="Paste any link here..."
        required
      />
      <div v-if="linkStr">
          <h4>Link name</h4>
          <input class="attachment-input" type="text" v-model="linkName" maxlength="25" required/>
          <button @click="attachLink" class="attach-btn">Attach</button>
      </div>
    </main>
  </section>
</template>
<script>
export default {
  name: 'attachment-modal',
  data() {
    return {
      linkStr: '',
      linkName: '',
    }
  },
  created() {},
  methods: {
    closeAttachModal() {
      this.$emit('close-attach-modal')
    },
    attachLink() {
      const { groupId, taskId } = this.$route.params
      const attachment = { link: this.linkStr, name: this.linkName }
      this.$store.dispatch({
        type: 'setState',
        action: 'saveAttachment',
        groupId,
        taskId,
        attachment: attachment,
      })
    },
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
