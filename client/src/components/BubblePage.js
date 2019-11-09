import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

import Bubbles from './Bubbles'
import ColorList from './ColorList'

const BubblePage = () => {

  const [colorList, setColorList] = useState([])
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    getColors()

  }, [setColorList])

  const getColors = () =>{
    axiosWithAuth()
      .get('/api/colors')
      .then(results =>{
        setColorList(results.data)
      })
      .catch(err =>{
        console.log('bubble page get error', err.response)
      })
  }
  return (
    <>

      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />

    </>
  );
};

export default BubblePage;
