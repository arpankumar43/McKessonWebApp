import React, { useState, useEffect } from 'react';
import { fetchLocations, addLocation } from '@/helpers/axiosInstance';
import moment from 'moment';

const AddNewLocationComponent = ({ results }) => {
  const [name, setName] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [locations, setLocations] = useState([]);

  
  useEffect(() => {

    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const response = await fetchLocations();
      setLocations(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

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


  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 z-10 relative">
        <div className="text-left p-4 my-8 mt-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 bg-white/30 backdrop-blur-sm">
          
          <div className="grid grid-cols-2 gap-4">

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
              <span className='text-black-500'>
                Current CSV data
              </span>
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
      </div>
    </section>
  );
};

export default AddNewLocationComponent;