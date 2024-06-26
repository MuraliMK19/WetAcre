import Button from "@mui/material/Button";
import zxcvbn from "zxcvbn";
import Autocomplete from "@mui/material/Autocomplete";

import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import * as Api from "../../Services/Api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleOauthLogin from "../../Components/Auth/GoogleLogin";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import OTPVerification from "../farmer/OTPVerification";

let check = false;
let check1 = true;

const SignupPage = () => {
  const navigate = useNavigate();
  const [messageSent, setMessageSent] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [checkemail, setCheckEmail] = useState(false);
  let Phone = 0;
  let Type: string;
  const nameSuggestions = [
    { name: "FPO/FPC (Farmer Producer Organisation/Farmer Producer Company)" },
    { name: "PACS (Primary Agriculture Credit Society)" },
    { name: "Co-operatives" },
    { name: "FIG (Farmer Interest Group)" },
    { name: "Individual Proprietors" },
    { name: "Agri Input Dealers" },
    { name: "Others" },
  ];

  let email1 = "";
  const validateEmail = async (email: string) => {
    const validDomains = ["@gmail.com", "@krishiyan.com", "info@", "@"];

    for (const domain of validDomains) {
      if (email.includes(domain)) {
        check1 = true;
        console.log("check 1 ", check1);
        if (check1) {
          console.log("check function entered");
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/farmers/check-farmer/${email}`
          );

          const data = await response.json();
          console.log("function called", data);
          if (data?.exists == false) {
            setCheckEmail(true);
            console.log("check of data ", email);
          } else {
            setCheckEmail(false);
            setEmail("");

            toast.error("User Already Exists! Enter new email", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      }
      console.log("check 1 ", check1);
    }
  };

  const handlePasswordChange = (event: { target: { value: any } }) => {
    const password = event.target.value;
    const result = zxcvbn(password);

    const passwordStrengthScore = result.score;

    switch (passwordStrengthScore) {
      case 0:
        setMessage("Password: Very Weak");
        break;
      case 1:
        setMessage("Password: Weak");
        break;
      case 2:
        setMessage("Password: Fair");
        break;
      case 3:
        setMessage("Password: Strong");
        break;
      case 4:
        setMessage("Password: Very Strong");
        break;
      default:
        setMessage("");
        break;
    }
  };

  const handleEmailChange = (event: any) => {
    console.log("insisde cehck email");
    email1 = event.target.value;
    console.log("handle change email", email1);
    check1 = false;
    validateEmail(email1);
  };
  const handleMobileChange = (event: any) => {
    Phone = event.target.value;
    console.log(Phone);
  };
  const handletypechange = (event: any, newValue: any) => {
    Type = newValue.name;
    console.log(Type);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOtpSubmit = async () => {
    console.log("email1 send otp", email1);
    console.log(email1);

    if (email1 != null && email1.trim() !== "" && checkemail) {
      console.log("incide if");
      try {
        await validateEmail(email1);

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/send-otp-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email1 }),
          }
        );
        if (response.ok) {
          console.log("SMS sent successfully!");
          handleOpen();
          console.log("check before", check);
          check = true;
          console.log("check after", check);
        } else {
          console.log("Error sending SMS: Frontend from else");
          console.log("Error details:", await response.json());
        }
      } catch (error) {
        console.error("Error sending SMS:", error);
      }
    }
  };

  const [isOtpVerified, setIsOtpVerified] = useState(false);

  //Handlesubmit
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let name = data.get("name");
    let email = data.get("email");
    let pass = data.get("password");
    let mobile = data.get("phone");
    let type = data.get("type");
    console.log(check);
    const [err, res] = await Api.dealerRegistration(
      Type,
      name,
      email,
      pass,
      mobile
    );

    if (err) {
      toast.error(err.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (res && check && check1) {
      localStorage.setItem("authToken", res?.data?.token);
      localStorage.setItem("dealerName", res?.data?.result?.name);
      navigate("/");
      toast.success("Register Success !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleOTPVerified = () => {
    setIsOtpVerified(true);
    handleClose();
  };
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex flex-col md:flex-row rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* Image Container for Mobile */}
        <div className="md:hidden w-1/4">
          <img className="rounded-lg" src="Images/logo.png" alt="Ellipse" />
        </div>

        {/* Form Container */}
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Sign Up</h2>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <Autocomplete
              className="p-2 mt-6 rounded-xl border"
              options={nameSuggestions}
              getOptionLabel={(option) => option.name}
              onChange={handletypechange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  required
                  fullWidth
                  id="type"
                  label="Type of the Organization"
                  name="Name of the Organization"
                  autoComplete="type"
                  autoFocus
                />
              )}
            />
            <TextField
              className="p-2  rounded-xl border"
              type="text"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name of Organization"
              name="name"
              autoComplete="email"
              autoFocus
            />
            <TextField
              className="p-2 rounded-xl border"
              type="tel"
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number (e.g 9835717655)"
              id="phone"
              autoComplete="current-phone"
              onChange={handleMobileChange}
            />
            <TextField
              className="p-2 rounded-xl border"
              type="email"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
              inputProps={{
                pattern:
                  "^(\\w+@(gmail\\.com|info|krishiyan|@\\.com|contact))?$",
                title:
                  "Please enter a valid email address with domains @gmail.com, @info, or @krishiyan.com",
              }}
            />
            <TextField
              className="p-2 rounded-xl border"
              type="password"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                handlePasswordChange(event);
              }}
            />
            <p className="text-sm text-gray-500">{message}</p>

            <Button
              className="bg-[#05AB2A] rounded-xl text-white py-2 hover:scale-105 duration-300 mt-5 w-full"
              fullWidth
              variant="contained"
              onClick={() => handleOtpSubmit()}
            >
              Send OTP
            </Button>
            <Button
              className="bg-[#05AB2A] rounded-xl text-white py-2 hover:scale-105 duration-300"
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item>
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link
                    variant="subtitle2"
                    onClick={() => navigate("/login")}
                    sx={{ cursor: "pointer" }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>

        {/* Image Container for Desktop */}
        <div className="hidden md:block md:w-1/2">
          <img className="rounded-2xl" src="Images/logo.png" alt="Ellipse" />
        </div>
      </div>

      <OTPVerification
        open={open}
        handleClose={handleClose}
        handleOTPVerified={handleOTPVerified}
        Phone={email1}
      />
    </section>
  );
};

export default SignupPage;
