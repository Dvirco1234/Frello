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
    <img class="userImg" :src="loggedInUser.imgUrl" :alt="loggedInUser.username" />
    <article class="activities">
      <div class="activity-menu" v-click-outside="closeAct" :class="{ shadow: activityOpen }">
        <input class="activity-input" type="text" @click="activityOpen = true" :class="{ open: activityOpen }"
          v-model="commentTxt" placeholder="Write a comment..." />
        <aside class="activity-btns flex space-between" v-if="activityOpen">
          <button class="save-btn" @click="addComment">Save</button>
          <div class="activity-icons flex">
            <button class="act-btn">
              <div class="icon-sm i-attachment"></div>
            </button>
            <button class="act-btn">
              <div class="icon-sm i-mention"></div>
            </button>
            <button class="act-btn">
              <div class="icon-sm i-smile"></div>
            </button>
          </div>
        </aside>
      </div>
    </article>
  </section>
  <section class="activity-list" v-if="taskActivities.length">
    <div class="user-activity flex" v-for="activity in taskActivities" :key="activity.id">
      <img :src="activity.byMember.imgUrl" :title="
        activity.byMember.fullname + ' (' + activity.byMember.username + ')'
      " />
      <div class="txt-container">
        <span class="username">{{ activity.byMember.fullname }}</span>
        {{ activity.txt }} on {{ activity.task.title }}
        <div class="date">{{ time2TimeAgo(activity.createdAt) }}</div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'task-details-activity',
  data() {
    return {
      activityOpen: false,
      commentTxt: '',
    }
  },
  created() { },
  methods: {
    closeAct() {
      this.activityOpen = false
    },
    addComment() {
      const txt = this.commentTxt
      console.log('txt: ', txt)
      this.commentTxt = ''
    },
    time2TimeAgo(ts) {
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      var time = new Date(ts)
      var nowTs = Date.now()
      var seconds = (nowTs - ts) / 1000

      // more than two days
      if (seconds > 2 * 24 * 3600) {
        return (
          monthNames[time.getMonth()] +
          ' ' +
          time.getDate() +
          ' at ' +
          time.getHours() +
          ':' +
          time.getMinutes()
        )
      }
      // a day
      if (seconds > 24 * 3600) {
        return 'yesterday at ' + time.getHours() + ':' + time.getMinutes()
      }

      if (seconds > 3600 * 2) {
        return Math.floor((seconds / 3600) * 2) + ' hours ago'
      }
      if (seconds > 3600) {
        return 'an hour ago'
      }
      if (seconds > 60) {
        return Math.floor(seconds / 60) + ' minutes ago'
      }
      if (seconds < 60) {
        return Math.floor(seconds) + ' seconds ago'
      }
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    taskActivities() {
      const { taskId } = this.$route.params
      const activities = this.$store.getters.activities
      return activities.filter(act => act.task.id === taskId)
    },
  },
}
</script>
