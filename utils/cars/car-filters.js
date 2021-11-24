export const CAR_FILTERS = [
    {id: 1, filter: 'Type', path: 'supplied_car.vehicle_type.type', dynamic: true, values: []},   
    {id: 2, filter: 'Company', path: 'supplied_car.model.company.name', dynamic: true, values: []},      
    {id: 3, filter: 'Release Year', path: 'supplied_car.release_year', dynamic: false, values: []},   
    {   
        id: 4,
        filter: 'Color',
        path: 'supplied_car.dominant_color',
        dynamic: true, 
        values: ['White', 'Black', 'Gray', 'Charcoal', 'Silver', 'Blue', 'Red', 'Orange', 'Yellow', 'Others']
    },   
    {
        id: 5,
        filter: 'Transmission',
        path: 'supplied_car.transmission',
        dynamic: false,
        values: ['AUTOMATIC', 'MANUAL']
    },   
    {
        id: 6,
        filter: 'Drive Type',
        path: 'supplied_car.drive_type',
        dynamic: false,
        values: ['2WD', '4WD']
    },
    {
        id: 7,
        filter: 'Fuel Type',
        path: 'supplied_car.fuel_type',
        dynamic: false,
        values: ['Diesel', 'Petrol', 'Lpg', 'Electric', 'Others']
    },   
    {id: 8, filter: 'Steering Position', path: 'supplied_car.steering', dynamic: false, values: ['LEFT', 'RIGHT']},   
    {
        id: 9,
        filter: 'Condition',
        path: 'supplied_car.second_hand',
        dynamic: false,
        values: ['USED', 'NEW']
    }
];