import { Link } from "react-router-dom";
import {
    BookOpen,
    Users,
    Award,
    PlayCircle,
    Star,
    Code2,
    Globe,
    Briefcase
} from "lucide-react";

import HomeImage from "../assets/Images/homeImage.png";
import StudentImage from "../assets/Images/studentHome.png";

import option1 from '../assets/json/option1.json';

import Particle from "../components/Particle";
import HomeLayout from "../layouts/HomeLayout";

const features = [
    {
        icon: <BookOpen size={40} />,
        title: "100+ Courses",
        desc: "Explore high quality courses from beginner to advanced."
    },
    {
        icon: <Users size={40} />,
        title: "Expert Mentors",
        desc: "Learn from industry professionals and experienced teachers."
    },
    {
        icon: <Award size={40} />,
        title: "Certificates",
        desc: "Get course completion certificates to boost your profile."
    }
];

const categories = [
    {
        icon: <Code2 size={32} />,
        title: "Web Development"
    },
    {
        icon: <Globe size={32} />,
        title: "Digital Marketing"
    },
    {
        icon: <Briefcase size={32} />,
        title: "Business & Finance"
    },
    {
        icon: <PlayCircle size={32} />,
        title: "Video Editing"
    }
];

const HomePage = () => {
    return (
        <HomeLayout>
            <Particle option={option1} />

            {/* Hero Section */}
            <div className="min-h-screen flex lg:px-10 px-4 py-10 flex-col lg:flex-row justify-around items-center gap-10">

                <div className="space-y-8 lg:w-1/2 z-10">
                    <h1 className="lg:text-6xl text-3xl text-white font-bold leading-tight">
                        Find out best{" "}
                        <span className="text-yellow-500">
                            Online Courses
                        </span>
                    </h1>

                    <p className="text-gray-300 lg:text-xl tracking-wide">
                        We provide high quality learning resources taught by expert instructors at affordable prices.
                    </p>

                    <div className="flex gap-4 flex-wrap">
                        <Link to={"/courses"}>
                            <button className="rounded-md lg:w-48 w-40 py-3 font-semibold bg-yellow-500 hover:bg-white hover:text-yellow-500 transition-all duration-300 text-black border-2 border-white">
                                Explore Courses
                            </button>
                        </Link>

                        <Link to={"/contact"}>
                            <button className="rounded-md lg:w-48 w-40 py-3 font-semibold bg-transparent text-white border-2 border-yellow-400 hover:border-white hover:bg-yellow-400 transition-all duration-300 hover:text-black">
                                Contact Us
                            </button>
                        </Link>
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center gap-2 text-yellow-400">
                        <Star fill="currentColor" />
                        <Star fill="currentColor" />
                        <Star fill="currentColor" />
                        <Star fill="currentColor" />
                        <Star fill="currentColor" />

                        <span className="text-gray-300 ml-2">
                            10k+ Happy Students
                        </span>
                    </div>
                </div>

                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src={HomeImage}
                        alt="home"
                        className="w-full max-w-2xl"
                    />
                </div>
            </div>

            {/* Features Section */}
            <section className="px-6 lg:px-16 py-20 text-white">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold">
                        Why Choose Us ?
                    </h2>

                    <p className="text-gray-400 mt-4">
                        Learn smarter with our advanced LMS platform.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-8 hover:scale-105 transition-all duration-300"
                        >
                            <div className="text-yellow-500 mb-4">
                                {feature.icon}
                            </div>

                            <h3 className="text-2xl font-semibold mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-gray-400">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="px-6 lg:px-16 py-20">
                <div className="text-center text-white mb-14">
                    <h2 className="text-4xl font-bold">
                        Popular Categories
                    </h2>

                    <p className="text-gray-400 mt-4">
                        Start learning from trending domains.
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-purple-700 to-indigo-900 text-white p-8 rounded-2xl flex flex-col items-center gap-4 hover:scale-105 transition-all duration-300"
                        >
                            {item.icon}

                            <h3 className="text-xl font-semibold text-center">
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Learning Section */}
            <section className="px-6 lg:px-16 py-20 flex flex-col lg:flex-row items-center gap-16">

                <div className="lg:w-1/2">
                    <img
                        src={StudentImage}
                        alt="student"
                        className="w-full max-w-2xl"
                    />
                </div>

                <div className="lg:w-1/2 text-white space-y-6">
                    <h2 className="text-4xl font-bold leading-snug">
                        Learn Anytime, Anywhere
                    </h2>

                    <p className="text-gray-400 text-lg">
                        Access courses from your laptop, tablet or mobile and continue your learning journey without interruption.
                    </p>

                    <ul className="space-y-4 text-gray-300">
                        <li>✔ Lifetime access to courses</li>
                        <li>✔ Industry level projects</li>
                        <li>✔ Expert mentorship support</li>
                        <li>✔ Placement preparation</li>
                    </ul>

                    <Link to="/courses">
                        <button className="bg-yellow-500 text-black px-8 py-3 rounded-md font-semibold hover:bg-white transition-all duration-300">
                            Start Learning
                        </button>
                    </Link>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 lg:px-16 py-20">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-10 text-center text-black">
                    <h2 className="text-4xl font-bold mb-4">
                        Ready to Upgrade Your Skills?
                    </h2>

                    <p className="text-lg mb-6">
                        Join thousands of students learning on our platform.
                    </p>

                    <Link to="/courses">
                        <button className="bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-900 transition-all duration-300">
                            Browse Courses
                        </button>
                    </Link>
                </div>
            </section>
        </HomeLayout>
    );
};

export default HomePage;