/**
=========================================================
* Operational Workflow Management MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Operational Workflow Management MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import Select from "react-select";
import axios from "axios";
import { ipofserver } from 'global';

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Image
const bgImage =ipofserver+"/static/img2.jpg";

const options = [
  { label: "Select type", value: "" },
  { label: "HR", value: "HR" },
  { label: "Project manager", value: "Project manager" },
  { label: "Team Leader", value: "Team Leader" },
  { label: "Junior", value: "Junior" },
  { label: "Others", value: "Others" }
];

const styles = {
  control: base => ({
    ...base,
    fontFamily: "Calibri",
    fontSize: '18px'
  }),
  menu: base => ({
    ...base,
    fontFamily: "Calibri",
    fontSize: '18px'
  })
};

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [selectedValue, setSelectedValue] = useState('');

  const [toggle, setToggle] = useState(false);

  const handleChange = e => {
    setSelectedValue(e.value);
    if (e.value == 'Others') {
      setToggle(true)
    }
    else {
      setToggle(false)
    }
  }

  const [inputField, setInputField] = useState({
    username: '',
    password: '',
    others: ''
  })

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function clearInput() {
    setInputField({
      username: '',
      password: '',
      others: ''
    });
    setSelectedValue('')
  }

  function setData(sessionname, type) {
    localStorage.setItem('LoginUsername', sessionname);
    localStorage.setItem('LoginUsertype', type);
  }

  const submitButton = () => {
    // alert(inputField.password)
    if (inputField.username == '' || inputField.password == '' || selectedValue == '') {
      alert("Please enter all details !")
      // clearInput()
    }
    else {
      if (selectedValue == 'Others' && inputField.others == '') {
        alert("Please enter your role !")
      }
      else {
        axios.post(ipofserver + 'userLogin', {
          username: inputField.username,
          password: inputField.password,
          type: selectedValue == 'Others' ? inputField.others : selectedValue
        })
          .then(function (response) {

            if (response.data == "success") {
              setData(inputField.username, selectedValue == 'Others' ? inputField.others : selectedValue)
              if (selectedValue == "HR") {
                window.location.href = '/HRCheckRequest'
              }
              else if (selectedValue == "Project manager") {
                window.location.href = '/ProjectmanagerCheckRequest'
              }
              else if (selectedValue == "Team Leader") {
                window.location.href = '/TeamLeaderCheckRequest'
              }
              else if (selectedValue == "Junior") {
                window.location.href = '/JuniorApplyForm'
              }
              else {
                window.location.href = '/OtherApplyForm'
              }
            }
            else {
              alert("Invalid username and password !")
              clearInput()
            }
          })
          .catch(function (error) {
            return error;
          });
      }
    }
  }

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your username and password to sign in"
      illustration={{
        image: bgImage,
        title: '#1 No-Code Workflow Platform',
        description:
          "Join other users who use Cflow for better workflow experience!",
      }}
    >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput type="email" placeholder="Username" size="large" name="username" value={inputField.username}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="password" placeholder="Password" size="large" name="password" value={inputField.password}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <Select className="select" styles={styles} options={options} onChange={handleChange}
            value={options.find(obj => obj.value === selectedValue)} />
        </ArgonBox>
        {toggle ?
          <ArgonBox mb={2}>
            <ArgonInput type="text" placeholder="others" size="large" name="others" value={inputField.others}
              onChange={inputsHandler} />
          </ArgonBox>
          :
          <></>
        }
        <ArgonBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <ArgonTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" onClick={submitButton} fullWidth>
            Sign In
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Sign up
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
