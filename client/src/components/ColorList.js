import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialColor = {
  color: '',
  code: { hex: '' }
}

const ColorList = ({ colors, updateColors, getColors }) => {

  const [editing, setEditing] = useState(false)
  const [colorToEdit, setColorToEdit] = useState(initialColor)

  const [makeColor, setMakeColor] = useState({
    code: {hex: ''},
    color: '',
    id: Date.now()
  })


  const makeColorSubmit = e =>{
    e.preventDefault();
    axiosWithAuth().post('/api/colors', makeColor)
    .then(()=>{
      axiosWithAuth().get('/api/colors')
      .then(res => updateColors(res.data))
      .catch(err => console.log(err))
    })
  }
  const makeColorOnChange = e =>{
    e.preventDefault();
    setMakeColor({
      ...makeColor,
      [e.target.name]: e.target.value
    })
  }

  const editColor = color => {
    setEditing(true)
    setColorToEdit(color)
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res =>{
      axiosWithAuth()
      .get('/api/colors')
      .then(res => updateColors(res.data)
      )
      setEditing(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res =>{
      axiosWithAuth()
      .get('/api/colors')
      .then(res => updateColors(res.data)
      )
      setEditing(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (

    <div className='colors-wrap'>

        <h1>Add-a-Color</h1>
        <form className="addColor" onSubmit={makeColorSubmit}>
        <input
        type="text"
        name="color"
        value={makeColor.color}
        onChange={makeColorOnChange}
        placeholder="Color Name"
        style={{ margin: '0 auto'}}
        />
        <input
        type="text"
        name="code"
        value={makeColor.code.hex}
        onChange={e => setMakeColor({...colorToEdit, code: {hex: e.target.value}})}
        placeholder="Hex Code"
        style={{margin: '0 auto', marginTop:'5px'}}
        />

        <button
          type="submit"
          style={{width: '50%', height: '40px', margin: '0 auto', backgroundColor: 'blue', marginTop:'10px'}}
          >Create!</button>
        </form>

      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className='delete' onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
        {/* stretch - build another form here to add a color */}



    </div>
  );
};

export default ColorList;
