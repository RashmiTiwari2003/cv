'use client'
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
import TerminalIntro from '@/components/TerminalIntro'

const MotionBox = motion.create(Box)

const Hero = () => {
  const sectionRef = useRef(null);
  const [dots, setDots] = useState([])
  const [scrollReady, setScrollReady] = useState(false);

   useEffect(() => {
    if (sectionRef.current) {
      setScrollReady(true);
    }
  }, [])

  useEffect(() => {
    const generated = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: Math.random() * window.innerWidth,
      dy: Math.random() * window.innerHeight,
      duration: Math.random() * 6 + 10,
    }))
    setDots(generated)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: scrollReady ? sectionRef : undefined,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const titleText = "Building Production Ready Systems"
  const highlightWord = "Production"
  const subtitleText = "Crafting seamless digital experiences from frontend to backend"

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "85vh", sm: "100vh" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pl: { xs: 3, lg: 3 },
        pr: { xs: 3, lg: 0 },
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y, opacity, scale, textAlign: "center", zIndex: 2 }}
      >
        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ maxWidth: { xs: "100%", sm: "50%" }, width: { xs: "100%", sm: "40%" }, alignItems: "start", justifyContent: "center", display: "flex", flexDirection: "column", gap: "20px" }}>
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              sx={{
                fontSize: { xs: "2.3rem", lg: "3rem" },
                color: "rgba(255,255,255,0.8)",
                textAlign: "start",
                pointerEvents: "none"
              }}
            >
              {titleText.split(" ").map((word, wordIndex) => {
                const isScalable = word === highlightWord;

                return (
                <Box
                  key={wordIndex}
                  component="span"
                  sx={{
                    ...(isScalable && {
                      background: "linear-gradient(90deg,#7c3aed,#22d3ee)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }),
                    marginRight: "8px",
                    display: "inline-block",
                  }}
                >
                  {word.split("").map((char, charIndex) => {
                    const globalIndex =
                      titleText
                      .split("")
                      .findIndex((_, i) =>
                        titleText.slice(i).startsWith(word)
                      ) + charIndex;

                    return (
                      <motion.span
                        key={charIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.05,
                          delay: 0.6 + globalIndex * 0.05,
                        }}
                        style={{ display: "inline-block", fontWeight: 800 }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </Box>
                );
              })}
            </MotionBox>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              style={{
                fontSize: "clamp(14px, 1.5vw, 18px)",
                color: "rgba(255,255,255,0.6)",
                textAlign: "start",
                lineHeight: 1.6,
                pointerEvents: "none"
              }}
            >
              {subtitleText}
            </motion.p>

            <Stack direction={{ xs: "row", sm: "row" }} spacing={2} justifyContent="center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  color="inherit"
                  endIcon={<ArrowDownRight size={18} />}
                  onClick={() => scrollToSection("projects")}
                  sx={{
                    textTransform: "none",
                    px: { xs: 2.5, lg: 4 },
                    py: { xs: 1, lg: 1.5 },
                    borderRadius: 50,
                    bgcolor: "white",
                    color: "black",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#f3f3f3" },
                  }}
                >
                  View Projects
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  component='a'
                  href="Rashmi Tiwari Resume.pdf"
                  download="Rashmi Tiwari Resume"
                  variant="outlined"
                  sx={{
                    px: { xs: 2.5, lg: 4 },
                    py: { xs: 1, lg: 1.5 },
                    textTransform: "none",
                    borderRadius: 50,
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 700,
                    backdropFilter: "blur(4px)",
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.4)",
                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  Download CV
                </Button>
              </motion.div>
            </Stack>
          </Box>
          
          <Box sx={{ display: { xs: "none", sm: "block" }, maxWidth: "50%", width: "50%" }}>
            <Box
              sx={{
                width: "100%",
                borderRadius: 3,
                overflow: "hidden",
                backdropFilter: "blur(12px)",
                background:
                  "linear-gradient(180deg,rgba(30,30,40,0.8),rgba(10,10,20,0.9))",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Stack direction="row" spacing={1}>
                  {["#ef4444", "#facc15", "#22c55e"].map((c) => (
                    <Box
                      key={c}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: c,
                      }}
                    />
                  ))}
                </Stack>
    
                <Typography
                  sx={{
                    fontSize: 11,
                    color: "grey.500",
                    fontFamily: "monospace",
                  }}
                >
                  rashmi-tiwari — bash — 80×24
                </Typography>
    
                <Box sx={{ width: 16 }} />
              </Box>
    
              <Box
                sx={{
                  p: 3,
                  textAlign: "start",
                  minHeight: 300,
                  background: "rgba(10,10,20,0.95)",
                  color: "grey.300",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box sx={{ display: "flex",   alignItems :"center", gap: 1, }}>
                    <Typography color="#4ade80">➜</Typography>
                    <Typography color="#60a5fa">~</Typography>
                    <Typography color="white"  sx={{fontSize: "0.85rem", fontFamily: "monospace !important" }}>whoami</Typography>
                  </Box>
                  <Typography color="grey.400" sx={{ pl: 4,fontSize: "0.85rem", fontFamily: "monospace !important" }}>Rashmi Tiwari</Typography>

                  <Box sx={{ display: "flex",  alignItems :"center",  gap: 1 }}>
                    <Typography color="#4ade80">➜</Typography>
                    <Typography color="#60a5fa">~</Typography>
                    <Typography color="white" sx={{ fontSize: "0.85rem",fontFamily: "monospace !important" }}>cat about_me.txt</Typography>
                  </Box>
                  <Typography color="grey.400" sx={{ pl: 4, fontSize: "0.85rem",fontFamily: "monospace !important" }}>
                    Full-stack developer crafting scalable web apps. Passionate about clean code, Python and modern JS frameworks.
                  </Typography>

                  <Box sx={{ display: "flex",  alignItems :"center",  gap: 1 }}>
                    <Typography color="#4ade80">➜</Typography>
                    <Typography color="#60a5fa">~</Typography>
                    <Typography color="white" sx={{ fontSize: "0.85rem",fontFamily: "monospace !important" }}>cd current-role</Typography>
                  </Box>
                  <Typography color="grey.400" sx={{ pl: 4,fontSize: "0.85rem", fontFamily: "monospace !important" }}>Junior Software Engineer</Typography>
                  
                  <Box sx={{ display: "flex", alignItems :"center", gap: 1 }}>
                    <Typography color="#4ade80">➜</Typography>
                    <Typography color="#60a5fa" sx={{ fontSize: "0.85rem",fontFamily: "monospace !important" }}>~/current-role</Typography>
                    <Typography color="white" sx={{ fontSize: "0.85rem", fontFamily: "monospace !important" }}>ls tech-stack</Typography>
                  </Box>
                  <Typography color="grey.400" sx={{ pl: 4, fontSize: "0.85rem", fontFamily: "monospace !important" }}>
                    React  Next.js  TailwindCSS  Node.js  Express  PostgreSQL  Django FastAPI Flask
                  </Typography>
                </Box> */}
                <TerminalIntro />
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "25%",
          left: "25%",
          width: 500,
          height: 500,
          background: "rgba(180,100,255,0.25)",
          filter: "blur(150px)",
          borderRadius: "50%",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* {[...Array(20)].map((_, i) => ( */}
          {dots.map((dot, i) => (
          <motion.div
            key={i}
            // initial={{
            //   x: Math.random() * viewport.w,
            //   y: Math.random() * viewport.h,
            // }}
            // animate={{
            //   x: [null, Math.random() * viewport.w],
            //   y: [null, Math.random() * viewport.h],
            // }}
            initial={{ x: dot.x, y: dot.y }}
            animate={{ x: [null, dot.dx], y: [null, dot.dy] }}
            transition={{
              // duration: Math.random() * 10 + 10,
              duration: dot.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          ))}
        {/* // ))} */}
      </Box>

      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: "25%",
          right: "25%",
          width: 600,
          height: 600,
          background: "rgba(80,120,255,0.25)",
          filter: "blur(150px)",
          borderRadius: "50%",
        }}
      />

      <MotionBox
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          bottom: { xs: 20, lg: 40 },
          left: { xs: 40, lg: 0 },
        }}
      >
        <Box
          sx={{
            display: { xs: "block", md: "block" },
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            p: 2,
            borderRadius: "24px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            zIndex: 20
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "16px",
                background: "#a855f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Sparkles size={20} />
            </Box>

            <Box>
              <Box
                sx={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  pointerEvents: "none"
                }}
              >
                Based in
              </Box>
              <Box
                sx={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 700,
                  pointerEvents: "none"
                }}
              >
                Kolkata (India)
              </Box>
            </Box>
          </Box>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default Hero