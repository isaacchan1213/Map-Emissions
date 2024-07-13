import React, {useState} from 'react';
import Select from 'react-select';
import data from './car-data.json'; 

const options = data.map(item => ({
    value: item,
    label: `${item.Make} ${item.Model} ${item['Vehicle Class']} (${item['Engine Size(L)']}L)`
}));

function Dropdown() {
    const [co2, setco2] = useState(null);

    const handleChange = (selectedOption) => {
        console.log('Selected:', selectedOption);
        console.log('CO2 Emissions:', selectedOption.value['CO2 Emissions(g/km)']);
        setco2(selectedOption.value['CO2 Emissions(g/km)'])
    };

    return (
        <div>
            <Select
                options={options}
                placeholder="Type of Car"
                onChange={handleChange}
            />
            <p>{co2}</p>
        </div>
    );
}

export default Dropdown;
