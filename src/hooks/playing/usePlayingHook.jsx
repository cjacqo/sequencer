import { useState } from "react";

function usePlayingHook() {
  const [isPlaying, setIsPlaying] = useState(false)

  const updateIsPlaying = newIsPlaying => {
    setIsPlaying(newIsPlaying)
  }

  return [isPlaying, updateIsPlaying]
}

export default usePlayingHook