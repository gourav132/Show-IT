import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  {PreviewProvider}  from './context/PreviewContext.jsx'
import { ProjectProvider } from './context/ProjectContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <PreviewProvider>
      <ProjectProvider>
        <App /> 
      </ProjectProvider>
    </PreviewProvider>
)
