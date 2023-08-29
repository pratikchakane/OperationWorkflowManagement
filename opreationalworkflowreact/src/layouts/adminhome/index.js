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

const divStyle = {
  overflowY: 'scroll',
  // border:'1px solid red',
  width: '100%',
  float: 'left',
  height: '600px',
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
  { label: "Others", value: "Others" },
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
  const [inputList, setInputList] = useState([]);
  const [gloableList, setGloableList] = useState([]);
  // --------------------------------------------------------------------------------------------
  const [show0, setShow0] = useState(false);
  const handleClose0 = event => {
    inputList.pop()
    setInputList(inputList.concat());
    setShow0(false);
  }
  const handleShow0 = () => setShow0(true);

  const [inputField0, setInputField0] = useState({
    model1in: '',
  })
  const inputsHandler0 = (e) => {
    const { name, value } = e.target;
    setInputField0((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const submitButton0 = () => {
    document.getElementById("input" + (inputList.length - 1).toString()).innerHTML = inputField0.model1in;
    gloableList.push("FormLabel&&" + inputField0.model1in)
    setInputField0({
      model1in: ''
    });
    setShow0(false);
  }

  // --------------------------------------------------------------------------------------------
  const [show, setShow] = useState(false);
  const handleClose = event => {
    inputList.pop()
    setInputList(inputList.concat());
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
    document.getElementById("input" + (inputList.length - 1).toString()).placeholder = inputField.model2in;
    gloableList.push("Input&&" + inputField.model2in)
    setInputField({
      model2in: ''
    });
    setShow(false);
  }

  // --------------------------------------------------------------------------------------------
  const [show5, setShow5] = useState(false);
  const handleClose5 = event => {
    inputList.pop()
    setInputList(inputList.concat());
    setShow5(false);
  }
  const handleShow5 = () => setShow5(true);

  const [inputField5, setInputField5] = useState({
    model2in: '',
  })
  const inputsHandler5 = (e) => {
    const { name, value } = e.target;
    setInputField5((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const submitButton5 = () => {
    document.getElementById("input" + (inputList.length - 1).toString()).placeholder = inputField5.model2in;
    gloableList.push("File&&" + inputField5.model2in)
    setInputField5({
      model2in: ''
    });
    setShow5(false);
  }

  // --------------------------------------------------------------------------------------------
  const [show1, setShow1] = useState(false);
  const handleClose1 = event => {
    inputList.pop()
    setInputList(inputList.concat());
    setShow1(false);
  }
  const handleShow1 = () => setShow1(true);

  const [inputField1, setInputField1] = useState({
    model3in: '',
  })
  const inputsHandler1 = (e) => {
    const { name, value } = e.target;
    setInputField1((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const submitButton1 = () => {
    // document.getElementById("input" + (inputList.length - 1).toString()).placeholder = inputField1.model3in;
    var values = inputField1.model3in.split("-");

    function select_default(all_options) {
      var temp = "";
      for (var i = 0; i < all_options.length; i++) {
        // temp += "<option value='" + all_options[i] + "' styles={styles}>" + all_options[i] + "</option>";          
        temp += "<option value='" + all_options[i] + "'>" + all_options[i] + "</option>";
      }
      document.getElementById("input" + (inputList.length - 1).toString()).innerHTML = temp;
    }
    select_default(values);
    gloableList.push("Select&&" + inputField1.model3in)
    setInputField1({
      model3in: ''
    });
    setShow1(false);
  }
  // --------------------------------------------------------------------------------------------
  const [show2, setShow2] = useState(false);
  const handleClose2 = event => {
    setInputList(inputList.concat());
    setShow2(false);
  }
  const handleShow2 = () => setShow2(true);

  const [userinfo, setUserInfo] = useState({
    languages: [],
  });
  const [typelist, settypelist] = useState([]);
  const handle = (e) => {
    const { value, checked } = e.target;
    const { languages } = userinfo;

    // console.log(`${value} is ${checked}`);
    if (checked) {
      setUserInfo({
        languages: [...languages, value],
      });
      typelist.push(value)
    }
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== value),
      });
      typelist.pop()
    }

    // console.log(typelist)
  };

  const submitButton2 = () => {
    setInputList(inputList.concat(<ArgonBox mb={2} mt={1} ml={3} mr={3}>
      <h3 className='mb-3' id={"input" + inputList.length.toString()}>Selected values are : {typelist.join("-")}</h3>
    </ArgonBox>));
    // alert(inputField2.model4in)
    // document.getElementById("input" + (inputList.length - 1).toString()).textContent = inputField2.model4in;
    gloableList.push("Checkbox&&" + typelist.join("-"))
    // setInputField2({
    //   model4in: ''
    // });
    setShow2(false);
  }

  // --------------------------------------------------------------------------------------------
  const onAddBtnClick0 = event => {
    setInputList(inputList.concat(<ArgonBox mb={2} mt={1} ml={3} mr={3}>
      <h3 className='mb-3' id={"input" + inputList.length.toString()}>Heading</h3>
    </ArgonBox>));
    handleShow0()
  };

  const onAddBtnClick = event => {
    setInputList(inputList.concat(<ArgonBox mb={2} mt={1} ml={3} mr={3}>
      <ArgonInput type="text" placeholder="" size="large" id={"input" + inputList.length.toString()} />
    </ArgonBox>));
    handleShow()
  };

  const onAddBtnClick5 = event => {
    setInputList(inputList.concat(<ArgonBox mb={2} mt={1} ml={3} mr={3}>
      <ArgonInput type="file" placeholder="" size="large" id={"input" + inputList.length.toString()}/>
    </ArgonBox>));
    handleShow5()
  };

  const onAddBtnClick1 = event => {
    setInputList(inputList.concat(<ArgonBox mb={2} mt={1} ml={3} mr={3}>
      {/* <Select className="select" styles={styles} id={"input" + inputList.length.toString()} /> */}
      <Form.Select aria-label="Default select example" id={"input" + inputList.length.toString()}>
        <option>Select option</option>
      </Form.Select>
    </ArgonBox>));
    handleShow1()
  };

  const onAddBtnClick2 = event => {
    settypelist([])
    handleShow2()
  };

  const onAddBtnClick3 = event => {
    inputList.pop()
    gloableList.pop()
    setInputList(inputList.concat());
  };

  // --------------------------------------------------------------------------------------------
  const [show3, setShow3] = useState(false);
  const handleClose3 = event => {
    setShow3(false);
  }
  const handleShow3 = () => setShow3(true);

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = e => {
    setSelectedValue(e.value);
  }

  const onAddBtnClick4 = event => {
    if (inputList.length == 0) {
      alert("Select any input in form !")
    }
    else {
      handleShow3();
    }
  };

  const SubmitForm = event => {
    // console.log(gloableList)
    axios.post(ipofserver + 'addFormDetails', {
      typeofform: selectedValue,
      formval: gloableList
    })
      .then(function (response) {
        if (response.data == "success") {
          setShow3(false);
          alert("Form added !")
          setInputList([]);
          setGloableList([]);
        }
        else {
          setShow3(false);
          alert("Something wrong !")
        }
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <IllustrationLayout
      title="Create form"
      description="Create any form which you want">
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <div style={divStyle}>
            {inputList}
          </div>
        </Grid>
        <Grid item xs={2}>
          <ArgonBox mb={1}>
            <ArgonButton color="info" size="large" onClick={onAddBtnClick0} style={{ height: "70px", fontSize: "15px" }} fullWidth>
              Add Form Label
            </ArgonButton>
          </ArgonBox>
          <ArgonBox mt={3} mb={1}>
            <ArgonButton color="info" size="large" onClick={onAddBtnClick} style={{ height: "70px", fontSize: "15px" }} fullWidth>
              Add Input
            </ArgonButton>
          </ArgonBox>
          <ArgonBox mt={3} mb={1}>
            <ArgonButton color="info" size="large" onClick={onAddBtnClick5} style={{ height: "70px", fontSize: "15px" }} fullWidth>
              Add File input
            </ArgonButton>
          </ArgonBox>
          <ArgonBox mt={3} mb={1}>
            <ArgonButton color="info" size="large" onClick={onAddBtnClick1} style={{ height: "70px", fontSize: "15px" }} fullWidth>
              Add Select
            </ArgonButton>
          </ArgonBox>
          <ArgonBox mt={3} mb={1}>
            <ArgonButton color="info" size="large" onClick={onAddBtnClick2} style={{ height: "70px", fontSize: "15px" }} fullWidth>
              Add Checkbox
            </ArgonButton>
          </ArgonBox>
          <ArgonBox mt={3} mb={1}>
            <ArgonButton color="info" size="large" onClick={onAddBtnClick3} style={{ height: "70px", fontSize: "15px" }} fullWidth>
              Remove
            </ArgonButton>
          </ArgonBox>
          <ArgonBox mt={3} mb={1}>
            <ArgonButton color="info" size="large" onClick={onAddBtnClick4} style={{ height: "70px", fontSize: "15px" }} fullWidth>
              Submit Form
            </ArgonButton>
          </ArgonBox>
        </Grid>
      </Grid>

      <Modal show={show0} onHide={handleClose0}>
        <Modal.Header closeButton>
          <Modal.Title>Heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ArgonBox m={2}>
            <ArgonInput type="text" placeholder="Enter form label" size="large" name="model1in" value={inputField0.model1in}
              onChange={inputsHandler0} />
          </ArgonBox>
        </Modal.Body>
        <Modal.Footer>
          <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px" }}
            onClick={handleClose0}>
            Close
          </ArgonButton>
          <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px", marginLeft: "20px" }}
            onClick={submitButton0}>
            Set
          </ArgonButton>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Placeholder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ArgonBox m={2}>
            <ArgonInput type="text" placeholder="Enter Placeholder for input" size="large" name="model2in" value={inputField.model2in}
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
            Set
          </ArgonButton>
        </Modal.Footer>
      </Modal>

      <Modal show={show5} onHide={handleClose5}>
        <Modal.Header closeButton>
          <Modal.Title>Placeholder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ArgonBox m={2}>
            <ArgonInput type="text" placeholder="Enter Placeholder for file" size="large" name="model2in" value={inputField5.model2in}
              onChange={inputsHandler5} />
          </ArgonBox>
        </Modal.Body>
        <Modal.Footer>
          <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px" }}
            onClick={handleClose5}>
            Close
          </ArgonButton>
          <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px", marginLeft: "20px" }}
            onClick={submitButton5}>
            Set
          </ArgonButton>
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Select values</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ArgonBox m={2}>
            <ArgonInput type="text" placeholder="Enter Select values" size="large" name="model3in" value={inputField1.model3in}
              onChange={inputsHandler1} />
          </ArgonBox>
        </Modal.Body>
        <Modal.Footer>
          <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px" }}
            onClick={handleClose1}>
            Close
          </ArgonButton>
          <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px", marginLeft: "20px" }}
            onClick={submitButton1}>
            Set
          </ArgonButton>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Checkbox values</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-check m-3">
                <input className="form-check-input" type="checkbox" name="languages" value="HR" id="flexCheckDefault" onChange={handle} />
                <label className="form-check-label" htmlFor="flexCheckDefault">HR</label>
              </div>
              <div className="form-check m-3">
                <input className="form-check-input" type="checkbox" name="languages" value="Project manager" id="flexCheckDefault" onChange={handle} />
                <label className="form-check-label" htmlFor="flexCheckDefault">Project manager</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check m-3">
                <input className="form-check-input" type="checkbox" name="languages" value="Team Leader" id="flexCheckDefault" onChange={handle} />
                <label className="form-check-label" htmlFor="flexCheckDefault">Team Leader</label>
              </div>
              <div className="form-check m-3">
                <input className="form-check-input" type="checkbox" name="languages" value="Junior" id="flexCheckDefault" onChange={handle} />
                <label className="form-check-label" htmlFor="flexCheckDefault">Junior</label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px" }}
            onClick={handleClose2}>
            Close
          </ArgonButton>
          <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px", marginLeft: "20px" }}
            onClick={submitButton2}>
            Set
          </ArgonButton>
        </Modal.Footer>
      </Modal>

      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to submit this form ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ArgonBox mb={2}>
            <Select className="select" styles={styles} options={options} onChange={handleChange}
              value={options.find(obj => obj.value === selectedValue)} />
          </ArgonBox>
        </Modal.Body>
        <Modal.Footer>
          <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px" }}
            onClick={handleClose3}>
            No
          </ArgonButton>
          <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px", marginLeft: "20px" }}
            onClick={SubmitForm}>
            Yes
          </ArgonButton>
        </Modal.Footer>
      </Modal>


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