import React, { useState, useEffect, useContext } from 'react'
import { PreviewContext } from '../../../context/PreviewContext'
import {web} from '../../../assets'
import { motion } from 'framer-motion'

export default function Overview({step, setStep}) {

  const handleOverviewDelete = (title) => {
    setPreviewData((prevPreviewData) => ({
        ...prevPreviewData,
        services: prevPreviewData.services.filter(
          (service) => service.title !== title
        ),
      }));
  }

  const handleOverviewServiceAdd = (title) => {
      const newService = {
          title: title,
          icon: web,
        };
        
        setPreviewData((prevData) => ({
          ...prevData,
          services: [...prevData.services, newService],
        }));
  }
  
  const list = (value, label, last=false) => {
    return(
      <li className={`w-full border-gray-200 sm:border-b-0 ${!last ?  'sm:border-r' : '' } dark:border-gray-600`}>
          <div className="flex items-center ps-3">
              <input 
                  onChange={(e) => {
                      if(e.target.checked) handleOverviewServiceAdd(value)
                      else handleOverviewDelete(value)
                      }} 
                      id={label} type="checkbox" value={value} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
                      checked={previewData.services.some((service) => service.title === value)}/>
              <label htmlFor={label} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
          </div>
      </li>
    )
  }

  const [ previewData, setPreviewData ] = useContext(PreviewContext);
  
  return (
    <motion.div
      delay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // transition={{ duration: 0.5, delay:1 }}
    >
      <h3 className='text-xl font-semibold mt-6 mb-4'>Overview Section</h3>

        <div>
          <label className='text-sm font-medium text-gray-200' htmlFor="about">About you</label>
          <textarea                    
              id='about' 
              className='text-sm border border-zinc-800 mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300  focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full' 
              rows={5} 
              type="text" 
              placeholder='Write few lines about you'
              value={previewData.overview}
              onChange = {(e) => {setPreviewData({...previewData, overview: e.target.value})}}
          />
        </div>

        <h3 className="mt-4 mb-0.5 text-sm font-medium text-gray-200">Select your forte</h3>

        <ul className="items-center w-full text-sm font-medium text-gray-90 p-1 border border-gray-200 rounded-lg sm:flex dark:border-gray-600">
            {list("React Developer", "React")}
            {list("Web Developer", "Web")}
            {list("Mern Developer", "Mern")}
            {list("Angular Developer", "Angular")}
            {list("Larvel Developer", "Larvel", true)}
        </ul>
                
        <p className='mt-1 text-xs text-gray-400'>you can select maximum four of your forte</p>

        <button
          className='px-4 py-1 bg-gray-500 rounded mt-3 mr-3'
          onClick={()=>setStep("intro")}>Back</button>
        <button
          className='px-4 py-1 bg-purple-500 rounded'
          onClick={()=>setStep("exp")}
          >Next</button>
    </motion.div>
  )
}
