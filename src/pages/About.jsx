import React from "react";
import TopBar from "../components/common/TopBar";
import Logo from "../assets/imgs/etc/logo_salmon.webp";
import LogoBreak from "../assets/imgs/etc/logo_salmon_break.webp";
import SocialMedia from "../assets/imgs/about/social_media.webp";
import Carolina from "../assets/data/users/carolina.webp";
import Gabriel from "../assets/data/users/gabriribeira.webp";
import Ines from "../assets/data/users/ines.webp";
import Lara from "../assets/data/users/lara.webp";
import Leo from "../assets/data/users/leo.webp";
import Nathalia from "../assets/data/users/nathalia.webp";
import Deca from "../assets/imgs/about/deca.webp";

const About = () => {
  return (
    <div>
      <TopBar />
      <div className="flex flex-col">
        <div className="h-[600px] w-full bg-blue flex flex-col items-end justify-end px-12 py-20">
          <img src={Logo} alt="Et.Cetera Logo" className="w-full" referrerPolicy="no-referrer" />
          <p className="text-blue20 leading-none mt-3">
            The household management app that revolutionizes shared-home living{" "}
          </p>
        </div>
        <div className="bg-white flex flex-col justify-center px-6 py-20">
          <h2 className="text-lg text-black">About</h2>
          <p className="text-sm font-light">
            <span className="font-semibold">et.cetera</span> brings together the
            best of e-commerce, task organization, and sustainability, all in
            one place!
          </p>
        </div>
        <div className="bg-black90 px-6 py-20 flex flex-col items-end justify-center">
          <h2 className="font-semibold text-2xl text-salmon leadning-none mt-20">
            we noticed a
          </h2>
          <h1 className="font-bold text-5xl text-salmon leading-none">
            big problem
          </h1>
          <p className="text-white text-end mt-6 pl-10 font-light">
            people that share a household have the problem of a{" "}
            <span className="font-semibold">
              lack of organization and efficiency in managing tasks and using
              resources
            </span>
            , resulting in{" "}
            <span className="font-semibold">
              waste, conflicts and a disorganized environment.
            </span>
          </p>
        </div>
        <div className="bg-white flex flex-col justify-center text-black px-6 py-12 gap-y-6 font-light">
          <p>
            We&apos;ve created a kind of hub for shared households where you can
            create{" "}
            <span className="font-semibold">Collaborative Shopping Lists</span>{" "}
            and detail every single product you need.
          </p>
          <p>
            You can also access{" "}
            <span className="font-semibold">Smart Recommendations</span> and get
            the best deals in the market.
          </p>
        </div>
        <div className="bg-salmon80 flex flex-col justify-center items-end px-6 py-20">
          <img src={LogoBreak} alt="Et.Cetera Logo Break" className="w-full" referrerPolicy="no-referrer" />
          <p className="text-white font-ligth text-lg text-end">
            no more et ceteras at the end of your lists
          </p>
        </div>
        <div className="bg-white flex flex-col justify-center text-black px-6 py-12 gap-y-6 font-light">
          <p>
            Follow a routine of <span className="font-semibold">Tasks</span> so
            that no one is always left to do everything.
          </p>
          <p>
            It has a built-in{" "}
            <span className="font-semibold">Expense Tracker</span> that does all
            the math for you, because nobody wants to be the annoying one who
            keeps charging you...
          </p>
          <p>
            And we couldn&apos;t forget the ecological impact, so there&apos;s a
            section where you can set{" "}
            <span className="font-semibold">Sustainable Goals</span> and earn
            unique achievement badges.
          </p>
        </div>
        <div className="bg-green px-8 py-12 text-black">
          <h1 className="font-normal text-3xl text-center">
            Did you ever <span className="text-white">imagine</span> a world
            where doing household chores or setting sustainable goals could be
            so <span className="font-semibold">easy</span> and{" "}
            <span className="font-semibold">fun</span>?
          </h1>
        </div>
        <div className="bg-white flex flex-col justify-center text-black px-6 py-12 gap-y-6 font-light">
          <p>
            <span className="font-semibold">et.cetera</span> is a platform
            created as part of a CBL project, of the master&apos;s degree in
            Communication and Web Technologies at the University of Aveiro, in
            collaboration with Mindera.
          </p>
          <p>
            The challenge was to reinvent the e-commerce environment,
            integrating sustainable practices and exploring new technologies.
          </p>
          <p>
            With the aim of eliminating redundancies - the &apos;etceras&apos; -
            of people&apos;s lives we created{" "}
            <span className="font-semibold">et.cetera</span>, a household
            management platform.
          </p>
        </div>
        <div className="">
          <img
            src={SocialMedia}
            alt="Et.Cetera Social Media Post"
            className="w-full"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="bg-white flex flex-col justify-center text-black px-6 py-12 gap-y-6 font-light">
          <p>
            By facilitating cooperation,{" "}
            <span className="font-semibold">et.cetera</span> has taken a step
            beyond efficiency. It&apos;s not just a platform; it&apos;s a whole
            new perfect house buddy, conducting tasks, expenses and even
            sustainable goals.
          </p>
        </div>
        <div className="bg-black px-6 pt-12 pb-6 text-white gap-y-6">
          <h2 className="text-xl text-white">The Team</h2>
          <div className="flex flex-col mt-12">
            <div className="border-b-2 border-white/50 flex items-center justify-between py-6">
              <div className="flex flex-col">
                <h3 className="font-medium text-base">Carolina Baptista</h3>
                <p className="text-white/50 font-light">
                  carolina.baptista@ua.pt
                </p>
              </div>
              <img
                src={Carolina}
                alt="Carolina"
                className="w-[80px] h-[80px] rounded-full shrink-0 object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="border-b-2 border-white/50 flex items-center justify-between py-6">
              <div className="flex flex-col">
                <h3 className="font-medium text-base">Gabriel Ribeira</h3>
                <p className="text-white/50 font-light">gmrribeira@ua.pt</p>
              </div>
              <img
                src={Gabriel}
                alt="Gabriel"
                className="w-[80px] h-[80px] rounded-full shrink-0 object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="border-b-2 border-white/50 flex items-center justify-between py-6">
              <div className="flex flex-col">
                <h3 className="font-medium text-base">Inês Sucena</h3>
                <p className="text-white/50 font-light">inesmsucena@ua.pt</p>
              </div>
              <img
                src={Ines}
                alt="Ines"
                className="w-[80px] h-[80px] rounded-full shrink-0 object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="border-b-2 border-white/50 flex items-center justify-between py-6">
              <div className="flex flex-col">
                <h3 className="font-medium text-base">Lara Mendes</h3>
                <p className="text-white/50 font-light">laramendes@ua.pt</p>
              </div>
              <img
                src={Lara}
                alt="Lara"
                className="w-[80px] h-[80px] rounded-full shrink-0 object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="border-b-2 border-white/50 flex items-center justify-between py-6">
              <div className="flex flex-col">
                <h3 className="font-medium text-base">Leonardo Coelho</h3>
                <p className="text-white/50 font-light">leo.coelho@ua.pt</p>
              </div>
              <img
                src={Leo}
                alt="Leo"
                className="w-[80px] h-[80px] rounded-full shrink-0 object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center justify-between py-6">
              <div className="flex flex-col">
                <h3 className="font-medium text-base">Nathalia Magalhães</h3>
                <p className="text-white/50 font-light">nathalia.magalhaes@ua.pt</p>
              </div>
              <img
                src={Nathalia}
                alt="Nathalia"
                className="w-[80px] h-[80px] rounded-full shrink-0 object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
        <div className="bg-white flex items-center justify-center py-20">
            <img src={Logo} alt="Et.Cetera Logo" className="w-[50%]" referrerPolicy="no-referrer" />
        </div>
        <div className="bg-black py-20 flex items-center justify-center">
          <img src={Deca} alt="Deca" className="w-[50%]" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  );
};
export default About;
