import Mock from 'mockjs'
import {doCustomTimes, getParams} from '@/libs/util'

const Random = Mock.Random

export const getUserlist = req => {
  let tableData = []
  let platforms = ['iOS', 'android']
  let tags = [{id: "1", name: "android"}, {id: "2", name: "java"}]
  const params = getParams(req.url)
  doCustomTimes(params.pageSize, () => {
    tableData.push(Mock.mock({
      userName: Random.cname(),
      'starCount|1-100': 1,
      'repositoryCount|1-100': 1,
      'followCount|1-100': 1,
      'followerCount|1-100': 1,
      'platform|1-1': platforms,
      'tags|1-1': tags,
      firstUseTime: Random.date('T'),
      lastUseTime: Random.date('T')
    }))
  })
  let result = {
    pageSize: req.pageSize,
    totalCount: 100,
    pageNum: req.pageNum,
    listData: tableData
  }
  return result
}

