<template>
  <div class="fund-container">
    <div class="filter-container">
      <el-select v-model="selectedFundCode" style="width: 250px" class="filter-item" @change="handleFundChange">
        <el-option v-for="item in fundList" :key="item.key" :label="item.fund_name" :value="item.fund_code" />
      </el-select>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        format="yyyy-MM-dd"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-form :inline="true" :model="gridForm" class="demo-form-inline">
        <el-form-item label="初始持有份额">
          <el-input v-model="gridForm.initHoldNum" placeholder="初始持有份额"></el-input>
        </el-form-item>
        <el-form-item label="每次操作份额(每次涨幅到了，买卖操作的份额)">
          <el-input v-model="gridForm.stepTradeNum" placeholder="操作份额"></el-input>
        </el-form-item>
        <el-form-item label="涨多少进行操作(小数)">
          <el-input v-model="gridForm.gridRise" placeholder="涨幅"></el-input>
        </el-form-item>
        <el-form-item label="跌多少进行操作(小数)">
          <el-input v-model="gridForm.gridDown" placeholder="跌幅"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitGridTradeParams">提交网格交易参数设置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row class="fund-container">
      <!-- 这里echart　需要设置个高度，不然显示会有问题 -->
      <el-col :span="22" style="height: 100%">
        <fund-history :chart-data="valueHistoryData" height="100%" width="100%"></fund-history>
      </el-col>
      <el-col :span="2">
        <el-descriptions v-model="gridTradeSumarry" title="期末持仓情况" :column="1" border>
          <el-descriptions-item label="持仓数量">{{ gridTradeSumarry.holdNum }}</el-descriptions-item>
          <el-descriptions-item label="持仓成本">{{ gridTradeSumarry.holdAvgValue }}</el-descriptions-item>
          <el-descriptions-item label="持仓金额">{{ gridTradeSumarry.holdMoney }}</el-descriptions-item>
          <el-descriptions-item label="最新净值">{{ gridTradeSumarry.endTimeValue }}</el-descriptions-item>
        </el-descriptions>
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(trade, index) in gridTradeTimeLines"
            :key="index"
            :icon="trade.icon"
            :type="trade.type"
            :color="trade.color"
            :size="trade.size"
            :timestamp="trade.date">
            {{trade.content}}
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { fetchFundGridTradeInfo, fetchFundList, fetchFundHistoryList } from '@/api/fund'
import FundHistory from './components/fund-history'
export default {
  name: 'FundHistoy',
  components: {
    FundHistory
  },
  data() {
    return {
      // 基金选择
      selectedFundCode: "009571",
      endDate: "",
      startDate: "",
      // 网格交易
      gridForm: {"initHoldNum": 0, "stepTradeNum": 0},
      gridTradeTimeLines: [],
      // 网格交易summary
      gridTradeSumarry: {},

      // 时间线倒序排列
      reverse: true,
      // 时间选择
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick: (picker) => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
              this.endDate = dayjs(end).format('YYYY-MM-DD')
              this.startＤate = dayjs(start).format('YYYY-MM-DD')
              this.handleFundChange()
            }
          }, {
            text: '最近一个月',
            onClick: (picker) => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
              this.endDate = dayjs(end).format('YYYY-MM-DD')
              this.startＤate = dayjs(start).format('YYYY-MM-DD')
              this.handleFundChange()
            }
          }, {
            text: '最近三个月',
            onClick: (picker) => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
              this.endDate = dayjs(end).format('YYYY-MM-DD')
              this.startＤate = dayjs(start).format('YYYY-MM-DD')
              this.handleFundChange()
            }
          }, {
            text: '最近6个月',
            onClick: (picker) => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit('pick', [start, end]);
              this.endDate = dayjs(end).format('YYYY-MM-DD')
              this.startＤate = dayjs(start).format('YYYY-MM-DD')
              this.handleFundChange()
            }
          }, {
            text: '最近一年',
            onClick: (picker) => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit('pick', [start, end]);
              this.endDate = dayjs(end).format('YYYY-MM-DD')
              this.startＤate = dayjs(start).format('YYYY-MM-DD')
              this.handleFundChange()
            }
          }, {
            text: '最近两年',
            onClick: (picker) => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360 * 2);
              picker.$emit('pick', [start, end]);
              this.endDate = dayjs(end).format('YYYY-MM-DD')
              this.startＤate = dayjs(start).format('YYYY-MM-DD')
              this.handleFundChange()
            }
          }, {
            text: '最近三年',
            onClick: (picker) => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360 * 3);
              picker.$emit('pick', [start, end]);
              this.endDate = dayjs(end).format('YYYY-MM-DD')
              this.startＤate = dayjs(start).format('YYYY-MM-DD')
              this.handleFundChange()
            }
          }],
          onPick: ({ maxDate, minDate }) => {
            console.log("on pick---")
            if (!maxDate || !minDate) {
              return 
            }
            this.endDate = dayjs(maxDate).format('YYYY-MM-DD')
            this.startＤate = dayjs(minDate).format('YYYY-MM-DD')
            console.log("----pick", this.endDate, this.startＤate)
            this.handleFundChange()
          }
        },
      value2: '',

      // 系统中的基金数据
      fundList: [],
      valueHistoryData: {
        dateList: [],
        valueList: [],
        percentageList: [],
        gridTradeList: [],
      }
    }
  },
  methods: {
    onSubmitGridTradeParams() {
      let query = {"fund_code": this.selectedFundCode}
      if (this.startＤate) {
        query.start_time = this.startＤate
      }
      if (this.endDate) {
        query.end_time = this.endDate
      }
      query.init_hold_num = this.gridForm.initHoldNum
      query.step_trade_num = this.gridForm.stepTradeNum
      query.grid_rise = this.gridForm.gridRise
      query.grid_down = this.gridForm.gridDown
      console.log("网格参数:", query)
      fetchFundGridTradeInfo(query).then(response => {
        this.valueHistoryData.gridTradeList = []
        this.gridTradeTimeLines = []
        
        let gridTradeInfo = response.data
        console.log("网格交易信息:", response.data)
        this.gridTradeSumarry.holdAvgValue = gridTradeInfo.hold_avg_value
        this.gridTradeSumarry.holdNum = gridTradeInfo.hold_num
        this.gridTradeSumarry.holdMoney = gridTradeInfo.hold_money
        this.gridTradeSumarry.endTimeValue = gridTradeInfo.end_time_value


        var itemStyle = {"color": "#0F0"}
        gridTradeInfo.trade_list.forEach((element) => {
          if (element.type === "sell") {
            itemStyle = {"color": "#F00"}
          }
          this.valueHistoryData.gridTradeList.push({"name": element.type, "xAxis": element.date, "symbol": "pin", "itemStyle": element.type === "sell"? {"color": "#F00"} : {"color": "#0F0"}, "yAxis": element.value})
          console.log("gridList---", this.valueHistoryData.gridTradeList)
          this.gridTradeTimeLines.push({
            content: element.type == "sell" ? "以价格:"+ element.value+"卖出"+element.trade_num+"份": "以价格:"+ element.value+"买入"+element.trade_num+"份",
            date: element.date,
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more',
            color: element.type == "sell" ? "#FF0000": "#00FF00",
          })
        })
        // 最后一次交易的预测点
        let finalTrade = gridTradeInfo.trade_list[gridTradeInfo.trade_list.length - 1]
        let predictSellPrice = finalTrade.value * (1 + finalTrade.grid)
        let predictBuyPrice = finalTrade.value * (1 - finalTrade.grid)
        let tradeNum = finalTrade.trade_num
        this.gridTradeTimeLines.push({
            content: `以价格:${predictSellPrice} 卖出 ${tradeNum}份或者以价格:${predictBuyPrice}买入${tradeNum}份`,
            date: dayjs(finalTrade.date).add(1, 'day').format('YYYY-MM-DD'),
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more',
            color: "#a000a0",
          })
      })
    },
    handleFundChange() {
      let query = {"fund_code": this.selectedFundCode}
      if (this.startＤate) {
        query.start_time = this.startＤate
      }
      if (this.endDate) {
        query.end_time = this.endDate
      }
      fetchFundHistoryList(query).then(response => {
        let historyList = response.data
        this.valueHistoryData.dateList = []
        this.valueHistoryData.valueList = []
        this.valueHistoryData.percentageList = []
        historyList.forEach((element) => {
          this.valueHistoryData.dateList.push(element["date"])
          this.valueHistoryData.valueList.push(element["value"])
          this.valueHistoryData.percentageList.push(element["percentage"]+"%")
        })
      })
    },
  },
  mounted() {
    fetchFundList().then(response => {
      this.fundList = response.data
    })
  },
  created() {
    this.handleFundChange()
  },
}
</script>

<style scoped>
.fund-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>