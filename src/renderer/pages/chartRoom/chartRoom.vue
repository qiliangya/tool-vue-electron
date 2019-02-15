<template>
  <div class="chart-room">
    <div class="chart-l">
      <!-- 聊天用户 -->
      <ul class="chart-user-list">
        <li v-for="(item, index) in nowUserList" :key="index" @click="changeChartWindow(index)">
          <Badge :count="item.noReadMsgCount" class-name="chart-badge">
              <Avatar shape="circle" icon="ios-person" class="user-avatar" :src="item.avatar" />
          </Badge>
          <div class="user-content">
            <div class="user-t">
              <div class="user-name">{{item.name}}</div>
              <div class="user-time">{{item.lastTime}}</div>
            </div>
            <div class="user-now-msg" v-if="item.chartList.length > 0">{{item.chartList[item.chartList.length - 1].msg}}</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 聊天主体 -->
    <div class="chart-c">
      <div class="chart-main main-scroll-bar">
        <userBox 
          v-for="(item, index) in nowUserList[nowUserForIndex].chartList" 
          :key="index" 
          :msg="item.msg" 
          :isSelf="item.isSelf" 
          :time="item.time"
          :showTime="item.showTime"
        />
      </div>
      <!-- 输入框 -->
      <div class="input-msg-box">
        <!-- 输入框可使用的工具栏 -->
        <div class="input-tools"></div>
        <div class="input-textarea">
          <Input type="textarea" v-model="inputData" @on-enter="sendMsg" autofocus/>
          <div class="btn-tools">
            <Button type="default" class="input-btns">关闭</Button>
            <Button type="success" class="input-btns" @click="sendMsg">发送</Button>
          </div>
        </div>
      </div>
    </div>
    <!-- 聊天用户信息 -->
    <div class="chart-r"></div>
  </div>
</template>

<script>
import userBox from './components/userBox'
export default {
  name: 'chart-room',
  data () {
    return {
      // 当前聊天的用户列表
      nowUserList: [
        {
          name: '七凉1',
          avatar: '',
          noReadMsgCount: 3, //  未读的消息数
          lastTime: '15:23',
          chartList: [],
          lastMsg: '嘻嘻嘻1233213211233211231321321'
        },
        {
          name: '七凉2',
          avatar: '',
          noReadMsgCount: 3, //  未读的消息数
          lastTime: '15:23',
          chartList: [],
          lastMsg: '嘻嘻嘻1233213211233211231321321'
        }
      ],
      nowUserForIndex: 0,
      // 聊天信息列表
      chartList: [],
      inputData: ''
    }
  },
  components: {
    userBox
  },
  methods: {
    changeChartWindow (index) {
      this.nowUserForIndex = index
      this.nowUserList[index].noReadMsgCount = 0
    },
    sendMsg () {
      const sendInstance = {}
      const { chartList } = this.nowUserList[this.nowUserForIndex]
      const lastTime = chartList.length > 0 ? chartList[chartList.length - 1].time : new Date()
      const nowTime = new Date()
      sendInstance.msg = this.inputData
      this.inputData = ''
      sendInstance.time = this.formatDate(nowTime)
      sendInstance.showTime = this.evalDate(lastTime, nowTime, 3)
      sendInstance.isSelf = true
      chartList.push(sendInstance)
    },
    evalDate (prev, next, num) {
      const prevTime = new Date(prev).getTime()
      const nextTime = new Date().getTime()
      return nextTime - prevTime > num * 60 * 1000
    },
    formatDate (time) {
      time = new Date(time)
      return `${time.getFullYear()}-${(time.getMonth() + 1).toString().padStart('0', 2)}-${(time.getDate()).toString().padStart('0', 2)} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    }
  }
}
</script>

<style lang="scss">
  .chart-room{
    width:100%;
    height:100%;
    display:flex;
  }
  .chart-badge{
    top:-5px;
  }
  .chart-l{
    width:200px;
    height:100%;
    background-color:#ccc;
    border-right:1px solid #ccc;
    .chart-user-list{
      width:100%;
      height:100%;
      overflow: auto;
      li{
        width:100%;
        height:60px;
        padding: 10px;
        display:flex;
        cursor: pointer;
        &:hover{
          background:rgba(255,255,255,.3)
        }
        .user-content{
          width:100%;
          margin-left:20px;
          font-size:12px;
          color:#666;
          .user-t{
            width:100%;
            display:flex;
            justify-content: space-between;
            margin-bottom:6px;
          }
          .user-now-msg{
            width:100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .chart-c{
    flex:1;
    height:100%;
    position: relative;
    .ivu-input-wrapper{
      height:100%;
    }
    .chart-main{
      padding:20px 15px 10px;
      height:70%;
      overflow: auto;
    }
    .input-msg-box{
      position: absolute;
      bottom:0;
      left:0;
      width:100%;
      border-top:1px solid #ccc;
      height:30%;
    }
    .input-textarea{
      width:100%;
      height:100%;
      position: relative;
      .btn-tools{
        position: absolute;
        bottom:20px;
        right:10px;
      }
      .input-btns{
        margin-left:10px;
      }
      textarea{
        width:100%;
        height:100%;
        border-radius: 0;
        resize:none;
        display:block;
      }
    }
  }
  .chart-r{
    width:150px;
    height:100%;
    background-color:#99f;
  }
</style>
