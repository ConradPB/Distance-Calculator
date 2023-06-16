import React, { useState, useEffect } from 'react';
import './Calculator.css';

function Calculator() {
    const [location1, setLocation1] = useState ({lat: 0, lng: 0});
    const [location2, setLocation2] = useState ({lat: 0, lng: 0});
    const [distance, setDistance] = useState(0);

    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const [reverseAddress1, setReversedAddress1] = useState('');
    const [reverseAddress2, setReversedAddress2] = useState('');

    const getCoordinates = async (address) => {
        const apiKey = '09dd832a57f24fb7adae8701e8663196';
        const response = await
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${apiKey}`);
        const data = await response.json();
        const coordinates = data.results[0].geometry;
        return coordinates;
    }

    const getAddress = async (coordinates) => {
        const apiKey = '09dd832a57f24fb7adae8701e8663196';
        const response = await
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${coordinates.lat}+${coordinates.lng}&key=${apiKey}`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted;
        return address;
        } else {
            console.log('Unable to find address for given location')
            return 'No address found';
        }
    }

    useEffect (() => {
        const updateAddresses = async () => {
            if (location1.lat && location1.lng) {
                const address = await getAddress(location1);
                setReversedAddress1(address)

            }

            if (location2.lat && location2.lng) {
                const address = await getAddress(location2);
                setReversedAddress2(address)

            }
        }

        updateAddresses();

    }, [location1, location2])




    const calculateDistance = async () => {
        console.log('location1:', location1);
        console.log('location2:', location2);

        let coordinates1;
        let coordinates2;

        if (address1){

        coordinates1 = await getCoordinates(address1);
        setLocation1(coordinates1);
} else {
    coordinates1 = location1;
}
        if (address2){
        coordinates2 = await getCoordinates(address2);
        setLocation2(coordinates2);
} else {
    coordinates2 = location2;

        }

        const R = 6371; // Radius of the earth (km)
        console.log('coordinates1:', coordinates1);
        console.log('coordinates2:', coordinates2);
        const latD = (coordinates2.lat - coordinates1.lat) * (Math.PI / 180)
        const lngD = (coordinates2.lng - coordinates1.lng) * (Math.PI / 180)

        const lat1 = coordinates1.lat * (Math.PI / 180)
        const lat2 = coordinates2.lat * (Math.PI / 180)

        const a = Math.sin(latD / 2) * Math.sin(latD / 2) + Math.sin(lngD / 2) * Math.sin(lngD / 2) * Math.cos(lat1)
        * Math.cos(lat2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c;

        setDistance(d)
    };

    
    return (

        <div className='container'>
            <h1>Distance Calculator</h1>
            <div className='location'>
                <h2>Location 1</h2>
                <p>Address: {reverseAddress1 || address1} </p>
                <label>
                    Address: 
                    <input 
                    type='text'
                    value={address1} 
                    onChange={e => setAddress1(e.target.value)} 
                    />
                    <br />
                </label>
                <label>
                    Latitude: 
                    <input 
                    type='number' 
                    value={location1.lat}
                    onChange={e => setLocation1({ ...location1, lat: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    Longitude: 
                    <input 
                    type='number' 
                    value={location1.lng}
                    onChange={e => setLocation1({ ...location1, lng: e.target.value })}
                    />
                </label>
            </div>
            <div className='location' >
                <h2 >Location 2</h2>
                <p>Address: {reverseAddress2 || address2} </p>
                <label>
                    Address: <input type='text' 
                    value={address2} 
                    onChange={e => setAddress2(e.target.value)} 
                    />
                </label>
                <br/>
                <label>
                    Latitude: 
                    <input 
                    type='number'
                    value={location2.lat}
                    onChange={e => setLocation2({ ...location2, lat: e.target.value })}
                    />
                </label>
                <br/>
                <label>
                    Longitude: 
                    <input 
                    type='number' 
                    value={location2.lng}
                    onChange={e => setLocation2({ ...location2, lng: e.target.value })}
                    />
                </label>
            </div>
            <button onClick={calculateDistance}>Calculate Distance</button>
            <p>Distance: {distance} km</p>
        </div>
    );

}



export default Calculator;