<template>
  <div class="leave-message-container" ref="leaveMessageContainer">
    <!-- <div class="input-message-section" :style="{'position': titlePosition }"> -->
    <!-- <div v-if="isNeedSticky" class="input-message-section fixed-title"  ref="inputMessageSection" id="">
        <div class="title">精选留言</div>
        <div class="input-message" v-show="isShowInputMessage" v-fastclick="() => inputMessageHandler()" v-log:click="{...log, name:'写留言'}">
          <img src="./input_message_icon@2x.png" />
          <div class="input-word">写留言</div>
        </div>
    </div>
    <div v-if="!isNeedSticky" class="input-message-section static-title"  ref="inputMessageSection">
      <div class="title">精选留言1</div>
      <div class="input-message" v-show="isShowInputMessage" v-fastclick="() => inputMessageHandler()" v-log:click="{...log, name:'写留言'}">
        <img src="./input_message_icon@2x.png" />
        <div class="input-word">写留言</div>
      </div>
    </div> -->
    <div class="input-message-section" :class="isNeedSticky?'fixed-title':'static-title'" ref="inputMessageSection">
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
    <!-- <div class="skeleton" v-show="isShowSkeleton">
      <content-loader
        :height="720"
        :width="375"
        :speed="2"
        primaryColor="#eee"
        secondaryColor="#F5F5F5"
      >
        <rect x="20" y="40" rx="5.5" ry="11" width="72" height="22" />
        <rect v-show="isShowInputMessage" x="265" y="40" rx="5.5" ry="11" width="90" height="22" />

        <rect x="20" y="98" rx="20" ry="20" width="40" height="40" />
        <rect x="75" y="103" rx="5.5" ry="11" width="90" height="19" />
        <rect x="323" y="103" rx="5.5" ry="11" width="32" height="19" />
        <rect x="75" y="132" rx="5.5" ry="11" width="280" height="16" />
        <rect x="75" y="155" rx="5.5" ry="11" width="280" height="16" />
        <rect x="75" y="178" rx="5.5" ry="11" width="280" height="16" />
        <rect x="75" y="201" rx="5.5" ry="11" width="181" height="16" />
        <rect x="75" y="227" rx="5.5" ry="11" width="45" height="16" />
        <rect x="75" y="263" rx="5.5" ry="11" width="90" height="19" />
        <rect x="75" y="292" rx="5.5" ry="11" width="280" height="16" />
        <rect x="75" y="315" rx="5.5" ry="11" width="181" height="16" />
        <rect x="75" y="341" rx="5.5" ry="11" width="45" height="16" />

        <rect x="20" y="393" rx="20" ry="20" width="40" height="40" />
        <rect x="75" y="398" rx="5.5" ry="11" width="90" height="19" />
        <rect x="323" y="398" rx="5.5" ry="11" width="32" height="19" />
        <rect x="75" y="427" rx="5.5" ry="11" width="280" height="16" />
        <rect x="75" y="450" rx="5.5" ry="11" width="280" height="16" />
        <rect x="75" y="473" rx="5.5" ry="11" width="280" height="16" />
        <rect x="75" y="496" rx="5.5" ry="11" width="181" height="16" />
        <rect x="75" y="522" rx="5.5" ry="11" width="45" height="16" />

        <rect x="20" y="574" rx="20" ry="20" width="40" height="40" />
        <rect x="75" y="579" rx="5.5" ry="11" width="90" height="19" />
        <rect x="323" y="579" rx="5.5" ry="11" width="32" height="19" />
        <rect x="75" y="608" rx="5.5" ry="11" width="280" height="16" />
        <rect x="75" y="631" rx="5.5" ry="11" width="280" height="16" />
        <rect x="75" y="657" rx="5.5" ry="11" width="45" height="16" />

      </content-loader>
    </div> -->
  </div>
</template>
<script>
/**
 * 值从父类传给子，再传给子
 */
import { Config } from "../../config";
import { jumpToLogin, getAppUserPid, jsToNative, jumpToRouter } from "../../utils/app";
import { env, compareVersion } from "../../utils";
import { ContentLoader } from "vue-content-loader";
import checkVersionAndLoginMixin from "../../mixins/checkVersionAndLoginMixin.js";
import MessageItem from "./messageItem";
import InfiniteLoading from "vue-infinite-loading";
import '@/utils/lodash.custom.js';

export default {
  mixins: [checkVersionAndLoginMixin],
  components: {
    // messageList,
    ContentLoader,
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
      isShowSkeleton: true,
      isRequestMessage:false,
      titlePosition:'',
      total: false,
      commentList: [],
      pages: 1,
      rowsNum: 10,
      isNeedSticky: false
    };
  },
  created(){},
  mounted() {
    //解决滚动抖动的问题？
    // this.isShowSkeleton = this.messageListData.length === 0 ? true : false;
    if (env.isApp) {
      this.isOldVersion = compareVersion(env.appVer, "2.7.0") < 0; 
    }
    // this.titlePosition = env.isApp ? 'sticky' : 'static';
    // this.titlePosition = env.isApp ? 'fixed-title': 'static-title';
    
// this.$nextTick(() => {
    let inputMessageSection = this.$refs.inputMessageSection;

    // 占位符设置
    let rect = inputMessageSection.getBoundingClientRect();//获得页面中导航条相对浏览器视窗的位置。
    let inseDiv = document.createElement('div');
    inputMessageSection.parentNode.replaceChild(inseDiv, inputMessageSection);
    inseDiv.appendChild(inputMessageSection);
    inseDiv.style.height = 52 || rect.height + 'px';
    // 获取导航条距页面顶部的距离
    // var titTop = inputMessageSection.offsetTop;
    console.log('height:',rect.height);
    // if(env.isApp){
      window.addEventListener('scroll', ()=>{
        console.log(':--',this.$refs.inputMessageSection,inputMessageSection.getBoundingClientRect().top)
        if(inputMessageSection.getBoundingClientRect().top > 0){
          this.titlePosition = 'static-title';
          this.isNeedSticky = false;
        }else{
          this.titlePosition = 'fixed-title';
          this.isNeedSticky = true;
        }
        console.log("----",this.titlePosition)
      });
    // }else{
    //   this.titlePosition = 'static-title';
    //   this.isNeedSticky = false;
    // }
  //  })  
  
  },
  methods: {

    // 提交留言，回到h5页面需要刷新页面
    // 写留言：在app中展示，先升级再登录吗？
    inputMessage:
      _.debounce(function(){
        this.inputMessageHandler();
    }, 500),
    async inputMessageHandler() {
      // if (this.isOldVersion) {
      //   this.$msgBox.showMsgBox({
      //     hasAction: false
      //   });
      //   return;
      // }
      // let pid = await getAppUserPid();
      // if (!pid) {
      //   return jumpToLogin();
      // }
      let pid = await this.checkVersionAndLogin("2.7.0");
      if(!pid){
        return
      }
      console.log('pid:',pid,!pid);
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
          this.isShowSkeleton = false;
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
    margin-top: 0.4rem;
    margin-bottom: 0.32rem;
    // padding-top: 0.4rem;
  }
  .fixed-title{
    // position: fixed;
    position: sticky;
    top: 0px;
    height: 0.48rem;
    margin-top: 0;
    margin-bottom: 0;
  }
  .input-message-section {
    background-color: white;
    transform: translateZ(0);
    // position: sticky;
    // top: 0px;
    // height: 0.48rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 0.2rem;
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
  padding: 0rem 0.2rem 0.4rem 0.2rem;
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
