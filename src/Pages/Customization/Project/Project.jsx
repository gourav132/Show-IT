import React from 'react'

export default function Project() {
    const input = (label, Name, HelperText="") => {
        return (
            <div className="mb-4">
                <label htmlFor={Name} className="text-sm font-medium text-gray-200">{label}</label>
                <input
                    type="text" 
                    id={Name} 
                    name={Name}
                    className="border-2 border-zinc-800 mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300  focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full" 
                    // onChange = {handleChange}
                    // value={previewData[Name]}
                />
                <p className='mt-1 text-xs text-gray-400'>{HelperText}</p>
            </div>
        )
    }
  return (
    <div>
        <section id="projects" className=''>
            <h3 className='text-xl font-semibold mt-6 mb-4'>Projects</h3>
            <div>
                <label className='text-sm font-medium text-gray-200' htmlFor="about">Write about your project</label>
                <textarea 
                    id='about' 
                    className='border-2 border-zinc-800 mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300  focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full' 
                    rows={5} 
                    type="text" 
                    placeholder='Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.'
                    // value={previewData.overview}
                    // onChange = {(e) => {setPreviewData({...previewData, overview: e.target.value})}}
                />
            </div>

            <div className='mt-4'>
                {input("Project Title", "projectTitle", "Enter the name of your project")} 
            </div>
                    <div>
                        <label className='text-sm font-medium text-gray-200' htmlFor="about">Project Description</label>
                        <textarea 
                            id='about' 
                            className='border border-zinc-800 mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300  focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full' 
                            rows={5} 
                            type="text" 
                            // value={previewData.overview}
                            // onChange = {(e) => {setPreviewData({...previewData, overview: e.target.value})}}
                        />
                    </div>
                    <div className='mt-4'>
                        <input type="file" className='block w-full text-sm text-gray-300 rounded-md py-2 px-2 focus:outline-none hover:ring-1 hover:ring-purple-400  focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 border border-zinc-800
                            file:me-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700
                            file:disabled:opacity-50 file:disabled:pointer-events-none
                            dark:file:bg-purple-500
                            dark:hover:file:bg-purple-400'
                        />
                    </div>

                    <div className='w-full flex mt-4'>
                        <div className='w-full pr-2'>
                            {input("GitHub Link", "github", "")} 
                        </div>
                        <div className='w-full pl-2'>
                            {input("Project Link", "github", "")} 
                        </div>
                    </div>
        </section>
    </div>
  )
}
