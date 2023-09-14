import React from 'react'

const Formio = ({name,value,type,onChange,id}) => {

  
  return (
    <>
              <div className='form-row'>
          <label htmlFor={name} className='form-label'>
            {name}
          </label>

          <input
            id={id ? id : "ipt"}
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            className='form-input'
          />

          
        </div>

    </>
  )
}

export default Formio
