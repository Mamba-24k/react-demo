import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons';

import ReactEcharts from 'echarts-for-react'
export default class Pie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sales: [12, 23, 14, 23, 36, 18],
      stores: [15, 33, 18, 23, 26, 12]
    }
  }
  update = () => {
    this.setState({
      sales: [22, 13, 24, 33, 16, 28],
      stores: [25, 23, 38, 13, 36, 22]
    })
  }
  getOption = (sales, stores) => {
    // 指定图表的配置项和数据
    let option = {
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    return option
  }
  render() {
    // const { sales, stores } = this.state
    const extra = <Button type="primary" icon={<ReloadOutlined />} onClick={this.update}>更新</Button>
    return (
      <div>
        <Card title="饼状图" extra={extra}>
          <ReactEcharts option={this.getOption()} />
        </Card>

      </div>
    )
  }
}