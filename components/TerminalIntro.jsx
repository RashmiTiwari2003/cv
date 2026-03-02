import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"

const Typewriter = ({ text, speed = 120, onComplete }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1))
            i++
            if (i === text.length) {
                clearInterval(interval)
                onComplete?.()
            }
        }, speed)

        return () => clearInterval(interval)
    }, [text])

    return <>{displayed}</>
}

const CommandLine = ({ command, prefix = "~", onComplete }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography color="#4ade80">➜</Typography>
        <Typography color="#60a5fa" sx={{ fontSize: "0.85rem",fontFamily: "monospace !important" }}>{prefix}</Typography>
        <Typography
            color="white"
            sx={{ fontSize: "0.85rem", fontFamily: "monospace" }}
        >
            <Typewriter text={command} onComplete={onComplete} />
        </Typography>
    </Box>
  )
}

const OutputLine = ({ display, children }) => {
    return (
        <Typography
            color="grey.400"
            sx={{ opacity: display ? 1 : 0, pl: 4, fontSize: "0.85rem", fontFamily: "monospace" }}
        >
            {children}
        </Typography>
    )
}

export default function TerminalIntro() {
  const [step, setStep] = useState(0)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      
        {step >= 0 && (
            <CommandLine
                command="whoami"
                onComplete={() => setTimeout(() => setStep(1), 500)}
            />
        )}

        <OutputLine display={step >= 1}>Rashmi Tiwari</OutputLine>

        {step >= 1 && (
            <CommandLine
                command="cat about_me.txt"
                onComplete={() => setTimeout(() => setStep(2), 500)}
            />
        )}

        <OutputLine  display={step >= 2}>
            Full-stack developer crafting scalable web apps. Passionate about clean code, Python and modern JS frameworks.
        </OutputLine>

        {step >= 2 && (
            <CommandLine
                command="cd current-role"
                onComplete={() => setTimeout(() => setStep(3), 500)}
            />
        )}
        
        <OutputLine display={step >= 3}>Junior Software Engineer</OutputLine>

        {step >= 3 && (
            <CommandLine
                prefix="~/current-role"
                command="ls tech-stack"
                onComplete={() => setTimeout(() => setStep(4), 500)}
            />
        )}

        <OutputLine display={step >= 4}>
          React  Next.js  TailwindCSS  Node.js  Express  PostgreSQL  Django  FastAPI  Flask
        </OutputLine>
    </Box>
  )
}
