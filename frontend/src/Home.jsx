import React from 'react'
import circle from '../src/assets/circle.png'

const Home = () => {
  return (
    <div className='home-container'>
        <div className='home-bannerImage-container'>
            <img src= {circle} alt="" />
        </div>
        <div className='home-text-section'>
            <h1 className='primary-heading'>The best Place to READ MANGA ONLINE </h1>
            <p className='primary-text'>
                All manga in one place. Search your favorite anime shows and
                watch them anywhere-anytime you want. 
            </p>
        </div>
    </div>
  )
}

export default Home