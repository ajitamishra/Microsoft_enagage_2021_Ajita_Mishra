import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


function CreateAssignment(props) {
  const title = useRef(null);
  const instructions = useRef(null);
  const {subjectId}=props.match.params;
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    const form = document.getElementById("file-upload-form");
    let formData = new FormData(form);
    formData.append("file", file);
    formData.append("title", title.current.value);
    formData.append("instruction", instructions.current.value);
    formData.append("subjectId", subjectId);
    toast.promise(
    axios
      .post("/api/subjects/create-assignment", formData)
      .then((res) => {
        console.log("Assignment created!!!");
      })
      .catch((err) => {
        console.log(err);
      }),
      {
        pending: "Uploading File",
        success: "File Uploaded Successfully",
        error: "File Upload Failed",
      }
    );

    setFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0].size < 100000000) {
      setFile(e.target.files[0]);
    } else {
      toast.error("File size is too large, try less than 10MB");
    }
  };
  return (
    <div>
      <div className="assignment_teacher_view">
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleUpload}
          id="file-upload-form"
          classNameName="assignment_form_teacher_view"
        >
          <div className="row">
            <div className="input-field">
              <input ref={title} id="Title" type="text" className="validate" />
              <label for="Title">Title</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <textarea
                ref={instructions}
                id="Instructions"
                type="text"
                className="materialize-textarea"
              ></textarea>
              <label for="Instructions">Instructions</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <input type="file" id="file-upload" onChange={handleFileChange} />
            </div>
          </div>
          <div className="row">
            <div>
              <button>Create Assignment</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAssignment;
