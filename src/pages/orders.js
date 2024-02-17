import React from 'react'
import Table from '../components/Table'

const orders = () => {
  return (
    <div>
        <div className='p-4'>
            <h1 className='text-4xl font-semibold'>Ordenes</h1>
        </div>
        <div className='mt-2'>
            <Table/>
        </div>
    </div>
  )
}

export default orders