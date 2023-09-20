import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    getWorkers();
  }, []);	
  	
  const getWorkers = async () => {
    const response = await axios.get("http://localhost:5000/workers");
    setWorkers(response.data);
  };

  const deleteWorker = async (workerId) => {
    await axios.delete(`http://localhost:5000/workers/${workerId}`);
    getWorkers();
  };

  return (
    <div>
      <h1 className="title">Workers</h1>
      <h2 className="subtitle">List of Workers</h2>
      <Link to="/workers/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Worker Name</th>
            <th>Surname</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker, index) => (
            <tr key={worker.uuid}>
              <td>{index + 1}</td>
              <td>{worker.name}</td>
              <td>{worker.surname}</td>
              <td>{worker.user.name}</td>
              <td>
                <Link
                  to={`/workers/edit/${worker.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteWorker(worker.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerList;
