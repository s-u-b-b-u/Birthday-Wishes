import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, useTransform } from 'framer-motion';
import {
  Lock,
  Volume2,
  Heart,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
  Maximize2,
  PlayCircle,
  Unlock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import memoriesSong from './assets/gallery/Memories-Bring-Back.mp3';

// Assets from gallery folder
import m1 from './assets/gallery/m1.jpeg';
import m2 from './assets/gallery/m2.jpeg';
import m3 from './assets/gallery/m3.jpeg';
import m4 from './assets/gallery/m4.jpeg';
import m5 from './assets/gallery/m5.jpeg';
import m6 from './assets/gallery/m6.jpeg';
import m7 from './assets/gallery/m7.jpeg';
import m8 from './assets/gallery/m8.jpeg';
import m9 from './assets/gallery/m9.jpeg';
import m10 from './assets/gallery/m10.jpeg';
import m11 from './assets/gallery/m11.jpeg';
import m12 from './assets/gallery/m12.jpeg';
import m13 from './assets/gallery/m13.jpeg';
import m14 from './assets/gallery/m14.jpeg';
import m15 from './assets/gallery/m15.jpeg';
import m16 from './assets/gallery/m16.jpeg';

import v1 from './assets/gallery/v1.mp4';
import v2 from './assets/gallery/v2.mp4';
import v3 from './assets/gallery/v3.mp4';
import v4 from './assets/gallery/v4.mp4';
import v5 from './assets/gallery/v5.mp4';
import v6 from './assets/gallery/v6.mp4';
import w0 from './assets/gallery/w0.mp4';
import w1 from './assets/gallery/w1.mp4';
import w2 from './assets/gallery/w2.mp4';
import w3 from './assets/gallery/w3.mp4';
import w4 from './assets/gallery/w4.mp4';
import w5 from './assets/gallery/w5.mp4';
import w6 from './assets/gallery/w6.mp4';
import w7 from './assets/gallery/w7.mp4';
import w8 from './assets/gallery/w8.mp4';
import w9 from './assets/gallery/w9.mp4';

const initialPhotos = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16];

// Shuffle photos for randomization
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const photos = shuffleArray(initialPhotos);

const videos = [
  { src: v1, title: "Train lo oka ammayi gonthu kosina tagore.....", desc: "Full details kosa ee video choodandi" },
  { src: v2, title: "The Best Moments", desc: "Laughter, debates, and everything in between." },
  { src: v3, title: "The memories of school trip", desc: "A deeper look into the timeless memories." },
  { src: v5, title: "The Greatest Batsman", desc: "G.O.A.T" },
  { src: v4, title: "Baba kaalu ethi em chesadu?????...", desc: "Theliyalante ee video choodandi" },
  { src: v6, title: "Final Chapter: The Celebration", desc: "Wrapping up a legendary year with style." }
];
const vaultVideos = [
  { src: w1, title: "A Special Fragment", desc: "Captured in the silence of the vault." },
  { src: w2, title: "Heartfelt Wishes", desc: "A second layer of the archive revealed." },
  { src: w3, title: "Timeless Connection", desc: "The final chapter of the vault's chronicles." },
  { src: w4, title: "Echoes of Love", desc: "A whisper from the inner circle." },
  { src: w5, title: "Pure Joy", desc: "Unfiltered celebration of Baba's day." },
  { src: w6, title: "A Legacy Shared", desc: "Shared moments in high fidelity." },
  { src: w7, title: "Voices from Afar", desc: "Distance means nothing to true bonds." },
  { src: w8, title: "Grand Finale", desc: "The crescendo of the secret archive." },
  { src: w9, title: "Eternal Baba", desc: "The timeless essence of greatness." },
  { src: w0, title: "The Ultimate Wish", desc: "The final piece of the legend's puzzle." },
];

const App = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [quizStatus, setQuizStatus] = useState("idle");
  const [activeVideo, setActiveVideo] = useState(null);

  const heroRef = useRef(null);
  const audioRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.3 });

  // Story Timer (3 seconds)
  useEffect(() => {
    let timer;
    if (isHeroInView) {
      timer = setInterval(() => {
        setCurrentStoryIndex((prev) => (prev + 1) % photos.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isHeroInView]);

  // Handle Hero Music & Page Visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioRef.current?.pause();
      } else if (isHeroInView) {
        audioRef.current?.play().catch(() => { });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (isHeroInView && !document.hidden) {
      audioRef.current?.play().catch(() => { });
    } else {
      audioRef.current?.pause();
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isHeroInView]);

  // Global Interaction Kickstart for Audio
  useEffect(() => {
    const kickstartAudio = () => {
      if (isHeroInView && !document.hidden) {
        audioRef.current?.play().catch(() => { });
        document.removeEventListener("click", kickstartAudio);
        document.removeEventListener("touchstart", kickstartAudio);
      }
    };

    document.addEventListener("click", kickstartAudio);
    document.addEventListener("touchstart", kickstartAudio);

    return () => {
      document.removeEventListener("click", kickstartAudio);
      document.removeEventListener("touchstart", kickstartAudio);
    };
  }, [isHeroInView]);

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (
      quizAnswers.q1.toLowerCase().includes("lover") &&
      quizAnswers.q2.toLowerCase().includes("andaman") &&
      quizAnswers.q3.toLowerCase().includes("eny sarlu") || quizAnswers.q3.toLowerCase().includes("eni sarlu")
    ) {
      setQuizStatus("success");
      setTimeout(() => {
        setIsUnlocked(true);
        setShowQuiz(false);
        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#fbbf24', '#ffffff']
        });
      }, 1000);
    } else {
      setQuizStatus("error");
      setTimeout(() => setQuizStatus("idle"), 2000);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 selection:bg-warm-500 selection:text-white font-sans">
      {/* Background Audio - Preloaded for immediate playback */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        autoPlay
        src={memoriesSong} 
      />

      <section ref={heroRef} className="py-24 md:py-32 flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden">
        {/* Top Header Section */}
        <div className="max-w-4xl w-full text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-warm-500/10 border border-warm-500/20 px-5 py-2.5 rounded-full text-warm-400 text-xs font-black tracking-[0.2em] uppercase mb-10 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
          >
            <Sparkles size={14} className="fill-warm-400" />
            <span>Memory Archive — Year 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-display font-black leading-[0.9] tracking-tight mb-8"
          >
            A Legendary Year <br />
            <span className="text-warm-400 italic font-serif">for Baba</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-zinc-500 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            A curated journey through the moments that defined a masterpiece. <br />
            Every pixel tells a story of friendship, coding, and chaos.
          </motion.p>
        </div>

        {/* Centered Photo Story Container - Expanded Cinematic Card Layout */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl w-full aspect-[2/3] md:aspect-[3/4] max-h-[90vh] rounded-[3.5rem] overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.9)] border border-white/5 ring-1 ring-white/10"
        >
          {/* Progress Bar inside Container */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 flex gap-2 w-[75%] pointer-events-none">
            {photos.map((_, i) => (
              <div key={i} className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: i === currentStoryIndex ? "100%" : i < currentStoryIndex ? "100%" : "0%"
                  }}
                  transition={{ duration: i === currentStoryIndex ? 3 : 0, ease: "linear" }}
                  className="h-full bg-white shadow-[0_0_20px_white]"
                />
              </div>
            ))}
          </div>
          {/* Story Images - Cinematic Transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStoryIndex}
              initial={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              <img
                src={photos[currentStoryIndex]}
                className="w-full h-full object-contain bg-black"
                alt={`Memory ${currentStoryIndex + 1}`}
              />
              {/* Intelligent dynamic vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Video Highlights - Codedale Inspired */}
      <section className="py-32 px-6 md:px-24 bg-white text-zinc-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-warm-600 font-bold tracking-widest uppercase text-sm mb-4"
              >
                <div className="h-0.5 w-12 bg-warm-600" />
                <span>The Cinematic Story</span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-display font-black leading-tight">
                Watch the journey <br /> unfold.
              </h2>
            </div>
            <p className="text-zinc-500 text-lg max-w-sm mb-2">
              Every smile, every glitch, and every victory captured in high definition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {videos.map((vid, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                onClick={() => setActiveVideo(vid)}
                className="group relative h-[500px] rounded-[3rem] overflow-hidden cursor-pointer shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all border border-zinc-100"
              >
                <img src={photos[i + 5 % photos.length]} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent p-12 flex flex-col justify-end">
                  <div className="flex items-center gap-3 text-warm-400 mb-4 scale-0 group-hover:scale-100 transition-transform origin-left">
                    <PlayCircle size={24} />
                    <span className="font-bold text-sm tracking-widest uppercase">Start Playback</span>
                  </div>
                  <h3 className="text-3xl text-white font-display font-bold mb-3">{vid.title}</h3>
                  <p className="text-white/60 text-lg">{vid.desc}</p>
                </div>
                <div className="absolute top-8 right-8 bg-white/10 premium-blur p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-12"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white z-[110] p-2"
            >
              <X size={48} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full h-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl bg-zinc-900"
            >
              <video
                src={activeVideo.src}
                autoPlay
                controls
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Vault */}
      <section className="relative py-40 px-6 bg-cream text-zinc-900 overflow-hidden">
        {!isUnlocked ? (
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-12 md:p-24 rounded-[4rem] border border-warm-200 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-warm-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
              <div className="bg-warm-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-white shadow-xl mb-12">
                <Lock size={48} />
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black mb-8 leading-tight text-zinc-900">Secret <br /> Messages.</h2>
              <p className="text-zinc-500 text-xl max-w-lg mx-auto mb-12 font-medium">
                The vault contains voices that reached out from across the world. Ready to unlock?
              </p>
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-zinc-900 text-white px-16 py-6 rounded-2xl text-xl font-bold hover:bg-warm-600 transition-all shadow-xl hover:-translate-y-1"
              >
                Open The Archive
              </button>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-7xl mx-auto"
          >
            {/* Vaulted Video Memories */}
            <div className="">
              <h3 className="text-4xl md:text-6xl font-display font-black text-warm-900 mb-16 text-center">Vaulted Memories.</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {vaultVideos.map((vid, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -15, scale: 1.02 }}
                    onClick={() => setActiveVideo(vid)}
                    className="group relative h-[450px] rounded-[3rem] overflow-hidden cursor-pointer shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-warm-200/50 bg-white"
                  >
                    <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                      <div className="relative group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-warm-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <PlayCircle size={80} className="text-warm-500 relative z-10" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-12 flex flex-col justify-end">
                      <div className="flex items-center gap-3 text-warm-400 mb-4 scale-0 group-hover:scale-100 transition-transform origin-left duration-500">
                        <Lock size={20} />
                        <span className="font-bold text-xs tracking-widest uppercase">Classified File</span>
                      </div>
                      <h4 className="text-3xl text-white font-display font-bold mb-3">{vid.title}</h4>
                      <p className="text-white/60 text-lg leading-relaxed">{vid.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-40 text-center relative">
              <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-[0.03]">
                <Heart size={600} className="fill-warm-900" />
              </div>
              <h4 className="text-zinc-200 text-9xl md:text-[15rem] font-display font-black opacity-20 select-none">BABA</h4>
              <p className="text-warm-900 text-5xl md:text-8xl font-display font-bold mt-[-3rem] md:mt-[-6rem] relative z-10">
                HAPPY BIRTHDAY <span className="text-warm-500">👑</span>
              </p>
            </div>
          </motion.div>
        )}
      </section>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/90 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white max-w-xl w-full rounded-[3.5rem] p-12 md:p-16 shadow-2xl relative text-zinc-900"
            >
              <button onClick={() => setShowQuiz(false)} className="absolute top-10 right-10 text-zinc-300 hover:text-zinc-600">
                <X size={32} />
              </button>

              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-warm-50 text-warm-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Unlock size={36} />
                </div>
                <h3 className="text-4xl font-display font-black">Identity Check.</h3>
                <p className="mt-2 text-zinc-400 font-medium">Verify your credentials to proceed.</p>
              </div>

              <form onSubmit={handleQuizSubmit} className="space-y-8">
                {[
                  { label: "Who are you to Subbu?", id: "q1", hint: "L_v_r" },
                  { label: "what is the place we have decided to visit after b.tech?", id: "q2", hint: "A_d_man..." },
                  { label: "Madda Gudu", id: "q3", hint: "E_i s_rlu..." }
                ].map((q) => (
                  <div key={q.id}>
                    <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-3">{q.label}</label>
                    <input
                      type="text"
                      value={quizAnswers[q.id]}
                      onChange={(e) => setQuizAnswers({ ...quizAnswers, [q.id]: e.target.value })}
                      placeholder={q.hint}
                      className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-warm-500 focus:ring-4 focus:ring-warm-500/10 outline-none transition-all font-bold"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={quizStatus === "success"}
                  className={`w-full py-6 rounded-2xl font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3 ${quizStatus === "success" ? "bg-green-500 text-white" : "bg-zinc-900 text-white hover:bg-warm-600"
                    }`}
                >
                  {quizStatus === "success" ? <><CheckCircle2 /> Verifed!</> : "Confirm Access"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 bg-zinc-950 border-t border-zinc-900 flex flex-col items-center">
        <div className="h-1 w-12 bg-warm-500 rounded-full mb-8 opacity-50" />
        <p className="text-zinc-600 font-black tracking-[0.4em] uppercase text-xs">A Tribute // 2026</p>
      </footer>
    </div>
  );
};

export default App;
