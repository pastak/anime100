import React from 'react'
import ReactDOM from 'react-dom'
import DataDots from './data-dots'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInfo: false,
      selected: null,
      rankingType: 'all',
      pinnedInfo: {},
      enableRankFilter: false,
      minRank: 400,
      maxRank: 1,
      enableYearFilter: false,
      minYear: 1960,
      maxYear: 2016,
      allCount: 0,
      filteredCount: 0
    }

    this.showInfo = this.showInfo.bind(this)
    this.showPinnedInfo = this.showPinnedInfo.bind(this)
    this.removePinnedInfo = this.removePinnedInfo.bind(this)
    this.toggleRankFilter = this.toggleRankFilter.bind(this)
    this.toggleYearFilter = this.toggleYearFilter.bind(this)
    this.changeMaxRank = this.changeMaxRank.bind(this)
    this.changeMinRank = this.changeMinRank.bind(this)
    this.changeMaxYear = this.changeMaxYear.bind(this)
    this.changeMinYear = this.changeMinYear.bind(this)
    this.allCount = this.allCount.bind(this)
    this.filteredCount = this.filteredCount.bind(this)

    this.lines = []
    let height = 52
    for (let year = 2016; year >= 1960; year -= 3, height += 36) {
      this.lines.push(<text key={`${year}text`} x='0' y={height + 6}>{year}年</text>)
      this.lines.push(<path key={`${year - 0}line`} stroke='#9f9f9f' strokeWidth='1' fill='none' d={`M35,${height} L1200,${height}`}/>)
      this.lines.push(<path key={`${year - 1}line`} stroke='#d9d9d9' strokeWidth='1' fill='none' d={`M35,${height + 12} L1200,${height + 12}`}/>)
      this.lines.push(<path key={`${year - 2}line`} stroke='#d9d9d9' strokeWidth='1' fill='none' d={`M35,${height + 24} L1200,${height + 24}`}/>)
    }
    this.lines.push(<text key='1text' x='55' y={height + 15}>1位</text>)
    this.lines.push(<path key='1line' stroke='#9f9f9f' strokeWidth='1' fill='none' d={`M67.5,35 L67.5,${height}`}/>)
    for (let rank = 10, width = 90; rank <= 409; rank += 10, width += 25) {
      this.lines.push(<text key={`${rank}text`} x={width - 9} y={height + 15} fontSize='0.8em'>{rank}</text>)
      this.lines.push(<path key={`${rank}line`} stroke='#9f9f9f' strokeWidth='1' fill='none' d={`M${width},35 L${width},${height}`}/>)
      this.lines.push(<path key={`${rank - 5}line`} stroke='#d9d9d9' strokeWidth='1' fill='none' d={`M${width - 12.5},35 L${width - 12.5},${height}`}/>)
    }
  }

  showInfo (data) {
    this.setState({
      showInfo: true,
      selected: data
    })
  }

  showPinnedInfo (data) {
    if (this.state.pinnedInfo[data.rank]) return
    const tmp = Object.assign({}, this.state.pinnedInfo)
    tmp[data.rank] = data
    this.setState({pinnedInfo: tmp})
  }

  removePinnedInfo (data) {
    if (this.state.pinnedInfo[data.rank]) {
      const tmp = Object.assign({}, this.state.pinnedInfo)
      delete tmp[data.rank]
      this.setState({pinnedInfo: tmp})
    }
  }

  setRankingType (type) {
    this.setState({rankingType: type, pinnedInfo: {}})
  }

  toggleRankFilter () {
    this.setState({enableRankFilter: !this.state.enableRankFilter})
  }

  toggleYearFilter () {
    this.setState({enableYearFilter: !this.state.enableYearFilter})
  }

  changeMaxRank (e) {
    this.setState({maxRank: Number(e.target.value)})
  }

  changeMinRank (e) {
    this.setState({minRank: Number(e.target.value)})
  }

  changeMaxYear (e) {
    this.setState({maxYear: Number(e.target.value)})
  }

  changeMinYear (e) {
    this.setState({minYear: Number(e.target.value)})
  }

  allCount (count) {
    this.setState({allCount: count})
  }

  filteredCount (count) {
    this.setState({filteredCount: count})
  }

  render () {
    return <div>
      <button onClick={() => this.setRankingType('all')} className={`btn ${this.state.rankingType === 'all' ? 'btn-success' : 'btn-default'}`}>全順位(1位〜400位)</button>
      <button onClick={() => this.setRankingType('top')} className={`btn ${this.state.rankingType === 'top' ? 'btn-success' : 'btn-default'}`}>トップ100(1位〜100位)</button>
      <button onClick={() => this.setRankingType('male')} className={`btn ${this.state.rankingType === 'male' ? 'btn-success' : 'btn-default'}`}>男性トップ100</button>
      <button onClick={() => this.setRankingType('female')} className={`btn ${this.state.rankingType === 'female' ? 'btn-success' : 'btn-default'}`}>女性トップ100</button>
      <br />
      <label>
        <input type='checkbox' onChange={this.toggleRankFilter} />
        順位でフィルター
      </label>
      <input type='number' min='1' max='400' defaultValue='1' onChange={this.changeMaxRank}/>位〜
      <input type='number' min='1' max='400' defaultValue='400' onChange={this.changeMinRank}/>位
      <br />
      <label>
        <input type='checkbox' onChange={this.toggleYearFilter} />
        制作年でフィルター
      </label>
      <input type='number' min='1960' max='2016' defaultValue='2016' onChange={this.changeMaxYear}/>年〜
      <input type='number' min='1960' max='2016' defaultValue='1960' onChange={this.changeMinYear}/>年
      <br /><br />
      <svg id='svg' width='1080' height='850'>
        {this.lines}
        <DataDots
          showPinnedInfo={this.showPinnedInfo}
          removePinnedInfo={this.removePinnedInfo}
          showInfo={this.showInfo}
          allCount={this.allCount}
          filteredCount={this.filteredCount}
          filterRank={this.state.enableRankFilter && [this.state.maxRank, this.state.minRank]}
          filterYear={this.state.enableYearFilter && [this.state.maxYear, this.state.minYear]}
          type={this.state.rankingType} />
      </svg>
      <div className='infoBoxArea'>
        {
          Object.keys(this.state.pinnedInfo).map((key) => {
            const data = this.state.pinnedInfo[key]
            return <div key={'infobox-' + data.rank} className='infoBox pinned'>
              順位 {data.rank} <br />
              <a href={`https://www.google.co.jp/search?q=${encodeURIComponent(data.title)}&btnI=1`} target='_blank'>
                {data.title}
              </a>
              <br />
              制作年 {data.year}
              <br />
              <a href={`https://www.amazon.co.jp/s/field-keywords=${encodeURIComponent(data.title)}&tag=anime100-22`} target='_blank'>
                <i className="fa fa-amazon" aria-hidden="true"></i> Search on Amazon
              </a>
            </div>
          })
        }
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
    </div>
  }
}
