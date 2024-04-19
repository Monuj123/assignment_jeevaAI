import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
const Create = () => {
  const [Doctor_name, setDoctor_name] = useState("");
  const [Patient_name, setPatient_name] = useState("");
  const [Patient_age, setPatient_age] = useState("");
  const [Date, setDate] = useState("");
  const fileInp = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(fileInp.current.files[0]);
    const file = fileInp.current.files[0]; // Get the first file selected by the user

    if (file) {
      console.log("start");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("doctorName", Doctor_name);
      formData.append("patientName", Patient_name);
      formData.append("patientAge", Patient_age);
      formData.append("dateOfRecording", Date);

      try {
        const response = await axios.post(
          "http://localhost:8000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  }

  //  const ageAsNumber = Number(age);
  return (
    <form className="create_form" onSubmit={handleSubmit}>
      <div className="container">
        <label>
          Doctor's name:
          <input
            value={Doctor_name}
            onChange={(e) => setDoctor_name(e.target.value)}
            type="text"
            required
          ></input>
        </label>
        <label>
          Patient's name:
          <input
            value={Patient_name}
            onChange={(e) => setPatient_name(e.target.value)}
            type=""
            required
          ></input>
        </label>
        <label>
          Patient's age:
          <input
            value={Patient_age}
            onChange={(e) => setPatient_age(e.target.value)}
            type="number"
            required
          ></input>
        </label>
        <label>
          Date of sound recording:
          <input
            value={Date}
            onChange={(e) => setDate(e.target.value)}
            type="Date"
            required
          ></input>
        </label>
        <label>
          Audio file: <input ref={fileInp} type="file" required></input>
        </label>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Create;
