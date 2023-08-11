import React, { useState } from 'react'
import Nav from '../Components/Nav/Nav'
import Recorder from '../Components/Recorder/Recorder'
import Config from '../Components/config/Config'

const RecordScreen = () => {
    const [active,setActive] = useState('record')
    const [groups,setGroups]=useState([])
    const [Timeslice,setTimeslice] =useState(0)
    // const [Transfer,setRecipient] =useState()
  return (
    <div>
        <Nav active={active} setActive={setActive}/>
        <div>
            {
                active === 'record'?(
                    <Recorder Timeslice = {Timeslice} />
                ):(
                    <Config groups={groups} setGroups={setGroups} Timeslice = {Timeslice} setTimeslice={setTimeslice}/>
                )
            }
        </div>
    </div>
  )
}

export default RecordScreen