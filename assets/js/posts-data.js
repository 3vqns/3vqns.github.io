/*
  Featured LinkedIn posts.
  - img: post number. Screenshot lives at assets/posts/post-NN.webp (+ -thumb.webp).
  - photos: how many photos exist in assets/posts/photos (post-NN-1.webp ... post-NN-K.webp,
    plus post-NN-card.webp for the card). Built by tools/build_post_photos.py.
    Posts with photos show them on the card and in the lightbox; posts without fall back to the screenshot.
  - alt: description of the cover photo (photo 1)
  - fit: "contain" for logos/certificates (with bg colour); pos: object-position focus for cropped covers
  - excerpt: verbatim text from the post
  - url: direct link to the live post. Leave "" to fall back to the profile activity feed.
  - featured: shown in the default "Featured" view
  - cats: award | research | project | career | community | cert
*/
window.POSTS = [
  {
    img: "02", photos: 2, alt: "Evans standing beside a research poster display at the AWS MLU AI Symposium", pos: "50% 35%",
    w: 339, h: 1939, featured: true, cats: ["research", "career"],
    title: "Presenting FICO research at the AWS MLU Symposium",
    excerpt: "From building it in San Diego to presenting it at Amazon.",
    summary: "A summer FICO project, which started from the finding that common public network-intrusion datasets are “almost too easy” for modern ML, presented at the 2026 AWS Machine Learning University Fall AI Teaching & Research Symposium at Amazon HQ2.",
    url: ""
  },
  {
    img: "03", photos: 3, alt: "FICO interns and team members gathered around a restaurant table in San Diego",
    w: 339, h: 1523, featured: true, cats: ["career"],
    title: "Wrapping a summer as a Data Science Intern at FICO",
    excerpt: "That’s a wrap on my summer as a Data Science Intern at FICO!",
    summary: "Helped build a synthetic network-intrusion dataset for the FICO Educational Analytics Challenge, with thanks to the managers, mentors, and fellow interns behind the summer.",
    url: ""
  },
  {
    img: "12", photos: 4, alt: "PictureMe event gallery screen with a shareable QR code and matched photos", pos: "30% 50%",
    w: 339, h: 1535, featured: true, cats: ["award", "project"],
    title: "PictureMe takes 1st at HornetHacks 2026",
    excerpt: "We built this in a hackathon...and it won 1st place + $2,000.",
    summary: "Register your face once, join an event with a QR code, and instantly get a personalized “My Photos” gallery, backed by a face detection and matching pipeline.",
    url: ""
  },
  {
    img: "16", photos: 5, alt: "Smooth Cruize detection map dashboard with clustered pothole reports",
    w: 339, h: 1519, featured: true, cats: ["award", "project"],
    title: "Smooth Cruize wins 1st at UD HenHacks",
    excerpt: "This weekend, my team and I built Smooth Cruize, and we’re proud to share that among 450+ participants and 120+ teams we took 1st Place at the University of Delaware HenHacks.",
    summary: "An AI-powered system that detects potholes in dashcam footage and turns them into actionable reports, with severity scoring and a review dashboard.",
    url: "", extra: { label: "Devpost", href: "https://devpost.com/software/smooth-cruize" }
  },
  {
    img: "19", photos: 3, alt: "Evans presenting AI research slides at the MAC-AFS conference", pos: "50% 50%",
    w: 339, h: 1264, featured: true, cats: ["research", "award"],
    title: "1st place at the MAC-AFS student presentations",
    excerpt: "I’m excited to share that I earned 1st place in the student presentation competition at this year’s Mid-Atlantic Chapter of the American Fisheries Society (MAC-AFS) Conference.",
    summary: "Presented research from the CIBiLI Lab on an AI-powered sturgeon breach detection system that helps automate conservation work for endangered sturgeon.",
    url: ""
  },
  {
    img: "18", photos: 1, alt: "FICO Educational Analytics Challenge 2025 graphic for team Transformers", fit: "contain", bg: "#ffffff",
    w: 339, h: 1130, featured: true, cats: ["award"],
    title: "FICO 2025 Educational Analytics Challenge: 1st place",
    excerpt: "Excited to share that my team, The Transformers, and I have completed the FICO 2025 Educational Analytics Challenge, and we are proud to have earned 1st place in the competition.",
    summary: "Over a 12-week program, the team built an intent-classification model for customer conversations that achieved over 92% accuracy on FICO’s internal evaluation dataset.",
    url: ""
  },
  {
    img: "11", photos: 4, alt: "Evans presenting PrintGuard at a podium during DSU's AI Innovation Day", pos: "40% 50%",
    w: 339, h: 1362, featured: true, cats: ["award", "project"],
    title: "PrintGuard places 2nd at DSU AI Innovation Day",
    excerpt: "We built PrintGuard—a system that monitors prints in real time and catches problems early, before they turn into wasted time, material, and money.",
    summary: "Lets operators monitor multiple 3D printers at once, get instant alerts, and stop failed prints before the damage is done.",
    url: ""
  },
  {
    img: "09", photos: 2, alt: "The Smooth Cruize team with Exelon leaders in front of the pitch slides", pos: "50% 35%",
    w: 339, h: 1243, featured: true, cats: ["project"],
    title: "Pitching Smooth Cruize to Exelon leadership",
    excerpt: "This week, we had the opportunity to present our project in a Shark Tank-style pitch to senior leaders at Exelon",
    summary: "After DSU’s Research Day, the team walked through the problem, business model, competitive landscape, and a working end-to-end pipeline.",
    url: ""
  },
  {
    img: "13", photos: 4, alt: "The TREK team presenting at the Microsoft Copilot Agent-a-Thon",
    w: 339, h: 1589, featured: true, cats: ["award", "project"],
    title: "3rd overall at the Microsoft Copilot Agent-a-Thon",
    excerpt: "I’m excited to share that my team and I placed 3rd overall at the Microsoft Copilot Agent-a-Thon in Baltimore.",
    summary: "Built TREK (Travel Recommendations and Experience Keeper), a Copilot-powered agent that generates personalized itineraries, from idea to delivery in under an hour.",
    url: ""
  },
  {
    img: "01", photos: 1, alt: "AWS Certified AI Practitioner Foundational badge", fit: "contain", bg: "#ffffff",
    w: 339, h: 839, cats: ["cert"],
    title: "Next goal: AWS Certified AI Practitioner",
    excerpt: "Another goal before the year ends: AWS Certified AI Practitioner",
    summary: "Starting to work toward the AWS Certified AI Practitioner certification by the end of the year.",
    url: ""
  },
  {
    img: "04", photos: 3, alt: "Evans in front of the FICO logo wall in the San Diego office", pos: "50% 60%",
    w: 339, h: 1020, cats: ["career"],
    title: "Starting at FICO in San Diego",
    excerpt: "New city, new role, new challenge.",
    summary: "Kicking off a summer internship in FICO’s San Diego office.",
    url: ""
  },
  {
    img: "05", photos: 3, alt: "Evans speaking on stage while holding the Corporate Partner Award at DSU's Scholarship Ball", pos: "40% 50%",
    w: 339, h: 1139, cats: ["community"],
    title: "Presenting the 2026 Corporate Partner Award",
    excerpt: "I had the honor of presenting the 2026 Corporate Partner Award at Delaware State University’s Scholarship Ball alongside Jordan Davis.",
    summary: "Presented the award to Capital One and reflected, as an Inspire Scholar, on what investing in students makes possible.",
    url: ""
  },
  {
    img: "06", photos: 1, alt: "CodePath Intermediate Technical Interview Prep certificate of achievement", fit: "contain", bg: "#ffffff",
    w: 339, h: 602, cats: ["cert"],
    title: "CodePath Intermediate Technical Interview Prep",
    excerpt: "I’m proud to share that I successfully completed CodePath’s Intermediate Technical Interview Prep course.",
    summary: "Sharpened data structures, algorithms, and interview problem-solving skills.",
    url: ""
  },
  {
    img: "07", photos: 3, alt: "A Boston Dynamics Spot robot on stage at the Opportunity Lives Here event", pos: "75% 60%",
    w: 339, h: 1619, cats: ["community"],
    title: "Operating Spot at Opportunity Lives Here",
    excerpt: "One of the most memorable parts of the day was serving as the main operator for one of the Boston Dynamics Spot robots on display during the event",
    summary: "At Senator Darius Brown’s Opportunity Lives Here event in Wilmington, which brought together leaders across AI, infrastructure, business, and education.",
    url: ""
  },
  {
    img: "08", photos: 3, alt: "Evans testifying at a committee table in Legislative Hall",
    w: 339, h: 1439, cats: ["community"],
    title: "Testifying before the Capital Bond Committee",
    excerpt: "Last week I had the honor of speaking before the Delaware General Assembly’s Capital Bond Committee at Legislative Hall in support of Delaware State University.",
    summary: "Shared how DSU and the Inspire Scholar program opened doors to research, conferences, hackathons, and real-world technology projects.",
    url: ""
  },
  {
    img: "10", photos: 4, alt: "AviGuard app dashboard showing a flock health score and live sensor readings", pos: "50% 9%",
    w: 339, h: 1424, cats: ["project"],
    title: "AviGuard: AI for flock health",
    excerpt: "What if farmers could catch disease risks in their flocks before they become outbreaks?",
    summary: "A mobile app that tracks environmental and behavioral data, uses an AI model to predict potential health risks, and surfaces insights and alerts on a live dashboard.",
    url: ""
  },
  {
    img: "14", photos: 3, alt: "Evans with two attendees in front of a mural at the NSBE Annual Convention", pos: "50% 30%",
    w: 339, h: 1163, cats: ["community", "career"],
    title: "NSBE 2026 Annual Convention",
    excerpt: "This past weekend I had the opportunity to attend the National Society of Black Engineers (NSBE) Annual Convention in Baltimore, and it was an INCREDIBLE experience.",
    summary: "Met recruiters and engineers at the career fair to talk about opportunities in software engineering and AI.",
    url: ""
  },
  {
    img: "15", photos: 1, alt: "The HenHacks-winning team holding their prizes in front of the HenHacks backdrop", pos: "50% 40%",
    w: 339, h: 604, cats: ["award"],
    title: "DSU features the HenHacks win",
    excerpt: "It was an honor to be able to represent our university.",
    summary: "DSU highlighted the team’s first-place finish in the Community Wellness and Social Connections categories, competing against more than 130 teams from 45 colleges and universities.",
    url: "", extra: { label: "DSU News", href: "https://www.desu.edu/news/2026/03/dsu-computer-science-team-wins-ud-henhack-competition" }
  },
  {
    img: "17", photos: 1, alt: "Hero section of an earlier personal portfolio website", fit: "contain", bg: "#0f1a14",
    w: 339, h: 923, cats: ["project"],
    title: "Launching a personal portfolio",
    excerpt: "I’m excited to share my personal portfolio website, where I showcase my work in software engineering, artificial intelligence, and applied research.",
    summary: "A first portfolio spanning AI-driven image detection, phishing analysis tools, and full-stack applications.",
    url: "", extra: { label: "Earlier portfolio", href: "https://3vqns.github.io/evans-portfolio/" }
  },
  {
    img: "20", photos: 1, alt: "REU cohort group photo beneath a large American flag", pos: "50% 70%",
    w: 339, h: 1084, cats: ["research"],
    title: "REU at North Dakota State University",
    excerpt: "I’m excited to share that I completed my Research Experience for Undergraduates (REU) at North Dakota State University this summer!",
    summary: "Spent 10 weeks developing an AI Image Origin Detection and Routing System, building skills in machine learning, computer vision, and deep learning frameworks.",
    url: "", extra: { label: "GenRoute on GitHub", href: "https://github.com/3vqns/GenRoute" }
  },
  {
    img: "21", photos: 1, alt: "Hackathon participants' group photo in a DSU classroom",
    w: 339, h: 994, cats: ["award", "project"],
    title: "Gone Phishin’: 3rd at DSU’s 2025 Hackathon",
    excerpt: "Thrilled to share that my team and I placed 3rd in Delaware State University’s 2025 Hackathon!",
    summary: "A Google Chrome extension that uses Google Gemini to detect and analyze phishing emails in real time, with a confidence score for each message.",
    url: ""
  },
  {
    img: "26", photos: 1, alt: "Urban Tech Hero logo", fit: "contain", bg: "#ffffff",
    w: 339, h: 702, cats: ["cert", "community"],
    title: "Sponsored by Urban Tech Hero",
    excerpt: "Thrilled to announce that I’ve been sponsored by Urban Tech Hero for the Google Cybersecurity Certification!",
    summary: "Sponsorship toward the Google Cybersecurity Certification.",
    url: ""
  },
  {
    img: "22", w: 339, h: 442, cats: ["cert"],
    title: "Google Cybersecurity Certificate",
    excerpt: "I am happy to announce that I just obtained my Google Cybersecurity Certificate from Coursera!",
    summary: "Completed the Google Cybersecurity Certificate on Coursera, sponsored by Urban Tech Hero.",
    url: ""
  },
  {
    img: "23", w: 339, h: 516, cats: ["cert"],
    title: "Connect and Protect: Networks and Network Security",
    excerpt: "I’m happy to share that I’ve obtained a new certification: Connect and Protect: Networks and Network Security from Google!",
    summary: "A course in the Google Cybersecurity program.",
    url: ""
  },
  {
    img: "24", w: 339, h: 422, cats: ["cert"],
    title: "Play It Safe: Manage Security Risks",
    excerpt: "Excited to announce that I’ve successfully earned the Play It Safe: Manage Security Risks from Google certification!",
    summary: "A course in the Google Cybersecurity program.",
    url: ""
  },
  {
    img: "25", w: 339, h: 695, cats: ["cert"],
    title: "Foundations of Cybersecurity",
    excerpt: "Thrilled to announce my recent achievement: Foundations of Cybersecurity certification from Google!",
    summary: "The first step in the Google Cybersecurity program, supported by an Urban Tech Hero scholarship.",
    url: ""
  },
  {
    img: "27", w: 339, h: 312, cats: ["career"],
    title: "Continuing CS at Delaware State",
    excerpt: "Excited to continue my journey as a Computer Science major at Delaware State University!",
    summary: "Ready to dive into coding projects and explore software engineering.",
    url: ""
  }
];
