import React, { Component } from "react";
import './App.css'

import ScoreBoard from "./ScoreBoard";
import ControlGameBTN  from "./ControlGameBTN";
import ArrowKeyBTN from "./ArrowKeyBTN";
import Block from "./Block";
import HistoryList from "./HistoryList";
// 產生隨機整數0~(max-1)
const getRandomInt = (max) => {
  //console.log(Math.floor(Math.random() * Math.floor(max)));
  return Math.floor(Math.random() * Math.floor(max));
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      max_len: 10,
      rows: [],
      cols: [],
      snake: [ {col: 0, row: 0}, {col: 0, row: 1}, {col: 0, row: 2} ],
      snake_direction: 'right',
      award_axis: [],
      score: 0,
      time: new Date().toLocaleTimeString(),
      hh: 0,
      mm: 0,
      ss: 0,
      history: [],
    };
  }

  componentDidMount() {
    const { max_len } = this.state;
    let new_rows = [];
    let new_cols = [];
    for(let i=0; i<max_len; i++) {
      new_rows = [...new_rows, i];
      new_cols = [...new_cols, i];
    }
    
  
    this.setState({
      rows: new_rows,
      cols: new_cols,
    })
  }

  // 判斷區塊要顯示的顏色
  verify_block = (props) => {
    const { snake, row, col } = props;
    let result = false;
    for(let i=0; i<snake.length; i++){
      if(snake[i].row===row && snake[i].col===col){
        result = true;
        break;
      }
    }
    return result;
  }

  // 改變蛇的移動方向
  require_direction = (props) => {
    const { direction } = props;
    const { snake_direction } = this.state;

    let new_direction = snake_direction;
    if(direction==='right' || direction==='left'){
      if(snake_direction==='up' || snake_direction==='down'){
        new_direction = direction;
      }
    }else if(direction==='up' || direction==='down'){
      if(snake_direction==='right' || snake_direction==='left'){
        new_direction = direction;
      }
    }
    this.setState({
      snake_direction: new_direction,
    })
    
  }

  //計時
  count_time = () => {
    const { hh, mm, ss } = this.state;
    let new_hh = hh;
    let new_mm = mm;
    let new_ss = ss;
    if(ss===59){
      new_ss = 0;
      new_mm += 1;
      if(mm===59){
        new_mm = 0;
        new_hh += 1;
        if(hh===23){
          new_ss = 0;
          new_mm = 0;
          new_hh = 0;
        }
      }
    }else{
      new_ss += 1
    }
    this.setState({
      ss: new_ss,
      mm: new_mm,
      hh: new_hh,
    });
  }

  // 蛇爬行+吃到獎勵
  run = () => {
    const { snake, snake_direction, award_axis, score, hh, mm, ss } = this.state;
    //計時
    this.count_time({hh: hh, mm: mm, ss: ss})

    let new_snake = snake;
    let new_score = score;
    new_snake.shift();
    if(snake_direction==='right'){
      new_snake.push({col: new_snake[new_snake.length-1].col, row: new_snake[new_snake.length-1].row+1})
    }else if(snake_direction==='left'){
      new_snake.push({col: new_snake[new_snake.length-1].col, row: new_snake[new_snake.length-1].row-1})
    }else if(snake_direction==='down'){
      new_snake.push({col: new_snake[new_snake.length-1].col+1, row: new_snake[new_snake.length-1].row})
    }else if(snake_direction==='up'){
      new_snake.push({col: new_snake[new_snake.length-1].col-1, row: new_snake[new_snake.length-1].row})
    };

    let snake_head = new_snake[new_snake.length-1];
    // 撞牆死亡
    this.Die({row: snake_head.row, col: snake_head.col})
    //碰到random獎勵
    if(snake_head.row===award_axis.row && snake_head.col===award_axis.col) {
      new_snake = [new_snake[0], ...new_snake]; //增加在array的第一個值
      new_score += 1;
      this.Random_Award();
    }
    this.setState({
      snake: new_snake,
      score: new_score,

    })
  }

  // 碰到牆壁導致死亡
  Die = (props) => {
    const { row, col } = props;
    const { max_len } = this.state;
    console.log(row, col, max_len)
    if(row===-1 || row===max_len || col===-1 || col===max_len){
      this.stop_game();
      alert('You die T-T')
    }
  }
  // 產生一個隨機獎勵
  Random_Award = () => {
    const { snake } = this.state;
    let award_row = 0
    let award_col = 0
    for(let i=0; i<snake.length; i++) {
      award_row = getRandomInt(10);
      award_col = getRandomInt(10);
      if(award_row===snake[i].row && award_col===snake[i].col){
        i -= 1;
        continue;
      }
    }
    this.setState({
      award_axis: {col: award_col, row: award_row},
    });
  }

  // 開始遊戲
  start_game = () => {
    this.Random_Award();
    this.timerId = window.setInterval(( () => this.run() ), 1000);
  }
  // 停止遊戲
  stop_game = () => {
    window.clearInterval(this.timerId);
  }
  // 重置遊戲
  reset_game = () => {
    this.setState({
      snake: [ {col: 0, row: 0}, {col: 0, row: 1}, {col: 0, row: 2} ],
      snake_direction: 'right',
      award_axis: [],
      score: 0,
      hh: 0,
      mm: 0,
      ss: 0,
    })
  }
  // 儲存紀錄
  record = () => {
    const { snake, score, hh, mm, ss, history } = this.state
    let store_time = new Date().toLocaleTimeString();
    let new_history = [{snake: snake,
                        score: score,
                        hh: hh, 
                        mm: mm, 
                        ss: ss,
                        store_time: store_time}, ...history]
    this.setState({
      history: new_history,
    })
    
  }

  
  handleSubmit = (e) => {
    e.preventDefault(); //避免輸入框內容顯示在網址上
    const { max_len } = this.state;
    let new_rows = [];
    let new_cols = [];
    for(let i=0; i<max_len; i++) {
      new_rows = [...new_rows, i];
      new_cols = [...new_cols, i];
    }
    this.setState({
      max_len: max_len,
      rows: new_rows,
      cols: new_cols,
      snake: [ {col: 0, row: 0}, {col: 0, row: 1}, {col: 0, row: 2} ],
      snake_direction: 'right',
      award_axis: [],
      score: 0,
      hh: 0,
      mm: 0,
      ss: 0,
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }


  render() {
    const { rows, cols, snake, award_axis, score, hh, mm, ss, max_len, history } = this.state;
    //window.setInterval(( () => this.setState({time: new Date().toLocaleTimeString()}) ), 1000);
    //console.log(snake)
    return (
      <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center', backgroundColor: '#01814A', padding: '10px', height: window.innerHeight}}>
        <div>
          <div className="Title" style={{marginBottom: '10px'}}>設定地圖</div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="max_len" value={max_len} onChange={this.handleChange} />
            <br />
            <br />
            <input type="submit" value={"更改"} />
          </form>
        </div>
        <div style={{marginLeft: '40px', marginRight: '40px'}}>
          <div className="Title" style={{marginBottom: '10px'}}>貪吃蛇遊戲</div>
          <ScoreBoard score={score} snake={snake} hh={hh} mm={mm} ss={ss} />
          <Block cols={cols} rows={rows} verify_block={this.verify_block} snake={snake} award_axis={award_axis} />    
          <ControlGameBTN start_game={this.start_game} stop_game={this.stop_game} reset_game={this.reset_game} record={this.record} />
          <ArrowKeyBTN require_direction={this.require_direction} />
        </div>
        <div>
          <div className="Title" style={{marginBottom: '10px'}}>歷史紀錄</div>
          <HistoryList history={history} />
        </div>
      </div>
    );
  }
}

export default App;
