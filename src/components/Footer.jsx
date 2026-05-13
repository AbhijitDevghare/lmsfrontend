import {
    BsFacebook,
    BsGithub,
    BsLinkedin,
    BsTwitter,
    BsInstagram
} from 'react-icons/bs'

import { Link } from 'react-router-dom'

function Footer() {

    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#0f172a] text-white pt-14 pb-8 px-6 lg:px-20 border-t border-gray-800">

            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-700">

                {/* Brand */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-yellow-400">
                        LMS
                    </h1>

                    <p className="text-gray-400 leading-relaxed">
                        Learn modern skills from expert instructors with high quality courses and practical projects.
                    </p>

                    <div className="flex items-center gap-4 text-2xl">

                        <Link
                            to="https://www.facebook.com/"
                            target="_blank"
                            className="hover:text-blue-500 transition-all duration-300"
                        >
                            <BsFacebook />
                        </Link>

                        <Link
                            to="https://www.linkedin.com/"
                            target="_blank"
                            className="hover:text-blue-400 transition-all duration-300"
                        >
                            <BsLinkedin />
                        </Link>

                        <Link
                            to="https://github.com/"
                            target="_blank"
                            className="hover:text-gray-300 transition-all duration-300"
                        >
                            <BsGithub />
                        </Link>

                        <Link
                            to="https://twitter.com/"
                            target="_blank"
                            className="hover:text-sky-400 transition-all duration-300"
                        >
                            <BsTwitter />
                        </Link>

                        <Link
                            to="https://instagram.com/"
                            target="_blank"
                            className="hover:text-pink-500 transition-all duration-300"
                        >
                            <BsInstagram />
                        </Link>

                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-5 text-yellow-400">
                        Quick Links
                    </h2>

                    <ul className="space-y-3 text-gray-400">

                        <li>
                            <Link
                                to="/"
                                className="hover:text-yellow-400 transition-all duration-300"
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/courses"
                                className="hover:text-yellow-400 transition-all duration-300"
                            >
                                Courses
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/about"
                                className="hover:text-yellow-400 transition-all duration-300"
                            >
                                About
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/contact"
                                className="hover:text-yellow-400 transition-all duration-300"
                            >
                                Contact
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h2 className="text-xl font-semibold mb-5 text-yellow-400">
                        Categories
                    </h2>

                    <ul className="space-y-3 text-gray-400">
                        <li className="hover:text-yellow-400 transition-all duration-300 cursor-pointer">
                            Web Development
                        </li>

                        <li className="hover:text-yellow-400 transition-all duration-300 cursor-pointer">
                            App Development
                        </li>

                        <li className="hover:text-yellow-400 transition-all duration-300 cursor-pointer">
                            Data Science
                        </li>

                        <li className="hover:text-yellow-400 transition-all duration-300 cursor-pointer">
                            UI / UX Design
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h2 className="text-xl font-semibold mb-5 text-yellow-400">
                        Newsletter
                    </h2>

                    <p className="text-gray-400 mb-4">
                        Subscribe to get latest course updates and offers.
                    </p>

                    <div className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-3 rounded-md bg-[#1e293b] border border-gray-700 outline-none focus:border-yellow-400"
                        />

                        <button
                            className="bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-semibold py-3 rounded-md"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-6 gap-4">

                <p className="text-gray-400 text-sm">
                    Copyright © {currentYear} LMS. All rights reserved.
                </p>

                <div className="flex gap-5 text-sm text-gray-400">

                    <Link
                        to="/privacy"
                        className="hover:text-yellow-400 transition-all duration-300"
                    >
                        Privacy Policy
                    </Link>

                    <Link
                        to="/terms"
                        className="hover:text-yellow-400 transition-all duration-300"
                    >
                        Terms & Conditions
                    </Link>

                </div>

            </div>

        </footer>
    )
}

export default Footer