import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

function App() {

  const [films, setFilms] = useState();
  const [film, setFilm] = useState();
  const [reviews, setReviews] = useState();

  const getFilms = async () => {

    try{
      const response = await api.get("/api/v1/films"); 

      setFilms(response.data);
    }
    catch(err){
      console.log(err);
    }
  }

  const getFilmData = async (filmId) =>{
    try
    {
      const response = await api.get(`/api/v1/films/${filmId}`);
      const singleFilm = response.data;

      setFilm(singleFilm);
      setReviews(singleFilm.reviews);
    }
    catch(error)
    {
      console.error(error);
    }
  }
  useEffect(() => {
    getFilms();
  },[])


  return (
    <div className="App">

      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home films={films}/>} ></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:filmId" element={<Reviews getFilmData ={getFilmData} film = {film} reviews={reviews} setReviews={setReviews}/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>

        </Route>
        </Routes>
      
    </div>
  );
}

export default App;
