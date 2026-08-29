import useDocumentTitle from "../useDocumentTitle.js";
import { PROJECTS } from "../data/projects.js";

export default function Projects() {
  useDocumentTitle("Projects — Yohanis Tadese");

  return (
    <div className="inner-page wrap">
      <header className="page-heading">
        <p className="kicker">Selected work</p>
        <h1>Projects</h1>
        <p className="lead">Production products I've worked on across web, mobile, backend, and AI.</p>
      </header>
      <div className="project-list">
        {PROJECTS.map((project) => (
          <article className="project-card" key={project.title}>
            <h2>{project.title}</h2>
            <ul className="project-description">
              {project.description.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="tech-stack">{project.stack}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
