import { useState } from 'react'

const Title = ({title}) => (<h1>{title}</h1>)
const Button = ({feedbackHandler:{onClick, title}}) => (<div><button onClick={onClick}>{title}</button></div>)
const StatisticLine = ({statisticData:{title,value}}) => (
  
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
)
const Statistics = ( {feedbackGetter: {good,neutral,bad,all,average,positive}}) => 
{
    if(all===0){
      return (<div>No feedback given</div>)
    }

    const statisticLine = (title, value) => ({
      title: title,
      value: value
    })

    return (
      <table>
        <tbody>
          <StatisticLine statisticData={statisticLine('good',good)}></StatisticLine>
          <StatisticLine statisticData={statisticLine('neutral',neutral)}></StatisticLine>
          <StatisticLine statisticData={statisticLine('bad',bad)}></StatisticLine>
          <StatisticLine statisticData={statisticLine('all',all)}></StatisticLine>
          <StatisticLine statisticData={statisticLine('average',average)}></StatisticLine>
          <StatisticLine statisticData={statisticLine('positive',positive?.toString()+' %')}></StatisticLine>
        </tbody>
      </table>
    
  )
}



const App = () => {
  // save clicks of each button to its own state
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0) 

  const handleIncrement = (setter) => () => setter(prevCount => prevCount + 1);
  const buttons = (setter, title) => ({
    onClick: handleIncrement(setter),
    title
  });

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
      <Button feedbackHandler={buttons(setGood, 'Good')}></Button>
      <Button feedbackHandler={buttons(setNeutral,'neutral')}></Button>
      <Button feedbackHandler={buttons(setBad,'bad')}></Button>
      </div>
      <Title title={'statistics'}></Title>
      <Statistics feedbackGetter={feedbackGetter()}></Statistics>
    </div>
  )
}

export default App