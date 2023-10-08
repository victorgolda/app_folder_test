import React from 'react'

interface SelectFilterProps {
  options: option[]
  setOption?: Function
}

interface option {
  value: string
  label: string
}

const SelectFilter = ({ options, setOption }: SelectFilterProps) => {
  return (
    <select>
      {options.map((option, index) => {
        return (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        )
      })}
    </select>
  )
}

export default SelectFilter
