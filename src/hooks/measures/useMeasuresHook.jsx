import { useState } from "react";

function useMeasuresHook(initialMeasures) {
  const [measures, setMeasures] = useState(initialMeasures)

  const updateMeasures = newMeasures => {
    setMeasures(newMeasures)
  }

  return [measures, updateMeasures]
}

export default useMeasuresHook