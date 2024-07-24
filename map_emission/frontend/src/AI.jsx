import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './AI.css'

const AI = ({carModel, transportation, distance}) => {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('AI component props:', { carModel, transportation, distance });
        if (transportation && distance) {
            const fetchResponse = async () => {
                setLoading(true);
                setError(null);

                try {
                    const requestData = {
                        transportation,
                        distance
                    };

                    if (transportation === 'DRIVING' && carModel) {
                        console.log("Car model running", carModel)
                        requestData.carModel = carModel;
                    }
                    console.log('Sending request with:', requestData);
                    const result = await axios.post('http://localhost:5000/api/get-suggestions', requestData);
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
        <div className="suggestion-box">
            <h2>AI Suggestions</h2>
            {loading && <p>Loading...</p>}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            {response && <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>}
        </div>
    );
}

export default AI;