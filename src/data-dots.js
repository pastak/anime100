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
        data.map((data) => {
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
