import '../componentsCSS/form.css'
import { useState, useEffect } from 'react'

const Form = ({ base }) => {

    const [city, setCity] = useState('')
    const [visa, setVisa] = useState(false)
    const [rendering, setRendering] = useState(false)
    const [mainList, setMainList] = useState([...base])


    const citySearch = e => {

        setCity(e.target.value)
        setRendering(true)
        const lowerWithoutspace = city.replace(/ /g, '').toLowerCase()
        const cityFilter = mainList.filter(town => town.ciudad.replace(/ /g, '').toLowerCase()
            .includes(lowerWithoutspace))
        setMainList([...cityFilter])
        if (city === '') setMainList([...base])

    }

    const search = e => {

        e.preventDefault()
        setRendering(true)
        setMainList([...base])
        setCity('')
    }

    useEffect(() => {
        
        if (visa) {
            const VisaTrue = base.filter(jobs => jobs.visa === 'Yes')
            setMainList(VisaTrue)
            setRendering(true)     
        } 
        
        else {
            const VisaFalse = base.filter(jobs => jobs.visa === 'No')
            setMainList(VisaFalse)
        }}, [visa])


    return (
        <div className='formContainer'>
            <form className="formulario" id="bar">
                <div className='mainInput'>
                    <input type='text' onChange={citySearch} value={city}
                        placeholder='Escribe una ciudad de USA' />
                </div>

                <div className='setting'>
                    <button onClick={search} className='query'>Todas las Ofertas</button>
                    <label htmlFor="visa">Ofertas con visa</label>
                    <input type='checkbox' onChange={()=> setVisa(!visa)} value={visa} id='visa' />
                </div>
            </form>
            <div className='listJobs'>
                <ul>
                    {rendering &&
                        mainList.map(job => <li key={job.id}>

                            <div className='titleContainer'>
                                <h3>{job.titulo}</h3>
                                <p>{job.empresa}</p>
                            </div>
                            <div className='descriptionContainer'>
                                <p>Sueldo anual: US{job.sueldo.toLocaleString('en-US')}</p>
                                <p>Trabajo remoto: {job.remoto ? 'Sí' : 'No'}</p>
                                <p>Oportunidad de visa: {job.visa ? 'Sí' : 'No'}</p>
                                <p>Ciudad: {job.ciudad} </p>
                                <a href={job.enlace} rel='nooppener noreferrer'
                                    target='_blank'>Postular</a>
                            </div>

                        </li>)}
                </ul>
            </div>
        </div>


    );
}

export default Form;