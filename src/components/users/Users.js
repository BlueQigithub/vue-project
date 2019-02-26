// 引入axios
// eslint-disable-next-line
// import axios from "axios";

export default {
  data() {
    return {
      listData: [
        {
          username: '王小虎',
          email: 'xxxxx@com',
          mobile: '1232324343'
        }
      ],

      // 总页数
      total: 0,
      // 输入框
      input5: '',
      // 默认当前页
      pagenum: 1,
      // 添加用户对话框
      userFormVisible: false,
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户校验
      rules: {
        username: [
          // 不填写时校验
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 填写错误时校验
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          //不填写会触发这个
          {
            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: '请填写正确的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          //不填写会触发这个
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: '请填写正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.listUserData()
  },
  methods: {
    // 获取列表数据
    async listUserData(pagenum = 1, query = '') {
      let res = await this.$axios.get('/users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      })

      // 用户列表
      this.listData = res.data.data.users
      // 总页数
      this.total = res.data.data.total
      // 当前页
      this.pagenum = res.data.data.pagenum
      // axios
      //   .get('http://localhost:8888/api/private/v1/users', {
      //     params: {
      //       query,
      //       pagenum,
      //       pagesize: 2
      //     },
      //     headers: {
      //       Authorization: localStorage.getItem('token')
      //     }
      //   })
      //   .then(res => {
      //     // console.log(res)
      //     // 用户列表
      //     this.listData = res.data.data.users
      //     // 总页数
      //     this.total = res.data.data.total
      //   })
    },
    // 点击当前页数
    pageChanged(curpage) {
      // console.log(curpage)
      this.listUserData(curpage, this.input5)
    },
    // 开始查询
    startQuery() {
      this.listUserData(1, this.input5)
    },
    // 删除单个操作
    async delBtn(id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // console.log(id)
        // 获取删除单个的id 发送请求删除
        let res = await this.$axios.delete(`users/${id}`)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 600
          })
          // 重新刷新
          this.listUserData(1, '')
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 600
        })
      }
    },

    // 用户状态变化
    async statusChange(statusObj) {
      // console.log(statusObj)
      // 获取用户的状态和id 发送请求
      let type = statusObj.mg_state
      let id = statusObj.id
      let res = await this.$axios.put(`users/${id}/state/${type}`)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg,
          duration: 600
        })
      }
    }
  }
}
