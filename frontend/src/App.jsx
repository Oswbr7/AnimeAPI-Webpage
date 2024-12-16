import { useState, useEffect } from 'react'
import './App.css'
import AnimeList from './AnimeList'
import AnimeForm from './AnimeForm'
import Home from './Home'
import About from './about'

function App() {
  const [animes, setAnimes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState([])
  const [currentAnime, setCurrentAnime] = useState([])

  useEffect(() => {
    fetchAnimes()
  }, [])

  const fetchAnimes = async () => {
    const response = await fetch("http://127.0.0.1:5000/animes")
    const data = await response.json()
    setAnimes(data.animes)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentAnime({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (anime) => {
    if (isModalOpen) return
    setCurrentAnime(anime)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchAnimes()
  }

  return (
  <>
    <Home />
    <About />
    <AnimeList animes = {animes} updateAnime={openEditModal} updateCallback={onUpdate}/>
    <button onClick={openCreateModal}>Create New Anime</button>
    {isModalOpen && <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>&times;</span>
          <AnimeForm existingAnime={currentAnime}/>
        </div>
      </div>
    }
    
  </>
  );
}

export default App
