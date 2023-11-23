import React, { useState,useEffect } from 'react'
import './Meme.css'
import memeData from '../memeData.js'

let url;
export const Meme = () => {
    const [data,setData]=useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    
    // const newArr=data.map(things=> <p>{things}</p>)
    const[meme,SetMeme]=React.useState(memeData)

    const fetchData = async() =>{
        try {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            console.log(data)
            SetMeme(data.data.memes)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        fetchData()
    }, [])
    
    function handleClick  (e){
        e.preventDefault()
        const randomNumber=Math.floor(Math.random()* meme.length)
         url= meme[randomNumber]?.url
       setData(prevImg=>{
            return{
                ...prevImg,
                randomImage: url
            }
        }) 
        
        
    }
    function handleChange (event){
     const {name,value}= event.target
     setData(prev=>{
        return{
            ...prev,
            [name]:value
        }
     })
    }
  return (
    <div className='main'>
        <form className="form">
            {url}
                <input 
                    type="text"
                    placeholder="Shut Up"
                    className="form--input"
                    name='topText'
                    value={data.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="And take my money"
                    className="form--input"
                    name='bottomText'
                    value={data.bottomText}
                    onChange={handleChange}

                />
                <button 
                    className="form--button"
                    onClick={handleClick}
                >
                    Get a new meme image 🖼
                </button>
                <div className='meme'>

                <img src={data.randomImage} className='meme--img' />
                 <h2 className='meme-text top'>{data.topText}</h2>
                <h2 className='meme-text bottom'>{data.bottomText}</h2> 
                </div>
            </form>
    </div>
  )
}
