import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
    BookOpen,
    PlayCircle,
    User2,
    Star,
    Clock3,
    BadgeCheck
} from "lucide-react";

import HomeLayout from "../../layouts/HomeLayout";

function CourseDescription() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const { role, data } = useSelector((state) => state.auth);

    return (
        <HomeLayout>

            <div className="min-h-screen px-6 lg:px-20 py-14 text-white">

                <div className="grid lg:grid-cols-2 gap-14 items-start">

                    {/* LEFT SECTION */}
                    <div className="space-y-8">

                        {/* Thumbnail */}
                        <div className="relative overflow-hidden rounded-3xl border border-gray-700 shadow-2xl">

                            <img
                                src={state.thumbnail?.secure_url}
                                alt="thumbnail"
                                className="w-full h-[450px] object-cover hover:scale-105 transition-all duration-500"
                            />

                            <div className="absolute top-5 left-5 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                                Bestseller
                            </div>

                            <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
                                <Star size={16} fill="currentColor" className="text-yellow-400" />

                                <span className="text-sm">
                                    4.9 Rating
                                </span>
                            </div>

                        </div>

                        {/* Stats */}
                        <div className="grid md:grid-cols-3 gap-5">

                            <div className="bg-[#111827] border border-gray-700 rounded-2xl p-5 flex flex-col items-center gap-3">
                                <BookOpen className="text-yellow-400" size={35} />

                                <p className="text-gray-300 text-sm">
                                    Category
                                </p>

                                <h2 className="text-lg font-semibold text-center">
                                    {state.category}
                                </h2>
                            </div>

                            <div className="bg-[#111827] border border-gray-700 rounded-2xl p-5 flex flex-col items-center gap-3">
                                <User2 className="text-yellow-400" size={35} />

                                <p className="text-gray-300 text-sm">
                                    Instructor
                                </p>

                                <h2 className="text-lg font-semibold text-center">
                                    {state.createdBy}
                                </h2>
                            </div>

                            <div className="bg-[#111827] border border-gray-700 rounded-2xl p-5 flex flex-col items-center gap-3">
                                <PlayCircle className="text-yellow-400" size={35} />

                                <p className="text-gray-300 text-sm">
                                    Lectures
                                </p>

                                <h2 className="text-lg font-semibold text-center">
                                    {state.numberOfLectures}
                                </h2>
                            </div>

                        </div>

                        {/* Features */}
                        <div className="bg-[#111827] border border-gray-700 rounded-3xl p-6 space-y-4">

                            <h2 className="text-2xl font-bold text-yellow-400">
                                What You'll Get
                            </h2>

                            <div className="space-y-3 text-gray-300">

                                <div className="flex items-center gap-3">
                                    <BadgeCheck className="text-green-400" />
                                    <span>Full lifetime access</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <BadgeCheck className="text-green-400" />
                                    <span>Certificate of completion</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <BadgeCheck className="text-green-400" />
                                    <span>Access on mobile and desktop</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <BadgeCheck className="text-green-400" />
                                    <span>Industry level projects</span>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SECTION */}
                    <div className="space-y-8">

                        <div className="space-y-5">

                            <div className="flex items-center gap-3">

                                <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500 px-4 py-1 rounded-full text-sm uppercase tracking-widest">
                                    Premium Course
                                </span>

                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" />
                                </div>

                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold capitalize leading-tight">
                                {state.title}
                            </h1>

                            <p className="text-gray-400 text-lg leading-relaxed">
                                {state.description}
                            </p>

                        </div>

                        {/* Info Cards */}
                        <div className="grid md:grid-cols-2 gap-5">

                            <div className="bg-[#111827] border border-gray-700 rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <Clock3 className="text-yellow-400" />

                                    <h2 className="font-semibold text-lg">
                                        Course Duration
                                    </h2>
                                </div>

                                <p className="text-gray-400">
                                    Self paced learning with lifetime access.
                                </p>
                            </div>

                            <div className="bg-[#111827] border border-gray-700 rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <BadgeCheck className="text-yellow-400" />

                                    <h2 className="font-semibold text-lg">
                                        Certification
                                    </h2>
                                </div>

                                <p className="text-gray-400">
                                    Earn certificate after completing the course.
                                </p>
                            </div>

                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-black space-y-5">

                            <h2 className="text-3xl font-bold">
                                Start Learning Today
                            </h2>

                            <p className="font-medium">
                                Upgrade your skills with practical learning and expert mentorship.
                            </p>

                            {
                                role === "ADMIN" || data?.subscription?.status === "active" ? (
                                    <button
                                        className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-900 transition-all duration-300"
                                        onClick={() =>
                                            navigate(
                                                `/course/${state.title}/${state._id}/lectures`,
                                                { state: state }
                                            )
                                        }
                                    >
                                        Go To Lectures
                                    </button>
                                ) : (
                                    <button
                                        className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-900 transition-all duration-300"
                                        onClick={() =>
                                            navigate(
                                                `/course/${state.title}/checkout`,
                                                { state: state }
                                            )
                                        }
                                    >
                                        Subscribe Now
                                    </button>
                                )
                            }

                        </div>

                    </div>

                </div>

            </div>

        </HomeLayout>
    );
}

export default CourseDescription;