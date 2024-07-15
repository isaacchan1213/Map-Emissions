import React, {useState} from 'react';
import Select from 'react-select';
import data from './car-data.json'; 

const options = data.map(item => ({
    value: item,
    label: `${item.Make} ${item.Model} ${item['Vehicle Class']} (${item['Engine Size(L)']}L)`
}));

const Dropdown = ({getCO2}) => {
    const [co2, setCO2] = useState(null);

    const handleChange = (selectedOption) => {
        console.log('Selected:', selectedOption);
        console.log('CO2 Emissions:', selectedOption.value['CO2 Emissions(g/km)']);
        setCO2(selectedOption.value['CO2 Emissions(g/km)'])
        getCO2(selectedOption.value['CO2 Emissions(g/km)'])
    };

    return (
        <div>
            <Select
                options={options}
                placeholder="Type of Car"
                onChange={handleChange}
            />
        </div>
    );
}

export default Dropdown;
