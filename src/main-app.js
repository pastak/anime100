import React from 'react'
import ReactDOM from 'react-dom'
import DataDots from './data-dots'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInfo: false,
      selected: null,
      rankingType: 'all'
    }
    this.showInfo = this.showInfo.bind(this)
    this.lines = []
    let height = 12
    for (let year = 2016; year >= 1960; year -= 3, height += 36) {
      this.lines.push(<text key={`${year}text`} x='0' y={height + 6}>{year}年</text>)
      this.lines.push(<path key={`${year}line`} stroke='#9f9f9f' strokeWidth='1' fill='none' d={`M60,${height} L1500,${height}`}/>)
    }
    this.lines.push(<text key='1text' x='55' y={height + 15}>1位</text>)
    this.lines.push(<path key='1line' stroke='#9f9f9f' strokeWidth='1' fill='none' d={`M67.5,0 L67.5,${height}`}/>)
    for (let rank = 10, width = 90; rank <= 409; rank += 10, width += 25) {
      this.lines.push(<text key={`${rank}text`} x={width - 9} y={height + 15} fontSize='0.8em'>{rank}</text>)
      this.lines.push(<path key={`${rank}line`} stroke='#9f9f9f' strokeWidth='1' fill='none' d={`M${width},0 L${width},${height}`}/>)
    }
  }

  showInfo (data, yearNum, rankNum) {
    this.setState({
      showInfo: true,
      selected: data
    })
  }

  setRankingType (type) {
    this.setState({rankingType: type})
  }

  render () {
    return <div>
    <button onClick={() => this.setRankingType('all')} className={`btn ${this.state.rankingType === 'all' ? 'btn-success' : 'btn-default'}`}>全順位(1位〜400位)</button>
    <button onClick={() => this.setRankingType('top')} className={`btn ${this.state.rankingType === 'top' ? 'btn-success' : 'btn-default'}`}>トップ100(1位〜100位)</button>
    <button onClick={() => this.setRankingType('male')} className={`btn ${this.state.rankingType === 'male' ? 'btn-success' : 'btn-default'}`}>男性トップ100</button>
    <button onClick={() => this.setRankingType('female')} className={`btn ${this.state.rankingType === 'female' ? 'btn-success' : 'btn-default'}`}>女性トップ100</button>
    <br /><br />
    <svg id='svg' width='1200' height='850'>
      {this.lines}
      <DataDots showInfo={this.showInfo} type={this.state.rankingType} />
    </svg>
    {
      this.state.showInfo &&
      <div className='infoBox'>
        順位 {this.state.selected.rank} <br />
        <a href={`https://www.google.co.jp/search?q=${encodeURIComponent(this.state.selected.title)}&btnI=1`} target='_blank'>
          {this.state.selected.title}
        </a>
        <br />
        制作年 {this.state.selected.year}
        <br />
        <a href={`https://www.amazon.co.jp/s/field-keywords=${encodeURIComponent(this.state.selected.title)}&tag=anime100-22`} target='_blank'>
          <i className="fa fa-amazon" aria-hidden="true"></i> Search on Amazon
        </a>
      </div>
    }
    </div>
  }
}
