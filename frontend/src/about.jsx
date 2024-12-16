import React from 'react'
import circle from '../src/assets/circle.png'

const About = () => {
  return (
    <div className='about-container'>
        <div className='about-bannerImage-container'>
            <img src= {circle} alt="" />
        </div>
        <div className='about-text-section'>
            <h1 className='about-primary-heading'>READ ANYWHERE YOU WANT </h1>
            <p className='about-primary-text'>
                Read your favorite series without internet connection.
                Read your series anytime you want
            </p>
        </div>
    </div>
  )
}

export default About