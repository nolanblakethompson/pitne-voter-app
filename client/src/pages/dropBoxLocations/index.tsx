import React from 'react';
import '@/app/globals.css'
import ButtonFill from '@/components/button/ButtonFill';
import NavBar from '@/components/nav/NavBar';
import ButtonFillEx from '@/components/button/ButtonFillEx';


export default function DropBoxLocations() {
    return (
        <div>

            {/* Header */}
            <div className='flex flex-col justify-center items-center p-4 text-center'>
                <h1 className='text-blue-700 font-bold text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Drop Box Locations</h1>
                <h1 className='font-semibold text-2xl p-5'>Find the nearest ballot drop-off station in your area</h1>
            </div>


            {/* ArcGIS Map */}
            <div className='flex flex-row justify-center items-center p-4 m-6' >
                <iframe src="https://tuftsgis.maps.arcgis.com/apps/instant/media/index.html?appid=9a84a0d949274b559b800b9ffc043b04" width="1000" height="600" style={{ border: 0 }} allowFullScreen>iFrames are not supported on this page.</iframe>
            </div>


            {/* Early voting button */}
            <div className='flex flex-col justify-center items-center p-4 m-10'>
                <p className='md:w-3/4 lg:w-3/4 sm:w-1/2 text-xl text-center font-semibold'>Need to know the early voting locations? They are typically available 1-2 weeks before the early voting period starts for an election. See the link below to find the location nearest to you.</p>
                <ButtonFillEx name='Early Voting Locations' link='https://www.boston.gov/departments/elections/early-voting-boston#map--737516' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-200' />
            </div>


            {/* Footer */}
            <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                <h1 className='font-semibold text-lg'>You may be wondering...</h1>
                <ButtonFill name='What&#39;s on the Ballot' link='/ballotInfo' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
                <ButtonFill name='Basic Election Info' link='/upcomingElections' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
            </div>
        </div>
    )
}