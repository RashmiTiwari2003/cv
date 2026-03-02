import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Box, Chip, Grid, Typography, styled } from "@mui/material";
import skills from '@/data/skills'
import { categories } from '@/data/skills'
import { Database, Sparkles } from "lucide-react";

const GlassCard = styled(Box)(() => ({
  position: "relative",
  padding: 24,
  height: 300,
  borderRadius: 20,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(24px)",
  overflow: "hidden",
  transition: "0.4s",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    opacity: 0,
    transition: "0.5s",
  },
  "&:hover": {
    color: "rgba(255,255,255,0.95)",
    border: "1px solid rgba(80,120,255,0.4)",
    boxShadow: `
      0 25px 60px rgba(0,0,0,0.6),
    `,
  },
  "&:hover::before": {
    opacity: 1,
    
  },
}))

const rings = [30, 45, 60]

export function OrbitalRingsRandomCore({ orbitIcons }) {
  const [coreIndex, setCoreIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCoreIndex(Math.floor(Math.random() * orbitIcons.length))
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const CoreIcon = orbitIcons[coreIndex]

  return (
    <Box
      sx={{
        position: "relative",
        width: 240,
        height: 140,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={coreIndex}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: `linear-gradient(135deg,
              rgba(50,80,200,0.3),
              rgba(100,130,255,0.35)
            )`,
            border: "2px solid rgba(120,150,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
            zIndex: 2,
          }}
        >
          <CoreIcon size={20} color="rgba(180,200,255,0.95)" />
        </motion.div>
      </AnimatePresence>

      {rings.map((r, ringIndex) => {
        const iconIndex = ringIndex % orbitIcons.length
        const Icon = orbitIcons[iconIndex]

        if (iconIndex === coreIndex) return null

        return (
          <motion.div
            key={ringIndex}
            animate={{ rotate: ringIndex % 2 ? -360 : 360 }}
            transition={{
              duration: 14 + ringIndex * 6,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              width: `${r * 2}%`,
              height: `${r * 2}%`,
              border: "1px dashed rgba(120,150,255,0.25)",
              borderRadius: "50%",
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.4,
                boxShadow: "0 0 20px rgba(120,150,255,0.7)",
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(120,150,255,0.15)",
                border: "1px solid rgba(120,150,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
                cursor: "pointer",
              }}
            >
              <Icon size={18} color="#c7d2ff" />
            </motion.div>
          </motion.div>
        )
      })}
    </Box>
  )
}

const Skills = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [revealedCard, setRevealedCard] = useState(null)

  const renderNodeDiagram = (category) => {
    if (category.isCircular) {
      return (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "1",
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: `linear-gradient(135deg,
                rgba(50,80,200,0.3),
                rgba(100,130,255,0.35)
              )`,
              border: "2px solid rgba(120,150,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(6px)",
            }}
          >
            <Database size={24} color="rgba(180,200,255,0.9)" />
          </motion.div>

          {[40, 55, 70].map((r, i) => (
            <motion.div
              key={i}
              animate={{ rotate: i % 2 ? -360 : 360 }}
              transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: `${r * 2}%`,
                height: `${r * 2}%`,
                border: "1px dashed rgba(120,150,255,0.25)",
                borderRadius: "50%",
              }}
            />
          ))}
        </Box>
      )
    }

     return category?.icons?.length > 0 ? (
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity }}>
        <OrbitalRingsRandomCore orbitIcons={category?.icons ?? []} />
      </motion.div>
    ) : <Box sx={{ width: 300, height: 120  }}></Box>
  }

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 4, sm: 10 },
        px: { xs: 2, sm: 4 },
        position: "relative",
        overflow: "hidden",
        color: "rgba(255,255,255,0.8)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 200,
          background: "rgba(80,120,255,0.25)",
          filter: "blur(150px)",
          borderRadius: "50%",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: "inline-block",
              marginBottom: 2
            }}
          >
            <Chip
              icon={<Sparkles size={20} />}
              label="Tech Stack"
              sx={{ 
                mb: 1, 
                cursor: "default",
                px: 1, 
                color: "rgba(255,255,255,0.8)",
                letterSpacing: "0.1em",
                fontSize: "0.875rem",
                fontWeight: 500
              }}
            />
          </motion.div>

          <Typography sx={{ fontSize: "2.8rem", mb: 1 }}>
            Skills
          </Typography>

          <Typography>
            A showcase of professional and personal projects with detailed case studies
          </Typography>
        </motion.div>
      </motion.div>

      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {categories.map((cat, i) => {
          const categorySkills = skills.filter(skill => skill.category === cat.name)
          const isRevealed = revealedCard === i

          return (
            <Grid item size={{ xs: 12, md: 3 }} key={cat.name} sx={{ height: 300, }}>
              <Box
                onMouseEnter={() => setRevealedCard(i)}
                onMouseLeave={() => setRevealedCard(null)}
                sx={{
                  width: "100%",
                  height: 300,
                  maxHeight: "60vh",
                  minHeight: 300,
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    perspective: "1000px",
                  }}
                >
                  <motion.div
                    animate={{
                      rotateY: isRevealed ? 180 : 0,
                      scale: isRevealed ? 0.95 : 1,
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <GlassCard>
                        <Box sx={{ 
                          height: "100%",
                          justifyContent: "space-between",
                          display: "flex",
                          flexDirection: "column"
                        }}>
                          {renderNodeDiagram(cat)}

                          <Box>
                            <Typography
                              sx={{
                                mt: 2,
                                fontSize: 22,
                                fontWeight: 700,
                              }}
                            >
                              {cat.name}
                            </Typography>

                            <Typography sx={{ fontSize: 13, mb: 1, color: "rgba(255,255,255,0.8)", }}>
                              {cat.technologies.join(", ")}
                            </Typography>

                            <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.8)", }}>
                              {cat.description}
                            </Typography>
                          </Box>
                        </Box>
                      </GlassCard>
                    </Box>

                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        border: "2px solid var(--mui-palette-divider)",
                        borderRadius: "16px",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <GlassCard>
                        {categorySkills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={
                              isRevealed
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -10 }
                            }
                            transition={{
                              duration: 0.2,
                              delay: skillIndex * 0.05,
                            }}
                          >
                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "0.5px",
                                  marginBottom: "4px",
                                }}
                              >
                                <Box
                                  sx={{
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {skill.name}
                                </Box>
                                <Box
                                sx={{
                                  height: 2,
                                  backgroundColor: "rgba(255,255,255,0.05)",
                                  borderRadius: 999,
                                  overflow: "hidden",
                                }}
                              />
                              </Box>
                            </Box>
                          </motion.div>
                        ))}
                      </GlassCard>
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            </Grid>
          )
        })}
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ marginTop: "46px" }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: 2,
          }}
        >
          All Technologies
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {skills.map((skill, index) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.7 + index * 0.02,
              }}
              whileHover={{ scale: 1.1, y: -2 }}
              style={{
                padding: "4px 12px",
                backgroundColor: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "999px",
                fontSize: "0.75rem",
                cursor: "default",
                transition: "background-color 0.2s ease",
              }}
            >
              {skill.name}
            </motion.span>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}

export default Skills