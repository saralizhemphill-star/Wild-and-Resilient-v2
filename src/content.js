// ============================================================
//  WILD AND RESILIENT — SITE CONTENT
// ============================================================
//  Edit this file to update your website content.
//  After saving, push to GitHub and Vercel will auto-deploy.
//
//  Tips:
//   - Keep text inside the "quotes"
//   - Don't remove commas between items
//   - true/false controls free-preview modules
// ============================================================


// ---------- SITE INFO ----------
export const SITE = {
  name: "Wild and Resilient",
  tagline: "Evidence-Based · Led by a Licensed Professional",
  heroHeadline1: "Stop the power struggles.",
  heroHeadline2: "Start connecting.",
  heroDescription:
    "An 8-module online course that gives you practical, research-backed strategies to understand your child's behavior, communicate with confidence, and build a relationship that lasts.",
  enrolledCount: "500+ parents enrolled",
  rating: "4.9/5 rating",
  guarantee: "30-day guarantee",
  copyright: "© 2026 Wild and Resilient. All rights reserved. This course is for educational purposes and does not replace professional therapy.",
};


// ---------- PAIN POINTS (the "Does this sound familiar?" section) ----------
export const PAIN_POINTS = {
  heading: "Does this sound familiar?",
  subheading: "You're not a bad parent. You're a good parent in a hard situation without the right tools.",
  closingLine: "There's a better way — and it starts with understanding, not punishment.",
  items: [
    "You dread the evening routine because it always ends in a battle",
    "You've tried everything — rewards, time-outs, yelling — and nothing sticks",
    "You and your partner can't agree on how to handle behavior",
    "You feel guilty, exhausted, and like you're failing at this",
    "Your child's big emotions leave you feeling helpless",
    "You want to break cycles from your own childhood but don't know how",
  ],
};


// ---------- COURSE MODULES ----------
// Set free: true to make a module available as a free preview
export const MODULES = [
  {
    id: 1,
    title: "Understanding Your Child",
    desc: "Child development stages, temperament types, why kids 'misbehave,' and the brain science of behavior.",
    lessons: ["The Developing Brain", "Temperament & Personality", "Decoding Misbehavior", "Age-Appropriate Expectations"],
    icon: "🧒",
    free: true,
  },
  {
    id: 2,
    title: "Understanding Your Parenting Style",
    desc: "Four parenting styles, self-assessment, and how your own upbringing shapes your approach.",
    lessons: ["The Four Styles", "Your Parenting Self-Assessment", "Breaking Generational Patterns", "Finding Your Authentic Style"],
    icon: "🪞",
    free: true,
  },
  {
    id: 3,
    title: "Building the Parent-Child Bond",
    desc: "Quality time techniques, active listening, play-based connection, and repairing ruptures.",
    lessons: ["The Power of Connection", "Active Listening Skills", "Play-Based Bonding", "Repairing After Conflict"],
    icon: "💛",
    free: false,
  },
  {
    id: 4,
    title: "Positive Communication",
    desc: "Emotion coaching, validating feelings, replacing criticism with encouragement.",
    lessons: ["Emotion Coaching 101", "Validation Techniques", "Encouragement vs. Praise", "Age-Appropriate Conversations"],
    icon: "💬",
    free: false,
  },
  {
    id: 5,
    title: "Setting Boundaries with Empathy",
    desc: "Clear expectations, natural vs. logical consequences, saying no without guilt.",
    lessons: ["Why Boundaries Matter", "Natural vs. Logical Consequences", "Saying No with Love", "Consistency Strategies"],
    icon: "🛡️",
    free: false,
  },
  {
    id: 6,
    title: "Managing Difficult Behavior",
    desc: "Tantrums, defiance, aggression, de-escalation techniques, and behavior plans.",
    lessons: ["Understanding Tantrums", "De-escalation Techniques", "Creating Behavior Plans", "When to Seek Help"],
    icon: "🌊",
    free: false,
  },
  {
    id: 7,
    title: "Co-Parenting & Family Dynamics",
    desc: "Aligning approaches, blended families, sibling rivalry, and screen-time agreements.",
    lessons: ["Getting on the Same Page", "Blended Family Strategies", "Sibling Rivalry Solutions", "Screen Time Agreements"],
    icon: "👨‍👩‍👧‍👦",
    free: false,
  },
  {
    id: 8,
    title: "Sustaining the Change",
    desc: "Building resilience, self-care for parents, creating a family mission, and your growth plan.",
    lessons: ["Resilience for the Whole Family", "Parental Self-Care", "Your Family Mission", "Long-Term Growth Plan"],
    icon: "🌱",
    free: false,
  },
];


// ---------- TESTIMONIALS ----------
export const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Mom of 3",
    text: "This course completely changed how I respond to my kids. I went from yelling every night to actually enjoying bedtime. The boundary-setting module alone was worth it.",
    stars: 5,
    img: "SM",
  },
  {
    name: "David R.",
    role: "Father of twins",
    text: "As a dad who grew up with authoritarian parents, I didn't have a model for being firm AND kind. This course gave me that framework. My relationship with my kids has never been better.",
    stars: 5,
    img: "DR",
  },
  {
    name: "Priya K.",
    role: "Mom & teacher",
    text: "I'm a teacher and thought I knew it all about kids. Turns out parenting your own is a different game. The emotion coaching techniques were a game-changer for our home.",
    stars: 5,
    img: "PK",
  },
];


// ---------- PRICING ----------
// highlight: true adds the "Most Popular" badge
export const PRICING = [
  {
    tier: "Self-Paced",
    price: 197,
    period: "one-time",
    features: [
      "All 8 video modules",
      "Downloadable worksheets",
      "Quizzes & self-assessments",
      "Community forum access",
      "Certificate of completion",
    ],
    highlight: false,
    cta: "Get Started",
  },
  {
    tier: "Group Coaching",
    price: 497,
    period: "one-time",
    features: [
      "Everything in Self-Paced",
      "6 weekly live Q&A sessions",
      "Private group chat",
      "Bonus resource library",
      "Accountability partner matching",
    ],
    highlight: true,
    cta: "Join the Next Cohort",
    installmentNote: "or 3 payments of $179",
  },
  {
    tier: "VIP Coaching",
    price: 997,
    period: "one-time",
    features: [
      "Everything in Group Coaching",
      "3 private 1-on-1 sessions",
      "Personalized parenting plan",
      "Priority email support",
      "Lifetime course updates",
    ],
    highlight: false,
    cta: "Apply Now",
  },
];


// ---------- FAQ ----------
export const FAQ = [
  {
    q: "How long do I have access to the course?",
    a: "You get lifetime access. Once you enroll, the course materials are yours to revisit as many times as you need — even years from now as your children grow.",
  },
  {
    q: "What ages does this course cover?",
    a: "The Wild and Resilient course is designed primarily for parents of children ages 2–12. The principles apply broadly, but the specific strategies and examples focus on this age range.",
  },
  {
    q: "Is this just for moms, or can dads take it too?",
    a: "This course is for ALL parents and caregivers — moms, dads, grandparents, foster parents, stepparents, and anyone raising children. The strategies work regardless of who's applying them.",
  },
  {
    q: "What if the course isn't right for me?",
    a: "We offer a 30-day money-back guarantee. If you complete the first two modules and don't feel the course is helping, we'll refund your full purchase price — no questions asked.",
  },
  {
    q: "Can I get a certificate for court-ordered parenting education?",
    a: "Yes. Upon completing all 8 modules and passing the final assessment, you'll receive a certificate of completion from a licensed professional that is accepted by most family courts.",
  },
];


// ---------- INSTRUCTOR BIO ----------
export const INSTRUCTOR = {
  initial: "L",
  heading: "Meet Your Instructor",
  title: "Licensed Professional & Educator",
  bio: "With years of experience working with families in clinical and educational settings, I've seen firsthand what works — and what doesn't. This course distills the most effective, evidence-based strategies into practical tools that real parents can use every day. My mission is to help you feel confident, connected, and equipped to raise resilient kids.",
  credentials: ["Licensed Professional", "Certified Educator", "500+ Families Helped"],
};


// ---------- LEAD MAGNET / EMAIL CAPTURE ----------
export const LEAD_MAGNET = {
  heading: "Not ready to enroll? Start with a free guide.",
  description: "Download \"5 Phrases That Stop Tantrums\" — a free, printable cheat sheet with scripts you can use tonight.",
  successMessage: "Check your inbox! Your free guide is on its way.",
  buttonText: "Send Me the Guide",
};
