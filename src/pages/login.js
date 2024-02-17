/* Pagina inicial */
import { useContext, useState } from 'react';
import DefaultTable from '../components/DefaultTable';
import truck from '../assets/images/truck.gif';
import Image from 'next/image';


export default function Login() {

  return (
    <div>
      <h1 className='text-left text-7xl font-mono font-semibold mt-10 ml-10'>WEB 3</h1>
      <div className='justify-center flex mt-40'>
        <Image src={truck} className='rounded-xl' alt="Truck gif"/>
      </div>
    </div>
  )
  
}

