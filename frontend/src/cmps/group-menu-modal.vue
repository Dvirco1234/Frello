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
    <ul v-if="!copyingGroup" class="clean-list">
      <li @click="addCard">Add card...</li>
      <li @click="copyingGroup = true">Copy list...</li>
      <li @click="toggleWatchGroup">watch</li>
      <div class="list-saperator">
        <li @click="closeMenu">sort by...</li>
      </div>
      <li @click="closeMenu">Archive all cards in this list...</li>
      <li @click="closeMenu">Archive this list</li>
    </ul>
    <aside class="copy-group-container" v-if="copyingGroup">
      <h4>Name</h4>
      <textarea v-focus v-model="groupToEdit.title"> </textarea>
      <button @click="duplicateGroup">Create List</button>
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
      this.$store.dispatch({ type: 'duplicateGroup', group: this.groupToEdit })
      this.closeMenu()
    },
    toggleWatchGroup() {
      this.$store.dispatch({ type: 'toggleWatchGroup', groupId: this.group.id })
      this.closeMenu()
    },
  },
  computed: {
    headerTitle() {
      if (this.copyingGroup) return 'Copy list'
      else return 'List actions'
    },
  },
  // unmounted() {},
  // components: {},
}
</script>
