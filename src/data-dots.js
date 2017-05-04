import React from 'react'
import Dot from './dot'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: this.props.type,
      key: 0
    }
    this.dataList = {
      top: [],
      under: [],
      male: [],
      female: []
    }
  }

  componentDidMount () {
    window.fetch('./data/top100.json')
      .then((res) => res.json())
      .then((data) => {
        this.dataList.top = data
        this.setState({key: Date.now()})
      })
    window.fetch('./data/over100.json')
      .then(res => res.json())
      .then((data) => {
        this.dataList.under = data
        this.setState({key: Date.now()})
      })
    window.fetch('./data/male.json')
      .then(res => res.json())
      .then((data) => {
        this.dataList.male = data
        this.setState({key: Date.now()})
      })
    window.fetch('./data/female.json')
      .then(res => res.json())
      .then((data) => {
        this.dataList.female = data
        this.setState({key: Date.now()})
      })
  }

  componentWillReceiveProps (newProps) {
    this.setState({type: newProps.type})
  }

  render () {
    let data = []
    switch (this.state.type) {
      case 'all':
        data = this.dataList.top.concat(this.dataList.under)
        break
      case 'top':
      case 'male':
      case 'female':
        data = this.dataList[this.state.type]
        break
    }
    return <g>
      {
        data
        .filter((data) => {
          if (!this.props.filterRank) return true
          const rankNum = Number(data.rank.substr(0, data.rank.length - 1))
          return this.props.filterRank[0] <= rankNum && rankNum <= this.props.filterRank[1]
        })
        .filter((data) => {
          if (!this.props.filterYear) return true
          const yearNum = Number(data.year.substr(0, 4))
          return this.props.filterYear[1] <= yearNum && yearNum <= this.props.filterYear[0]
        })
        .map((data) => {
          return <Dot
            key={data.rank + '' + data.year + data.title}
            data={data}
            removePinnedInfo={this.props.removePinnedInfo}
            showPinnedInfo={this.props.showPinnedInfo}
            showInfo={this.props.showInfo}
          />
        })
      }
    </g>
  }
}
