import { Link } from "react-router-dom";

export default function BannerSection({ title, bg, text, link, showHeader }) {
  return (
    <>
      {showHeader && (
        <header className="fade-in">
          <h1>
            Explore <span>Wildlife</span>
          </h1>
        </header>
      )}

      {/* Section Block */}
      <section
        className="wrapper post bg-img"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="inner">
          <article className="box" data-aos="fade-up">
            <header>
              <h2>{title}</h2>
            </header>

            {text && (
              <div className="content">
                <p>{text}</p>
              </div>
            )}

            {link && (
              <footer>
                <Link to={link} className="button alt">
                  Learn More
                </Link>
              </footer>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
