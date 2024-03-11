import React, { useState, useEffect } from 'react';

// Advanced component with useEffect - March 2024
const Advanced8223 = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulating API call - learning async operations
        const fetchData = async () => {
            try {
                setLoading(true);
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                setData({
                    id: 8223,
                    message: 'Data loaded successfully',
                    timestamp: '2024-03-11',
                    status: 'active'
                });
            } catch (err) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading Advanced8223...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="advanced-component">
            <h3>Advanced Component 8223</h3>
            <p>Learning useEffect and async operations - March 2024</p>
            
            {data && (
                <div className="data-display">
                    <p>ID: {data.id}</p>
                    <p>Message: {data.message}</p>
                    <p>Status: {data.status}</p>
                    <p>Created: {data.timestamp}</p>
                </div>
            )}
            
            <button onClick={() => window.location.reload()}>
                Refresh Component
            </button>
        </div>
    );
};

export default Advanced8223;
