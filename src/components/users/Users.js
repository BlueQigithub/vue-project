// 引入axios
// eslint-disable-next-line
import axios from "axios";

export default {
  data () {
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
      pagenum: 1
    }
  },
  created () {
    this.listUserData()
  },
  methods: {
    // 获取列表数据
    async listUserData (pagenum = 1, query = '') {
      let res = await axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
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
    pageChanged (curpage) {
      // console.log(curpage)
      this.listUserData(curpage, this.input5)
    },
    // 开始查询
    startQuery () {
      this.listUserData(1, this.input5)
    }
  }
}