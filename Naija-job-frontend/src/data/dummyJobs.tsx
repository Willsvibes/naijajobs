import type { Job } from "../types/job";

export const dummyJobs: Job[] = [
  // FULL-TIME JOBS
  {
    id: 1,
    title: "Electrician Needed for Shop Lighting",
    description:
      "We need a skilled electrician to fix multiple faulty light fixtures in a small retail shop. The job involves troubleshooting existing wiring, replacing damaged light holders, and ensuring all lights meet safety standards. Applicants should have experience with indoor commercial lighting installations.",
    pay: "15000",
    location: "Ikeja",
    type: "Electrical",
    employmentType: "Full-time",
    company: "BrightLight Solutions",
    skills: ["Wiring", "Troubleshooting", "Safety Compliance"],
    experienceLevel: "Intermediate",
    postedDate: "2025-11-10",
    duration: "1 Day Job"
  },
  {
    id: 2,
    title: "Senior Carpenter for Furniture Workshop",
    description:
      "Established furniture workshop seeking a full-time senior carpenter. Responsibilities include crafting custom furniture, training junior staff, quality control, and client consultations. Must have 5+ years experience in woodworking and furniture design.",
    pay: "150000",
    location: "Victoria Island",
    type: "Carpentry",
    employmentType: "Full-time",
    company: "Timber & Co.",
    skills: ["Woodworking", "Furniture Design", "Team Management"],
    experienceLevel: "Advanced",
    postedDate: "2025-11-18",
    duration: "Permanent"
  },
  {
    id: 3,
    title: "Head Plumber for Construction Company",
    description:
      "Construction firm hiring a head plumber to oversee all plumbing installations in residential and commercial projects. Manage team of 5-8 plumbers, ensure compliance with building codes, and maintain quality standards across multiple sites.",
    pay: "180000",
    location: "Ikeja",
    type: "Plumbing",
    employmentType: "Full-time",
    company: "BuildRight Construction",
    skills: ["Team Leadership", "Code Compliance", "Project Management"],
    experienceLevel: "Advanced",
    postedDate: "2025-11-16",
    duration: "Permanent"
  },
  
  // FREELANCE JOBS
  {
    id: 4,
    title: "Carpenter Needed for Shelf Installation",
    description:
      "A reliable carpenter is required to install custom wooden shelves in a residential apartment. The shelves must be precisely measured, cut, sanded, and mounted securely. Knowledge of power tools and wood finishing techniques is required. Materials will be provided.",
    pay:"20000" ,
    location: "Lekki Phase 1",
    type: "Carpentry",
    employmentType: "Freelance",
    company: "HomeStyle Interiors",
    skills: ["Measurement", "Power Tools", "Finishing"],
    experienceLevel: "Intermediate",
    postedDate: "2025-11-15",
    duration: "2–3 Hours"
  },
  {
    id: 5,
    title: "Freelance Graphic Designer for Logo Design",
    description:
      "Small startup needs a creative graphic designer to create a modern, professional logo and brand identity package. Deliverables include 3 logo concepts, brand color palette, and style guide. Portfolio review required.",
    pay: "50000",
    location: "Remote",
    type: "Design",
    employmentType: "Freelance",
    company: "TechVenture Startup",
    skills: ["Adobe Illustrator", "Branding", "Typography"],
    experienceLevel: "Intermediate",
    postedDate: "2025-11-17",
    duration: "1 Week"
  },
  {
    id: 6,
    title: "Wedding Photographer Needed",
    description:
      "Professional photographer required for wedding event. Must provide own equipment (DSLR, lenses, lighting). Responsibilities include ceremony coverage, couple portraits, family photos, and edited photo delivery within 2 weeks.",
    pay: "80000",
    location: "Lekki",
    type: "Photography",
    employmentType: "Freelance",
    company: "Forever Memories Events",
    skills: ["DSLR", "Portrait Photography", "Photo Editing"],
    experienceLevel: "Advanced",
    postedDate: "2025-11-19",
    duration: "1 Day Event"
  },
  {
    id: 7,
    title: "Content Writer for Blog Posts",
    description:
      "Tech blog seeking freelance writer to create 5 SEO-optimized articles (1500 words each) on emerging technology trends. Must have strong research skills, understanding of SEO best practices, and ability to explain complex topics simply.",
    pay: "35000",
    location: "Remote",
    type: "Writing",
    employmentType: "Freelance",
    company: "Digital Insights Blog",
    skills: ["SEO Writing", "Research", "Tech Knowledge"],
    experienceLevel: "Intermediate",
    postedDate: "2025-11-13",
    duration: "2 Weeks"
  },
  
  // CONTRACT JOBS
  {
    id: 8,
    title: "House Painting Job (1 Room)",
    description:
      "A skilled painter is needed to repaint a single bedroom. The job includes surface preparation, filling cracks, applying two coats of paint, and ensuring a smooth, clean finish. All painting materials (brushes, rollers, paint) will be supplied.",
    pay: "18000",
    location: "Yaba",
    type: "Painting",
    employmentType: "Contract",
    company: "ColorPro Services",
    skills: ["Surface Prep", "Painting", "Attention to Detail"],
    experienceLevel: "Beginner",
    postedDate: "2025-11-14",
    duration: "1 Day"
  },
  {
    id: 9,
    title: "Electrician for Office Building Project",
    description:
      "3-month contract position for commercial electrician to handle complete electrical installation in new 4-story office building. Includes wiring, lighting systems, power outlets, circuit breakers, and emergency backup systems.",
    pay: "450000",
    location: "Ikoyi",
    type: "Electrical",
    employmentType: "Contract",
    company: "Prime Properties Ltd",
    skills: ["Commercial Wiring", "Circuit Design", "Safety Standards"],
    experienceLevel: "Advanced",
    postedDate: "2025-11-11",
    duration: "3 Months"
  },
  {
    id: 10,
    title: "IT Support Specialist - 6 Month Contract",
    description:
      "Technology firm needs IT support specialist for 6-month project. Provide technical support to staff, troubleshoot hardware/software issues, maintain network infrastructure, and assist with system upgrades. CompTIA A+ certification preferred.",
    pay: "600000",
    location: "Maryland",
    type: "Technology",
    employmentType: "Contract",
    company: "NetSolutions Tech",
    skills: ["Troubleshooting", "Network Support", "Hardware Repair"],
    experienceLevel: "Intermediate",
    postedDate: "2025-11-09",
    duration: "6 Months"
  },
  {
    id: 11,
    title: "Security Guard - Shopping Mall Contract",
    description:
      "Security company hiring guards for 1-year contract at busy shopping mall. Duties include access control, CCTV monitoring, incident reporting, and customer assistance. Previous security experience required. Shifts rotate weekly.",
    pay: "1200000",
    location: "Ikeja City Mall",
    type: "Security",
    employmentType: "Contract",
    company: "SafeGuard Security",
    skills: ["CCTV Monitoring", "Access Control", "Incident Response"],
    experienceLevel: "Intermediate",
    postedDate: "2025-11-07",
    duration: "1 Year"
  },
  
  // PART-TIME JOBS
  {
    id: 12,
    title: "Plumber Needed for Pipe Leakage Fix",
    description:
      "Urgent plumbing work required to resolve a leaking water pipe under the kitchen sink. The task involves detecting the source of the leak, replacing faulty connectors, and ensuring proper flow without further leakage. Must bring basic plumbing tools.",
    pay: "12000",
    location: "Surulere",
    type: "Plumbing",
    employmentType: "Part-time",
    company: "QuickFix Services",
    skills: ["Leak Detection", "Pipe Repair", "Problem Solving"],
    experienceLevel: "Beginner",
    postedDate: "2025-11-12",
    duration: "1–2 Hours"
  },
  {
    id: 13,
    title: "Evening Tutor for Mathematics",
    description:
      "Part-time mathematics tutor needed for secondary school students. Sessions are 3 evenings per week (Mon, Wed, Fri) from 5pm-7pm. Must be patient, have strong math skills, and experience teaching WAEC/JAMB curriculum.",
    pay: "60000",
    location: "Gbagada",
    type: "Education",
    employmentType: "Part-time",
    company: "BrainBoost Academy",
    skills: ["Mathematics", "WAEC/JAMB", "Teaching"],
    experienceLevel: "Intermediate",
    postedDate: "2025-11-15",
    duration: "Monthly"
  },
  {
    id: 14,
    title: "Weekend Barista for Coffee Shop",
    description:
      "Busy coffee shop seeks enthusiastic part-time barista for weekend shifts (Sat-Sun, 8am-4pm). Responsibilities include preparing espresso drinks, customer service, maintaining cleanliness, and cash handling. Barista training provided.",
    pay: "40000",
    location: "Lekki Phase 1",
    type: "Hospitality",
    employmentType: "Part-time",
    company: "Java Junction Cafe",
    skills: ["Customer Service", "Espresso Making", "Cash Handling"],
    experienceLevel: "Beginner",
    postedDate: "2025-11-18",
    duration: "Ongoing"
  },
  {
    id: 15,
    title: "Air Conditioner Technician Needed",
    description:
      "A certified AC technician is required to troubleshoot and repair a 1.5HP split unit. Issues include reduced cooling and unusual noise. Technician should check gas levels, clean filters, inspect coils, and perform necessary repairs to restore optimal performance.",
    pay: "25000",
    location: "Ajah",
    type: "Repair",
    employmentType: "Part-time",
    company: "CoolBreeze Services",
    skills: ["AC Repair", "Diagnostics", "Refrigeration"],
    experienceLevel: "Advanced",
    postedDate: "2025-11-08",
    duration: "2–3 Hours"
  },
  {
    id: 16,
    title: "Social Media Manager - Part Time",
    description:
      "Fashion boutique needs part-time social media manager to handle Instagram and TikTok accounts. Create content calendars, design posts, engage with followers, and analyze metrics. Requires 10-15 hours per week, flexible schedule.",
    pay: "75000",
    location: "Remote",
    type: "Marketing",
    employmentType: "Part-time",
    company: "Chic Boutique",
    skills: ["Social Media", "Content Creation", "Analytics"],
    experienceLevel: "Intermediate",
    postedDate: "2025-11-16",
    duration: "Monthly"
  },
  {
    id: 17,
    title: "Delivery Driver - Evenings Only",
    description:
      "Restaurant seeks reliable part-time delivery driver for evening shift (6pm-11pm, Mon-Fri). Must have own motorcycle, valid license, and smartphone. Familiarity with Lagos mainland routes preferred. Fuel allowance provided.",
    pay: "50000",
    location: "Ikeja",
    type: "Logistics",
    employmentType: "Part-time",
    company: "Tasty Bites Restaurant",
    skills: ["Navigation", "Time Management", "Customer Service"],
    experienceLevel: "Beginner",
    postedDate: "2025-11-13",
    duration: "Monthly"
  },
  {
    id: 18,
    title: "Yoga Instructor for Morning Classes",
    description:
      "Wellness center hiring certified yoga instructor for morning classes (Tue, Thu, Sat 7am-8:30am). Lead Hatha and Vinyasa flow sessions for groups of 10-15. Must have yoga certification and 2+ years teaching experience.",
    pay: "80000",
    location: "Victoria Island",
    type: "Fitness",
    employmentType: "Part-time",
    company: "Zen Wellness Center",
    skills: ["Yoga Certification", "Group Instruction", "Hatha & Vinyasa"],
    experienceLevel: "Advanced",
    postedDate: "2025-11-11",
    duration: "Monthly"
  }
];