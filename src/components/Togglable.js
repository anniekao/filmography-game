import React, { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [isToggled, setIsToggled] = useState(props.toggleState)
  const style = { display: isToggled ? '' : 'none' }

  const toggle = () => {
    setIsToggled(!isToggled)
  }

  useImperativeHandle(ref, () => {
    return {
      toggle
    }
  })

  return (
    <div style={style}>
      {props.children}
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable