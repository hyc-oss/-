<template>
  <div class="conent">
	  <p>数据分析</p>
	  <div class="wz">{{updataTime?'数据分析中'+updataTime:'暂无数据分析'}}</div>
	  <div class="box">
		  <div class="box1">
			  <chart-block :option="option"></chart-block>
		  </div>
		  <div class="box1">
		  			  <chart-block :option="option2"></chart-block>
		  </div>
	  </div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item>
        <span>社区</span>
        <template slot="icon">
          <img src="@/assets/tabbar/community.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/analysis">
        <span>数据分析</span>
        <template slot="icon">
          <img src="@/assets/tabbar/analysis_act.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home">
        <template slot="icon">
          <img src="@/assets/tabbar/home.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/service">
        <span>服务</span>
        <template slot="icon">
          <img src="@/assets/tabbar/service.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/mine">
        <span>我的</span>
        <template slot="icon">
          <img src="@/assets/tabbar/mine.png" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { chargingOrdersList,mileageList } from '@/api/analysis'
export default {
  data() {
    return {
      active: '/analysis',
	  updataTime:'',
	  sanyueTotal:'',
	  wuyueTotal:'',
	  option:{
		  tooltip: {
		      trigger: 'axis',
		      axisPointer: {
		        type: 'shadow'
		      }
		    },
		    legend: {
		      data: ['充电次数', '充电量', '花费'],
		      bottom:0
		    },
		      title: {
		      text: '月度充电趋势'
		    },
		    toolbox: {
		      show: true,
		      orient: 'vertical',
		      left: 'right',
		      top: 'center',
		      feature: {
		        mark: { show: true },
		        dataView: { show: true, readOnly: false },
		        magicType: { show: true, type: ['line', 'bar', 'stack'] },
		        restore: { show: true },
		        saveAsImage: { show: true }
		      }
		    },
		    xAxis: [
		      {
		        name:'月份',
		        type: 'category',
		        axisTick: { show: false },
		        data: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06']
		      }
		    ],
		    yAxis: [
		      {
		        type: 'value'
		      }
		    ],
		    grid: {
		      left: '5%',
		      right: '5%',
		      bottom: '5%',
		      containLabel: true
		    },
		    series: [
		      {
		        name: '充电次数',
		        type: 'bar',
		        barGap: 0.3,
		        barWidth:8,
		        label: {
		            show: true,
		            position: 'top',
		            formatter: '{c}',
		            fontSize: 16,
		        },
		        emphasis: {
		          focus: 'series'
		        },
		        data: [320, 332, 301, 334, 390]
		      },
		      {
		        name: '充电量',
		        type: 'bar',
		         barGap: 0.3,
		        barWidth:8,
		        label: {
		            show: true,
		            position: 'top',
		            formatter: '{c}',
		            fontSize: 16,
		        },
		        emphasis: {
		          focus: 'series'
		        },
		        data: [220, 182, 191, 234, 290]
		      },
		      {
		        name: '花费',
		        type: 'bar',
		         barGap: 0.3,
		        barWidth:8,
		        label: {
		            show: true,
		            position: 'top',
		            formatter: '{c}',
		            fontSize: 16,
		        },
		        emphasis: {
		          focus: 'series'
		        },
		        data: [150, 232, 201, 154, 190]
		      },
		    ]
	  },
	  option2:{
		  title: {
		      text: '月度百公里油耗趋势'
		    },
		    tooltip: {
		      trigger: 'axis'
		    },
		    legend: {
		      data: ['油耗', '行驶里程', '平均油耗'],
		      bottom:0
		    },
		    grid: {
		      left: '5%',
		      right: '5%',
		      bottom: '5%',
		      containLabel: true
		    },
		    toolbox: {
		      feature: {
		        saveAsImage: {}
		      }
		    },
		    xAxis: {
		      name:'月份',
		      type: 'category',
		      boundaryGap: false,
		      data: ['2023-03', '2023-06']
		    },
		    yAxis: {
		      type: 'value'
		    },
		    series: [
		      {
		        name: '油耗',
		        type: 'line',
		        barGap: 0.3,
		        barWidth:8,
		        label: {
		            show: true,
		            position: 'top',
		            formatter: '{c}',
		            fontSize: 16,
		        },
		        data: [120, 132, 101, 134, 90, 230, 210]
		      },
		      {
		        name: '行驶里程',
		        type: 'line',
		        barGap: 0.3,
		        barWidth:8,
		        label: {
		            show: true,
		            position: 'top',
		            formatter: '{c}',
		            fontSize: 16,
		        },
		        data: [220, 182, 191, 234, 290, 330, 310]
		      },
		      {
		        name: '平均油耗',
		        type: 'line',
		        barGap: 0.3,
		        barWidth:8,
		        label: {
		            show: true,
		            position: 'top',
		            formatter: '{c}',
		            fontSize: 16,
		        },
		        data: [150, 232, 201, 154, 190, 330, 410]
		      },
		    ]
	  },
    }
  },
  created() {
  	this.getmileageList()
  },
  methods:{
	  getOders(){
		  let carId = JSON.parse(window.localStorage.getItem('carInfo')).carId
		  chargingOrdersList({carId:carId,chargingOrdersType:3}).then(res=>{
			  if(res.code == 200 && res.data.length > 0){
				  let handleShujfx = Array.from({length:6},()=>({
					  times:0,
					  chargedQuantity:0,
					  actualPaymentAmount:0,
				  }))
				  let times = [];
				  let chargedQuantity = [];
				  let actualPaymentAmount = [];
				  let sanwuYue = [];
				  res.data.forEach(item=>{
					  let monthIndex = parseInt(item.createTime.slice(5,7)) - 1;
					  if (monthIndex >= 0 && monthIndex < 6) {
					  	handleShujfx[monthIndex].times += 1;
					  	handleShujfx[monthIndex].chargedQuantity += item.chargedQuantity;
					  	handleShujfx[monthIndex].actualPaymentAmount += item.actualPaymentAmount;
					  }
				  })
				  sanwuYue[0] = handleShujfx[2].chargedQuantity.toFixed(2)
				  sanwuYue[1] = handleShujfx[4].chargedQuantity.toFixed(2)
				  handleShujfx.forEach(item=>{
					  times.push(item.times)
					  chargedQuantity.push(item.chargedQuantity.toFixed(2))
					  actualPaymentAmount.push(item.actualPaymentAmount.toFixed(2))
				  })
				  this.option.series[0].data = times;
				  this.option.series[1].data = chargedQuantity;
				  this.option.series[2].data = actualPaymentAmount;
				  
				  this.option2.series[0].data = sanwuYue;
				  this.option2.series[2].data[0] = this.sanyueTotal==0?0:(sanwuYue[0]/this.sanyueTotal).toFixed(2);
				  this.option2.series[2].data[1] = this.wuyueTotal==0?0:(sanwuYue[1]/this.wuyueTotal*100).toFixed(2)
			  }else{
				  this.option.series[0].data = [0,0,0,0,0,0];
				  this.option.series[1].data = [0,0,0,0,0,0];
				  this.option.series[2].data = [0,0,0,0,0,0];
			  }
		  })
	  },
	  getmileageList(){
		  let carId = JSON.parse(window.localStorage.getItem('carInfo')).carId
		  mileageList({carId:carId}).then(res=>{
			  if (res.data.length > 0) {
			  	let erYue = [];
			  	let sanYue = [];
			  	let siYue = [];
			  	let wuYue = [];
				res.data.forEach(item=>{
					this.updataTime = res.data[0].createTime;
					if (item.createTime != null) {
						if (item.createTime.indexOf('2023-02') >= 0) {
							erYue.push(item)
						} else if(item.createTime.indexOf('2023-03') >= 0){
							sanYue.push(item)
						} else if(item.createTime.indexOf('2023-04') >= 0){
							siYue.push(item)
						} else if(item.createTime.indexOf('2023-05') >= 0){
							wuYue.push(item)
						}
					}
				})
				if (sanYue.length > 0 && erYue.length > 0) {
					this.sanyueTotal = sanYue[0].carMileage - erYue[0].carMileage
				}
				if (wuYue.length > 0 && siYue.length > 0) {
					this.wuyueTotal = wuYue[0].carMileage - siYue[0].carMileage
				}
				this.option2.series[1].data[0] = this.sanyueTotal.toFixed(2)
				this.option2.series[1].data[1] = this.wuyueTotal.toFixed(2)
			  }
			  this.getOders()
		  })
	  }
  }
};
</script>

<style scoped lang="scss">
	.conent{
		width: 100%;
		height: 100vh;
		background-color: #f5f5f5;
		.box1{
			width: 90%;
			height: 40vh;
			margin: 20px auto;
			border: 1px solid #ffffff;
			border-radius: 10px;
			padding: 10px;
			background-color: #f5f5f5;
			box-shadow: 4rpx 2rpx 5rpx #f5f5f5;
		}
	}
</style>