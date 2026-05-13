import { useNavigate } from 'react-router-dom'
import {
    PlayCircle,
    BookOpen,
    Star,
    Clock3
} from 'lucide-react'

function CourseCard({ data }) {

    const navigate = useNavigate()

    return (
        <div
            onClick={() =>
                navigate('/course/description', {
                    state: { ...data }
                })
            }
            className="group bg-[#111827] rounded-3xl overflow-hidden shadow-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 cursor-pointer w-full max-w-sm"
        >

            {/* Thumbnail */}
            <div className="relative overflow-hidden">

                <img
                    src={data.thumbnail?.secure_url}
                    alt="course thumbnail"
                    className="w-full h-60 object-cover group-hover:scale-110 transition-all duration-500"
                />

                <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    BESTSELLER
                </div>

                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 text-sm text-white">
                    <PlayCircle size={16} />
                    Online
                </div>

            </div>

            {/* Content */}
            <div className="p-5 space-y-4">

                {/* Category */}
                <div className="flex justify-between items-center">

                    <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                        {data.category}
                    </span>

                    <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm text-gray-300">
                            4.9
                        </span>
                    </div>

                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white line-clamp-2 group-hover:text-yellow-400 transition-all duration-300">
                    {data.title}
                </h2>

                {/* Instructor */}
                <div className="flex items-center gap-2 text-gray-300">
                    <BookOpen size={18} className="text-yellow-400" />

                    <p className="text-sm">
                        Instructor :
                        <span className="text-blue-400 ml-1 font-semibold">
                            {data.createdBy}
                        </span>
                    </p>
                </div>

                {/* Lectures */}
                <div className="flex items-center justify-between text-gray-300">

                    <div className="flex items-center gap-2">
                        <Clock3 size={18} className="text-yellow-400" />

                        <span className="text-sm">
                            {data.numberOfLectures} Lectures
                        </span>
                    </div>

                    <span className="text-green-400 font-semibold text-sm">
                        Lifetime Access
                    </span>

                </div>

                {/* Button */}
                <button
                    className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-xl transition-all duration-300"
                >
                    Explore Course
                </button>

            </div>

        </div>
    )
}

export default CourseCard