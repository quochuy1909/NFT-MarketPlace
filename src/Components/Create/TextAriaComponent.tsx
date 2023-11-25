interface ITextAriaComponentProps{
    handleTextArea:(value:string)=>void
}
const TextAriaComponent = ({handleTextArea}:ITextAriaComponentProps) => {
  const handleTextAreaFromComponent = (event:React.ChangeEvent<HTMLInputElement>)=>{
    if(handleTextArea){
      handleTextArea(event.target.value)
    }
  }
  return (
    <>
      <label className='py-1 lg:basis-1/6 sm:basis-2/6 basis-1/2'> NFT Description</label>
      <textarea onChange={(e:any)=>{handleTextAreaFromComponent(e)}} className='px-2 py-1 lg:basis-5/6 sm:basis-4/6 basis-1/2 border-2 rounded-lg border-slate-400 h-fit' 
        cols={30} rows={10} placeholder='NFT Description'></textarea>
    </>
  )
}

export default TextAriaComponent