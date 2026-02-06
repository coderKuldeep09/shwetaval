import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import "./App.css";

const data = [
  { q: "The First Meet 🌸", line: "Yaad hai wo pehli mulakat? Jab waqt thak gaya tha lekin meri nazar tumse nahi hati...", sticker: "✨" },
  { q: "8th Nov: The Magic 💍", line: "Ek aisa din jab mere dil ne pehli baar mehsoos kiya ki tum hi woh sukoon ho...", sticker: "💘", isProposal: true, noteTitle: "To My Soulmate, Shweta", noteBody: "Pata hai Shweta, 8th Nov sirf ek date nahi hai, mere liye woh din hai jab meri zindagi ko ek naya maksad mila. Maine tumhare andar ek poori duniya dekhi hai—woh duniya jahan sirf pyaar aur tum ho. ❤️" },
  { q: "🌹 Rose Day", line: "Ye gulaab meri taraf se ek symbol hai… meri feelings gehri hain.", sticker: "🌹" },
  { q: "💍 Propose Day", line: "Tumhare saath life perfect lagti hai… meri banogi?", sticker: "💍", hasNoBtn: true, isProposal: true, noteTitle: "A Promise for Life", noteBody: "Main waada karta hoon ki hamesha tumhara hath thame rakhunga, chahe dhoop ho ya chhaon. Kya tum mera sath dogi? ❤️" },
  { q: "🍫 Chocolate Day", line: "Zindagi ki mithaas tumhare hone se hai.", sticker: "🍫" },
  { q: "🧸 Teddy Day", line: "Ye teddy meri yaad dilayega jab main paas nahi hounga.", sticker: "🧸" },
  { q: "🤗 Hug Day", line: "Tumhara hug mera safe place hai.", sticker: "🫂" },
  { q: "💋 Kiss Day", line: "Ek ehsaas jo hamesha dil mein reh jata hai.", sticker: "💋" },
  { q: "💖 Valentine", line: "Will you be my Valentine, Shweta , meri jaan , meri hapiness, meri dunia my wify my everything you are.. will you? ❤️", sticker: "💝", hasNoBtn: true }
];

const FloatingStickers = ({ emoji }) => (
  <div className="sticker-layer">
    {[...Array(35)].map((_, i) => (
      <motion.div key={i} className="sharp-sticker"
        initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
        animate={{ 
          x: [null, Math.random() * window.innerWidth], 
          y: [null, Math.random() * window.innerHeight], 
          opacity: [0, 0.8, 0],
          rotate: [0, 360] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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

  const moveNo = () => {
    setPos({ x: Math.random() * 260 - 130, y: Math.random() * 260 - 130 });
  };

  useEffect(() => { setPos({ x: 0, y: 0 }); setShowNote(false); }, [i]);

  // ENERGETIC FIREWORKS
  useEffect(() => {
    if (done && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      let particles = []; let rockets = [];
      class Rocket {
        constructor() {
          this.x = Math.random() * canvas.width; this.y = canvas.height;
          this.speed = 8; this.targetY = Math.random() * (canvas.height * 0.4);
          this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        }
        update() { this.y -= this.speed; }
        draw() { ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); ctx.fill(); }
      }
      class Particle {
        constructor(x, y, color) {
          this.x = x; this.y = y; this.color = color;
          this.angle = Math.random() * Math.PI * 2; this.velocity = Math.random() * 5 + 3;
          this.life = 120; this.friction = 0.96; this.gravity = 0.15;
        }
        update() { this.velocity *= this.friction; this.x += Math.cos(this.angle) * this.velocity; this.y += Math.sin(this.angle) * this.velocity + this.gravity; this.life -= 1.8; }
        draw() { ctx.globalAlpha = this.life / 120; ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2); ctx.fill(); }
      }
      function animate() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.08) rockets.push(new Rocket());
        rockets.forEach((r, idx) => { r.update(); r.draw(); if (r.y <= r.targetY) { for (let j = 0; j < 60; j++) particles.push(new Particle(r.x, r.y, r.color)); rockets.splice(idx, 1); } });
        particles.forEach((p, idx) => { p.update(); p.draw(); if (p.life <= 0) particles.splice(idx, 1); });
        requestAnimationFrame(animate);
      }
      animate();
    }
  }, [done]);

  return (
    <div className="main-container">
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div key="intro" className="full-screen" exit={{ opacity: 0, scale: 0.8 }}>
            <div className="intro-content">
              <motion.h2 className="click-hint">Tap my Heart Shweta ❤️</motion.h2>
              <motion.div className="heart-btn-main" onClick={() => setStage("heartbeat")} animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>❤️</motion.div>
            </div>
          </motion.div>
        )}

        {stage === "heartbeat" && (
          <motion.div key="heartbeat" className="full-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
            <div className="beat-container">
              <div className="romantic-text">
                <TypeAnimation sequence={['Har dhadkan mein tumhara naam hai...', 1000, 'Shweta, tum meri poori duniya ho...', 1000, 'Enter into my heart? ❤️', 1500]} speed={50} repeat={Infinity} />
                <br />
                <button className="start-btn-glass" onClick={() => setStage("valentine")}>Hamara Safar Dekho 💌</button>
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
                      <button className="msg-btn-mini" onClick={() => setShowNote(!showNote)}>
                        {showNote ? "Close Letter ❌" : "Read My Heart 💌"}
                      </button>
                    )}

                    <div className="btn-row">
                      <button className="yes-btn-glass" onClick={() => { if (i < data.length - 1) setI(i + 1); else setDone(true); }}>Yes Forever 💖</button>
                      {data[i].hasNoBtn && (
                        <motion.button className="no-btn-glass" onMouseEnter={moveNo} animate={{ x: pos.x, y: pos.y }}>No 😜</motion.button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="final-msg">
                    <h1 className="neon-text">Hamesha <span>Sath!</span></h1>
                    <p className="dancing-font" style={{fontSize: '2rem', color: '#ffb7c5'}}>Happy Valentine's Day Shweta.<br>Iam Only Yours </br> ❤️</p>
                    <p style={{marginTop: '10px'}}>Tum meri sabse pyari haqeeqat ho.</p>
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