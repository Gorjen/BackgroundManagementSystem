<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      style="margin-left: 10px; margin-top: 10px; cursor: pointer;"
      size="small"
    >{{item.label}}</el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations(["closeTag"]),
    changeMenu(item) {
      // console.log(item, "item");
      this.$router.push({
        name: item.name
      });
    },
    handleClose(item, index) {
      this.closeTag(item);
      const length = this.tags.length;
      // console.log(length, "length", index, "index");
      if (item.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name
        });
      } else {
        this.$router.push({
          name: this.tags[index].name
        });
      }
    }
  }
};
</script>