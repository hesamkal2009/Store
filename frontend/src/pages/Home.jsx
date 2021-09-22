import React from "react";
import Header from "../views/Header";
import Footer from "../views/Footer";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Header {...this.props} />

          <Footer {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
