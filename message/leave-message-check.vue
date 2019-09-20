<template>
  <div>
    <div>{{title}}</div>
    <el-row class="toolbar topbar-style">
      <el-button @click="returnBack">返回</el-button>

      <el-form inline style="float: right;">
        <el-form-item label="首页状态:">
          <el-select placeholder="请选择" v-model="form.homeStatus">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="未上首页" value="0"></el-option>
            <el-option label="已上首页" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="精选状态:">
          <el-select v-model="form.pickStatus" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" @click="queryComment">
          查询
        </el-button>
      </el-form>
    </el-row>
    <el-row>
      <!-- 定义表格框架 -->
      <div class="table table-striped jambo_table bulk_action">
        <div class="comments-border-top width-scope comments-mt"
             v-for="(item,index) in tableData">
          <div class="height60">
            <img v-if="item.headUrl" :src="item.headUrl" alt=""
                 class="comments-view-head  left-float">
            <img v-if="!item.headUrl" src="/static/img/famale@2x.png" alt=""
                 class="comments-view-head left-float">
            <span class="fontSize18 margin_left_10 left-float comments-view-height">
              {{item.nickName}}
            </span>

            <span class="fontSize18 red ml5 comment-distance left-float comments-view-height"
                  v-if="item.status">已精选</span>

            <span class="fontSize16 right-float">
              {{item.createTime}}
            </span>

            <div style="clear:both"></div>
          </div>

          <div style="margin-top: 10px;">
            <el-tag v-if="item.sex">{{item.sex}}</el-tag>
            <el-tag v-if="item.grade">{{item.grade}}</el-tag>
            <el-tag v-if="item.phone">{{item.phone}}</el-tag>
          </div>
          <div class="comments-view-content" v-html="item.content"></div>
          <div class="fontSize16">
            <div class="right-float">
              <el-button type="success" plain v-if="!item.status"
                         v-on:click="IncludedClick(1,index,item.commentPid)"
                         class="hand">精选该留言
              </el-button>
              <el-button type="danger" plain v-if="item.status"
                         v-on:click="IncludedClick(0,index,item.commentPid)"
                         class="hand bg-orange">取消精选留言
              </el-button>
              <el-button @click="join(item)"  class="btn">参加投票
                <span v-if="(item.votePid != '0') && (item.votePid != null ) && (item.votePid !='') ? true:false" class="joining">(已参加)</span>
              </el-button>

              <el-button type="success" plain v-if="item.status && item.homeStatus === 0"
                         v-on:click="showToHome(1,item.commentPid)"
                         class="hand bg-orange">上首页
              </el-button>
              <el-button type="success" plain v-if="item.homeStatus === 1"
                         v-on:click="showToHome(0,item.commentPid)"
                         class="hand bg-orange">取消上首页
              </el-button>
              <el-button type="primary" plain v-show="!item.reply"
                         v-on:click="replyClick(index,item.commentPid,0)"
                         class="hand blue ml15">回复
              </el-button>
            </div>
            <div style="clear:both"></div>
          </div>
          <div v-show="item.replyFlag">
            <div>作者回复：</div>
            <textarea class="input" v-bind:class="{borderStyle:item.rContent}"
                      v-show="!item.reply" contenteditable="true" style="resize:none"
                      placeholder="请输入回复内容" ref="rContentText"
                      maxlength="2000" v-model="item.rContent"></textarea>
            <div class="input" v-bind:class="{borderStyle:item.rContent}"
                 v-show="item.reply" contenteditable="false" style="resize:none"
                 placeholder="请输入回复内容" ref="rContentDiv" maxlength="2000"
                 v-html="item.rContent"></div>
            <div class="textRight margin_top_10">
              <el-button type="warning" v-show="!item.reply"
                         v-on:click="cancelClick(index)">取消</el-button>
              <el-button type="success" v-on:click="submitRcontent"
                         v-show="!item.reply">提交</el-button>
              <el-button type="danger" v-show="item.reply"
                         v-on:click="replyClick(index,item.commentPid,1)">删除回复
              </el-button>


            </div>
          </div>
        </div>
      </div>
    </el-row>
    <el-row>
      <div class="toolbar">
        <el-pagination
          class="right-float"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-size="10"
          :total="total">
        </el-pagination>
      </div>
    </el-row>

    <el-dialog title="参加投票" :visible.sync="dialogFormVisible">
      <el-form >
        <el-form-item label=""  >
          <el-select v-model="joinDataValue" placeholder="">
            <el-option v-for="item in joinData" :key="item.votePid" :label="item.voteName" :value="item.votePid"></el-option>
          </el-select>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="surejoin">确定参加</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import {
  getCommentView,
  postCommentView,
  postCommentSift,
  showCatalogToHome,
  setVote,
  getSetVote,
  getAudioTitle
} from "@api/api";
import {linkageMixin} from "@assets/tools/linkageMixin.js";

export default {
  mixins: [linkageMixin],
  data() {
    return {
      options: [{
        value: "0",
        label: "全部留言"
      }, {
        value: "1",
        label: "入选留言"
      }, {
        value: "2",
        label: "已回复留言"
      }],
      form: {
        pickStatus: '',
        homeStatus: '',
      },
      status: 0,
      tableData: [],
      total: 0,
      pageIndex: 1,
      formLabelWidth: "180px",
      rules: {},
      leaveMessage: true,
      joinData:[],
      joinDataValue:'',
      userPid:'',
      commentPid:'',
      votePid:'',
      dialogFormVisible:false,
      relaPid: this.$route.query.relaPid || '',
      title:''
    };
  },
  created() {
    this.getData();
    // this.linkageEvent();
    // this.linkageEvent(1, this.valueOne);
    this.getAudioTitle();
  },
  methods: {
    getAudioTitle(){
      getAudioTitle({
        pid: this.$route.query.pid,
        relaPid:this.$route.query.relaPid,
        type:  this.$route.query.type
      }).then(res => {
        if (res.code == 10000) {
          let baseTitle = res.data.baseTitle ? res.data.baseTitle:'';
          let audioTitle = res.data.audioTitle ? res.data.audioTitle:'';
          this.title = baseTitle + (audioTitle ? ('/' + audioTitle) : '') 
        }
      });
    },
    returnBack() {
      this.$router.push({
        path: "/leaveMessageList",
        query: {
          valueOne: this.$route.query.valueOne,
          valueTwo: this.$route.query.valueTwo,
          valueThree: this.$route.query.valueThree,
          page: this.$route.query.page
        }
      });
    },
    // 选择分类
    queryComment() {
      this.getData();
    },
    //  精选
    IncludedClick(Included, index, pid) {
      let message = "";
      let messageSuccess = "";
      if (Included) {
        message = "确定精选吗?";
        messageSuccess = "精选成功";
      } else {
        message = "确定取消精选吗?";
        messageSuccess = "取消精选成功";
      }
      this.$confirm(message, "提示", {
        type: "warning"
      })
        .then(() => {
          postCommentSift({
            pid: pid,
            status: Included
          }).then(res => {
            if (res.code == 10000) {
              this.$message({
                message: messageSuccess,
                type: "success"
              });
              this.getData();
            }
          });
        })
        .catch(() => {
        });
    },
    // 回复0, 删除回复1
    replyClick(index, pid, flag) {
      this.replyIndex = index;
      this.replyPid = pid;
      if (flag) {
        this.replyFlagPost(index, pid, flag);
      } else {
        this.tableData[index].replyFlag = !this.tableData[index].reply;
      }
    },
    // 提交回复
    submitRcontent() {
      this.replyFlagPost(this.replyIndex, this.replyPid, 0);
    },
    cancelClick: function (index) {
      this.tableData[index].replyFlag = this.tableData[index].reply;
      this.tableData[index].rContent = "";
    },
    replyFlagPost(index, pid, flag) {
      if (!this.$refs.rContentText[index].value) {
        this.$message.error("请输入回复");
        return;
      }
      let message = "";
      let messageSuccess = "";
      if (flag) {
        message = "确定删除回复吗?";
        messageSuccess = "删除成功";
      } else {
        message = "确定提交回复吗?";
        messageSuccess = "提交成功";
      }
      this.$confirm(message, "提示", {
        type: "warning"
      }).then(() => {
          postCommentView({
            status: flag,
            pid: pid,
            content: this.$refs.rContentText[index].value
          }).then(res => {
            if (res.code == 10000) {
              this.$message({
                message: messageSuccess,
                type: "success"
              });
              this.getData();
            }
          });
        })
        .catch(() => {
        });
    },
    // 获取列表
    getData() {
      getCommentView({
        pageSize: 10,
        pageIndex: this.pageIndex,
        type: this.$route.query.type,
        pid: this.$route.query.pid,
        status: this.form.pickStatus,
        homeStatus: this.form.homeStatus,
        relaPid:this.$route.query.type == 2 || this.$route.query.type == 3 ? "0" :this.relaPid,
      }).then(res => {
        let {code, data} = res;
        if (code == 10000) {

          data.list.forEach((e, i) => {
            data.list[i].replyFlag = data.list[i].reply;
          });
          this.tableData = data.list;
          this.total = data.total;
        } else if (code == 500001) {
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    searchLink() {
      this.getData();
    },
    // 分页事件
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getData();
    },
    showToHome(homeStatus, pid) {

      let param = {
        pid,
        homeStatus,
      };

      showCatalogToHome(param).then(res => {
        let {code, data, friendlyMsg} = res;

        if(code !== 10000) {
          this.$message.error(friendlyMsg);
          return;
        }
        this.getData();
      })
    },
    join(row) {
      this.userPid = row.userPid;
      this.commentPid  = row.commentPid;
      this.votePid = row.votePid;
      this.dialogFormVisible = true;
      getSetVote().then(res => {
        if (res.code == 10000) {
          this.joinData = res.data;
          if(!this.votePid || this.votePid == 0){
          this.joinDataValue = '';
          } else {
            this.joinDataValue =  this.votePid;
          }
        }
      });
    },
    surejoin() {
      if(!this.joinDataValue || this.joinDataValue == 0){
        alert('请选择参加的活动');
        return;
      }
      setVote({
        votePid: this.joinDataValue,
        userPid:this.userPid,
        commentPid:this.commentPid
      }).then(res => {
        if (res.code == 10000) {
          this.getData();
          this.dialogFormVisible =false;
        }
      });
    }
  }
};
</script>
<style  scoped>
  .topbar-style{
    height:auto!important;
  }
.comments-view-head {
  width: 60px;
  height: 60px;
  line-height: 60px;
}
.comments-view-height {
  height: 60px;
  line-height: 60px;
  display: block;
}

.fontSize18 {
  font-size: 18px;
}

.fontSize16 {
  font-size: 16px;
}

.margin_left_10 {
  margin-left: 10px;
}
.ml5 {
  margin-left: 5px;
}

.width-scope {
  min-width: 405px;
}

.comments-view-content {
  font-size: 14px;
  margin: 26px 0;
}

.comments-border-top {
  border: 1px solid #d8d4d1;
  padding: 20px;
}

.input {
  width: 100%;
  min-height: 60px;
  margin-top: 20px;
  font-size: 14px;
  border: 1px solid #d8d4d1;
}

.input:empty::before {
  color: #8f8e8d;
  content: attr(placeholder);
}

div.comments-mt:not(:first-child) {
  margin-top: 20px;
}

.margin_top_10 {
  margin-top: 10px;
}

.borderStyle {
  border: 0px solid #d8d4d1;
}
.hand {
  cursor: pointer;
}

.blue {
  color: #6b9fed;
}

.green {
  color: #26b99a;
}
.joining{
  color: red;
}
</style>

