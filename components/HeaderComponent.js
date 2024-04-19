import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const HeaderComponent = () => {
  return (
    <nav className="bg-transparent py-4 px-6 flex justify-between items-center">
      <div>
        <Link href="/">
          <span className="text-white text-xl font-bold">
            Microsoft Bing 
          </span>
        </Link>
      </div>
      <div>
        {/* <Link href="/">
          <span className="text-white text-sm mr-4">About</span>
        </Link> */}
        <Link  href="/backendApi" className="text-white text-sm mr-4 bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2 ">
          <span>Backend API Test </span><FontAwesomeIcon icon={faArrowRight} className="text-lg" />
        </Link>
      </div>
    </nav>
  );
};

export default HeaderComponent;