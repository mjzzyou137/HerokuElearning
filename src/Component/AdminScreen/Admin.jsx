import React from "react";
import Header from './Dashboard/Header'
import Control from './Control'
const withAdmin = Component => {
  class Admin extends React.Component {
    render() {
      return (
        <section className="admin">
          <Control />
          <div className="admin-right" style={{position:'relative'}}>
            <div className="bg-header">
              {/* <Header/> */}
              <Component/>
            </div>
            
          </div>
        </section>
      );
    }
  }
  return Admin;
};

export default withAdmin;
