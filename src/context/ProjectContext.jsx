import React, { createContext, useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase/config';


export const  ProjectContext = createContext();

export const ProjectProvider = ( props ) =>  {
    const [user, loading, error] = useAuthState(auth);
    const [ projects, setProjects ] = useState("Hello this is me the project context...");


    return (
        <ProjectContext.Provider value={[projects, setProjects ]} >
            { props.children }
        </ProjectContext.Provider>
    )
}