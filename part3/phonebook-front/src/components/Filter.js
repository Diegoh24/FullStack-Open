const Filter = ({onChange}) => {
  return (
    <>
    <label htmlFor="search">Filter shown with</label>
    <input id="search" onChange={onChange}/>
    </>
  )
}

export default Filter;