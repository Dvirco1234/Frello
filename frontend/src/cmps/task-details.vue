<template>
  <section class="task-details grid">
    <!-- <header class="td-header flex justify-center">
      <h1>⚽️</h1>
    </header> -->
    <button class="round-btn close-btn" @click="closeEdit">
      <img src="../assets/xmark-solid.svg" />
    </button>

    <main class="td-main flex flex-col gap-2">
      <header>
        <img
          class="td-icon"
          src="../assets/description.svg"
          alt="description"
        />
        <article class>
          <h2>{{ task.title }}</h2>
        </article>
      </header>

      <div>
        <p class="task-group">
          in list <span>{{ group.title }}</span>
        </p>
      </div>

      <section>
        <article class="members-labels-data flex">
          <div v-if="task.memberIds?.length" class="members">
            <h4>Members</h4>
            <div class="membersImgs flex">
              <span v-for="member in taskMembers" :key="member._id">
                <img class="memberImg" :src="member.imgUrl" />
              </span>
              <button class="round-btn">
                <img class="td-plus" src="../assets/plus.svg" alt="add" />
              </button>
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
              <button>
                <img class="td-plus" src="../assets/plus.svg" alt="add" />
              </button>
            </div>
          </div>
        </article>
      </section>

      <section>
        <img
          class="td-icon"
          src="../assets/description.svg"
          alt="description"
        />
        <article class="description">
          <div>
            <h3 class="td-title">Description</h3>
          </div>

          <div class="desc-add">
            <textarea
              class="td-desc"
              @click="descOpen = true"
              :class="{ open: descOpen }"
              placeholder="Add a more detailed description..."
            />
            <aside class="td-desc-btns" v-show="descOpen">
              <button>Save</button>
              <button @click.stop="descOpen = false">Cancel</button>
            </aside>
          </div>
        </article>
      </section>

      <section>
        <div>
          <img class="td-icon" src="../assets/list.svg" alt="activity" />
        </div>
        <div class="td-title flex space-between">
          <h3>Activity</h3>
          <button>Hide details</button>
        </div>
      </section>

      <section>
        <div>
          <img
            class="memberImg"
            src="https://icon-library.com/images/google-user-icon/google-user-icon-16.jpg"
            alt="user"
          />
        </div>
        <article class="activities">
          <div class="activity-menu">
            <input
              class="activity-input"
              type="text"
              @click="activityOpen = true"
              :class="{ open: activityOpen }"
              placeholder="Write a comment..."
            />
            <aside class="activity-btns flex space-between" v-if="activityOpen">
              <button>Save</button>
              <div class="activity-icons">
                <button class="act-btn">
                  <img src="../assets/attach.svg" alt="attachment" />
                </button>
                <button class="act-btn">
                  <img
                    class="act-btn"
                    src="../assets/adress.svg"
                    alt="attachment"
                  />
                </button>
                <button class="act-btn">
                  <img src="../assets/smiley.svg" alt="attachment" />
                </button>
              </div>
            </aside>
          </div>
        </article>
      </section>
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
