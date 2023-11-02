import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useMeasuresHook, usePlayingHook, useScaleHook, useSubDivisionHook, useTempoHook } from '../hooks'
import * as Tone from 'tone'

/**
 * Sequencer Generator
 * @param measures
 * @param subDivision
 * @note FIGURE OUT HOW TO UPDATE SEQUENCER PATTERN IF VALUES ALREADY EXIST
 */
const generateSequencer = (measures, subDivision, userPattern) => {
  const subDivisionNum = parseInt(subDivision.match(/\d+/g).join(''))
  const pattern = []
  
  if (!userPattern) {
    for (let i = 0; i < 8; i++) {
      const subArray = new Array(measures * subDivisionNum).fill(0)
      pattern.push(subArray)
    }
  }
  return pattern
}

const AppContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  return useContext(AppContext)
}

export function AppContextProvider({ children }) {
  //\\ CUSTOM HOOKS //\\
  const [isStarted, setIsStarted] = useState(false)
  const [isPlaying, setIsPlaying] = usePlayingHook()
  const [tempo, setTempo] = useTempoHook('100')
  const [subDivision, setSubDivision] = useSubDivisionHook('4n')
  const [measures, setMeasures] = useMeasuresHook(1)
  const {
    scaleRoot,
    scaleType,
    scaleOctave,
    updateScaleRoot,
    updateScaleType,
    updateScaleOctave,
    scale
  } = useScaleHook()
  const scaleProperties = {scaleRoot, scaleType, scaleOctave}
  const scaleHandlers = {updateScaleRoot, updateScaleType, updateScaleOctave}
  const [pattern, setPattern] = useState(generateSequencer(measures, subDivision))

  // Update pattern when measures or subDivision are changed
  useEffect(() => {
    setPattern(generateSequencer(measures, subDivision))
  }, [measures, subDivision])

  // Start Playing
  const playAudio = async () => {
    if (!isStarted) {
      await Tone.start()
      setIsStarted(true)
    }
    if (isPlaying && Tone.Transport.state === 'started') return
    Tone.Transport.start()
    setIsPlaying(true)
  }

  // Stop Playing
  const pauseAudio = () => {
    if (!isPlaying && Tone.Transport.state === 'stopped') return
    Tone.Transport.stop()
    setIsPlaying(false)
  }

  // Update Pattern Based on User Selection
  const updatePattern = (userPattern) => {
    setPattern(userPattern)
  }

  return (
    <AppContext.Provider value={{
      isPlaying, playAudio, pauseAudio,
      tempo, setTempo,
      subDivision, setSubDivision,
      measures, setMeasures,
      scaleProperties, scaleHandlers, scale,
      pattern, updatePattern
    }}>
      {children}
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.element.isRequired
}