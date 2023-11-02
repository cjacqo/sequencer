import { useState, useEffect } from 'react'

const generateScale = (root, type, octave) => {
  const scaleIntervales =
    type === "major" ? [2, 2, 1, 2, 2, 2, 1] : [2, 1, 2, 2, 1, 2, 2];

  const notes = "C C# D D# E F F# G G# A A# B".split(" ");
  const rootIndex = notes.indexOf(root);

  if (rootIndex === -1) return null;

  const scale = [];
  let currentNoteIndex = rootIndex + octave * 12;

  for (let i = 0; i < scaleIntervales.length; i++) {
    const note = notes[currentNoteIndex % 12];
    scale.push(note + Math.floor(currentNoteIndex / 12));
    currentNoteIndex += scaleIntervales[i];
  }

  scale.push(notes[currentNoteIndex % 12] + Math.floor(currentNoteIndex / 12));
  return scale;
};

function useScaleHook() {
  const [scaleRoot, setScaleRoot] = useState('C')
  const [scaleType, setScaleType] = useState('major')
  const [scaleOctave, setScaleOctave] = useState('3')
  const [scale, setScale] = useState(generateScale(scaleRoot, scaleType, scaleOctave))

  useEffect(() => {
    setScale(generateScale(scaleRoot, scaleType, scaleOctave))
  }, [scaleRoot, scaleType, scaleOctave])
  
  const updateScaleRoot = (newScaleRoot) => {
    setScaleRoot(newScaleRoot)
  }

  const updateScaleType = (newScaleType) => {
    setScaleType(newScaleType)
  }

  const updateScaleOctave = (newScaleOctave) => {
    setScaleOctave(newScaleOctave)
  }

  return {
    scaleRoot,
    scaleType,
    scaleOctave,
    updateScaleRoot,
    updateScaleType,
    updateScaleOctave,
    scale
  }
}

export default useScaleHook