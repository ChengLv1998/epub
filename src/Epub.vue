<template>
  <div class="ebook">
    <title-bar :ifShow="ifShow"></title-bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <!-- 点击出发前一页事件 -->
        <div class="left" @click="prevPage"></div>
        <!-- 点击中间区域切换上下菜单栏显示状态 -->
        <div class="center" @click="tgMenu"></div>
        <!-- 点击触发后一页事件 -->
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <MenuBar
      :ifShow="ifShow"
      :fontSizeList="list"
      :defaultFontSize="defaultFontSize"
      @aa="setFontSize"
      :themeList="themeList"
      :defaultTheme="defaultTheme"
      @setTheme="setTheme"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange"
      :nav="navigation"
      @a="jumpTo"
      ref="menuBar"
    ></MenuBar>
  </div>
</template>

<script>
// ./ 和 @ 都可以作为一种路径方式
import TitleBar from './components/TitleBar.vue';
import MenuBar from '@/components/MenuBar';
import Epub from 'epubjs';
const URL = '/books/nahan.epub';
export default {
  components: {
    TitleBar,
    MenuBar,

  },
  data() {
    return {
      book: null,
      rendition: null,
      ifShow: false,
      list: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 },
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: 'default',
          style: {
            body: {
              color: '#000',
              background: '#fff',
            },
          },
        },
        {
          name: 'eye',
          style: {
            body: {
              color: '#000',
              background: '#ceeaba',
            },
          },
        },
        {
          name: 'night',
          style: {
            body: {
              color: '#fff',
              background: '#000',
            },
          },
        },
        {
          name: 'gold',
          style: {
            body: {
              color: '#000',
              background: 'rgb(241, 236, 226)',
            },
          },
        },
      ],
      defaultTheme: 0,
      // 图书是否处于可用状态
      bookAvailable:false,
      navigation:{},
      themes: null,
    };
  },
  created() {
    this.showEpub();
  },
  methods: {
    showEpub() {
      this.book = new Epub(URL);
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // 通过Rendition.display渲染电子书
      this.rendition.display();
      // 获取Theme对象
      this.themes = this.rendition.themes;
      // 设置默认字体
      this.setFontSize(this.defaultFontSize);
      // 主题样式
      // this.themes.register(name,styles)
      // this.themes.select(name)
      this.registerTheme();
      // this.themes.select('night')
      this.setTheme(this.defaultTheme);
      // 获取Locations对象
      // 通过epubjs的钩子函数来实现
      this.book.ready
        .then(() => {
          this.navigation = this.book.navigation;
          console.log(this.navigation)
          return this.book.locations.generate();
        })
        .then(() => {
          // console.log(result)
          this.locations = this.book.locations;
          // this.onProgressChange(50) 跳转已生效
          this.bookAvailable = true;
        });
    },
    prevPage() {
      // rendition.prev
      if (this.rendition) {
        this.rendition.prev();
      }
    },
    nextPage() {
      // rendition.next
      if (this.rendition) {
        this.rendition.next();
      }
    },
    tgMenu() {
      this.ifShow = !this.ifShow;
      if (!this.ifShow) {
        this.$refs.menuBar.hideSetting();
      }
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) {
        this.themes.fontSize(fontSize + 'px');
      }
    },
    registerTheme() {
      this.themeList.forEach((theme) => {
        this.themes.register(theme.name, theme.style);
      });
    },
    setTheme(index) {
      // console.log(index ,'a')
      // console.log(this.themeList[index].name,'b')
      this.themes.select(this.themeList[index].name);
      this.defaultTheme = index;
    },
    // 进度条的数值(0-100)
    onProgressChange(progress){
      const percentage = progress / 100;
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage):0
      this.rendition.display(location)
    },
    // 根据链接跳转到目录指定位置
    jumpTo(href){
      this.rendition.display(href);
      this.hideTitleAndMenu()
      // console.log(this.hideTitleAndMenu())
    },
    hideTitleAndMenu(){
      // 点击隐藏标题栏和菜单栏
      this.ifShow = false;
      // 点击隐藏菜单栏弹出的设置栏
      this.$refs.menuBar.hideSetting();
      // 点击隐藏目录
      this.$refs.menuBar.hideContent();
    }
  },
};
</script>

<style>
.ebook {
  position: relative;
}

.read-wrapper .mask {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.mask .left {
  flex: 0 0 60px;
}
.mask .center {
  flex: 1;
}
.mask .right {
  flex: 0 0 60px;
}
</style>
