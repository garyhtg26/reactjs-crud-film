import React from "react";

export default function InputFilm({ data, handleChange, handleSubmit, AddForm}) {
  return (
    <div className="" >
        <h1 className="h2">Input Film</h1>
        <form onSubmit={handleSubmit} className="px-3 py-4">

        { data.map((data,index) => {
            return (
        
          <div key={index} className="card card-1 p-2 mb-4">
          <div className="form-group">
            <label htmlFor="">Judul Film</label>
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              value={data.judul}
              name="judul"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">Sinopsis</label>
            <input
              type="text"
              onChange={handleChange}
              value={data.sinopsis}
              className="form-control"
              name="sinopsis"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">Genre</label>
            <input
              type="text"
              onChange={handleChange}
              value={data.genre}
              className="form-control"
              name="genre"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">Umur</label>
            <input
              type="text"
              onChange={handleChange}
              value={data.umur}
              className="form-control"
              name="umur"
            />
          </div>
          
          </div>
          
          )
        })}
          <div>
          <button type="button" onClick={AddForm}>add</button>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Save
            </button>
          </div>
        </form>
      </div>
  );
}