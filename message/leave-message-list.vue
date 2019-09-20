<template>
  <div>
    <el-row class="toolbar topbar-style">
      <el-col :span="24">
        <el-select filterable v-model="valueOne" placeholder="请选择课/书" @change="selectOne">
          <el-option
            v-for="item in optionsOneComment"
            :key="item.paramCode"
            :label="item.paramName"
            :value="item.paramCode">
          </el-option>
        </el-select>
        <el-select filterable v-model="valueTwo" placeholder="请选择相应的课/书" @change="selectTwo">
          <el-option
            v-for="item in optionsTwo"
            :key="item.paramCode"
            :label="item.paramName"
            :value="item.paramCode">
          </el-option>
        </el-select>
        <el-select filterable v-model="valueThree" placeholder="请选择相应的小节/章节" @change="selectThree">
          <el-option
            v-for="item in optionsThree"
            :key="item.paramCode"
            :label="item.paramName"
            :value="item.paramCode">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <div class="message-list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="精品课"></el-table-column>
          <el-table-column prop="commentCount" label="留言总数"></el-table-column>
          <el-table-column prop="commentSift" label="精选数"></el-table-column>
          <el-table-column prop="commentReply" label="作者回复数"></el-table-column>
          <el-table-column prop="commentSiftReply" label="精选且回复数"></el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <div style="height: 45px;display: flex;align-items: flex-end;">
                <el-badge :value="scope.row.count || ''" class="item">
                  <el-button @click="edit(scope.row)"
                             type="primary" class="btn "
                             size="small">查看留言
                  </el-button>
                </el-badge>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <el-row>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="page"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    </el-row>


  </div>
</template>
<script>
  import {
    getCommentList,
    setVote,
    getSetVote
  } from "@api/api";
  import {linkageMixin} from "@assets/tools/linkageMixin.js";

  export default {
    mixins: [linkageMixin],
    data() {
      return {
        optionsOneComment: [
          {
            paramCode: "0",
            paramName: "听书"
          }, {
            paramCode: "1",
            paramName: "音频课程"
          }, {
            paramCode: "2",
            paramName: "舰长广播"
          }, {
            paramCode: "3",
            paramName: "地球电讯"
          }, {
            paramCode: "4",
            paramName: "直播课程"
          }, {
            paramCode: "6",
            paramName: "点播课程"
          }, {
            paramCode: "7",
            paramName: "自定义音频"
          }
        ],
        tableData: [],
        total: 0,
        page: parseInt(this.$route.query.page || 1),
        pageSize: 10,
        dialogFormVisible: false,
        shareCover: "",
        uploadData: {},
        coursePid: "",
        rules: {},
        leaveMessage: true,
        joinData: [],
        userPid: "",
      };
    },
    created() {
      this.valueOne = this.$route.query.valueOne
        ? this.$route.query.valueOne
        : "1";
      this.valueTwo = this.$route.query.valueTwo
        ? this.$route.query.valueTwo
        : "";
      this.valueThree = this.$route.query.valueThree
        ? this.$route.query.valueThree
        : "";

      this.linkageEvent();
      this.linkageEvent(1, this.valueOne);
      if (this.valueOne && this.valueTwo) {
        this.linkageEvent(2, this.valueOne + "," + this.valueTwo);
      }

      this.getData(this.valueOne, this.valueTwo, this.valueThree).then(() => {
        this.page = parseInt(this.$route.query.page || 1);
      });
    },
    methods: {
      // 获取列表
      getData(typeOne, typeTwo, typeThree) {
        return getCommentList({
          pageSize: this.pageSize,
          pageIndex: this.page,
          type: typeOne,
          pid: typeTwo,
          aid: typeThree
        }).then(res => {
          let {code, data} = res;
          if (code !== 10000) {
            this.tableData = [];
            return;
          }

          if (data) {
            this.tableData = data.list;
            this.total = data.total;
          } else {
            this.tableData = [];
            this.total = 0;
          }
        });
      },
      searchLink() {
        this.getData(this.valueOne, this.valueTwo, this.valueThree);
      },
      // 分页事件
      handleCurrentChange(val) {
        this.page = val;
        this.getData(this.valueOne, this.valueTwo, this.valueThree);
      },
      // 编辑按钮
      edit(row) {
        let courseName = '';
        let chapterName = '';
        for(let i=0,len = this.optionsTwo.length;i<len;i++){
          if(this.optionsTwo[i].paramCode===this.valueTwo){
            courseName = this.optionsTwo[i].paramName;
            break;
          }
        }
        for(let i=0,len = this.optionsThree.length;i<len;i++){
          if(this.optionsThree[i].paramCode===this.valueThree){
            chapterName = this.optionsThree[i].paramName;
            break;
          }
        }

        let relaPid = ''
        if(+this.valueOne===7){
          relaPid = ''
        }else{
          relaPid = this.valueTwo
        }
        this.$router.push({
          path: "/leaveMessageList/leaveMessageView",
          query: {
            pid: row.pid,
            valueOne: this.valueOne,
            valueTwo: this.valueTwo,
            valueThree: this.valueThree,
            page: this.page,
            relaPid: relaPid,
            type:row.type,
            // courseName:courseName,
            // chapterName:chapterName
          }
        });
      }
    }
  };
</script>
<style scoped>
  .topbar-style{
    height:auto!important;
  }
  img {
    height: 200px;
  }

  .btn {
    margin-bottom: 3px;
    /* float:left; */
  }

  .pagination {
    float: right;
  }

  .cover-img {
    /* width:150px; */
    height: 100px;
  }
</style>

