import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Calendar,
  Users,
  Trophy,
  Camera,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import userInstance from '@/axios/UserInstance';

export default function Home() {
  const [latestTeams, setLatestTeams] = useState([]);
  const [latestWinners, setLatestWinners] = useState([]);
  const navigate = useNavigate();

  // Fetch data from APIs
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await userInstance.get("/get-winnig-studets");
        const data = res.data;
        if (data.success) setLatestWinners(data.data);
      } catch (err) {
        console.error("Failed to fetch winning students:", err);
      }
    };

    const fetchTeams = async () => {
      try {
        const res = await userInstance.get("/get-winning-teams");
        const data = res.data;
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
            showArrows={false}
            interval={2000}
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
                <div className="absolute inset-0  flex items-center justify-center"></div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Button Section */}
      <section className="py-6 flex justify-center gap-x-2">
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
      </section>

      {/* Latest Student Winners Section */}
      <section className="py-20 bg-[oklch(43.7%_0.078_188.216)] text-white">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">
      🏆  Notable Stars
    </h2>

    {/* Horizontal scroll on small screens, grid on medium/large */}
    <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-4 md:gap-8 scrollbar-hide pb-4 pt-6">
      {latestWinners.length > 0 ? (
        [...latestWinners]
          .sort((a, b) => b.points - a.points)
          .map((winner, index) => {
            const rank = index + 1;

            let badgeColor =
              rank === 1
                ? "bg-yellow-500 text-black"
                : rank === 2
                ? "bg-gray-400 text-black"
                : rank === 3
                ? "bg-orange-500 text-black"
                : rank === 4
                ? "bg-blue-500 text-white"
                : "bg-white/30 text-white";

            return (
              <div
                key={index}
                className="relative flex-shrink-0 w-64 pt-10 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-center"
              >
                {/* Position Badge */}
                <span
                  className={`absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full font-semibold shadow-md ${badgeColor}`}
                >
                  {rank === 1
                    ? "1st"
                    : rank === 2
                    ? "2nd"
                    : rank === 3
                    ? "3rd"
                    : `${rank}th`}
                </span>

                {/* Winner Details */}
                 <h3 className="text-2xl font-bold mb-2">{winner.name}</h3>
              <p className="opacity-90"><strong>ChessNumber :</strong> {winner.chessNumber}</p>
              <p className="opacity-90"><strong>Group:</strong> {winner.team}</p>
              <p className="opacity-90"><strong>Points:</strong> {winner.points}</p>
            </div>
            );
          })
      ) : (
        <p className="text-center col-span-4 text-white/70">
          No champions available.
        </p>
      )}
    </div>
  </div>
</section>



      {/* Latest Winning Teams Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              👑 Top Teams
            </h2>
            <p className="text-xl opacity-90">Congratulations to our most recent team champions!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestTeams
              .sort((a, b) => b.totalPoints - a.totalPoints)
              .map((team, index) => {
                const rank = index + 1;
                const badgeColor =
                  rank === 1
                    ? "bg-yellow-500 text-black"
                    : rank === 2
                    ? "bg-gray-400 text-black"
                    : rank === 3
                    ? "bg-orange-500 text-black"
                    : "bg-white/30 text-white";

                return (
                  <div
                    key={index}
                    className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center border-l-4 border-yellow-300"
                  >
                    {/* Rank Badge */}
                    <span
                      className={`absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full font-semibold shadow-md ${badgeColor}`}
                    >
                      {rank === 1
                        ? "1st"
                        : rank === 2
                        ? "2nd"
                        : rank === 3
                        ? "3rd"
                        : `${rank}th`}
                    </span>

                    <h3 className="text-2xl font-bold">{team.teamName}</h3>
                    <p className="text-xl mt-2">
                      <span className="font-semibold">Score: </span> {team.totalPoints}
                    </p>
                  </div>
                );
              })}
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
              { icon: Users, number: "100+", label: "Participants" },
              { icon: Calendar, number: "130+", label: "Events" },
              { icon: Trophy, number: "50+", label: "Winners" },
              { icon: Camera, number: "500+", label: "Memories" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-rotate-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <Icon className="w-12 h-12 mx-auto mb-4 text-yellow-300 animate-festival-bounce" />
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="opacity-90">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

