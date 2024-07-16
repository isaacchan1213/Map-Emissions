import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import axios from 'axios';

const Dropdown = ({getCO2, reset}) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [co2, setCO2] = useState(null);

    
    useEffect(() => {
        if (reset) {
            setSelectedOption(null);
        }
    }, [reset]);
    
    
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/get-cars')
            .then(response => {
                const data = response.data;
                const formatedOptions = data.map(item => ({
                    value: item,
                    label: `${item.Make} ${item.Model} ${item['Vehicle Class']} (${item['Engine Size(L)']}L)`
                }));
                setOptions(formatedOptions);
            })
            .catch(error => {
                console.error('Error fetching data', error);
        });
    }, []);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log('Selected:', selectedOption);
        console.log('CO2 Emissions:', selectedOption.value['CO2 Emissions(g/km)']);
        setCO2(selectedOption.value['CO2 Emissions(g/km)']);
        getCO2(selectedOption.value['CO2 Emissions(g/km)']);
    };

    return (
        <div>
            <Select
                options={options}
                placeholder="Type of Car"
                onChange={handleChange}
                value={selectedOption}
            />
        </div>
    );
}

export default Dropdown;
