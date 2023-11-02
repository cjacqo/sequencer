import PropTypes from 'prop-types'

/**
 * 
 * @param {object} scaleProperties State values to determine scale root, type and octave
 * @param {object} scaleHandlers State handler functions to update those values and change the scale 
 */
const ScaleManager = ({ scaleProperties, scaleHandlers }) => {
  const scaleOptions = [
    {
      label: "A",
      value: "A"
    },
    {
      label: "A#/Bb",
      value: "Bb"
    },
    {
      label: "B",
      value: "B"
    },
    {
      label: "C",
      value: "C"
    },
    {
      label: "C#/Db",
      value: "Db"
    },
    {
      label: "D",
      value: "D"
    },
    {
      label: "D#/Eb",
      value: "Eb"
    },
    {
      label: "E",
      value: "E"
    },
    {
      label: "F",
      value: "F"
    },
    {
      label: "F#/Gb",
      value: "Gb"
    },
    {
      label: "G",
      value: "G"
    },
    {
      label: "G#/Ab",
      value: "Ab"
    }
  ]

  const { scaleRoot, scaleType, scaleOctave } = scaleProperties
  const { updateScaleRoot, updateScaleType, updateScaleOctave } = scaleHandlers

  const handleChange = (e, func) => {
    const { value } = e.target
    func(value)
  }
  
  return (
    <>
      <select
          name="scaleRoot"
          id="root"
          value={scaleRoot}
          onChange={(e) => handleChange(e, updateScaleRoot)}>
          {scaleOptions.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          name="scaleType"
          id="scaleType"
          value={scaleType}
          onChange={(e) => handleChange(e, updateScaleType)}>
          <option value="major">Major</option>
          <option value="minor">Minor</option>
        </select>
        <select
          name="scaleOctave"
          id="octave"
          value={scaleOctave}
          onChange={(e) => handleChange(e, updateScaleOctave)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
    </>
  )
}

ScaleManager.propTypes = {
  scaleProperties: PropTypes.object.isRequired,
  scaleHandlers: PropTypes.object.isRequired
}

export default ScaleManager