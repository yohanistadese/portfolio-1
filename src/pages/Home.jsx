import useDocumentTitle from "../useDocumentTitle.js";
import { SERVICES } from "../data/services.js";
import { TESTIMONIALS } from "../data/testimonials.js";

export default function Home() {
  useDocumentTitle("Yohanis Tadese — Full Stack Software Engineer");

  return (
    <section className="intro wrap">
      <h1>Yohanis Tadese</h1>
      <p className="kicker">Full Stack Software Engineer</p>
      <div className="about-copy">
        <p>Most software problems are not caused by a missing feature. They come from poor structure, slow performance, or code that has become difficult to change.</p>
        <p>I build and maintain web, Android, backend, and AI products using React, React Native, Node.js, TypeScript, Python, PostgreSQL, and Redis. Before I write code, I make sure I understand the real problem and how the software needs to work for the people using it.</p>
        <p>
          I have 3+ years of experience and I'm a{" "}
          <a href="https://upwork.com/freelancers/yohanistadese" target="_blank" rel="noreferrer">
            <strong>Top Rated developer on Upwork</strong>
          </a>
          . I've helped replace a 30-year-old desktop system, delivered more than 30 operational reports, and reduced infrastructure costs by about 50%.
        </p>
      </div>
      <section className="work-on" aria-labelledby="work-on-title">
        <h2 id="work-on-title">What I can help with</h2>
        <ul>
          {SERVICES.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </section>
      <section className="work-on" aria-labelledby="process-title">
        <h2 id="process-title">How I work</h2>
        <p>I keep the architecture as simple as the product allows, write code that another engineer can understand, and communicate clearly about progress and tradeoffs. I'm comfortable working directly with clients, reviewing code, coordinating delivery, and supporting a product after release.</p>
      </section>
      <section className="reviews" aria-labelledby="reviews-title">
        <h2 id="reviews-title">What clients say</h2>
        {TESTIMONIALS.map((t) => (
          <figure key={t.author}>
            <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption>{t.author}</figcaption>
          </figure>
        ))}
      </section>
    </section>
  );
}
