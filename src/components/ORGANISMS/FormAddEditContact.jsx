import React from "react";
import { makeStyles, TextField, ButtonGroup } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Sliderbtn from "../ATOMS/Sliderbtn";

const useStyle = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
    paddingLeft: 300,
    position: "relative",
    margin: "auto",
    top: 30,
  },
  input: {
    display: "none",
    position: "absolute",
  },
  absolute: {
    position: "absolute",
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginLeft: 10,
    marginTop: 25,
    zIndex: 1,
  },
  camera: {
    marginLeft: 40,
    marginTop: 45,
  },
  inputText: {
    position: "relative",
    left: 10,
    margin: 10,
    width: 150,
  },
  inputs: {
    position: "relative",
  },
  slider: {
    position: "relative",
    left: 20,
    marginTop: 50,
  },
  avatar: {
    position: "relative",
    margin: "auto",
    width: 100,
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

const FormAddEditContact = ({
  title,
  functionSubmit,
  nombreValue,
  apellidoValue,
  cargoValue,
  correoValue,
  companyValue,
  regionValue,
  countryValue,
  cityValue,
  addressValue,
  channelValue,
  cuentaValue,
  preferenceValue,
  defaultValue,
  regions,
  preferences,
  companies,
  channels,
  allRegion,
  allCountry,
  renderImage,
  CityFromCountry,
  countryFromRegion,
  src,
  errorName,
  errorLast,
  errorPoss,
  errorAddress,
  errorEmail,
  errorAccount,
  errorCompany,
  errorRegion,
  errorCountry,
  errorCity,
  errorChannel,
  errorDis,
  nameBtn,
}) => {
  const classes = useStyle();

  return (
    <form
      onSubmit={functionSubmit}
      className={classes.content}
      encType="multipart/form-data"
    >
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <div className={classes.avatar}>
        <input
          name="image"
          onChange={renderImage}
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <img
          style={{ borderRadius: "200px" }}
          className={classes.absolute}
          src={src}
          alt="imageProfile"
        />
        <label
          className={`${classes.absolute} ${classes.camera}`}
          htmlFor="icon-button-file"
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
      <div className="container__crear">
        <div className="container__main__crear">
          <div className={classes.inputs}>
            {errorName === false ? (
              <TextField
                name="nombre"
                className={classes.inputText}
                label={nombreValue}
                size="small"
              ></TextField>
            ) : (
              <TextField
                name="nombre"
                className={classes.inputText}
                label={nombreValue}
                size="small"
                error
                helperText="Llenar este campo"
              ></TextField>
            )}
            {errorLast === false ? (
              <TextField
                name="apellido"
                className={classes.inputText}
                label={apellidoValue}
                size="small"
              ></TextField>
            ) : (
              <TextField
                name="apellido"
                className={classes.inputText}
                label={apellidoValue}
                size="small"
                error
                helperText="Llenar este campo"
              ></TextField>
            )}
            {errorPoss === false ? (
              <TextField
                name="cargo"
                className={classes.inputText}
                label={cargoValue}
                size="small"
              ></TextField>
            ) : (
              <TextField
                name="cargo"
                className={classes.inputText}
                label={cargoValue}
                size="small"
                error
                helperText="Llenar este campo"
              ></TextField>
            )}
            {errorEmail === false ? (
              <TextField
                name="correo"
                className={classes.inputText}
                label={correoValue}
                type="email"
                size="small"
              ></TextField>
            ) : (
              <TextField
                name="correo"
                className={classes.inputText}
                label={correoValue}
                type="email"
                size="small"
                error
                helperText="Llenar este campo"
              ></TextField>
            )}
            {errorCompany === false ? (
              <TextField
                select
                name="idComany"
                label={companyValue}
                className={classes.inputText}
                SelectProps={{
                  native: true,
                }}
              >
                <option aria-label="None"></option>
                {companies.length !== 0 ? (
                  companies.map((c) => (
                    <option key={c.id_company.toString()} value={c.id_company}>
                      {c.name_company}
                    </option>
                  ))
                ) : (
                  <option disabled>Aun no hay compañías ingresadas</option>
                )}
              </TextField>
            ) : (
              <TextField
                select
                error
                helperText="seleccionar una opción"
                name="idComany"
                label={companyValue}
                className={classes.inputText}
                SelectProps={{
                  native: true,
                }}
              >
                <option aria-label="None"></option>
                {companies.length !== 0 ? (
                  companies.map((c) => (
                    <option key={c.id_company.toString()} value={c.id_company}>
                      {c.name_company}
                    </option>
                  ))
                ) : (
                  <option disabled>Aun no hay compañías ingresadas</option>
                )}
              </TextField>
            )}
          </div>
        </div>
      </div>

      <div className="container__body__inputs">
        {errorRegion === false ? (
          <TextField
            select
            name="idRegion"
            label={regionValue}
            onChange={countryFromRegion}
            className={classes.inputText}
            SelectProps={{
              native: true,
            }}
          >
            <option aria-label="None"></option>
            {regions.length !== 0 ? (
              regions.map((r) => (
                <option key={r.id_region.toString()} value={r.id_region}>
                  {r.name_region}
                </option>
              ))
            ) : (
              <option disabled> Debe seleccionar una region</option>
            )}
          </TextField>
        ) : (
          <TextField
            select
            name="idRegion"
            error
            helperText="seleccionar una opción"
            label={regionValue}
            onChange={countryFromRegion}
            className={classes.inputText}
            SelectProps={{
              native: true,
            }}
          >
            <option aria-label="None"></option>
            {regions.length !== 0 ? (
              regions.map((r) => (
                <option key={r.id_region.toString()} value={r.id_region}>
                  {r.name_region}
                </option>
              ))
            ) : (
              <option disabled> Debe seleccionar una region</option>
            )}
          </TextField>
        )}
        {errorCountry === false ? (
          <TextField
            select
            onChange={CityFromCountry}
            label={countryValue}
            name="idCountry"
            className={classes.inputText}
            SelectProps={{
              native: true,
            }}
          >
            <option aria-label="None"></option>
            {allRegion.data !== undefined ? (
              allRegion.data.data.Paises.map((c) => (
                <option key={c.id_country.toString()} value={c.id_country}>
                  {c.name_country}
                </option>
              ))
            ) : (
              <option disabled>Debes seleccionar una Región</option>
            )}
          </TextField>
        ) : (
          <TextField
            select
            error
            helperText="seleccionar una opción"
            onChange={CityFromCountry}
            label={countryValue}
            name="idCountry"
            className={classes.inputText}
            SelectProps={{
              native: true,
            }}
          >
            <option aria-label="None"></option>
            {allRegion.data !== undefined ? (
              allRegion.data.data.Paises.map((c) => (
                <option key={c.id_country.toString()} value={c.id_country}>
                  {c.name_country}
                </option>
              ))
            ) : (
              <option disabled>Debes seleccionar una Región</option>
            )}
          </TextField>
        )}

        {errorCity === false ? (
          <TextField
            select
            name="idCity"
            label={cityValue}
            className={classes.inputText}
            SelectProps={{
              native: true,
            }}
          >
            <option aria-label="None"></option>
            {allCountry.data !== undefined ? (
              allCountry.data.data.City.map((c) => (
                <option key={c.id_city.toString()} value={c.id_city}>
                  {c.name_city}
                </option>
              ))
            ) : (
              <option disabled>Debes seleccionar un País</option>
            )}
          </TextField>
        ) : (
          <TextField
            select
            error
            helperText="seleccionar una opción"
            name="idCity"
            label={cityValue}
            className={classes.inputText}
            SelectProps={{
              native: true,
            }}
          >
            <option aria-label="None"></option>
            {allCountry.data !== undefined ? (
              allCountry.data.data.City.map((c) => (
                <option key={c.id_city.toString()} value={c.id_city}>
                  {c.name_city}
                </option>
              ))
            ) : (
              <option disabled>Debes seleccionar un País</option>
            )}
          </TextField>
        )}
        {errorAddress === false ? (
          <TextField
            className={classes.inputText}
            label={addressValue}
            size="small"
            name="address"
          ></TextField>
        ) : (
          <TextField
            className={classes.inputText}
            label={addressValue}
            size="small"
            name="address"
            error
            helperText="Llenar este campo"
          ></TextField>
        )}

        <div className={classes.slider}>
          <Sliderbtn defaultValue={defaultValue} name="sliderCommitment" />
        </div>

        <div className={classes.slider}>
          {errorChannel === false ? (
            <TextField
              select
              name="idChannel"
              label={channelValue}
              className={classes.inputText}
              SelectProps={{
                native: true,
              }}
            >
              <option aria-label="None"></option>

              {channels.length !== 0 ? (
                channels.map((c) => (
                  <option
                    key={c.id_channel_comunication.toString()}
                    value={c.id_channel_comunication}
                  >
                    {c.name_channel}
                  </option>
                ))
              ) : (
                <option disabled>Hay un error, recarge la página</option>
              )}
            </TextField>
          ) : (
            <TextField
              select
              error
              helperText="Llenar este campo"
              name="idChannel"
              label={channelValue}
              className={classes.inputText}
              SelectProps={{
                native: true,
              }}
            >
              <option aria-label="None"></option>

              {channels.length !== 0 ? (
                channels.map((c) => (
                  <option
                    key={c.id_channel_comunication.toString()}
                    value={c.id_channel_comunication}
                  >
                    {c.name_channel}
                  </option>
                ))
              ) : (
                <option disabled>Hay un error, recarge la página</option>
              )}
            </TextField>
          )}

          {errorAccount === false ? (
            <TextField
              name="cuenta"
              className={classes.inputText}
              label={cuentaValue}
              size="small"
            ></TextField>
          ) : (
            <TextField
              name="cuenta"
              className={classes.inputText}
              label={cuentaValue}
              size="small"
              error
              helperText="Llenar este campo"
            ></TextField>
          )}
          {errorDis === false ? (
            <TextField
              name="preferencia"
              select
              label={preferenceValue}
              className={classes.inputText}
              SelectProps={{
                native: true,
              }}
            >
              <option aria-label="None"></option>
              {preferences.length !== 0 ? (
                preferences.map((p) => (
                  <option
                    key={p.id_preference.toString()}
                    value={p.id_preference}
                  >
                    {p.name_preference}
                  </option>
                ))
              ) : (
                <option disabled>Hay un error, recargue la página</option>
              )}
            </TextField>
          ) : (
            <TextField
              name="preferencia"
              select
              error
              helperText="Llenar este campo"
              label={preferenceValue}
              className={classes.inputText}
              SelectProps={{
                native: true,
              }}
            >
              <option aria-label="None"></option>
              {preferences.length !== 0 ? (
                preferences.map((p) => (
                  <option
                    key={p.id_preference.toString()}
                    value={p.id_preference}
                  >
                    {p.name_preference}
                  </option>
                ))
              ) : (
                <option disabled>Hay un error, recargue la página</option>
              )}
            </TextField>
          )}

          <ButtonGroup
            className={`btn__action ${classes.position}`}
            variant="text"
            aria-label=""
          >
            <Button type="submit" className={`${classes.color}`} variant="text">
              {nameBtn}
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </form>
  );
};

export default FormAddEditContact;
