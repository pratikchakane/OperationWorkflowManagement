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

// Operational Workflow Management MUI components
import ArgonBox from "components/ArgonBox";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import Grid from '@material-ui/core/Grid';

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout1";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from "react-select";
import axios from "axios";
import { ipofserver } from 'global';
import Icon from "@mui/material/Icon";
import ArgonTypography from "components/ArgonTypography";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import typography from "assets/theme/base/typography";

import React, { useEffect } from 'react';

const divStyle = {
  overflowY: 'scroll',
  // border:'1px solid red',
  width: '100%',
  float: 'left',
  height: '500px',
  position: 'relative',
  backgroundColor: '#E5E4E2'
};

// const Input0 = () => {
//   return <ArgonBox mb={2} mt={1} ml={3} mr={3}>
//     <ArgonInput type="text" placeholder="" size="large" />
//   </ArgonBox>;
// };

const options = [
  { label: "Select type", value: "" },
  { label: "Leave", value: "Leave" },
  { label: "Promotion", value: "Promotion" },
  { label: "Appraisal", value: "Appraisal" },
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

  const [graphlabel, setGraphlabel] = useState([])
  const [graphdata, setGraphdata] = useState([])

  useEffect(() => {
    setGraphlabel(["Apr", "May", "Jun"])
    setGraphdata([50, 40, 300])
  }, [])

  const gradientLineChartData = {
    labels: graphlabel,
    datasets: [
      {
        label: "Mobile apps",
        color: "info",
        data: graphdata,
      },
    ],
  };

  const { size } = typography;
  return (
    <IllustrationLayout
      title="Create form"
      description="Create any form which you want">

      {/* <Grid item xs={12} lg={7}> */}
      <GradientLineChart
        title="Sales Overview"
        description={
          <ArgonBox display="flex" alignItems="center">
            <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
              <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
            </ArgonBox>
            <ArgonTypography variant="button" color="text" fontWeight="medium">
              4% more{" "}
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                in 2022
              </ArgonTypography>
            </ArgonTypography>
          </ArgonBox>
        }
        chart={gradientLineChartData}
      />
      {/* </Grid> */}
    </IllustrationLayout >
  );
}

export default Illustration;


    // console.log(gloableList);
    // var formlab='';
    // gloableList.map((record) => (
    //   record[0] == "FormLabel"
    //     ? (formlab = record[1])
    //     : null
    // ))