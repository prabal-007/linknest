import React from 'react'

const DashCards = ({title, bg}) => {
  return (
    <div>
        <div className={`w-64 h-36 col-span-1 border border-white rounded-xl flex justify-center items-center font-bold ${bg}`}>{title}</div>
    </div>
  )
}

export default DashCards