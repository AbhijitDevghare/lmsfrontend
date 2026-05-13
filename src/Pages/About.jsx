import {
    GraduationCap,
    Globe2,
    Users,
    Sparkles,
    BookOpen,
    BadgeCheck
} from 'lucide-react'

import aboutMainImage from '../assets/Images/aboutMainImage.png'
import option2 from '../assets/json/option2.json'

import Carousel from '../components/Carousel'
import Particle from '../components/Particle'
import HomeLayout from '../layouts/HomeLayout'

function About() {

    return (

        <HomeLayout>

            <Particle option={option2} />

            <div className='min-h-screen px-4 lg:px-20 py-16 text-white relative z-10'>

                {/* Hero Section */}
                <section className='grid lg:grid-cols-2 gap-16 items-center'>

                    {/* Left */}
                    <div className='space-y-10'>

                        <div className='flex items-center gap-3 bg-yellow-500/10 border border-yellow-500 px-5 py-2 rounded-full text-yellow-400 w-fit'>

                            <Sparkles size={18} />

                            <span className='uppercase tracking-widest text-sm font-semibold'>
                                About Our LMS
                            </span>

                        </div>

                        <h1 className='lg:text-6xl text-4xl font-bold leading-tight'>

                            Affordable &
                            <span className='text-yellow-400'>
                                {" "}Quality Education
                            </span>

                            <br />

                            For Everyone

                        </h1>

                        <p className='lg:text-xl text-gray-400 leading-relaxed'>

                            Our mission is to make high quality education accessible and affordable to students around the world. We empower learners and educators through practical courses, modern technology and industry-ready skills.

                        </p>

                        {/* Buttons */}
                        <div className='flex flex-wrap gap-5'>

                            <button className='bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-semibold px-8 py-4 rounded-2xl'>
                                Explore Courses
                            </button>

                            <button className='border border-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-yellow-400'>
                                Learn More
                            </button>

                        </div>

                    </div>

                    {/* Right */}
                    <div className='flex justify-center'>

                        <div className='relative'>

                            <div className='absolute inset-0 bg-yellow-500 blur-[120px] opacity-20 rounded-full'></div>

                            <img
                                src={aboutMainImage}
                                alt='about'
                                className='relative z-10 w-full max-w-xl drop-shadow-2xl'
                            />

                        </div>

                    </div>

                </section>

                {/* Stats */}
                <section className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24'>

                    <div className='bg-[#111827] border border-gray-700 rounded-3xl p-8 text-center hover:border-yellow-400 transition-all duration-300'>

                        <GraduationCap
                            className='mx-auto text-yellow-400 mb-5'
                            size={50}
                        />

                        <h2 className='text-4xl font-bold mb-2'>
                            10K+
                        </h2>

                        <p className='text-gray-400'>
                            Active Students
                        </p>

                    </div>

                    <div className='bg-[#111827] border border-gray-700 rounded-3xl p-8 text-center hover:border-yellow-400 transition-all duration-300'>

                        <BookOpen
                            className='mx-auto text-yellow-400 mb-5'
                            size={50}
                        />

                        <h2 className='text-4xl font-bold mb-2'>
                            150+
                        </h2>

                        <p className='text-gray-400'>
                            Premium Courses
                        </p>

                    </div>

                    <div className='bg-[#111827] border border-gray-700 rounded-3xl p-8 text-center hover:border-yellow-400 transition-all duration-300'>

                        <Users
                            className='mx-auto text-yellow-400 mb-5'
                            size={50}
                        />

                        <h2 className='text-4xl font-bold mb-2'>
                            50+
                        </h2>

                        <p className='text-gray-400'>
                            Expert Mentors
                        </p>

                    </div>

                    <div className='bg-[#111827] border border-gray-700 rounded-3xl p-8 text-center hover:border-yellow-400 transition-all duration-300'>

                        <Globe2
                            className='mx-auto text-yellow-400 mb-5'
                            size={50}
                        />

                        <h2 className='text-4xl font-bold mb-2'>
                            Global
                        </h2>

                        <p className='text-gray-400'>
                            Learning Access
                        </p>

                    </div>

                </section>

                {/* Mission Section */}
                <section className='grid lg:grid-cols-2 gap-12 mt-28 items-center'>

                    <div className='space-y-8'>

                        <h2 className='text-4xl font-bold'>
                            Why Students Choose Us ?
                        </h2>

                        <p className='text-gray-400 text-lg leading-relaxed'>

                            We focus on practical learning experiences, industry-level projects and expert mentorship to help students gain real-world skills and confidence.

                        </p>

                        <div className='space-y-5'>

                            <div className='flex items-start gap-4'>

                                <BadgeCheck
                                    className='text-green-400 mt-1'
                                    size={24}
                                />

                                <div>
                                    <h3 className='font-semibold text-xl'>
                                        Industry Ready Courses
                                    </h3>

                                    <p className='text-gray-400'>
                                        Learn modern technologies and practical skills.
                                    </p>
                                </div>

                            </div>

                            <div className='flex items-start gap-4'>

                                <BadgeCheck
                                    className='text-green-400 mt-1'
                                    size={24}
                                />

                                <div>
                                    <h3 className='font-semibold text-xl'>
                                        Affordable Learning
                                    </h3>

                                    <p className='text-gray-400'>
                                        Quality education accessible for everyone.
                                    </p>
                                </div>

                            </div>

                            <div className='flex items-start gap-4'>

                                <BadgeCheck
                                    className='text-green-400 mt-1'
                                    size={24}
                                />

                                <div>
                                    <h3 className='font-semibold text-xl'>
                                        Lifetime Access
                                    </h3>

                                    <p className='text-gray-400'>
                                        Learn anytime from anywhere without restrictions.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Right Card */}
                    <div className='bg-gradient-to-br from-yellow-500 to-orange-500 rounded-[2rem] p-10 text-black shadow-2xl'>

                        <h2 className='text-4xl font-bold mb-6'>
                            Our Vision
                        </h2>

                        <p className='text-lg leading-relaxed font-medium'>

                            We envision a future where anyone, regardless of location or background, can access world-class education and build a successful career through online learning.

                        </p>

                    </div>

                </section>

                {/* Carousel */}
                <section className='mt-28'>

                    <div className='text-center mb-14'>

                        <h2 className='text-5xl font-bold'>
                            Meet Our
                            <span className='text-yellow-400'>
                                {" "}Mentors
                            </span>
                        </h2>

                        <p className='text-gray-400 mt-5 text-lg'>
                            Learn from highly skilled instructors and professionals.
                        </p>

                    </div>

                    <div className='lg:w-[85%] mx-auto'>

                        <Carousel />

                    </div>

                </section>

            </div>

        </HomeLayout>

    )

}

export default About