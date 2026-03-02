import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Eye, Github, Layers } from 'lucide-react';
import { Box, Button, Chip, Typography } from '@mui/material';
import { categories } from '@/data/projects'
import projects from '@/data/projects'
import ProjectShowcase from './ProjectShowcase';

const MotionBox = motion.create(Box)
const MotionButton = motion.create(Button)

const Projects = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedProject, setSelectedProject] = useState(null)
    const [showAll, setshowAll] = useState(false)

    const filteredProjects = selectedCategory === 'All' ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <>
        <Box
            id="projects"
            ref={sectionRef}
            sx={{
                minHeight: "100vh",
                padding: { xs: "2.2rem 1rem", sm: "5rem 1rem" },
                position: "relative",
                color: "rgba(255,255,255,0.8)",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                position: "absolute",
                inset: 0,
                background:
                    "linear-gradient(to top, var(--background), rgba(99,102,241,0.05), var(--background))",
                }}
            />

            <Box sx={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
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
                            icon={<Layers size={20} />}
                            label="Portfolio"
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
                        Projects & Work
                    </Typography>

                    <Typography>
                        A showcase of professional and personal projects with detailed case studies
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "0.75rem",
                        marginBottom: "3rem",
                    }}
                >
                    {categories.map((category, index) => (
                        <MotionButton
                            key={category}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                            onClick={() => setSelectedCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            sx={{
                                padding: "0.5rem 1.5rem", textTransform: "capitalize",
                                borderRadius: "999px",
                                border: selectedCategory === category ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255,255,255,0.05)',
                                '&:hover': {
                                    backgroundColor: selectedCategory === category ? '#fff' : 'rgba(255,255,255,0.10)',
                                },
                                cursor: "pointer",
                                backgroundColor: selectedCategory === category ? "#fff" : "rgba(255,255,255,0.05)",
                                color: selectedCategory === category ? "#000" : "#9ca3af",
                            }}
                        >
                            {category}
                        </MotionButton>
                    ))}
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        style={{
                            marginBottom: "3rem",
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "2rem",
                        }}
                    >
                        {(showAll ? filteredProjects : filteredProjects.slice(0, 3)).map((project, index) => (
                            <MotionBox
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                onClick={() => {
                                    if (project.viewCategory) {
                                        setSelectedProject(project)
                                    } else {
                                        window.open(project.link, "_blank", "noopener,noreferrer")
                                    }
                                }}
                                sx={{
                                    position: "relative",
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    borderRadius: "24px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(255,255,255,0.10)",
                                    transition: "border-color 0.2s ease",
                                    '&:hover': {
                                        borderColor: "rgba(168,85,247,0.5)",
                                    },
                                    '& .card-img': {
                                        transform: "scale(1)",
                                        transition: "transform 0.5s ease",
                                    },
                                    '&:hover .card-img': {
                                        transform: "scale(1.1)",
                                    },
                                    '& .card-img-animation': {
                                        opacity: 0
                                    },
                                    '&:hover .card-img-animation': {
                                        opacity: 1
                                    },
                                }}
                            >
                                <Box sx={{ position: "relative", height: 260, overflow: "hidden" }}>
                                    <motion.div className='card-img' whileHover={{ scale: 1.1 }} style={{ height: "100%" }}>
                                        <Box
                                            component="img"
                                            src={project.thumbnail}
                                            alt={project.title}
                                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </motion.div>

                                    <MotionBox className='card-img-animation'
                                        // initial={{ opacity: 0 }}
                                        // whileHover={{ opacity: 1 }}
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            backdropFilter: "blur(12px)",
                                            background: `
                                                linear-gradient(
                                                    120deg,
                                                    transparent 30%,
                                                    rgba(180, 100, 255, 0.3) 50%,
                                                    transparent 70%
                                                )
                                            `,
                                            backgroundSize: "200% 200%",
                                            animation: "shimmer 6s ease-in-out infinite",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {project.viewCategory ? (
                                            <Chip variant='outlined'
                                                icon={<Eye
                                                    color={project.dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)"}
                                                    size={18} 
                                                />}
                                                sx={{
                                                    color: project.dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.8)",
                                                    px: 1,
                                                    borderColor: project.dark
                                                        ? "rgba(0,0,0,0.3)"
                                                        : "rgba(255,255,255,0.4)",
                                                    cursor: "pointer"
                                                }}
                                                label="View Case Study" 
                                            /> 
                                        ) : (
                                            <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexDirection: "row" }}>
                                                <Box
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        window.open(project.link, "_blank", "noopener,noreferrer")
                                                    }}
                                                    sx={{
                                                        color: project.dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.8)",
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: "100px",
                                                        border: "1px solid",
                                                        borderColor: project.dark
                                                            ? "rgba(0,0,0,0.3)"
                                                            : "rgba(255,255,255,0.4)",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <Eye
                                                        color={project.dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)"}
                                                        size={18} 
                                                    />
                                                </Box>

                                                <Box
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        window.open(project.github, "_blank", "noopener,noreferrer")
                                                    }}
                                                    sx={{
                                                        color: project.dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.8)",
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: "100px",
                                                        border: "1px solid",
                                                        borderColor: project.dark
                                                            ? "rgba(0,0,0,0.3)"
                                                            : "rgba(255,255,255,0.4)",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <Github
                                                        color={project.dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)"}
                                                        size={18} 
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                    </MotionBox>
                                </Box>

                                <Box sx={{ p: 3 }}>
                                    <Box sx={{ fontSize: "1.25rem", cursor: "default", mb: 1 }}>
                                        {project.title}
                                    </Box>
                                    {(project.role && project.duration) && (<Box sx={{ fontSize: "0.875rem", cursor: "default", opacity: 0.6, mb: 2 }}>
                                        {project.role} • {project.duration}
                                    </Box>)}
                                    <Box sx={{ fontSize: "0.875rem", cursor: "default", opacity: 0.6, mb: 2 }}>
                                        {project.desc}
                                    </Box>
                                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                                        {project.technologies.slice(0, 4).map((tech) => (
                                            <Box
                                                key={tech}
                                                sx={{
                                                    px: 0.5,
                                                    cursor: "default",
                                                    py: 0.5,
                                                    background: "var(--accent)",
                                                    borderRadius: "999px",
                                                    fontSize: "0.75rem",
                                                    opacity: 0.7,
                                                }}
                                            >
                                                {`#${tech}`}
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </MotionBox>
                        ))}
                    </motion.div>
                </AnimatePresence>
                
                {filteredProjects.length > 3 && <Box sx={{
                    display: "flex", width: "100%", justifyContent: "center" 
                }}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outlined"
                            onClick={() => setshowAll(!showAll)}
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
                            {showAll? "Hide" : "Show"} All
                        </Button>
                    </motion.div>
                </Box>}
            </Box>
        </Box>

        <AnimatePresence>
            {selectedProject && (
                <ProjectShowcase
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </AnimatePresence>
    </>
  )
}

export default Projects

