import React from 'react';
import TripsList from './TripsList';
import Search from './Search';
import { ParallaxProvider } from 'react-scroll-parallax';



function HomePage() {

  return (
      <div className = "home">
        <Search />
        <ParallaxProvider>
          <TripsList />
        </ParallaxProvider>
      </div>
  )
}


export default HomePage
