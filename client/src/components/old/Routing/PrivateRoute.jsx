import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

function PrivateRoute(props) {
  // const {Conp}=props.component
  const { isAuthenticated, loading } = props.Auth;
  return (
    <Route
      path={props.path}
      render={(properties) => {
        console.log("component props", props);
        if (!isAuthenticated && loading) return <div>Loading...</div>;
        if (!loading && !isAuthenticated) return <Redirect to="/login" />;
        return <props.component {...properties} />;
      }}
    />
  );
}

const mapStateToProps = ({ Auth }) => ({ Auth });
export default connect(mapStateToProps)(PrivateRoute);
