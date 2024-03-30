import React, { useEffect, useState } from 'react';
import "./SearchResult.css"
import { Navbar } from '../../Components/Navbar/Navbar';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { useSearchParams  } from 'react-router-dom';
import { TopButton } from '../../Components/TopButton/TopButton'
import InfiniteScroll from 'react-infinite-scroll-component';
import { DropDownMenu } from '../../Components/Forms/DropDownMenu/DropDownMenu';

const  Topic = () => {
    return(
        <div className = 'TopicContainer'>
            <p className='Topic'>Search Result</p>
        </div>
    )
}

const SortOrder = () => {
    const [Test, setTest]=useState();

    return(
        <div>
            <p className='SortedByText'>Sorted By</p>
            <div className='SortByContainer'>
                <DropDownMenu items={["Highest Rating", "test1", "test2", "test3"]} initial={0} setFucn={setTest}/>
            </div>
        </div>
    )
}

export const SearchResult = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const keywords = searchParams.get('keywords');

    const [dataSource, setDataSource] =useState(Array.from({length:15}))

    const fetchMoreData = () =>{
        setTimeout(() => {
            setDataSource(dataSource.concat(Array.from({length:5})))
        }, 1500);
    }

    const [hasMore, setHasMore] = useState(true);

    return (
        <div >
        <Navbar/>
        <InfiniteScroll 
            className='PageContainer' 
            dataLength={dataSource.length} 
            next={fetchMoreData} 
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            <Topic/>
            <SortOrder/>
                <div className="ResultContainer">
                    {dataSource.map((item,index)=>{
                        return (
                            <ProductCard/>
                            )
                        })}
                </div>
            <TopButton/>
        </InfiniteScroll>
        </div>
            
    )   
}