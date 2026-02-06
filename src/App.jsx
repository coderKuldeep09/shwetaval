import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import "./App.css";

const data = [
  { q: "The First Meet 🌸", line: "Yaad hai wo pehli mulakat? Jab waqt thak gaya tha lekin meri nazar tumse nahi hati...", sticker: "✨" },
  { q: "8th Nov: The Magic 💍", line: "Ek aisa din jab mere dil ne pehli baar mehsoos kiya ki tum hi woh sukoon ho...", sticker: "💘", isProposal: true, noteTitle: "To My Soulmate, Shweta", noteBody: "Pata hai Shweta, 8th Nov sirf ek date nahi hai, mere liye woh din hai jab meri zindagi ko ek naya maksad mila. Maine tumhare andar ek poori duniya dekhi hai—woh duniya jahan sirf pyaar aur tum ho. ❤️" },
  { q: "🌹 Rose Day", line: "Ye gulaab meri taraf se ek symbol hai… meri feelings gehri hain.", sticker: "🌹" },
  { q: "💍 Propose Day", line: "Tumhare sath hrr ek pal ek magic ki trh hai Will you always?", sticker: "💍", hasNoBtn: true, isProposal: true, noteTitle: "A Promise for Life", noteBody: "Main waada karta hoon ki hamesha tumhara hath thame rakhunga, chahe dhoop ho ya chhaon. Kya tum mera sath dogi? ❤️" },
  { q: "🍫 Chocolate Day", line: "Zindagi ki mithaas tumhare hone se hai.", sticker: "🍫" },
  { q: "🧸 Teddy Day", line: "Ye teddy meri yaad dilayega jab main paas nahi hounga.", sticker: "🧸" },
  { q: "🤗 Hug Day", line: "Tumhara hug mera safe place hai. and i always want that peace", sticker: "🫂" },
  { q: "💋 Kiss Day", line: "Ek ehsaas jo hamesha mere dil mein reh jata hai and jst want always .", sticker: "💋" },
  { q: "💖 Valentine", line: "Will you be my Valentine, Shweta, meri jaan, meri happiness, meri dunia... will you? ❤️", sticker: "💝", hasNoBtn: true }
];

const FloatingStickers = ({ emoji }) => (
  <div className="sticker-layer">
    {[...Array(20)].map((_, i) => (
      <motion.div key={i} className="sharp-sticker"
        initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
        animate={{ 
          x: [null, Math.random() * window.innerWidth], 
          y: [null, Math.random() * window.innerHeight], 
          opacity: [0, 0.6, 0],
          rotate: [0, 360] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >{emoji}</motion.div>
    ))}
  </div>
);

export default function App() {
  const [stage, setStage] = useState("intro"); 
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [showNote, setShowNote] = useState(false);
  const canvasRef = useRef(null);

  // Heart Rain Function
  const createHeartRain = () => {
    for (let j = 0; j < 8; j++) {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️";
      heart.className = "heart-particle";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "-5vh";
      heart.style.fontSize = Math.random() * 15 + 15 + "px";
      heart.style.animationDuration = Math.random() * 2 + 1.5 + "s";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2500);
    }
  };

  const moveNo = (e) => {
    e.stopPropagation();
    setPos({ x: Math.random() * 200 - 100, y: Math.random() * 200 - 100 });
  };

  useEffect(() => { setPos({ x: 0, y: 0 }); setShowNote(false); }, [i]);

  // Skyshot (Fireworks)
  useEffect(() => {
    if (done && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      let particles = []; let rockets = [];
      class Rocket {
        constructor() {
          this.x = Math.random() * canvas.width; this.y = canvas.height;
          this.speed = 7; this.targetY = Math.random() * (canvas.height * 0.4);
          this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        }
        update() { this.y -= this.speed; }
        draw() { ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); ctx.fill(); }
      }
      class Particle {
        constructor(x, y, color) {
          this.x = x; this.y = y; this.color = color;
          this.angle = Math.random() * Math.PI * 2; this.velocity = Math.random() * 5 + 3;
          this.life = 100; this.friction = 0.95; this.gravity = 0.12;
        }
        update() { this.velocity *= this.friction; this.x += Math.cos(this.angle) * this.velocity; this.y += Math.sin(this.angle) * this.velocity + this.gravity; this.life -= 1.5; }
        draw() { ctx.globalAlpha = this.life / 100; ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2); ctx.fill(); }
      }
      function animate() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.06) rockets.push(new Rocket());
        rockets.forEach((r, idx) => { r.update(); r.draw(); if (r.y <= r.targetY) { for (let j = 0; j < 50; j++) particles.push(new Particle(r.x, r.y, r.color)); rockets.splice(idx, 1); } });
        particles.forEach((p, idx) => { p.update(); p.draw(); if (p.life <= 0) particles.splice(idx, 1); });
        requestAnimationFrame(animate);
      }
      animate();
    }
  }, [done]);

  return (
    <div className="main-container" onClick={createHeartRain}>
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div key="intro" className="full-screen" exit={{ opacity: 0, scale: 0.8 }}>
            <div className="intro-content">
              <motion.h2 className="click-hint">Tap my Heart Shweta ❤️</motion.h2>
              <motion.div className="heart-btn-main hover-pop" onClick={() => setStage("heartbeat")} animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>❤️</motion.div>
            </div>
          </motion.div>
        )}

        {stage === "heartbeat" && (
          <motion.div key="heartbeat" className="full-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
            <div className="beat-container">
              <div className="romantic-text">
                <TypeAnimation sequence={['Har dhadkan mein tumhara naam hai...', 1000, 'Shweta, tum meri poori duniya ho...', 1000, 'Enter into my heart? ❤️', 1500]} speed={50} repeat={Infinity} />
                <br />
                <button className="start-btn-glass hover-glow" onClick={() => setStage("valentine")}>Hamara Safar Dekho 💌</button>
              </div>
              <motion.div className="beating-heart" animate={{ scale: [1, 1.15, 1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}>❤️</motion.div>
            </div>
          </motion.div>
        )}

        {stage === "valentine" && (
          <motion.div key="valentine" className="full-screen">
            {!done && <FloatingStickers emoji={data[i].sticker} />}
            {done && <canvas ref={canvasRef} className="blastCanvas" />}
            
            <div className="card-and-note-container">
              <motion.div className="premium-glass-card" layout>
                {!done ? (
                  <>
                    <h2 className="card-title">{data[i].q}</h2>
                    <p className="card-line">{data[i].line}</p>
                    
                    {data[i].isProposal && (
                      <button className="msg-btn-mini hover-glow" onClick={(e) => { e.stopPropagation(); setShowNote(!showNote); }}>
                        {showNote ? "Close Letter ❌" : "Read My Heart 💌"}
                      </button>
                    )}

                    <div className="btn-row">
                      <button className="yes-btn-glass hover-glow" onClick={(e) => { e.stopPropagation(); if (i < data.length - 1) setI(i + 1); else setDone(true); }}>Yes Forever 💖</button>
                      {data[i].hasNoBtn && (
                        <motion.button className="no-btn-glass" onMouseEnter={moveNo} animate={{ x: pos.x, y: pos.y }}>No 😜</motion.button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="final-msg">
                    <h1 className="neon-text">Hamesha <span>Sath!</span></h1>
                    <p className="dancing-font final-sub-text">Happy Valentine's Day Shweta.<br />I am Only Yours ❤️<br> Be Mine❤️</p>
                    <p style={{marginTop: '15px', opacity: 0.8}}>Tum meri life ka sbse best part ho.</p>
                  </div>
                )}
              </motion.div>

              <AnimatePresence>
                {showNote && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="side-letter-note">
                    <h3>{data[i].noteTitle}</h3>
                    <p>{data[i].noteBody}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
