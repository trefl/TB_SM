import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FormAddWorker = () => {
  const [name, setName] = useState()
  const [surname, setSurname] = useState()
  const [msg, setMsg] = useState()
  const navigate = useNavigate()

  const saveWorker = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/workers', {
        name:name,
        surname: surname
      })
      navigate("/workers")
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <div>
      <h1 className='title'>Workers</h1>
      <h2 className='subtitle'>Add New Worker</h2>
      <div className='card is-shadowless'>
        <div className='card-content'>
          <div className='content'>
            <form onSubmit={saveWorker}>
              <p className='has-text-centered'>{msg}</p>
              <div className='field'>
                <label className='label'>Name</label>
                <div className='control'>
                  <input type='text' className='input' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Surname</label>
                <div className='control'>
                  <input type='text' className='input' value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Surname' />
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <button type="submit" className='button is-success'>Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FormAddWorker
