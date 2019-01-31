<template>
  <div class="index">
    <Row class="go">
      <Col span="6" offset="6">
        <Button type="info" ghost size="large" @click="goTools">点我进入</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  methods: {
    goTools () {
      this.$router.push('/tools')
    }
  }
}
</script>

<style lang="scss">
  .index{
    position: relative;
    background:url('../../../static/bg.jpg') no-repeat center;
    background-size:cover;
    height:100%;
    overflow: hidden;
    .go{
      margin-top:60px;
    }
  }
</style>
