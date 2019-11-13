<template>
  <div class="leave-message-container" ref="leaveMessageContainer">
    <div class="input-message-section" :class="isNeedSticky?'fixed-title':'static-title'" ref="inputMessageSection">
    <!-- <div class="input-message-section" :style="{'position': titlePosition }"> -->
        <div class="title">精选留言</div>
        <div class="input-message" v-show="isShowInputMessage" v-fastclick="() => inputMessageHandler()" v-log:click="{...log, name:'写留言'}">
          <img src="./input_message_icon@2x.png" />
          <div class="input-word">写留言</div>
        </div>
    </div>
    <div class="leave-message-section">
      <div>
        <message-item
          :data="item"
          :key="item.commentPid"
          v-for="(item) in commentList" 
          :log="log"
        />
        <infinite-loading  spinner="bubbles" @infinite="infiniteHandler">
          <div slot="no-more" class="footer-warning">以上为精选留言</div>
          <div slot="no-results" class="no-message-section">
            <img src="https://coolcdn.igetcool.com/p/9/23/2019546c81f99cd72947a49ba6abe47b7433.png" />
            <div class="warning">暂无精选留言</div>
          </div>
        </infinite-loading>
        
      </div>
    </div>
  </div>
</template>
<script>

import { Config } from "../../config";
import { jumpToLogin, getAppUserPid, jumpToRouter } from "../../utils/app";
import { env, compareVersion } from "../../utils";
import checkVersionAndLoginMixin from "../../mixins/checkVersionAndLoginMixin.js";
import MessageItem from "./messageItem";
import InfiniteLoading from "vue-infinite-loading";
import iScroll from 'iscroll';
// import iScroll from 'iscroll/build/iscroll-probe'
export default {
  mixins: [checkVersionAndLoginMixin],
  components: {
    MessageItem,
    InfiniteLoading
  },
  props: {
    id: {
      type: String
    },
    log: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      h5_type: '普通活动页',
      page_name: '普通活动页',
      isShowInputMessage: env.isApp,
      isOldVersion: false,
      appUserPid: "",
      isRequestMessage:false,
      titlePosition:'',
      total: false,
      commentList: [],
      pages: 1,
      rowsNum: 10,
      isNeedSticky: false
    };
  },
  created(){
    
  },
  mounted() {
    if (env.isApp) {
      this.isOldVersion = compareVersion(env.appVer, "2.7.0") < 0; 
    }
    // this.titlePosition = env.isApp ? 'sticky' : 'static';
    // this.titlePosition = env.isApp ? 'fixed-title': 'static-title';
    // let inputMessageSection = this.$refs.inputMessageSection;
    
    // if(env.isApp){
      // window.addEventListener('scroll', ()=>{
        // console.log(this.$refs.inputMessageSection.getBoundingClientRect().top)
        // if(inputMessageSection.getBoundingClientRect().top > 0){
        //   this.titlePosition = 'static-title';
        //   this.isNeedSticky = false;
        // }else{
        //   this.titlePosition = 'fixed-title';
        //   this.isNeedSticky = true;
        // }
        console.log(env.isApp,this.titlePosition)
      // });
    // }else{
    //   this.titlePosition = 'static-title';
    //   this.isNeedSticky = false;
    // }
    // this.$nextTick(() => {
      // document.body.style.overflow = 'hidden';
      this.addScroll();
    // });
  },
  methods: {
    addScroll() {
          // document.addEventListener('mousemove', (e) => { e.preventDefault(); }, { passive: false });
          
          let fullHeight = document.querySelector('.fullHeight');
          // console.log(fullHeight)
          let myScroll = new iScroll(document.body,{
              mouseWheel: true,
              scrollbars: true,
              fadeScrollbars: true,
              tap: true,
              // probeType: 2
          });
          // console.log(myScroll)
          /**
           * 663 697 "scrol1l" true
              725 697 "scrol1l" false
           */
          
          let inputMessageSection = this.$refs.inputMessageSection;
          var titTop = inputMessageSection.offsetTop;
          const callback = (init)=>{
            var btop = document.body.scrollTop || document.documentElement.scrollTop;
            let top = inputMessageSection.getBoundingClientRect().top
            requestAnimationFrame(()=> {
              // if(btop < titTop){
              if(top > 0){
                this.titlePosition = 'static-title';
                this.isNeedSticky = false;
              }else{
                this.titlePosition = 'fixed-title';
                this.isNeedSticky = true;
              }
            });
              console.log(top,btop,titTop,'scrol1l',this.isNeedSticky)
          }

          setInterval(() => {
              callback();
          }, 0);
          // myScroll.on('scroll', callback);
       
          // myScroll.on('scrollEnd', callback);
      },

    async inputMessageHandler() {
      let pid = await this.checkVersionAndLogin("2.7.0");
      if(!pid){
        return
      }
      let commentUrl = `igetcool://juvenile.dedao.comment/comment/postcomment?activityPid=${this.id}`
      jumpToRouter(commentUrl, 'navigateToErr');
    },
    async infiniteHandler($state) {
      if (env.isApp) {
        this.appUserPid = await getAppUserPid();
      }
      this.infiniteStatus = $state;
      // 滚动加载
      let param = {
        commentId: this.id || this.commentId,
        page: this.commentList.length / this.rowsNum + 1, //第几页
        rows: this.rowsNum //每页多少条数据
      };
      this.$http
        .get(`${Config.LIVE_SERVER}/api/comment/list`, {
          params: param,
          headers: {
            'App-User-Pid': this.appUserPid
          }
        })
        .then(res => {
          let { code, data } = res.data;
          if (code !== 10000) {
            this.commentList = [];
            this.infiniteStatus.complete();
            return;
          }
          this.pages = Math.ceil(data.total / this.rowsNum);
          this.total = data.total > 0;
          if (this.pages) {
            this.commentList = this.commentList.concat(data.list);
            this.infiniteStatus.loaded();
            if (this.commentList.length / this.rowsNum + 1 > this.pages) {
              this.infiniteStatus.complete();
            }
          } else {
            this.infiniteStatus.complete();
          }
        });
    }
  }
};
</script>
<style lang="scss">
  .static-title{
    position: static;
    margin-top: 0.3rem;
    margin-bottom: 0.32rem;
  }
  .fixed-title{
    // position: fixed;
    position: sticky;
    top: 0px;
    // height: 0.48rem;
    margin-top: 0;
    margin-bottom: 0;
  }
  .leave-message-container{
    // padding-top:0.3rem;
  }
  .input-message-section {
    background-color: white;
    transform: translateZ(0);
    // position: sticky;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding: 0rem 0.2rem;
    padding: 0.13rem 0.2rem;
    .title {
      font-size: 0.18rem;
      font-weight: 500;
      color: #2c3b53;
    }
    .input-message {
      display: flex;
      align-items: center;
      font-size: 0.13rem;
      height: 0.28rem;
      background: #ff5f2e;
      border-radius: 14rem;
      text-align: center;
      padding: 0 0.1rem;
      img,.input-word{
        vertical-align: middle;
        color: #ffffff;
      }
      .input-word{
        margin-left: 0.04rem;
        font-weight: 500;
      }
      img{
        width: 0.16rem;
        height: 0.16rem;
      }
    }
  }
.leave-message-section {
  font-size: 0.14rem;
  padding: 0.19rem 0.2rem 0.4rem 0.2rem;
  .footer-warning {
    font-size: 0.14rem;
    color: #c2c2cc;
    font-weight: 400;
    text-align: center;
  }
  .no-message-section {
    text-align: center;
    padding-top: 0.18rem;
    padding-bottom: 0.4rem;
    img {
      width: 31%;
    }
    .warning {
      font-size: 0.14rem;
      color: #c2c2cc;
      font-weight: 400;
    }
  }
}
</style>
