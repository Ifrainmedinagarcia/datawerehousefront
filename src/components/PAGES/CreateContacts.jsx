import React, { useEffect } from "react";
import NavbarUser from "../MOLECULES/NavbarUser";
import Cajon from "../ORGANISMS/Cajon";
import { connect } from "react-redux";
import store from "../../REDUX/store";
import {
  getAllChannels,
  getAllcities,
  getAllCommitments,
  getAllCompanies,
  getAllContacts,
  getAllPreferences,
  getAllRegions,
} from "../../REDUX/actionsCreators";
import axios from "axios";
import FormAddEditContact from "../ORGANISMS/FormAddEditContact";
import SimpleBackdrop from "../ATOMS/SimpleBackdrop";
import CustomizedSnackbars from "../ATOMS/CustomizedSnackbars";

const userLocalId = localStorage.getItem("user");
const userId = JSON.parse(userLocalId);
const JWT = localStorage.getItem("token");

const CreateContacts = ({ channels, preferences, regions, companies }) => {
  useEffect(() => {
    store.dispatch(getAllChannels());
    store.dispatch(getAllCommitments());
    store.dispatch(getAllPreferences());
    store.dispatch(getAllCompanies());
    store.dispatch(getAllcities());
    store.dispatch(getAllContacts());
    store.dispatch(getAllRegions());
  }, []);

  const [src, setSrc] = React.useState(
    "https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png"
  );

  const [idFoto, setIdFoto] = React.useState(null);

  const [allRegion, setAllRegion] = React.useState({});

  const [allCountry, setAllCountry] = React.useState({});

  const [errorName, setErrorName] = React.useState(false);

  const [errorLast, setErrorLast] = React.useState(false);

  const [errorPoss, setErrorPoss] = React.useState(false);

  const [errorAddress, setErrorAddress] = React.useState(false);

  const [errorEmail, setErrorEmail] = React.useState(false);

  const [errorAccount, setErrorAccount] = React.useState(false);

  const [errorCompany, setErrorCompany] = React.useState(false);

  const [errorRegion, setErrorRegion] = React.useState(false);

  const [errorCountry, setErrorCountry] = React.useState(false);

  const [errorCity, setErrorCity] = React.useState(false);

  const [errorChannel, setErrorChannel] = React.useState(false);

  const [errorDis, setErrorDis] = React.useState(false);

  const [loader, setLoader] = React.useState(false);

  const [message, setMessage] = React.useState(false);

  const countryFromRegion = async (e) => {
    if (e.target.value === "") {
      setAllRegion({});
      setAllCountry({});
      return;
    }
    try {
      await axios
        .get(
          `https://datawerehouse.herokuapp.com/v1/api/regions/${e.target.value}`,
          {
            headers: {
              Authorization: JWT,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setAllRegion(res);
          setAllCountry({});
        });
    } catch (error) {
      alert(`ocurrió un error, recargue la página ${error}`);
    }
  };

  const CityFromCountry = async (e) => {
    if (e.target.value === "") {
      setAllCountry({});
      return;
    }
    try {
      await axios
        .get(
          `https://datawerehouse.herokuapp.com/v1/api/countries/${e.target.value}`,
          {
            headers: {
              Authorization: JWT,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          setAllCountry(resp);
        });
    } catch (error) {
      alert(`ocurrió un error, recargue la página ${error}`);
    }
  };

  const renderImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      let url = reader.result;
      setSrc(url);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setSrc(
        "https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png"
      );
    }

    const formdata = new FormData();
    formdata.append("file", file);

    try {
      setLoader(true);
      await axios
        .post(
          "https://datawerehouse.herokuapp.com/v1/api/file/upload",
          formdata,
          {
            headers: {
              Authorization: JWT,
            },
          }
        )
        .then((res) => {
          setIdFoto(res.data.data.id_photo);
        });
    } catch (error) {
      if (error) {
        alert(
          "El tamaño de la imagen supera los 2MB, por favor elegir una foto menor a 2MB"
        );
      }
    } finally {
      setLoader(false);
    }
  };

  const registerContact = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name_contact: form.nombre.value,
      lastname_contact: form.apellido.value,
      position: form.cargo.value,
      address: form.address.value,
      email_contact: form.correo.value,
      contact_account: form.cuenta.value,
      id_company: parseInt(form.idComany.value),
      id_region: parseInt(form.idRegion.value),
      id_photo: idFoto,
      id_country: parseInt(form.idCountry.value),
      id_city: parseInt(form.idCity.value),
      id_preference: parseInt(form.preferencia.value),
      id_commitment: parseInt(form.sliderCommitment.value),
      id_channel_comunication: parseInt(form.idChannel.value),
      id_user: userId,
    };

    if (data.name_contact === "") {
      setErrorName(true);
    }
    if (data.lastname_contact === "") {
      setErrorLast(true);
    }
    if (data.position === "") {
      setErrorPoss(true);
    }
    if (data.address === "") {
      setErrorAddress(true);
    }
    if (data.email_contact === "") {
      setErrorEmail(true);
    }
    if (data.contact_account === "") {
      setErrorAccount(true);
    }
    if (isNaN(data.id_company)) {
      setErrorCompany(true);
    }
    if (isNaN(data.id_region)) {
      setErrorRegion(true);
    }
    if (isNaN(data.id_region)) {
      setErrorCountry(true);
    }
    if (isNaN(data.id_city)) {
      setErrorCity(true);
    }
    if (isNaN(data.id_channel_comunication)) {
      setErrorChannel(true);
    }
    if (isNaN(data.id_preference)) {
      setErrorDis(true);
    }

    try {
      setLoader(true);
      setMessage(false);
      await axios
        .post("https://datawerehouse.herokuapp.com/v1/api/contacts", data, {
          headers: {
            Authorization: JWT,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setErrorName(false);
          setErrorLast(false);
          setErrorPoss(false);
          setErrorAddress(false);
          setErrorEmail(false);
          setErrorAccount(false);
          setErrorCompany(false);
          setErrorRegion(false);
          setErrorCity(false);
          setErrorChannel(false);
          setErrorDis(false);
          setMessage(true);
          setErrorCountry(false);
          setSrc(
            "https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png"
          );
          store.dispatch(getAllContacts());
        });
      await store.dispatch(getAllContacts());
    } catch (error) {
      if (error.response.data.error === '"id_photo" must be a number') {
        alert("Por favor elegir una foto para el contacto");
        setSrc(
          "https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png"
        );
      }
      return;
    } finally {
      setLoader(false);
    }

    form.nombre.value = "";
    form.apellido.value = "";
    form.cargo.value = "";
    form.address.value = "";
    form.correo.value = "";
    form.cuenta.value = "";
    form.idComany.value = "";
    form.idRegion.value = "";
    form.idCountry.value = "";
    form.idCity.value = "";
    form.preferencia.value = "";
    form.sliderCommitment.value = 1;
    form.idChannel.value = "";
  };

  return (
    <>
      <NavbarUser />
      <Cajon />
      {loader ? <SimpleBackdrop /> : ""}
      {message ? (
        <CustomizedSnackbars message="Contacto Creado con éxito" />
      ) : (
        ""
      )}
      <FormAddEditContact
        title="Crear Contacto"
        channels={channels}
        preferences={preferences}
        regions={regions}
        companies={companies}
        allRegion={allRegion}
        allCountry={allCountry}
        renderImage={renderImage}
        CityFromCountry={CityFromCountry}
        countryFromRegion={countryFromRegion}
        src={src}
        functionSubmit={registerContact.bind()}
        nameBtn="Crear"
        nombreValue="Nombre"
        apellidoValue="Apellido"
        cargoValue="Cargo"
        correoValue="Email"
        companyValue="Compañía"
        regionValue="Region"
        countryValue="País"
        cityValue="Ciudad"
        addressValue="Dirección"
        channelValue="Canal de contacto"
        cuentaValue="Cuenta"
        errorName={errorName}
        errorLast={errorLast}
        errorPoss={errorPoss}
        errorAddress={errorAddress}
        errorEmail={errorEmail}
        errorAccount={errorAccount}
        errorCompany={errorCompany}
        errorRegion={errorRegion}
        errorCountry={errorCountry}
        errorCity={errorCity}
        errorChannel={errorChannel}
        errorDis={errorDis}
        preferenceValue="Disponibilidad"
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  channels: state.channelsReducer.channels,
  preferences: state.preferencesReducer.preferences,
  regions: state.regionReducer.regions,
  companies: state.companiesReducer.companies,
});

export default connect(mapStateToProps, {})(CreateContacts);
