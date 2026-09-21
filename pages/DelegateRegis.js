import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Building, X, Link, Upload, FileUp, Search, Download, Eye, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const Modal = ({ isOpen, onClose, message, isError }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative border-4 border-red-600"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 15 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            <X size={24} />
                        </button>
                        <h2 className={`text-2xl font-bold mb-4 ${isError ? 'text-red-600' : 'text-green-600'}`}>
                            {isError ? 'Error' : 'Welcome to the NIET MUN 2.0'}
                        </h2>
                        <p className="text-gray-700">{message}</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
const ContactPerson = ({ name, title, phone, email }) => (
    <motion.div
        className="bg-gray-50 rounded-lg p-4 text-center shadow-sm transition-shadow duration-300"
        transition={{ duration: 0.3 }}
    >
        <h4 className="font-semibold text-lg text-gray-800 mb-2">{name}</h4>
        <p className="text-sm text-red-600 font-medium mb-3">{title}</p>
        <div className="flex items-center justify-center mb-2">
            <Phone className="w-4 h-4 text-red-600 mr-2" />
            <p className="text-sm text-gray-700">{phone}</p>
        </div>
        <div className="flex items-center justify-center">
            <Mail className="w-4 h-4 text-red-600 mr-2" />
            <p className="text-sm text-gray-700">{email}</p>
        </div>
    </motion.div>
);
const DelegateRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        institute: '',
        branch: '',
        section: '',
        year: '',
        erp: '',
        officialEmail: '',
        transactionNumber: '',
        referralId: '',
        participationType: '',
        committeePreference1: '',
        portfolioPreference1: '',
        committeePreference2: '',
        portfolioPreference2: '',
        committeePreference3: '',
        portfolioPreference3: '',
        instituteCustom: '',
        paymentScreenshot: null
    });

    const handleMatrixDownload = (url) => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = ''; // This will use the default filename from the server
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const fileInputRef = useRef(null);

    const [branchOpen, setBranchOpen] = useState(false);
    const [sectionOpen, setSectionOpen] = useState(false);
    const [branchSearch, setBranchSearch] = useState('');
    const [sectionSearch, setSectionSearch] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const branchRef = useRef(null);
    const sectionRef = useRef(null);

    const branchOptions = [
        "ECE", "CSBS", "CSE", "CSE(TWIN)", "CSE-R", "AI", "AI(TWIN)", "DS", "CYS",
        "ME", "CS", "IT", "IT(TWIN)", "AIML", "AIML(TWIN)", "BIOTECH", "MTECH", "IOT", "B. Pharma", "MBA", "MCA", "PGDM"
    ];
    const sectionOptions = ["A", "B", "C", "D", "E", "F", "G", "H"];

    const committeeOptions = ['UNSC', 'UNHRC', 'AIPPM'];
    const ipPortfolioOptions = ['Journalist', 'Photographer', 'Videographer'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (branchRef.current && !branchRef.current.contains(event.target)) {
                setBranchOpen(false);
            }
            if (sectionRef.current && !sectionRef.current.contains(event.target)) {
                setSectionOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getAvailableCommittees = (preferenceNumber) => {
        const selectedCommittees = [
            formData.committeePreference1,
            formData.committeePreference2,
            formData.committeePreference3,
        ].filter((committee, index) => index !== preferenceNumber - 1);

        return committeeOptions.filter(committee => !selectedCommittees.includes(committee));
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => {
                const newData = {
                    ...prev,
                    [name]: value
                };

                // Reset preferences when participation type changes
                if (name === 'participationType') {
                    newData.committeePreference1 = '';
                    newData.portfolioPreference1 = '';
                    newData.committeePreference2 = '';
                    newData.portfolioPreference2 = '';
                    newData.committeePreference3 = '';
                    newData.portfolioPreference3 = '';
                }

                // Reset portfolio when committee changes
                if (name.startsWith('committeePreference')) {
                    const portfolioField = `portfolioPreference${name.slice(-1)}`;
                    newData[portfolioField] = '';
                }

                return newData;
            });
        }
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setModalMessage('Please enter your name.');
            setIsError(true);
            setModalOpen(true);
            return false;
        }
        if (!formData.email.trim()) {
            setModalMessage('Please enter your email.');
            setIsError(true);
            setModalOpen(true);
            return false;
        }
        if (!formData.phone.trim()) {
            setModalMessage('Please enter your phone number.');
            setIsError(true);
            setModalOpen(true);
            return false;
        }
        if (!formData.institute) {
            setModalMessage('Please select your institute.');
            setIsError(true);
            setModalOpen(true);
            return false;
        }
        if (formData.institute === 'NIET') {
            if (!formData.branch || !formData.section || !formData.year || !formData.erp || !formData.officialEmail) {
                setModalMessage('Please fill in all NIET-specific details.');
                setIsError(true);
                setModalOpen(true);
                return false;
            }
        } else if (!formData.instituteCustom) {
            setModalMessage('Please enter your institute name.');
            setIsError(true);
            setModalOpen(true);
            return false;
        }
        if (!formData.transactionNumber) {
            setModalMessage('Please enter transaction number.');
            setIsError(true);
            setModalOpen(true);
            return false;
        }

        // Different validation for IP and Delegate
        if (formData.participationType === 'IP') {
            if (!formData.portfolioPreference1) {
                setModalMessage('Please select your IP portfolio preference.');
                setIsError(true);
                setModalOpen(true);
                return false;
            }
        } else if (formData.participationType === 'Delegate') {
            if (!formData.committeePreference1 || !formData.portfolioPreference1) {
                setModalMessage('Please fill in your first committee and portfolio preference.');
                setIsError(true);
                setModalOpen(true);
                return false;
            }
        }

        if (!formData.paymentScreenshot) {
            setModalMessage('Please upload payment screenshot.');
            setIsError(true);
            setModalOpen(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a copy of the form data
        let submissionData = { ...formData };

        // If participation type is IP, set delegate-specific fields to "N/A"
        if (formData.participationType === 'IP') {
            submissionData = {
                ...submissionData,
                committeePreference1: 'N/A',
                committeePreference2: 'N/A',
                committeePreference3: 'N/A',
                portfolioPreference2: 'N/A',
                portfolioPreference3: 'N/A'
            };
        }

        if (!validateForm()) {
            console.log("Form validation failed");
            return;
        }

        setLoading(true);
        const formDataToSend = new FormData();

        // Add all fields to FormData
        Object.keys(submissionData).forEach(key => {
            console.log(`${key}:`, submissionData[key]);
            formDataToSend.append(key, submissionData[key]);
        });

        try {
            console.log("Sending request to backend...");
            const response = await fetch('https://conventus.pythonanywhere.com/api/delegate-registration/', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();
            console.log("Response from backend:", data);

            if (response.ok) {
                setModalMessage('Registration completed successfully!');
                setIsError(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    institute: '',
                    branch: '',
                    section: '',
                    year: '',
                    erp: '',
                    officialEmail: '',
                    transactionNumber: '',
                    referralId: '',
                    participationType: '',
                    committeePreference1: '',
                    portfolioPreference1: '',
                    committeePreference2: '',
                    portfolioPreference2: '',
                    committeePreference3: '',
                    portfolioPreference3: '',
                    instituteCustom: '',
                    paymentScreenshot: null
                });
            } else {
                console.log("Registration failed:", data);
                setModalMessage(data.message || 'Registration failed. Please try again.');
                setIsError(true);
            }
        } catch (err) {
            console.error("Submission error:", err);
            setModalMessage('An error occurred while submitting the form. Please try again.');
            setIsError(true);
        } finally {
            setLoading(false);
            setModalOpen(true);
        }
    };



    return (

        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg p-8 mb-16 text-center max-w-4xl w-full">
                <h2 className="text-4xl font-bold text-center mb-8 text-red-600">
                    Delegate Registration
                </h2>

                <div className="mb-6">
                    {/* <p className="text-gray-700 mb-4 text-justify">Registration fee for NIET Delegates: Rs 499</p>
                    <p className="text-gray-700 mb-4 text-justify">Registration Fee for Outside Delegates: Rs 599</p>
                    <p className="text-gray-700 mb-4 text-justify">Note: The registration fee is non-refundable</p> */}
                    <h3 className="text-xl font-semibold mb-4">Committees & Agendas</h3>

                    <h5 className="text-xl font-semibold mb-2">United Nations Security Council</h5>
                    <p className="text-gray-700 mb-4 text-justify">Addressing Security Crises and Regional Instability in Middle East while promoting reconstruction Governance and peace negotiations among key stakeholders.</p>
                    <div className="mb-4 flex items-center justify-center space-x-4">
                        <button
                            // onClick={() => handleMatrixDownload('/Matrix/United Nations Security Council.xlsx')}
                            onClick={() => window.open('https://docs.google.com/spreadsheets/d/143eDDNCPQHaGE-jOL5oBKuZIGTFNt2uB/edit?usp=drivesdk&ouid=105922611711816574457&rtpof=true&sd=true', '_blank')}

                            className="flex items-center text-red-600 hover:text-red-700"
                        >
                            <Eye className="mr-2" size={20} />
                            View Matrix
                        </button>

                    </div>
                    <h5 className="text-xl font-semibold mb-2">United Nations Human Rights Council</h5>
                    <p className="text-gray-700 mb-4 text-justify">Rights of Refugees and Asylum Seekers Amidst Global Migration Crises: Balancing sovereignty with humanitarian responsibilities.</p>
                    <div className="mb-4 flex items-center justify-center space-x-4">
                        <button
                            onClick={() => window.open('https://docs.google.com/spreadsheets/d/14RhNt0rqxsM_SU8Bcmkpw47sc2R1uKtg/edit?usp=drivesdk&ouid=105922611711816574457&rtpof=true&sd=true', '_blank')}

                            className="flex items-center text-red-600 hover:text-red-700"
                        >
                            <Eye className="mr-2" size={20} />
                            View Matrix
                        </button>
                    </div>
                    <h5 className="text-xl font-semibold mb-2">All India Political Party Meet</h5>
                    <p className="text-gray-700 mb-4 text-justify">One Nation, One Election: Evaluating the feasibility, impact on governance, and democratic implications of simultaneous elections while balancing federalism.</p>
                    <div className="mb-4 flex items-center justify-center space-x-4">
                        <button
                            // onClick={() => handleMatrixDownload('/Matrix/All India Political Party Meet.xlsx')}
                            onClick={() => window.open('https://docs.google.com/spreadsheets/d/1v24pWSGc2l_dpdxBVMlfY6X5oo2Bx9T6/edit?usp=drivesdk&ouid=105922611711816574457&rtpof=true&sd=true', '_blank')}
                            className="flex items-center text-red-600 hover:text-red-700"
                        >
                            <Eye className="mr-2" size={20} />
                            View Matrix
                        </button>
                    </div>
                    <h5 className="text-xl font-semibold mb-2">IP</h5>
                    <p className="text-gray-700 mb-4 text-justify">It will consist of Journalists, Photographers and Videographers</p>


                    {/* <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-bold mb-2">
                            <Link className="inline-block mr-2 text-red-600" size={18} />
                            Link
                        </label>
                        <a
                        href="YOUR_MATRIX_URL"
                        target="_blank"
                        rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-700 underline"
                        >
                            View Link
                        </a>
                    </div> */}
                </div>

                {/* <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-bold mb-2">
                            <Link className="inline-block mr-2 text-red-600" size={18} />
                            Matrix
                            </label>
                            <a
                            href="YOUR_MATRIX_URL"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-700 underline"
                        >
                            View Matrix
                        </a>
                    </div> */}
                <div>
                    {isDisabled && (
                        <div className="flex items-center text-red-500 text-xl font-bold mb-4">
                            <XCircle className="mr-2" />
                            Form Closed
                        </div>
                    )}
                </div>
                <fieldset disabled={isDisabled}>
                    <motion.form
                        className="w-full max-w-3xl mx-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                    <User className="inline-block mr-2 text-red-600" size={18} />
                                    Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                    <Mail className="inline-block mr-2 text-red-600" size={18} />
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                    <Phone className="inline-block mr-2 text-red-600" size={18} />
                                    Mobile Number
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                    <Building className="inline-block mr-2 text-red-600" size={18} />
                                    Institute
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                    name="institute"
                                    value={formData.institute}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Institute</option>
                                    <option value="NIET">NIET</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>

                            {formData.institute && (
                                <div className="md:col-span-2 mt-4">
                                    <div className="flex flex-col items-center space-y-4">
                                        <label className="block text-gray-800 text-sm font-bold">
                                            Payment Details
                                        </label>
                                        {formData.institute === 'NIET' ? (
                                            <div className="flex flex-col items-center space-y-4">
                                                <div className="relative w-48 h-48 border rounded-lg p-2 bg-white">
                                                    <Image
                                                        src="/QR's/NIET deleg.jpg"
                                                        alt="NIET Payment QR"
                                                        fill
                                                        sizes="192px"
                                                        className="object-contain p-2"
                                                    />
                                                </div>
                                                <a
                                                    href="https://rzp.io/rzp/uT97Hix"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-red-600 hover:text-red-700 underline text-sm font-medium"
                                                >
                                                    Payment Link
                                                </a>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center space-y-4">
                                                <div className="relative w-48 h-48 border rounded-lg p-2 bg-white">
                                                    <Image
                                                        src="/QR's/Other Deleg.jpg"
                                                        alt="Other Institute Payment QR"
                                                        fill
                                                        sizes="192px"
                                                        className="object-contain p-2"
                                                    />
                                                </div>
                                                <a
                                                    href="https://rzp.io/rzp/Y8X9IkUk"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-red-600 hover:text-red-700 underline text-sm font-medium"
                                                >
                                                    Payment Link
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {formData.institute === 'NIET' && (
                                <>
                                    <div ref={branchRef} className="relative">
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            <Building className="inline-block mr-2 text-red-600" size={18} />
                                            Branch
                                        </label>
                                        <div
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 cursor-pointer text-center"
                                            onClick={() => setBranchOpen(!branchOpen)}
                                        >
                                            {formData.branch || "Select Branch"}
                                        </div>
                                        {branchOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md">
                                                <div className="flex items-center p-2 border-b">
                                                    <Search className="text-gray-400 mr-2" size={18} />
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        className="w-full focus:outline-none text-center"
                                                        value={branchSearch}
                                                        onChange={(e) => setBranchSearch(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>
                                                <ul className="max-h-60 overflow-auto">
                                                    {branchOptions
                                                        .filter(option => option.toLowerCase().includes(branchSearch.toLowerCase()))
                                                        .map((option, index) => (
                                                            <li
                                                                key={index}
                                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-center"
                                                                onClick={() => {
                                                                    handleChange({ target: { name: 'branch', value: option } });
                                                                    setBranchOpen(false);
                                                                    setBranchSearch('');
                                                                }}
                                                            >
                                                                {option}
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div ref={sectionRef} className="relative">
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            <Building className="inline-block mr-2 text-red-600" size={18} />
                                            Section
                                        </label>
                                        <div
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 cursor-pointer text-center"
                                            onClick={() => setSectionOpen(!sectionOpen)}
                                        >
                                            {formData.section || "Select Section"}
                                        </div>
                                        {sectionOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md">
                                                <div className="flex items-center p-2 border-b">
                                                    <Search className="text-gray-400 mr-2" size={18} />
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        className="w-full focus:outline-none text-center"
                                                        value={sectionSearch}
                                                        onChange={(e) => setSectionSearch(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>
                                                <ul className="max-h-60 overflow-auto">
                                                    {sectionOptions
                                                        .filter(option => option.toLowerCase().includes(sectionSearch.toLowerCase()))
                                                        .map((option, index) => (
                                                            <li
                                                                key={index}
                                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-center"
                                                                onClick={() => {
                                                                    handleChange({ target: { name: 'section', value: option } });
                                                                    setSectionOpen(false);
                                                                    setSectionSearch('');
                                                                }}
                                                            >
                                                                {option}
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            Year
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Year</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            ERP ID
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                            type="text"
                                            name="erp"
                                            value={formData.erp}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            Official Email ID
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                            type="email"
                                            name="officialEmail"
                                            value={formData.officialEmail}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            Payable Amount
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 text-center"
                                            type="text"
                                            value="₹499"
                                            disabled
                                        />
                                    </div>
                                </>
                            )}

                            {formData.institute === 'OTHER' && (
                                <>
                                    <div>
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            Institute Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                            type="text"
                                            name="instituteCustom"
                                            value={formData.instituteCustom}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            Payable Amount
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 text-center"
                                            type="text"
                                            value="₹599"
                                            disabled
                                        />
                                    </div>
                                </>
                            )}

                            {formData.institute && (
                                <div>
                                    <label className="block text-gray-800 text-sm font-bold mb-2">
                                        Transaction Number
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                        type="text"
                                        name="transactionNumber"
                                        value={formData.transactionNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                    Referral ID (Optional)
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                    type="text"
                                    name="referralId"
                                    value={formData.referralId}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                    Participation Type
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                    name="participationType"
                                    value={formData.participationType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Participation Type</option>
                                    <option value="Delegate">Delegate</option>
                                    <option value="IP">IP</option>
                                </select>
                            </div>

                            {formData.participationType === 'Delegate' && (
                                <>
                                    {/* Committee Preference 1 */}
                                    <div>
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            Committee Preference 1
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                            name="committeePreference1"
                                            value={formData.committeePreference1}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Committee</option>
                                            {getAvailableCommittees(1).map((committee) => (
                                                <option key={committee} value={committee}>
                                                    {committee}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {formData.committeePreference1 && (
                                        <div>
                                            <label className="block text-gray-800 text-sm font-bold mb-2">
                                                Portfolio Preference 1
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                                type="text"
                                                name="portfolioPreference1"
                                                value={formData.portfolioPreference1}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    )}

                                    {/* Committee Preference 2 */}
                                    <div>
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            Committee Preference 2
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                            name="committeePreference2"
                                            value={formData.committeePreference2}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Committee</option>
                                            {getAvailableCommittees(2).map((committee) => (
                                                <option key={committee} value={committee}>
                                                    {committee}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {formData.committeePreference2 && (
                                        <div>
                                            <label className="block text-gray-800 text-sm font-bold mb-2">
                                                Portfolio Preference 2
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                                type="text"
                                                name="portfolioPreference2"
                                                value={formData.portfolioPreference2}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    )}

                                    {/* Committee Preference 3 */}
                                    <div>
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            Committee Preference 3
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                            name="committeePreference3"
                                            value={formData.committeePreference3}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Committee</option>
                                            {getAvailableCommittees(3).map((committee) => (
                                                <option key={committee} value={committee}>
                                                    {committee}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {formData.committeePreference3 && (
                                        <div>
                                            <label className="block text-gray-800 text-sm font-bold mb-2">
                                                Portfolio Preference 3
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                                type="text"
                                                name="portfolioPreference3"
                                                value={formData.portfolioPreference3}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            {formData.participationType === 'IP' && (
                                <div>
                                    <label className="block text-gray-800 text-sm font-bold mb-2">
                                        Portfolio Preference
                                    </label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
                                        name="portfolioPreference1"
                                        value={formData.portfolioPreference1}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Portfolio</option>
                                        {ipPortfolioOptions.map((portfolio) => (
                                            <option key={portfolio} value={portfolio}>
                                                {portfolio}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="md:col-span-2">
                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                    <Upload className="inline-block mr-2 text-red-600" size={18} />
                                    Payment Screenshot
                                </label>
                                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-600 transition duration-300">
                                    <div className="space-y-1 text-center">
                                        <FileUp
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="payment-screenshot"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="payment-screenshot"
                                                    name="paymentScreenshot"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={handleChange}
                                                    ref={fileInputRef}
                                                    required
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                        {formData.paymentScreenshot && (
                                            <p className="text-sm text-green-600">
                                                Selected file: {formData.paymentScreenshot.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <motion.button
                                className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform ${loading ? 'opacity-50 cursor-not-allowed' : '' }`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </motion.button>
                        </div>


                        <div className="bg-amber-50 border border-amber-300 mt-8 rounded-lg p-4 mb-6">
                            <div>
                                <div className="text-amber-600 mr-3" size={24} />
                                <div>
                                    <h4 className="font-semibold text-amber-800 mb-1 text-xl">Contact Details</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <ContactPerson
                                            name="Yashraj Ranjan"
                                            title="Vice - President"
                                            phone="+91 7309328195"
                                            email="3rd Year"
                                        />
                                        <ContactPerson
                                            name="Pragya Singh"
                                            title="Vice - President"
                                            phone="+91 9953552547"
                                            email="3rd Year"
                                        />
                                        <ContactPerson
                                            name="Ameya Atreya"
                                            title="USG Delegate Affairs"
                                            phone="+91 84488 35989"
                                            email="2nd Year"
                                        />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.form>
                </fieldset>

                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    message={modalMessage}
                    isError={isError}
                />
            </div>
        </div >

    );
};

export default DelegateRegistrationForm;
