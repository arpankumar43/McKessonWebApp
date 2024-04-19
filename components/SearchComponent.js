import React, { useState } from 'react';
import { getBingSearch } from '@/helpers/axiosInstance';
import SearchResultsComponent from './SearchResultsComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_BING_API_KEY; //Access environment variable 

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      //Call Bing search endpoint with subscription key from azure
      const response = await getBingSearch(query, apiKey);
      //Get results
      setResults(response.webPages.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
            <a href="#" className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">New</span> <span className="text-sm font-medium">The demo application for McKesson! See what's new</span> 
                <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
            </a>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Ask me anything!</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">Search your query here and get results from the Bing search API.</p>
            
            {/* Search for the query */}
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">   
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <FontAwesomeIcon icon={faSearch} className="mr-2 text-white" />
                    </div>
                    <input 
                        type="text" 
                        value={query} 
                        onChange={handleChange} 
                        placeholder="Ask me..." 
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required />
                    <button 
                        type="submit" 
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search!
                    </button>
                </div>
            </form>

            {/* Display Search Results */}
            {results.length > 0 && <SearchResultsComponent results={results} />}
        </div>
    </section>
  );
};

export default SearchComponent;
