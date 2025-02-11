import React, { useState, useRef, useEffect } from 'react';
import MapComponent from './MapComponent';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

function Dashboard() {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        type: '',
        brand: '',
        size: '',
        color: '',
        condition: '',
        price: '',
        city: '',
        address: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const autocompleteRef = useRef(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/items/all');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.geometry) {
            const location = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };

            setFormData({ ...formData, address: place.formatted_address, location });
        } else {
            alert('Please select a valid address.');
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();

        try {
            const newItem = {
                ...formData,
                user: "Shir",
                email: "shir@example.com",
                phone: "123456789"
            };

            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });

            if (!response.ok) {
                throw new Error('Failed to add item to the server.');
            }

            const savedItem = await response.json();
            setItems([...items, savedItem]);
            alert('Item added successfully!');
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item. Please try again.');
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/items/${id}`, { method: 'DELETE' });
            setItems(items.filter(item => item._id !== id));
            alert('Item deleted successfully!');
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item. Please try again.');
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredItems = items.filter(item =>
        item.type.toLowerCase().includes(searchQuery) ||
        item.city.toLowerCase().includes(searchQuery)
    );

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 2 }}>
                <MapComponent items={filteredItems} />
            </div>

            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f7f7f7' }}>
                <h2>Add New Item</h2>
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    libraries={['places']}
                >
                    <form onSubmit={handleAddItem}>
                        <input
                            type="text"
                            name="type"
                            placeholder="Type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="brand"
                            placeholder="Brand"
                            value={formData.brand}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="size"
                            placeholder="Size"
                            value={formData.size}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="color"
                            placeholder="Color"
                            value={formData.color}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="condition"
                            placeholder="Condition"
                            value={formData.condition}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        <Autocomplete
                            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                            onPlaceChanged={handlePlaceSelect}
                        >
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </Autocomplete>
                        <button type="submit">Add Item</button>
                    </form>
                </LoadScript>

                <h2>Search Items</h2>
                <input
                    type="text"
                    placeholder="Search by type or city"
                    value={searchQuery}
                    onChange={handleSearch}
                />

                <h2>Items</h2>
                <div>
                    {filteredItems.map(item => (
                        <div
                            key={item._id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                borderBottom: '1px solid #ccc'
                            }}
                        >
                            <p>{item.type} - {item.city}</p>
                            <button
                                onClick={() => handleDeleteItem(item._id)}
                                style={{
                                    backgroundColor: '#ff4d4d',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
