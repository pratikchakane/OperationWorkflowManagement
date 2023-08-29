/* eslint-disable no-unused-vars */
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

// @mui material components
import Grid from "@mui/material/Grid";

// Operational Workflow Management MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout1";
import DashboardNavbar from "examples/Navbars/NavbarTeamL";
import Footer from "examples/Footer";

// Operational Workflow Management MUI base styles

import React, { useEffect, useState } from 'react';

import ArgonBox from "components/ArgonBox";

// Operational Workflow Management MUI components
import fileDownload from 'js-file-download'
import axios from "axios";
import { ipofserver } from 'global';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Download } from "@mui/icons-material";
import Modal from 'react-bootstrap/Modal';
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

function Default() {

  const [userData, setUserData] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = event => {
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const [inputField, setInputField] = useState({
    model2in: '',
  })
  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const submitButton = () => {
    axios.post(ipofserver + 'updateStatus1', {
      id: localStorage.getItem("rejectid"),
      username: localStorage.getItem("rejectparam"),
      typeofapp: localStorage.getItem("rejectparam1"),
      status: "Rejected",
      messagebody: inputField.model2in,
    })
      .then(function (response) {
        setShow(false);
        if (response.data == 'success') {
          alert("Status updated !")
          window.location.href = '/TeamLeaderCheckRequest'
        }
        else {
          alert("Status not updated !")
        }
      })
      .catch(function (error) {
        return error;
      });
  }

  useEffect(() => {
    axios.get(ipofserver + 'loadRequest/' + localStorage.getItem('LoginUsertype'))
      .then(res => {
        console.log(res.data)
        setUserData(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const acceptButton = (id, param, param1) => {
    axios.post(ipofserver + 'updateStatus', {
      id: id,
      username: param,
      typeofapp: param1,
      status: "Accepted"
    })
      .then(function (response) {
        if (response.data == 'success') {
          alert("Status updated !")
          window.location.href = '/TeamLeaderCheckRequest'
        }
        else {
          alert("Status not updated !")
        }
      })
      .catch(function (error) {
        return error;
      });
  }

  const rejectButton = (id, param, param1) => {
    localStorage.setItem('rejectid', id);
    localStorage.setItem('rejectparam', param);
    localStorage.setItem('rejectparam1', param1);
    handleShow();
  }

  const DownloadBtn = (user, name) => {
    //  alert(user+"  "+name.substring(2, name.length-1)+"  ")
    axios.get(ipofserver + "static/files/" + user + "/" + name.substring(2, name.length - 1), {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, name.substring(2, name.length - 1))
      })
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox p={3} mt={5} mb={20} style={{ backgroundColor: 'white', position: 'relative', borderRadius: 10 }}>
        <div className="d-flex justify-content-between">
          <h2 className='mb-3'>{"All request"}</h2>
        </div>
        <ArgonBox component="form" role="form" mt={3}>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>User</th>
                <th>Data</th>
                <th>Designation</th>
                <th>Type</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {userData.map((userdetail, index) => {
                var data = userdetail[3].substring(1, userdetail[3].length - 1).split(',')
                return <tr key={index}>
                  <td style={{ fontSize: 17 }}>{index + 1}</td>
                  <td style={{ fontSize: 17 }}>{userdetail[1]}</td>
                  <td style={{ fontSize: 17 }}>{data.map((player, i) => [<b key={i}>{player.split('.')[1] == `pdf'` || player.split('.')[1] == `png'` || player.split('.')[1] == `jpg'` ? (<Button className="btn" onClick={event => DownloadBtn(userdetail[1], player)}><i className="fa fa-download"></i>Download</Button>) : (player)}<br></br></b>, i < data.length - 1])}</td>
                  <td style={{ fontSize: 17 }}>{userdetail[2]}</td>
                  <td style={{ fontSize: 17 }}>{userdetail[5]}</td>
                  <td><Button variant="success" onClick={event => acceptButton(userdetail[0], userdetail[1], userdetail[5], userdetail[2])}>Accept</Button></td>
                  <td><Button variant="danger" onClick={event => rejectButton(userdetail[0], userdetail[1], userdetail[5], userdetail[2])}>Reject</Button></td>
                </tr>
              })}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ArgonBox m={2}>
                <ArgonInput type="text" placeholder="Enter feedback message" size="large" name="model2in" value={inputField.model2in}
                  onChange={inputsHandler} />
              </ArgonBox>
            </Modal.Body>
            <Modal.Footer>
              <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px" }}
                onClick={handleClose}>
                Close
              </ArgonButton>
              <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px", marginLeft: "20px" }}
                onClick={submitButton}>
                Send Feedback
              </ArgonButton>
            </Modal.Footer>
          </Modal>

        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
