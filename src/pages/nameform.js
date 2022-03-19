import React, { Component } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { RegisterToAirtable } from "../utils/airtable";

export default class CalendarForm extends Component {
  state = {
    disabled: true,
    errors: {},
  };

  
  onSubmit = (e) => {
    e.preventDefault();
    alert(
      `Login: ${e.target.firstname.value} ${e.target.lastname.value} ${e.target.phone.value}`
    );
    const base_key = "appabRAbNldKQvYiV";
    const fields = {
      Nom: e.target.lastname.value,
      Prenom: e.target.firstname.value,
      Phone: e.target.phone.value,
      Date: this.props.bookeddate, 
      Creneau : this.props.bookedslot

      
    };
    RegisterToAirtable(base_key, fields).then(() => {console.log("Success for airtable")});
  };

  onInput = (e) => {
    const errors = { ...this.state.errors };
    if (e.target.validationMessage && e.target.validationMessage !== "") {
      errors[e.target.name] = e.target.validationMessage;
    } else {
      delete errors[e.target.name];
    }
    this.setState({ errors, disabled: !e.target.form.checkValidity() });
  };
  render() {
    const { errors } = this.state;
    console.log("form prop", this.props);
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: '50%',
          mx: "auto"
          
        
          
        }}
        autoComplete="off"
        onSubmit={this.onSubmit}
      >
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Prénom</InputLabel>
          <Input
            name="firstname"
            id="standard-text"
            label="Prénom"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={this.onInput}
          >
            {" "}
            {errors.firstname && (
              <div
                style={{ marginTop: "-1.5em" }}
                className="mui--text-caption mui--text-danger"
              >
                {errors.firstname}
              </div>
            )}
          </Input>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Nom</InputLabel>
          <Input
            required
            name="lastname"
            id="standard-text"
            label="Nom"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            invalid={!!errors.lastname}
          >
            {errors.lastname && (
              <div
                style={{ marginTop: "-1.5em" }}
                className="mui--text-caption mui--text-danger"
              >
                {errors.lastname}
              </div>
            )}
          </Input>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Téléphone</InputLabel>
          <Input
            required
            name="phone"
            id="standard-required"
            label="Numéro de téléphone"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            invalid={!!errors.phone}
          >
            {" "}
            {errors.phone && (
              <div
                style={{ marginTop: "-1.5em" }}
                className="mui--text-caption mui--text-danger"
              >
                {errors.phone}
              </div>
            )}
          </Input>
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          disabled={this.state.disabled}
        >
          Réserver ce créneau
        </Button>
      </Box>
    );
  }
}
