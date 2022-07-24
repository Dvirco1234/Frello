<template>
  <section>
    <div>
      <div class="icon-lg i-activity"></div>
    </div>
    <div class="td-title space-between">
      <h3>Activity</h3>
      <button>Hide details</button>
    </div>
  </section>

  <section>
      <img
        class="userImg"
        src="https://icon-library.com/images/google-user-icon/google-user-icon-16.jpg"
        alt="user"
      />
    <article class="activities">
      <div class="activity-menu" v-click-outside="closeAct" :class="{ shadow: activityOpen }" >
        <input
          class="activity-input"
          type="text"
          @click="activityOpen = true"
          :class="{ open: activityOpen }"
          placeholder="Write a comment..."
        />
        <aside class="activity-btns flex space-between" v-if="activityOpen">
          <button class="save-btn" @click="closeAct">Save</button>
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
</template>
<script>
export default {
  name: 'task-details-activity',
  props: { type: Object },
  data() {
    return {
      activityOpen: false,
    }
  },
  created() {},
  methods: {
    closeAct() {
      this.activityOpen = false
    },
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
