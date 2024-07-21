import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AI = ({carModel, transportation, distance}) => {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('AI component props:', { carModel, transportation, distance });
        if (carModel && transportation && distance) {
            const fetchResponse = async () => {
                setLoading(true);
                setError(null);

                try {
                    console.log('Sending request with:', { carModel, transportation, distance });
                    const result = await axios.post('http://localhost:5000/api/get-suggestions', {
                        carModel,
                        transportation,
                        distance
                    });
                    console.log('Received response:', result.data);
                    setResponse(result.data.response || "No response from LangChain");
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchResponse()
        }
    }, [carModel, transportation, distance]);

    return(
        <div>
            <h2>AI Suggestions</h2>
            {loading && <p>Loading...</p>}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            {response && <p>{response}</p>}
        </div>
    );
}

export default AI;