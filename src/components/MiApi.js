import { useState, useEffect } from 'react'
import '../componentsCSS/error.css'

const MiApi = ( {setBase} ) => {

    const [ err, setErr] = useState(false)
    const url = 'https://devitjobs.us/api/jobslight'
    

    const ApiQuery = async () => {

        try {
            const res = await fetch(url)
            const data = await res.json()
            
            const dataBase = data.map( job => ({
                id: job._id,
                empresa: job.company,
                jornada: job.jobType,
                titulo: job.name,
                remoto: job.isFullRemote,
                sueldo: job.annualSalaryFrom,
                ciudad: job.actualCity,
                visa: job.hasVisaSponsorship,
                enlace: job.redirectJobUrl,
                lenguajes: job.filterTags
            }))

            setBase(dataBase)
        }

        catch {
            setErr(true)
        }
    }

    const reload = () => {
        setErr(false)
        window.location.reload()
    }

    useEffect(() => {
        ApiQuery()
    },[])
    
    return(
        <>
        { err && 
        <div className='error'>
            <button className='err-btn' onClick={reload}>Recargar Página</button>
        </div> 
        }
        </>
    )
}

export default MiApi;   