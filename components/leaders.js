"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin, Github, Instagram, PhoneIcon as WhatsApp } from "lucide-react"

const SocialIcon = ({ href, icon: Icon, color, size = 28 }) => {
    const colorClasses = {
        blue: "text-blue-600 hover:text-blue-800",
        gray: "text-gray-700 hover:text-gray-900",
        pink: "text-pink-600 hover:text-pink-800",
        green: "text-green-600 hover:text-green-800",
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${colorClasses[color]} transition-colors transform transition-transform duration-200`}
        >
            <Icon size={size} />
        </a>
    )
}

const LeadershipCard = ({ name, role, imageUrl, description, socialLinks, isMember = false }) => (
    <motion.div
        className={`w-full flex flex-col items-center ${isMember ? 'max-w-xs sm:max-w-sm' : 'max-w-xs sm:max-w-sm md:max-w-md'}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        {/* Image container */}
 <div className="relative w-full aspect-square overflow-hidden mb-4 transform transition-transform duration-300">
            <Image
                src={imageUrl || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover object-top"
            />
        </div>

        {/* Name, Position, and Social Icons below the image */}
        <div className="w-full text-center px-4">
            <h4 className={`font-bold text-gray-900 mb-2 ${isMember ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>{name}</h4>
            <p className={`text-red-600 font-semibold mb-4 ${isMember ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>{role}</p>
            {description && <p className="text-base md:text-lg text-gray-600 mb-4">{description}</p>}
            
            {/* Social Icons */}
            <div className={`flex justify-center items-center mb-4 ${isMember ? 'space-x-4' : 'space-x-6'}`}>
                {socialLinks.linkedin && <SocialIcon href={socialLinks.linkedin} icon={Linkedin} color="blue" size={isMember ? 24 : 28} />}
                {socialLinks.github && <SocialIcon href={socialLinks.github} icon={Github} color="gray" size={isMember ? 24 : 28} />}
                {socialLinks.instagram && <SocialIcon href={socialLinks.instagram} icon={Instagram} color="pink" size={isMember ? 24 : 28} />}
                {socialLinks.whatsapp && <SocialIcon href={socialLinks.whatsapp} icon={WhatsApp} color="green" size={isMember ? 24 : 28} />}
            </div>
        </div>
    </motion.div>
)

const leadershipTeam = [
    {
        name: "Sarvesh Mishra",
        role: "Technical Head",
        imageUrl: "/images/Sarvesh_Mishra.webp",
        branch: "CSE",
        socialLinks: {
            linkedin: "https://linkedin.com/in/sarveshji",
            github: "https://github.com/SarveshCS",
            instagram: "https://www.instagram.com/sarveshmishra.py",
            whatsapp: "https://wa.me/+919547282935",
        },
    },
    {
        name: "Yash Gadia",
        role: "Technical Co-Head",
        imageUrl: "/images/yash-gadia-home.webp",
        branch: "CSE",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/yashgadia/",
            github: "https://github.com/yash113gadia",
            instagram: "https://www.instagram.com/yash113gadia",
            whatsapp: "https://wa.me/919950094483",
        },
    },
]

const teamMembers = []

const LeadershipPage = () => (
    <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-paper overflow-hidden">
            <div className="container mx-auto px-4 py-12">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-red-700 mb-6"
                >
                    O U R&nbsp;&nbsp;T E C H N I C A L&nbsp;&nbsp;T E A M
                </motion.h3>

                <motion.p
                    className="text-center mb-16 max-w-3xl mx-auto text-gray-700 text-base md:text-lg px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Our dedicated technical team brings a wealth of expertise and innovation to Conventus MUN. With their combined
                    skills in various domains of computer science and information technology, they ensure seamless execution of
                    all technical aspects of our events.
                </motion.p>

                {/* Leadership Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-16"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-4xl mx-auto px-4 justify-items-center">
                        {leadershipTeam.map((leader, index) => (
                            <LeadershipCard key={leader.name} {...leader} />
                        ))}
                    </div>
                </motion.div>

                {/* Team Members Section */}
                {teamMembers.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h4 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
                            Team Members
                        </h4>
                        <div className="flex justify-center px-4">
                            {teamMembers.map((member, index) => (
                                <LeadershipCard key={member.name} {...member} isMember={true} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    </div>
)

export default LeadershipPage
