import PropTypes from 'prop-types'
import { AudioPlayBackManager, MeasuresManager, ScaleManager, SubDivisionManager, TempoManager } from './managers'

/**
 * 
 * @param {array} audioPlayBackFunctions Array of functions to start/stop the audio for AudioPlayBackManager
 * @param {array} tempoState State value and state function update of tempo for sequencer
 * @param {function} setSubDivision  State function to update subdivision value when button is clicked
 * @param {function} setMeasures State function to update number of measures of sequence (1 - 4)
 * @param {object} scaleProperties State properties for the selected scale
 * @param {object} scaleHandlers State functions to update the scale properties
 * @returns HTML Component
 */
const Controls = ({
  audioPlayBackFunctions,
  tempoState,
  setSubDivision,
  setMeasures,
  scaleProperties,
  scaleHandlers }) => {

  return (
    <div className='controls--container'>
      <AudioPlayBackManager playAudio={audioPlayBackFunctions[0]} pauseAudio={audioPlayBackFunctions[1]} />
      <TempoManager tempo={tempoState[0]} setTempo={tempoState[1]} />
      <ScaleManager scaleProperties={scaleProperties} scaleHandlers={scaleHandlers} />
      <SubDivisionManager setSubDivision={setSubDivision} />
      <MeasuresManager setMeasures={setMeasures} />
    </div>
  )
}

Controls.propTypes = {
  audioPlayBackFunctions: PropTypes.array.isRequired,
  tempoState: PropTypes.array.isRequired,
  setSubDivision: PropTypes.func.isRequired,
  setMeasures: PropTypes.func.isRequired,
  scaleProperties: PropTypes.object.isRequired,
  scaleHandlers: PropTypes.object.isRequired
}

export default Controls