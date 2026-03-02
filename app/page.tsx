'use client'
import { Box } from "@mui/material";
import { CustomCursor } from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Image from "next/image";

export default function Home() {
  return (
    <Box sx={{ background: "#050505",}}>
      <CustomCursor />
      <Navbar />
      <Box sx={{ ml: { xs: "0px", lg: "3rem"}, px: { xs: "0px", lg: "6.5rem" } }}>
        <Box id="home" sx={{ scrollMarginTop: { xs: "100px", sm: "0px" } }}>
          <Hero />
        </Box>
        <Box id="skills" sx={{ scrollMarginTop: { xs: "100px", sm: "0px" } }}>
          <Skills />
        </Box>
        <Box id="experience" sx={{ scrollMarginTop: { xs: "100px", sm: "0px" } }}>
          <Experience />
        </Box>
        <Box id="projects" sx={{ scrollMarginTop: { xs: "100px", sm: "0px" } }}>
          <Projects />
        </Box>
        <Box id="contact" sx={{ scrollMarginTop: { xs: "100px", sm: "0px" } }}>
          <Contact />
        </Box>
      </Box>
    </Box>
  );
}
