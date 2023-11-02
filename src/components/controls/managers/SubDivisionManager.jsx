import PropTypes from 'prop-types'

/**
 * 
 * @param {function} setSubDivision State function to update subdivision value when button is clicked
 * @returns HTML Component
 */
const SubDivisionManager = ({ setSubDivision }) => {
  return (
    <div className='control--container sub-division-control--container'>
      <div className='dropdown'>
        <ul>
          <li><button onClick={() => setSubDivision('1n')}>1/1</button></li>
          <li><button onClick={() => setSubDivision('2n')}>1/2</button></li>
          <li><button onClick={() => setSubDivision('4n')}>1/4</button></li>
          <li><button onClick={() => setSubDivision('8n')}>1/8</button></li>
          <li><button onClick={() => setSubDivision('16n')}>1/16</button></li>
          <li><button onClick={() => setSubDivision('32n')}>1/32</button></li>
        </ul>
      </div>
    </div>
  )
}

SubDivisionManager.propTypes = {
  setSubDivision: PropTypes.func.isRequired
}

export default SubDivisionManager