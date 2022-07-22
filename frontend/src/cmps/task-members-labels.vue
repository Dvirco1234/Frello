<template>
  <section>
    <article class="members-labels-data flex">
      <div v-if="members?.length" class="members">
        <h4>Members</h4>
        <div class="membersImgs flex">
          <span v-for="member in members" :key="member._id">
            <img class="memberImg" :src="member.imgUrl" />
          </span>
          <button class="round-btn">
            <img class="td-plus" src="../assets/plus.svg" alt="add" />
          </button>
        </div>
      </div>
      <div v-if="labels?.length" class="labels">
        <h4>labels</h4>
        <div class="label-container flex">
          <button
            v-for="label in labels"
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
</template>
<script>
export default {
name: 'task-members-labels',
props: {members: Array,labels:Array},
data() {
return {}
},
created() {},
methods: {},
computed: {},
unmounted() {},
components: {}
}
</script>
