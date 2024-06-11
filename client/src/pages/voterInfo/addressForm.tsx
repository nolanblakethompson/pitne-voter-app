/* Form asking for user address and getting polling location from Google Civic
 * API. Note: API key is in .env file
*/

import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';


// Set base URL for Axios
const api = axios.create({
    baseURL: 'http://localhost:3001', // Point this to server URL
});


const AddressForm: React.FC = () => {
    // Functions and variables to set polling data
    const [address, setAddress] = useState('');
    const [pollingLocation, setPollingLocation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [pollingStreet, setPollingStreet] = useState<string | null>(null);
    const [pollingCity, setPollingCity] = useState<string | null>(null);
    const [pollingState, setPollingState] = useState<string | null>(null);
    const [pollingZip, setPollingZip] = useState<string | null>(null);
    const [pollingHours, setPollingHours] = useState<string | null>(null);

    // Call API when address is submitted
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setPollingLocation(null);
        setPollingStreet(null);
        setPollingCity(null);
        setPollingState(null);
        setPollingZip(null);
        setPollingHours(null);
        setError(null);

        try {
            const response = await api.get('/api/lookup', {
                params: { address },
            });

            const data = response.data;

            // Set polling location and hours or error if no polls
            if (data.pollingLocations && data.pollingLocations.length > 0) {
                setPollingLocation(data.pollingLocations[0].address.locationName);
                setPollingStreet(data.pollingLocations[0].address.line1);
                setPollingCity(data.pollingLocations[0].address.city);
                setPollingState(data.pollingLocations[0].address.state);
                setPollingZip(data.pollingLocations[0].address.zip);
                setPollingHours(data.pollingLocations[0].pollingHours);
            } else {
                setError('No polling location found for this address yet. Assigned polling locations are usually available 2-4 weeks before an election. Please check back later or re-enter the address to try again.');
            }
        } catch (error) {
            setError('No polling location found for this address yet. Assigned polling locations are usually available 2-4 weeks before an election. Please check back later or re-enter the address to try again.');
        }
    };

    // Address form and displayed polling location
    return (
        <div className='flex flex-col justify-center items-center p-4 my-6'>

            {/* Address form */}
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 300 }}>
            <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="outlined" className='p-3 mt-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-blue-100'>
                Submit Address
            </Button>
            </form>

            {/* Polling location if found, error if not */}
            {(pollingLocation || error) && (
                <div className='grid grid-cols-4 mt-8'>
                    <div className='md:col-span-1 hidden md:block'>
                    </div>
                    <div className="space-y-4 mx-10 my-1 p-8 rounded-2xl shadow-2xl border border-gray-200  col-span-4 lg:col-span-2 bg-white">
                        <div className="space-y-4 w-full px-4">
                            <div className="w-full px-4 text-left text-lg">
                                {pollingLocation && (
                                    <div>
                                        <p>{pollingLocation}</p>
                                        <p>{pollingStreet}</p>
                                        <p>{pollingCity}, {pollingState}</p>
                                        <p>{pollingZip}</p>
                                        <br/><p><strong>Polling Hours: {pollingHours}</strong></p>
                                    </div>
                                )}
                                {error && (
                                    <Typography variant="h6" color="error">{error}</Typography>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='md:col-span-1 hidden md:block'>
                    </div>
                </div>
            )}
      </div>
  );
};

export default AddressForm;