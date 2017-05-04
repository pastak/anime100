import React from 'react'

const COLORS = [
  ['#ff0000', 1, 10],
  ['#ee82ee', 11, 21],
  ['#008000', 21, 50],
  ['#ffa500', 51, 100],
  ['#0000ff', 101, 200],
  ['#9d4ec8', 201, 300],
  ['#bbc94a', 301, 400]
]

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pinnedInfo: false,
    }
    this.data = this.props.data
    this.yearNum = Number(this.data.year.substr(0, 4))
    this.rankNum = Number(this.data.rank.substr(0, this.data.rank.length - 1))
    this.color = this.detectColor()
    this.togglePinned = this.togglePinned.bind(this)
  }

  detectColor () {
    const rank = this.rankNum
    let color = ''
    for (let colorInfo of COLORS) {
      if (colorInfo[1] <= rank && rank <= colorInfo[2]) {
        color = colorInfo[0]
        break
      }
    }
    return color
  }

  togglePinned () {
    if (this.state.pinnedInfo) {
      this.props.removePinnedInfo(this.data)
    } else {
      this.props.showPinnedInfo(this.data)
    }
    this.setState({pinnedInfo: !this.state.pinnedInfo})
  }

  render () {
    const {data, yearNum, rankNum} = this
    return <circle
      cy={(2017 - yearNum) * 12}
      cx={rankNum * 2.5 + 65}
      r='6'
      stroke={this.state.pinnedInfo ? '#6fffee' : 'black'}
      strokeWidth={this.state.pinnedInfo ? 3 : 1}
      onClick={this.togglePinned}
      onMouseOver={() => this.props.showInfo(data, yearNum, rankNum)}
      fill={this.color}>
    </circle>
  }
}
