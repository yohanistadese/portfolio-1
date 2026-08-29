import useDocumentTitle from "../useDocumentTitle.js";
import { EXPERIENCE } from "../data/experience.js";

export default function Experience() {
  useDocumentTitle("Experience — Yohanis Tadese");

  return (
    <div className="inner-page wrap">
      <header className="page-heading">
        <p className="kicker">Work history</p>
        <h1>Experience</h1>
        <p className="lead">Building production software, leading delivery, and working directly with stakeholders.</p>
      </header>
      <div className="experience-list">
        {EXPERIENCE.map((job) => (
          <article key={`${job.company}-${job.period}`}>
            <div className="experience-summary">
              <div>
                <h2>{job.role}</h2>
                <p>{job.company} · {job.location}</p>
              </div>
              <p>{job.period}</p>
            </div>
            <ul>
              {job.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
