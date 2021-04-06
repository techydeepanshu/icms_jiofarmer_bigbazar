import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import Spinner from "../../UI/Spinner/Spinner";
const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(null);
  const [header, setHeader] = useState([]);
  useEffect(() => {
    const ref = firebase.database().ref("/queue");
    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val());
        setQueue(data);
        setLoader(false)
      }
    });
  }, []);
  const setContentExtra = (o) => {
    setContent(o);
    let header = [];
    for (var prop in o) {
      if (Object.prototype.hasOwnProperty.call(o, prop)) {
        header.push(prop);
      }
    }
    setHeader(header);
  };
   if (loader) {
     return <Spinner />;
   }
  return (
    <div style={{ marginTop: "90px" }}>
      <div className="row">
        {queue.map((q, i) => (
          <div className="col-md-4" key={q.sku} style={{ padding: "10px" }}>
            <div style={{ border: "1px solid grey", margin: "10px" }}>
              <div className="text-center bg-secondary">{q.itemNo}</div>
              <br />
              <div className="text-center">{q.description}</div>
              <br />
              <div className="row" style={{ marginBottom: "10px" }}>
                <div className="col-md-9"></div>
                <div className="col-md-3">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      setShowModal(true);
                      setContentExtra(q);
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal ? (
        <table
          className="table table-bordered table-sm"
          style={{ marginTop: "40px" }}
        >
          <thead className="thead-dark">
            <tr>
              {header.map((o, i) => (
                <th key={i} scope="col">
                  {o}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {header.map((o, i) => (
                <td key={i}>{content[o].toString()}</td>
              ))}
            </tr>
          </tbody>
        </table>
      ) : null}
      <div className="row" style={{ marginTop: "40px" }}>
        <div className="col-md-2">
          <Link className="btn btn-lg btn-info" to="/invoice">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Queue;
