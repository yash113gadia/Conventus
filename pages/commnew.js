import { useState } from 'react'
import Image from 'next/legacy/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import ConventusChatbot from '@/components/ConventusChatBot'
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '../components/Footer'

const CommitteeCard = ({ logo, title, description, objectives, onClick }) => (
  <motion.div
 className="bg-white overflow-hidden cursor-pointer transition-all duration-300"
    onClick={onClick}
  >
    <div className="relative h-48 w-full">
      <Image
        src={logo || "/placeholder.svg"}
        alt={title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-red-800 text-xl font-semibold mb-2">{title}</h3>
      <p className="text-red-600 text-sm mb-3">{description.slice(0, 100)}...</p>
      {objectives && (
        <div className="text-red-500 text-sm">
          <p className="font-medium mb-1">Agenda:</p>
          <ul className="list-disc list-inside">
            {objectives.slice(0, 2).map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </motion.div>
)

const CommitteeDetails = ({ committee, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 z-50 overflow-y-auto p-4"
  >
    <div className="max-w-2xl mx-auto relative bg-white p-6 rounded-lg mt-20">
      <button
        className="absolute top-4 right-4 text-red-600 hover:text-red-800"
        onClick={onClose}
      >
        <X size={24} />
      </button>
      <div className="text-center">
        <Image
          src={committee.logo || "/placeholder.svg"}
          alt={committee.title}
          width={100}
          height={100}
          className="mx-auto mb-4 rounded-full"
        />
        <h2 className="text-2xl font-bold text-red-800 mb-4">{committee.title}</h2>
        <p className="text-md text-red-700 mb-4">{committee.description}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-red-800 mb-2">Agenda</h3>
        <ul className="list-disc list-inside text-red-700">
          {committee.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-red-800 mb-2">Expected Outcomes</h3>
        <p className="text-md text-red-700">{committee.expectedOutcomes}</p>
      </div>
    </div>
  </motion.div>
)

export default function CommitteesPage() {
  const [selectedCommittee, setSelectedCommittee] = useState(null)

  const UNCommittees = [
    {
      logo: "/images/unsc_bg.jpg",
      title: "United Nations Security Council",
      description: "The United Nations Security Council (UNSC) in Model United Nations (MUN) holds primary responsibility for maintaining international peace and security, reflecting the global commitment to address threats to peace.",
      objectives: [
        "Address threats to international peace", 
        "Authorize peacekeeping operations",
        "Recommend solutions to international conflicts"
      ],
      expectedOutcomes: "Delegates will simulate crisis scenarios and collaboratively draft resolutions aimed at preserving global peace and security, developing actionable strategies to confront contemporary security threats and promoting diplomatic dialogue in an increasingly complex international landscape."
    },
    {
      logo: "/images/unhrc_bg.jpg",
      title: "United Nations Human Rights Council",
      description: "The United Nations Human Rights Council (UNHRC) in Model United Nations (MUN) is dedicated to promoting and protecting human rights globally, addressing urgent violations and fostering international cooperation",
      objectives: [
        "Address urgent human rights violations", 
        "Promote universal respect for human rights",
        "Enhance international cooperation in protecting human rights"
      ],
      expectedOutcomes: "Delegates will draft resolutions and action plans aimed at rectifying human rights abuses, establishing preventive measures, and promoting global justice and human rights standards.",
    },
  ]

  const IndianComittees = [
    {
      logo: "/images/aippm_bg.png",
      title: "AIPPM",
      description: "The All India Political Parties Meet (AIPPM) in Model United Nations (MUN) simulates India's dynamic political landscape, where representatives from various political parties debate and negotiate on key national issues.",
      objectives: [
        "Simulate India's domestic political environment",
        "Debate critical national issues",  
        "Encourage political collaboration"
      ],
      expectedOutcomes: "Delegates will form alliances, craft policies, and defend their party's stance, echoing the real-life political discourse in India, while proposing practical solutions to address regional and national challenges."
    },
  ]

  const InternationalPress = [
    {
      logo: "/images/uip.jpeg",
      title: "Journalism",
      description: "The Journalists Committee serves as the storytellers of the International Press, observing debates across various committees and capturing the essence of discussions.",
      objectives: [
        "Report on committee proceedings",
        "Write analytical articles",
        "Document conference developments"
      ],
      expectedOutcomes: "Journalists will deliver well-crafted articles, showcasing their analytical skills and ability to communicate the significance of committee proceedings."
    },
    {
      logo: "/images/uip.jpeg",
      title: "Photography",
      description: "The Photographers Committee captures the energy and spontaneity of the conference, immortalizing key moments through powerful visuals.",
      objectives: [
        "Capture key conference moments",
        "Create visual documentation",
        "Build event portfolio"
      ],
      expectedOutcomes: "Photographers will produce a visual collection that conveys the essence of the MUN, showcasing the passion and deliberation of the participants."
    },
    {
      logo: "/images/uip.jpeg",
      title: "Videography",
      description: "The Videography Committee provides a unique artistic commentary on debates, using satire and creativity to illustrate the intensity of discussions.",
      objectives: [
        "Create satirical illustrations",
        "Capture debate highlights",
        "Provide artistic perspective"
      ],
      expectedOutcomes: "Videographists will produce visually engaging illustrations that capture the essence of debates, offering a humorous and thought-provoking perspective."
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header theme="red" />
      <main className="flex-grow mt-20 container mx-auto px-4 py-12">
        <SectionHeading
          eyebrow="The Agenda"
          title="Committees"
          subtitle="Explore our diverse range of committees addressing crucial global issues."
        />

        <h2 className="font-serif-display text-3xl font-semibold text-center mb-8 text-ink">
          UN Committees
        </h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {UNCommittees.map((committee, index) => (
              <CommitteeCard
                key={index}
                {...committee}
                onClick={() => setSelectedCommittee(committee)}
              />
            ))}
          </div>
        </div>

        <h2 className="font-serif-display text-3xl font-semibold text-center mt-16 mb-8 text-ink">
          Indian Committees
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 justify-items-center">
            {IndianComittees.map((committee, index) => (
              <CommitteeCard
                key={index}
                {...committee}
                onClick={() => setSelectedCommittee(committee)}
              />
            ))}
          </div>
        </div>

        <h2 className="font-serif-display text-3xl font-semibold text-center mt-16 mb-8 text-ink">
          International Press
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {InternationalPress.map((committee, index) => (
              <CommitteeCard
                key={index}
                {...committee}
                onClick={() => setSelectedCommittee(committee)}
              />
            ))}
          </div>
        </div>

        {/* Beautiful premium consolidated CTA banner card */}
        <section className="my-16 max-w-4xl mx-auto px-4">
          <motion.div
 className="relative overflow-hidden border border-red-800/20 bg-primaryr p-8 md:p-12 text-center text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(170,23,44,0.15),transparent)] pointer-events-none" />
            
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-yellow-400 tracking-wide text-">
              CMUN CONNECT: SESSION CONCLUDED
            </h3>
            
            <p className="text-red-100/90 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Revisit the committees, closing communiqué, and conference gallery from CMUN Connect.
            </p>
            
            <div className="flex justify-center">
              <Link href="/cmun-connect" passHref>
                <motion.button
                  className="px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-red-955 font-bold text-lg rounded-full transition-all duration-300 transform"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  View Conference Recap
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>

        <ConventusChatbot/>
      </main>

      <Footer />

      <AnimatePresence>
        {selectedCommittee && (
          <CommitteeDetails
            committee={selectedCommittee}
            onClose={() => setSelectedCommittee(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
