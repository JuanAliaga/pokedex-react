import React from 'react';
import { buildQueries } from '@testing-library/dom';
import {useState,useEffect} from 'react';
import { api } from './services';
//import {ReactComponent as MainImage} from './core/assets/images/pokemon-logo.svg';

function App() {
  const [pokemons,setPokemons] = useState([]);
  const [prev,setPrev] = useState(null);
  const [next,setNext] = useState(null)


  useEffect(()=>{
    api.get("pokemon")
    .then((response) => {
      setPokemons(response.data.results);
      setPrev(response.data.previous);
      setPrev(response.data.next);
    })
    .catch((err)=> console.log(err));
  },[]);

  const seePrev = (prev) =>{
    api.get(prev)
    .then((response) => {
      setPokemons(response.data.results);
      setPrev(response.data.previous);
      setNext(response.data.next);
    })
  }

  const seeNext = (next) =>{
    api.get(next)
    .then((response) => {
      setPokemons(response.data.results);
      setPrev(response.data.previous);
      setNext(response.data.next);
    })
  }

  const buildImgUrl = (url) => {
    const id = url.split("/");
    const idx = id.length - 2;
    const imgUrl = `https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/${id[idx]}.png`;
    return imgUrl;
  }

  return (
    <div className="container">
      <div className="logo-container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="Pokemon Logo Black Transparent - Pokemon Logo Png Clipart@pikpng.com"/>
      </div>
        <div className="pokemon-container">
        {
          pokemons.map(pokemon =>(
            <div key={pokemon.name} className="pokemon">
              <img src={buildImgUrl(pokemon.url)} alt={pokemon.name}/>
              <p>{pokemon.name}</p>
            </div>
          ))
        }
      </div>
      <div className="buttons-container">
      <button 
        onClick={()=> seePrev(prev)} 
        disabled={prev ==null ?true :false}
        className={prev ==null ? 'btn-disabled' :""}
      >Ver Anteriores</button>
      <button 
        onClick={()=> seeNext(next)}
        disabled={next ==null ?true :false}
        className={next ==null ? 'btn-disabled' :""}
      >
        Ver Proximos
      </button>
      </div>
      
      
    </div>
    
  );
}

export default App;
