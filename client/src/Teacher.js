import "./App.css";
import React, { useRef, useState } from "react";

function Teacher() {
    const [isNLP, setisNLP] = useState(false);
    const [isNetworkSecurity, setisNetworkSecurity] = useState(false);
    const file=useRef(null);

    const handleUpload=(e)=>{
    e.preventDefault();
    console.log(file.current.value);
  }
    return (
        <div>
     <h3 className="subject-heading">Assignments</h3>
      <div className="subjects">

        <button className="bar" onClick={() => setisNLP(!isNLP)}>
          Natural Language Processing
        </button>
        {isNLP ? (
          <div>
            <div>
            <h2>Upload Assignment</h2>
            <form onSubmit={handleUpload}>
              <div>
                <input ref={file}  type="file"/>
              </div>
              <br/>
              <div>
                <button>Upload</button>
              </div>
              
            </form>
          </div>
          <br/>
          <br/>
            <table className="submission">
                <th className="submission-details">Student Reg No.</th>
                <th className="submission-details">Submission</th>
                <th className="submission-details">Download</th>
                <th className="submission-details">TimeStamp</th>
                <tr></tr>
            </table>
          </div>
        ) : null}


      </div>
        </div>
    )
}

export default Teacher
