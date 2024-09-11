import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Home() {

  const {id}=useParams();

  const loadusers=async()=>{
    const result=await axios.get("http://localhost:8080/users")
    setUsers(result.data);
  };

  const deleteUser=async(id)=>{
    await axios.delete(`http://localhost:8080/users/${id}`)
    loadusers();
  }

  const[users,setUsers]=useState([]);

  useEffect(()=>{
    loadusers();
  },[]);

  

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead >
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
            users.map((user,index)=>(
              <tr>
              <th scope="row" key={index}>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/viewuser/${user.id}`} className="btn btn-primary mx-2">View</Link>
                <Link to={`/edituser/${user.id}`} className="btn btn-outline-primary mx-2">Edit</Link>
                <button 
                className="btn btn-danger mx-2"
                onClick={()=>deleteUser(user.id)}
                >Delete</button>
              </td>
            </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

