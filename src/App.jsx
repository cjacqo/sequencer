import './App.css'
import Controls from './components/controls/Controls'
import Sequencer from './components/sequencer/Sequencer'
import { useAppContext } from './context/AppContext'

function App() {

  // App Context:
  // -- provides context (state values) for different features of the sequencer
  const {
    isPlaying, playAudio, pauseAudio,
    tempo, setTempo,
    subDivision, setSubDivision,
    measures, setMeasures,
    scaleProperties, scaleHandlers, scale,
    pattern, updatePattern
  } = useAppContext()


  // console.log(tempo, subDivision, measures, scale)

  return (
    <>
      <Controls
        audioPlayBackFunctions={[playAudio, pauseAudio]}
        tempoState={[tempo, setTempo]}
        setSubDivision={setSubDivision}
        setMeasures={setMeasures}
        scaleProperties={scaleProperties}
        scaleHandlers={scaleHandlers} />
      <Sequencer
        isPlaying={isPlaying}
        scale={scale}
        measures={measures}
        subDivision={subDivision}
        pattern={pattern}
        setUserPattern={updatePattern} />
    </>
  )
}

export default App
