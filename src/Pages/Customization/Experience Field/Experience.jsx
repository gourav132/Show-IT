import React, {useState, useContext, useEffect} from 'react'
import { PreviewContext } from '../../../context/PreviewContext';
import { Add, Delete } from '../../../assets/svg';

export default function Experience({ step, setStep }) {

    const [ previewData, setPreviewData ] = useContext(PreviewContext);

    const [expState, setExpState] = useState({
        currentWorkingExp: Math.floor(Math.random() * 90) + 10,
        mode:"add"
    });

    const [experience, setExperience ] = useState({
        id: expState.currentWorkingExp, title: "",
        company_name: "", icon: "",
        to: "", from: "",
        points: "", iconBg: "#383E56",
    });

    useEffect(() => {
        if(expState.mode === "add") 
            setExperience({
                id: Math.floor(Math.random() * 90) + 10, title: "",
                company_name: "", icon: "",
                to: "", from: "",
                points: "", iconBg: "#383E56"
            })
    }, [expState])

    const input = (label, Name, HelperText="", type="text") => {
        return (
            <div className="mb-4">
                <label htmlFor={Name} className="text-sm font-medium text-gray-200">{label}</label>
                <input
                    type={type}
                    id={Name} 
                    name={Name}
                    className="border border-zinc-800 text-sm mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300  focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full" 
                    onChange = {(e) => setExperience({...experience, [e.target.name]: e.target.value})}
                    value={experience[Name]}
                />
                <p className='mt-1 text-xs text-gray-400'>{HelperText}</p>
            </div>
        )
    }

    const handleAddExperience = () => {
        const splitPoints = experience.points.split(".");
        const date = experience.from + " - " + experience.to;
        const id = Math.floor(Math.random() * 90) + 10;
        const exp = {
            id: id,
            title: experience.title,
            company_name: experience.company_name,
            icon: experience.icon,
            iconBg: "#383E56",
            date: date,
            points: splitPoints
        }
        setPreviewData({...previewData, experiences: previewData.experiences.concat(exp)});
    }
    
    const handleDeleteExperience = (id) => {
        const filteredExperiences = previewData.experiences.filter((exp) => exp.id !== id);
        setPreviewData({...previewData ,experiences: filteredExperiences });
    }

    const handleUpdate = (id) => {
        let filteredExperiences = previewData.experiences.filter((exp) => exp.id !== id);  // Deleting the outdated experience.
        
        const splitPoints = experience.points.split(".");
        const date = experience.from + " - " + experience.to;
        
        const exp = {
            id: experience.id,
            title: experience.title,
            company_name: experience.company_name,
            icon: experience.icon,
            iconBg: "#383E56",
            date: date,
            points: splitPoints
        }
        
        filteredExperiences.push(exp); // Adding the updated experience to the array
        setPreviewData({...previewData ,experiences: filteredExperiences });
        // console.log(filteredExperiences);
    }

    const handleSearchExp = (id) => {
        const exp = previewData.experiences.find((exp) => exp.id === id);
        const points = exp.points.join(" ");
        const duration = exp.date.split("-");
        setExperience({
            id: exp.id,
            title: exp.title,
            company_name: exp.company_name,
            icon: exp.icon,
            to: duration[2].trim()+"-"+duration[3].trim(),
            from: duration[0].trim()+"-"+duration[1].trim(),
            points: points,
            iconBg: "#383E56",
        });
        setExpState({
            currentWorkingExp: id,
            mode: "update"
        })
    }

  return (
    <div>
        <section id='Work-Experience' className='overflow-y-scroll h-96 p-2 scroll'>
            <h3 className='text-xl font-semibold mb-4'>Work Experience</h3>
            <div className='flex mb-3 w-full overflow-x-scroll scroll '>
                <div className='mr-4'>
                    <button onClick={()=>setExpState({...expState, mode: "add"})} className='flex py-2 px-4 text-sm rounded-md bg-blue-400 hover:bg-blue-500'>
                        <Add />
                    </button>
                </div>
                { previewData.experiences &&
                    previewData.experiences.map((exp, index) => {
                        return(
                        <button onClick={()=>handleSearchExp(exp.id)} key={exp.id} className='mr-2 inline-flex items-center justify-around py-2 px-2 overflow-x-hidden rounded-md text-sm bg-purple-500 hover:bg-purple-600 transition-all'>
                            {exp.company_name}     
                        </button>
                        )
                    })
                }
            </div>

            {input("Company", "company_name", "Name of the company you worked for")}
            {input("Position", "title", "Write the role you were playing in the company")}

            <div>
                <label className='text-sm font-medium text-gray-200' htmlFor="about">Experience</label>
                <textarea 
                    // id='about' 
                    className='border border-zinc-800 text-sm mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300  focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full' 
                    rows={5} 
                    type="text" 
                    placeholder='Write few points about your experience'
                    name="points"
                    onChange = {(e) => setExperience({...experience, [e.target.name]: e.target.value})}
                    value={experience.points}
                />
                <p className='mt-1 text-xs text-gray-400'>Sentences will be considered as points</p>
            </div>

            {/* -------------------------- Date Section ------------------------- */}
            <div className='flex mt-4 mb-2'>
                <div className='w-full pr-2'>
                    {input("From", "from", "Enter starting Date", "month")}
                </div>
                <div className='w-full pl-2'>
                    {input("To", "to", "Enter completion date", "month")}
                </div>
            </div>
            {/* -------------------------- Date Section ------------------------- */}

            {input("Company Logo", "icon", "drop the link of the company logo")}

            <div className='w-full flex mt-2 mb-2'>
                {expState.mode==="add"?
                    <div className='mr-4'>
                        <button onClick={handleAddExperience} className='flex py-2 px-4 rounded-md text-sm bg-blue-400 hover:bg-blue-500'>
                            Save
                        </button>
                    </div>
                : 

                <>
                <div className='mr-4'>
                    <button onClick={()=>handleUpdate(expState.currentWorkingExp)} className='flex text-sm items-center py-2 px-4 rounded-md text-green-400 border border-green-400 hover:text-white hover:bg-green-500 transition-colors'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit mr-2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>                
                        Update Experience
                    </button>
                </div>

                <div>
                    <button onClick={()=>handleDeleteExperience(experience.id)} className='flex text-sm items-center py-2 px-4 rounded-md text-red-400 border border-red-400 hover:text-white hover:bg-red-500 transition-colors'>
                        <Delete /> Delete Experience
                    </button>
                </div>
                </> }
            </div>
            <button
                    className='px-4 py-1 text-sm bg-gray-500 rounded mt-3 mr-3'
                    onClick={()=>setStep("overview")}>Back</button>
                <button
                    className='px-4 py-1 text-sm bg-purple-500 rounded'
                    onClick={()=>setStep("project")}
                >Next</button>
            
</section>
    </div>
  )
}
