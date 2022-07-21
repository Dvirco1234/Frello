<template>
  <section class="task-details grid">
    <!-- <header class="td-header flex justify-center">
      <h1>⚽️</h1>
    </header> -->
    <button @click="closeEdit" class="round-btn close-btn">X</button>
    <main class="td-main flex flex-col">
      <div>
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
        <div class="title-box">
          <div class="title-header">
            <img
              class="title-icon"
              src="../assets/description.svg"
              alt="description"
            />
            <h3>Description</h3>
          </div>
        </div>
        <textarea
          class="td-desc"
          @click="descOpen = true"
          :class="{ open: descOpen }"
          placeholder="Add a more detailed description..."
        />
        <div class="td-desc-btns" v-show="descOpen">
          <button>Save</button>
          <button @click.stop="descOpen = false">Cancel</button>
        </div>
      </div>
      <div class="task-activity">
        <div class="title-box space-between">
          <div class="title-header">
            <img class="title-icon" src="../assets/list.svg" alt="activity" />
            <h3>Activity</h3>
          </div>
          <button>Hide details</button>
        </div>
        <div class="activity-menu">
          <input
            class="activity-input"
            type="text"
            @click="activityOpen = true"
            :class="{ open: activityOpen }"
            placeholder="Write a comment..."
          />
          <div class="activity-btns flex space-between" v-if="activityOpen">
            <button>Save</button>
            <div>
              <button>attach</button>
              <button>mention</button>
              <button>emoji</button>
            </div>
          </div>
        </div>
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
        <!-- <button>Location</button> -->
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
        <button>
          <img class="btn-icon" src="../assets/archive.svg" alt="archive" />
          <span>Archive</span>
        </button>
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
    return {
      descOpen: false,
      activityOpen: false,
    }
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
  width: 21px;
}

button .btn-icon.labels {
  width: 13px;
  margin-inline-end: 8px;
}

.title-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-icon {
  height: 32px;
}
</style>
