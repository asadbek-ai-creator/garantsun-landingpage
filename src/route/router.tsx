import RootLayout from "@/layout/root";
import Error from "@/pages/404";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import BlogDetails from "@/pages/blog-details";
import BlogStandard from "@/pages/blog-standard";
import Contact from "@/pages/contact";
import Faq from "@/pages/faq";
import Home from "@/pages/home";
import Project from "@/pages/project";
import ProjectCarousel from "@/pages/project-carousel";
import ProjectDetails from "@/pages/project-details";
import Team from "@/pages/team";
import TeamCarousel from "@/pages/team-carousel";
import TeamDetails from "@/pages/team-details";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/project",
                element: <Project />
            },
            {
                path: "/project-carousel",
                element: <ProjectCarousel />
            },
            {
                path: "/project-details",
                element: <ProjectDetails />
            },
            {
                path: "/team",
                element: <Team />
            },
            {
                path: "/team-carousel",
                element: <TeamCarousel />
            },
            {
                path: "/team-details",
                element: <TeamDetails />
            },
            {
                path: "/faq",
                element: <Faq />
            },
            {
                path: "/404",
                element: <Error />
            },
            {
                path: "/news",
                element: <Blog />
            },
            {
                path: "/news-standard",
                element: <BlogStandard />
            },
            {
                path: "/news-details",
                element: <BlogDetails />
            },
            {
                path: "/contact",
                element: <Contact />
            },
        ]
    },
    {
        path: "*",
        element: <Error />
    },
]);