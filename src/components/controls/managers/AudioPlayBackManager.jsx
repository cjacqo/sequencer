import PropTypes from 'prop-types'

/**
 * 
 * @param {string} icon Text for the button
 * @param {string} color Text for the color of the button
 * @param {function} handler Function for the onClick event
 * @returns 
 */
const ButtonControl = ({ icon, color, handler }) => {
  const handleHandler = () => {
    handler()
  }

  return (
    <button onClick={() => handleHandler()} style={{ backgroundColor: color }}>{icon}</button>
  )
}

/**
 * 
 * @param {function} playAudio Handler that tells Tone.js to play sequence 
 * @param {function} pauseAudio Handler that tells Tone.js to pause sequence 
 * @returns 
 */
const AudioPlayBackManager = ({
  playAudio = () => null,
  pauseAudio = () => null
}) => (
  <>
    <ButtonControl icon={'Play'} color={'green'} handler={playAudio} />
    <ButtonControl icon={'Pause'} color={'Red'} handler={pauseAudio} />
  </>
)

ButtonControl.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
}

AudioPlayBackManager.propTypes = {
  playAudio: PropTypes.func.isRequired,
  pauseAudio: PropTypes.func.isRequired
}

export default AudioPlayBackManager