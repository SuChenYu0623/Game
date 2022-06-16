const Head = () => {
  return (
    <div className="block_div">
      <img className="block_img" src={require("./img/head.png")} alt='block' />
    </div>
  )
}

const Body = () => {
  return (
    <div className="block_div">
      <img className="block_img" src={require("./img/body.png")} alt='block' />
    </div>
  )
}
const Apple = () => {
  return (
    <div className="block_div">
      <img className="block_img" src={require("./img/apple.png")} alt='block' />
    </div>
  )
}
const Background = () => {
  return (
    <div className="block_div">
      <img className="block_img" src={require("./img/background.png")} alt='block' />
    </div>
  );
}

const VerifyBlock = (props) => {
  const { verify_block, snake, row, col, award_axis } = props;
  return (
    verify_block({snake: snake, row: row, col: col})
      ? snake[snake.length-1].row===row && snake[snake.length-1].col===col ? <Head /> : <Body />
      : award_axis.row===row && award_axis.col===col ? <Apple />
                                                     : <Background/>
  )
}

const Block = (props) => {
  const { cols, rows, verify_block, snake, award_axis } = props;
  return (
    <div>
      {cols.map((col, index) => (
        <div key={index} style={{display: 'flex'}}>
          {rows.map((row, index) => (     
            <VerifyBlock key={index} verify_block={verify_block} snake={snake} row={row} col={col} award_axis={award_axis} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Block;