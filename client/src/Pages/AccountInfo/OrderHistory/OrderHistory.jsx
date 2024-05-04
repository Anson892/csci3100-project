import React, { useContext, useEffect, useState } from 'react';
import { Order } from './Order'
import { AuthContext } from '../../../Context/AuthContext';
import '../AccountInfo.css'

export const OrderHistory = () => {

  const { userAuth } = useContext(AuthContext)
  const [orderHistory, setOrderHistory] = useState()

  useEffect(() => {
      fetch(process.env.REACT_APP_BACKEND_URL + '/api/order/history/'+userAuth.id, {method:'GET'})
      .then(res => {
        return res.json();
      })
      .then(data => {
          setOrderHistory(data)
      })
  },[])

  return (
    <div>
      {orderHistory && orderHistory.map((i)=><Order key={i.id} order={i} />)}
      {!orderHistory && <div>You have not placed any order in the past.</div>}
    </div>
  )
}
