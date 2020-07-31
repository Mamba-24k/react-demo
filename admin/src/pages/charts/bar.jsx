import React, { Component } from 'react'
import { Card, Button } from 'antd'

import { ReloadOutlined } from '@ant-design/icons';

import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sales: [12, 23, 14, 23, 36, 18],
      stores: [15, 33, 18, 23, 26, 12]
    }
  }
  update = () => {
    this.setState((state) => ({
      sales: state.sales.map( sale => sale-1),
      stores: state.stores.reduce( (pre, store) => {
        pre.push(store+1)
        return pre
      },[])
    }))
  }
  getOption = (sales, stores) => {
    // 指定图表的配置项和数据
    let option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: sales
      }, {
        name: '库存',
        type: 'bar',
        data: stores
      }]
    };
    return option
  }
  render() {
    const { sales, stores } = this.state
    const extra = <Button type="primary" icon={<ReloadOutlined />} onClick={this.update}>更新</Button>
    return (
      <div>
        <Card title="柱状图" extra={extra}>
          <ReactEcharts option={this.getOption(sales, stores)} />
        </Card>
      </div>
    )
  }
}