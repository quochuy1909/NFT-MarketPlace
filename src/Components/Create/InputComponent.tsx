import { useState } from 'react'
interface iInputProps {
  initialValue: string,
  onValueChange: any,
  placeholder: string,
  name: string
}
function InputComponent({ initialValue, onValueChange, placeholder, name }: iInputProps) {
  const [value, setValue] = useState<string>(initialValue);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <>
      <label className='py-1 lg:basis-1/6 sm:basis-2/6 basis-1/2'>{name}</label>
      <input
        type={name =='NFT Name' ? 'text':'number'}
        value={value}
        className='px-2 py-1 lg:basis-5/6 sm:basis-4/6 basis-1/2 border-2 rounded-lg border-slate-400 h-fit'
        onChange={handleInputChange}
        placeholder={placeholder} required={true}
      />
    </>
  );
}

export default InputComponent;