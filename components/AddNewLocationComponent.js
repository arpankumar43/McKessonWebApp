import React, { useState, useEffect } from 'react';
import { fetchLocations, fetchAvailLocations, addLocation } from '@/helpers/axiosInstance';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFilter } from '@fortawesome/free-solid-svg-icons';

const AddNewLocationComponent = ({ results }) => {
  const [name, setName] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [locations, setLocations] = useState([]);

  
  useEffect(() => {

    loadLocations();
  }, []);

  //Fetching all locations from csv
  const loadLocations = async () => {
    try {
      const response = await fetchLocations();
      setLocations(response);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  //Adding new location
  const handleSubmit = async (event) => {
    event.preventDefault();

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const newLocation = {
      name,
      OpenTime: `${formattedDate}T${openingTime}`,//openingTime,
      CloseTime: `${formattedDate}T${closingTime}`, //closingTime,
    };

    try {
      await addLocation(newLocation);
      setName('');
      setOpeningTime('');
      setClosingTime('');
      loadLocations();
      alert('Location added successfully!');
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  //Filter locations 
  const handleFilterByAvailability = async (event) => {
    event.preventDefault();

    try {
      const response = await fetchAvailLocations();
      setLocations(response);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }


  return (
      <div className="py-8 px-4 p-4 mx-auto max-w-screen-xl lg:py-16 z-10 relative">
          
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4 text-left p-4 my-8 mt-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 bg-white/30 backdrop-blur-sm">

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-2xl dark:text-white">
              Add Location
            </h2>
            <span className='text-black-500'>
              Add new location to the existing list in CSV file
            </span>
            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-lg">
              <div className="mb-4 mr-4">
                <label className="block text-sm font-medium text-black-600">Location Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4 mr-4">
                <label className="block text-sm font-medium text-black-600">Opening Time:</label>
                <input
                  type="time"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4 mr-4">
                <label className="block text-sm font-medium text-black-600">Closing Time:</label>
                <input
                  type="time"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add Location
              </button>
            </form>
          </div>

          <div>
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" onClick={handleFilterByAvailability} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                  <FontAwesomeIcon icon={faFilter} className="text-sm" /> Filter By Availability 
                </button>
                <button type="button" onClick={() => loadLocations()} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                  <FontAwesomeIcon icon={faEye} className="text-sm" /> View All CSV data
                </button>
            </div>
            <p className='text-white'>Filter by availability between 10am and 01pm</p>
            
            <table className="table-auto mt-4">
              <thead>
                <tr>
                  <th className="border border-white px-4 py-2 text-white">Location</th>
                  <th className="border border-white px-4 py-2 text-white">Opening Time</th>
                  <th className="border border-white px-4 py-2 text-white">Closing Time</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, index) => (
                  <tr key={index}>
                    <td className="border border-white px-4 py-2 text-white">
                      <strong>{location.name}</strong>
                    </td>
                    <td className="border border-white px-4 py-2">{moment(location.openTime).format("hh:mm: a")}</td>
                    <td className="border border-white px-4 py-2">{moment(location.closeTime).format("hh:mm a")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
  );
};

export default AddNewLocationComponent;