<template>
  <section class="group-menu-modal" v-click-outside="closeMenu">
    <header class="flex justify-center">
      <p>List actions</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click.stop="closeMenu"
      />
    </header>
    <ul class="clean-list">
      <li @click="addCard">Add card...</li>
      <li @click.stop="closeMenu">Copy list...</li>
      <li @click.stop="closeMenu">watch</li>
      <div class="list-saperator">
        <li @click.stop="closeMenu">sort by...</li>
      </div>
      <li @click.stop="closeMenu">Archive all cards in this list...</li>
      <li @click.stop="closeMenu">Archive this list</li>
    </ul>
  </section>
</template>
<script>
export default {
  name: 'group-menu-modal',
  // props: { type: Object },
  data() {
    return {}
  },
  created() {},
  methods: {
    closeMenu() {
      this.$emit('close-menu')
    },
    addCard() {
      this.$emit('add-card')
    },
  },
  // computed: {},
  // unmounted() {},
  // components: {},
}
</script>
