<template>
  <Modal
    :value="!!addModal"
    @on-cancel="changeModal"
    @on-ok="success"
    loading 
    :title="addModal === 1 ? '添加' : '修改'"
    :ok-text="addModal === 1 ? '添加' : '修改'"
  >
    <Form v-if="cssData">
      <Row>
        <Col span="6">
          <h3>标题</h3>
        </Col>
        <Col span="12">
          <FormItem>
            <Input type="text" v-model="cssData.name" clearable autofocus/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <h3>描述</h3>
        </Col>
        <Col span="12">
          <FormItem>
            <Input type="text" v-model="cssData.exp" clearable autofocus/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <h3>内容</h3>
        </Col>
        <Col span="12">
            <FormItem>
              <Input type="textarea" v-model="cssData.text" clearable :autosize="{minRows: 8}"/>
            </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  props: {
    addModal: {
      default: 0,
      type: Number
    },
    cssTempData: {
      default: {},
      type: Object
    }
  },
  data () {
    return {
      cssData: {
        name: '',
        exp: '',
        text: ''
      }
    }
  },
  methods: {
    success () {
      this.addModal === 1 ? this.add() : this.update()
    },
    add () {
      ipcRenderer.send('insertData', { name: 'cssDB', data: Object.assign(this.cssData, { date: new Date() }) })
      // cssDB.insert(Object.assign(this.cssData, { date: new Date() }), (err, newData) => {
      //   if (err) throw new Error(err)
      //   this.$Message.success('添加成功!')
      //   this.changeModal(newData)
      //   this.reset()
      // })
    },
    update () {
      ipcRenderer.send('updateData', { name: 'cssDB', data: { oldData: { _id: this.cssTempData._id }, newData: this.cssData } })
      // cssDB.update({ _id: this.cssTempData._id }, this.cssData, {}, (err, num) => {
      //   if (err) throw new Error(err)
      //   this.$Message.success('修改成功!')
      //   this.changeModal(this.cssData)
      //   this.reset()
      // })
    },
    changeModal (newData) {
      this.$emit('changeModal', newData)
    },
    reset () {
      this.cssData = {
        name: '',
        exp: '',
        text: ''
      }
    }
  },
  created () {
    if (this.cssTempData._id) {
      this.cssData = this.cssTempData
    }

    ipcRenderer.on('getInsertData', (e, data) => {
      this.$Message.success('添加成功!')
      this.changeModal(data)
      this.reset()
    })

    ipcRenderer.on('getUpdateData', (e, data) => {
      this.$Message.success('修改成功!')
      this.changeModal(this.cssData)
      this.reset()
    })
  }
}
</script>

<style lang="scss" scoped>
  .css-tool{
    position: relative;
  }
</style>
