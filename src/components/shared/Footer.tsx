import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";

const sections = [
  {
    title: "Contact",
    items: ["Car Rentals", "Dhaka Bangladesh", "+8801800000000", "carrentals@info.com", { type: "image", src: {}, alt: "logo" }],
  },
  {
    title: "Support",
    items: ["Pricing", "Documentation", "Guides"],
  },
  {
    title: "Quick Links",
    items: ["Search", "About Us", "Contact Us", "Tearms of Service", "Refund Policy"],
  },
];

const items = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Twitch", icon: FaTwitch, link: "https://www.twitch.tv/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/" },
];

const Footer = () => {
  return (
    <div className="w-full mt-5 bg-[#222021] text-gray-300 py-y px-2">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-800 py-8">
        {sections.map((section, index) => (
          <div key={index}>
          <h6 className="font-bold uppercase pt-2">{section.title}</h6>
          <ul>
              {section.items.map((item, i) => (
                <li key={i} className="py-1 text-gray-500 hover:text-[#FEA633] cursor-pointer">
                  {typeof item === 'string' ? (
                    item
                  ) : item.type === 'image' ? (
                    <img src="" alt={item.alt} className="max-w-9 bg-white rounded-full  lg:max-w-14" />
                  ) : null}
                </li>
              ))}
            </ul>
        </div>
        ))}

        <div className="col-span-2 pt-8 md:pt-2">
          <p className="font-bold uppercase hover:text-[#FEA633]">Newsletter</p>
          <p className="py-4">
           Sign up for exclusive offers, original stories, events and more.
          </p>
          <form className="flex flex-col sm:flex-row">
            <Input
              className="w-full p-2 mr-4 rounded-md mb-4"
              type="email"
              placeholder="Enter email.."
            />
            <Button className="p-2 mb-4 cursor-pointer bg-[#FEA633] text-white hover:bg-gray-600">Subscribe </Button>
          </form>
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
        <p className="py-4 hover:text-[#FEA633]">2024 Workflow, LLC. All rights reserved</p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          {items.map((x, index) => {
            return <x.icon key={index} className="hover:text-white cursor-pointer" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;