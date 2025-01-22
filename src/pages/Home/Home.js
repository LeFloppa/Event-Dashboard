import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

import aiPoster from "../../assets/images/test1.jpg";
import cloudPoster from "../../assets/images/test2.jpg";
import cyberPoster from "../../assets/images/test3.jpg";

function Home() {
  const events = [
    {
      id: 101,
      title: "AI Revolution",
      description: `Discover the latest breakthroughs in Artificial Intelligence. Engage with top researchers driving innovations in neural networks. Explore real-world applications transforming industries worldwide. 
      
      Experience hands-on demos and practical workshops. Collaborate with peers who are shaping the future of AI.`,
      viewers: 258,
      poster: aiPoster,
    },
    {
      id: 202,
      title: "Cloud Expo",
      description: `Dive into cutting-edge cloud technologies and DevOps best practices. Hear from major providers on optimizing costs and improving scalability. 

      Gain insights on container orchestration and microservices architectures. Participate in lab sessions for hands-on deployment experience. Network with fellow professionals pushing the boundaries of cloud computing.`,
      viewers: 124,
      poster: cloudPoster,
    },
    {
      id: 303,
      title: "CyberSec Meet",
      description: `Stay informed on the latest cybersecurity threats in an ever-evolving digital world. Learn defensive strategies from top ethical hackers and security experts. Understand how to protect infrastructures from ransomware and advanced attacks. 

      Engage in interactive sessions covering incident response and forensic analysis. Collaborate with a global community dedicated to safeguarding the internet.`,
      viewers: 78,
      poster: cyberPoster,
    },
  ];

  return (
    <div>
      <Banner />

      <section className="events-section">
        <div className="section-deco">
          <span className="line"></span>
          <h2 className="section-title">Ongoing Events</h2>
          <span className="line"></span>
        </div>

        <div className="events-list">
          {events.map((evt, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={evt.id}
                className={`event-card ${isEven ? "even" : "odd"}`}
              >
                <div className="col-left">
                  {isEven ? (
                    <div className="poster-wrapper">
                      <img
                        src={evt.poster}
                        alt={evt.title}
                        className="event-poster"
                      />
                      <a href={`/events/${evt.id}`} className="event-btn">
                        View Details
                      </a>
                    </div>
                  ) : (
                    <div className="viewers-wrapper">
                      <span className="viewers-count viewers-icon">
                        {evt.viewers}{" "}
                        <FontAwesomeIcon
                          icon={faUser}
                          className="viewers-icon"
                        />
                      </span>
                      <span className="viewers-label">Currently Watching</span>
                    </div>
                  )}
                </div>

                <div className="divider"></div>

                <div className="col-center">
                  <h3 className="event-title">{evt.title}</h3>
                  <p className="event-desc">{evt.description}</p>
                </div>

                <div className="divider"></div>

                <div className="col-right">
                  {isEven ? (
                    <div className="viewers-wrapper">
                      <span className="viewers-count viewers-icon">
                        {evt.viewers}{" "}
                        <FontAwesomeIcon
                          icon={faUser}
                          className="viewers-icon"
                        />
                      </span>
                      <span className="viewers-label">Currently Watching</span>
                    </div>
                  ) : (
                    <div className="poster-wrapper">
                      <img
                        src={evt.poster}
                        alt={evt.title}
                        className="event-poster"
                      />
                      <a href={`/events/${evt.id}`} className="event-btn">
                        View Details
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
