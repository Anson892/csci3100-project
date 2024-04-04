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

    const [itemsjs, setItemsJS] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [pointer, setpointer] = useState(0);

    useEffect (() => {
        const Searchurl = "http://localhost:8080/api/product/search"
        fetch(Searchurl,{
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "searchpointer": pointer,
                "name": "",
                "category": "",
                "orderby": "price",
                "order": "DESC",
                "minprice": 1,
                "maxprice": 100000,
                "minrating": 0,
                "maxrating": 5
            })
        })
        .then((res) => {
            return res.json();
        })
        .then( (response) => {
            var text = JSON.stringify(response)
            var array1 = (JSON.parse(text))
            setItemsJS (array1);
            setpointer (pointer+1)
            console.log(itemsjs)
            if (array1.length < 15) setHasMore(false)
        })

    },[])

    const fetchMoreData = () =>{
        setTimeout(() => {
            const Searchurl = "http://localhost:8080/api/product/search"
            fetch(Searchurl,{
                method : 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "searchpointer": pointer,
                    "name": "",
                    "category": "",
                    "orderby": "price",
                    "order": "DESC",
                    "minprice": 1,
                    "maxprice": 100000,
                    "minrating": 0,
                    "maxrating": 5
                })
            })
            .then((res) => {
                return res.json();
            })
            .then( (response) => {
                var text = JSON.stringify(response)
                var array1 = (JSON.parse(text))
                setItemsJS (itemsjs.concat(array1));
                console.log(itemsjs)
                setpointer (pointer+1)  
                console.log( pointer )
                if (array1.length < 5) setHasMore(false)
            })
        }, 1500);
    }

    return (
        <div >
        <Navbar/>
        <InfiniteScroll 
            className='PageContainer' 
            dataLength={itemsjs.length} 
            next={fetchMoreData} 
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<h4>End of Search Result</h4>}
        >
            <Topic/>
            <SortOrder/>
                <div className="ResultContainer">
                    {itemsjs.map((itemsjs,index)=>{
                        return (
                            <div key= {itemsjs.id}>
                                <ProductCard id = {itemsjs} />
                            </div>
                            )
                        })}
                </div>
            <TopButton/>
        </InfiniteScroll>
        </div>
            
    )   
}