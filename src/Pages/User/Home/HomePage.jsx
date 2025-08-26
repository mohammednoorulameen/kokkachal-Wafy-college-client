// import { Link } from "react-router-dom";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {
//   Calendar,
//   Users,
//   Trophy,
//   Camera,
//   Star,
//   Award,
//   Crown,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useRef } from "react";

// export default function Home() {
//   // Mock data for latest winning teams and students
//   const latestTeams = [
//     {
//       name: "Team Alpha Innovators",
//       event: "Tech Innovation Challenge",
//       date: "August 20, 2025",
//       position: "1st Place",
//       members: "John Doe, Jane Smith, Mike Johnson",
//     },
//     {
//       name: "Team Creative Sparks",
//       event: "Design Competition",
//       date: "August 18, 2025",
//       position: "2nd Place",
//       members: "Alice Brown, Bob Wilson, Carol Davis",
//     },
//     {
//       name: "Team Dynamic Performers",
//       event: "Drama Festival",
//       date: "August 15, 2025",
//       position: "3rd Place",
//       members: "Eve Adams, Frank Miller, Grace Lee",
//     },
//   ];

//   const latestWinners = [
//     {
//       name: "Sarah Johnson",
//       event: "Individual Art Exhibition",
//       category: "Painting",
//       date: "August 22, 2025",
//       position: "1st Place",
//     },
//     {
//       name: "Michael Chen",
//       event: "Poetry Recitation",
//       category: "Literature",
//       date: "August 21, 2025",
//       position: "2nd Place",
//     },
//     {
//       name: "Lisa Rodriguez",
//       event: "Science Fair",
//       category: "STEM Project",
//       date: "August 19, 2025",
//       position: "3rd Place",
//     },
//     {
//       name: "Lisa Rodriguez",
//       event: "Science Fair",
//       category: "STEM Project",
//       date: "August 19, 2025",
//       position: "3rd Place",
//     },
//     {
//       name: "Lisa Rodriguez",
//       event: "Science Fair",
//       category: "STEM Project",
//       date: "August 19, 2025",
//       position: "3rd Place",
//     },
//   ];

//   // Refs for scrolling containers
//   const teamScrollRef = useRef(null);
//   const winnerScrollRef = useRef(null);

//   // Scroll functions
//   const scrollLeft = (ref) => {
//     if (ref.current) {
//       ref.current.scrollBy({ left: -300, behavior: "smooth" });
//     }
//   };

//   const scrollRight = (ref) => {
//     if (ref.current) {
//       ref.current.scrollBy({ left: 300, behavior: "smooth" });
//     }
//   };

//   // Custom arrow components for carousel
//   const renderArrowPrev = (onClickHandler, hasPrev, label) =>
//     hasPrev && (
//       <button
//         type="button"
//         onClick={onClickHandler}
//         title={label}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
//       >
//         <ChevronLeft className="w-8 h-8 text-blue-600" />
//       </button>
//     );

//   const renderArrowNext = (onClickHandler, hasNext, label) =>
//     hasNext && (
//       <button
//         type="button"
//         onClick={onClickHandler}
//         title={label}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
//       >
//         <ChevronRight className="w-8 h-8 text-blue-600" />
//       </button>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Carousel Section */}
//       <section className="relative py-8">
//         <div className="max-w-6xl mx-auto px-4">
//           <Carousel
//             autoPlay
//             infiniteLoop
//             showThumbs={false}
//             showStatus={false}
//             showArrows={true}
//             renderArrowPrev={renderArrowPrev}
//             renderArrowNext={renderArrowNext}
//             interval={5000}
//             transitionTime={600}
//             className="rounded-3xl overflow-hidden shadow-2xl"
//           >
//             <div className="relative h-[600px]">
//               <img
//                 src="logoLonge1.jpeg"
//                 alt="Festival Performance"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <div className="text-center text-white">
//                   <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                     Welcome to UMMATHEE
//                   </h2>
//                   <p className="text-lg">
//                     Experience the joy of art and culture
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="relative h-[600px]">
//               <img
//                 src="logoLonge2.jpeg"
//                 alt="Cultural Dance"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <div className="text-center text-white">
//                   <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                     Celebrate Creativity
//                   </h2>
//                   <p className="text-lg">Join our vibrant community</p>
//                 </div>
//               </div>
//             </div>
//             <div className="relative h-[600px]">
//               <img
//                 src="logoLonge3.jpeg"
//                 alt="Art Exhibition"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <div className="text-center text-white">
//                   <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                     Discover Talent
//                   </h2>
//                   <p className="text-lg">Explore our amazing programs</p>
//                 </div>
//               </div>
//             </div>
//             <div className="relative h-[600px]">
//               <img
//                 src="logoLonge4.jpeg"
//                 alt="Art Exhibition"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <div className="text-center text-white">
//                   <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                     Discover Talent
//                   </h2>
//                   <p className="text-lg">Explore our amazing programs</p>
//                 </div>
//               </div>
//             </div>
//           </Carousel>
//         </div>
//       </section>

//       <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { icon: Users, number: "200+", label: "Participants" },
//               { icon: Calendar, number: "130+", label: "Events" },
//               { icon: Trophy, number: "50+", label: "Winners" },
//               { icon: Camera, number: "1000+", label: "Memories" },
//             ].map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <div
//                   key={index}
//                   className="text-center animate-rotate-in"
//                   style={{ animationDelay: `${index * 150}ms` }}
//                 >
//                   <Icon className="w-12 h-12 mx-auto mb-4 text-yellow-500 animate-festival-bounce" />
//                   <div className="text-3xl font-bold text-gray-800 mb-2">
//                     {stat.number}
//                   </div>
//                   <div className="text-gray-600">{stat.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Latest Winning Teams Section with Horizontal Scrolling */}
//       <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
//               <Crown className="w-12 h-12 text-yellow-500" />
//               Latest Winning Teams
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Congratulations to our most recent team champions!
//             </p>
//           </div>

//           <div className="relative">
//             <button
//               onClick={() => scrollLeft(teamScrollRef)}
//               // className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"
//             >
//               <ChevronLeft className="w-8 h-8 text-blue-600" />
//             </button>
//             <div
//               ref={teamScrollRef}
//               className="flex overflow-x-auto scroll-smooth gap-8 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
//             >
//               {latestTeams.map((team, index) => (
//                 <div
//                   key={index}
//                   className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 border-l-4 border-yellow-500 min-w-[300px]"
//                 >
//                   <div className="p-8">
//                     <div className="flex items-center justify-between mb-4">
//                       <Award className="w-8 h-8 text-yellow-500" />
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-bold ${
//                           team.position === "1st Place"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : team.position === "2nd Place"
//                             ? "bg-gray-100 text-gray-800"
//                             : "bg-orange-100 text-gray-800"
//                         }`}
//                       >
//                         {team.position}
//                       </span>
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                       {team.name}
//                     </h3>
//                     <p className="text-gray-600 mb-2">
//                       <strong>Event:</strong> {team.event}
//                     </p>
//                     <p className="text-gray-600 mb-4">
//                       <strong>Date:</strong> {team.date}
//                     </p>
//                     <p className="text-gray-600 italic text-sm">
//                       <strong>Members:</strong> {team.members}
//                     </p>
//                     <Link
//                       to="/results"
//                       className="mt-6 inline-block text-blue-600 hover:text-blue-800 font-semibold transition-colors"
//                     >
//                       View Full Results →
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={() => scrollRight(teamScrollRef)}
//               // className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"
//             >
//               <ChevronRight className="w-8 h-8 text-blue-600" />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Latest Student Winners Section with Horizontal Scrolling */}
//       <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
//               <Trophy className="w-12 h-12 text-yellow-500" />
//               Latest Winning Students
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Celebrating individual excellence and outstanding achievements
//             </p>
//           </div>

//           <div className="relative">
//             <button
//               onClick={() => scrollLeft(winnerScrollRef)}
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"
//               // className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10  bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
//             >
//               <ChevronLeft className="w-8 h-8 text-blue-600" />
//             </button>
//             <div
//               ref={winnerScrollRef}
//               className="flex overflow-x-auto scroll-smooth gap-8 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
//             >
//               {latestWinners.map((winner, index) => (
//                 <div
//                   key={index}
//                   className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 border border-blue-200 min-w-[300px]"
//                 >
//                   <div className="p-8 text-center">
//                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white mb-6">
//                       <Award className="w-8 h-8" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                       {winner.name}
//                     </h3>
//                     <p className="text-gray-600 mb-2">
//                       <strong>Event:</strong> {winner.event}
//                     </p>
//                     <p className="text-gray-600 mb-2">
//                       <strong>Category:</strong> {winner.category}
//                     </p>
//                     <p className="text-gray-600 mb-4">
//                       <strong>Date:</strong> {winner.date}
//                     </p>
//                     <span
//                       className={`px-4 py-2 rounded-full text-sm font-bold ${
//                         winner.position === "1st Place"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : winner.position === "2nd Place"
//                           ? "bg-gray-100 text-gray-800"
//                           : "bg-orange-100 text-gray-800"
//                       }`}
//                     >
//                       {winner.position}
//                     </span>
//                     <Link
//                       to="/results"
//                       className="mt-6 inline-block text-blue-600 hover:text-blue-800 font-semibold transition-colors"
//                     >
//                       View Full Results →
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={() => scrollRight(winnerScrollRef)}
//               // className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10   duration-300"
//             >
//               <ChevronRight className="w-8 h-8 text-blue-600" />
//             </button>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//               Discover <span className="text-yellow-500">UMMATHEE</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Explore our diverse range of programs, view stunning galleries,
//               and be part of our artistic journey
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Programs",
//                 description:
//                   "130+ diverse programs across onstage and offstage categories",
//                 link: "/programs",
//                 icon: Calendar,
//                 color: "from-blue-500 to-indigo-500",
//               },
//               {
//                 title: "Gallery",
//                 description:
//                   "Stunning visual memories from our festival celebrations",
//                 link: "/gallery",
//                 icon: Star,
//                 color: "from-blue-500 to-indigo-500",
//               },
//               {
//                 title: "Results",
//                 description:
//                   "Celebrate our winners and their outstanding achievements",
//                 link: "/results",
//                 icon: Trophy,
//                 color: "from-blue-500 to-indigo-500",
//               },
//             ].map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.link}
//                 className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
//               >
//                 <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
//                 <div className="p-8">
//                   <div
//                     className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white mb-6`}
//                   >
//                     <item.icon className="w-6 h-6" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
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
       {/* <section className="relative py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={5000}
            transitionTime={600}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="relative h-[500px]">
              <img
                src="logoLonge1.jpeg"
                alt="Festival Performance"
                className="w-full h-full object-fit"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to UMMATHEE</h2>
                  <p className="text-lg">Experience the joy of art and culture</p>
                </div>
              </div>
            </div>
            <div className="relative h-[500px]">
              <img
                src="logoLonge2.jpeg"
                alt="Cultural Dance"
                className="w-full h-full object-fit"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Celebrate Creativity</h2>
                  <p className="text-lg">Join our vibrant community</p>
                </div>
              </div>
            </div>
            <div className="relative h-[500px]">
              <img
                src="logoLonge3.jpeg"
                alt="Art Exhibition"
                className="w-full h-full object-fit"
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
       <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
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

// import { Link } from "react-router-dom";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {
//   Calendar,
//   Users,
//   Trophy,
//   Camera,
//   Star,
// } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="min-h-screen">
      // {/* Carousel Section */}
      // {/* <section className="relative py-8">
      //   <div className="max-w-4xl mx-auto px-4">
      //     <Carousel
      //       autoPlay
      //       infiniteLoop
      //       showThumbs={false}
      //       showStatus={false}
      //       interval={5000}
      //       transitionTime={600}
      //       className="rounded-3xl overflow-hidden shadow-2xl"
      //     >
      //       <div className="relative h-[500px]">
      //         <img
      //           src="logoLonge1.jpeg"
      //           alt="Festival Performance"
      //           className="w-full h-full object-fit"
      //         />
      //         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      //           <div className="text-center text-white">
      //             <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to UMMATHEE</h2>
      //             <p className="text-lg">Experience the joy of art and culture</p>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="relative h-[500px]">
      //         <img
      //           src="logoLonge2.jpeg"
      //           alt="Cultural Dance"
      //           className="w-full h-full object-fit"
      //         />
      //         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      //           <div className="text-center text-white">
      //             <h2 className="text-3xl md:text-4xl font-bold mb-4">Celebrate Creativity</h2>
      //             <p className="text-lg">Join our vibrant community</p>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="relative h-[500px]">
      //         <img
      //           src="logoLonge3.jpeg"
      //           alt="Art Exhibition"
      //           className="w-full h-full object-fit"
      //         />
      //         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      //           <div className="text-center text-white">
      //             <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Talent</h2>
      //             <p className="text-lg">Explore our amazing programs</p>
      //           </div>
      //         </div>
      //       </div>
      //     </Carousel>
      //   </div>
      // </section> */}
      //  <section className="relative py-8">
      //   <div className="max-w-7xl mx-auto px-4">
      //     <Carousel
      //       autoPlay
      //       infiniteLoop
      //       showThumbs={false}
      //       showStatus={false}
      //       interval={5000}
      //       transitionTime={600}
      //       className="rounded-3xl overflow-hidden shadow-2xl"
      //     >
      //       <div className="relative h-[700px]">
      //         <img
      //           src="logoLonge1.jpeg"
      //           alt="Festival Performance"
      //           className="w-full h-full object-fit"
      //         />
      //         <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
      //           {/* <div className="text-center text-white">
      //             <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to UMMATHEE</h2>
      //             <p className="text-lg">Experience the joy of art and culture</p>
      //           </div> */}
      //         </div>
      //       </div>
      //       <div className="relative h-[700px]">
      //         <img
      //           src="logoLonge2.jpeg"
      //           alt="Cultural Dance"
      //           className="w-full h-full object-fit"
      //         />
      //         <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
      //           {/* <div className="text-center text-white">
      //             <h2 className="text-3xl md:text-4xl font-bold mb-4">Celebrate Creativity</h2>
      //             <p className="text-lg">Join our vibrant community</p>
      //           </div> */}
      //         </div>
      //       </div>
      //       <div className="relative h-[700px]">
      //         <img
      //           src="logoLonge3.jpeg"
      //           alt="Art Exhibition"
      //           className="w-full h-full object-fit"
      //         />
      //         <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
      //           {/* <div className="text-center text-white">
      //             <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Talent</h2>
      //             <p className="text-lg">Explore our amazing programs</p>
      //           </div> */}
      //         </div>
      //       </div>
      //        <div className="relative h-[700px]">
      //         <img
      //           src="logoLonge4.jpeg"
      //           alt="Art Exhibition"
      //           className="w-full h-full object-fit"
      //         />
      //         <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
      //           {/* <div className="text-center text-white">
      //             <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Talent</h2>
      //             <p className="text-lg">Explore our amazing programs</p>
      //           </div> */}
      //         </div>
      //       </div>
      //     </Carousel>
      //   </div>
      // </section>

//       <section className="py-16 bg-muted">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { icon: Users, number: "200+", label: "Participants" },
//               { icon: Calendar, number: "130+", label: "Events" },
//               { icon: Trophy, number: "50+", label: "Winners" },
//               { icon: Camera, number: "1000+", label: "Memories" },
//             ].map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <div
//                   key={index}
//                   className="text-center animate-rotate-in"
//                   style={{ animationDelay: `${index * 150}ms` }}
//                 >
//                   <Icon className="w-12 h-12 mx-auto mb-4 text-primary animate-festival-bounce" />
//                   <div className="text-3xl font-bold text-primary mb-2">
//                     {stat.number}
//                   </div>
//                   <div className="text-muted-foreground">{stat.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//               Discover <span className="festival-text-gradient">UMMATHEE</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Explore our diverse range of programs, view stunning galleries,
//               and be part of our artistic journey
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Programs",
//                 description:
//                   "130+ diverse programs across onstage and offstage categories",
//                 link: "/programs",
//                 icon: Calendar,
//                 color: "from-green-500 to-lime-500",
//               },
//               {
//                 title: "Gallery",
//                 description:
//                   "Stunning visual memories from our festival celebrations",
//                 link: "/gallery",
//                 icon: Star,
//                 color: "from-lime-500 to-yellow-500",
//               },
//               {
//                 title: "Results",
//                 description:
//                   "Celebrate our winners and their outstanding achievements",
//                 link: "/results",
//                 icon: Trophy,
//                 color: "from-yellow-500 to-orange-500",
//               },
//             ].map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.link}
//                 className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
//               >
//                 <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
//                 <div className="p-8">
//                   <div
//                     className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white mb-6`}
//                   >
//                     <item.icon className="w-6 h-6" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// import { Link } from "react-router-dom";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {
//   Calendar,
//   Users,
//   Trophy,
//   Camera,
//   Star,
// } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       {/* Carousel Section */}
//       <section className="relative">
//         <Carousel
//           autoPlay
//           infiniteLoop
//           showThumbs={false}
//           showStatus={false}
//           interval={5000}
//           transitionTime={600}
//           className="rounded-3xl overflow-hidden shadow-2xl"
//         >
//           <div className="relative h-[500px]">
//             <img
//               src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
//               alt="Festival Performance"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//               <div className="text-center text-white">
//                 <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to UMMATHEE</h2>
//                 <p className="text-xl">Experience the joy of art and culture</p>
//               </div>
//             </div>
//           </div>
//           <div className="relative h-[500px]">
//             <img
//               src="https://images.unsplash.com/photo-1573152958734-1922c188fba3"
//               alt="Cultural Dance"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//               <div className="text-center text-white">
//                 <h2 className="text-4xl md:text-5xl font-bold mb-4">Celebrate Creativity</h2>
//                 <p className="text-xl">Join our vibrant community</p>
//               </div>
//             </div>
//           </div>
//           <div className="relative h-[500px]">
//             <img
//               src="https://images.unsplash.com/photo-1518998053901-5348d3961a04"
//               alt="Art Exhibition"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//               <div className="text-center text-white">
//                 <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Talent</h2>
//                 <p className="text-xl">Explore our amazing programs</p>
//               </div>
//             </div>
//           </div>
//         </Carousel>
//       </section>

//       <section className="py-16 bg-muted">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { icon: Users, number: "200+", label: "Participants" },
//               { icon: Calendar, number: "130+", label: "Events" },
//               { icon: Trophy, number: "50+", label: "Winners" },
//               { icon: Camera, number: "1000+", label: "Memories" },
//             ].map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <div
//                   key={index}
//                   className="text-center animate-rotate-in"
//                   style={{ animationDelay: `${index * 150}ms` }}
//                 >
//                   <Icon className="w-12 h-12 mx-auto mb-4 text-primary animate-festival-bounce" />
//                   <div className="text-3xl font-bold text-primary mb-2">
//                     {stat.number}
//                   </div>
//                   <div className="text-muted-foreground">{stat.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//               Discover <span className="festival-text-gradient">UMMATHEE</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Explore our diverse range of programs, view stunning galleries,
//               and be part of our artistic journey
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Programs",
//                 description:
//                   "130+ diverse programs across onstage and offstage categories",
//                 link: "/programs",
//                 icon: Calendar,
//                 color: "from-green-500 to-lime-500",
//               },
//               {
//                 title: "Gallery",
//                 description:
//                   "Stunning visual memories from our festival celebrations",
//                 link: "/gallery",
//                 icon: Star,
//                 color: "from-lime-500 to-yellow-500",
//               },
//               {
//                 title: "Results",
//                 description:
//                   "Celebrate our winners and their outstanding achievements",
//                 link: "/results",
//                 icon: Trophy,
//                 color: "from-yellow-500 to-orange-500",
//               },
//             ].map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.link}
//                 className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
//               >
//                 <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
//                 <div className="p-8">
//                   <div
//                     className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white mb-6`}
//                   >
//                     <item.icon className="w-6 h-6" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// import { Link } from "react-router-dom"

// import { ArrowRight, Calendar, Users, Trophy, Camera, Star } from "lucide-react"
// import Slider from "react-slick"
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"

// export default function HomePage() {
//   const heroImages = ["/logoLonge1.jpeg", "/logoLonge2.jpeg", "/logoLonge3.jpeg", "/logoLonge4.jpeg"]

//   const winners = [
//     { name: "Alice Johnson", prize: "1st Place", image: "/winner1.jpg" },
//     { name: "Bob Smith", prize: "2nd Place", image: "/winner2.jpg" },
//     { name: "Carol Lee", prize: "3rd Place", image: "/winner3.jpg" },
//     { name: "David Kim", prize: "Special Award", image: "/winner4.jpg" },
//   ]

//   const galleryImages = ["/logoLonge1.jpeg", "/logoLonge2.jpeg", "/logoLonge3.jpeg", "/logoLonge4.jpeg"]

//   const heroSliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     arrows: true,
//     fade: false,
//     cssEase: "ease-in-out",
//   }

//   const gallerySliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: true,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           arrows: false,
//           dots: true,
//         },
//       },
//     ],
//   }

//   return (
//     <div className="min-h-screen overflow-x-hidden">
//       <section className="relative w-full py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="relative w-full max-w-5xl mx-auto">
//             <Slider {...heroSliderSettings} className="relative z-10">
//               {heroImages.map((img, index) => (
//                 <div key={index} className="relative w-full overflow-hidden rounded-2xl px-2">
//                   <img
//                     src={img || "/placeholder.svg"}
//                     alt={`Festival moment ${index + 1}`}
//                     className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
//                   />
//                 </div>
//               ))}
//             </Slider>

//             {/* Overlay and content */}
//             <div className="absolute inset-0 bg-black/30 z-0 rounded-2xl"></div>
//             <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
//               <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">UMMATHEE</h1>
//               <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl leading-relaxed">
//                 Arts Festival 2025-26 - Celebrating creativity, culture, and artistic excellence
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link
//                   to="/programs"
//                   className="bg-white text-purple-900 px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-lg"
//                 >
//                   Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
//                 </Link>
//                 <Link
//                   to="/gallery"
//                   className="border-2 border-white text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300 hover:scale-105"
//                 >
//                   View Gallery
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { icon: Users, number: "200+", label: "Participants" },
//               { icon: Calendar, number: "130+", label: "Events" },
//               { icon: Trophy, number: "50+", label: "Winners" },
//               { icon: Camera, number: "1000+", label: "Memories" },
//             ].map((stat, index) => {
//               const Icon = stat.icon
//               return (
//                 <div
//                   key={index}
//                   className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//                 >
//                   <Icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
//                   <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
//                   <div className="text-gray-600 font-medium">{stat.label}</div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Winners Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//               Our{" "}
//               <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 Winners
//               </span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Celebrating the outstanding achievements of our talented participants
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {winners.map((winner, index) => (
//               <div
//                 key={index}
//                 className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
//               >
//                 <div className="relative mb-6">
//                   <img
//                     src={winner.image || "/placeholder.svg"}
//                     alt={winner.name}
//                     className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-purple-200"
//                   />
//                   <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
//                     <Trophy className="w-4 h-4 text-white" />
//                   </div>
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">{winner.name}</h3>
//                 <p className="text-purple-600 font-semibold">{winner.prize}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//               Gallery{" "}
//               <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 Highlights
//               </span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Capturing the vibrant moments and artistic expressions from our festival
//             </p>
//           </div>
//           <div className="max-w-4xl mx-auto">
//             <Slider {...gallerySliderSettings}>
//               {galleryImages.map((img, index) => (
//                 <div key={index} className="px-2">
//                   <div className="relative overflow-hidden rounded-2xl shadow-xl">
//                     <img
//                       src={img || "/placeholder.svg"}
//                       alt={`Gallery highlight ${index + 1}`}
//                       className="w-full h-64 md:h-80 lg:h-96 object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </div>
//       </section>

//       {/* Discover Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//               Discover{" "}
//               <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 UMMATHEE
//               </span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Explore our diverse range of programs, view stunning galleries, and be part of our artistic journey
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Programs",
//                 description: "130+ diverse programs across onstage and offstage categories",
//                 link: "/programs",
//                 icon: Calendar,
//                 gradient: "from-emerald-500 to-teal-500",
//               },
//               {
//                 title: "Gallery",
//                 description: "Stunning visual memories from our festival celebrations",
//                 link: "/gallery",
//                 icon: Star,
//                 gradient: "from-purple-500 to-pink-500",
//               },
//               {
//                 title: "Results",
//                 description: "Celebrate our winners and their outstanding achievements",
//                 link: "/results",
//                 icon: Trophy,
//                 gradient: "from-amber-500 to-orange-500",
//               },
//             ].map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.link}
//                 className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 border border-gray-100"
//               >
//                 <div className={`h-2 bg-gradient-to-r ${item.gradient}`}></div>
//                 <div className="p-8">
//                   <div
//                     className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${item.gradient} text-white mb-6 shadow-lg`}
//                   >
//                     <item.icon className="w-8 h-8" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
//                   <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
//                     Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// import { Link } from "react-router-dom";
// import { ArrowRight, Calendar, Users, Trophy, Camera, Star } from "lucide-react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function HomePage() {
//   const heroImages = [
//     "/logoLonge1.jpeg",
//     "/logoLonge2.jpeg",
//     "/logoLonge3.jpeg",
//     "/logoLonge4.jpeg",
//   ];

//   const winners = [
//     { name: "Alice Johnson", prize: "1st Place", image: "/winner1.jpg" },
//     { name: "Bob Smith", prize: "2nd Place", image: "/winner2.jpg" },
//     { name: "Carol Lee", prize: "3rd Place", image: "/winner3.jpg" },
//     { name: "David Kim", prize: "Special Award", image: "/winner4.jpg" },
//   ];

//   const galleryImages = [
//    "/logoLonge1.jpeg",
//     "/logoLonge2.jpeg",
//     "/logoLonge3.jpeg",
//     "/logoLonge4.jpeg",
//   ];

// const heroSliderSettings = {
//   dots: false,
//   infinite: true,
//   speed: 800, // sliding speed
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 4000,
//   arrows: true,  // show arrows for left/right scroll
//   fade: false,   // turn off fade for left/right slide
//   cssEase: "ease-in-out",
// };

//   const gallerySliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: true,
//   };

//   return (
//     <div className="min-h-screen relative">
//       {/* Hero Section */}

//       <div className="relative min-h-screen">

// <div className="relative w-full max-w-5xl mx-auto mt-20">
//   <Slider {...heroSliderSettings} className="relative z-10">
//     {heroImages.map((img, index) => (
//       <div
//         key={index}
//         className="relative w-full overflow-hidden rounded-2xl px-2"
//       >
//         <img
//           src={img}
//           alt={`Slide ${index + 1}`}
//           className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
//         />
//       </div>
//     ))}
//   </Slider>

//   {/* Overlay dark layer */}
//   <div className="absolute inset-0 bg-black/30 z-0 rounded-2xl"></div>

//   {/* Hero Text & Buttons */}
//   <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
//     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//       <a
//         href="/programs"
//         className="bg-white text-primary px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 flex items-center justify-center"
//       >
//         Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
//       </a>
//       <a
//         href="/gallery"
//         className="border-2 border-white text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
//       >
//         View Gallery
//       </a>
//     </div>
//   </div>
// </div>

//       </div>

//       {/* Stats Section */}
//       <section className="py-16 bg-muted">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { icon: Users, number: "200+", label: "Participants" },
//               { icon: Calendar, number: "130+", label: "Events" },
//               { icon: Trophy, number: "50+", label: "Winners" },
//               { icon: Camera, number: "1000+", label: "Memories" },
//             ].map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <div
//                   key={index}
//                   className="text-center animate-rotate-in"
//                   style={{ animationDelay: `${index * 150}ms` }}
//                 >
//                   <Icon className="w-12 h-12 mx-auto mb-4 text-primary animate-festival-bounce" />
//                   <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
//                   <div className="text-muted-foreground">{stat.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Winners Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-4xl font-bold text-center mb-12 festival-text-gradient">Our Winners</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {winners.map((winner, index) => (
//               <div key={index} className="text-center p-4 rounded-xl shadow hover:shadow-2xl transition-all">
//                 <img
//                   src={winner.image}
//                   alt={winner.name}
//                   className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
//                 />
//                 <h3 className="text-xl font-bold">{winner.name}</h3>
//                 <p className="text-gray-600">{winner.prize}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-gray-100">
//   <div className="max-w-6xl mx-auto px-4">
//     <h2 className="text-4xl font-bold text-center mb-12 festival-text-gradient">
//       Gallery Highlights
//     </h2>
//     <Slider {...gallerySliderSettings}>
//       {galleryImages.map((img, index) => (
//         <div
//           key={index}
//           className="w-full h-80 md:h-96 lg:h-112 p-2"
//         >
//           <img
//             src={img}
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-fit rounded-2xl shadow-lg"
//           />
//         </div>
//       ))}
//     </Slider>
//   </div>
// </section>

//       {/* Discover Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//               Discover <span className="festival-text-gradient">UMMATHEE</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Explore our diverse range of programs, view stunning galleries, and be part of our artistic journey
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Programs",
//                 description: "130+ diverse programs across onstage and offstage categories",
//                 link: "/programs",
//                 icon: Calendar,
//                 color: "from-green-500 to-lime-500",
//               },
//               {
//                 title: "Gallery",
//                 description: "Stunning visual memories from our festival celebrations",
//                 link: "/gallery",
//                 icon: Star,
//                 color: "from-lime-500 to-yellow-500",
//               },
//               {
//                 title: "Results",
//                 description: "Celebrate our winners and their outstanding achievements",
//                 link: "/results",
//                 icon: Trophy,
//                 color: "from-yellow-500 to-orange-500",
//               },
//             ].map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.link}
//                 className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
//               >
//                 <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
//                 <div className="p-8">
//                   <div
//                     className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white mb-6`}
//                   >
//                     <item.icon className="w-6 h-6" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">{item.description}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// import { Link } from "react-router-dom";
// import {
//   // ArrowRight,
//   Calendar,
//   Users,
//   Trophy,
//   Camera,
//   Star,
// } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       {/* <section
//         className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
//         style={{ backgroundImage: "url('/logoLonge.jpeg')" }}
//       >
//         <div className="absolute inset-0 bg-black/40"></div>

//         <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

//           <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right delay-450">
//             <a
//               href="/programs"
//               className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 flex items-center justify-center"
//             >
//               Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
//             </a>
//             <a
//               href="/gallery"
//               className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
//             >
//               View Gallery
//             </a>
//           </div>
//         </div>
//       </section> */}

//       <section className="py-16 bg-muted">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { icon: Users, number: "200+", label: "Participants" },
//               { icon: Calendar, number: "130+", label: "Events" },
//               { icon: Trophy, number: "50+", label: "Winners" },
//               { icon: Camera, number: "1000+", label: "Memories" },
//             ].map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <div
//                   key={index}
//                   className="text-center animate-rotate-in"
//                   style={{ animationDelay: `${index * 150}ms` }}
//                 >
//                   <Icon className="w-12 h-12 mx-auto mb-4 text-primary animate-festival-bounce" />
//                   <div className="text-3xl font-bold text-primary mb-2">
//                     {stat.number}
//                   </div>
//                   <div className="text-muted-foreground">{stat.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//               Discover <span className="festival-text-gradient">UMMATHEE</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Explore our diverse range of programs, view stunning galleries,
//               and be part of our artistic journey
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Programs",
//                 description:
//                   "130+ diverse programs across onstage and offstage categories",
//                 link: "/programs",
//                 icon: Calendar,
//                 color: "from-green-500 to-lime-500",
//               },
//               {
//                 title: "Gallery",
//                 description:
//                   "Stunning visual memories from our festival celebrations",
//                 link: "/gallery",
//                 icon: Star,
//                 color: "from-lime-500 to-yellow-500",
//               },
//               {
//                 title: "Results",
//                 description:
//                   "Celebrate our winners and their outstanding achievements",
//                 link: "/results",
//                 icon: Trophy,
//                 color: "from-yellow-500 to-orange-500",
//               },
//             ].map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.link}
//                 className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
//               >
//                 <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
//                 <div className="p-8">
//                   <div
//                     className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white mb-6`}
//                   >
//                     <item.icon className="w-6 h-6" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import {
//   Play,
//   Calendar,
//   Users,
//   Trophy,
//   ArrowRight,
//   Star,
//   // Sparkles,
//   ChevronLeft,
//   ChevronRight,
//   Award,
//   Music,
//   Palette,
//   Camera,
// } from "lucide-react"

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isVisible, setIsVisible] = useState(false)
//   const [currentCarouselSlide, setCurrentCarouselSlide] = useState(0)

//   useEffect(() => {
//     setIsVisible(true)
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % 3)
//     }, 5000)
//     return () => clearInterval(timer)
//   }, [])

//   const featuredPrograms = [
//     {
//       id: 1,
//       title: "Classical Music Concert",
//       category: "Onstage",
//       description: "Experience the beauty of classical compositions performed by talented musicians",
//       image: "/classical-music-concert-performance.png",
//       participants: "25+",
//       duration: "2 hours",
//       icon: Music,
//       gradient: "from-purple-500 to-pink-500",
//     },
//     {
//       id: 2,
//       title: "Art Exhibition",
//       category: "Offstage",
//       description: "Discover stunning artworks created by our creative community",
//       image: "/art-gallery-exhibition-paintings.png",
//       participants: "50+",
//       duration: "All Day",
//       icon: Palette,
//       gradient: "from-blue-500 to-cyan-500",
//     },
//     {
//       id: 3,
//       title: "Dance Performance",
//       category: "Onstage",
//       description: "Witness mesmerizing dance performances from various cultural traditions",
//       image: "/traditional-cultural-dance-performance.png",
//       participants: "30+",
//       duration: "1.5 hours",
//       icon: Star,
//       gradient: "from-green-500 to-lime-500",
//     },
//     {
//       id: 4,
//       title: "Photography Contest",
//       category: "Offstage",
//       description: "Capture moments and compete in our annual photography competition",
//       image: "/photography-contest-exhibition.png",
//       participants: "100+",
//       duration: "Submission Based",
//       icon: Camera,
//       gradient: "from-orange-500 to-red-500",
//     },
//     {
//       id: 5,
//       title: "Drama Competition",
//       category: "Onstage",
//       description: "Theatrical performances that bring stories to life on stage",
//       image: "/theatrical-drama-stage-performance.png",
//       participants: "40+",
//       duration: "3 hours",
//       icon: Award,
//       gradient: "from-indigo-500 to-purple-500",
//     },
//   ]

//   const nextCarouselSlide = () => {
//     setCurrentCarouselSlide((prev) => (prev + 1) % Math.ceil(featuredPrograms.length / 3))
//   }

//   const prevCarouselSlide = () => {
//     setCurrentCarouselSlide(
//       (prev) => (prev - 1 + Math.ceil(featuredPrograms.length / 3)) % Math.ceil(featuredPrograms.length / 3),
//     )
//   }

//   useEffect(() => {
//     const carouselTimer = setInterval(() => {
//       nextCarouselSlide()
//     }, 4000)
//     return () => clearInterval(carouselTimer)
//   }, [])

//   const heroSlides = [
//     {
//       title: "UMMATHEE 2024",
//       subtitle: "Arts Festival Extraordinaire",
//       description: "Where creativity meets culture in a spectacular celebration of artistic excellence",
//       image: "logoLonge1.jpeg",
//     },
//     {
//       title: "130+ Programs",
//       subtitle: "Endless Opportunities",
//       description: "From classical performances to modern art exhibitions, discover your passion",
//       image: "logoLonge2.jpeg",
//     },
//     {
//       title: "Join the Celebration",
//       subtitle: "Be Part of Something Amazing",
//       description: "Experience the magic of arts, culture, and community coming together",
//       image: "logoLonge3.jpeg",
//     },
//     {
//       title: "Join the Celebration",
//       subtitle: "Be Part of Something Amazing",
//       description: "Experience the magic of arts, culture, and community coming together",
//       image: "logoLonge4.jpeg",
//     },
//   ]

//   const stats = [
//     { icon: Calendar, number: "7", label: "Days of Festival", color: "text-green-500" },
//     { icon: Users, number: "2000+", label: "Participants", color: "text-lime-500" },
//     { icon: Trophy, number: "130+", label: "Programs", color: "text-yellow-500" },
//     { icon: Star, number: "50+", label: "Winners", color: "text-orange-500" },
//   ]

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         {/* Background Slides */}
//         <div className="absolute inset-0">
//           {heroSlides.map((slide, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-1000 ${
//                 index === currentSlide ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               {/* <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-lime-900/80 z-10"></div> */}
//               <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
//             </div>
//           ))}
//         </div>

//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 z-20">
//           <div className="absolute top-20 left-20 w-32 h-32 bg-lime-400/20 rounded-full animate-pulse-glow"></div>
//           <div className="absolute bottom-32 right-32 w-24 h-24 bg-green-400/20 rounded-full animate-festival-bounce"></div>
//           <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400/20 rounded-full animate-rotate-in"></div>
//         </div>

//         {/* Hero Content */}
//         <div
//           className={`relative z-30 text-center text-white max-w-4xl mx-auto px-4 transform transition-all duration-1000 ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//           }`}
//         >
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Link
//               to="/programs"
//               className="group bg-gradient-to-r from-green-500 to-lime-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center"
//             >
//               Explore Programs
//               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//             </Link>

//             <button className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center">
//               <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
//               Watch Highlights
//             </button>
//           </div>
//         </div>

//         {/* Slide Indicators */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentSlide ? "bg-lime-400 scale-125" : "bg-white/50 hover:bg-white/75"
//               }`}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 bg-gradient-to-r from-green-50 to-lime-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className={`text-center group hover:scale-105 transition-transform duration-300 animate-slide-in-right`}
//                 style={{ animationDelay: `${index * 200}ms` }}
//               >
//                 <div
//                   className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300 ${stat.color}`}
//                 >
//                   <stat.icon className="w-8 h-8" />
//                 </div>
//                 <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
//                 <div className="text-gray-600 font-medium">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-lime-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               Featured <span className="text-lime-400">Programs</span>
//             </h2>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               Discover some of our most exciting and popular programs this year
//             </p>
//           </div>

//           {/* Carousel Container */}
//           <div className="relative">
//             {/* Navigation Buttons */}
//             <button
//               onClick={prevCarouselSlide}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>

//             <button
//               onClick={nextCarouselSlide}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>

//             {/* Carousel Content */}
//             <div className="overflow-hidden mx-12">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${currentCarouselSlide * 100}%)` }}
//               >
//                 {Array.from({ length: Math.ceil(featuredPrograms.length / 3) }).map((_, slideIndex) => (
//                   <div key={slideIndex} className="w-full flex-shrink-0">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                       {featuredPrograms.slice(slideIndex * 3, slideIndex * 3 + 3).map((program) => (
//                         <div
//                           key={program.id}
//                           className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//                         >
//                           {/* Program Image */}
//                           <div className="relative h-48 overflow-hidden">
//                             <img
//                               src={program.image || "/placeholder.svg"}
//                               alt={program.title}
//                               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                             />
//                             <div
//                               className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${program.gradient}`}
//                             >
//                               {program.category}
//                             </div>
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//                           </div>

//                           {/* Program Content */}
//                           <div className="p-6">
//                             <div className="flex items-center mb-3">
//                               <div className={`p-2 rounded-lg bg-gradient-to-r ${program.gradient} mr-3`}>
//                                 <program.icon className="w-5 h-5 text-white" />
//                               </div>
//                               <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors duration-300">
//                                 {program.title}
//                               </h3>
//                             </div>

//                             <p className="text-gray-300 mb-4 leading-relaxed">{program.description}</p>

//                             <div className="flex justify-between items-center text-sm text-gray-400">
//                               <span className="flex items-center">
//                                 <Users className="w-4 h-4 mr-1" />
//                                 {program.participants}
//                               </span>
//                               <span className="flex items-center">
//                                 <Calendar className="w-4 h-4 mr-1" />
//                                 {program.duration}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Carousel Indicators */}
//             <div className="flex justify-center mt-8 space-x-2">
//               {Array.from({ length: Math.ceil(featuredPrograms.length / 3) }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentCarouselSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === currentCarouselSlide ? "bg-lime-400 scale-125" : "bg-white/30 hover:bg-white/50"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Quick Links Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//               Discover <span className="festival-text-gradient">UMMATHEE</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Explore our diverse range of programs, view stunning galleries, and be part of our artistic journey
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Programs",
//                 description: "130+ diverse programs across onstage and offstage categories",
//                 link: "/programs",
//                 icon: Calendar,
//                 color: "from-green-500 to-lime-500",
//               },
//               {
//                 title: "Gallery",
//                 description: "Stunning visual memories from our festival celebrations",
//                 link: "/gallery",
//                 icon: Star,
//                 color: "from-lime-500 to-yellow-500",
//               },
//               {
//                 title: "Results",
//                 description: "Celebrate our winners and their outstanding achievements",
//                 link: "/results",
//                 icon: Trophy,
//                 color: "from-yellow-500 to-orange-500",
//               },
//             ].map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.link}
//                 className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
//               >
//                 <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
//                 <div className="p-8">
//                   <div
//                     className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white mb-6`}
//                   >
//                     <item.icon className="w-6 h-6" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">{item.description}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Home
