<template>
  <section class="group-menu-modal" v-click-outside="closeMenu" @click.stop="">
    <header class="flex justify-center">
      <p>{{ headerTitle }}</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click.stop="closeMenu"
      />
    </header>
    <ul v-if="!copyingGroup && !sortingGroup" class="clean-list">
      <li @click="addCard">Add card...</li>
      <li @click="copyingGroup = true">Copy list...</li>
      <li @click="toggleWatchGroup">{{ watchTxt }}</li>
      <div class="list-saperator">
        <li @click="sortingGroup = true">sort by...</li>
      </div>
      <li @click="archiveAllTasks">Archive all cards in this list...</li>
      <li @click="archiveGroup">Archive this list</li>
    </ul>
    <aside class="copy-group-container" v-if="copyingGroup">
      <h4>Name</h4>
      <textarea v-focus v-model="groupToEdit.title"> </textarea>
      <button @click="duplicateGroup">Create List</button>
    </aside>
    <aside v-if="sortingGroup" class="sort-group-container">
      <ul class="clean-list">
        <li @click="sortGroupBy('newest')">Date created (newest first)</li>
        <li @click="sortGroupBy('oldest')">Date created (oldest first)</li>
        <li @click="sortGroupBy('alphabet')">Card Name (alphabetivally)</li>
      </ul>
    </aside>
  </section>
</template>
<script>
export default {
  name: 'group-menu-modal',
  props: { group: Object },
  data() {
    return {
      copyingGroup: false,
      sortingGroup: false,
      groupToEdit: JSON.parse(JSON.stringify(this.group)),
    }
  },
  created() {},
  methods: {
    closeMenu() {
      this.$emit('close-menu')
    },
    copyList() {
      this.$emit('copy-list')
      this.closeMenu()
    },
    addCard() {
      this.$emit('add-card')
      this.closeMenu()
    },
    duplicateGroup() {
      this.groupToEdit.id = null
      this.$store.dispatch({
        type: 'setState',
        action: 'duplicateGroup',
        group: this.groupToEdit,
      })
      this.closeMenu()
    },
    toggleWatchGroup() {
      this.$store.dispatch({
        type: 'setState',
        action: 'toggleWatchGroup',
        groupId: this.group.id,
      })
      this.closeMenu()
    },
    sortGroupBy(sortBy) {
      this.$store.dispatch({
        type: 'setState',
        action: 'sortGroup',
        groupId: this.group.id,
        sortBy,
      })
      this.closeMenu()
    },
    archiveAllTasks() {
      this.$store.dispatch({
        type: 'setState',
        action: 'archiveAllTasks',
        groupId: this.group.id,
      })
      this.closeMenu()
    },
    archiveGroup() {
      this.$store.dispatch({
        type: 'setState',
        action: 'archiveGroup',
        groupId: this.group.id,
      })
      this.closeMenu()
    },
  },
  computed: {
    headerTitle() {
      if (this.copyingGroup) return 'Copy list'
      else if (this.sortingGroup) return 'Sort list'
      return 'List actions'
    },
    watchTxt() {
      if (this.group.isWatched) return 'Unwatch'
      return 'Watch'
    },
  },
  // unmounted() {},
  // components: {},
}
</script>
