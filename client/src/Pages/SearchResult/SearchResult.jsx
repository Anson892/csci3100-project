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

const SortOrder = ({set}) => {
    return(
        <div>
            <p className='SortedByText'>Sorted By</p>
            <div className='SortByContainer'>
                <DropDownMenu items={["Highest Rating", "Lowest Rating", "Highest Price", "Lowest Price"]} initial={0} setFucn={set}/>
            </div>
        </div>
    )
}



export const SearchResult = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [orderByfetch,setOrderByfetch] = useState("avgrating")
    const [orderfetch,setOrderfetch] = useState("DESC")
    const keywords = searchParams.get('keywords');
    const status = searchParams.get('status');
    const category = searchParams.get('category')
    const minPrice = searchParams.get('min_price')
    const maxPrice = searchParams.get('max_price')
    const minRating = searchParams.get('min_rating')
    const maxRating = searchParams.get('max_rating')
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
                "name": keywords,
                "category": "", //! to be modified
                "orderby": orderByfetch,
                "order": orderfetch,
                "minprice": +minPrice,
                "maxprice": +maxPrice,
                "minrating": +minRating,
                "maxrating": +maxRating
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
            if (array1.length < 15) setHasMore(false)

            console.log(array1)
        })

    },[orderByfetch,orderfetch])

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
                    "name": keywords,
                    "category": "",
                    "orderby": orderByfetch,
                    "order": orderfetch,
                    "minprice": +minPrice,
                    "maxprice": +maxPrice,
                    "minrating": +minRating,
                    "maxrating": +maxRating
                })
            })
            .then((res) => {
                return res.json();
            })
            .then( (response) => {
                var text = JSON.stringify(response)
                var array1 = (JSON.parse(text))
                setItemsJS (itemsjs.concat(array1));    
                setpointer (pointer+1)  
                if (array1.length < 5) setHasMore(false)
            })
        }, 1500);
    }
    const [option,setoption] = useState()
    
    useEffect(()=>{
        console.log(option)
        switch(option){
            case 'Highest Rating':
            {
                setOrderfetch ( "DESC")
                setOrderByfetch ("avgrating")
            }
            break;
            case 'Lowest Rating':
            {
                setOrderfetch ( "ASC")
                setOrderByfetch ("avgrating")
            }
            break;
            case 'Highest Price':
            {
                setOrderfetch ( "DESC")
                setOrderByfetch ("price");
            }
            break;
            case 'Lowest Price':
            {
                setOrderfetch ( "ASC")
                setOrderByfetch ("price")
            }
            break;
            default:
            break;
        }
        setpointer(0);
    },[option])

    useEffect(()=>{
        console.log(orderByfetch)
        console.log(orderfetch)
    },[orderByfetch,orderfetch])


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
            <SortOrder set = {setoption}/>
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