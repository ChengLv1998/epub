<template>
  <transition name="slide-down">
    <!-- 顶部容器 -->
    <div class="title-wrapper" v-show="ifShow">
      <div class="left">
        <i class="fa fa-arrow-left"></i>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <i class="fa fa-shopping-cart"></i>
        </div>
        <div class="icon-wrapper">
          <i class="fa fa-address-book"></i>
        </div>
        <div class="icon-wrapper">
          <i class="fa fa-ellipsis-v"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    ifShow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  height: 1rem;
  display: flex;
  background-color: white;
  box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.15);
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 1.4rem;
  }
  .right {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 1rem;
    }
  }
}
</style>
