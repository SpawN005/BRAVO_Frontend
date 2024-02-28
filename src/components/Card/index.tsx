import Image from 'next/image'
import React from 'react'

const Card = (props:any) => {
  return (
    <div className='border border-slate-300 rounded-lg flex flex-col w-full p-4 space-y-4 hover:-translate-y-1 transition duration-300 ease-in-out delay-150 hover:scale-110'>
    <Image src={props.img} alt='test'
    className='w-full '
    width={
        80
    }
    height={80}></Image>  
  
    <h1 className='text-black font-bold text-2xl'>{props.title}</h1>
    <p className='text-md text-black'>{props.description}</p></div>
  )
}

export default Card