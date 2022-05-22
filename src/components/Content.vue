<template>
  <transition>
    <div class="content">
      <div class="content-wrapper" v-if="bookAvailable">
        <div
          class="content-item"
          v-for="(item, index) in navigation.toc"
          :key="index"
          @click="jumpTo(item.href)"
        >
          <span class="text">{{ item.label }}</span>
        </div>
      </div>
      <div class="empty" v-else>加载中...</div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    // ifShowContent: Boolean,
    navigation: Object,
    bookAvailable: Boolean,
  },
  methods: {
    jumpTo(target) {

      // 触发事件
      this.$emit('a', target);
    },
  },
  // updated() {
  //   console.log(this.navigation.toc, 'in content updated');
  // },
};
</script>
<style lang="scss">
.content {
  position: absolute;
  left: 20px;
  top: 40px;
  z-index: 102;
  .content-wrapper {
    .content-item {
      font-size: 16px;
      margin: 16px 0;
      color: white;
    }
  }
}
</style>
