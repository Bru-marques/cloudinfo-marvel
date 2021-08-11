import React, { useEffect, useState } from "react";

import api from "../../services/comicsApi";
import "./style.css";

const Comics = () => {
  const [comics, setComics] = useState([]);

  //get data
  useEffect(() => {
    api
      .get()
      .then((response) => {
        setComics(response.data.data.results);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(comics);

  return (
    <ul className="characterArea">
      {comics.map((comic) => {
        return (
          <li key={comic.id} className="characterItem">
            <img
              className="characterAreaImg"
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={`${comic.name} cover`}
            />
            <div className="characterAreaNameArea">
              <span className="characterAreaName">{comic.title}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default Comics;
