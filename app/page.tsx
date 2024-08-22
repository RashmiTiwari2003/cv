import Navbar from "@/components/navbar/navbar";
import Main from "./(home)/main";
import About from "./(home)/about";
import Project from "./(home)/(projects)/project";
import Skills from "./(home)/skills";
import Footer from "./(home)/footer";
// npm install framer-motion node-sass react-icons

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Main />
      <About />
      <Project />
      <Skills />
      <Footer />
    </div>
  );
}