<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <!-- 底部菜单容器 -->
      <div class="menu-wrapper" v-show="ifShow" :class="{ 'hide-shadow': settingShow || !ifShow }">
        <!-- 图标 -->
        <div class="icon-wrapper">
          <i class="fa fa-bars" @click="showSetting(3)"></i>
        </div>
        <div class="icon-wrapper">
          <i class="fa fa-circle-thin" @click="showSetting(2)"></i>
        </div>
        <div class="icon-wrapper">
          <i class="fa fa-sun-o" @click="showSetting(1)"></i>
        </div>
        <div class="icon-wrapper">
          <i class="fa fa-font" @click="showSetting(0)"></i>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <!-- 设置区 -->
      <div class="setting-wrapper" v-show="settingShow">
        <!-- 设置字体图标 -->
        <div class="setting-size" v-if="showTag === 0">
          <div class="preview" :style="{ fontSize: fontSizeList[0].fontSize + 'px' }">A</div>
          <div class="select">
            <div
              class="select-wrapper"
              v-for="(item, index) in fontSizeList"
              :key="index"
              @click="setFontSize(item.fontSize)"
            >
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div
            class="preview"
            :style="{ fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px' }"
          >
            A
          </div>
        </div>
        <div class="setting-theme" v-else-if="showTag === 1">
          <div
            class="theme-item"
            v-for="(item, index) in themeList"
            :key="index"
            @click="setTheme(index)"
          >
            <div
              class="preview"
              :style="{ background: item.style.body.background }"
              :class="{ 'no-boder': item.style.body.background !== '#fff' }"
            ></div>
            <div class="text" :class="{ select: index === defaultTheme }">{{ item.name }}</div>
          </div>
        </div>
        <div class="setting-progress" v-else-if="showTag === 2">
          <div class="progress-wrapper">
            <input
              class="progress"
              type="range"
              max="100"
              min="0"
              step="1"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
              :value="progress"
              :disabled="!bookAvailable"
            />
          </div>
          <div class="text-wrapper">
            <span>{{ bookAvailable ? progress + '%' : '加载中...' }}</span>
          </div>
        </div>
      </div>
    </transition>
    <ContentView
      v-show="ifShowContent"
      :navigation="nav"
      :bookAvailable="bookAvailable"
      @a="jumpTo"
    ></ContentView>
    <transition name="fade">
      <div class="content-mask" v-show="ifShowContent" @click="hideContent"></div>
    </transition>
  </div>
</template>

<script>
import ContentView from '../components/Content.vue';
export default {
  components: {
    ContentView,
  },
  props: {
    ifShow: {
      type: Boolean,
      default: false,
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number,
    nav: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      settingShow: false,
      showTag: 0,
      progress: 0,
      ifShowContent: false,
      bookAvailable: true,
    };
  },
  methods: {
    showSetting(tag) {
      this.settingShow = true;
      this.showTag = tag;
      console.log(tag);
      if (this.showTag === 3) {
        this.ifSettingShow = false;
        this.ifShowContent = true;
      } else {
        this.ifSettingShow = true;
      }
    },
    hideSetting() {
      this.settingShow = false;
    },
    setFontSize(fontSize) {
      this.$emit('aa', fontSize);
    },
    setTheme(index) {
      this.$emit('setTheme', index);
    },
    // 拖动进度条触发事件
    onProgressInput(progress) {
      console.log(progress);
      this.progress = progress;
      // this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
    },
    // 松开进度条后触发事件，根据进度条数值跳转到指定位置
    onProgressChange(progress) {
      this.$emit('onProgressChange', progress);
    },
    hideContent() {
      this.ifShowContent = false;
    },
    jumpTo(target) {
      this.$emit('a', target);
    },
  },
  updated() {
    // console.log(this.nav, 'in menuBar updated');
  },
};
</script>

<style lang="scss">
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    width: 100%;
    height: 1rem;
    display: flex;
    background-color: white;
    box-shadow: 0 -0.3rem 0.3rem rgba(0, 0, 0, 0.15);
    &.hide-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .setting-wrapper {
    position: absolute;
    z-index: 101;
    bottom: 1rem;
    left: 0;
    width: 100%;
    height: 1.4rem;
    background-color: white;
    box-shadow: 0 -0.3rem 0.3rem rgba(0, 0, 0, 0.15);
    .setting-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: 1px solid #ccc;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: 0.18rem;
            border-left: 0.02rem solid #ccc;
            .point {
              position: absolute;
              top: -7px;
              left: -10px;
              width: 20px;
              height: 20px;
              background-color: white;
              border-radius: 50%;
              border: 1px solide #ccc;
              box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.15);
              display: flex;
              justify-content: center;
              align-items: center;
              .small-point {
                width: 0.13rem;
                height: 0.13rem;
                background-color: #000;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
    .setting-theme {
      height: 100%;
      display: flex;
      .theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0.13rem;
        box-sizing: border-box;
        .preview {
          flex: 1;
          box-sizing: border-box;
          border: 1px solid #ccc;
          &.no-border {
            border: none;
          }
        }
        .text {
          flex: 0 0 0.8rem;
          font-size: 0.43rem;
          color: #999;
          display: flex;
          justify-content: center;
          align-items: center;
          &.select {
            color: #333;
          }
        }
      }
    }
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .text-wrapper {
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .progress-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 0.8rem;
        box-sizing: border-box;

        .progress {
          width: 100%;
          height: 2px;
          // -webkit-appearance: none;
          // background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
          // background-size: 0 100%;
          &:focus {
            outline: none;
          }
          ::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 0.53rem;
            height: 0.53rem;
            border-radius: 50%;
            background-color: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
            border: 1px solid #ddd;
          }
        }
      }
    }
  }
  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.9);
  }
}
</style>
