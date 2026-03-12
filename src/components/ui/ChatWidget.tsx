"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Bot,
  User,
  GripVertical,
} from "lucide-react";
import { getFingerprint } from "@/hooks/useTracking";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  locale: string;
  labels: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    greeting: string;
    thinking: string;
    error: string;
    poweredBy: string;
  };
}

export default function ChatWidget({ locale, labels }: ChatWidgetProps) {
  const pathname = usePathname();

  // Convert pathname to a human-readable page label for Temel context
  const getPageLabel = (path: string): string => {
    const clean = path.replace(/^\/[a-z]{2}\/?/, "").replace(/\/+$/, "");
    if (!clean) return "Homepage";
    const map: Record<string, string> = {
      about: "About Us",
      careers: "Careers",
      "case-studies": "Case Studies",
      "case-studies/ceramic-tile-production":
        "Ceramic Tile Production Case Study",
      "case-studies/raw-materials-factory": "Raw Materials Factory Case Study",
    };
    return (
      map[clean] ??
      clean.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  };

  const currentPage = getPageLabel(pathname ?? "");
  const STORAGE_KEY = "Temel-chat-history";
  const ENGAGED_KEY = "Temel-chat-engaged";

  // Restore persisted state on mount
  const getInitialMessages = (): Message[] => {
    if (typeof window === "undefined") return [];
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      /* ignore */
    }
    return [];
  };
  const getInitialEngaged = (): boolean => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(ENGAGED_KEY) === "true";
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(getInitialMessages);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(
    () => getInitialMessages().length > 0,
  );
  const [userEngaged, setUserEngaged] = useState(getInitialEngaged);
  const [comingSoon, setComingSoon] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(420);
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const calcStateRef = useRef<Record<string, number | string> | null>(null);
  const sessionIdRef = useRef<string>(
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }),
  );

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Page-specific opening greetings — proactively ask relevant questions
  const getPageGreeting = (page: string): string => {
    if (locale === "tr") {
      const greetingsTr: Record<string, string> = {
        Homepage:
          "👋 Merhaba, ben **Temel** — Akıllı Fabrika rehberiniz.\n\nÇoğu üretici, görünmeyen verimsizlikler yüzünden yılda **48M$–73M$** kaybediyor: karanlık veri, reaktif bakım, kalite kaçakları ve yavaş kararlar.\n\nSize yardımcı olmamı ister misiniz:\n• **Fabrikanızın nerede para kaybettiğini göstermek?**\n• **4 katmanlı platformumuzun nasıl çalıştığını açıklamak?**\n• **ROI Hesaplayıcısı'nda size rehberlik etmek?**\n\nSorun — ya da aşağı kaydırın, ben size rehberlik edeyim!",

        "About Us":
          "👋 Merhaba, ben **Temel**!\n\nHakkımızda sayfamızdasınız — hoş geldiniz.\n\nMerak ediyor musunuz:\n• **CompanyTech'i diğer IIoT sağlayıcılarından** ne ayırıyor?\n• **Hangi sektörlerde** faaliyet gösteriyoruz?\n• **Ekibimizle nasıl** iletişime geçebilirsiniz?\n\nNe bilmek istersiniz?",

        "Case Studies":
          "👋 Merhaba, ben **Temel**!\n\nBaşarı hikayelerimize bakıyorsunuz — gerçek fabrikalar, ölçülebilir sonuçlar.\n\nBilmek ister misiniz:\n• **Seramik Karo veya Hammadde** vakalarından elde edilen metrikler?\n• **Bu sonuçlar sizin sektörünüze** nasıl uygulanabilir?\n• **Uygulama süreci** ne kadar sürdü?\n\nHangi başarı hikayesi ilginizi çekiyor?",

        "Ceramic Tile Production Case Study":
          "👋 Merhaba, ben **Temel**!\n\nSeramik Karo Üretimi başarı hikayemizi inceliyorsunuz.\n\nDaha detaylı bilgi verebilirim:\n• **Elde edilen OEE iyileştirmeleri**\n• **Hangi CompanyTech katmanları** kullanıldı (IoT-Ignite, ArMES, ArAI)\n• **Pilottan tam uygulamaya** ne kadar sürdü\n\nNeyi keşfetmek istersiniz?",

        "Raw Materials Factory Case Study":
          "👋 Merhaba, ben **Temel**!\n\nHammadde Fabrikası başarı hikayemizi okuyorsunuz.\n\nSize daha fazla bilgi verebilirim:\n• **Kalite ve izlenebilirlik iyileştirmeleri**\n• **Bu uygulamada kullanılan teknoloji yığını**\n• **ROI ve geri ödeme süresi**\n\nEn çok neyi merak ediyorsunuz?",

        Careers:
          "👋 Merhaba, ben **Temel**!\n\nKariyer sayfamızdasınız — fırsatları keşfetmeniz harika! 🎉\n\nSize yardımcı olabilir miyim:\n• **Kültürümüz** ve CompanyTech'te çalışma deneyimi?\n• **Hangi pozisyonları** arıyoruz?\n• **Başvuru süreci** ve neler beklemeniz gerektiği?\n\nNe bilmek istersiniz?",
      };
      return greetingsTr[page] ?? labels.greeting;
    }

    const greetings: Record<string, string> = {
      Homepage:
        "👋 Hi, I'm **Temel** — your guide to the Sentient Factory.\n\nMost manufacturers lose **$48M–$73M a year** to invisible inefficiencies: dark data, reactive maintenance, quality escapes, and slow decisions.\n\nWant me to:\n• **Show you where your factory is bleeding money?**\n• **Explain how our 4-layer platform works?**\n• **Walk you through the ROI Calculator?**\n\nJust ask — or scroll down and I'll guide you!",

      "About Us":
        "👋 Hi, I'm **Temel**!\n\nYou're on our About page — great to have you here.\n\nAre you wondering:\n• **What makes CompanyTech different** from other IIoT vendors?\n• **Where we operate** and which industries we serve?\n• **How to get in touch** with our team?\n\nWhat would you like to know?",

      "Case Studies":
        "👋 Hi, I'm **Temel**!\n\nYou're looking at our case studies — real factories, measurable results.\n\nWould you like to know:\n• **The specific metrics** from the Ceramic Tile or Raw Materials cases?\n• **How these results could apply** to your sector?\n• **What the deployment timeline** looked like?\n\nWhich case study interests you most?",

      "Ceramic Tile Production Case Study":
        "👋 Hi, I'm **Temel**!\n\nYou're reading about our Ceramic Tile Production case study.\n\nI can go deeper on:\n• **The exact OEE improvements** achieved\n• **Which CompanyTech layers** were deployed (IoT-Ignite, ArMES, ArAI)\n• **How long it took** from pilot to full deployment\n\nWhat would you like to explore?",

      "Raw Materials Factory Case Study":
        "👋 Hi, I'm **Temel**!\n\nYou're reading about our Raw Materials Factory case study.\n\nI can tell you more about:\n• **The quality & traceability improvements** we delivered\n• **The technology stack** used in this deployment\n• **ROI and payback period** for this project\n\nWhat are you most curious about?",

      Careers:
        "👋 Hi, I'm **Temel**!\n\nYou're on our Careers page — great to see you exploring opportunities! 🎉\n\nCan I help you with:\n• **Learning about our culture** and what it's like to work at CompanyTech?\n• **Understanding what roles** we're typically looking for?\n• **The application process** and what to expect?\n\nWhat would you like to know?",
    };
    return greetings[page] ?? labels.greeting;
  };

  // Show a simple greeting on first open — locale-aware, no page-specific content.
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      const greeting =
        locale === "tr"
          ? "Merhaba benim adım Temel, size yardım etmeye hazırım."
          : "Hi, my name is Temel, I'm ready to help you.";
      setMessages([{ role: "assistant", content: greeting }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, hasGreeted]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Listen for CTA button clicks (e.g. "Talk to Company Agent" hero button)
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-Company-chat", handler);
    return () => window.removeEventListener("open-Company-chat", handler);
  }, []);

  // Listen for live ROI calculator state so Temel can reference the viewer's actual numbers
  useEffect(() => {
    const handler = (e: Event) => {
      calcStateRef.current = (
        e as CustomEvent<Record<string, number | string>>
      ).detail;
    };
    window.addEventListener("roi-calculator-state", handler);
    return () => window.removeEventListener("roi-calculator-state", handler);
  }, []);

  // Push page left when Temel opens so full page is visible
  // Also broadcast so fixed modals (e.g. calculator) can shift themselves
  useEffect(() => {
    const el = document.documentElement;
    el.style.transition = "margin-right 0.3s ease";
    el.style.overflowX = isOpen ? "hidden" : "";
    el.style.marginRight = isOpen ? `${sidebarWidth}px` : "0px";
    window.dispatchEvent(
      new CustomEvent("Company-sidebar", {
        detail: { open: isOpen, width: sidebarWidth },
      }),
    );
    return () => {
      el.style.marginRight = "";
      el.style.overflowX = "";
    };
  }, [isOpen, sidebarWidth]);

  // Drag-to-resize: update width live while dragging
  useEffect(() => {
    if (!isResizing) return;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = Math.min(
        800,
        Math.max(320, window.innerWidth - e.clientX),
      );
      setSidebarWidth(newWidth);
    };

    const onMouseUp = () => setIsResizing(false);

    // Prevent text selection while dragging
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizing]);

  // Scroll-triggered proactive messages — fires once per section per session
  const triggeredSections = useRef<Set<string>>(new Set());
  const probeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const SECTION_PROMPTS_EN: Record<string, string> = {
    // Sentient Factory (OperationalEnso)
    "enso-vision":
      "🏭 You've reached **The Sentient Factory** section — our philosophy behind intelligent manufacturing.\n\nWould you like to know:\n• **What a 'Sentient Factory' actually means** in practice?\n• **How this differs** from standard Industry 4.0 approaches?\n• **What it takes** to start the journey?",
    "enso-gap":
      "🔍 This shows the gap between **the reality most factories face** and **what 'good' actually looks like**.\n\nAre you seeing your own factory in the 'Reality' column? I'd love to discuss which challenges resonate most with your operation.",
    "operational-enso":
      "🔄 The **Operational Ensō** represents a continuous learning cycle — sense, decide, act, learn. It's the intelligence loop that makes a factory truly sentient.\n\nWant me to walk you through how this cycle works in a real deployment?",
    // Homepage — Data Silenced / Untapped Potential section
    roi: "🔇 Welcome to **The Data Silenced** section.\n\nMost factories are sitting on $48M–$73M of annual losses hidden in four categories:\n• 🔍 **Dark Data** — machines generating data nobody reads\n• 🔧 **Reactive Maintenance** — fixing things after they break\n• ⚠️ **Quality Escapes** — defects caught too late or not at all\n• ⚡ **Decision Latency** — slow responses to real-time events\n\nWant to know which one typically hits your industry hardest — or shall I walk you through the ROI Calculator?",
    "roi-calculator":
      "📊 I see you've scrolled to the ROI Calculator! Want me to walk you through what inputs matter most to estimate your factory's hidden losses?",
    "platform-architecture":
      "🏗️ You're looking at our 4-layer platform — the core of how we work. Curious about any specific layer: **IoT-Ignite**, **ArMES**, **ArAI**, or **CWF**?",
    "layer-iot":
      "📡 **IoT-Ignite** connects your machines to the digital world — even legacy equipment without APIs. Want to know how it handles your existing machines?",
    "layer-armes":
      "🏭 **ArMES** is our real-time manufacturing intelligence layer. It's what reduces downtime and improves OEE. Shall I explain how it works in practice?",
    "layer-arai":
      "🤖 **ArAI** is the AI brain of the platform — the layer that predicts failures and optimises quality. Want to know what it actually learns from your factory data?",
    "cwf-conversation":
      "💬 **CWF** lets your team talk to the factory in plain language. Imagine asking 'why did Line 3 stop?' and getting an instant answer. Want a demo scenario?",
    "engagement-path":
      "🗺️ This is our De-risked Engagement Path — from Executive Workshop to full Enterprise Scale. Would you like to know what each stage involves and how long it typically takes?",
    testimonials:
      "💡 Those are results from real factory deployments. Want me to go deeper on any specific case study or the metrics behind them?",
    contact:
      "📞 Ready to start a conversation? I can tell you what to expect from a first meeting with our team — or help you prepare the right questions!",
    // About page
    "about-mission":
      "🎯 Our mission is what drives every product decision. Would you like to know more about why CompanyTech was founded and what problem we set out to solve?",
    "about-team":
      "👥 Behind Temel is a team with deep manufacturing and AI expertise. Curious about the people building this platform?",
    "about-cta":
      "🤝 Interested in connecting with us directly? I can tell you what an initial conversation with our team looks like.",
    // Platform / deployment
    "deployment-paths":
      "🚀 We offer three deployment models to fit where you are today. Want me to explain which one fits your current setup best?",
    "wrapper-strategy":
      "🔄 The Wrapper Strategy is our most popular starting point — it works with your existing systems. Want to know why so many manufacturers choose this path?",
    "technical-roadmap":
      "🗓️ Curious about the technical roadmap? I can walk you through what the first 90 days of a deployment typically look like.",
  };

  const SECTION_PROMPTS_TR: Record<string, string> = {
    "enso-vision":
      "🏭 **Akıllı Fabrika** bölümüne ulaştınız — akıllı üretim felsefemiz.\n\nÖğrenmek ister misiniz:\n• **'Akıllı Fabrika' pratikte** ne anlama geliyor?\n• **Standart Endüstri 4.0 yaklaşımlarından** farkı nedir?\n• **Bu yolculuğa başlamak için** ne gerekiyor?",
    "enso-gap":
      "🔍 Bu bölüm, **çoğu fabrikanın karşılaştığı gerçeklik** ile **olması gereken durum** arasındaki farkı gösteriyor.\n\nFabrikanızı 'Gerçeklik' sütununda görüyor musunuz? Hangi zorlukların sizin operasyonunuzla örtüştüğünü konuşabiliriz.",
    "operational-enso":
      "🔄 **Operasyonel Ensō**, sürekli öğrenme döngüsünü temsil eder — algıla, karar ver, harekete geç, öğren. Fabrikayı gerçekten akıllı yapan zeka döngüsüdür.\n\nBu döngünün gerçek bir uygulamada nasıl çalıştığını anlatmamı ister misiniz?",
    roi: "🔇 **Sessizleştirilen Veri** bölümüne hoş geldiniz.\n\nÇoğu fabrika, dört kategoride gizli yıllık 48M$–73M$ kayıpla karşı karşıya:\n• 🔍 **Karanlık Veri** — kimsenin okumadığı makine verileri\n• 🔧 **Reaktif Bakım** — arızadan sonra tamir etmek\n• ⚠️ **Kalite Kaçakları** — çok geç veya hiç fark edilmeyen hatalar\n• ⚡ **Karar Gecikmesi** — anlık olaylara yavaş tepkiler\n\nHangi kategorinin sektörünüzü en çok etkilediğini öğrenmek ister misiniz — yoksa ROI Hesaplayıcı'yı birlikte inceleyelim mi?",
    "roi-calculator":
      "📊 ROI Hesaplayıcı'ya ulaştığınızı görüyorum! Fabrikanızın gizli kayıplarını tahmin etmek için hangi girdilerin en önemli olduğunu anlatmamı ister misiniz?",
    "platform-architecture":
      "🏗️ 4 katmanlı platformumuza bakıyorsunuz — çalışma yöntemimizin temeli. Belirli bir katman hakkında merak ettikleriniz var mı: **IoT-Ignite**, **ArMES**, **ArAI** veya **CWF**?",
    "layer-iot":
      "📡 **IoT-Ignite**, makinelerinizi dijital dünyaya bağlar — API'si olmayan eski ekipmanlar dahil. Mevcut makinelerinizle nasıl çalıştığını öğrenmek ister misiniz?",
    "layer-armes":
      "🏭 **ArMES**, gerçek zamanlı üretim zekası katmanımızdır. Duruş sürelerini azaltır ve OEE'yi artırır. Pratikte nasıl çalıştığını açıklamamı ister misiniz?",
    "layer-arai":
      "🤖 **ArAI**, platformun yapay zeka beynidir — arızaları önceden tahmin eder ve kaliteyi optimize eder. Fabrika verilerinizden gerçekte ne öğrendiğini bilmek ister misiniz?",
    "cwf-conversation":
      "💬 **CWF**, ekibinizin fabrikayla doğal dilde konuşmasını sağlar. 'Hat 3 neden durdu?' diye sorup anında yanıt almayı hayal edin. Bir demo senaryosu ister misiniz?",
    "engagement-path":
      "🗺️ Bu, risksiz uygulama yaklaşımımızdır — Yönetici Çalıştayından tam Kurumsal Ölçeğe. Her aşamanın ne içerdiğini ve genellikle ne kadar sürdüğünü bilmek ister misiniz?",
    testimonials:
      "💡 Bunlar gerçek fabrika uygulamalarından elde edilen sonuçlar. Herhangi bir başarı hikayesini veya arkasındaki metrikleri daha detaylı inceleyelim mi?",
    contact:
      "📞 Bir görüşme başlatmaya hazır mısınız? Ekibimizle ilk toplantıda neler beklemeniz gerektiğini anlatabilir veya doğru soruları hazırlamanıza yardımcı olabilirim!",
    "about-mission":
      "🎯 Misyonumuz, her ürün kararımızın arkasındaki itici güçtür. CompanyTech'in neden kurulduğunu ve hangi sorunu çözmeye yola çıktığımızı öğrenmek ister misiniz?",
    "about-team":
      "👥 Temel'nin arkasında derin üretim ve yapay zeka uzmanlığına sahip bir ekip var. Bu platformu inşa eden insanları merak ediyor musunuz?",
    "about-cta":
      "🤝 Doğrudan bizimle iletişime geçmek ister misiniz? Ekibimizle ilk görüşmenin nasıl olduğunu anlatabilirim.",
    "deployment-paths":
      "🚀 Mevcut durumunuza uygun üç uygulama modeli sunuyoruz. Hangisinin sizin mevcut kurulumunuza en uygun olduğunu açıklamamı ister misiniz?",
    "wrapper-strategy":
      "🔄 Akıllı Katman Stratejisi, en popüler başlangıç noktamızdır — mevcut sistemlerinizle çalışır. Neden birçok üreticinin bu yolu seçtiğini bilmek ister misiniz?",
    "technical-roadmap":
      "🗓️ Teknik yol haritasını merak ediyor musunuz? Bir uygulamanın ilk 90 gününün genellikle nasıl göründüğünü anlatayım.",
  };

  const SECTION_PROMPTS =
    locale === "tr" ? SECTION_PROMPTS_TR : SECTION_PROMPTS_EN;

  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (
            entry.isIntersecting &&
            !triggeredSections.current.has(id) &&
            SECTION_PROMPTS[id]
          ) {
            triggeredSections.current.add(id);
            // Debounce: wait 1.5s before sending so it doesn't fire on fast scroll
            if (probeTimer.current) clearTimeout(probeTimer.current);
            probeTimer.current = setTimeout(() => {
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                // Skip if Temel is still streaming
                if (last?.role === "assistant" && !last.content) return prev;
                // Replace unanswered Temel prompt — viewer hasn't replied yet
                if (last?.role === "assistant") {
                  return [
                    ...prev.slice(0, -1),
                    { role: "assistant", content: SECTION_PROMPTS[id] },
                  ];
                }
                // User has been chatting — append after the conversation
                return [
                  ...prev,
                  { role: "assistant", content: SECTION_PROMPTS[id] },
                ];
              });
            }, 1500);
          }
        }
      },
      { threshold: 0.3 }, // section must be 30% in view
    );

    // Observe all sections we have prompts for
    Object.keys(SECTION_PROMPTS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (probeTimer.current) clearTimeout(probeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Persist messages to sessionStorage whenever they change AND user has engaged
  useEffect(() => {
    if (userEngaged && messages.length > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        /* quota exceeded or unavailable */
      }
    }
  }, [messages, userEngaged]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    // Mark user as engaged — from this point, history is persisted
    if (!userEngaged) {
      setUserEngaged(true);
      sessionStorage.setItem(ENGAGED_KEY, "true");
    }

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    // Add empty assistant message placeholder
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    // Detect iOS — Safari on iOS has ReadableStream issues with SSE
    const isIOS = /iPad|iPhone|iPod/.test(
      typeof navigator !== "undefined" ? navigator.userAgent : "",
    );

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          locale,
          currentPage,
          stream: !isIOS, // Disable streaming on iOS
          calculatorState: calcStateRef.current ?? undefined,
          fingerprint: getFingerprint(),
          sessionId: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Request failed");
      }

      if (isIOS) {
        // Non-streaming: wait for full JSON response
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === "assistant") last.content = data.text ?? "";
          return updated;
        });
      } else {
        // Streaming: read SSE chunks
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No stream");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;

              try {
                const parsed = JSON.parse(data);
                if (parsed.error) throw new Error(parsed.error);
                if (parsed.text) {
                  setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (last.role === "assistant") {
                      last.content += parsed.text;
                    }
                    return updated;
                  });
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant" && !last.content) {
          last.content = labels.error;
        }
        return updated;
      });
      console.error("[ChatWidget]", err);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Simple markdown-like bold rendering
  function renderContent(text: string) {
    // Split by **bold** markers
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-white">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  }

  return (
    <>
      {/* ── Floating Button ──────────────────────────── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-110 group flex items-center gap-3 rounded-2xl bg-accent/10 border border-accent/30 px-5 py-3.5 text-white shadow-[0_0_30px_rgba(0,209,255,0.15)] backdrop-blur-xl transition-all duration-500 hover:bg-accent/20 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(0,209,255,0.25)] cursor-pointer"
          aria-label="Open Company Agent"
        >
          <div className="relative">
            <MessageSquare className="h-5 w-5 text-accent" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-black animate-pulse" />
          </div>
          <span className="font-heading text-sm font-semibold tracking-wide">
            {labels.title}
          </span>
        </button>
      )}

      {/* ── Sidebar Panel ────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-y-0 right-0 z-110 flex flex-col border-l border-white/8 bg-[#080c14] shadow-[-20px_0_60px_rgba(0,0,0,0.8)] animate-in slide-in-from-right duration-300"
          style={{ width: `${sidebarWidth}px` }}
        >
          {/* ── Drag-to-resize handle ── */}
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              setIsResizing(true);
            }}
            className="absolute left-0 inset-y-0 w-1.5 cursor-col-resize group flex items-center justify-center z-10 hover:bg-accent/20 transition-colors duration-200"
            title="Drag to resize"
          >
            <GripVertical className="w-3 h-5 text-neutral-700 group-hover:text-accent transition-colors duration-200" />
          </div>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/6 bg-white/2 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-accent" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-[#080c14] animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-tight">
                  {labels.title}
                </h3>
                <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
                  {labels.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center h-9 w-9 rounded-xl text-neutral-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 ${
                    msg.role === "assistant"
                      ? "bg-accent/10 border border-accent/20"
                      : "bg-white/6 border border-white/8"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-white/4 border border-white/6 text-neutral-300"
                      : "bg-accent/10 border border-accent/20 text-white"
                  }`}
                >
                  {msg.role === "assistant" && !msg.content && isStreaming ? (
                    <div className="flex items-center gap-2 text-neutral-500">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span className="text-xs">{labels.thinking}</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">
                      {renderContent(msg.content)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/6 bg-white/2 p-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/4 border border-white/8 focus-within:border-accent/30 transition-colors px-3 py-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={labels.placeholder}
                disabled={isStreaming}
                className="flex-1 bg-transparent text-sm text-white brightness-110 placeholder:text-neutral-600 resize-none outline-none max-h-24 leading-relaxed disabled:opacity-50"
                style={{ minHeight: "20px" }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming}
                className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label={labels.send}
              >
                {isStreaming ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-neutral-600 mt-2 text-center font-medium">
              {labels.poweredBy}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
