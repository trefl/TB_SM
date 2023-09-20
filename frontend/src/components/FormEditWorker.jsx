import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const FormEditWorker = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getWorkerById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/workers/${id}`)
        setName(response.data.name)
        setSurname(response.data.surname)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg)
        }
      }
    }
    getWorkerById()
  }, [id])

  const updateWorker = async e => {
    e.preventDefault()
    try {
      await axios.patch(`http://localhost:5000/workers/${id}`, {
        name: name,
        surname: surname
      })
      navigate('/workers')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <div>
      <h1 className='title'>Workers</h1>
      <h2 className='subtitle'>Edit Worker</h2>
      <div className='card is-shadowless'>
        <div className='card-content'>
          <div className='content'>
            <form onSubmit={updateWorker}>
              <p className='has-text-centered'>{msg}</p>
              <div className='field'>
                <label className='label'>Name</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Worker Name'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Surname</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                    placeholder='Surname'
                  />
                </div>
              </div>

              <div className='field'>
                <div className='control'>
                  <button type='submit' className='button is-success'>
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEditWorker
