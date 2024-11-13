// components/MainContent.js

import SectionContent from "./SectionContent";
import propTypes from "prop-types";

function MainContent({ selectedSection }) {
  return (
    <main className="p-4 md:p-8">
      <SectionContent selectedSection={selectedSection} />
    </main>
  );
}

MainContent.propTypes = {
    selectedSection: propTypes.func.isRequired,
}

export default MainContent;
