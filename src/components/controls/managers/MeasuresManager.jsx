import PropTypes from 'prop-types'

/**
 * 
 * @param {function} setMeasures State function to update number of measures of sequence (1 - 4)
 * @returns HTML Component
 */
const MeasuresManager = ({ setMeasures }) => {
  return (
    <div className='control--container sub-division-control--container'>
      <div className='dropdown'>
        <ul>
          <li><button onClick={() => setMeasures(1)}>1</button></li>
          <li><button onClick={() => setMeasures(2)}>2</button></li>
          <li><button onClick={() => setMeasures(3)}>3</button></li>
          <li><button onClick={() => setMeasures(4)}>4</button></li>
        </ul>
      </div>
    </div>
  )
}

MeasuresManager.propTypes = {
  setMeasures: PropTypes.func.isRequired
}


export default MeasuresManager