<template>
  <section>
    <div class="icon-lg i-desc"></div>
    <article class="description">
      <div class="td-title flex gap-1">
        <h3>Description</h3>
        <button v-show="descToEdit" @click="setEdit">Edit</button>
      </div>

      <div class="desc-add">
        <textarea
          ref="input"
          v-if="editing || !descToEdit"
          v-click-outside="closeDesc"
          class="td-desc"
          v-model="descToEdit"
          @click="setEdit"
          :class="{ open: descOpen || editing }"
          placeholder="Add a more detailed description..."
          @blur="saveDesc"
        />
        <p class="desc-txt" @click="setEdit" v-else>{{ descToEdit }}</p>
        <aside class="td-desc-btns" v-show="descOpen || editing">
          <button @click="saveDesc">Save</button>
          <button>Cancel</button>
        </aside>
      </div>
    </article>
  </section>
</template>
<script>
export default {
  name: 'task-details-description',
  props: { description: String },
  data() {
    return {
      descOpen: false,
      editing: false,
      descToEdit: JSON.parse(JSON.stringify(this.description)),
    }
  },
  created() {},
  methods: {
    closeDesc() {
      this.descOpen = false
      this.editing = false
    },
    setEdit() {
      this.editing = true
      console.log(this.$refs.descInput)
      setTimeout(() => this.$refs.input.focus(), 0)
    },
    saveDesc() {
      this.$emit('save-desc', this.descToEdit)
    },
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
