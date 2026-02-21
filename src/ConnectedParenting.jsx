import { useState } from "react";
import { Heart, BookOpen, Users, CheckCircle, Star, Play, Lock, ChevronDown, ChevronUp, ArrowRight, Mail, Shield, Award, Clock, MessageCircle, Menu, X, Loader2, AlertCircle, FileText, HelpCircle, CheckSquare, XCircle, ArrowLeft, Download, Circle, Lightbulb, Triangle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { SITE, PAIN_POINTS, MODULES, TESTIMONIALS, PRICING, FAQ, INSTRUCTOR, LEAD_MAGNET } from "./content.js";
import { MODULE_1_LESSONS } from "./lessonContent.js";

// ============================================================
//  EmailJS Configuration
//  Sign up at https://www.emailjs.com and fill in these values:
// ============================================================
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY   = "YOUR_PUBLIC_KEY";   // e.g. "u_AbCdEfGhIjK"

function Avatar({ initials, size = "md" }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-12 h-12 text-sm", lg: "w-16 h-16 text-lg" };
  return <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold`}>{initials}</div>;
}

function Stars({ count }) {
  return <div className="flex gap-0.5">{Array.from({ length: count }, (_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}</div>;
}

// ============================================================
//  TRIANGLE SECTION COMPONENT
//  Three interlocking triangles that expand with content on click
// ============================================================
function TriangleSections({ sections, openSections, setOpenSections }) {
  const triSections = sections.slice(0, 3);
  const colors = [
    { bg: "from-teal-500 to-teal-600", light: "bg-teal-50", border: "border-teal-200", text: "text-teal-700", ring: "ring-teal-300", accent: "bg-teal-100" },
    { bg: "from-amber-500 to-amber-600", light: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", ring: "ring-amber-300", accent: "bg-amber-100" },
    { bg: "from-rose-500 to-rose-600", light: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", ring: "ring-rose-300", accent: "bg-rose-100" },
  ];

  return (
    <div className="space-y-0">
      <div className="relative flex justify-center items-end gap-0 mb-6" style={{ minHeight: "280px" }}>
        {triSections.map((section, si) => {
          const isOpen = openSections[si] || false;
          const c = colors[si];
          const heights = ["220px", "270px", "220px"];
          const zIndex = si === 1 ? 10 : 5;
          const marginTop = si === 1 ? "0" : "50px";
          return (
            <button
              key={si}
              onClick={() => setOpenSections(prev => {
                const newState = { ...prev };
                Object.keys(newState).forEach(k => { if (parseInt(k) < 3) newState[k] = false; });
                newState[si] = !isOpen;
                return newState;
              })}
              className={`relative flex-1 max-w-[220px] transition-all duration-300 cursor-pointer group ${isOpen ? "scale-105" : "hover:scale-105"}`}
              style={{ zIndex, marginTop }}
            >
              <div
                className={`w-full bg-gradient-to-b ${c.bg} transition-all duration-300 flex flex-col items-center justify-center text-white relative ${isOpen ? "ring-4 " + c.ring : ""}`}
                style={{
                  height: heights[si],
                  clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                }}
              >
                <div className="absolute top-1/3 flex flex-col items-center text-center px-6 pt-4">
                  <span className="text-3xl font-bold opacity-90 mb-1">{si + 1}</span>
                  <span className="text-xs sm:text-sm font-semibold leading-tight text-center opacity-95 max-w-[140px]">
                    {section.title}
                  </span>
                </div>
              </div>
              <div className={`text-center mt-2 text-xs font-medium ${c.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                {isOpen ? "Click to close" : "Click to expand"}
              </div>
            </button>
          );
        })}
      </div>

      {triSections.map((section, si) => {
        const isOpen = openSections[si] || false;
        const c = colors[si];
        if (!isOpen) return null;
        return (
          <div key={`content-${si}`} className={`${c.light} rounded-2xl border-2 ${c.border} p-6 mb-4 animate-fadeIn`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-8 h-8 rounded-full ${c.accent} ${c.text} flex items-center justify-center text-sm font-bold`}>{si + 1}</span>
              <h3 className="font-bold text-gray-900 text-lg">{section.title}</h3>
            </div>
            <div className="space-y-4">
              {section.content.split("\n\n").map((para, pi) => (
                <p key={pi} className="text-gray-700 leading-relaxed text-[15px]">{para}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}


export default function ConnectedParenting() {
  const [page, setPage] = useState("home");
  const [activeModule, setActiveModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [lessonTab, setLessonTab] = useState("video");
  const [quizState, setQuizState] = useState({});
  const [openSections, setOpenSections] = useState({});
  const [completedLessons, setCompletedLessons] = useState([]);
  const [worksheetAnswers, setWorksheetAnswers] = useState({});

  // ===== YouTube video IDs by lesson index =====
  const LESSON_VIDEOS = {
    0: "m3bi0xIkPLw",  // Lesson 1: The Developing Brain
    1: null,            // Lesson 2: Temperament & Personality (add ID later)
    2: null,            // Lesson 3: Decoding Misbehavior (add ID later)
    3: null,            // Lesson 4: Age-Appropriate Expectations (add ID later)
  };

  const handleEmailSubmit = async () => {
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { subscriber_email: email, to_email: email },
        EMAILJS_PUBLIC_KEY
      );
      setShowSuccess(true);
      setEmail("");
    } catch (err) {
      console.error("EmailJS error:", err);
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const scrollTo = (id) => {
    setPage("home");
    setMobileMenu(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const WORKSHEET_PDFS = {
    "developing-brain": "The-Developing-Brain-Worksheet.pdf",
    "temperament-personality": "Temperament-Personality-Worksheet.pdf",
    "decoding-misbehavior": "Decoding-Misbehavior-Worksheet.pdf",
    "age-appropriate-expectations": "Age-Appropriate-Expectations-Worksheet.pdf",
  };

  // ===== INTERACTIVE LESSON VIEWER (Module 1) =====
  if (page === "lesson" && activeModule === 1 && activeLesson !== null) {
    const mod = MODULES[0];
    const lessonData = MODULE_1_LESSONS[activeLesson];
    const lessonTitle = mod.lessons[activeLesson];
    const isCompleted = completedLessons.includes(`1-${activeLesson}`);
    const practicalSection = lessonData.sections[3];
    const pdfFilename = WORKSHEET_PDFS[lessonData.id];
    const videoId = LESSON_VIDEOS[activeLesson];

    return (
      <div className="min-h-screen bg-gray-50">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        `}</style>

        <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <button onClick={() => { setPage("course"); setActiveLesson(null); setLessonTab("video"); setQuizState({}); setOpenSections({}); }} className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 text-sm">
            <ArrowLeft size={14} /> Back to Module
          </button>
          <span className="text-sm text-gray-500">Module {mod.id} · Lesson {activeLesson + 1} of {mod.lessons.length}</span>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{lessonTitle}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Clock size={14} /> {lessonData.duration}</span>
                <span className="flex items-center gap-1"><HelpCircle size={14} /> {lessonData.quiz.length} quiz questions</span>
                <span className="flex items-center gap-1"><Lightbulb size={14} /> Practical strategies</span>
              </div>
            </div>
            {isCompleted && (
              <span className="flex items-center gap-1 text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                <CheckCircle size={14} /> Completed
              </span>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-3 mb-6">
            <div className="flex gap-1">
              {mod.lessons.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${completedLessons.includes(`1-${i}`) ? "bg-teal-500" : i === activeLesson ? "bg-teal-300" : "bg-gray-200"}`} />
              ))}
            </div>
          </div>

          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
            {[
              { key: "video", label: "Video", icon: <Play size={14} /> },
              { key: "content", label: "Lesson Content", icon: <BookOpen size={14} /> },
              { key: "quiz", label: "Quiz", icon: <HelpCircle size={14} /> },
              { key: "strategies", label: "Practical Strategies", icon: <Lightbulb size={14} /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setLessonTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${lessonTab === tab.key ? "bg-white text-teal-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB: Video */}
          {lessonTab === "video" && (
            <div className="space-y-4">
              {videoId ? (
                <div className="rounded-2xl overflow-hidden aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={lessonTitle}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 to-gray-900"></div>
                  <div className="relative text-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 hover:bg-white/30 cursor-pointer transition-all hover:scale-110">
                      <Play size={36} className="text-white ml-1" />
                    </div>
                    <p className="text-white font-medium text-lg mb-1">{lessonTitle}</p>
                    <p className="text-white/60 text-sm">Video coming soon</p>
                  </div>
                </div>
              )}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg shrink-0">L</div>
                  <div>
                    <p className="font-semibold text-gray-900">Your Instructor</p>
                    <p className="text-sm text-gray-500">Licensed Professional &amp; Educator</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">In this short video, I'll walk you through the key concepts for this lesson and share real examples from my work with families. Watch this first, then dive into the full lesson content for a deeper understanding.</p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full"><Clock size={12} /> 3–5 minutes</span>
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full"><BookOpen size={12} /> Overview &amp; key takeaways</span>
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full"><MessageCircle size={12} /> Real-world examples</span>
                </div>
              </div>
              <div className="flex justify-center pt-2">
                <button onClick={() => setLessonTab("content")} className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors font-medium flex items-center gap-2">
                  Continue to Lesson Content <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* TAB: Lesson Content — TRIANGLE LAYOUT */}
          {lessonTab === "content" && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-500 text-sm">Click a triangle to explore each section</p>
              </div>
              <TriangleSections
                sections={lessonData.sections}
                openSections={openSections}
                setOpenSections={setOpenSections}
              />
              <div className="flex justify-center pt-4">
                <button onClick={() => setLessonTab("quiz")} className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors font-medium flex items-center gap-2">
                  Take the Quiz <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* TAB: Quiz */}
          {lessonTab === "quiz" && (
            <div className="space-y-6">
              {lessonData.quiz.map((q, qi) => {
                const selected = quizState[qi];
                const answered = selected !== undefined;
                const isCorrect = selected === q.correct;
                return (
                  <div key={qi} className={`bg-white rounded-xl border-2 p-6 transition-colors ${answered ? (isCorrect ? "border-green-300 bg-green-50/50" : "border-red-300 bg-red-50/50") : "border-gray-200"}`}>
                    <p className="font-semibold text-gray-900 mb-4 flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{qi + 1}</span>
                      {q.question}
                    </p>
                    <div className="space-y-2 ml-8">
                      {q.options.map((opt, oi) => (
                        <button
                          key={oi}
                          onClick={() => { if (!answered) setQuizState(prev => ({ ...prev, [qi]: oi })); }}
                          disabled={answered}
                          className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center gap-3 ${
                            answered && oi === q.correct
                              ? "border-green-400 bg-green-100 text-green-800 font-medium"
                              : answered && oi === selected && !isCorrect
                              ? "border-red-400 bg-red-100 text-red-800"
                              : answered
                              ? "border-gray-200 text-gray-400 cursor-not-allowed"
                              : "border-gray-200 hover:border-teal-300 hover:bg-teal-50 cursor-pointer"
                          }`}
                        >
                          {answered && oi === q.correct ? <CheckCircle size={16} className="text-green-600 shrink-0" /> :
                           answered && oi === selected && !isCorrect ? <XCircle size={16} className="text-red-500 shrink-0" /> :
                           <Circle size={16} className="text-gray-300 shrink-0" />}
                          {opt}
                        </button>
                      ))}
                    </div>
                    {answered && (
                      <div className={`mt-4 ml-8 p-3 rounded-lg text-sm ${isCorrect ? "bg-green-100 text-green-800" : "bg-amber-50 text-amber-800"}`}>
                        <p className="font-medium mb-1">{isCorrect ? "Correct!" : "Not quite."}</p>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {Object.keys(quizState).length === lessonData.quiz.length && (
                <div className="bg-white rounded-xl border-2 border-teal-300 p-6 text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    {Object.entries(quizState).filter(([qi, ans]) => ans === lessonData.quiz[qi].correct).length}/{lessonData.quiz.length}
                  </div>
                  <p className="text-gray-600 mb-4">
                    {Object.entries(quizState).filter(([qi, ans]) => ans === lessonData.quiz[qi].correct).length === lessonData.quiz.length
                      ? "Perfect score! You've mastered this lesson."
                      : "Great effort! Review the explanations above to strengthen your understanding."}
                  </p>
                  <div className="flex justify-center gap-3">
                    <button onClick={() => { setQuizState({}); }} className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Retake Quiz</button>
                    <button onClick={() => setLessonTab("strategies")} className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700 flex items-center gap-2">
                      Continue to Practical Strategies <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: Practical Strategies */}
          {lessonTab === "strategies" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Lightbulb size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{practicalSection.title}</h3>
                    <p className="text-xs text-gray-500">Actionable strategies you can use right away</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {practicalSection.content.split("\n\n").map((para, pi) => {
                    const numberMatch = para.match(/^(\d+)\.\s+(.+)/);
                    if (numberMatch) {
                      const [, num, text] = numberMatch;
                      const dotIdx = text.indexOf(".");
                      const strategyTitle = dotIdx > -1 ? text.slice(0, dotIdx) : text;
                      const strategyBody = dotIdx > -1 ? text.slice(dotIdx + 1).trim() : "";
                      return (
                        <div key={pi} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <div className="flex items-start gap-3">
                            <span className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{num}</span>
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">{strategyTitle}</p>
                              {strategyBody && <p className="text-gray-600 text-sm leading-relaxed">{strategyBody}</p>}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return <p key={pi} className="text-gray-600 leading-relaxed text-[15px]">{para}</p>;
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-xl border-2 border-teal-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Practical Application</h3>
                    <p className="text-xs text-gray-500">Download the worksheet to reflect and apply what you've learned</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  This downloadable worksheet includes guided reflection questions to help you apply the strategies from this lesson to your own family. Take your time — there are no right or wrong answers.
                </p>
                <a
                  href={`/worksheets/${pdfFilename}`}
                  download
                  className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors font-medium text-sm"
                >
                  <Download size={16} /> Download Practical Application PDF
                </a>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {!isCompleted ? (
                    <button
                      onClick={() => setCompletedLessons(prev => [...prev, `1-${activeLesson}`])}
                      className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors font-medium flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      <CheckSquare size={16} /> Mark Lesson Complete
                    </button>
                  ) : (
                    <span className="flex items-center gap-2 text-teal-600 font-medium"><CheckCircle size={16} /> Lesson completed!</span>
                  )}
                  <div className="flex gap-3">
                    <button disabled={activeLesson === 0} onClick={() => { setActiveLesson(activeLesson - 1); setLessonTab("video"); setQuizState({}); setOpenSections({}); window.scrollTo(0,0); }} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-sm">← Previous</button>
                    <button disabled={activeLesson === mod.lessons.length - 1} onClick={() => { setActiveLesson(activeLesson + 1); setLessonTab("video"); setQuizState({}); setOpenSections({}); window.scrollTo(0,0); }} className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-30 disabled:cursor-not-allowed text-sm">Next Lesson →</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===== GENERIC LESSON VIEWER (Modules 2-8) =====
  if (page === "lesson" && activeModule && activeModule !== 1 && activeLesson !== null) {
    const mod = MODULES[activeModule - 1];
    const lesson = mod.lessons[activeLesson];
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <button onClick={() => { setPage("course"); setActiveLesson(null); }} className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 text-sm">
            <ArrowLeft size={14} /> Back to Module
          </button>
          <span className="text-sm text-gray-500">Module {mod.id} · Lesson {activeLesson + 1} of {mod.lessons.length}</span>
        </nav>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 to-gray-900"></div>
            <div className="relative text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 hover:bg-white/30 cursor-pointer transition-all hover:scale-110">
                <Play size={36} className="text-white ml-1" />
              </div>
              <p className="text-white/80 text-sm">Click to play video lesson</p>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson}</h1>
          <p className="text-gray-500 mb-6 flex items-center gap-4">
            <span className="flex items-center gap-1"><Clock size={14} /> 18 min</span>
            <span className="flex items-center gap-1"><Lightbulb size={14} /> Practical strategies included</span>
          </p>
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Lesson Overview</h3>
            <p className="text-gray-600 leading-relaxed mb-4">In this lesson, you'll learn practical strategies grounded in research that you can apply immediately with your children. Each concept is paired with real-world examples and a take-home exercise to help you practice.</p>
            <h3 className="font-semibold text-gray-900 mb-3">Key Takeaways</h3>
            <ul className="space-y-2">
              {["Understand the core concept and why it matters", "Learn 2–3 specific techniques to try this week", "Identify patterns in your current approach", "Download the practical application worksheet"].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600"><CheckCircle size={16} className="text-teal-500 mt-0.5 shrink-0" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <button disabled={activeLesson === 0} onClick={() => setActiveLesson(activeLesson - 1)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-sm">← Previous Lesson</button>
            <button disabled={activeLesson === mod.lessons.length - 1} onClick={() => setActiveLesson(activeLesson + 1)} className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-30 disabled:cursor-not-allowed text-sm">Next Lesson →</button>
          </div>
        </div>
      </div>
    );
  }

  // ===== COURSE DASHBOARD =====
  if (page === "course") {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <button onClick={() => setPage("home")} className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 text-sm">← Back to Home</button>
          <span className="font-semibold text-gray-800 text-sm">My Course</span>
          <Avatar initials="You" size="sm" />
        </nav>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{SITE.name}</h1>
          <p className="text-gray-500 mb-6">8 modules · 32 lessons · Your pace, your journey</p>
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Your Progress</span>
              <span>{Math.round((completedLessons.length / 32) * 100)}% Complete</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all" style={{ width: `${Math.round((completedLessons.length / 32) * 100)}%` }}></div>
            </div>
          </div>
          <div className="space-y-4">
            {MODULES.map((mod) => (
              <div key={mod.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)} className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{mod.icon}</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 text-sm">Module {mod.id}: {mod.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{mod.lessons.length} lessons · {mod.free ? "Free preview" : "Enrolled"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {mod.id === 1 && completedLessons.filter(l => l.startsWith("1-")).length === 4 && (
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">Completed</span>
                    )}
                    {mod.id === 1 && completedLessons.filter(l => l.startsWith("1-")).length > 0 && completedLessons.filter(l => l.startsWith("1-")).length < 4 && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">In Progress</span>
                    )}
                    {activeModule === mod.id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                  </div>
                </button>
                {activeModule === mod.id && (
                  <div className="border-t border-gray-100 px-5 py-3 space-y-1 bg-gray-50">
                    {mod.lessons.map((lesson, li) => (
                      <button key={li} onClick={() => { setActiveLesson(li); setPage("lesson"); setLessonTab("video"); setQuizState({}); setOpenSections({}); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white transition-colors text-left">
                        {completedLessons.includes(`${mod.id}-${li}`) ? <CheckCircle size={16} className="text-teal-500 shrink-0" /> : mod.free || mod.id === 1 ? <Play size={16} className="text-teal-500 shrink-0" /> : <Lock size={16} className="text-gray-300 shrink-0" />}
                        <span className="text-sm text-gray-700">{lesson}</span>
                        <span className="ml-auto text-xs text-gray-400">18 min</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===== HOME / LANDING PAGE =====
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")}>
            <Heart className="text-teal-600" size={22} />
            <span className="font-bold text-gray-900">{SITE.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <button onClick={() => scrollTo("modules")} className="hover:text-teal-600 transition-colors">Curriculum</button>
            <button onClick={() => scrollTo("testimonials")} className="hover:text-teal-600 transition-colors">Stories</button>
            <button onClick={() => scrollTo("pricing")} className="hover:text-teal-600 transition-colors">Pricing</button>
            <button onClick={() => scrollTo("faq")} className="hover:text-teal-600 transition-colors">FAQ</button>
            <button onClick={() => setPage("course")} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium">My Course</button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-gray-100 px-4 py-3 space-y-3 bg-white">
            <button onClick={() => scrollTo("modules")} className="block text-gray-600 text-sm">Curriculum</button>
            <button onClick={() => scrollTo("testimonials")} className="block text-gray-600 text-sm">Stories</button>
            <button onClick={() => scrollTo("pricing")} className="block text-gray-600 text-sm">Pricing</button>
            <button onClick={() => scrollTo("faq")} className="block text-gray-600 text-sm">FAQ</button>
            <button onClick={() => { setPage("course"); setMobileMenu(false); }} className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm w-full">My Course</button>
          </div>
        )}
      </nav>

      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-amber-50"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium mb-6">
              <Award size={12} /> {SITE.tagline}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {SITE.heroHeadline1}<br />
              <span className="text-teal-600">{SITE.heroHeadline2}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{SITE.heroDescription}</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo("pricing")} className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-all hover:shadow-lg font-medium flex items-center gap-2">
                Enroll Now <ArrowRight size={16} />
              </button>
              <button onClick={() => setPage("course")} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                <Play size={16} /> Preview Free Modules
              </button>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Users size={14} /> {SITE.enrolledCount}</span>
              <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> {SITE.rating}</span>
              <span className="flex items-center gap-1"><Shield size={14} /> {SITE.guarantee}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-8 text-center">
          {[
            { icon: <BookOpen size={20} />, label: "8 Modules, 32 Lessons" },
            { icon: <Clock size={20} />, label: "Self-Paced Learning" },
            { icon: <MessageCircle size={20} />, label: "Community Support" },
            { icon: <Award size={20} />, label: "Certificate Included" },
            { icon: <Shield size={20} />, label: "30-Day Money Back" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
              <span className="text-teal-600">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{PAIN_POINTS.heading}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{PAIN_POINTS.subheading}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {PAIN_POINTS.items.map((pain, i) => (
            <div key={i} className="flex items-start gap-3 bg-amber-50 rounded-xl px-4 py-3">
              <span className="text-amber-500 mt-0.5 shrink-0">✦</span>
              <p className="text-gray-700 text-sm">{pain}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-teal-600 font-medium">{PAIN_POINTS.closingLine}</p>
      </section>

      <section id="modules" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">What You'll Learn</h2>
            <p className="text-gray-500 max-w-xl mx-auto">8 carefully designed modules that take you from understanding the "why" behind behavior to confidently handling any parenting challenge.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {MODULES.map((mod) => (
              <div key={mod.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{mod.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">Module {mod.id}: {mod.title}</h3>
                      {mod.free && <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Free</span>}
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{mod.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {mod.lessons.map((l, li) => (
                        <span key={li} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{l}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-3xl font-bold shrink-0">{INSTRUCTOR.initial}</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{INSTRUCTOR.heading}</h2>
            <p className="text-teal-600 font-medium text-sm mb-3">{INSTRUCTOR.title}</p>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">{INSTRUCTOR.bio}</p>
            <div className="flex gap-4 text-xs text-gray-500">
              {INSTRUCTOR.credentials.map((cred, i) => (
                <span key={i} className="flex items-center gap-1">
                  {[<Award size={12} className="text-teal-500" />, <BookOpen size={12} className="text-teal-500" />, <Users size={12} className="text-teal-500" />][i]}
                  {cred}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">What Parents Are Saying</h2>
            <p className="text-gray-500">Real stories from real families.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <Stars count={t.stars} />
                <p className="text-gray-600 text-sm mt-3 mb-4 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                  <Avatar initials={t.img} size="sm" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Choose Your Path</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Every tier includes lifetime access and our 30-day money-back guarantee.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PRICING.map((plan, i) => (
            <div key={i} className={`rounded-2xl border-2 p-6 relative ${plan.highlight ? "border-teal-500 bg-teal-50/50 shadow-lg" : "border-gray-200 bg-white"}`}>
              {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs px-3 py-1 rounded-full font-medium">Most Popular</div>}
              <h3 className="font-bold text-gray-900 text-lg">{plan.tier}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-teal-500 mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-xl font-medium text-sm transition-colors ${plan.highlight ? "bg-teal-600 text-white hover:bg-teal-700" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                {plan.cta}
              </button>
              {plan.installmentNote && <p className="text-center text-xs text-gray-400 mt-2">{plan.installmentNote}</p>}
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 text-sm pr-4">{item.q}</span>
                  {openFaq === i ? <ChevronUp size={18} className="text-gray-400 shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{LEAD_MAGNET.heading}</h2>
          <p className="text-teal-100 max-w-lg mx-auto mb-6 text-sm">{LEAD_MAGNET.description}</p>
          {showSuccess ? (
            <div className="bg-white/20 rounded-xl p-4 max-w-md mx-auto">
              <CheckCircle size={32} className="text-white mx-auto mb-2" />
              <p className="font-medium">{LEAD_MAGNET.successMessage}</p>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleEmailSubmit()}
                  className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                  disabled={sending}
                />
                <button
                  onClick={handleEmailSubmit}
                  disabled={sending}
                  className="bg-white text-teal-700 px-6 py-3 rounded-xl font-medium text-sm hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Mail size={16} /> {LEAD_MAGNET.buttonText}</>
                  )}
                </button>
              </div>
              {emailError && (
                <p className="flex items-center justify-center gap-1 mt-3 text-sm text-red-200">
                  <AlertCircle size={14} /> {emailError}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <Heart size={18} className="text-teal-400" />
              <span className="font-bold">{SITE.name}</span>
            </div>
            <div className="flex gap-6 text-sm">
              <button onClick={() => scrollTo("modules")} className="hover:text-white transition-colors">Course</button>
              <button onClick={() => scrollTo("pricing")} className="hover:text-white transition-colors">Pricing</button>
              <button onClick={() => scrollTo("faq")} className="hover:text-white transition-colors">FAQ</button>
              <span className="hover:text-white transition-colors cursor-pointer">Contact</span>
              <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs">{SITE.copyright}</div>
        </div>
      </footer>
    </div>
  );
}
