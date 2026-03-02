import { Code2, Database, Monitor, Layout, Braces, GitBranch, Terminal, Server, Cpu } from "lucide-react";

const skills = [
    { name: 'ReactJs', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'NextJs', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },

    { name: 'NodeJs', category: 'Backend' },
    { name: 'ExpressJs', category: 'Backend' },
    { name: 'AdonisJS', category: 'Backend' },
    { name: 'TypeORM', category: 'Backend' },
    { name: 'Django', category: 'Backend' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'Flask', category: 'Backend' },
    { name: 'Sequelize', category: 'Backend' },
    { name: 'SQLAlchemy', category: 'Backend' },
    { name: 'Prisma', category: 'Backend' },

    { name: 'MongoDB', category: 'Database' },
    { name: 'MySQL', category: 'Database' },
    { name: 'PostgreSQL', category: 'Database' },

    { name: 'AWS', category: 'Cloud' },
]

const categories = [
    {
        name: "Frontend",
        icon: Code2,
        technologies: ["React", "Next.js", "TS", "Tailwind"],
        description: "Building responsive and maintainable user interfaces.",
        // icons: [Code2, Globe, Sparkles],
        icons: [Code2, Monitor, Layout, Braces]
    },
    {
        name: "Database",
        icon: Database,
        technologies: ["PostgreSQL", "MongoDB", "Prisma", "SQL"],
        description: "Working with structured and NoSQL databases.",
        isCircular: true,
    },
    {
        name: "Backend",
        icon: Server,
        technologies: ["Node.js", "FastAPI", "Express", "Django"],
        description: "Developing APIs and server-side logic.",
        // icons: [Server, Lock, Cpu, Cloud],
        icons: [Server, Cpu, GitBranch, Terminal]

    },
]

export default skills
export { categories }