import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ProjectContext } from '../../../context/ProjectContext';

export default function Project({ step, setStep }) {
    const [projects, setProjects] = useContext(ProjectContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        // You can handle form submission here, e.g., save to context or API call
    };

    const input = (label, Name, HelperText = "", validationRules = {}) => {
        return (
            <div className="mb-4">
                <label htmlFor={Name} className="text-sm font-medium text-gray-200">{label}</label>
                <input
                    type="text"
                    id={Name}
                    name={Name}
                    {...register(Name, validationRules)}
                    className={`border-2 text-sm border-zinc-800 mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full ${errors[Name] ? 'border-red-500' : ''}`}
                />
                <p className='mt-1 text-xs text-gray-400'>{HelperText}</p>
                {errors[Name] && <p className="mt-1 text-xs text-red-500">{errors[Name].message}</p>}
            </div>
        );
    };

    return (
        <div>
            <section id="projects" className='overflow-y-scroll h-96 scroll p-2'>
                <h3 className='text-xl font-semibold mt-6 mb-4'>Projects</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className='text-sm font-medium text-gray-200' htmlFor="about">Write about your project</label>
                        <textarea
                            id='about'
                            {...register("about", { required: "This field is required" })}
                            className={`border-2 border-zinc-800 text-sm mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full ${errors.about ? 'border-red-500' : ''}`}
                            rows={5}
                            type="text"
                            placeholder='Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.'
                        />
                        {errors.about && <p className="mt-1 text-xs text-red-500">{errors.about.message}</p>}
                    </div>

                    <div className='mt-4'>
                        {input("Project Title", "projectTitle", "Enter the name of your project", { required: "Project title is required" })}
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-200' htmlFor="projectDescription">Project Description</label>
                        <textarea
                            id='projectDescription'
                            {...register("projectDescription", { required: "Project description is required" })}
                            className={`border-2 text-sm border-zinc-800 mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full ${errors.projectDescription ? 'border-red-500' : ''}`}
                            rows={5}
                            type="text"
                        />
                        {errors.projectDescription && <p className="mt-1 text-xs text-red-500">{errors.projectDescription.message}</p>}
                    </div>

                    <div className='mt-4'>
                        <input
                            type="file"
                            {...register("projectFile", {
                                required: "Project file is required",
                                validate: {
                                    acceptedFormats: files => {
                                        const acceptedFormats = ['image/jpeg', 'image/png'];
                                        return files && files[0] && acceptedFormats.includes(files[0].type) || "Only JPG/PNG files are accepted";
                                    }
                                }
                            })}
                            className={`block w-full text-sm text-gray-300 rounded-md py-2 px-2 focus:outline-none hover:ring-1 hover:ring-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 border border-zinc-800 ${errors.projectFile ? 'border-red-500' : ''}`}
                        />
                        {errors.projectFile && <p className="mt-1 text-xs text-red-500">{errors.projectFile.message}</p>}
                    </div>

                    <div className='w-full flex mt-4'>
                        <div className='w-full pr-2'>
                            {input("GitHub Link", "githubLink", "", { required: "GitHub link is required", pattern: { value: /https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?/i, message: "Enter a valid GitHub URL" } })}
                        </div>
                        <div className='w-full pl-2'>
                            {input("Project Link", "projectLink", "", { required: "Project link is required", pattern: { value: /https?:\/\/[^\s]+/i, message: "Enter a valid URL" } })}
                        </div>
                    </div>

                    <div className='mb-10 mt-5'>
                        <button type="button" onClick={() => setStep('exp')} className='px-2 py-1 text-sm bg-gray-500 rounded mr-2'>Back</button>
                        <button type="submit" className='px-2 py-1 text-sm bg-indigo-500 rounded'>Next</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
