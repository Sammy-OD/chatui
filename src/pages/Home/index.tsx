import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Home: React.FC = () => {

  const {data, setData}: any = useApp();

  const navigate = useNavigate();

  useEffect(() => {
    setData([])
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (data.room === '') return

    navigate(`/chat?name=${data.name}&room=${data.room}`)
  }

  return (
    <div className="w-[350px] p-6 shadow-lg rounded-lg bg-white">
      <form>
        <div className="flex w-full flex-col mb-5">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setData({...data, name: e.target.value})}
            className="w-full rounded-lg p-2 border border-gray-400 mt-2"
          />
        </div>
        <div className="flex w-full flex-col mb-5">
          <label htmlFor="name">Room to Join:</label>
          <select onChange={(e) => setData({...data, room: e.target.value})} className="w-full rounded-lg p-2 border border-gray-400 bg-white mt-2">
            <option value=''>-----------</option>
            <option value='django'>Django</option>
            <option value='python'>Python</option>
            <option value='react'>React</option>
            <option value='postgres'>Postgres</option>
          </select>
        </div>

        <button className="bg-pink-800 text-white w-full p-2 rounded-lg" onClick={handleClick}>Join Room</button>
      </form>
    </div>
  )
}

export default Home
