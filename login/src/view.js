import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams } from 'react-router-dom';
import { BiDockBottom } from 'react-icons/bi';

function View() {
    const {id}=useParams();
    const [dataa,setDataa]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/view/'+id)
        .then(res=>{
            setDataa(res.data);
        })
        .catch(err=>console.log(err))
    },[id])
    
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center  align-items-center'>
        <div className='w-30 bg-white rounded p-3'>
            <h2>Product_detail</h2>
            {dataa.map((user, id) => (
  <div key={id}>
    <strong>id:</strong>
    <span>{user.id}</span>
    <br/>
    <strong>Product_Name:</strong>
    <span>{user.Product_Name}</span>
    <br/>
    <strong>Peoduct_cost:</strong>
    <span>{user.Peoduct_cost}</span>
    <br/>
    <strong>Person_age:</strong>
    <span>{user.Person_age}</span>
    <br/>
    <strong>Order_date:</strong>
    <span>{user.Order_date}</span>
    <br/>
    <strong>Product_image:</strong>
    <span><img src={`/Product_images/${user.Product_image}`} alt='error' width={100} height={100} /></span>
    <br/>
    <Link to="/ex" className="btn btn-primary">Back</Link>
  </div>
))}
            
        </div>
    </div>
  )
}

export default View
