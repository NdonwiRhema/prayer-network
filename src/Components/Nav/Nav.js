import React from 'react'
import { FaCogs, FaMicrophone } from 'react-icons/fa'
import './Nav.css'
const Nav = ({active,setActive}) => {

  return (
    <div className='container'>
        <div className='holder-div-1'>
            <>
            <h4> Prayer Network Studio</h4>
            </>
        </div>
        <div className='holder-div-2'>
            <div id='record'>
                <span className='links' onClick={()=>setActive('record')}><FaMicrophone/> Record</span>
            </div>
            <div id='settings'>
                <span className='links' onClick={()=>setActive('settings')}><FaCogs/> Settings</span>
            </div>
        </div>
        <div className='holder-div-3'>
            <></>
        </div>
    </div>
  )
}

export default Nav