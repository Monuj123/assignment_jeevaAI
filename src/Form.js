import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import "./App.css";
const Form = () => {
  const [datas, setData] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch(e) {
    try {
      const data = await axios.get("http://localhost:8000");
      setData(data.data);
      console.log(data);
    } catch (error) {
      console.error("Error uploading", error);
    }
  }
  return (
    <div className="home">
      <h2>Records</h2>
      <Create />
      {datas.length === 0 && <h2>No records</h2>}
      <table class="table table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Doctor's name</th>
            <th scope="col">Patient's name</th>
            <th scope="col">Patient's age</th>
            <th scope="col">Date of recording</th>
            <th scope="col">Audio</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, idx) => (
            <tr>
              <th scope="row">{idx + 1}</th>
              <td>{data.doctorName}</td>
              <td>{data.patientName}</td>
              <td>{data.patientAge}</td>
              <td>{data.dateOfRecording}</td>
              <td>{data.audioId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Form;
