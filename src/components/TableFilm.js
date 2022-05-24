import React , {useState} from "react";
import { Link } from "react-router-dom";

export default function TableFilm({ data, handleEdit, handleDelete }) {
  const [ searchTerm, setSearchTerm ] =  useState('');
  return (
    <div className="list-group">
            <div className="d-flex" style={{placeContent:"space-between",padding:"10px"}}>
                <h1 className="h2">List Film</h1>
                <Link to="/input">
                        <button
                       
                        className="btn btn-success "
                        >
                        + Tambah Film
                        </button>
                </Link>
            </div>
            <input type="text" class="form-control mb-2 " onChange={event => {setSearchTerm(event.target.value)}} style={{width:"20%"}} placeholder="search..."/>
            <table  class="table">
                <thead>
                    <tr>
                    <th scope="col">No</th>
                    <th scope="col">Judul</th>
                    <th scope="col">Sinopsis</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Umur</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {data.filter((val)=>{
                    if (searchTerm === "") {
                        return val
                    } else if (val.judul.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val
                    } else if (val.umur.includes(searchTerm)){
                        return val
                    }
                }).map((film, index) => {
                    return (
                    <tr key={index}>
                    <th scope="row">{++index}</th>
                    <td>{film.judul}</td>
                    <td>{film.sinopsis}</td>
                    <td>{film.genre}</td>
                    <td>{film.umur}</td>
                    <td>
                        <Link to="/input">
                        <button
                        onClick={() => handleEdit(film.id)}
                        className="btn btn-primary "
                        >
                        Edit
                        </button>
                        </Link>
                    
                        <button
                        onClick={() => handleDelete(film.id)}
                        className="btn btn-danger "
                        >
                        Del
                        </button>
                    </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>

         
        
    </div>
  );
}