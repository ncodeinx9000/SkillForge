import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDb from "./config/db.js";
import { User } from "./models/user.model.js";
import { Mentor } from "./models/mentor.model.js";
import { LearnerProfile } from "./models/LearnerProfile.js";
import { BusinessIdea } from "./models/businessIdea.model.js";
import { Roadmap } from "./models/roadmap.model.js";
import { Resource } from "./models/resource.model.js";
import { LearnerProgress } from "./models/learnerProgress.model.js";
import { Session } from "./models/session.model.js";
import Question from "./models/Question.model.js";
import { Review } from "./models/Review.model.js";
import { Notification } from "./models/notification.model.js";
import { Report } from "./models/report.model.js";

const resourceTemplates = [
  ["Business idea validation guide", "Article", "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis", "Strategy"],
  ["How to write a business plan", "Video", "https://www.youtube.com/watch?v=Fqch5OrUPvA", "Planning"],
  ["Google Trends", "Website", "https://trends.google.com/", "Market Research"],
  ["Business Model Canvas", "Template", "https://www.strategyzer.com/library/the-business-model-canvas", "Strategy"],
  ["Google Digital Garage fundamentals", "Course", "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing", "Marketing"],
  ["Pricing strategy fundamentals", "Article", "https://www.shopify.com/blog/pricing-strategies", "Finance"],
  ["Lean startup principles", "PDF", "https://theleanstartup.com/principles", "Planning"],
  ["Canva design school", "Course", "https://www.canva.com/designschool/", "Branding"],
  ["AWS getting started", "Website", "https://aws.amazon.com/getting-started/", "Technology"],
  ["Customer interview questions", "Template", "https://www.nngroup.com/articles/user-interviews/", "Research"],
  ["SEO starter guide", "Article", "https://developers.google.com/search/docs/fundamentals/seo-starter-guide", "Marketing"],
  ["Instagram marketing basics", "Video", "https://www.youtube.com/watch?v=0Gll9bR4P3Y", "Marketing"],
  ["FSSAI registration portal", "Website", "https://foscos.fssai.gov.in/", "Compliance"],
  ["MSME registration portal", "Website", "https://udyamregistration.gov.in/", "Compliance"],
  ["Cash-flow forecast template", "Template", "https://www.score.org/resource/financial-projections-template", "Finance"],
  ["Founder legal checklist", "PDF", "https://www.startupindia.gov.in/content/sih/en/learning-and-development.html", "Legal"],
  ["Cloud fundamentals", "Course", "https://cloud.google.com/learn/training", "Technology"],
  ["First 100 customers playbook", "Article", "https://www.paulgraham.com/ds.html", "Sales"],
];

const ideaTemplates = [
  ["Full Stack Web Development Agency", "Technology", "Build websites and business software for local and online clients.", "Beginner", ["Programming", "Web Development", "Online"]],
  ["Homemade Candle Business", "Food & Beverage", "Create small-batch scented candles and sell through local and online channels.", "Beginner", ["Low Investment", "Home Based", "High Demand"]],
  ["Cloud Kitchen", "Food & Beverage", "Operate a focused delivery kitchen with a small, repeatable menu.", "Intermediate", ["Home Based", "High Demand", "offline"]],
  ["Digital Marketing Agency", "Technology", "Help small businesses grow through content, SEO, social media, and paid campaigns.", "Beginner", ["Online", "High Demand", "Programming"]],
  ["Mobile App Development Service", "Technology", "Design and build focused mobile apps for startups and small businesses.", "Advanced", ["Programming", "Online", "Web Development"]],
  ["Online Tutoring Platform", "Technology", "Match subject experts with learners for live and recorded online tutoring.", "Intermediate", ["Online", "No Inventory", "High Demand"]],
  ["Organic Skincare Brand", "Food & Beverage", "Launch a transparent, small-batch skincare line using natural ingredients.", "Intermediate", ["Home Based", "Women Friendly", "High Demand"]],
  ["Freelance Graphic Design Studio", "Technology", "Offer brand identity, presentation, and social creative services to growing businesses.", "Beginner", ["Online", "No Inventory", "Programming"]],
];

const makeSteps = (ideaTitle, resources) => ["Validate demand", "Design the offer", "Set up operations", "Launch and market", "Measure and improve"].map((title, index) => ({
  order: index + 1,
  title: `${title}: ${ideaTitle}`,
  description: `Complete the ${title.toLowerCase()} work for ${ideaTitle}.`,
  tip: "Talk to real customers and record what you learn before investing more.",
  estimatedDays: 7 + index * 3,
  estimatedCost: 1000 + index * 500,
  tasks: ["Define the target customer", "Write the weekly outcome", "Complete one customer conversation", "Document the next decision"].map((title) => ({ title })),
  resources: resources.slice(index * 3, index * 3 + 3).map((resource) => resource._id),
}));

async function run() {
  await connectDb();
  const demoEmails = ["admin@skillforge.test", ...Array.from({ length: 3 }, (_, i) => `mentor${i + 1}@skillforge.test`), ...Array.from({ length: 5 }, (_, i) => `learner${i + 1}@skillforge.test`)];
  const oldUsers = await User.find({ email: { $in: demoEmails } }).select("_id");
  const oldIds = oldUsers.map((user) => user._id);
  const oldMentors = await Mentor.find({ user: { $in: oldIds } }).select("_id");
  await Promise.all([
    LearnerProgress.deleteMany({ learner: { $in: oldIds } }),
    LearnerProfile.deleteMany({ user: { $in: oldIds } }),
    Session.deleteMany({ $or: [{ learner: { $in: oldIds } }, { mentor: { $in: oldMentors.map((mentor) => mentor._id) } }] }),
    Question.deleteMany({ learner: { $in: oldIds } }),
    Review.deleteMany({ learner: { $in: oldIds } }),
    Notification.deleteMany({ recipient: { $in: oldIds } }),
    Report.deleteMany({ reporter: { $in: oldIds } }),
    Mentor.deleteMany({ user: { $in: oldIds } }),
    Resource.deleteMany({ createdBy: { $in: oldIds } }),
    Roadmap.deleteMany({ createdBy: { $in: oldIds } }),
    BusinessIdea.deleteMany({ createdBy: { $in: oldIds } }),
    User.deleteMany({ _id: { $in: oldIds } }),
  ]);

  const password = await bcrypt.hash("Test@12345", 10);
  const adminPassword = await bcrypt.hash("Admin@12345", 10);
  const admin = await User.create({ name: "SkillForge Admin", email: "admin@skillforge.test", password: adminPassword, role: "admin", isVerified: true });
  const mentorUsers = await User.insertMany([
    { name: "Rahul Sharma", email: "mentor1@skillforge.test", password, role: "mentor", isVerified: true },
    { name: "Priya Verma", email: "mentor2@skillforge.test", password, role: "mentor", isVerified: true },
    { name: "Arjun Mehta", email: "mentor3@skillforge.test", password, role: "mentor", isVerified: true },
  ]);
  const mentors = await Mentor.insertMany([
    { user: mentorUsers[0]._id, title: "Entrepreneurship & Startup Mentor", experience: "7+ years helping early-stage founders validate ideas and plan go-to-market strategies.", yearsOfExperience: 7, expertise: ["Entrepreneurship", "Business Strategy", "Startup Planning", "Market Research", "Marketing"], languages: ["Hindi", "English"], location: "Delhi, India", verificationStatus: "verified", availability: true },
    { user: mentorUsers[1]._id, title: "Digital Marketing Mentor", experience: "6+ years in digital marketing, SEO, social media, and performance marketing.", yearsOfExperience: 6, expertise: ["Digital Marketing", "SEO", "Social Media", "Performance Marketing", "Branding"], languages: ["Hindi", "English"], location: "Mumbai, India", verificationStatus: "verified", availability: true },
    { user: mentorUsers[2]._id, title: "Cloud & DevOps Mentor", experience: "8+ years working with cloud infrastructure, CI/CD, Docker, Kubernetes, and DevOps.", yearsOfExperience: 8, expertise: ["AWS", "Docker", "Kubernetes", "CI/CD", "DevOps"], languages: ["English", "Hindi"], location: "Bengaluru, India", verificationStatus: "pending", availability: true },
  ]);
  const learnerUsers = await User.insertMany(Array.from({ length: 5 }, (_, index) => ({ name: ["Aarav Kapoor", "Meera Nair", "Kabir Singh", "Ananya Iyer", "Rohan Das"][index], email: `learner${index + 1}@skillforge.test`, password, role: "learner", isVerified: true })));
  await LearnerProfile.insertMany(learnerUsers.map((user, index) => ({ user: user._id, skills: ["Business", "Marketing"], interests: index % 2 ? ["Technology"] : ["Food & Beverage"], budget: "₹10,000 - ₹50,000", location: ["Delhi", "Mumbai", "Bengaluru", "Pune", "Kolkata"][index], onboardingCompleted: true })));

  const resources = await Resource.insertMany(resourceTemplates.map(([title, type, url, category]) => ({ title, description: `A practical ${type.toLowerCase()} for SkillForge founders: ${title}.`, type, url, category, level: "Beginner", tags: ["startup", "business"], createdBy: admin._id, status: "approved", isPublished: true })));
  const ideas = [];
  const roadmaps = [];
  for (let index = 0; index < ideaTemplates.length; index += 1) {
    const [title, category, description, difficulty, tags] = ideaTemplates[index];
    const idea = await BusinessIdea.create({ title, category: [category], description, investment: { min: 10000 + index * 5000, max: 50000 + index * 10000 }, estimatedIncome: { min: 25000, max: 150000 }, launchTime: "4-8 weeks", difficulty, advantages: ["Clear customer demand", "Can start lean"], challenges: ["Customer acquisition", "Consistent delivery"], tags, mentor: mentors[index % 2]._id, resources: resources.map((resource) => resource._id), status: "published", isPublished: true, createdBy: admin._id });
    const roadmap = await Roadmap.create({ businessIdea: idea._id, title: `${title} Roadmap`, category, level: difficulty, investmentRange: "₹10,000 - ₹75,000", estimatedIncome: "₹25,000 - ₹1,50,000/month", estimatedDuration: "6-10 weeks", steps: makeSteps(title, resources), status: "published", createdBy: admin._id });
    idea.roadmap = roadmap._id;
    await idea.save();
    ideas.push(idea);
    roadmaps.push(roadmap);
  }

  const progressPercentages = [25, 50, 75, 100, 10];
  const completedSessions = [];
  for (let index = 0; index < learnerUsers.length; index += 1) {
    const taskCount = Math.round(20 * progressPercentages[index] / 100);
    const taskIds = roadmaps[index].steps.flatMap((step) => step.tasks.map((task) => task._id)).slice(0, taskCount);
    const resourceIds = resources.slice(0, Math.max(1, Math.round(resources.length * progressPercentages[index] / 100))).map((resource) => resource._id);
    await LearnerProgress.create({ learner: learnerUsers[index]._id, businessIdea: ideas[index]._id, roadmap: roadmaps[index]._id, status: progressPercentages[index] === 100 ? "Completed" : "Active", completedTask: taskIds.map((taskId) => ({ taskId })), completedResources: resourceIds.map((resourceId) => ({ resourceId })), roadmapProgress: progressPercentages[index], resourceProgress: Math.round(resourceIds.length / resources.length * 100), currentStep: progressPercentages[index] === 100 ? null : roadmaps[index].steps[Math.floor(taskCount / 4)]?._id, bookedMentor: [mentors[index % 2]._id] });
    const statuses = ["pending", "confirmed", "completed", "rejected", "confirmed"];
    const session = await Session.create({ mentor: mentors[index % 2]._id, learner: learnerUsers[index]._id, title: `Mentoring session for ${ideas[index].title}`, description: "Review the next business milestone and remove blockers.", date: new Date(Date.now() + (index + 1) * 86400000), duration: 45, status: statuses[index] });
    if (session.status === "completed") completedSessions.push(session);
    await Notification.create({ recipient: learnerUsers[index]._id, type: "session", title: `Session ${session.status}`, message: `Your demo mentoring session is ${session.status}.`, relatedId: session._id, relatedModel: "Session" });
  }
  for (const session of completedSessions) await Review.create({ learner: session.learner, mentor: session.mentor, session: session._id, rating: 5, comment: "Clear, practical, and useful guidance." });
  await Question.insertMany([
    { learner: learnerUsers[0]._id, mentor: mentors[0]._id, question: "How should I validate my business idea?", status: "answered", answer: "Interview at least ten target customers and test a small paid offer.", answeredAt: new Date() },
    { learner: learnerUsers[1]._id, mentor: mentors[1]._id, question: "What should my first marketing channel be?", status: "assigned" },
    { learner: learnerUsers[2]._id, mentor: mentors[0]._id, question: "How much should I invest initially?", status: "answered", answer: "Start with the smallest experiment that can prove demand.", answeredAt: new Date() },
    { learner: learnerUsers[3]._id, mentor: mentors[2]._id, question: "Which cloud platform should I start with?", status: "assigned" },
  ]);
  await Notification.create({ recipient: learnerUsers[0]._id, type: "question", title: "Question answered", message: "Your mentor answered your question.", relatedModel: "Question" });
  await Report.create({ reporter: admin._id, type: "other", reason: "Demo report for admin workflow", description: "Resolve or dismiss this seeded report during testing." });
  const ratingData = await Review.aggregate([{ $group: { _id: "$mentor", average: { $avg: "$rating" }, count: { $sum: 1 } } }]);
  for (const entry of ratingData) await Mentor.findByIdAndUpdate(entry._id, { rating: Number(entry.average.toFixed(1)), totalReviews: entry.count });
  for (const mentor of mentors) await Mentor.findByIdAndUpdate(mentor._id, { totalMentees: await LearnerProgress.countDocuments({ bookedMentor: mentor._id }), totalSessions: await Session.countDocuments({ mentor: mentor._id }) });
  console.log("Seed complete. Demo-only records were replaced for the requested skillforge.test accounts.");
  await mongoose.disconnect();
}

run().catch(async (error) => { console.error("Seed failed:", error); await mongoose.disconnect(); process.exitCode = 1; });
