<template>
  <section class="task-details grid">
    <!-- <header class="td-header flex justify-center">
      <h1>⚽️</h1>
    </header> -->
    <main class="td-main flex flex-col">
      <div class="title">
        <h2>{{ task.title }}</h2>
        <p>in list {{ group.title }}</p>
      </div>
      <div class="td-top-container flex">
        <div class="members">
          <h4>Members</h4>
        </div>
        <div class="labels">
          <h4>labels</h4>
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
        <div class="title-box flex space-between">
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
      <div class="suggested flex flex-col">
        <div clas="title-box">
          <h4>Suggested</h4>
        </div>
        <button>Join</button>
      </div>
      <div class="add-to-card flex flex-col">
        <h4>Add to card</h4>
        <button>aasdd</button>
        <button>aasdd</button>
        <button>aasdd</button>
        <button>aasdd</button>
        <button>aasdd</button>
        <button>aasdd</button>
        <button>aasdd</button>
      </div>
      <div class="actions flex flex-col">
        <h4>Actions</h4>
        <button>Move</button>
        <button>Copy</button>
        <button>Archive</button>
        <button>Share</button>
      </div>
    </nav>
  </section>
  <!-- {{task}} -->
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
  methods: {},
  computed: {},
  unmounted() {},
  components: {},
}
</script>
<style>
.task-details {
  z-index: 1;
  width: 768px;
  height: 1809px;
  position: fixed;
  top: 48px;
  right: 50%;
  transform: translateX(50%);
  background-color: #f4f5f7;
  padding: 20px;
  grid-template: auto/1fr 168px;
  gap: 18px;
}
.task-details h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}
.task-details h3 {
  font-size: 16px;
  font-weight: 600;
}
.task-details h4 {
  font-size: 12px;
  font-weight: 600;
}

.td-main {
  gap: 2rem;
}

.tite-box{
    
}
.td-side-bar {
}
.td-header {
  min-height: 116px;
  background-color: #ef7564;
}
.td-desc {
  height: 56px;
  border-radius: 3px;
  padding: 0 8px 12px;
  text-align: top;
  background-color: #091e420a;
  border: none;
  width: 100%;
}
.td-activity {
  height: 36px;
  padding: 8px 12px;
  border: none;
  width: 100%;
}
.td-activity.open {
  padding-bottom: 56px;
}
.td-top-container{
    gap:8px;
}
</style>
