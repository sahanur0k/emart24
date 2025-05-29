import React, { Fragment, useContext } from "react";
import Layout from "../layout";
import { LayoutContext } from "../layout";
import AboutContent from "./AboutContent";

const AboutComponent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Layout>
        <div className="flex-grow">
          <AboutContent />
        </div>
      </Layout>
    </div>
  );
};

const About = () => {
  const { data: layoutData } = useContext(LayoutContext);

  return (
    <Fragment>
      <AboutComponent />
    </Fragment>
  );
};

export default About;
