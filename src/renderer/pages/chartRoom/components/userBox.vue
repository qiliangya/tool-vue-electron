<template>
  <div>
    <p class="last-time" v-if="showTime">{{time}}</p>
    <div :class="'user-box' + (isSelf ? ' isSelf' : '')">
      <Avatar shape="circle" icon="ios-person" class="user-avatar" :src="avatar" />
      <div class="user-msg">
        {{msg}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      default: '',
      type: String
    },
    showTime: {
      default: false,
      type: Boolean
    },
    avatar: {
      default: '',
      type: String
    },
    msg: {
      default: '',
      type: String
    },
    isSelf: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
  .last-time{
    text-align: center;
    font-size:12px;
    color:#ccc;
    margin:20px 0;
  }
  .user-box{
    display:flex;
    margin-bottom:15px;
    &.isSelf {
      flex-flow: row-reverse;
      .user-msg{
        margin-left:0;
        margin-right:10px;
      }
    }
    .user-msg{
      min-height:20px;
      padding: 5px 10px;
      border-radius: 20px;
      max-width:600px;
      border:1px solid #666;
      font-size:#666;
      margin-left:10px;
    }
  }
</style>
