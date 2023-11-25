import { IOptions } from '../type'
import { memo } from 'react'
interface radioProps {
  name: string,
  selectedOption: string,
  handleChange: (value: string) => void,
  options: Array<IOptions>
}
const RadioComponent = ({ name, options, selectedOption, handleChange }: radioProps) => {
  return (
    <>
      {options.map((option: IOptions, index: number) => {
        return (
          <div className='text-center basis-1/2' key={index}>
            <input type='radio' name={name} value={option.name}
              checked={selectedOption === option.name}
              onChange={() => handleChange(option.name)}
            />
            <label className='mr-1' />{option.label}
          </div>
        )
      })}
    </>
  )
}

export default memo(RadioComponent)