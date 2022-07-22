<template>
  <section>
    <img class="td-icon" src="../assets/description.svg" alt="description" />
    <article class="description">
      <div class="td-title">
        <h3>Description</h3>
      </div>

      <div class="desc-add">
        <textarea
          v-click-outside="closeDesc"
          class="td-desc"
          @click="descOpen = true"
          :class="{ open: descOpen }"
          placeholder="Add a more detailed description..."
        />
        <aside class="td-desc-btns" v-show="descOpen">
          <button>Save</button>
          <button @click.stop="closeDesc">Cancel</button>
        </aside>
      </div>
    </article>
  </section>
  <!-- <pre>{{description}}</pre> -->
</template>
<script>
export default {
  name: 'task-details-description',
  props: { description: String },
  data() {
    return {
      descOpen: false,
    }
  },
  created() {},
  methods: {
    closeDesc() {
      this.descOpen = false
    },
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
