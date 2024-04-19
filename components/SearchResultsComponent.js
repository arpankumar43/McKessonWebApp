import React from 'react';

const SearchResultsComponent = ({ results }) => {
  return (
    <div class="text-left p-4 my-8 mt-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 bg-white/30 backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 text-black-500">Total Search Results found - <span className='dark:text-white'>{results ? results.length : '0' }</span></h2>
      <dl class="text-black-900 divide-y divide-black-200 dark:text-white dark:divide-gray-700">
        {results.map((result, index) => (
            <div key={index} class="flex flex-col pb-3 mt-3">
                <dt class="mb-1 text-black-500 md:text-lg mt-4">
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-white font-medium">
                        {result.name}
                    </a>
                </dt>
                <dd class="text-sm font-bold">
                    <p className="text-black mt-1">{result.snippet}</p>
                </dd>
            </div>
        ))}
      </dl>
    </div>
  );
};

export default SearchResultsComponent;