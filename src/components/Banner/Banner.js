import React, { useEffect, useRef, useState } from "react";
import "./Banner.css";
import interstellarPoster from "../../assets/images/Event1.jpg";

function Banner() {
  const bannerRef = useRef(null);

  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    const bannerEl = bannerRef.current;
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (bannerEl) {
        const halfHeight = bannerEl.offsetHeight * 0.3;
        if (currentScroll > halfHeight && currentScroll > lastScroll) {
          setHideContent(true);
        } else if (currentScroll < lastScroll) {
          setHideContent(false);
        }
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    window.addEventListener("resize", () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });

    const pairs = createPairs(25, canvas.width, canvas.height);

    let dynamicLinks = [];

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pairs.forEach((pair) => {
        updatePair(pair, canvas.width, canvas.height);
      });

      handleDynamicLinks(pairs, dynamicLinks);

      pairs.forEach((pair) => drawPair(ctx, pair));
      dynamicLinks.forEach((link) => drawLink(ctx, link));

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", () => {});
      cancelAnimationFrame(animId);
    };
  }, []);

  const leftClass = hideContent ? "banner-left hidden-left" : "banner-left";
  const rightClass = hideContent ? "banner-right hidden-right" : "banner-right";

  return (
    <section ref={bannerRef} className="banner-container">
      <canvas ref={canvasRef} className="banner-canvas"></canvas>
      <div className={leftClass}>
        <h1 className="banner-site-title">TekWave</h1>
        <div className="banner-site-text">
          <p>
            TekWave is the leading platform to discover and manage all
            technology-related events. Conferences, workshops, and fairs— we
            connect the tech community to advance innovation.
          </p>
          <p>
            Join us and dive into the future of technology! Explore cutting-edge
            trends, meet industry experts, and collaborate with other passionate
            professionals.
          </p>
        </div>
      </div>
      <div className={rightClass}>
        <p className="main-event-subtitle">DON'T MISS IT!</p>
        <h2 className="main-event-title">Main Tech Event</h2>
        <p className="main-event-desc">
          The biggest conference of the year. Join us for cutting-edge
          technologies and workshops!
        </p>
        <div className="main-event-poster">
          <img src={interstellarPoster} alt="Event Poster" />
        </div>
        <a href="/events/123" className="event-btn">
          View Details
        </a>
      </div>
      <a href="#events-section" className="banner-see-more">
        See more
        <div className="wide-arrow">
          <span className="v-shape">V</span>
        </div>
      </a>
    </section>
  );
}

export default Banner;

function createPairs(numPairs, width, height) {
  const pairs = [];
  for (let i = 0; i < numPairs; i++) {
    const p1 = {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      angle: Math.random() * 360,
    };
    const p2 = {
      x: p1.x + (Math.random() - 0.5) * 40,
      y: p1.y + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      angle: Math.random() * 360,
    };
    pairs.push({ p1, p2 });
  }
  return pairs;
}

function updatePair(pair, w, h) {
  const { p1, p2 } = pair;
  [p1, p2].forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.angle += (Math.random() - 0.5) * 2;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
  });
  const desiredDist = 50;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const diff = dist - desiredDist;

  if (dist !== 0) {
    const ratio = diff / dist / 2;
    const offsetX = dx * ratio;
    const offsetY = dy * ratio;
    p1.x += offsetX;
    p1.y += offsetY;
    p2.x -= offsetX;
    p2.y -= offsetY;
  }
}

function handleDynamicLinks(pairs, dynamicLinks) {
  for (let i = 0; i < pairs.length; i++) {
    for (let j = i + 1; j < pairs.length; j++) {
      const [a1, a2] = [pairs[i].p1, pairs[i].p2];
      const [b1, b2] = [pairs[j].p1, pairs[j].p2];
      [a1, a2].forEach((pa) => {
        [b1, b2].forEach((pb) => {
          const d = distance(pa, pb);
          if (d < 40) {
            const existing = dynamicLinks.find(
              (l) => l.pa === pa && l.pb === pb
            );
            if (!existing) {
              dynamicLinks.push({ pa, pb });
            }
          }
        });
      });
    }
  }
  for (let i = dynamicLinks.length - 1; i >= 0; i--) {
    const link = dynamicLinks[i];
    const d = distance(link.pa, link.pb);
    if (d > 60) {
      dynamicLinks.splice(i, 1);
    }
  }
}

function drawLink(ctx, link) {
  ctx.beginPath();
  ctx.moveTo(link.pa.x, link.pa.y);
  ctx.lineTo(link.pb.x, link.pb.y);
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.stroke();
}

function drawPair(ctx, pair) {
  const { p1, p2 } = pair;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.stroke();
  [p1, p2].forEach((p) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.angle * Math.PI) / 180);
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();
  });
}

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
