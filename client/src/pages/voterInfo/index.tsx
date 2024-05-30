import React from 'react';
import Button from '@mui/material/Button';
import '@/app/globals.css'

export default function VoterInfo() {
    return (
        <div>
            <div className='flex flex-col justify-center items-center p-4 text-center my-4'>
                <h1 className='font-semibold text-2xl'>Here is everything you need to know about your <br />voter status and personal voting logistics!</h1>
                <p className='mt-8 mb-4'>Can’t vote in person or want to vote early?</p>
                <Button variant="contained" className='p-4 m-4 rounded-full bg-blue-700 text-white'>Early Voting Options</Button>
            </div>

            <div className='flex flex-col justify-center items-center p-4 my-4'>
                <h1 className='font-semibold text-left' style={{ marginLeft: '0px', paddingLeft: '550px' }} >Basic Voter Info</h1>
                <p className='p-4 bg-blue-100 rounded-full w-1/2 text-center'><strong> County: </strong>Suffolk</p>
            </div>

            <div className='flex flex-col justify-center items-center p-4 my-4'>
                <h1 className='font-semibold text-left' style={{ marginLeft: '0px', paddingLeft: '550px' }} >Polling Location</h1>
                <p className='mt-6 mb-4 text-left' style={{ marginLeft: '0px', paddingRight: '100px' }}>Reminder: You can vote at any polling location during the early voting period,<br/>but you must vote at the location below during election day.</p>
                <p className='p-4 bg-blue-100 rounded-full w-1/2 text-center' > Eastover Elementary School<br/> 500 Cherokee Rd<br/> Boston, MA, 02215<br/></p>
            </div>

            <div className='flex flex-col justify-center items-center p-4 text-center my-4'>
                <h1 className='font-semibold text-l'>Now that you know where you can vote, let’s explore exactly who and what you are voting for.</h1>
                <Button variant="contained" className='p-4 m-4 rounded-full bg-blue-700 text-white'>Ballot Info</Button>
            </div>
        </div>

    )
}