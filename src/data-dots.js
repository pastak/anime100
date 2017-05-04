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

const detectColor = (rank) => {
  let color = ''
  for (let colorInfo of COLORS) {
    if (colorInfo[1] <= rank && rank <= colorInfo[2]) {
      color = colorInfo[0]
      break
    }
  }
  return color
}

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
          const yearNum = Number(data.year.substr(0, 4))
          const rankNum = Number(data.rank.substr(0, data.rank.length - 1))
          return <circle
            key={data.rank + '' + data.year + data.title}
            cy={(2017 - yearNum) * 12}
            cx={rankNum * 2.5 + 65}
            r='6'
            stroke='black'
            strokeWidth='1'
            onMouseOver={() => this.props.showInfo(data, yearNum, rankNum)}
            fill={detectColor(rankNum)}></circle>
        })
      }
    </g>
  }
}
