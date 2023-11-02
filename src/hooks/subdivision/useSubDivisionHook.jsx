import { useState } from "react";

function useSubDivisionHook(initialSubDivision) {
  const [subDivision, setSubDivision] = useState(initialSubDivision)

  const updateSubDivision = newSubDivision => {
    setSubDivision(newSubDivision)
  }

  return [subDivision, updateSubDivision]
}

export default useSubDivisionHook