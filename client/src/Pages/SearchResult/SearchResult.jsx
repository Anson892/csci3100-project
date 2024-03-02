import React from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { useSearchParams  } from 'react-router-dom';

export const SearchResult = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const keywords = searchParams.get('keywords')
    
    return (
        <div>
            <Navbar/>
            SearchResult (Keywords = {keywords})
        </div>        
    )
}
