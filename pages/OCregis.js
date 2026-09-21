"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { User, Phone, Mail, Building, X, Link, Upload, FileUp, Search, ChevronDown, XCircle } from "lucide-react"

// Configuration constant for registration status
const REGISTRATION_STATUS = {
  IS_OPEN: true, // Set to true to open registration
  CLOSED_MESSAGE: "OC registration has been closed. Thank you for your interest! ",
  CLOSED_NOTICE: "Registration for Organizing Committee is now closed. For any queries, submit them at contact page",
  PAYMENT_DISABLED_TEXT: "Payment submission disabled - Registration closed",
}

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
            transition={{ type: "spring", damping: 15 }}
          >
            <button onClick={onClose} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
              <X size={24} />
            </button>
            <h2 className={`text-2xl font-bold mb-4 ${isError ? "text-red-600" : "text-green-600"}`}>
              {isError ? "Error" : "Success"}
            </h2>
            <p className="text-gray-700">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const OCRegistrationForm = () => {
  const [isRegistrationClosed] = useState(!REGISTRATION_STATUS.IS_OPEN) // Inverted to match the variable name
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    phone: "",
    institute: "NIET",
    transactionNumber: "",
    email: "",
    branch: "",
    section: "",
    areasOfInterest: [],
    agreeToTerms: false,
  })

  const [paymentFile, setPaymentFile] = useState(null)
  const [paymentPreview, setPaymentPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const fileInputRef = useRef(null)
  const [branchOpen, setBranchOpen] = useState(false)
  const [sectionOpen, setSectionOpen] = useState(false)
  const [branchSearch, setBranchSearch] = useState("")
  const [sectionSearch, setSectionSearch] = useState("")

  const branchRef = useRef(null)
  const sectionRef = useRef(null)

  const branchOptions = [
    "ECE",
    "CSBS",
    "CSE",
    "CSE(TWIN)",
    "CSE-R",
    "AI",
    "AI(TWIN)",
    "DS",
    "CYS",
    "ME",
    "CS",
    "IT",
    "IT(TWIN)",
    "AIML",
    "AIML(TWIN)",
    "BIOTECH",
    "MTECH",
    "IOT",
    "B. Pharma",
    "MBA",
    "MCA",
    "PGDM",
  ]
  const sectionOptions = ["A", "B", "C", "D", "E", "F"]

  const areaOptions = [
    {
      group: "Teams",
      type: "radio",
      options: [
        "Social Media Team ( Videography - Recording and Editing)",
        "Design Team",
        "Marketing, Public Outreach and Sponsorship Team",
        "Technical Team",
        "Hospitality and Volunteering Team",
        "Delegate Affairs Team (Documentation and Communication)",
      ],
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (branchRef.current && !branchRef.current.contains(event.target)) {
        setBranchOpen(false)
      }
      if (sectionRef.current && !sectionRef.current.contains(event.target)) {
        setSectionOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"]
    if (!validTypes.includes(file.type)) {
      setModalMessage("Please upload a valid image file (JPG, PNG, or GIF)")
      setIsError(true)
      setModalOpen(true)
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setModalMessage("File size should be less than 10MB")
      setIsError(true)
      setModalOpen(true)
      return
    }

    // Update formData to include the file name
    setFormData((prev) => ({
      ...prev,
      paymentScreenshot: file.name, // Store just the filename
    }))

    setPaymentFile(file)

    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setPaymentPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "file") {
      handleFileChange(e)
      return
    }

    if (type === "checkbox") {
      if (name === "agreeToTerms") {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          areasOfInterest: checked
            ? [...prev.areasOfInterest, value]
            : prev.areasOfInterest.filter((area) => area !== value),
        }))
      }
    } else if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        areasOfInterest: [value],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setModalMessage("Please enter your name.")
      setIsError(true)
      setModalOpen(true)
      return false
    }
    if (!formData.year) {
      setModalMessage("Please select your year.")
      setIsError(true)
      setModalOpen(true)
      return false
    }
    if (!formData.phone.trim()) {
      setModalMessage("Please enter your phone number.")
      setIsError(true)
      setModalOpen(true)
      return false
    }
    if (!formData.transactionNumber) {
      setModalMessage("Please enter transaction number.")
      setIsError(true)
      setModalOpen(true)
      return false
    }
    if (!formData.email.trim()) {
      setModalMessage("Please enter your email.")
      setIsError(true)
      setModalOpen(true)
      return false
    }
    if (!formData.branch) {
      setModalMessage("Please select your branch.")
      setIsError(true)
      setModalOpen(true)
      return false
    }
    if (!formData.section) {
      setModalMessage("Please select your section.")
      setIsError(true)
      setModalOpen(true)
      return false
    }
    const TeamSelections = formData.areasOfInterest.filter((area) => areaOptions[0].options.includes(area))

    if (TeamSelections.length === 0) {
      setModalMessage("Please select option from Area of Interest.")
      setIsError(true)
      setModalOpen(true)
      return false
    }
    if (!paymentFile) {
      setModalMessage("Please upload payment screenshot.")
      setIsError(true)
      setModalOpen(true)
      return false
    }
    if (!formData.agreeToTerms) {
      setModalMessage("Please agree to the terms and conditions.")
      setIsError(true)
      setModalOpen(true)
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Registration closed check
    if (isRegistrationClosed) {
      setModalMessage(REGISTRATION_STATUS.CLOSED_MESSAGE)
      setIsError(true)
      setModalOpen(true)
      return
    }
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Create FormData instance for multipart/form-data
      const submitData = new FormData()

      // Append all form fields with proper type conversion
      Object.keys(formData).forEach((key) => {
        if (key === "areasOfInterest") {
          submitData.append(key, JSON.stringify(formData[key]))
        } else if (key === "agreeToTerms") {
          // Convert JavaScript boolean to string 'True' or 'False' for Python
          submitData.append(key, formData[key] ? "True" : "False")
        } else {
          submitData.append(key, formData[key])
        }
      })

      // Append the file
      if (paymentFile) {
        submitData.append("paymentScreenshot", paymentFile)
      }

      // Debug log to check what's being sent
      for (const pair of submitData.entries()) {
        console.log(pair[0] + ": " + pair[1])
      }

      const response = await fetch("https://conventus.pythonanywhere.com/api/oc-registration/", {
        method: "POST",
        body: submitData,
      })

      const data = await response.json()

      if (response.ok) {
        setModalMessage("Registration completed successfully!")
        setIsError(false)
        // Reset form
        setFormData({
          name: "",
          year: "",
          phone: "",
          institute: "NIET",
          transactionNumber: "",
          email: "",
          branch: "",
          section: "",
          areasOfInterest: [],
          agreeToTerms: false,
        })
        setPaymentFile(null)
        setPaymentPreview(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } else {
        console.error("Backend error response:", data)
        setModalMessage(Array.isArray(data) ? data.join(" ") : data.message || "Registration failed. Please try again.")
        setIsError(true)
      }
    } catch (err) {
      console.error("Error during submission:", err)
      setModalMessage("An error occurred while submitting the form. Please try again.")
      setIsError(true)
    } finally {
      setLoading(false)
      setModalOpen(true)
    }
  }

  return (
    <div className="bg-white rounded-lg p-8 mb-16">
      {/* Registration Closed Banner - Only shown when registration is closed */}
      {isRegistrationClosed && (
        <div className="bg-red-100 border-l-4 border-red-600 text-red-800 p-4 mb-6" role="alert">
          <div className="flex items-center">
            <X className="w-6 h-6 mr-2" />
            <strong className="text-lg">Registration Closed</strong>
          </div>
          <p className="mt-2">{REGISTRATION_STATUS.CLOSED_NOTICE}</p>
        </div>
      )}

      <h2 className="text-4xl font-bold text-center mb-8 text-red-600">OC Registration</h2>

      <div className="mb-6">
        {/* Payment information section */}
        <div className="text-gray-700">
          <p className="mb-2">OC Membership Fee: Rs 200</p>
          {isRegistrationClosed && <p className="mb-2 text-red-600">{REGISTRATION_STATUS.PAYMENT_DISABLED_TEXT}</p>}
        </div>
      </div>
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
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name field */}
            <div>
              <label className="block text-gray-800 text-sm font-bold mb-2">
                <User className="inline-block mr-2 text-red-600" size={18} />
                Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 ${isRegistrationClosed ? "bg-gray-100" : ""}`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isRegistrationClosed}
                required
              />
            </div>

            {/* Year field */}
            <div>
              <label className="block text-gray-800 text-sm font-bold mb-2">
                <User className="inline-block mr-2 text-red-600" size={18} />
                Year
              </label>
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 ${isRegistrationClosed ? "bg-gray-100" : ""}`}
                name="year"
                value={formData.year}
                onChange={handleChange}
                disabled={isRegistrationClosed}
                required
              >
                <option value="">Select Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            {/* Phone field */}
            <div>
              <label className="block text-gray-800 text-sm font-bold mb-2">
                <Phone className="inline-block mr-2 text-red-600" size={18} />
                Phone No.
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 ${isRegistrationClosed ? "bg-gray-100" : ""}`}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isRegistrationClosed}
                required
              />
            </div>

            {/* Institute field - Still disabled as it's fixed to NIET */}
            <div>
              <label className="block text-gray-800 text-sm font-bold mb-2">
                <Building className="inline-block mr-2 text-red-600" size={18} />
                Institute
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 bg-gray-100"
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                disabled
                required
              >
                <option value="NIET">NIET</option>
              </select>
            </div>

            {/* Email field */}
            <div>
              <label className="block text-gray-800 text-sm font-bold mb-2">
                <Mail className="inline-block mr-2 text-red-600" size={18} />
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 ${isRegistrationClosed ? "bg-gray-100" : ""}`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isRegistrationClosed}
                required
              />
            </div>

            {/* Transaction Number */}
            <div>
              <label className="block text-gray-800 text-sm font-bold mb-2">
                <Link className="inline-block mr-2 text-red-600" size={18} />
                Transaction Number
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 ${isRegistrationClosed ? "bg-gray-100" : ""}`}
                type="text"
                name="transactionNumber"
                value={formData.transactionNumber}
                onChange={handleChange}
                disabled={isRegistrationClosed}
                required
              />
            </div>

            {/* Branch Dropdown */}
            <div>
              <label className="block text-gray-800 text-sm font-bold mb-2">
                <Building className="inline-block mr-2 text-red-600" size={18} />
                Branch
              </label>
              <div className="relative" ref={branchRef}>
                <button
                  type="button"
                  onClick={() => setBranchOpen(!branchOpen)}
                  disabled={isRegistrationClosed}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 flex justify-between items-center ${isRegistrationClosed ? "bg-gray-100" : ""}`}
                >
                  {formData.branch || "Select Branch"}
                  <ChevronDown size={16} />
                </button>
                {branchOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-auto">
                    <div className="sticky top-0 bg-white p-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          placeholder="Search branch..."
                          value={branchSearch}
                          onChange={(e) => setBranchSearch(e.target.value)}
                          className="w-full pl-8 pr-2 py-1 border rounded"
                        />
                      </div>
                    </div>
                    <div>
                      {branchOptions
                        .filter((option) => option.toLowerCase().includes(branchSearch.toLowerCase()))
                        .map((option) => (
                          <div
                            key={option}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, branch: option }))
                              setBranchOpen(false)
                              setBranchSearch("")
                            }}
                          >
                            {option}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section Dropdown */}
            <div>
              <label className="block text-gray-800 text-sm font-bold mb-2">
                <Building className="inline-block mr-2 text-red-600" size={18} />
                Section
              </label>
              <div className="relative" ref={sectionRef}>
                <button
                  type="button"
                  onClick={() => setSectionOpen(!sectionOpen)}
                  disabled={isRegistrationClosed}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 flex justify-between items-center ${isRegistrationClosed ? "bg-gray-100" : ""}`}
                >
                  {formData.section || "Select Section"}
                  <ChevronDown size={16} />
                </button>
                {sectionOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-auto">
                    <div className="sticky top-0 bg-white p-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          placeholder="Search section..."
                          value={sectionSearch}
                          onChange={(e) => setSectionSearch(e.target.value)}
                          className="w-full pl-8 pr-2 py-1 border rounded"
                        />
                      </div>
                    </div>
                    <div>
                      {sectionOptions
                        .filter((option) => option.toLowerCase().includes(sectionSearch.toLowerCase()))
                        .map((option) => (
                          <div
                            key={option}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, section: option }))
                              setSectionOpen(false)
                              setSectionSearch("")
                            }}
                          >
                            {option}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* QR Code Section */}
            <div className="md:col-span-2 mt-4">
              <div className="flex flex-col items-center space-y-4">
                <div
                  className={`relative w-48 h-48 border rounded-lg p-2 bg-gray-50 ${isRegistrationClosed ? "opacity-50" : ""}`}
                >
                  <Image src="/QR's/OC.jpg" alt="NIET Payment QR" fill sizes="192px" className="object-contain p-2" />
                </div>
                <span className={`text-sm ${isRegistrationClosed ? "text-gray-500 line-through" : "text-gray-700"}`}>
                  Scan to pay OC Membership Fee (Rs 200)
                </span>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 text-sm font-bold mb-2">
                <Upload className="inline-block mr-2 text-red-600" size={18} />
                Payment Screenshot
              </label>
              <div
                className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${isRegistrationClosed ? "bg-gray-100 opacity-50" : ""}`}
              >
                <div className="space-y-1 text-center">
                  <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      className={`relative ${isRegistrationClosed ? "cursor-not-allowed bg-white rounded-md font-medium text-gray-500" : "cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500"}`}
                    >
                      <span>{isRegistrationClosed ? "Upload disabled" : "Upload a file"}</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isRegistrationClosed}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    {isRegistrationClosed ? "Registration closed" : "PNG, JPG, GIF up to 10MB"}
                  </p>
                  {paymentPreview && (
                    <div className="mt-2">
                      <img
                        src={paymentPreview || "/placeholder.svg"}
                        alt="Payment Preview"
                        className="h-20 w-auto mx-auto border rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Area of Interest */}
            <div className={`md:col-span-2 ${isRegistrationClosed ? "opacity-50" : ""}`}>
              <h3 className="block text-gray-800 text-lg font-bold mb-3">Area of Interest</h3>

              {areaOptions.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-4">
                  <h4 className="text-gray-700 font-medium mb-2">{group.group}</h4>
                  <div className="space-y-2">
                    {group.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-start">
                        <input
                          id={`option-${groupIndex}-${optionIndex}`}
                          type={group.type}
                          name={group.type === "radio" ? "teamOption" : option}
                          value={option}
                          checked={formData.areasOfInterest.includes(option)}
                          onChange={handleChange}
                          disabled={isRegistrationClosed}
                          className="mt-1 mr-2"
                        />
                        <label
                          htmlFor={`option-${groupIndex}-${optionIndex}`}
                          className={isRegistrationClosed ? "text-gray-500" : "text-gray-700"}
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Terms and Conditions */}
            <div className={`md:col-span-2 ${isRegistrationClosed ? "opacity-50" : ""}`}>
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={isRegistrationClosed}
                  className="mt-1 mr-2"
                />
                <label htmlFor="terms" className={isRegistrationClosed ? "text-gray-500" : "text-gray-700"}>
                  I agree to the terms and conditions, and understand that the OC membership fee is non-refundable.
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <motion.button
              className={`${isRegistrationClosed ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 "
                } 
              text-white font-bold py-3 px-8 rounded-full  transition-all duration-300`}
              type="submit"
              disabled={isRegistrationClosed || loading}
              whileHover={!isRegistrationClosed ? { scale: 1.05 } : {}}
              whileTap={!isRegistrationClosed ? { scale: 0.95 } : {}}
            >
              {loading ? "Submitting..." : isRegistrationClosed ? "Registration Closed" : "Submit Registration"}
            </motion.button>
          </div>
        </motion.form>
      </fieldset>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} message={modalMessage} isError={isError} />
    </div>
  )
}

export default OCRegistrationForm
