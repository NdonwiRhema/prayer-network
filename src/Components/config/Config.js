import React, { useEffect, useRef, useState } from 'react'
import {FaWhatsapp, FaWindowClose } from 'react-icons/fa'

import './Config.css'
import {  StatusCheck, getWaGroups, waLogOut } from '../utils/WA'
import URLDETAILS from '../utils/Params'
const Config = ({Timeslice,setTimeslice,groups,setGroups}) => {
    console.log( groups+" "+ Timeslice)
    const GroupRef = useRef(null)
    const timeRef = useRef(null)
    const TransferRef = useRef('Chunks')
    const LocalGroupInfo = JSON.parse(localStorage.getItem('GroupList'))
    const [grpId,setGrpId] = useState(0)
    const [Status,setStatus] = useState()
    const [WAGroups,setWAGroups] = useState([])
    
    
    function ApplySettings(e){
        e.preventDefault()
        setTimeslice(timeRef.current.value)
        console.log(groups)
        const GroupList = JSON.stringify(groups)
        localStorage.setItem('GroupList',GroupList)
    }
    function AddRow(e){
        console.log(groups)
        console.log(GroupRef.current.value)
        const newGroup = {
            group:GroupRef.current.value,
            groupId:grpId,
            
        }
        setGroups([...groups,newGroup])
        setGrpId(grpId+1)
    }
    function RemoveRow(groupId){
        setGroups(groups =>groups.filter((item)=>item.groupId !== groupId))
    }
    function checkConnStatus(){
        StatusCheck().then(response =>{
            setStatus(response.status.accountStatus.status)
            console.log(response)
        }).catch((err)=>console.error(err))
    }
    function getGroups(){
        getWaGroups().then(response =>{
            let Arr = []
            response.forEach(element => {
                     console.log(element)
                        const newGroupInfo = {
                            id:element.id,
                            name:element.name
                        }
                    Arr.push(newGroupInfo)
            });
            setWAGroups([...WAGroups,...Arr])
        }).catch((err)=>console.error(err))
        
    }
    function SessionOut(){
       waLogOut().then(response=>{
        console.log(response)
       }).catch((err)=>console.log(err))
    }
    useEffect(()=>{
        checkConnStatus()
       if(Status === 'authenticated'){
        getGroups()
       }
    },[setStatus,groups])
  return (
    <div className='config-container'>
        <div className='Qr-section'>
            <div> 
                <h6>Open Whatsapp on your Mobile to Scan the Qr Code</h6>
            </div>
            <div>
                {
                    Status==='authenticated'?(
                        <button className='logOut' onClick={()=>SessionOut()}>Log Out From this Device</button>
                    ):(
                        <img src={`https://api.ultramsg.com/${URLDETAILS.INSTANCE_ID}/instance/qr?token=${URLDETAILS.TOKEN}`} alt='QRCODE LOADING'/>
                    )
                }
                
            </div>
        </div>
        <div className='config'>
           <div>
            <div className='selected-groups'>
                {groups.length >0 ? groups.map((group,index)=>(
                    <div className='group-holder' key={index}> {group.group}<span onClick={()=>RemoveRow(group.groupId)}><FaWindowClose/></span></div>
                )):(<h6 >No Whatsapp Groups Selected. Please Pick Atleast one group</h6>)}
            </div>
                <div className='field-group'>
                       <div>
                            <label>Choose Recipient Group : </label>
                                {/* show all the groups from the Auth User */}
                                <select ref={GroupRef}>
                                        <option value={''}></option>
                                        {WAGroups.length>0?WAGroups.map((waGrp,index)=>(
                                            <option className='wa-link' value={waGrp.name +'-'+waGrp.id} key={index}>{waGrp.name}</option>
                                        )):('')}
                                        
                                </select>
                       </div>
                        <button onClick={(e)=>AddRow(e)}> <FaWhatsapp/> Add Whatsapp Group</button>
                </div>
                    <fieldset>
                        <legend>Audio </legend>
                        <div className='field-group'>
                            <div>
                                <label> Duration</label>
                                <select ref={timeRef}>
                                    <option value={0}></option>
                                    <option value={30000}>30seconds</option>
                                    <option value={60000}>1 minute</option>
                                    <option value={120000}>2 minutes</option>
                                </select>
                            </div>
                            <></>
                        </div>
                    </fieldset>
                <div className='field-group'>
                        <button onClick={(e)=>ApplySettings(e)}>Apply</button>
                </div>
           </div>
           <div className='info'>
                <h2> Info </h2>
                <hr/>

                <div>
                    <span>Recipient Group(s) : </span>
                    {groups.length === 0 ?LocalGroupInfo.map((grp,index)=>(
                        <span key={index} className='grpItem'>{grp.group}, </span>
                    )):groups.map((grp,index)=>(
                        <span key={index} className='grpItem'>{grp.group}, </span>
                    ))} 
                </div>
                <div>
                    <span>Audio Duration : </span>
                    <span>{Timeslice/60000} minutes</span>
                </div>
                <div>
                    <span>Transfer Mode : </span>
                    <span>{TransferRef.current.value}</span>
                </div>
           </div>
        </div>
    </div>
  )
}

export default Config