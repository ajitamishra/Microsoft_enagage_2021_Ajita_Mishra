import React, { useEffect, useState } from "react";
import axios from "axios";
import downloadSvg from "../../assets/download.svg";
import millisecondsToStr from "../../utils/time";


function AssignmentSubmissions(props) {
    const params = props.match.params;
    const { assignmentId } = params;
    const [submissions, setSubmissions] = useState([]);
    const fetchSubmissions = async () => {
        const result = await axios.get(`/api/subjects/all-submissions/AS01`);
        setSubmissions(result.data);
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const downloadFile = async (fileName) => {
        window.open(`http://localhost:5000/api/subjects/download/${fileName}`, "_blank");
        console.log("File Downloaded Successfully");

    };

    const timeElapsed = (time) => {
        return (
          millisecondsToStr(new Date().getTime() - new Date(time).getTime()) +
          " ago"
        );
      };

    return (
        <div>
            <h4>Submissions</h4>
            {submissions.length > 0 && (
                <div className="submissions_teacher_view">
                    <table>
                        <thead>
                            <tr>
                                <th>Student Reg No.</th>
                                <th>Submission</th>
                                <th>Download</th>
                                <th>TimeStamp</th>
                            </tr>
                        </thead>

                        <tbody>
                            {submissions.map((submission) => {
                                let fileName = submission.path;
                                fileName=fileName.replace(/^.*[\\\/]/, "");
                                return (
                                    <>
                                        <tr>
                                            <td>{submission.userId}</td>
                                            <td>{fileName}</td>
                                            <td>
                                                <button className="downloadSVG" onClick={() => downloadFile(fileName)}>
                                                    <img
                                                        src={downloadSvg}
                                                        alt="download"
                                                        
                                                    />
                                                </button>
                                            </td>
                                            <td>{timeElapsed(new Date(submission.time).getTime())}</td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>

                    <table className="submission">
                        <tr></tr>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AssignmentSubmissions;

