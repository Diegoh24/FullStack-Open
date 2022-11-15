const AddContact = ({ onSubmit }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name: <input name="name"/>
        </div>
        <div>
          number: <input name="number"/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default AddContact;