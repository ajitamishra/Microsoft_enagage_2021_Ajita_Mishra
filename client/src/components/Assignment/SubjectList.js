import React from 'react';
import {Link} from 'react-router-dom'

function SubjectList({subjects}) {
    return (
        <div>
            {subjects!==null && subjects.map((subject)=>{
                return   <div className="bar"><Link to={`subjects/${subject.subjectId}`}  className="subject_name_text"  >
                {subject.title}
              </Link></div>
            })}
        </div>
    )
}

export default SubjectList
