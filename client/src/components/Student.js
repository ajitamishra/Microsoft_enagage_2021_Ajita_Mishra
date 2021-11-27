import React, { useState, useEffect } from "react";
import axios from "axios";
import store from "../store";
import SubjectList from "../components/Assignment/SubjectList";

function Student() {
  const [subjects, setSubjects] = useState([]);
  const userId = store.getState().auth.user.userId;
  const username = store.getState().auth.user.name;

  const fetchSubject = async () => {
    const result = await axios.get(`/api/users/subjects/${userId}`);
    setSubjects(result.data);
    console.log(result);
  };
  useEffect(() => {
    fetchSubject();
  }, []);
  return (
    <div>
      <h5 className="user_name">Hello {username}!</h5>
      <h3 className="subject-heading">Subjects</h3>
      {subjects.length > 0 && <SubjectList subjects={subjects} />}
    </div>
  );
}

export default Student;
