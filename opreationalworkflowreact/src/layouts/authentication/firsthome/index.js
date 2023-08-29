/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { ipofserver } from 'global';

// Images
const bgImage = ipofserver + "/static/img1.png";
const firstimg = ipofserver + "/static/img3.png";
const secimg = ipofserver + "/static/img4.png";
const fifthimg = ipofserver + "/static/img5.png";
const sixthimg = ipofserver + "/static/img6.png";
const seventhimg = ipofserver + "/static/img7.png";

function Cover() {
  return (
    <CoverLayout
      title="Welcome!"
      description="Join other users who use Cflow for better workflow experience!"
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card style={{ width: "1288px", marginLeft: "-480px" }}>
        <div style={{ marginBottom: "40px", marginTop: "70px" }}>
          <div className="container">

            <div className="paragraphs">
              <Grid container spacing={2}>
                <Grid item xs={7.5}>
                  <img className="img1" src={firstimg} style={{ height: "400px" }} />
                </Grid>
                <Grid item xs={4.5}>
                  <div className="content-heading">
                    <h3>HR and Admin</h3>
                    <p style={{ fontSize: "15px" }}>Trusted and loved by customers across the globe, Cflow is the preferred workflow automation software for small, medium, and enterprise businesses.

                      The all-in-one workflow software to get your workflows automated. Set up automation rules, make use of intuitive features like the customizable dashboard, reports & analytics. Automated process workflows dramatically improve productivity and eliminate chaos.

                      Built on powerful BPM methodologies, Cflow helps create efficiencies that scale as your business grows with streamlined workflow management.</p>

                    <Link className="btn btn-outline-primary" to="/authentication/sign-in">Know more</Link>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="content-heading">
                    <h3>Track & review on the go.</h3>
                    <p style={{ fontSize: "15px" }}>10x more organized and productive management. Review end-to-end processes anytime, anywhere, just with your mobile phone.

                      Cflow lets you accelerate day-to-day process workflows, save working hours, and focus on the productivity and growth of your team.

                      Pre-installed workflow apps that automate repetitive tasks like approval of invoices, business enquiry requests, travel/business trip expenses, purchase requests, vacation requests, etc.

                      Secure all your company files and documents on the cloud-based SaaS platform.</p>

                    <Link className="btn btn-outline-primary" to="/authentication/sign-in">Read more</Link>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <img className="img2" src={secimg} style={{ height: "400px", width: "500px" }} />
                </Grid>

                <Grid item xs={7.5}>
                  <img className="img1" src={fifthimg} style={{ height: "400px", width: "700px" }} />
                </Grid>
                <Grid item xs={4.5}>
                  <div className="content-heading mt-3">
                    <h3>Employee onboarding</h3>
                    <p style={{ fontSize: "15px" }}>Get your employees on-boarded on day one with a well-defined workflow process specifically designed for your organization. Your form may look something like this, but you always have the choice to customize and deploy an onboarding form that fits right away in your organization.</p>
                    <Link className="btn btn-outline-primary" to="/authentication/sign-in">Know more</Link>
                  </div>
                </Grid>

                <Grid item xs={5.5}>
                  <div className="content-heading mt-3">
                    <h3>Leave application process</h3>
                    <p style={{ fontSize: "15px" }}>Your employees no longer have to fret about sending their leave applications via email or an arcane application. Cflow provides an easy to use modern interface for the millennial worker and the flexibility to design the workflow that changes as your organization grows. Saves enormous time spent in paper transactions and emails and spreadsheets.</p>

                    <Link className="btn btn-outline-primary" to="/authentication/sign-in">Know more</Link>
                  </div>
                </Grid>
                <Grid item xs={6.5}>
                  <img className="img1" src={sixthimg} style={{ height: "400px" }} />
                </Grid>

                <Grid item xs={7}>
                  <img className="img1" src={seventhimg} style={{ height: "400px" }} />
                </Grid>
                <Grid item xs={5}>
                  <div className="content-heading mt-3">
                    <h3>Recruitment process</h3>
                    <p style={{ fontSize: "15px" }}>Find and hire potential candidates by creating a recruitment process. Makes it easier for the HR & Admin department to collect all information in a central database, share company policies, negotiate salary package and release customized offer letters.</p>

                    <Link className="btn btn-outline-primary" to="/authentication/sign-in">Know more</Link>
                  </div>
                </Grid>

              </Grid>

            </div>

          </div>
        </div>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
