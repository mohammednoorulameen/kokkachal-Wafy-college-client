// import { Link } from "react-router-dom";
// import { ArrowRight, Sparkles, Calendar, Users, Trophy, Camera,Star } from "lucide-react"

// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       <section
//   className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
//   style={{ backgroundImage: "url('/logoLonge.jpeg')" }}
// >
//   <div className="absolute inset-0 bg-black/40"></div> 

//   <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
//     <div className="animate-festival-bounce">
//       <Sparkles className="w-16 h-16 mx-auto mb-6 text-white animate-pulse-glow" />
//     </div>

//     <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-in-right">
//       UMMATHEE
//     </h1>
//     <p className="text-xl md:text-2xl text-white/90 mb-4 animate-slide-in-right delay-150">
//       Arts Festival 2025-26
//     </p>
//     <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto animate-slide-in-right delay-300">
//       Celebrating creativity, culture, and artistic excellence in our vibrant college community
//     </p>

//     <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right delay-450">
//       <a
//         href="/programs"
//         className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 flex items-center justify-center"
//       >
//         Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
//       </a>
//       <a
//         href="/gallery"
//         className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
//       >
//         View Gallery
//       </a>
//     </div>
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
//               const Icon = stat.icon
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
//               )
//             })}
//           </div>
//         </div>
//       </section>


      
// <section className="py-20 bg-white">
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


import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Calendar, Users, Trophy, Camera, Star } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const heroImages = [
    "/logoLonge1.jpeg",
    "/logoLonge2.jpeg",
    "/logoLonge3.jpeg",
    "/logoLonge4.jpeg",
  ];

  const winners = [
    { name: "Alice Johnson", prize: "1st Place", image: "/winner1.jpg" },
    { name: "Bob Smith", prize: "2nd Place", image: "/winner2.jpg" },
    { name: "Carol Lee", prize: "3rd Place", image: "/winner3.jpg" },
    { name: "David Kim", prize: "Special Award", image: "/winner4.jpg" },
  ];

  const galleryImages = [
   "/logoLonge1.jpeg",
    "/logoLonge2.jpeg",
    "/logoLonge3.jpeg",
    "/logoLonge4.jpeg",
  ];

  const heroSliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
  };

  const gallerySliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <Slider {...heroSliderSettings} className="absolute inset-0 z-0 h-full">
          {heroImages.map((img, index) => (
            <div key={index} className="w-full h-screen">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-screen object-contain"
              />
            </div>
          ))}
        </Slider>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <div className="animate-festival-bounce">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-white animate-pulse-glow" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-in-right">
            UMMATHEE
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 animate-slide-in-right delay-150">
            Arts Festival 2025-26
          </p>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto animate-slide-in-right delay-300">
            Celebrating creativity, culture, and artistic excellence in our vibrant college community
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right delay-450">
            <a
              href="/programs"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/gallery"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
            >
              View Gallery
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
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
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary animate-festival-bounce" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Winners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 festival-text-gradient">Our Winners</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {winners.map((winner, index) => (
              <div key={index} className="text-center p-4 rounded-xl shadow hover:shadow-2xl transition-all">
                <img
                  src={winner.image}
                  alt={winner.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold">{winner.name}</h3>
                <p className="text-gray-600">{winner.prize}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Carousel Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 festival-text-gradient">Gallery Highlights</h2>
          <Slider {...gallerySliderSettings}>
            {galleryImages.map((img, index) => (
              <div key={index} className="w-full h-96 overflow-hidden rounded-xl shadow-lg">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Discover <span className="festival-text-gradient">UMMATHEE</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of programs, view stunning galleries, and be part of our artistic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Programs",
                description: "130+ diverse programs across onstage and offstage categories",
                link: "/programs",
                icon: Calendar,
                color: "from-green-500 to-lime-500",
              },
              {
                title: "Gallery",
                description: "Stunning visual memories from our festival celebrations",
                link: "/gallery",
                icon: Star,
                color: "from-lime-500 to-yellow-500",
              },
              {
                title: "Results",
                description: "Celebrate our winners and their outstanding achievements",
                link: "/results",
                icon: Trophy,
                color: "from-yellow-500 to-orange-500",
              },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                <div className="p-8">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white mb-6`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
