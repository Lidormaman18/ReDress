import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

function MapComponent({ items }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const center = items.length > 0
        ? { lat: items[0].location.lat, lng: items[0].location.lng }
        : { lat: 32.0853, lng: 34.7818 }; // תל אביב כברירת מחדל

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            >
                {items.map((item, index) => (
                    <Marker
                        key={index}
                        position={item.location}
                        title={item.type}
                        onMouseOver={() => setSelectedItem(item)}
                        onClick={() => setSelectedItem(item)}
                    />
                ))}
                {selectedItem && (
                    <InfoWindow
                        position={selectedItem.location}
                        onCloseClick={() => setSelectedItem(null)}
                    >
                        <div>
                            <h3>{selectedItem.type}</h3>
                            <p><strong>Brand:</strong> {selectedItem.brand || 'N/A'}</p>
                            <p><strong>Size:</strong> {selectedItem.size}</p>
                            <p><strong>Color:</strong> {selectedItem.color}</p>
                            <p><strong>Condition:</strong> {selectedItem.condition}</p>
                            <p><strong>Price:</strong> {selectedItem.price}₪</p>
                            <p><strong>Location:</strong> {selectedItem.city}, {selectedItem.address}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default MapComponent;
