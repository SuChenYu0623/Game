import './App.css'
const ArrowKeyBTN = (props) => {
  const { require_direction } = props;
  return (
    <div className='arrowkeybtn'>
      <div>
        <a onClick={() => require_direction({direction: 'up'})}>
          <img src={require('./img/arrowkey_top.png')} alt='arrowkey' />
        </a>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '160px'}}>
          <a onClick={() => require_direction({direction: 'left'})}>
            <img src={require('./img/arrowkey_left.png')} alt='arrowkey' />
          </a>
          <a onClick={() => require_direction({direction: 'right'})}>
            <img src={require('./img/arrowkey_right.png')} alt='arrowkey' />
          </a>
        </div>
        <a onClick={() => require_direction({direction: 'down'})}>
          <img src={require('./img/arrowkey_down.png')} alt='arrowkey' />
        </a>
      </div>
    </div>
  )
}

export default ArrowKeyBTN;