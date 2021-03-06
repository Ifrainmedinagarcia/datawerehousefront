import React, { useEffect } from "react";
import TitleWelcomeForm from "../MOLECULES/TitleWelcomeForm";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import store from "../../REDUX/store";
import axios from "axios";
import { getAllCompanies, getAllCountries } from "../../REDUX/actionsCreators";
import { NavLink } from "react-router-dom";

const userLocalId = localStorage.getItem("user");
const userId = JSON.parse(userLocalId);
const JWT = localStorage.getItem("token");

const useStyle = makeStyles({
  color: {
    color: "#F7F9FC",
  },
  top: {
    marginTop: 15,
  },
});
let id = [];

const Formcompany = ({ countries, companies }) => {
  const classes = useStyle();

  useEffect(() => {
    store.dispatch(getAllCountries());
    store.dispatch(getAllCompanies());
  }, []);

  const registerCompany = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name_company: form.company.value,
      id_country: form.countrySelected.value,
      address: form.address.value,
      id_user: userId,
    };
    if (
      data.name_company === "" &&
      data.id_country === "" &&
      data.address === ""
    ) {
      return alert("Por favor llenar correctamente los campos requeridos");
    }

    try {
      await axios
        .post("https://datawerehouse.herokuapp.com/v1/api/companies", data, {
          headers: {
            Authorization: JWT,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {});
      await store.dispatch(getAllCompanies());
    } catch (error) {
      if (error) {
        alert("La compa????a debe estar asociada a un pa??s");
      }
    }

    form.company.value = "";
    form.address.value = "";
  };

  const deleteCountry = async (e) => {
    e.preventDefault();
    try {
      id.forEach((element, index) => {
        axios
          .delete(
            `https://datawerehouse.herokuapp.com/v1/api/companies/${element}`,
            {
              headers: { Authorization: JWT },
            }
          )
          .then((res) => {
            id.splice(index, 1);
          });
      });
      await store.dispatch(getAllCompanies());
      if (companies.length === 0) {
        id = [];
      }
    } catch (error) {
      alert(`ocurri?? un error, recargue la p??gina ${error}`);
    }
  };

  const checkBox = async (e) => {
    if (e.target.checked) {
      id.push(parseInt(e.target.id));
    }
    if (!e.target.checked) {
      id.forEach((element, index) => {
        id.splice(index, 1);
      });
    }
  };

  return (
    <main className="container__form__region">
      <div className="container__title__region">
        <TitleWelcomeForm title="??Ya falta poco! ??Tus contactos pertenecen a una empresa? Pues es hora de agregar las empresas donde trabajan tus contactos." />
      </div>
      <div className="container__form__flex">
        <div className="form__input">
          <h6 className="region__title">Compa????as</h6>
          <form
            onSubmit={registerCompany.bind()}
            className="container__btn__config"
          >
            <TextField
              className="input"
              name="company"
              label="Nombre de la compa????a"
              variant="outlined"
              margin="dense"
            />

            <FormControl className="input" variant="outlined" margin="dense">
              <InputLabel htmlFor="outlined-age-native-simple">Pa??s</InputLabel>
              <Select native name="countrySelected" label="Pa??s">
                <option aria-label="None" value="" />
                {countries
                  ? countries.map((p) => (
                      <option value={p.id_country}>{p.name_country}</option>
                    ))
                  : alert("Ocurri?? un error, vaya a configurar los pa??ses")}
              </Select>
            </FormControl>
            <TextField
              className="input"
              name="address"
              label="Direcci??n"
              variant="outlined"
              margin="dense"
            />
            <Button
              type="submit"
              className={`btn__card ${classes.color} ${classes.top}`}
              variant="text"
            >
              Agregar
            </Button>
          </form>
        </div>
        <div className="line__center"></div>
        <div className="container__info__input">
          <form
            onSubmit={deleteCountry.bind()}
            className="container__lists__region"
          >
            {companies.length !== 0 ? (
              companies.map((c) => (
                <div className="flex__check">
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={`${c.id_company}`}
                        className="block"
                        name="checkedB"
                        color="primary"
                        onChange={checkBox}
                      />
                    }
                    label={`${c.name_company}`}
                  />
                </div>
              ))
            ) : (
              <h2>A??n no hay compa????as agregadas</h2>
            )}

            <div className="conteinar__btn__delete__continuar">
              <ButtonGroup className="btn__action" variant="text" aria-label="">
                {companies.length === 0 ? (
                  <Button
                    disabled
                    type="button"
                    href="/contacts"
                    className={`${classes.color}`}
                    variant="text"
                  >
                    Continuar
                  </Button>
                ) : (
                  <NavLink to="/contacts">
                    <Button
                      type="button"
                      className={`btn__card ${classes.color}`}
                      variant="text"
                    >
                      Continuar
                    </Button>
                  </NavLink>
                )}
                <Button
                  type="submit"
                  className={`danger ${classes.color}`}
                  variant="text"
                  color="default"
                >
                  Eliminar
                </Button>
              </ButtonGroup>
            </div>
          </form>
        </div>
      </div>
      <div className="container__img__region">
        <img
          className="img__footer__region"
          src="https://favicontidyup.s3-sa-east-1.amazonaws.com/logodata.png"
          alt=""
        />
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countryReducer.countries,
  companies: state.companiesReducer.companies,
});

export default connect(mapStateToProps, {})(Formcompany);
