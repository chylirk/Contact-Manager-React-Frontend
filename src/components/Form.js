import React from 'react';

const PersonForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      name: <input value={props.newName} onChange={props.nameChange} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.numChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;