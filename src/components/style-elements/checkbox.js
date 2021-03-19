import React, { useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import styled from "styled-components"

const CheckboxInput = styled.span.attrs({
  className: `
    w-8
    h-8
    block
    rounded
    ring-2
    ring-gray-700
  `
})``

const CheckboxLabel = styled.label.attrs({
  className: `
    text-lg
    flex
    items-center
    space-x-4
  `
})``

const Checkbox = (props) => {
  const [checked, setChecked] = useState(false)

  function onChangeEvent(e) {
    setChecked(!checked)
    props.onChange(e)
  }

  return (
    <CheckboxLabel>
      <input type="checkbox" className="opacity-0 absolute h-8 w-8" onChange={onChangeEvent} />
      <CheckboxInput>
        {checked && <FiCheck className="w-8 h-8 current-color text-gray-700" />}
      </CheckboxInput>
      <span>{props.children}</span>
    </CheckboxLabel>
  )
}

export default Checkbox
