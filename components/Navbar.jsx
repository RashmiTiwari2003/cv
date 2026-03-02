import { useTheme, useMediaQuery, Box, Stack, Tooltip, IconButton, Divider } from "@mui/material"
import { Home, Code, School, Mail, GitHub, TrendingUp, LinkedIn } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const navItems = [
  { id: "home", label: "Home", icon: <Home /> },
  { id: "skills", label: "Skills", icon: <School /> },
  { id: "experience", label: "Experience", icon: <TrendingUp /> },
  { id: "projects", label: "Projects", icon: <Code /> },
  { id: "contact", label: "Contact", icon: <Mail /> },
]

const Navbar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"))
  const [selected, setSelected] = useState("home")

  useEffect(() => {
    const sections = ["home", "skills", "experience", "projects", "contact"]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelected(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px", 
        threshold: 0,
      }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Box
      component="aside"
      sx={{
        position: "fixed",
        left: { xs: "50%", lg: 24 },
        top: { xs: 24, lg: "50%" },
        transform: { xs: "translateX(-50%)", lg: "translateY(-50%)" },
        zIndex: 50,
        display: "block",
      }}
    >
      <Box className="glass-effect"
        sx={{
          width: { xs: "90vw", sm: "100%", lg: 64 },
          px: { xs: 1.5, lg: 2 },
          py: {xs: 1, lg: 2 },
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: { xs: "14px", sm: "24px" },
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: { xs: "row", lg: "column" },
          alignItems: "center",
          justifyContent: { xs: "space-between", sm: "center" },
          gap: 2,
        }}
      >
        <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center" display={{ xs: "flex", sm: "flex" }} direction={{ xs: "row", lg: "column" }}>
          {navItems.map((item, index) => {
            const isSelected = selected === item.id

            return (
              <Tooltip
                key={item.id}
                title={item.label}
                placement={isMobile ? "bottom" : "right"}
              >
                <Box sx={{ position: "relative" }}>
                  <motion.div
                    initial={false}
                    animate={{ opacity: isSelected ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "14px",
                      background:
                        "linear-gradient(to right, rgba(80,120,255,0.55), rgba(180,100,255,0.85))",
                      zIndex: 0,
                    }}
                  />

                  <IconButton
                    onClick={() => scrollToSection(item.id)}
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      borderRadius: "14px",
                      transition: "color 0.3s ease",
                      color: isSelected ? "white" : "grey.400",
                      "&:hover": {
                        background: "rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Box>
              </Tooltip>
            )
          })}
        </Stack>

        <Divider orientation={{ xs: "vertical", lg: "horizontal" }} flexItem sx={{ width: { xs: 2, lg: 32 }, bgcolor: "grey.700" }} />

        <Stack spacing={{ xs: 0.5, sm: 1 }} alignItems="center" direction={{ xs: "row", lg: "column" }}>
          <IconButton 
            component="a"
            href="https://github.com/RashmiTiwari2003"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "grey.400" }}
          >
            <GitHub />
          </IconButton>
          <IconButton 
            component="a"
            href="https://www.linkedin.com/in/rashmitiwari03/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "grey.400" }}
          >
            <LinkedIn />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;
