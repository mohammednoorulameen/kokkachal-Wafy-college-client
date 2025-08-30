
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Calendar,
  Users,
  Trophy,
  Camera,
  Star,
  Crown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import userInstance from '@/axios/UserInstance'
// import { jsPDF } from "jspdf";

export default function Home() {
  
   const [latestTeams, setLatestTeams] = useState([]);
  const [latestWinners, setLatestWinners] = useState([]);
    const navigate = useNavigate();
console.log(latestWinners)
console.log('latestTeams', latestTeams)
  

  // Fetch data from APIs
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await userInstance.get("/get-winnig-studets");
        const data =  res.data;
        if (data.success) setLatestWinners(data.data);
      } catch (err) {
        console.error("Failed to fetch winning students:", err);
      }
    };

    const fetchTeams = async () => {
      try {
        const res = await userInstance.get("/get-winning-teams");
        const data =  res.data;
        if (data.success) setLatestTeams(data.data);
      } catch (err) {
        console.error("Failed to fetch winning teams:", err);
      }
    };

    fetchWinners();
    fetchTeams();
  }, []);



  return (
    <div className="min-h-screen bg-[oklch(43.7%_0.078_188.216)] text-white">
  {/* Carousel Section */}
  

  <section className="relative py-8">
  <div className="max-w-7xl mx-auto px-4">
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showArrows={false}  // 🔹 removes manual buttons
      interval={2000}     // slide change speed
      transitionTime={600}
      className="rounded-3xl overflow-hidden shadow-2xl"
    >
      {["logoLonge3.jpeg", "logoLonge4.jpeg"].map((src, idx) => (
        <div key={idx} className="relative h-[500px] md:h-[500px] lg:h-[600px]">
          <img
            src={src}
            alt={`Festival Slide ${idx + 1}`}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center"></div>
        </div>
      ))}
    </Carousel>
  </div>
</section>


  {/* Button Section */}
  <section>
    <div className="flex justify-center gap-x-2">
      {/* <Button 
       onClick={downloadPDF}
      className="bg-transparent border border-white text-white hover:bg-white hover:text-[oklch(43.7%_0.078_188.216)]">
        Download Handbook
      </Button> */}
  <Button
  asChild
  className="bg-transparent border border-white text-white hover:bg-white hover:text-[oklch(43.7%_0.078_188.216)]"
>
  <a href="/2025-26-FEST-MANUAL.pdf" download>
    Download Handbook
  </a>
</Button>

      <Button
        onClick={() => navigate("/gallery")}
        className="bg-transparent border border-white text-white hover:bg-white hover:text-[oklch(43.7%_0.078_188.216)]"
      >
        Explore Gallery
      </Button>
    </div>
  </section>

  {/* Latest Student Winners Section */}
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3">
          <Trophy className="w-12 h-12 text-white" /> Latest Winning Students
        </h2>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          Celebrating individual excellence and outstanding achievements
        </p>
      </div>
      <div className="flex overflow-x-auto scroll-smooth gap-8 pb-4 scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-transparent">
        {latestWinners.map((winner, index) => (
          <div
            key={index}
            className="group bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 border border-white/20 min-w-[300px] p-6"
          >
            <h3 className="text-2xl font-bold mb-2">{winner.name}</h3>
            <p className="opacity-90"><strong>ChessNumber :</strong> {winner.chessNumber}</p>
            <p className="opacity-90"><strong>Group:</strong> {winner.team}</p>
            <p className="opacity-90"><strong>Points:</strong> {winner.points}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

   {/* Latest Winning Teams Section */}
  <section className="py-20">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
          <Crown className="w-12 h-12 text-yellow-300" /> Latest Winning Teams
        </h2>
        <p className="text-xl opacity-90">Congratulations to our most recent team champions!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestTeams.map((team, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center border-l-4 border-yellow-300"
          >
            <h3 className="text-2xl font-bold">{team.teamName}</h3>
            <p className="text-xl mt-2">
              <span className="font-semibold">Score: </span> {team.totalPoints}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Discover KAF Section */}
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Discover <span className="text-yellow-300">KAF 14TH EDITION</span>
        </h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Explore our diverse range of programs, view stunning galleries, and be part of our artistic journey
        </p>
      </div>
      <div className="flex overflow-x-auto scroll-smooth gap-8 pb-4 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
        {[
          { title: "Results", description: "Celebrate winners and their achievements", link: "/results", icon: Trophy },
          { title: "Programs", description: "130+ diverse programs across categories", link: "/programs", icon: Calendar },
          { title: "Gallery", description: "Stunning visual memories", link: "/gallery", icon: Star },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="group bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 min-w-[300px] p-6"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white mb-6">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="opacity-80">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>

  {/* Stats Section */}
  <section className="py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: Users, number: "200+", label: "Participants" },
          { icon: Calendar, number: "130+", label: "Events" },
          { icon: Trophy, number: "50+", label: "Winners" },
          { icon: Camera, number: "1000+", label: "Memories" },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="text-center animate-rotate-in" style={{ animationDelay: `${index * 150}ms` }}>
              <Icon className="w-12 h-12 mx-auto mb-4 text-yellow-300 animate-festival-bounce" />
              <div className="text-3xl font-bold mb-2">{stat.number}</div>
              <div className="opacity-90">{stat.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  </section>

 
</div>
  );
}
