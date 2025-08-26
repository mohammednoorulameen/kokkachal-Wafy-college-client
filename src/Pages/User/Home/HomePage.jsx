
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Calendar,
  Users,
  Trophy,
  Camera,
  Star,
  Award,
  Crown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef } from "react";
import { Button } from "@/Components/ui/button";

export default function Home() {
  // Mock data for latest winning teams and students
  const latestTeams = [
    {
      name: "Team Alpha Innovators",
      event: "Tech Innovation Challenge",
      date: "August 20, 2025",
      position: "1st Place",
      members: "John Doe, Jane Smith, Mike Johnson",
    },
    {
      name: "Team Creative Sparks",
      event: "Design Competition",
      date: "August 18, 2025",
      position: "2nd Place",
      members: "Alice Brown, Bob Wilson, Carol Davis",
    },
    {
      name: "Team Dynamic Performers",
      event: "Drama Festival",
      date: "August 15, 2025",
      position: "3rd Place",
      members: "Eve Adams, Frank Miller, Grace Lee",
    },
  ];

  const latestWinners = [
    {
      name: "Sarah Johnson",
      event: "Individual Art Exhibition",
      category: "Painting",
      date: "August 22, 2025",
      position: "1st Place",
    },
    {
      name: "Michael Chen",
      event: "Poetry Recitation",
      category: "Literature",
      date: "August 21, 2025",
      position: "2nd Place",
    },
    {
      name: "Lisa Rodriguez",
      event: "Science Fair",
      category: "STEM Project",
      date: "August 19, 2025",
      position: "3rd Place",
    },
    {
      name: "Lisa Rodriguez",
      event: "Science Fair",
      category: "STEM Project",
      date: "August 19, 2025",
      position: "3rd Place",
    },
    {
      name: "Lisa Rodriguez",
      event: "Science Fair",
      category: "STEM Project",
      date: "August 19, 2025",
      position: "3rd Place",
    },
  ];


    const navigate = useNavigate();


  // Refs for scrolling containers
  const teamScrollRef = useRef(null);
  const winnerScrollRef = useRef(null);
  const programScrollRef = useRef(null);

  // Scroll functions
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Custom arrow components for carousel
  const renderArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        // className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
         className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"
      >
        <ChevronLeft className="w-8 h-8 text-blue-600" />
      </button>
    );

  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        // className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
         className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"
      >
        <ChevronRight className="w-8 h-8 text-blue-600" />
      </button>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Carousel Section */}
       
       <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={true}
            renderArrowPrev={renderArrowPrev}
            renderArrowNext={renderArrowNext}
            interval={5000}
            transitionTime={600}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="relative h-[700px]">
              <img
                src="logoLonge1.jpeg"
                alt="Festival Performance"
                className="w-full h-full object-fit"
              />
              <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
                {/* <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to UMMATHEE</h2>
                  <p className="text-lg">Experience the joy of art and culture</p>
                </div> */}
              </div>
            </div>
            <div className="relative h-[700px]">
              <img
                src="logoLonge2.jpeg"
                alt="Cultural Dance"
                className="w-full h-full object-fit"
              />
              <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
                {/* <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Celebrate Creativity</h2>
                  <p className="text-lg">Join our vibrant community</p>
                </div> */}
              </div>
            </div>
            <div className="relative h-[700px]">
              <img
                src="logoLonge3.jpeg"
                alt="Art Exhibition"
                className="w-full h-full object-fit"
              />
              <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
                {/* <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Talent</h2>
                  <p className="text-lg">Explore our amazing programs</p>
                </div> */}
              </div>
            </div>
             <div className="relative h-[700px]">
              <img
                src="logoLonge4.jpeg"
                alt="Art Exhibition"
                className="w-full h-full object-fit"
              />
              <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
                {/* <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Talent</h2>
                  <p className="text-lg">Explore our amazing programs</p>
                </div> */}
              </div>
            </div>
          </Carousel>
        </div>
      </section>

      {/* <section className="relative py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={true}
            renderArrowPrev={renderArrowPrev}
            renderArrowNext={renderArrowNext}
            interval={5000}
            transitionTime={600}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="relative h-[600px]">
              <img
                src="logoLonge1.jpeg"
                alt="Festival Performance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to UMMATHEE</h2>
                  <p className="text-lg">Experience the joy of art and culture</p>
                </div>
              </div>
            </div>
            <div className="relative h-[600px]">
              <img
                src="logoLonge2.jpeg"
                alt="Cultural Dance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Celebrate Creativity</h2>
                  <p className="text-lg">Join our vibrant community</p>
                </div>
              </div>
            </div>
            <div className="relative h-[600px]">
              <img
                src="logoLonge3.jpeg"
                alt="Art Exhibition"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Talent</h2>
                  <p className="text-lg">Explore our amazing programs</p>
                </div>
              </div>
            </div>
            <div className="relative h-[600px]">
              <img
                src="logoLonge4.jpeg"
                alt="Art Exhibition"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Talent</h2>
                  <p className="text-lg">Explore our amazing programs</p>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </section> */}

      <section>
        <div className="flex justify-center gap-x-2">
          <Button className="bg-transparent border border-black   text-black hover:bg-white-600" >Download Hand book</Button>
          <span>
          <Button  onClick={() => navigate("/gallery")} className="bg-transparent border border-black  text-black hover:bg-white-600" >Explore Gallery</Button>
          </span>
        </div>

      </section>

      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "200+", label: "Participants" },
              { icon: Calendar, number: "130+", label: "Events" },
              { icon: Trophy, number: "50+", label: "Winners" },
              { icon: Camera, number: "1000+", label: "Memories" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center animate-rotate-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-yellow-500 animate-festival-bounce" />
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Discover UMMATHEE Section with Horizontal Scrolling */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Discover <span className="text-yellow-500">UMMATHEE</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of programs, view stunning galleries, and be part of our artistic journey
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollLeft(programScrollRef)}
              // className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
               className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"

            >
              <ChevronLeft className="w-8 h-8 text-blue-600" />
            </button>
            <div
              ref={programScrollRef}
              className="flex overflow-x-auto scroll-smooth gap-8 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
              {[
                 {
                  title: "Results",
                  description: "Celebrate our winners and their outstanding achievements",
                  link: "/results",
                  icon: Trophy,
                  color: "from-blue-500 to-indigo-500",
                },
                {
                  title: "Programs",
                  description: "130+ diverse programs across onstage and offstage categories",
                  link: "/programs",
                  icon: Calendar,
                  color: "from-blue-500 to-indigo-500",
                },
                {
                  title: "Gallery",
                  description: "Stunning visual memories from our festival celebrations",
                  link: "/gallery",
                  icon: Star,
                  color: "from-blue-500 to-indigo-500",
                },
               
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 min-w-[300px]"
                >
                  <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                  <div className="p-8">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white mb-6`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button
              onClick={() => scrollRight(programScrollRef)}
              // className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
               className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"
            >
              <ChevronRight className="w-8 h-8 text-blue-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Latest Winning Teams Section with Horizontal Scrolling */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Crown className="w-12 h-12 text-yellow-500" />
              Latest Winning Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Congratulations to our most recent team champions!
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollLeft(teamScrollRef)}
              // className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
               className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"
            >
              <ChevronLeft className="w-8 h-8 text-blue-600" />
            </button>
            <div
              ref={teamScrollRef}
              className="flex overflow-x-auto scroll-smooth gap-8 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
              {latestTeams.map((team, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 border-l-4 border-yellow-500 min-w-[300px]"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Award className="w-8 h-8 text-yellow-500" />
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          team.position === "1st Place"
                            ? "bg-yellow-100 text-yellow-800"
                            : team.position === "2nd Place"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-orange-100 text-gray-800"
                        }`}
                      >
                        {team.position}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{team.name}</h3>
                    <p className="text-gray-600 mb-2"><strong>Event:</strong> {team.event}</p>
                    <p className="text-gray-600 mb-4"><strong>Date:</strong> {team.date}</p>
                    <p className="text-gray-600 italic text-sm">
                      <strong>Members:</strong> {team.members}
                    </p>
                    <Link
                      to="/results"
                      className="mt-6 inline-block text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      View Full Results →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollRight(teamScrollRef)}
              // className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
               className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"
            >
              <ChevronRight className="w-8 h-8 text-blue-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Latest Student Winners Section with Horizontal Scrolling */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Trophy className="w-12 h-12 text-yellow-500" />
              Latest Winning Students
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrating individual excellence and outstanding achievements
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollLeft(winnerScrollRef)}
              // className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
               className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"
            >
              <ChevronLeft className="w-8 h-8 text-blue-600" />
            </button>
            <div
              ref={winnerScrollRef}
              className="flex overflow-x-auto scroll-smooth gap-8 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
              {latestWinners.map((winner, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 border border-blue-200 min-w-[300px]"
                >
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white mb-6">
                      <Award className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{winner.name}</h3>
                    <p className="text-gray-600 mb-2"><strong>Event:</strong> {winner.event}</p>
                    <p className="text-gray-600 mb-2"><strong>Category:</strong> {winner.category}</p>
                    <p className="text-gray-600 mb-4"><strong>Date:</strong> {winner.date}</p>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        winner.position === "1st Place"
                          ? "bg-yellow-100 text-yellow-800"
                          : winner.position === "2nd Place"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-orange-100 text-gray-800"
                      }`}
                    >
                      {winner.position}
                    </span>
                    <Link
                      to="/results"
                      className="mt-6 inline-block text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      View Full Results →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollRight(winnerScrollRef)}
              // className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
               className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"
            >
              <ChevronRight className="w-8 h-8 text-blue-600" />
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
}
