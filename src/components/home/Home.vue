
<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="8">
          <img src="../../assets/images/logo.png" alt>
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="8" class="loginOut">
          上海前端33期高级VIP会员
          <a href="#" @click.prevent="loginOut">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          :router="true"
          default-active="1"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/users">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="roles">角色列表</el-menu-item>
              <el-menu-item index="rights">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <!-- 出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    loginOut () {
      this.$confirm('此操作将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 跳转到login页面
          this.$router.push('/login')
          // 退出成功提示
          this.$message({
            type: 'success',
            message: '退出成功!',
            duration: 600
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 600
          })
        })
    }
  }
}
</script>

<style lang='less'>
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
}
.container {
  height: 100%;
}
/* 头部 */
.header {
  height: 60px;
  background: #b3c1cd;
  padding: 0;
  min-width: 902px;
  h1 {
    line-height: 60px;
    text-align: center;
    color: #ffffff;
  }
  .loginOut {
    text-align: right;
    padding-right: 40px;
    line-height: 60px;
    a {
      color: yellow;
    }
  }
}

/* 侧栏 */
.aside {
  background: #545c64;
}

/* 内容 */
.main {
  background: #eaeef1;
}
</style>
