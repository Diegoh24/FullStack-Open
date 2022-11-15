const Filter = ({onChange}) => {
  return (
    <>
    <label htmlFor="search">Find Countries</label>
    <input id="search" onChange={onChange}/>
    </>
  )
}

export default Filter;