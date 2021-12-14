import React from 'react'
import { withRouter } from 'react-router-dom';
import './topbar.css';
function Topbar({ path, title, history }) {
  // console.log(title);
  return (
    <div className="topbar">
      <span className="back" onClick={() => history.push(path || "/")}><i className="fas fa-arrow-left"></i>Back</span>
      <span>{title}</span>
    </div>
  )
}
export default withRouter(Topbar) 