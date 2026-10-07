/*
  "Things I've done": one card per event or achievement, built from LinkedIn posts.
  Posts about the same event (a start and its wrap-up, a win and the coverage of that win,
  courses toward one certificate) share a card.

  - key: photo set in assets/posts/photos (post-KEY-card.webp for the card, post-KEY-1..N.webp
    for the lightbox). Built by tools/build_post_photos.py; keep the two in sync.
  - photos: number of photos in that set (0/omitted = use `screenshot` instead)
  - screenshot: { img, w, h } fallback, assets/posts/post-NN.webp (+ -thumb.webp)
  - alt: description of the cover photo (photo 1)
  - fit: "contain" for logos/badges (shown whole on `bg`); pos: object-position focus for cropped covers
  - quotes: verbatim lines from the source posts, oldest first
  - posts: source post numbers from the LinkedIn_SS / Original_Posts folders (reference only)
  - url: direct link to the live post ("" falls back to the LinkedIn activity feed)
  - links: extra links shown in the lightbox
  - featured: shown in the default "Featured" view
  - cats: award | research | project | career | community | cert
*/
window.POSTS = [
  {
    key: "02", photos: 2, posts: ["02"], featured: true, cats: ["research", "career"],
    alt: "Evans standing beside a research poster display at the AWS MLU AI Symposium", pos: "50% 35%",
    title: "Presenting FICO research at the AWS MLU Symposium",
    quotes: ["From building it in San Diego to presenting it at Amazon."],
    summary: "A summer FICO project, which started from the finding that common public network-intrusion datasets are “almost too easy” for modern ML, presented at the 2026 AWS Machine Learning University Fall AI Teaching & Research Symposium at Amazon HQ2.",
    url: ""
  },
  {
    key: "fico", photos: 6, posts: ["04", "03"], featured: true, cats: ["career"],
    alt: "Evans in front of the FICO logo wall in the San Diego office", pos: "50% 60%",
    title: "A summer as a Data Science Intern at FICO",
    quotes: [
      "New city, new role, new challenge.",
      "That’s a wrap on my summer as a Data Science Intern at FICO!"
    ],
    summary: "From the first day in FICO’s San Diego office to the wrap-up: helping build a synthetic network-intrusion dataset for the FICO Educational Analytics Challenge, with thanks to the managers, mentors, and fellow interns behind the summer.",
    url: ""
  },
  {
    key: "12", photos: 4, posts: ["12"], featured: true, cats: ["award", "project"],
    alt: "PictureMe event gallery screen with a shareable QR code and matched photos", pos: "30% 50%",
    title: "PictureMe takes 1st at HornetHacks 2026",
    quotes: ["We built this in a hackathon...and it won 1st place + $2,000."],
    summary: "Register your face once, join an event with a QR code, and instantly get a personalized “My Photos” gallery, backed by a face detection and matching pipeline.",
    url: ""
  },
  {
    key: "henhacks", photos: 5, posts: ["16", "15"], featured: true, cats: ["award", "project"],
    alt: "Smooth Cruize detection map dashboard with clustered pothole reports",
    title: "Smooth Cruize wins 1st at UD HenHacks",
    quotes: [
      "This weekend, my team and I built Smooth Cruize, and we’re proud to share that among 450+ participants and 120+ teams we took 1st Place at the University of Delaware HenHacks.",
      "It was an honor to be able to represent our university."
    ],
    summary: "An AI-powered system that detects potholes in dashcam footage and turns them into actionable reports, with severity scoring and a review dashboard. DSU later featured the win, a first-place finish in the Community Wellness and Social Connections categories against more than 130 teams from 45 colleges and universities.",
    url: "",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/smooth-cruize" },
      { label: "DSU News", href: "https://www.desu.edu/news/2026/03/dsu-computer-science-team-wins-ud-henhack-competition" }
    ]
  },
  {
    key: "19", photos: 3, posts: ["19"], featured: true, cats: ["research", "award"],
    alt: "Evans presenting AI research slides at the MAC-AFS conference", pos: "50% 50%",
    title: "1st place at the MAC-AFS student presentations",
    quotes: ["I’m excited to share that I earned 1st place in the student presentation competition at this year’s Mid-Atlantic Chapter of the American Fisheries Society (MAC-AFS) Conference."],
    summary: "Presented research from the CIBiLI Lab on an AI-powered sturgeon breach detection system that helps automate conservation work for endangered sturgeon.",
    url: ""
  },
  {
    key: "18", photos: 1, posts: ["18"], featured: true, cats: ["award"],
    alt: "FICO Educational Analytics Challenge 2025 graphic for team Transformers", fit: "contain", bg: "#ffffff",
    title: "FICO 2025 Educational Analytics Challenge: 1st place",
    quotes: ["Excited to share that my team, The Transformers, and I have completed the FICO 2025 Educational Analytics Challenge, and we are proud to have earned 1st place in the competition."],
    summary: "Over a 12-week program, the team built an intent-classification model for customer conversations that achieved over 92% accuracy on FICO’s internal evaluation dataset.",
    url: ""
  },
  {
    key: "11", photos: 4, posts: ["11"], featured: true, cats: ["award", "project"],
    alt: "Evans presenting PrintGuard at a podium during DSU's AI Innovation Day", pos: "40% 50%",
    title: "PrintGuard places 2nd at DSU AI Innovation Day",
    quotes: ["We built PrintGuard—a system that monitors prints in real time and catches problems early, before they turn into wasted time, material, and money."],
    summary: "Lets operators monitor multiple 3D printers at once, get instant alerts, and stop failed prints before the damage is done.",
    url: ""
  },
  {
    key: "09", photos: 2, posts: ["09"], featured: true, cats: ["project"],
    alt: "The Smooth Cruize team with Exelon leaders in front of the pitch slides", pos: "50% 35%",
    title: "Pitching Smooth Cruize to Exelon leadership",
    quotes: ["This week, we had the opportunity to present our project in a Shark Tank-style pitch to senior leaders at Exelon"],
    summary: "After DSU’s Research Day, the team walked through the problem, business model, competitive landscape, and a working end-to-end pipeline.",
    url: ""
  },
  {
    key: "13", photos: 4, posts: ["13"], featured: true, cats: ["award", "project"],
    alt: "The TREK team presenting at the Microsoft Copilot Agent-a-Thon",
    title: "3rd overall at the Microsoft Copilot Agent-a-Thon",
    quotes: ["I’m excited to share that my team and I placed 3rd overall at the Microsoft Copilot Agent-a-Thon in Baltimore."],
    summary: "Built TREK (Travel Recommendations and Experience Keeper), a Copilot-powered agent that generates personalized itineraries, from idea to delivery in under an hour.",
    url: ""
  },
  {
    key: "01", photos: 1, posts: ["01"], cats: ["cert"],
    alt: "AWS Certified AI Practitioner Foundational badge", fit: "contain", bg: "#ffffff",
    title: "Next goal: AWS Certified AI Practitioner",
    quotes: ["Another goal before the year ends: AWS Certified AI Practitioner"],
    summary: "Starting to work toward the AWS Certified AI Practitioner certification by the end of the year.",
    url: ""
  },
  {
    key: "05", photos: 3, posts: ["05"], cats: ["community"],
    alt: "Evans speaking on stage while holding the Corporate Partner Award at DSU's Scholarship Ball", pos: "40% 50%",
    title: "Presenting the 2026 Corporate Partner Award",
    quotes: ["I had the honor of presenting the 2026 Corporate Partner Award at Delaware State University’s Scholarship Ball alongside Jordan Davis."],
    summary: "Presented the award to Capital One and reflected, as an Inspire Scholar, on what investing in students makes possible.",
    url: ""
  },
  {
    key: "06", photos: 1, posts: ["06"], cats: ["cert"],
    alt: "CodePath Intermediate Technical Interview Prep certificate of achievement", fit: "contain", bg: "#ffffff",
    title: "CodePath Intermediate Technical Interview Prep",
    quotes: ["I’m proud to share that I successfully completed CodePath’s Intermediate Technical Interview Prep course."],
    summary: "Sharpened data structures, algorithms, and interview problem-solving skills.",
    url: ""
  },
  {
    key: "07", photos: 3, posts: ["07"], cats: ["community"],
    alt: "A Boston Dynamics Spot robot on stage at the Opportunity Lives Here event", pos: "75% 60%",
    title: "Operating Spot at Opportunity Lives Here",
    quotes: ["One of the most memorable parts of the day was serving as the main operator for one of the Boston Dynamics Spot robots on display during the event"],
    summary: "At Senator Darius Brown’s Opportunity Lives Here event in Wilmington, which brought together leaders across AI, infrastructure, business, and education.",
    url: ""
  },
  {
    key: "08", photos: 3, posts: ["08"], cats: ["community"],
    alt: "Evans testifying at a committee table in Legislative Hall",
    title: "Testifying before the Capital Bond Committee",
    quotes: ["Last week I had the honor of speaking before the Delaware General Assembly’s Capital Bond Committee at Legislative Hall in support of Delaware State University."],
    summary: "Shared how DSU and the Inspire Scholar program opened doors to research, conferences, hackathons, and real-world technology projects.",
    url: ""
  },
  {
    key: "10", photos: 4, posts: ["10"], cats: ["project"],
    alt: "AviGuard app dashboard showing a flock health score and live sensor readings", pos: "50% 9%",
    title: "AviGuard: AI for flock health",
    quotes: ["What if farmers could catch disease risks in their flocks before they become outbreaks?"],
    summary: "A mobile app that tracks environmental and behavioral data, uses an AI model to predict potential health risks, and surfaces insights and alerts on a live dashboard.",
    url: ""
  },
  {
    key: "14", photos: 3, posts: ["14"], cats: ["community", "career"],
    alt: "Evans with two attendees in front of a mural at the NSBE Annual Convention", pos: "50% 30%",
    title: "NSBE 2026 Annual Convention",
    quotes: ["This past weekend I had the opportunity to attend the National Society of Black Engineers (NSBE) Annual Convention in Baltimore, and it was an INCREDIBLE experience."],
    summary: "Met recruiters and engineers at the career fair to talk about opportunities in software engineering and AI.",
    url: ""
  },
  {
    key: "20", photos: 1, posts: ["20"], cats: ["research"],
    alt: "REU cohort group photo beneath a large American flag", pos: "50% 70%",
    title: "REU at North Dakota State University",
    quotes: ["I’m excited to share that I completed my Research Experience for Undergraduates (REU) at North Dakota State University this summer!"],
    summary: "Spent 10 weeks developing an AI Image Origin Detection and Routing System, building skills in machine learning, computer vision, and deep learning frameworks.",
    url: "",
    links: [{ label: "GenRoute on GitHub", href: "https://github.com/3vqns/GenRoute" }]
  },
  {
    key: "21", photos: 1, posts: ["21"], cats: ["award", "project"],
    alt: "Hackathon participants' group photo in a DSU classroom",
    title: "Gone Phishin’: 3rd at DSU’s 2025 Hackathon",
    quotes: ["Thrilled to share that my team and I placed 3rd in Delaware State University’s 2025 Hackathon!"],
    summary: "A Google Chrome extension that uses Google Gemini to detect and analyze phishing emails in real time, with a confidence score for each message.",
    url: ""
  },
  {
    key: "cyber", photos: 2, posts: ["26", "25", "24", "23", "22"], cats: ["cert"],
    alt: "Google Cybersecurity Certificate badge from Google and Coursera", fit: "contain", bg: "#ffffff",
    title: "Google Cybersecurity Certificate",
    quotes: [
      "Thrilled to announce that I’ve been sponsored by Urban Tech Hero for the Google Cybersecurity Certification!",
      "Thrilled to announce my recent achievement: Foundations of Cybersecurity certification from Google!",
      "Excited to announce that I’ve successfully earned the Play It Safe: Manage Security Risks from Google certification!",
      "I’m happy to share that I’ve obtained a new certification: Connect and Protect: Networks and Network Security from Google!",
      "I am happy to announce that I just obtained my Google Cybersecurity Certificate from Coursera!"
    ],
    summary: "Sponsored by Urban Tech Hero, worked through the Google Cybersecurity Certificate on Coursera course by course, including Foundations of Cybersecurity; Play It Safe: Manage Security Risks; and Connect and Protect: Networks and Network Security, then earned the full certificate.",
    url: "",
    links: [{ label: "Verify on Credly", href: "https://www.credly.com/badges/bde31bae-c94b-4d35-8a11-dd936c0c6206/public_url" }]
  },
  {
    key: "27", screenshot: { img: "27", w: 339, h: 312 }, posts: ["27"], cats: ["career"],
    title: "Continuing CS at Delaware State",
    quotes: ["Excited to continue my journey as a Computer Science major at Delaware State University!"],
    summary: "Ready to dive into coding projects and explore software engineering.",
    url: ""
  }
];
