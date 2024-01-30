import React from 'react'
import {experiences} from '../../../constants/index';

export default function Experience({ input, setDetails, details }) {

  return (
    <div>
        <section id='Work-Experience' className='mt-6'>
            <h3 className='text-xl font-semibold mb-4'>Work Experience</h3>
            <div className='flex mb-3 w-full overflow-x-scroll scroll '>
                {
                    experiences.map((exp, index) => {
                        return(
                        <button key={exp.id} className='mr-2 inline-flex items-center justify-around py-2 px-6 rounded-md text-sm bg-purple-500'>
                            {exp.company_name}    
                            <button 
                                onClick={() => {
                                    // experiences = experiences.filter(object => object.id !== exp.id);
                                    experiences.splice(index);
                                    console.log(exp.id)
                                    console.log(index)
                                }}>
                                <svg  className="ml-4 h-6 w-5 feather feather-trash-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>   
                        </button>
                        )
                    })
                }    
                <button className='bg-gray-400 p-2 ml-3 rounded-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
            </div>

            {input("Company", "company_name", "Name of the company you worked for")}
            {input("Position", "title", "Write the role you were playing in the company")}

            <div>
                <label className='text-sm font-medium text-gray-200' htmlFor="about">Experience</label>
                <textarea 
                    id='about' 
                    className='mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300  focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full' 
                    rows={5} 
                    type="text" 
                    placeholder='Write few lines about your experience'
                    onChange = {(e) => {setDetails({...details, points: [e.target.value]})}}
                />
            </div>


            <div className='mt-4'>
                <label 
                    htmlFor="logo-upload" 
                    className='bg-purple-500 text-white inline-flex items-center gap-x-2 px-4 py-2 rounded-md hover:ring-1 hover:ring-purple-300  focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1'
                >
                        Company Logo<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="flex-shrink-0 w-5 h-5 feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                </label>
                <input className='hidden' type="file" name="" id="logo-upload" />
            </div>
</section>
    </div>
  )
}
