import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import * as Tone from 'tone'

// Array of Tone.js Synthesizers
// --- each synthesizer corresponds to a row in the sequence
const toneSynthsArr = [
  new Tone.PolySynth().toDestination(),
  new Tone.PolySynth().toDestination(),
  new Tone.PolySynth().toDestination(),
  new Tone.PolySynth().toDestination(),
  new Tone.PolySynth().toDestination(),
  new Tone.PolySynth().toDestination(),
  new Tone.PolySynth().toDestination(),
  new Tone.PolySynth().toDestination()
]

const Square = ({ coords, value, onClick }) => {
  const { x, y } = coords
  const active = value === 1
  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    background: value ? '#999' : '',
    border: active ? '1px solid #999' : '1px solid #eee'
  }
  return (
    <div className={`col${x}`} style={styles} onClick={onClick}>{value}</div>
  )
}

const Sequencer = ({ isPlaying, scale, measures, subDivision, pattern, setUserPattern }) => {
  // TEST TEST TEST
  const [toneSequence, setToneSequence] = useState()

  const getSequenceColumns = () => {
    // Get number of columns
    const numColumns = document.getElementById('gridRow1').children.length
    // Generate arrays of column elements
    const columns = []
    for (let i = 0; i < numColumns; i++) {
      const columnElementsArr = Array.from(document.getElementsByClassName(`col${i}`))
      columns.push(columnElementsArr)
    }
    return columns
  }
  
  const loopUserSequence = () => {
    const sequences = []
    pattern.forEach((noteSequence, index) => {
      sequences.push(newSequenceSynthCreator(index, toneSynthsArr[index], noteSequence))
    })
    setToneSequence(sequences)
  }

  const newSequenceSynthCreator = (index, synth, sequence) => {
    const columns = getSequenceColumns()

    let count = 0
    const subDivisionNum = parseInt(subDivision.match(/\d+/g))
    const tempSequence = sequence.map(isActive => isActive ? scale[index] : null)

    return new Tone.Sequence((time, note) => {
      columns.forEach((columnElements, columnIndex) => {
        const isActiveStep = columnIndex === (Tone.Transport.position.split(':')[1] % sequence.length)
        columnElements.forEach(element => {
          element.style.backgroundColor = isActiveStep ? 'red' : ''
        })
      })

      if (note) {
        synth.triggerAttackRelease(note, '16n', time)
      }
      
    }, tempSequence, subDivision).start(0)
  }

  // When the isPlaying state is changed, either stop or start the sequencer
  useEffect(() => {
    if (isPlaying) {
      // setToneSequence(createSequence())
      if (pattern) {
        loopUserSequence()
      }
    }
    else if (!isPlaying && toneSequence) {
      toneSequence.forEach(synth => {
        synth.stop()
        synth.dispose()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, pattern])

  useEffect(() => {
    if (toneSequence) toneSequence.forEach(synth => synth.start(0))
  }, [toneSequence])

  // TEST TEST TEST
  // Tone.Transport.schedule((time) => {
    

  //   Tone.Draw.schedule(() => {
  //     // console.log(time)
  //     // const col0 = Array.from(document.getElementsByClassName('col0'))
  //     // col0.forEach(col => {
  //     //   col.style.backgroundColor = 'red'
  //     // })
  //   }, time)
  // })

  // Create an updated pattern based on user input and set the pattern state to it
  function updatePattern({ x, y, value }) {
    const newPattern = pattern.map((row, rowIndex) => {
      if (rowIndex === y) {
        return row.map((cell, cellIndex) => {
          if (cellIndex === x) {
            return +!value
          }
          return cell
        })
      }
      return row
    })
    setUserPattern(newPattern)

    if (isPlaying) {
      Tone.Transport.cancel()
      loopUserSequence(newPattern)
    }
  }

  const renderSequencer = () => {
    return pattern.map((row, y) => {
      const styles = {
        gridRow: `${y + 1} / ${y + 2}`,
        display: 'flex',
        justifyContent: 'center',
        height: 50
      }
      return (
        <div key={y} style={styles} id={`gridRow${y + 1}`}>
          {
            row.map((value, x) => (
              <Square key={x} coords={{ x, y }} value={value} onClick={() => updatePattern({ x, y, value })} />
            ))
          }
        </div>
      )
    })
  }

  return (
    <div className='sequencer--container'>
      {renderSequencer()}
    </div>
  )
}

Square.propTypes = {
  coords: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

Sequencer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  scale: PropTypes.array.isRequired,
  measures: PropTypes.number.isRequired,
  subDivision: PropTypes.string.isRequired,
  pattern: PropTypes.array.isRequired,
  setUserPattern: PropTypes.func.isRequired
}

export default Sequencer