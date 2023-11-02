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

const Square = ({ value, onClick }) => {
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
    <div style={styles} onClick={onClick}>{value}</div>
  )
}

const Sequencer = ({ isPlaying, scale, measures, subDivision, pattern, setUserPattern }) => {
  // TEST TEST TEST
  const [toneSequence, setToneSequence] = useState()
  
  const loopUserSequence = () => {
    const sequences = []
    pattern.forEach((noteSequence, index) => {
      sequences.push(newSequenceSynthCreator(index, toneSynthsArr[index], noteSequence))
    })
    setToneSequence(sequences)
  }

  const newSequenceSynthCreator = (index, synth, sequence) => {
    const tempSequence = sequence.map(isActive => {
      if (isActive) return scale[index]
      else return null
    })
    return new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, '16n', time)
    }, tempSequence, subDivision)
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

  // Create an updated pattern based on user input and set the pattern state to it
  function updatePattern({ x, y, value }) {
    const patternCopy = [...pattern]
    patternCopy[y][x] = +!value
    setUserPattern(patternCopy)
    // handleSequence
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
        <div key={y} style={styles}>
          {
            row.map((value, x) => (
              <Square key={x} value={value} onClick={() => updatePattern({ x, y, value })} />
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