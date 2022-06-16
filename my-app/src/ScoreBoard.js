import './App.css';
const ScoreBoard = (props) => {
  const { score, snake, hh, mm, ss } = props;
  return(
    <div className='scoreboard'>
      <div className='scoreboard_item'>
        <img src={require('./img/apple.png')} alt='scoreboard' />
        <div className='scoreboard_item_text'>{score}</div>
      </div>
      <div className='scoreboard_item'>
        <img src={require('./img/snake.png')} alt='scoreboard' />
        <div className='scoreboard_item_text'>{snake.length}</div>
      </div>
      <div className='scoreboard_item' style={{width: '70px'}}>
        <div className='scoreboard_item_text'>{hh<10 ? '0'+hh : hh}:{mm<10 ? '0'+mm : mm}:{ss<10 ? '0'+ss : ss}</div>
      </div>
    </div>
  )
}

export default ScoreBoard;