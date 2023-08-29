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
import DashboardNavbar from "examples/Navbars/NavbarJunior";
import Footer from "examples/Footer";

// Operational Workflow Management MUI base styles
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from 'global';

import ArgonBox from "components/ArgonBox";
import "react-step-progress-bar/styles.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

function Default() {

  const [leaveData, setLeaveData] = useState([])
  const [leavemain, setleavemain] = useState([])

  const [PromotionData, setPromotionData] = useState([])
  const [Promotionmain, setPromotionmain] = useState([])

  const [ApprisalData, setApprisalnData] = useState([])
  const [Apprisalmain, setApprisalnmain] = useState([])

  const [OtherData, setOtherData] = useState([])
  const [Othermain, setOthermain] = useState([])

  useEffect(() => {
    axios.get(ipofserver + 'loadStatuslst/' + localStorage.getItem('LoginUsername'))
      .then(res => {
        setleavemain(res.data[1])
        if(res.data[0].length == 0){
          // alert(res.data[1][0])
          setLeaveData(res.data[1][0])
        }
        else{
          // alert(res.data[0][res.data[0].length - 1])
          setLeaveData(res.data[0][res.data[0].length - 1])
        }
        
        setPromotionmain(res.data[3])
        if(res.data[2].length == 0){
          // alert(res.data[1][0])
          setPromotionData(res.data[3][0])
        }
        else{
          // alert(res.data[0][res.data[0].length - 1])
          setPromotionData(res.data[2][res.data[2].length - 1])
        }
        
        setApprisalnmain(res.data[5])
        if(res.data[4].length == 0){
          // alert(res.data[1][0])
          setApprisalnData(res.data[5][0])
        }
        else{
          // alert(res.data[0][res.data[0].length - 1])
          setApprisalnData(res.data[4][res.data[4].length - 1])
        }

        setOthermain(res.data[7])
        if (res.data[6].length == 0) {
          // alert(res.data[1][0])
          setOtherData(res.data[7][0])
        }
        else {
          // alert(res.data[0][res.data[0].length - 1])
          setOtherData(res.data[6][res.data[6].length - 1])
        }

      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const steps = leavemain.map(x => {
    return ({ status: x });
  })

  const transfer = {
    status: leaveData // change transfer status to progress bar
  };

  const getStepPosition = (transferStatus) => {
    return steps.findIndex(({ status }) => status === transferStatus) + 1;
  };
  
  const steps1 = Promotionmain.map(x => {
    return ({ status: x });
  })

  const transfer1 = {
    status: PromotionData // change transfer status to progress bar
  };

  const getStepPosition1 = (transferStatus) => {
    return steps1.findIndex(({ status }) => status === transferStatus) + 1;
  };
  
  const steps2 = Apprisalmain.map(x => {
    return ({ status: x });
  })

  const transfer2 = {
    status: ApprisalData // change transfer status to progress bar
  };

  const getStepPosition2 = (transferStatus) => {
    return steps2.findIndex(({ status }) => status === transferStatus) + 1;
  };

  const steps3 = Othermain.map(x => {
    return ({ status: x });
  })

  const transfer3 = {
    status: OtherData // change transfer status to progress bar
  };

  const getStepPosition3 = (transferStatus) => {
    return steps3.findIndex(({ status }) => status === transferStatus) + 1;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox style={{ backgroundColor: 'white', position: 'relative', borderRadius: 10 }}>
        <ArgonBox p={3} mt={5} mb={5} style={{ backgroundColor: 'white', position: 'relative', borderRadius: 10 }}>
          <div className="d-flex justify-content-between">
            <h4 className='mb-3'>Leave status</h4>
          </div>
          <div style={{ marginTop: 50, marginLeft: 50, marginRight: 50, marginBottom: 70 }}>
            <ProgressBar
              width={1000}
              height={18}
              percent={100 * (getStepPosition(transfer.status) / steps.length)}
              filledBackground="dodgerblue">
              {steps.map((step, index, arr) => {
                return (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        marginTop: 55,
                        width: 50,
                        height: 50,
                        color: "black",
                        backgroundColor: "lightgray"
                        // backgroundColor: accom ? "dodgerblue" : "lightgray"
                      }}>
                      {index + 1}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                        width: 50,
                        height: 50,
                        color: "black",
                      }}>
                      {step.status}
                    </div>
                  </div>
                );
              })}
            </ProgressBar>
          </div>
        </ArgonBox>
        <ArgonBox p={3} mt={5} mb={5} style={{ backgroundColor: 'white', position: 'relative', borderRadius: 10 }}>
          <div className="d-flex justify-content-between">
            <h4 className='mb-3'>Promotion status</h4>
          </div>
          <div style={{ marginTop: 50, marginLeft: 50, marginRight: 50, marginBottom: 70 }}>
            <ProgressBar
              width={1000}
              height={18}
              percent={100 * (getStepPosition1(transfer1.status) / steps1.length)}
              filledBackground="dodgerblue">
              {steps1.map((step, index, arr) => {
                return (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        marginTop: 55,
                        width: 50,
                        height: 50,
                        color: "black",
                        backgroundColor: "lightgray"
                        // backgroundColor: accom ? "dodgerblue" : "lightgray"
                      }}>
                      {index + 1}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                        width: 50,
                        height: 50,
                        color: "black",
                      }}>
                      {step.status}
                    </div>
                  </div>
                );
              })}
            </ProgressBar>
          </div>
        </ArgonBox>
        <ArgonBox p={3} mt={5} mb={5} style={{ backgroundColor: 'white', position: 'relative', borderRadius: 10 }}>
          <div className="d-flex justify-content-between">
            <h4 className='mb-3'>Apprisal status</h4>
          </div>
          <div style={{ marginTop: 50, marginLeft: 50, marginRight: 50, marginBottom: 70 }}>
            <ProgressBar
              width={1000}
              height={18}
              percent={100 * (getStepPosition2(transfer2.status) / steps2.length)}
              filledBackground="dodgerblue">
              {steps2.map((step, index, arr) => {
                return (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        marginTop: 55,
                        width: 50,
                        height: 50,
                        color: "black",
                        backgroundColor: "lightgray"
                        // backgroundColor: accom ? "dodgerblue" : "lightgray"
                      }}>
                      {index + 1}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                        width: 50,
                        height: 50,
                        color: "black",
                      }}>
                      {step.status}
                    </div>
                  </div>
                );
              })}
            </ProgressBar>
          </div>
        </ArgonBox>
        
        
        <ArgonBox p={3} mt={5} mb={5} style={{ backgroundColor: 'white', position: 'relative', borderRadius: 10 }}>
          <div className="d-flex justify-content-between">
            <h4 className='mb-3'>Other status</h4>
          </div>
          <div style={{ marginTop: 50, marginLeft: 50, marginRight: 50, marginBottom: 70 }}>
            <ProgressBar
              width={1000}
              height={18}
              percent={100 * (getStepPosition3(transfer3.status) / steps3.length)}
              filledBackground="dodgerblue">
              {steps3.map((step, index, arr) => {
                return (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        marginTop: 55,
                        width: 50,
                        height: 50,
                        color: "black",
                        backgroundColor: "lightgray"
                        // backgroundColor: accom ? "dodgerblue" : "lightgray"
                      }}>
                      {index + 1}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                        width: 50,
                        height: 50,
                        color: "black",
                      }}>
                      {step.status}
                    </div>
                  </div>
                );
              })}
            </ProgressBar>
          </div>
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
