import React from "react";
import Header from "./Dashboard/Header";
import Control from "./Control";
import { connect } from "react-redux";
const withAdminSettingCourse = Component => {
  class AdminSettingCourse extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <section className="admin">
          <Control />
          <div className="admin-right" style={{ position: "relative" }}>
            <div className="bg-header bg-header-2"> 
              <Component {...this.props} />
            </div>
          </div>
        </section>
      );
    }
  }
  return connect()(AdminSettingCourse);
};

export default withAdminSettingCourse;
