import './App.css'

const HistoryItem = (props) => {
  const { data } = props
  return (
    <div className='historyitem'>
      <div>累積獎勵 {data.score}</div>
      <div>最大長度 {data.snake.length}</div>
      <div>消耗時間 {data.hh}時{data.mm}分{data.ss}秒</div>
      <div>儲存時間 {data.store_time}</div>
    </div>
  )
}


const HistoryList = (props) => {
  const { history } = props;
  return (
    <div>
      {history.map((data, index) => (
        index<4 ? <HistoryItem key={index} data={data} /> : <div></div>
      ))}
    </div>
  );
}
export default HistoryList;