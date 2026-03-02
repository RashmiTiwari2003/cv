import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ExternalLink, Github, Code, ChevronLeft, ChevronRight, MonitorPlay, FileCode, Sparkles } from 'lucide-react';
import { Box, Button, IconButton, Typography } from '@mui/material';

const MotionBox = motion.create(Box)
const MotionButton = motion.create(Button)

const ProjectShowcase = ({ project, onClose }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % project.media.length)
  }

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + project.media.length) % project.media.length)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevMedia()
      if (e.key === "ArrowRight") nextMedia()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [prevMedia, nextMedia])

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} 
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        overflowY: "auto",
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(25px)",
      }}
    >
      <Box sx={{ minHeight: "100vh", py: 4, px: 3 }}>
        <MotionBox
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          sx={{ maxWidth: "72rem", mx: "auto" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <Box>
              {project.company && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#a78bfa",
                    mb: 1,
                  }}
                >
                  <Sparkles size={16} />
                  {project.company}
                </Box>
              )}
              <Typography variant="h3" sx={{ mb: 0.5, fontSize: { xs: "1.5rem", sm: "3rem" }, color: "rgba(255,255,255,0.8)" }}>{project.title}</Typography>
              <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" }, opacity: 0.6, color: "rgba(255,255,255,0.8)" }}>
                {project.role} • {project.duration}
              </Typography>
            </Box>

            <MotionButton
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                p: 1.5,
                borderRadius: "50%",
                backgroundColor: "var(--accent)",
                minWidth: 0,
                "&:hover": {
                  color: "#c084fc",
                },
              }}
            >
              <X />
            </MotionButton>
          </Box>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Box
              sx={{
                position: "relative",
                mb: 4,
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: "background.paper",
                border: "0.5px solid",
                borderColor: "rgba(168,85,247,0.6)",
              }}
            >
              <Box sx={{ position: "relative", aspectRatio: "16 / 9" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMediaIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: "absolute", inset: 0 }}
                  >
                    {project.media[currentMediaIndex].type === "image" ? (
                      <Box component='img'
                        src={project.media[currentMediaIndex].url}
                        alt={project.media[currentMediaIndex].caption || project.title}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            "linear-gradient(135deg, rgba(88,28,135,0.3), rgba(30,64,175,0.3))",
                        }}
                      >
                        <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <Box sx={{ width: { xs: 24, sm: "64px" }, height: { xs: 24, sm: 64 } }}>
                            <MonitorPlay style={{ width: "100%", height: "100%" }} color="#c084fc" />
                          </Box>
                          <Typography sx={{ mt: { xs: 1, sm: 2 }, color: "text.secondary" }}>
                            Video Demo
                          </Typography>

                          <Box
                            component="a"
                            href={project.media[currentMediaIndex].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              mt: { xs: 1.5, sm: 3 },
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 1,
                              px: { xs: 2, sm: 3 },
                              py: { xs: 1, sm: 1.5 },
                              borderRadius: "999px",
                              fontSize: { xs: "0.8rem", sm: "1rem" },
                              color: "#fff",
                              textDecoration: "none",
                              background:
                                "linear-gradient(90deg, #7c3aed, #2563eb)",
                              "&:hover": {
                                boxShadow: "0px 10px 20px rgba(0,0,0,0.4)",
                              },
                            }}
                          >
                            <Box sx={{ width: { xs: 14, sm: 20 }, height: { xs: 14, sm: 20 } }}>
                              {/* <Play size={20} /> */}
                              <Play style={{ width: "100%", height: "100%" }} />
                            </Box>
                            Watch Video
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </motion.div>
                </AnimatePresence>

                {project.media.length > 1 && (
                  <>
                    <IconButton
                      onClick={prevMedia}
                      sx={{
                        position: "absolute",
                        left: { xs: 10, sm: 16 },
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        backdropFilter: "blur(10px)",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.5)",
                        },
                      }}
                    >
                      <ChevronLeft />
                    </IconButton>

                    <IconButton
                      onClick={nextMedia}
                      sx={{
                        position: "absolute",
                        right: { xs: 10, sm: 16 },
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        backdropFilter: "blur(10px)",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.5)",
                        },
                      }}
                    >
                      <ChevronRight />
                    </IconButton>
                  </>
                )}

                {project.media.length > 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    {project.media.map((_, index) => (
                      <Box
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        sx={{
                          height: 8,
                          borderRadius: 999,
                          cursor: "pointer",
                          transition: "0.3s",
                          width: index === currentMediaIndex ? 32 : 8,
                          backgroundColor:
                            index === currentMediaIndex
                              ? "#a855f7"
                              : "rgba(255,255,255,0.3)",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.6)",
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>

              {project.media[currentMediaIndex].caption && (
                <Box
                  sx={{
                    p: { xs: 1, sm: 2 },
                    borderTop: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "action.hover",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      color: "text.secondary",
                      textAlign: "center",
                    }}
                  >
                    {project.media[currentMediaIndex].caption}
                  </Typography>
                </Box>
              )}
            </Box>
          </motion.div>

          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                target="_blank"
                sx={{ textTransform: "none", color: "#a78bfa", }}
                startIcon={<ExternalLink />}
              >
                View Live
              </Button>
            )}
            {project.github && (
              <Button
                href={project.github}
                sx={{ textTransform: "none", color: "#a78bfa", }}
                target="_blank"
                startIcon={<Github />}
              >
                View Code
              </Button>
            )}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr" },
              gap: 4,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "14px", sm: "20px" } }}>
              <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.9)", }}>Overview</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.7)", }}>
                {project.desc}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "14px", sm: "20px" } }}>
              <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.9)", }}>Technologies</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {project.technologies.map((t) => (
                  <Box
                    key={t}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: "999px",
                      color: "rgba(255,255,255,0.8)",
                      background:
                        "linear-gradient(90deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))",
                    }}
                  >
                    {t}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </MotionBox>
      </Box>
    </MotionBox>
  );
}

export default ProjectShowcase
