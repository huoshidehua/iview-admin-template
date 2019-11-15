<template>
  <Card>
    <div>

      <Input v-model="searchUserName" placeholder="用户名模糊搜索" style="width:120px; "/>
      <Select v-model="searchPlatform" placeholder="平台" clearable style="width:80px; margin-left:10px">
        <Option v-for="item in platforms" :value="item" :key="item">{{ item }}</Option>
      </Select>

      <Select v-model="searchTags" multiple placeholder="标签" clearable style="width:400px; margin-left:10px">
        <Option v-for="item in tags" :value="item.id" :key="item.name">{{ item.name }}</Option>
      </Select>
      <br/>
      <DatePicker
        v-model="searchFirstUseTimeBegin"
        type="datetime" format="yyyy-MM-dd HH:mm" placeholder="初次起始时间"
        style="width: 150px; margin-top: 10px"/>
      -
      <DatePicker
        v-model="searchFirstUseTimeEnd"
        type="datetime" format="yyyy-MM-dd HH:mm" placeholder="初次终止时间"
        style="width: 150px;"/>
      <DatePicker
        v-model="searchLastUseTimeBegin"
        type="datetime" format="yyyy-MM-dd HH:mm" placeholder="最后起始时间"
        style="width: 150px; margin-left: 30px"/>
      -
      <DatePicker v-model="searchLastUseTimeEnd" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="最后终止时间"
                  style="width: 150px;"/>
      <Button style="margin-left: 20px" type="primary" @click="handleSubmit('doSeach')">筛选</Button>
      <Button style="margin-left: 10px" @click="handleSubmit('doSeach')">重置</Button>
    </div>
    <div style="margin-top: 10px;overflow: hidden">
      <Table border stripe show-header :columns="columns" :data="tableData" @on-sort-change="onSortChange"/>
    </div>
    <div style="margin-top: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="totalCount" :current="pageNum+1" :page-size="pageSize" size="small" show-elevator show-sizer
              @on-change="changePage"/>
      </div>
    </div>
  </Card>
</template>
<script>

  import {getUsers} from '@/api/user'
  import {formatDateTime, formatDate} from '@/libs/tools'

  export default {
    methods: {
      changePage() {
        let self = this
        self.loadData()
      },
      onSortChange(column, key, order) {
        let self = this
        self.sortDesc = (order == 'desc')
        self.sortBy = column.key
        self.loadData()
      },
      loadData() {
        let self = this
        getUsers(self.pageNum,
          self.pageSize,
          self.searchUserName,
          self.searchPlatform,
          self.searchTags,
          self.searchFirstUseTimeBegin,
          self.searchFirstUseTimeEnd,
          self.searchLastUseTimeBegin,
          self.searchLastUseTimeEnd,
          self.sortBy,
          self.sortDesc)
          .then(res => {
            self.tableData = res.data.listData
            self.totalCount = res.data.totalCount
          }).catch(err => {

        })
      }
    },
    mounted() {
      let self = this
      self.pageNum = 0
      self.loadData()

    },
    data() {
      return {
        pageNum: 0,
        pageSize: 10,
        totalCount: 0,
        searchPlatform: "",
        searchUserName: "",
        searchTags: [],
        sortby: "firstUseTime",
        sortDesc: true,
        searchFirstUseTimeBegin: 0,
        searchFirstUseTimeEnd: 0,
        searchLastUseTimeBegin: 0,
        searchLastUseTimeEnd: 0,
        platforms: [
          "android",
          "iOS"
        ],
        tags: [],
        columns: [
          {
            type: 'index',
            width: 60,
            align: 'center',
            fixed: 'left'
          },
          {
            title: '用户名',
            key: 'userName',
            fixed: 'left',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                attrs: {
                  href: "https://github.com/" + params.row.userName,
                  target: "view_window"
                }
              }, params.row.userName)
            }
          },
          {
            title: '用户标签',
            key: 'tags',
            align: 'left',
            width: 120,
            render: (h, params) => {
              return h('div', [
                params.row.tags.map(tag => {
                  return h('Tag', tag.name)
                })
              ])
            }
          },
          {
            title: 'follower',
            key: 'followerCount',
            width: 110,
            align: 'center',
            sortable: 'custom'
          },
          {
            title: 'repos',
            key: 'repositoryCount',
            width: 100,
            align: 'center',
            sortable: 'custom'
          },
          {
            title: 'star',
            key: 'starCount',
            width: 90,
            align: 'center',
            sortable: 'custom'
          },
          {
            title: 'follow',
            key: 'followCount',
            width: 90,
            align: 'center',
            sortable: 'custom'
          },
          {
            title: '初次使用',
            key: 'firstUseTime',
            align: 'center',
            width:100,
            sortable: 'custom',
            render: (h, params) => {
              return h('div', formatDateTime(params.row.firstUseTime))
            }
          },
          {
            title: '最后使用',
            key: 'lastUseTime',
            align: 'center',
            width:100,
            sortable: 'custom',
            render: (h, params) => {
              return h('div', formatDateTime(params.row.lastUseTime))
            }
          },
          {
            title: '用户平台',
            align: 'left',
            width: 120,
            key: 'platform',
            render: (h, params) => {
              return h('div', [
                params.row.platform.map(it => {
                  return h('Tag', it)
                })
              ])
            }
          }
        ],
        tableData: []
      }
    }

  }
</script>
