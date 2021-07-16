import React, { useEffect } from "react";
import NavbarUser from "../MOLECULES/NavbarUser";
import Cajon from "../ORGANISMS/Cajon";
import store from "../../REDUX/store";
import axios from "axios";
import { connect } from "react-redux";
import { makeStyles, TextField, ButtonGroup, Button } from "@material-ui/core";
import {
  getAllcities,
  getAllCountries,
  getAllRegions,
} from "../../REDUX/actionsCreators";
import CustomizedSnackbars from "../ATOMS/CustomizedSnackbars";

const useStyle = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
    paddingLeft: 300,
    position: "relative",
    margin: "auto",
    top: 30,
  },
  inputs: {
    position: "relative",
  },
  inputText: {
    position: "relative",
    left: 10,
    margin: 10,
    width: 250,
  },
  color: {
    color: "#F7F9FC",
  },
  top: {
    marginTop: 15,
  },
  position: {
    marginLeft: 100,
    marginTop: 20,
  },
}));

const userLocalId = localStorage.getItem("user");
const userId = JSON.parse(userLocalId);
const JWT = localStorage.getItem("token");

const CreateCity = ({ countries }) => {
  const classes = useStyle();
  useEffect(() => {
    store.dispatch(getAllCountries());
    store.dispatch(getAllcities());
    store.dispatch(getAllRegions());
  }, []);

  const [message, setMessage] = React.useState(false);

  const addCity = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name_city: form.cityInput.value,
      id_country: form.countryOption.value,
      id_user: userId,
    };
    if (data.name_city === "") {
      return alert("Input vacío");
    }

    try {
      setMessage(false);
      await axios
        .post(`https://datawerehouse.herokuapp.com/v1/api/cities`, data, {
          headers: {
            Authorization: JWT,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setMessage(true);
        });
      await store.dispatch(getAllcities());
      await store.dispatch(getAllRegions());
    } catch (error) {
      alert(`ocurrió un error, recargue la página ${error}`);
    }

    form.cityInput.value = "";
  };

  return (
    <>
      <NavbarUser />
      <Cajon />
      {message ? (
        <CustomizedSnackbars message="Ciudad Agregada con éxito" />
      ) : (
        ""
      )}
      <main className={classes.content}>
        <h3 style={{ textAlign: "center" }}>Agregar Ciudad</h3>
        <div className="container__crear">
          <div className="container__main__crear">
            <form onSubmit={addCity.bind()} className={classes.inputs}>
              <TextField
                select
                name="countryOption"
                label="País"
                className={classes.inputText}
                SelectProps={{
                  native: true,
                }}
              >
                <option selected disabled></option>
                {countries.length !== 0 ? (
                  countries.map((c) => (
                    <option key={c.id_country.toString()} value={c.id_country}>
                      {c.name_country}
                    </option>
                  ))
                ) : (
                  <option selected disabled>
                    Aún no hay países ingresados
                  </option>
                )}
              </TextField>
              <TextField
                name="cityInput"
                className={classes.inputText}
                label="Ciudad"
                size="small"
                required
              ></TextField>
              <ButtonGroup
                className={`btn__action ${classes.position}`}
                variant="text"
                aria-label=""
              >
                <Button
                  type="submit"
                  className={`${classes.color}`}
                  variant="text"
                >
                  Guardar
                </Button>
              </ButtonGroup>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countryReducer.countries,
});

export default connect(mapStateToProps, {})(CreateCity);
