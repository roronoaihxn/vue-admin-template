import request from '@/utils/request'

// 获取网格交易的数据历史回测信息
export function fetchFundGridTradeInfo(query) {
  return request({
    url: '/api//fund_grid/trade_info',
    method: 'get',
    params: query
  })
}

// 获取选定时间段内的基金历史净值数据
export function fetchFundHistoryList(query) {
  return request({
    url: '/api/fund_history/list',
    method: 'get',
    params: query
  })
}

// 获取系统中所有的基金数据
export function fetchFundList(query) {
    return request({
      url: '/api/fund/list',
      method: 'get',
      params: query
    })
  }