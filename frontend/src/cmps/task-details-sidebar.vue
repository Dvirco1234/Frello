<template>
  <nav class="td-side-bar">
    <h4>Suggested</h4>
    <div class="suggested btn-group">
      <button>
        <img class="btn-icon" src="../assets/person.svg" alt="members" />
        <span>Join</span>
      </button>
    </div>
    <h4>Add to card</h4>
    <div class="btn-group">
      <button>
        <img class="btn-icon" src="../assets/person.svg" alt="members" />
        <span>Members</span>
      </button>
      <button>
        <img class="btn-icon labels" src="../assets/label.png" alt="labels" />
        <span>Labels</span>
      </button>
      <button>
        <img class="btn-icon" src="../assets/checklist.svg" alt="checklist" />
        <span>Checklist</span>
      </button>
      <button>
        <img class="btn-icon" src="../assets/clock.svg" alt="dates" />
        <span>Dates</span>
      </button>
      <button>
        <img class="btn-icon" src="../assets/attach.svg" alt="attachment" />
        <span>Attachment</span>
      </button>
      <button>
        <img class="btn-icon" src="../assets/cover.svg" alt="cover" />
        <span>Cover</span>
      </button>
    </div>
    <h4>Actions</h4>
    <div class="btn-group">
      <button>
        <img class="btn-icon" src="../assets/arrow-right.svg" alt="move" />
        <span>Move</span>
      </button>
      <button>
        <img class="btn-icon" src="../assets/copy.svg" alt="copy" />
        <span>Copy</span>
      </button>
      <button @click="archTask">
        <img class="btn-icon" src="../assets/archive.svg" alt="archive" />
        <span>Archive</span>
      </button>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'task-side-bar',
  props: { type: Object },
  data() {
    return {}
  },
  created() {},
  methods: {
    archTask() {
      this.$emit('arch-task')
    },
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
