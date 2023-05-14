import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const UsePasswordToggle = () => {
    const [visible, setVisibility] = useState(false)

    const Icon = ( <FontAwesomeIcon icon={visible ? "eye-slash" : "eye"} onClick={()=> setVisibility(visibilty => !visibilty)}/> )

    const InputType = visible ? "text" : "password"
    return [InputType, Icon]
}

export default UsePasswordToggle