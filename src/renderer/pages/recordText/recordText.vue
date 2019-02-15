<template>
  <div class="css-tool">
    <Button type="primary" size="large" @click="add" style="margin-bottom:20px;">添加</Button>
    <div class="css-no-list" v-if="dataList.length === 0">
      <div style="display:flex;">
        <h3>没有任何记录, 请添加~</h3>
      </div>
    </div>
    <div class="css-list" v-else>
      <div class="css-item" v-for="(item, index) in dataList" :key="index" @click="update(item, index)">
        <Card>
          <p slot="title">{{item.name}}</p>
          <Icon @click.stop="remove(item, index)" type="ios-close" slot="extra" size="25"/>
          <p>{{item.exp}}</p>
          <p>创建时间: {{formatTime(item.date)}}</p>
        </Card>
      </div>
    </div>
    <div v-if="addModalFlag">
      <add-modal :addModal="addModalFlag" @changeModal="close" :cssTempData="nowData"/>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import addModal from './children/recordTextModal'
export default {
  data () {
    return {
      addModalFlag: 0,
      nowData: {},
      dataList: []
    }
  },
  components: {
    addModal
  },
  methods: {
    add () {
      this.addModalFlag = 1
      this.nowData = {}
    },
    update (item, index) {
      this.addModalFlag = 2
      this.nowData = item
      this.nowData.index = index
    },
    close (data) {
      if (data) {
        if (this.addModalFlag === 1) {
          this.dataList.push(data)
        } else if (this.addModalFlag === 2) {
          this.dataList[this.nowData.index] = data
        }
      }
      this.addModalFlag = 0
      this.nowData = {}
    },
    remove (item, index) {
      this.$Modal.warning({
        title: '提示',
        loading: true,
        closable: true,
        content: '确定要删除吗',
        onOk: () => {
          this.dataList.splice(index, 1)
          ipcRenderer.send('removeData', { name: 'cssDB', data: { _id: item._id } })
        }
      })
    },
    formatTime (date) {
      date = new Date(date)
      let y, m, d, h, t, s
      y = date.getFullYear()
      m = date.getMonth() + 1
      d = date.getDay()
      h = date.getHours()
      t = date.getMinutes()
      s = date.getSeconds()
      return `${y}-${m}-${d} ${h}:${t}:${s}`
    }
  },
  created () {
    ipcRenderer.send('findData', { name: 'cssDB', data: {} })

    ipcRenderer.on('getFindData', (e, data) => {
      this.dataList = data
    })

    ipcRenderer.on('getRemoveData', (e, data) => {
      this.$Message.success('删除成功')
      this.$Modal.remove()
    })
  }
}
</script>

<style lang="scss" scoped>
  .css-tool{
    width:100%;
    height:100%;
    position: relative;
    padding: 20px;
  }
  .css-list{
    display:flex;
    flex-wrap: wrap;
    .css-item{
      width:250px;
      margin-right:30px;
      margin-bottom:20px;
      cursor: pointer;
    }
  }
</style>
