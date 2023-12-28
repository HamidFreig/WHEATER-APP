import { useState } from "react";
import iconoLluvia from "./img/iconos/lluvia.png";
import iconoSol from "./img/iconos/sol.png";
import iconoNieve from "./img/iconos/nieve.png";
import iconoNublado from "./img/iconos/nubes.png";
import interrogacion from "./img/iconos/interrogacion.png";
import fondoAppSol from "./img/fondos/fondoSoleado.jpg";
import fondoAppNublado from "./img/fondos/fondoNublado.jpg";
import fondoAppLluvia from "./img/fondos/fondoLluvia.jpg";
import fondoAppNieve from "./img/fondos/fondoNieve.jpg";
import "./StyleApp.css";
import Swal from "sweetalert2";

//MUI

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//MUI

function App() {
  //CONST

  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [temp, setTemp] = useState(null);
  const [srcIconoClima, setSrcIconoClima] = useState(interrogacion);
  const [botonBuscarClicado, setBotonBuscarClicado] = useState(false);
  const [fondo, setFondo] = useState("fondoAppNeutro");

  //CHANGES DE LOS INPUTS
  const handleChangePais = (event) => {
    setPais(event.target.value);
  };

  const handleChangeCiudad = (event) => {
    setBotonBuscarClicado(false);
    setCiudad(event.target.value);
  };

  //CONSULTA A LA API
  const BuscarClima = () => {
    setBotonBuscarClicado(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=027cd4e1f3d57f6cb5411126ac554093`;

    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((dataJson) => {
        // Obtener la temperatura actualizada directamente de dataJson
        const temperaturaActualizada = (dataJson.main.temp - 273.15).toFixed(1);

        // Actualizar la temperatura en el estado
        setTemp(temperaturaActualizada);

        // Condicionar el icono del clima usando la temperatura actualizada
        if (temperaturaActualizada < 0) {
          setSrcIconoClima(iconoNieve);
          setFondo("fondoAppNieve");
        } else if (temperaturaActualizada > 0 && temperaturaActualizada < 10) {
          setSrcIconoClima(iconoLluvia);
          setFondo("fondoAppLluvia");
        } else if (temperaturaActualizada > 10 && temperaturaActualizada < 20) {
          setSrcIconoClima(iconoNublado);
          setFondo("fondoAppNublado");
        } else {
          setSrcIconoClima(iconoSol);
          setFondo("fondoAppSol");
        }
      })

      .catch((error) => {
        setCiudad("");
        setPais("");
        setSrcIconoClima(interrogacion);
        setTemp(null);
        setFondo("fondoAppNeutro");
        Swal.fire({
          icon: "error",
          text: "CIUDAD NO EXISTE",
          width: "350px",
        });
      });
  };

  return (
    <div className="App">
      <div className={fondo}>
        <div className="Card">
          <label className="Titulo">
            <label className="Titulo">
              {botonBuscarClicado
                ? `CLIMA EN: ${ciudad.toUpperCase()}`
                : "CLIMA EN:"}
            </label>
          </label>
          <img src={srcIconoClima} className="iconoClima" />
          <label className="temp">{temp != null ? `${temp}°C` : ""}</label>

          <Box>
            <Select
              className="InputSelect"
              value={pais}
              onChange={handleChangePais}
            >
              <MenuItem value="CL">Chile</MenuItem>
              <MenuItem value="AR">Argentina</MenuItem>
              <MenuItem value="BR">Brasil</MenuItem>
              <MenuItem value="UY">Uruguay</MenuItem>
            </Select>
            <TextField
              className="Input"
              id="Ciudad"
              label="Escriba la Ciudad"
              variant="standard"
              type="text"
              value={ciudad}
              onChange={handleChangeCiudad}
            />
          </Box>
          <Button
            className="BotonBuscar"
            variant="contained"
            color="success"
            onClick={BuscarClima}
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
