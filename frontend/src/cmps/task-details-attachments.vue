<template>
  <section class="flex align-center">
    <div class="icon-lg i-attachment"></div>
    <h3>Attachments</h3>
  </section>
  <section>
    <div></div>
    <section class="attachments-container flex flex-col">
      <div
        v-for="(attachment,idx) in attachments" :idx="idx"
        class="attachment flex align-center"
        @click="goTo(attachment.link)"
      >
        <div class="link-box flex align-center justify-center">
            <img v-if="isImage(attachment.link)" :src="attachment.link" alt="attachment-img">
            <h3 v-else>LINK</h3>
        </div>
        <div class="link-text">
          <h3>{{ attachment.name }}</h3>
          <p>
            {{ attachment.link.slice(0, 30) }}
             <span v-if="attachment.link.length > 40">...</span>
            <div>
              <span @click.stop="removeAttachment(idx)" class="remove">Remove</span>
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
    removeAttachment(idx) {
         const { groupId, taskId } = this.$route.params
         this.$store.dispatch({type:'setState',action:'removeAttachment',groupId,taskId,idx})
    },
    isImage(link) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(link)
},
    
    
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
