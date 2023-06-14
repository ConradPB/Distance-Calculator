import React, { useState } from 'react';

function Calculator() {
    const [location1, setLocation1] = useState ({lat: 0, lng: 0});
    const [location2, setLocation2] = useState ({lat: 0, lng: 0});
    const [distance, setDistance] = useState(0);

    const calculateDistance = () => {
        const R = 6371; // Radius of the earth (km)
        const latD = (location2.lat - location1.lat) * (Math.PI / 180)
        const lngD = (location2.lng - location1.lng) * (Math.PI / 180)

        const lat1 = location1.lat * (Math.PI / 180)
        const lat2 = location2.lat * (Math.PI / 180)

        const a = Math.sin(latD / 2) * Math.sin(latD / 2) +
        Math.sin(lngD / 2) * Math.sin(lngD / 2) * Math.cos(lat1)
        * Math.cos(lat2);

        const c = Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c;

        setDistance(d)
    };

    return (

        <div>
            <h1>Distance Calculator</h1>
            <div>
                <h2>Location 1</h2>
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
            <div>
                <h2>Location 2</h2>
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