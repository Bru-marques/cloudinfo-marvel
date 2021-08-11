import React, { useState, useEffect } from "react";
import marvel_logo from "../../assets/marvel_logo.png";

import "./style.css";
import api from "../../services/charactersApi";
import Characters from "../Characters";
import Comics from "../Comics";

const Header = () => {
  const [characters, setCharacters] = useState("");
  const [charSearch, setCharSearch] = useState(characters);
  const [searchResults, setSearchResults] = useState([]);

  //wait 1 sec to the user type the search (avoid requests  while the user)
  useEffect(() => {
    const timerId = setTimeout(() => {
      setCharSearch(characters);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [characters]);

  //get data
  useEffect(() => {
    const search = () => {
      api
        .get()
        .then((response) => {
          setSearchResults(response.data.data.results);
        })
        .catch((err) => console.log(err));
    };
    if (charSearch) {
      search();
    }
  }, [charSearch]);

  // filter the data input and api
  const filteredComics = !!charSearch
    ? searchResults.filter((result) => {
        return result.name.toLowerCase().includes(charSearch.toLowerCase());
      })
    : searchResults;

  const handleOnChange = (e) => {
    setCharacters(e.target.value);
  };

  //render components
  return (
    <>
      <div className="headerArea">
        <div className="header">
          <img src={marvel_logo} alt="Marvel logo" className="marvel_logo" />
        </div>

        <form className="searchInput">
          <input
            className="input"
            type="search"
            placeholder="character"
            value={characters}
            onChange={handleOnChange}
          />
        </form>
      </div>

      <section className="listContainer">
        {filteredComics.length > 0 && (
          <Characters comics={filteredComics[0].comics.items} />
        )}
        {filteredComics.length === 0 && <Comics />}
      </section>
    </>
  );
};

export default Header;
