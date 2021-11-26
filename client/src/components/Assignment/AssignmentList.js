import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import store from "../../store";
import axios from "axios";
import { Link } from "react-router-dom";
import createIcon from "../../assets/createIcon.svg"

function AssignmentList(props) {
  const params = props.match.params;
  const subjectId = params.id;
  const [assignments, setAssignments] = useState([]);
  const userId = store.getState().auth.user.userId;
  const userRole = store.getState().auth.user.role;
  const fetchAssignments = async () => {
    const result = await axios.get(
      `/api/users/assignments/${userId}/${subjectId}`
    );
    setAssignments(result.data);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);
  return (
    <div>
      {userRole === "Teacher" ? (
        <Link to={`/create-assignment/${subjectId}`} className="create_assignment_text"><img src={createIcon} className="createIcon_image"/> Create Assignment</Link>
      ) : null}
      {userRole !== "Teacher" &&
        assignments.length > 0 &&
        assignments.map((item) => {
          return (
            <div className="bar">
              <Link
                to={`/assignment/${subjectId}/${item.assignment_id}`}
                key={item.assignment_id}
              >
                {item.title}
              </Link>
            </div>
          );
        })}
      {userRole === "Teacher" &&
        assignments.length > 0 &&
        assignments.map((item) => {
          return (
            <div className="bar">
              <Link
                to={`/submission/${subjectId}/${item.assignment_id}`}
                key={item.assignment_id}
              >
                {item.title}
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default AssignmentList;
