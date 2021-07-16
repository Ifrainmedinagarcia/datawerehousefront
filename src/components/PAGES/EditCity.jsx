import React, { useEffect } from "react";
import NavbarUser from "../MOLECULES/NavbarUser";
import Cajon from "../ORGANISMS/Cajon";
import axios from "axios";
import store from "../../REDUX/store";
import { getAllCountries, getAllRegions } from "../../REDUX/actionsCreators";
import FormEditCountryCity from "../ORGANISMS/FormEditCountryCity";
import CustomizedSnackbars from "../ATOMS/CustomizedSnackbars";

const JWT = localStorage.getItem("token");

const EditCity = (props) => {
  useEffect(() => {
    store.dispatch(getAllRegions());
    store.dispatch(getAllCountries());
  }, []);

  const id = props.location.id;
  const labelCountry = props.location.labelCountry;
  const valueInputCity = props.location.valueInputCity;

  const [idPut] = React.useState(id);
  const [valuePut, setValuePut] = React.useState(valueInputCity);
  const [message, setMessage] = React.useState(false);
  const editCityAction = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name_city: form.countryInput.value,
    };

    if (data.name_city === "") {
      return alert("Input vacío");
    }

    try {
      setMessage(false);
      await axios
        .put(
          `https://datawerehouse.herokuapp.com/v1/api/cities/${idPut}`,
          data,
          {
            headers: {
              Authorization: JWT,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setValuePut(form.countryInput.value);
          setMessage(true);
        });

      await store.dispatch(getAllRegions());
    } catch (error) {
      alert(`ocurrió un error, recargue la página ${error}`);
    }

    form.countryInput.value = "";
  };
  return (
    <>
      <NavbarUser />
      <Cajon />
      {message ? (
        <CustomizedSnackbars message="Ciudad editada con éxito" />
      ) : (
        ""
      )}
      <FormEditCountryCity
        title="Editar Cuidad"
        titleLabel="País"
        submitBtn={editCityAction.bind()}
        valueInput={valuePut}
        labelRegion={labelCountry}
      />
    </>
  );
};

export default EditCity;
