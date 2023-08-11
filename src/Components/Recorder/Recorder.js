import React, { useState } from 'react'
import { FaMicrophone, FaPlayCircle, FaStopCircle } from 'react-icons/fa'

import './Recorder.css'
import { toBase64Encoded } from '../utils/MakeBase64'
import { extractGroup } from '../utils/General'
import { waSendAudio } from '../utils/WA'
import { type } from '@testing-library/user-event/dist/type'


const Recorder = ({Timeslice}) => {
    console.log(" "+ Timeslice)
    const [stop,setStop] = useState(false)
    const [status,setStatus] = useState(false)
    let groupData = JSON.parse(localStorage.getItem('GroupList'))
   console.log(groupData)
    function StartRecording(e){
        e.preventDefault()
        setStop(false)
        const frame = Timeslice === 0?30000:Timeslice
        if(groupData.length > 0){
            const contacts = extractGroup(groupData)
            navigator.mediaDevices.getUserMedia({audio:true}).then(stream =>{
                const mediaRecorder = new MediaRecorder(stream)
                mediaRecorder.start(frame)
                setStatus(mediaRecorder.state)
                let audioChunks =[]
                mediaRecorder.addEventListener('dataavailable',event=>{
                    audioChunks.push(event.data)
                    const newMp3 = new File([event.data],'test.mp3',{type:"audio/mp3"})
                    console.log("newMp3 ; "+newMp3.size+newMp3.type)
                       toBase64Encoded(newMp3).then((res)=>{
                        console.log(res)
                        const base64String = res.split(',',2)
                        contacts.length >0 ?contacts.map((contact,index) => {
                            waSendAudio(base64String[1],contact).then(result=>{console.log(result)})
                        }):console.log('No contacts')

                    })
                })
                
                // action to be handled when the recorder is stopped
                mediaRecorder.addEventListener('stop',()=>{
                    const audioBlob  = new Blob(audioChunks)
                    const url = URL.createObjectURL(audioBlob)
                   const element =  document.getElementById('track')
                    element.setAttribute('src',url)
                    const audio = new Audio(url)
                    audio.play()
                })
                // when the button is clicked to stop the recording...
                const stopButton = document.getElementById('stopRecord')
                stopButton.addEventListener('click',()=>{
                    mediaRecorder.stop()
                    setStatus(mediaRecorder.state)
                    
                })
                
            })
        }
        else{
            alert("No groups Choosen. Please choose atleast 1 group. Otherwise just an audio will be played")
        }
    }
    function StopRecording(e){
        e.preventDefault()
        setStop(true)
    }
  return (
   <>
    <div className={`record-state ${!stop?'on-state':'off-state'}`}>{!stop?status:'Recording Stopped'}</div>
     <div className='container-record'>
        <div className='mic-holder'>
            <div className='outer-circle'>
                <div className='inner-circle'>
                <FaMicrophone fontSize={200} style={{marginTop:'12px',}}/>
                </div>
            </div>
        </div>
     </div>
     <div className='buttons'>
        <div id='play'>
            <button onClick={(e)=>StartRecording(e)}><FaPlayCircle/> Record</button>
        </div>
        <div id='stop'>
            <button id='stopRecord' onClick={(e)=>StopRecording(e)}><FaStopCircle/> Stop </button>
        </div>
        <div id='audio'>
            <audio  controls>
                <source id='track' src='' type='audio/mpeg'/>
            </audio>
        </div>
        <div id='errors'>
            
        </div>
     </div>
   </>
  )
}

export default Recorder