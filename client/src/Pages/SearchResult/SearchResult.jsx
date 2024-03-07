import React, { useEffect, useState } from 'react';
import "./SearchResult.css"
import { Navbar } from '../../Components/Navbar/Navbar';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { useSearchParams  } from 'react-router-dom';
import { TopButton } from '../../Components/TopButton/TopButton'
import InfiniteScroll from 'react-infinite-scroll-component';

const  Topic = () => {
    return(
        <div className = 'TopicContainer'>
            <p className='Topic'>Search Result</p>
        </div>
    )
}

const SortOrder = () => {
    <></>
}

export const SearchResult = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const keywords = searchParams.get('keywords');

    const [dataSource, setDataSource] =useState(Array.from({length:12}))

    const fetchMoreData = () =>{
        setTimeout(() => {
            setDataSource(dataSource.concat(Array.from({length:8})))
        }, 500);
    }

    const [hasMore, setHasMore] = useState(true);

    return (
        <div >
        <Navbar/>
        <Topic/>
            <InfiniteScroll 
                className='ResultContainer' 
                dataLength={dataSource.length} 
                next={fetchMoreData} 
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                {dataSource.map((item,index)=>{
                    return (
                        <div>
                        <div><ProductCard/></div>
                        </div>
                    )
                })}
            </InfiniteScroll>
        <TopButton/>
        </div>
            
    )   
}