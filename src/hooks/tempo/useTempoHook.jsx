import { useEffect, useState } from "react";
import { Transport } from "tone";

function useTempoHook(initialTempo) {
  const [tempo, setTempo] = useState(initialTempo)

  const updateTempo = newTempo => {
    setTempo(newTempo)
  }

  useEffect(() => {
    Transport.bpm.value = tempo
  }, [tempo])

  return [tempo, updateTempo]
}

export default useTempoHook