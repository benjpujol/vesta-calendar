import React, { Component } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { RegisterToAirtable } from "../utils/airtable";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { CoPresent } from "@mui/icons-material";

export default class CalendarForm extends Component {
  state = {
    disabled: true,
    errors: {},
  };


  // I need to set the default value for bookeddate and booked slot using url param

  

  
  onSubmit = (e) => {
    e.preventDefault();
    alert(
      "Votre visite technique est confirmée pour le " +  format(this.props.bookedslot, "eeee dd MMMM", { locale: frLocale })
    );
    const base_key = "appabRAbNldKQvYiV";
    const fields = {
      Nom: e.target.lastname.value,
      Prenom: e.target.firstname.value,
      Phone: e.target.phone.value,
      Date: this.props.bookedslot, 
      

      
    };
    RegisterToAirtable(base_key, fields).then(() => {console.log("Success for airtable")});
  };

  onInput = (e) => {
    console.log("validation", e.target.validationMessage)
    
    const errors = { ...this.state.errors };
    if (e.target.validationMessage && e.target.validationMessage !== "") {
      errors[e.target.name] = e.target.validationMessage;
    } else {
      delete errors[e.target.name];
    }

    var firstname = document.getElementById("firstname").value
    var lastname = document.getElementById("lastname").value
    var phone = document.getElementById("phone").value

    console.log("azeazea", firstname.length);

    console.log("errors", Object.keys(errors).length)

    console.log("FAILURE", Object.keys(errors).length !=0 || firstname.length == 0 || lastname.length == 0  || phone.length == 0   )
    console.log(firstname.length == 0)
    console.log(lastname.length == 0)
    console.log(phone.length == 0)
    console.log(e.target.phone)
    this.setState({ errors, disabled: Object.keys(errors).length !=0 || firstname.length == 0 || lastname.length == 0 || phone.length < 10 });
  };
  render() {
    const { errors } = this.state;
    console.log("form prop", this.props);
    console.log("Date du jour", new Date().getTime());
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
          required
            name="firstname"
            id="firstname"
            label="Prénom"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            invalid={!!errors.firstname}
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
            id="lastname"
            label="Nom"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            invalid={!!errors.lastname}
            onChange={this.onInput}
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
            id="phone"
            label="Numéro de téléphone"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            invalid={!!errors.phone}
            onChange={this.onInput}
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
