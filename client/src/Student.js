import "./App.css";
import React, { useRef, useState } from "react";

function Student() {
    
    const [isNLP, setisNLP] = useState(false);
    const [isNetworkSecurity, setisNetworkSecurity] = useState(false);
    const file=useRef(null);

    const handleUpload=(e)=>{
    e.preventDefault();
    console.log(file.current.value);
  }
    return (
        <div>
            {/* <header className="header">Student Assignment Submission Portal</header> */}
       <h3 className="subject-heading">Assignments</h3>
      <div className="subjects">
        <button className="bar" onClick={() => setisNLP(!isNLP)}>
          Natural Language Processing
        </button>
        {isNLP ? (
          <div>
            <h2>Write a python program to scrape twitter data</h2>
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
        ) : null}

<button className="bar" onClick={() => setisNetworkSecurity(!isNetworkSecurity)}>
          Network Security
        </button>
        {isNetworkSecurity ? (
          <div>
            <h2>Write a python program to scrape twitter data</h2>
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
        ) : null}
      </div>
    </div> 
        
    )
}

export default Student
