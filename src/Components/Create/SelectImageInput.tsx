import React from 'react'
interface selectInputProps {
  type: string,
  getImage: (value: string | FileList | null, type: string) => void
}
const SelectImageInput = ({ getImage, type }: selectInputProps) => {
  const handleGetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (getImage) {
      { type === 'text' ? getImage(event.target.value, type) : getImage(event.target.files, type) }
    }
  }
  return (
    <>
      <input className='px-2 py-1 basis-5/6 border-2 rounded-lg border-slate-400' type={type}
        placeholder='Image Link...' onChange={handleGetImage} />
    </>
  )
}

export default SelectImageInput