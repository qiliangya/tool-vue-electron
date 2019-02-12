<template>
  <div class="qq">
    <Form>
      <Row>
        <Col span="6">
          <h3>输入你的QQ号</h3>
          <Input type="text" v-model="qq" number/>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <h3>输入你的skey号</h3>
          <Input type="text" v-model="skey"/>
        </Col>
      </Row>
      <Row style="margin-top:20px;">
        <Col span="6">
          <Button type="primary" size="large">确定</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import axios from 'axios'
const C_U = 871259169
const C_K = '@NEn40ZK0z'

const API = {
  time: 'https://api.xuwenhui.xin/api/qq_buddy_time',
  msg: 'https://api.xuwenhui.xin/api/qq_jbxx'
}
const user = {
  '刘道瑞': '1281995190',
  '赖正撸': '1264578659',
  '俞梦成': '908623375',
  '吴志勇': '2206640719',
  '王志肖': '1986647188'
}
export default {
  data () {
    return {
      skey: '',
      qq: ''
    }
  },
  created () {
    for (const item in user) {
      axios.get(API.time, { params: { Q_U: user[item], C_U, C_K } }).then(data => {
        const { msg } = data.data
        const allDate = new Date(parseInt(msg) * 1000)
        const date = new Date(new Date() - allDate)
        console.log(`你和${item}是${allDate.getFullYear()}年${allDate.getMonth() + 1}月${allDate.getDate()}日成为的好友, 已经${Math.round(date.getTime() / (1000 * 60 * 60 * 24))}天了`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .qq{
    padding:20px;
  }
</style>
