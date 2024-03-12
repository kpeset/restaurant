import { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";

function App() {
  const [menu, setMenu] = useState([]);
  const [infos, setInfos] = useState([]);

  const fetchMenu = () => {
    axios
      .get(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQV5jfMurepngV1pKX-0d4n52XTOQ8RenrQcJnIAlxkqvsNeBsqS30xrIgkfby9Gr3ocojh_uTCLYnm/pub?output=csv"
      )
      .then((response) =>
        Papa.parse(response.data, {
          header: true,
          complete: (result) => {
            setMenu(result.data);
          },
        })
      )
      .catch((error) => console.error(error));
  };

  const fetchInfos = () => {
    axios
      .get(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQV5jfMurepngV1pKX-0d4n52XTOQ8RenrQcJnIAlxkqvsNeBsqS30xrIgkfby9Gr3ocojh_uTCLYnm/pub?gid=1443591728&single=true&output=csv"
      )
      .then((response) =>
        Papa.parse(response.data, {
          header: true,
          complete: (result) => {
            setInfos(result.data);
          },
        })
      )
      .catch((error) => console.error(error));
  };

  const display = () => {
    return (
      <>
        <h1>Bienvenue à {infos[0].restaurant}</h1>
        <p>Réservation par email : {infos[0].email}</p>

        <h2>Entrées</h2>
        {menu
          .filter((plat) => plat.type === "entrée")
          .map((plat) => (
            <>
              <p>{plat.nom}</p>
              <p>{plat.prix} euros</p>
              <img src={plat.image} style={{ width: 160, height: "auto" }} />
            </>
          ))}
        <h2>Plats</h2>
        {menu
          .filter((plat) => plat.type === "plat")
          .map((plat) => (
            <>
              <p>{plat.nom}</p>
              <p>{plat.prix} euros</p>
              <img src={plat.image} style={{ width: 160, height: "auto" }} />
            </>
          ))}
        <h2>Desserts</h2>
        {menu
          .filter((plat) => plat.type === "dessert")
          .map((plat) => (
            <>
              <p>{plat.nom}</p>
              <p>{plat.prix} euros</p>
              <img src={plat.image} style={{ width: 160, height: "auto" }} />
            </>
          ))}
      </>
    );
  };

  useEffect(() => {
    fetchMenu();
    fetchInfos();
  }, []);

  console.info(infos);

  return infos.length && menu.length ? display() : <h1>Chargement en cours</h1>;
}

export default App;
