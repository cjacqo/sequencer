import PropTypes from 'prop-types'

/**
 * 
 * @param {string} tempo State value of tempo for sequencer
 * @param {function} setTempo State function to update tempo when slider is adjusted
 * @returns HTML Component
 */
const TempoManager = ({ tempo, setTempo }) => {
  return (
    <div className='control--container slider-control--container'>
      <p>Tempo: {tempo}bpm</p>
      <input
        type='range'
        min='60'
        max='400'
        value={tempo}
        onChange={(e) => setTempo(e.target.value)} />
    </div>
  )
}

TempoManager.propTypes = {
  tempo: PropTypes.string.isRequired,
  setTempo: PropTypes.func.isRequired
}

export default TempoManager