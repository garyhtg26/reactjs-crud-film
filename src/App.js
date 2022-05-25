import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { uid } from "uid";
import axios from "axios";
import TableFilm from './components/TableFilm';
import InputFilm from './components/InputFilm';



let api = axios.create({ baseURL: "http://localhost:3000" });

function App() {
  const [films, setFilms] = useState([]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState([{
    judul: "",
    sinopsis: "",
    genre: "",
    umur: "",
  }]  );
  
  useEffect(() => {
    // fetch data dsini dan set film

    api.get("/films").then((res) => {
      setFilms(res.data);
    });
  }, []);

  function AddForm() {
    setFormData([...formData, { judul: "", sinopsis: "", genre: "", umur:""}])
  }
  function handleChange(index,event) {
    let newFormState = [...formData ];
    newFormState[index][event.target.name] = event.target.value;
    setFormData(newFormState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...films];

    if (formData.judul === "") {
      return false;
    }
    if (formData.sinopsis === "") {
      return false;
    }
    if (formData.genre === "") {
      return false;
    }
    if (formData.umur === "") {
      return false;
    }
    //validasi
    if (isUpdate.status) {
      data.forEach((film) => {
        console.log(data,'editdata')
        if (film.id === isUpdate.id) {
          film.judul = formData[0].judul;
          film.sinopsis = formData[0].sinopsis;
          film.genre = formData[0].genre;
          film.umur = formData[0].umur;
        }
      });
      api
        .put("/films/" + isUpdate.id, {
          id: isUpdate.id,
          judul: formData[0].judul,
          sinopsis: formData[0].sinopsis,
          genre: formData[0].genre,
          umur: formData[0].umur,
        })
        .then(() => {
          alert("Data berhasil di update");
          window.location.href = "/"
        });
      // update berdasarkan id
    } else {  
      let toSave = {
        id: uid(),
        judul: formData[0].judul,
          sinopsis: formData[0].sinopsis,
          genre: formData[0].genre,
          umur: formData[0].umur,
      };
      console.log(toSave,'yangdikirim')
      data.push(toSave);

      // menambahkan data
      api.post("/films", toSave).then(() => {
        console.log(data,'dipush')
        alert("Data berhasil ditambah");
        window.location.href = "/"
      });
    }
    setFilms([...films,data]);
    setIsUpdate(false);
    setFormData([{ judul: "", sinopsis: "", genre: "", umur:"" }]);
  }

  function handleEdit(id) {

    // cari data di state
    // isi data ke state form
    let data = [...films];
    let foundData = data.find((film) => film.id === id);
    setIsUpdate({ status: true, id: id });
    setFormData([{ judul: foundData.judul, sinopsis: foundData.sinopsis, genre: foundData.genre, umur: foundData.umur }]);
  }

  function handleDelete(id) {
    let data = [...films];
    let filteredData = data.filter((film) => film.id !== id);

    // menghapus data
    api.delete("/films/" + id).then(() => alert("Data berhasil dihapus"));
    setFilms(filteredData);
  }
  

  
  return (
  <Router>
    <div className="App">
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">Mandiri XX21</Link>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <Link className="nav-link" to="/signout">Sign out</Link>
        </li>
      </ul>
    </nav>

    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className={`nav-link ${window.location.pathname === '/' ? "active" : ""}`} to="/">            
                <i class="fa fa-ticket mr-2"></i>
                  Table Film
                </Link>
              </li>
              <li className="nav-item">
                <Link  className={`nav-link ${window.location.pathname === '/input' ? "active" : ""}`} to="/input">
                <i class="fa fa-film mr-2" aria-hidden="true"></i>
                  Input Film
                </Link>
              </li>
     
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
         
        <Routes>
          <Route 
              exact path="/" 
              element={
                    <TableFilm
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      data={films}
                    />}
          />
          <Route 
              exact path="/input" 
              element={<InputFilm
                          handleSubmit={handleSubmit}
                          handleChange={handleChange}
                          AddForm={AddForm}
                          data={formData}
                    />}
          />
        </Routes>
        </main>
      </div>
    </div>
    </div>
  </Router>
  );
}

export default App;
