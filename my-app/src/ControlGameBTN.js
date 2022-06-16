import './App.css';
const ControlGameBTN = (props) => {
  const {start_game, stop_game, reset_game, record } = props
  return (
    <div className="controlgamebtn">
      <button onClick={() => start_game()}>開始</button>
      <button onClick={() => stop_game()}>停止</button>
      <button onClick={() => reset_game()}>重置</button>
      <button onClick={() => record()}>儲存</button>
    </div>
  )
}

export default ControlGameBTN;