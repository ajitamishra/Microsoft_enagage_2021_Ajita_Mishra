import React, { useEffect, useState } from "react";
import axios from "axios";
import store from "../../store";
import uploadSvg from "../../assets/upload.svg";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function Assignment(props) {
 let fileName;
  const [file, setFile] = useState(null);
  const [assignment, setAssignment] = useState([]);
  const params = props.match.params;
  const { assignmentId, subjectId } = params;
  const userId = store.getState().auth.user.userId;
 const [reload,setReload]=useState(false)
  const handleUpload = (e) => {

    e.preventDefault();
    const form = document.getElementById("file-upload-form");
    let formData = new FormData(form);
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("subjectId", subjectId);
    formData.append("assignmentId", assignmentId);
    toast.promise(
    axios
      .post("/api/users/submit-assignment", formData)
      .then((res) => {
        //toast.success("File Uploaded Successfully")
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

  const fetchAssignment = async () => {
    const result = await axios.get(
      `/api/users/assignments/${userId}/${subjectId}`
    );

    const assign = result.data.filter((item) => {
      return item.assignment_id === assignmentId;
    });
    console.log(assign);
    setAssignment(assign);
    if(assignment.length>0)
    {
     fileName = assignment[0].path;
    fileName=fileName.replace(/^.*[\\\/]/, "");
    }
  };

  const downloadFile = async (fileName) => {
    window.open(
      `http://localhost:5000/api/subjects/download/${fileName}`,
      "_blank"
    );
    toast.success("File Downloaded Successfully");
  };
  useEffect(() => {
    fetchAssignment();
  }, []);
  return (
    <div>
      {assignment.length > 0 && (
        <div className="assignment">
          <h3>{assignment[0].title}</h3>
          <h5>{assignment[0].instruction}</h5>
          <br />
          <h6>Download Assignment</h6>
          <button
            onClick={() => downloadFile(assignment[0].path.replace(/^.*[\\\/]/, ""))}
          >
           {assignment[0].path.replace(/^.*[\\\/]/, "")}
          </button>
          <br/>
          <br/>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleUpload}
            id="file-upload-form"
          >
            <div>
     

              <input type="file" id="file-upload" onChange={handleFileChange} />
            </div>
            <br />
            <div>
              <img
                src={uploadSvg}
                alt="upload"
                className="upload_svg"
                onClick={handleUpload}
              />
              <h6>Upload Submission</h6>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Assignment;
