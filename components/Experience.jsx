import { Box, Typography, Chip, styled } from "@mui/material";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import experiences from '@/data/experience' 
import { Briefcase, Calendar, MapPin, ArrowUp, TrendingUp } from "lucide-react";

const MotionBox = motion.create(Box)

const TimelineCard = styled(Box)(({ theme }) => ({
  padding: "28px",
  borderRadius: "22px",
  position: "relative",
  overflow: "hidden",
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.2)",
  transition: "all 0.4s cubic-bezier(.2,.8,.2,1)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: `
      linear-gradient(
        120deg,
        transparent 30%,
        rgba(180,100,255,0.12) 50%,
        transparent 70%
      )
    `,
    opacity: 0,
    transition: "0.4s",
    pointerEvents: "none",
  },
  "&:hover": {
    transform: "translateY(-6px) scale(1.02)",
    background: "transparent",
    boxShadow: `
      0 25px 60px rgba(0,0,0,0.6),
      0 0 40px rgba(180,100,255,0.35)
    `,
  },
  "&:hover::before": {
    opacity: 1,
  },
}))

const Experience = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <Box
      component="section"
      id="experience"
      ref={sectionRef}
      sx={{
        minHeight: "100vh",
        py: { xs: 6, sm: 10 },
        px: { xs: 2, sm: 3, lg: 4 },
        position: "relative",
        color: "rgba(255,255,255,0.8)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ maxWidth: 1000, mx: "auto", position: "relative", zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: 10 }}
        >
          <Chip
            icon={<Briefcase size={16} />}
            label="Career Journey"
            sx={{ cursor: "default", color: "rgba(255,255,255,0.8)", }}
          />

          <Typography sx={{ fontSize: "2.8rem", mb: 1 }}>
            Experience
          </Typography>

          <Typography>
            My professional journey and the impact I've made
          </Typography>
        </MotionBox>

        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: { xs: 32, md: "50%" },
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: "rgba(255,255,255,0.6)",
              transform: "translateX(-50%)",
              display: { xs: "none", sm: "block" },
            }}
          >
            <motion.div
              style={{ height: lineHeight }}
              className="timeline-line"
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {experiences.map((exp, index) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: false, amount: 0.3 })
              const isConversion = index > 0 && experiences[index - 1].company === exp.company
              return (
                <MotionBox
                  key={exp.id}
                  ref={ref}
                  initial={{ opacity: 0, x: index % 2 ? 50 : -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  sx={{
                    display: "flex",
                    gap: 4,
                    flexDirection: {
                      xs: "column",
                      md: index % 2 ? "row-reverse" : "row",
                    },
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: isConversion ? "-2rem" : "1.5rem",
                      transform: "translateX(-50%)",
                      display: { xs: "none", sm: "block" },
                      zIndex: 20,
                    }}
                  >
                    {isConversion && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 20,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <motion.div
                            animate={{ y: [-3, 3, -3] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                              padding: "4px 12px",
                              background: "linear-gradient(to right, rgba(80,120,255,0.25), rgba(180,100,255,0.55))",
                              color: "white",
                              fontSize: "0.75rem",
                              borderRadius: "999px",
                              boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "4px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <ArrowUp style={{ width: 12, height: 12 }} />
                            <span style={{ fontWeight: 500 }}>Converted to Full-Time</span>
                          </motion.div>

                          <motion.div
                            animate={{ scaleY: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                              width: "1px",
                              height: "16px",
                              background: "#F5F5F5",
                            }}
                          />
                        </Box>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      style={{
                        transform: "translateX(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 20,
                      }}
                    >
                      <motion.div
                        animate={
                          inView
                            ? { scale: [1, 1.7, 1], opacity: [0.3, 0.7, 0.3] }
                            : {}
                        }
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          position: "absolute",
                          width: 70,
                          height: 70,
                          borderRadius: "50%",
                          background:
                            "radial-gradient(circle, rgba(180,100,255,0.5), rgba(80,120,255,0.3), transparent 70%)",
                          filter: "blur(28px)",
                        }}
                      />

                      <motion.div
                        animate={inView ? { scale: [1, 1.3, 1] } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: `
                            radial-gradient(
                              circle at 30% 30%,
                              rgba(200,160,255,1),
                              rgba(120,90,255,1),
                              rgba(80,120,255,1)
                            )
                          `,
                          boxShadow: `
                            0 0 20px rgba(120,90,255,0.9),
                            0 0 45px rgba(80,120,255,0.7)
                          `,
                          border: "1.5px solid rgba(255,255,255,0.25)",
                          position: "relative",
                        }}
                      />

                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        style={{
                          position: "absolute",
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(90deg, transparent, rgba(180,100,255,0.6), transparent)",
                          mixBlendMode: "screen",
                        }}
                      />
                    </motion.div>
                  </Box>

                  <Box sx={{ width: { xs: "100%", md: "47%" } }}>
                    <TimelineCard className="glass-effect">
                      <Typography>{exp.title}</Typography>
                      <Typography
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        <TrendingUp size={16} /> {exp.company}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 3, my: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", cursor: "default", gap: 1 }}>
                          <Calendar size={16} />
                          {exp.period}
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "default", }}>
                          <MapPin size={16} />
                          {exp.location}
                        </Box>
                      </Box>

                      <Box component="ul" sx={{ pl: 2, listStyleType: "disc", }}>
                        {exp.description.map((d, i) => (
                          <li key={i}>
                            <Typography>
                              {d}
                            </Typography>
                          </li>
                        ))}
                      </Box>

                      <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                        {exp.technologies.map((t) => (
                          <Chip key={t} label={t} size="small" sx={{ cursor: "default", color: "rgba(255,255,255,0.8)" }} />
                        ))}
                      </Box>
                    </TimelineCard>
                  </Box>
                </MotionBox>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Experience