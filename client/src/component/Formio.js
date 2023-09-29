import React from 'react'

const Formio = ({ name, value, type, onChange, id="", func, confirm, checkbox }) => {

/**
|--------------------------------------------------|
| consirm prop is use for check box to disable     |
|--------------------------------------------------|
*/
  return (
    <>

      {checkbox === true ?
        <div className='form-row'>
          <label htmlFor={name} className='form-label'>
            {name}
          </label>

          <div className='check'>

            <input
              id={id ? id : id + name }
              type={type}
              value={value}
              name={name}
              onChange={onChange}
              className='form-input'
              required
            />

            <input disabled={confirm} className='pass' type='checkbox' onClick={func} />

          </div>

        </div>
        :
        <div className='form-row'>
          <label htmlFor={name} className='form-label'>
            {name}
          </label>


          <input
            id={id ? id : id + name  }
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            className='form-input'
         
          />
        </div>
      }
    </>
  )
}

export default Formio
