import useDocumentTitle from "../useDocumentTitle.js";

export default function Resume() {
  useDocumentTitle("Resume — Yohanis Tadese");

  return (
    <div className="inner-page wrap">
      <div className="resume-card">
        <p className="kicker">Resume</p>
        <h1>Download my resume</h1>
        <p className="lead">A one-page PDF covering experience, projects and technical skills.</p>
        <a className="download-btn" href="/Yohanis_Tadese_Resume.pdf" download>
          Download resume (PDF)
        </a>
      </div>
    </div>
  );
}
