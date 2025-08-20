<template>
	<div ref="chartEl" style="height: 100%;"></div>
</template>

<script>
	import * as echarts from 'echarts';
	const chartBlock = {
		name:'chartBlock',
		props:{
			option:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return{
				chart:null
			}
		},
		watch:{
			option:{
				handler(newValue){
					this.chart.setOption(newValue)
				},
				deep:true
			}
		},
		mounted(){
			this.chart = echarts.init(this.$refs.chartEl)
			this.chart.setOption(this.option)
		}
	}
	chartBlock.install = (Vue) =>{
		Vue.component(chartBlock.name,chartBlock)
	}
	export default chartBlock
</script>

<style>
</style>