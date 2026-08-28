import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Box, Container, Typography, TextField, Chip, Button } from "@mui/material";
import { Phone, Mail, Send, MessageSquare } from 'lucide-react';

const MotionBox = motion.create(Box)
const MotionButton = motion.create(Button)

const labelStyle = {
  fontSize: 12,
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  fontWeight: 700,
}

const valueStyle = {
  fontWeight: 500,
}

const Field = ({ label, ...props }) => (
  <Box>
    <Typography
      sx={{
        fontSize: "0.7rem",
        fontWeight: 700,
        color: "#6b7280",
        textTransform: "uppercase",
        ml: 1,
        mb: 0.5,
      }}
    >
      {label}
    </Typography>

    <TextField
      fullWidth
      variant="outlined"
      {...props}
      sx={{
        "& .MuiOutlinedInput-root": {
          background: "rgba(255,255,255,0.05)",
          borderRadius: "16px",
          color: "#fff",
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.1)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(255,255,255,0.2)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#a855f7",
          },
        },
        "& .MuiInputLabel-root": { color: "#9ca3af" },
        "& input::placeholder": { color: "rgba(255,255,255,0.5)" },
        "& textarea::placeholder": { color: "rgba(255,255,255,0.5)" },
      }}
    />
  </Box>
)

const Contact = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const titleText = "Let's Work Together"

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true)
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Could not send the message.")
      }

      setForm({ name: "", email: "", subject: "", message: "" })
      setFormSubmitted(true)
      setTimeout(() => setFormSubmitted(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <Box
      id="contact"
      ref={sectionRef}
      sx={{
        minHeight: { xs: "auto", md: "80vh" },
        py: "20px",
        color: "rgba(255,255,255,0.8)",
        px: { xs: 2, sm: 3, lg: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: 1,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "25%",
            left: "25%",
            width: 384,
            height: 384,
            background: "rgba(80,120,255,0.15)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 6,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ display: "inline-block" }}
                >
                  <Chip
                    icon={<Send size={16} />}
                    label="Get In Touch"
                    sx={{ color: "rgba(200,210,255,0.7)", background: "rgba(80,120,255,0.15)", }}
                  />
                </motion.div>
              </motion.div>
              <MotionBox
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                sx={{
                  fontSize: { xs: "2rem", lg: "2.5rem" },
                  color: "rgba(255,255,255,0.8)",
                  textAlign: "start",
                  pointerEvents: "none"
                }}
              >
                {titleText.split(" ").map((word, wordIndex) => (
                  <Box
                    key={wordIndex}
                    component="span"
                    sx={{
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
                          ) + charIndex

                      return (
                        <motion.span
                          key={charIndex}
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={isInView ? {
                            duration: 0.05,
                            delay: 0.6 + globalIndex * 0.05,
                          } : {
                            duration: 0.05,
                            delay: 0,
                          }}
                          style={{ display: "inline-block" }}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </Box>
                ))}
              </MotionBox>
              <Typography sx={{ fontSize: "clamp(10px, 1.5vw, 18px)" }}>
                Have a project in mind or just want to chat? I'd love to hear from you
              </Typography>
            </Box>
          
            <Box
              component="a"
              href="mailto:rashmitiwari35832@gmail.com"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                "&:hover .icon-box-email": {
                  background: "rgba(168,85,247,0.2)",
                  borderColor: "rgba(168,85,247,0.5)",
                },
                "&:hover .icon-email": {
                  color: "#a855f7",
                },
              }}
            >
              <Box
                className="icon-box-email"
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <Mail className="icon-email" style={{ color: "#9ca3af" }} />
              </Box>

              <Box>
                <Typography sx={labelStyle}>
                  Email me at
                </Typography>
                <Typography sx={valueStyle}>
                  rashmitiwari35832@gmail.com
                </Typography>
              </Box>
            </Box>

            <Box
              component="a"
              // href="https://wa.me/918910137123"
              href="https://wa.me/918910137123?text=Hi%20Rashmi,%20I%20came%20across%20your%20portfolio."
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                "&:hover .icon-box-whatsapp": {
                  background: "rgba(59,130,246,0.2)",
                  borderColor: "rgba(59,130,246,0.5)",
                },
                "&:hover .icon-whatsapp": {
                  color: "#60a5fa",
                },
              }}
            >
              <Box
                className="icon-box-whatsapp"
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <MessageSquare className="icon-whatsapp" style={{ color: "#9ca3af" }} />
              </Box>

              <Box>
                <Typography sx={labelStyle}>Chat with me</Typography>
                <Typography sx={valueStyle}>WhatsApp: (+91) 8910137123</Typography>
              </Box>
            </Box>

            <Box
              component="a"
              href="tel:+918910137123"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                "&:hover .icon-box-phone": {
                  background: "rgba(236,72,153,0.2)",
                  borderColor: "rgba(236,72,153,0.5)",
                },
                "&:hover .icon-phone": {
                  color: "#f472b6",
                },
              }}
            >
              <Box
                className="icon-box-phone"
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <Phone className="icon-phone" style={{ color: "#9ca3af" }} />
              </Box>

              <Box>
                <Typography sx={labelStyle}>Call me</Typography>
                <Typography sx={valueStyle}>(+91) 8910137123</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                position: "relative",
                px: { xs: "22px", sm: "32px" },
                borderRadius: "20px",
                py: "14px",
                gap: "7px",
                background:
                  "linear-gradient(135deg, rgba(80,120,255,0.12), rgba(120,160,255,0.08))",
                border: "1px solid rgba(80,120,255,0.25)",
                overflow: "hidden",
                display :"flex",
                flexDirection: "column"
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  top: -48,
                  right: -48,
                  width: 110,
                  height: 110,
                  border: "4px solid rgba(80,120,255,0.3)",
                  borderRadius: "50%",
                }}
              />

              <h4
                style={{
                  fontSize: 18,
                  margin: 0,
                  color: "rgba(220,230,255,0.9)",
                }}
              >
                Open to Opportunities
              </h4>

              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "rgba(200,210,255,0.6)",
                  lineHeight: 1.6,
                }}
              >
                I'm currently open to new opportunities and exciting projects. Let's create
                something amazing together!
              </p>
            </Box>
          </Box>

          <MotionBox
            variants={{
              hidden: { opacity: 0, scale: 0.9, x: 20 },
              visible: {
                opacity: 1,
                scale: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            initial="hidden"
            animate="visible"
            sx={{
              background: "rgba(255,255,255,0.05)",
              p: 4,
              borderRadius: "2rem",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { md: "1fr 1fr" },
                  gap: 3,
                }}
              >
                <Field
                  label="Name"
                  placeholder="John Doe"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange("name")}
                />
                <Field
                  label="Email"
                  placeholder="john@example.com"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange("email")}
                />
              </Box>

              <Field
                label="Subject"
                placeholder="Project Inquiry"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange("subject")}
              />
              <Field
                label="Message"
                placeholder="Tell me about your project..."
                name="message"
                required
                multiline
                rows={4}
                value={form.message}
                onChange={handleChange("message")}
              />

              {error && (
                <Typography sx={{ fontSize: 13, color: "#f87171" }}>{error}</Typography>
              )}
              {formSubmitted && (
                <Typography sx={{ fontSize: 13, color: "#4ade80" }}>
                  Thanks! Your message has been sent.
                </Typography>
              )}

              <MotionButton
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.98 }}
                sx={{
                  textTransform: "none",
                  py: 2,
                  borderRadius: "1.5rem",
                  background: "linear-gradient(90deg, #7c3aed, #2563eb)",
                  color: "#fff",
                  fontWeight: 700,
                  display: "flex",
                  gap: 1,
                  "&:hover": { opacity: 0.9 },
                  "&.Mui-disabled": { color: "rgba(255,255,255,0.6)", opacity: 0.6 },
                }}
              >
                {sending ? "Sending..." : "Send Message"}
                <Send size={18} />
              </MotionButton>
            </Box>
          </MotionBox>
        </Box>

        <Box
          sx={{
            mt: { xs: 4, sm: 10 },
            pt: 4,
            borderTop: "1px solid rgba(80,120,255,0.2)",
            textAlign: "center",
          }}
        >
          <Typography sx={{ opacity: 0.6 }}>
            Made with ❤️ using React & Framer Motion
          </Typography>
          <Typography sx={{ fontSize: 12, opacity: 0.4 }}>
            © 2026 Rashmi Tiwari
          </Typography>
        </Box>
      </Container>
    </Box>
  )
} 

export default Contact

