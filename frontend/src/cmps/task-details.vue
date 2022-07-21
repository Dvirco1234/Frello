<template>
  <section class="task-details grid">
    <!-- <header class="td-header flex justify-center">
      <h1>⚽️</h1>
    </header> -->
    <button @click="closeEdit" class="round-btn close-btn">X</button>
    <main class="td-main flex flex-col">
      <div class="title">
        <h2>{{ task.title }}</h2>
        <p>in list {{ group.title }}</p>
      </div>
      <div class="td-top-container flex">
        <div v-if="task.memberIds?.length" class="members">
          <h4>Members</h4>
          <div class="membersImgs flex align-center">
            <span v-for="member in taskMembers" :key="member._id">
              <img :src="member.imgUrl" />
            </span>
            <button class="round-btn">+</button>
          </div>
        </div>
        <div v-if="task.labelIds?.length" class="labels">
          <h4>labels</h4>
          <div class="label-container flex">
            <button
              v-for="label in taskLabels"
              :key="label.id"
              class="task-label"
              :style="{ backgroundColor: label.color }"
            >
              {{ label.title }}
            </button>
            <button>+</button>
          </div>
        </div>
      </div>
      <div class="description">
        <div clas="title-box">
          <h3>Description</h3>
        </div>
        <input
          class="td-desc"
          type="text"
          placeholder="Add a more detailed description..."
        />
      </div>
      <div class="task-activity">
        <div class="title-box space-between">
          <h3>Activity</h3>
          <button>Hide details</button>
        </div>
        <input
          type="text"
          class="td-activity"
          placeholder="Write a comment..."
        />
      </div>
    </main>
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
        <button>Labels</button>
        <button>Checklist</button>
        <button>Dates</button>
        <button>Attachments</button>
        <button>Location</button>
        <button>Cover</button>
      </div>
      <h4>Actions</h4>
      <div class="btn-group">
        <button>Move</button>
        <button>Copy</button>
        <button>Archive</button>
        <button>Share</button>
      </div>
    </nav>
  </section>
</template>
<script>
export default {
  name: '',
  props: {
    task: Object,
    group: Object,
    boardMembers: Object,
    boardLabels: Object,
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    closeEdit() {
      this.$emit('closeEdit')
    },
  },
  computed: {
    taskMembers() {
      return this.boardMembers.filter(member =>
        this.task.memberIds.includes(member._id)
      )
    },
    taskLabels() {
      const labels = this.boardLabels.filter(label =>
        this.task.labelIds.includes(label.id)
      )
      return labels
    },
  },
  unmounted() {},
  components: {},
}
</script>
<style>
.btn-group button {
  display: flex;
  align-items: center;
  gap: 6px;
}
button .btn-icon {
  width: 20px;
}
</style>
