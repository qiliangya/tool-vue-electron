<template>
  <div class="tools">
    <Menu mode="horizontal" theme="light" :active-name="$route.name">
        <MenuItem name="qrcode" to="qrcode">
          <Icon type="ios-barcode" />
          二维码
        </MenuItem>
        <MenuItem name="recordText" to="recordText">
          <Icon type="ios-bowtie-outline" />
          记事本
        </MenuItem>
        
        <MenuItem name="chartRoom" to="chartRoom">
          <Icon type="ios-at" />
          聊天室
        </MenuItem>
        <!-- <MenuItem name="qq" to="qq">
          <Icon type="ios-paper-plane" />
          QQ相关
        </MenuItem> -->
        <!-- <MenuItem name="2">
            <Icon type="ios-people" />
            用户管理
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats" />
                统计分析
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-construct" />
            综合设置
        </MenuItem> -->
    </Menu>
    <div class="content-box">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.tools{
  height:100%;
}
.content-box{
  height: calc(100% - 60px);
}
</style>
