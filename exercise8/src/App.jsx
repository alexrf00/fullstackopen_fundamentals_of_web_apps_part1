import { useCallback, useState } from 'react'

const Title = ({title}) => (<h1>{title}</h1>)
const Buttons = ({feedbackHandler:{onClick, title}}) => (<div><button onClick={onClick}>{title}</button></div>)
const Statistics = ( {feedbackGetter: {good,neutral,bad,all,average,positive}}) => (<div>good {good},<br/> neutral {neutral}<br/> bad {bad}<br/>all {all}<br/> average {average}<br/> positive {positive} %</div>)

const App = () => {
  // save clicks of each button to its own state
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0) 
  const handleGoodClick = useCallback(() => setGood(good + 1), [good]);
  const handleNeutralClick = useCallback(() => setNeutral(neutral + 1), [neutral]);
  const handleBadClick = useCallback(() => setBad(bad + 1), [bad]);
  
  const buttons = (title)=> {
    switch (title) {
      case 'good':
        return { onClick: handleGoodClick, title: 'good' };
      case 'neutral':
        return { onClick: handleNeutralClick, title: 'neutral' };
      case 'bad':
        return { onClick: handleBadClick, title: 'bad' };
      default:
        return {};
    }

  }
  const all = (good+neutral+bad)
  const positiveFeedbackAverage = (all !== 0 ? (good / all) * 100 : 0)
  const feedbackGetter = () => ({good:good,neutral:neutral,bad:bad,all:all,average:(all !== 0 ? (good * 1 + neutral * 0 + bad * -1) / all : 0),positive:positiveFeedbackAverage})
  
  const flexRowStyle = {
    display: 'flex',
    flexDirection: 'row'
  };
  
  return (
    <div>
      <Title title={'give feedback'}></Title>
      <div style={flexRowStyle}>
      <Buttons feedbackHandler={buttons('good')}></Buttons>
      <Buttons feedbackHandler={buttons('neutral')}></Buttons>
      <Buttons feedbackHandler={buttons('bad')}></Buttons>
      </div>
      <Title title={'statistics'}></Title>
      <Statistics feedbackGetter={feedbackGetter()}></Statistics>
    </div>
  )
}

export default App