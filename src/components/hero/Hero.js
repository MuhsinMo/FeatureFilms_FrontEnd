import './Hero.css'
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
 
const Hero = ({films}) =>{

    const navigate = useNavigate();

    function reviews(filmId)
    {
        navigate(`/Reviews/${filmId}`);
    }

    return(
        <div className ='film-carousel-container'>
            <Carousel>
                {
                    films?.map((film)=>{
                        return(
                            <Paper key={film.imdbId}>
                                <div className='film-card-container'>
                                    <div className="film-card" style={{"--img": `url(${film.backdrops[0]})`}}>
                                        <div className="film-detail">
                                            <div className="film-poster">
                                                <img src={film.poster} alt=""/>
                                            </div>
                                            <div className="film-title">
                                                <h4>{film.title}</h4>
                                            </div>
                                            <div className="film-buttons-container">
                                                <Link to={`/Trailer/${film.trailerLink.substring(film.trailerLink.length - 11)}`}>
                                                <div className="play-button-icon-container">
                                                    <FontAwesomeIcon className="play-button-icon"
                                                        icon={faCirclePlay}
                                                    />
                                                </div>
                                                </Link>

                                                <div className="film-review-button-container">
                                                    <Button variant = "info" onClick={() => reviews(film.imdbId)}>Reviews</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    }) 
                }
            </Carousel>

        </div>
    )
}
export default Hero