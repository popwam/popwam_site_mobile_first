const data = {
  site: {
    name: "POPWAM",
    domain: "https://popwam.com",
    email: "hello@popwam.com",
    phone: "+20 103 366 2881",
    phoneDigits: "201033662881",
    location: {
      ar: "القاهرة، مصر",
      en: "Cairo, Egypt",
    },
    responseTime: {
      ar: "رد خلال يوم عمل واحد",
      en: "Reply within one business day",
    },
  },
  navigation: [
    { key: "home", slug: "", label: { ar: "الرئيسية", en: "Home" } },
    { key: "about", slug: "about", label: { ar: "من نحن", en: "About" } },
    { key: "services", slug: "services", label: { ar: "الخدمات", en: "Services" } },
    { key: "portfolio", slug: "portfolio", label: { ar: "الأعمال", en: "Portfolio" } },
    { key: "process", slug: "process", label: { ar: "آلية العمل", en: "Process" } },
    { key: "contact", slug: "contact", label: { ar: "تواصل", en: "Contact" } },
  ],
  globals: {
    menu: { ar: "القائمة", en: "Menu" },
    close: { ar: "إغلاق", en: "Close" },
    requestProposal: { ar: "اطلب عرض سعر", en: "Request proposal" },
    liveDemo: { ar: "عرض Demo", en: "Live demo" },
    caseStudy: { ar: "دراسة الحالة", en: "Case study" },
    viewAllProjects: { ar: "استعرض كل المشاريع", en: "Browse all projects" },
    discoverServices: { ar: "شاهد كل الخدمات", en: "Explore all services" },
    readProcess: { ar: "شاهد آلية العمل", en: "See our process" },
    contactNow: { ar: "ابدأ محادثة الآن", en: "Start a conversation" },
    backToPortfolio: { ar: "الرجوع للأعمال", en: "Back to portfolio" },
    allFilter: { ar: "الكل", en: "All" },
    shownResults: { ar: "مشروع ظاهر", en: "projects shown" },
    noResults: {
      ar: "لا توجد مشاريع في هذا التصنيف حاليًا.",
      en: "No projects match this filter yet.",
    },
    breadcrumbHome: { ar: "الرئيسية", en: "Home" },
    breadcrumbPortfolio: { ar: "الأعمال", en: "Portfolio" },
    seoReady: { ar: "SEO + AI Ready", en: "SEO + AI Ready" },
    mobileFirst: { ar: "Mobile First", en: "Mobile First" },
    staticHosting: { ar: "GitHub Pages Static", en: "GitHub Pages Static" },
    footerBlurb: {
      ar: "نصمم ونبني مواقع، أنظمة، وتطبيقات تركز على البيع، السرعة، والتشغيل السهل.",
      en: "We design and build websites, systems, and apps engineered for sales, speed, and simple operations.",
    },
    footerTag: {
      ar: "POPWAM شريك تنفيذ رقمي للمشاريع الجادة.",
      en: "POPWAM is an execution partner for serious digital teams.",
    },
    whatsapp: { ar: "واتساب", en: "WhatsApp" },
    email: { ar: "إيميل", en: "Email" },
    phone: { ar: "اتصال", en: "Call" },
  },
  sectors: [
    { key: "real-estate", icon: "building", label: { ar: "عقارات", en: "Real Estate" } },
    { key: "healthcare", icon: "pulse", label: { ar: "رعاية صحية", en: "Healthcare" } },
    { key: "education", icon: "graduation", label: { ar: "تعليم", en: "Education" } },
    { key: "corporate", icon: "briefcase", label: { ar: "شركات", en: "Corporate" } },
    { key: "operations", icon: "settings", label: { ar: "تشغيل وأنظمة", en: "Operations" } },
    { key: "marketing", icon: "megaphone", label: { ar: "تسويق وتحويلات", en: "Marketing" } },
  ],
  home: {
    meta: {
      ar: {
        title: "POPWAM | وكالة برمجيات تبني مواقع وأنظمة تبيع",
        description: "POPWAM وكالة برمجة Mobile First تبني مواقع، CRM، تطبيقات Flutter، SEO، Automation، وإعدادات استضافة تشغّل البيزنس وتزيد العملاء.",
      },
      en: {
        title: "POPWAM | Mobile-First Software Agency That Ships Revenue Systems",
        description: "POPWAM builds mobile-first websites, landing pages, CRM systems, Flutter apps, SEO foundations, automations, and infrastructure that turn traffic into customers.",
      },
    },
    hero: {
      badge: {
        ar: "وكالة برمجيات تبني أنظمة بيع وتشغيل",
        en: "Agency-grade systems for growth and operations",
      },
      title: {
        ar: "نحوّل الموقع من واجهة شكلية إلى ماكينة مبيعات وتشغيل",
        en: "We turn your website into a sales and operations engine",
      },
      body: {
        ar: "POPWAM تصمم وتنفذ مواقع وتطبيقات وأنظمة داخلية بطابع App حديث، خفيف على الموبايل، واضح في الـ UX، ومبني ليحوّل الزيارات إلى استفسارات وفرص فعلية.",
        en: "POPWAM designs and ships modern app-like websites, internal systems, and mobile products that feel fast on phones, stay clean for operators, and move visitors into qualified conversations.",
      },
      primary: { ar: "اطلب تصور للمشروع", en: "Request a project outline" },
      secondary: { ar: "شاهد الأعمال", en: "See the work" },
    },
    trustPoints: [
      {
        ar: "Mobile First من أول قرار تصميم",
        en: "Mobile-first from the first design decision",
      },
      {
        ar: "Static سريع ومناسب لـ GitHub Pages",
        en: "Static, fast, and GitHub Pages friendly",
      },
      {
        ar: "محتوى منظم للـ SEO وظهور الذكاء الصناعي",
        en: "Structured for SEO and LLM discoverability",
      },
    ],
    stats: [
      { value: "30", label: { ar: "مشروعًا وقالب Case Study", en: "projects and case study templates" } },
      { value: "10+", label: { ar: "خدمات تنفيذ وتسويق وتشغيل", en: "execution, marketing, and ops services" } },
      { value: "1d", label: { ar: "زمن رد على الاستفسارات الجادة", en: "typical reply time for serious leads" } },
    ],
    servicesIntro: {
      eyebrow: { ar: "خدمات متكاملة", en: "Full-stack services" },
      title: {
        ar: "من الـ Landing Page لحد البريد والسيرفرات والإعلانات",
        en: "From landing pages to email, servers, and ads",
      },
      body: {
        ar: "بدل ما تتعامل مع 4 موردين مختلفين، POPWAM تنفذ لك الواجهة، النظام، الحملة، وربط التشغيل تحت رؤية واحدة.",
        en: "Instead of juggling four vendors, POPWAM handles the web layer, the system layer, the campaign layer, and the operating setup in one connected scope.",
      },
    },
    portfolioIntro: {
      eyebrow: { ar: "نماذج التنفيذ", en: "Execution library" },
      title: {
        ar: "أعمال مرتبة كدراسات حالة وليس مجرد صور سابقة",
        en: "Work presented as case studies, not just screenshots",
      },
      body: {
        ar: "كل مشروع عنده Challenge وSolution ونتيجة وخدمات مستخدمة وزر Demo. هذا يجعل الموقع أداة مبيعات حقيقية بدل صفحة Portfolio تقليدية.",
        en: "Every project includes a challenge, solution, measurable result, used services, and a demo button. That turns the site into a true sales asset rather than a generic portfolio grid.",
      },
    },
    sectorsIntro: {
      eyebrow: { ar: "قطاعات نفهمها", en: "Sectors we understand" },
      title: {
        ar: "عقارات، رعاية صحية، تعليم، شركات، وتشغيل داخلي",
        en: "Real estate, healthcare, education, corporate, and internal operations",
      },
      body: {
        ar: "الموقع يوضح أن POPWAM لا تبيع كود فقط، بل تبني تدفقًا يناسب نوع العميل، فريق المبيعات، ومرحلة المشروع.",
        en: "The positioning makes it clear that POPWAM is not selling code alone. We shape flows around the client type, sales team, and operating stage.",
      },
    },
    ctaBand: {
      title: {
        ar: "لو عندك خدمة أو مشروع يحتاج مبيعات أو تشغيل أفضل، نقدر نرتب له خطة تنفيذ واضحة.",
        en: "If your business needs a better sales or operations setup, we can shape a clear execution plan around it.",
      },
      body: {
        ar: "البدء يكون بمحادثة قصيرة ثم تصور تنفيذي يحدد الصفحات أو النظام أو الحملة المطلوبة قبل أي التزام كبير.",
        en: "We start with a short conversation, then turn it into a practical rollout covering the pages, system, or campaign required before you commit heavily.",
      },
    },
  },
  about: {
    meta: {
      ar: {
        title: "من نحن | POPWAM",
        description: "تعرف على طريقة POPWAM في تحويل المواقع والأنظمة إلى أدوات بيع وتشغيل عملية ومناسبة للموبايل.",
      },
      en: {
        title: "About | POPWAM",
        description: "Learn how POPWAM turns websites, systems, and apps into practical sales and operations tools built mobile-first.",
      },
    },
    hero: {
      title: {
        ar: "POPWAM ليست ستوديو شكل فقط. نحن فريق تنفيذ يربط التصميم بالنتيجة.",
        en: "POPWAM is not a visuals-only studio. We connect design decisions to business outcomes.",
      },
      body: {
        ar: "نشتغل بعقلية وكالة برمجيات عملية: UX واضح، بنية خفيفة، محتوى مقنع، وقرارات تقنية تخدم المبيعات وخدمة العملاء والتشغيل الداخلي.",
        en: "We work like a practical software agency: clear UX, lightweight architecture, persuasive content, and technical decisions that serve sales, customer support, and operations.",
      },
    },
    story: {
      title: { ar: "كيف نفكر", en: "How we think" },
      body: {
        ar: "أغلب المواقع تبدو جيدة لكن لا تدعم رحلة العميل ولا تسهل الشغل على الفريق. نحن نبدأ من أسئلة مثل: كيف سيصل العميل؟ أين يتحول؟ ماذا يحتاج فريقك بعد التحويل؟ ثم نبني على هذا الأساس.",
        en: "Most websites look fine but do not support the customer journey or help the internal team work faster. We start with questions like: how will the lead arrive, where will the conversion happen, and what will your team need afterward? The build follows those answers.",
      },
    },
    principles: [
      {
        icon: "spark",
        title: { ar: "وضوح قبل الزينة", en: "Clarity before decoration" },
        body: {
          ar: "كل صفحة لها هدف وCTA ومسار قراءة محسوب، ثم يأتي الشكل لدعم هذا الهدف.",
          en: "Each page has a defined goal, CTA, and reading path. Visual style comes in to support that goal.",
        },
      },
      {
        icon: "phone",
        title: { ar: "الموبايل هو الأساس", en: "Mobile is the baseline" },
        body: {
          ar: "نصمم أولًا للشاشة الصغيرة لأن أغلب الزيارات والقرارات الأولى تأتي منها.",
          en: "We design for the smaller screen first because most first visits and first decisions happen there.",
        },
      },
      {
        icon: "flow",
        title: { ar: "ربط التنفيذ بالتشغيل", en: "Execution tied to operations" },
        body: {
          ar: "الصفحة، الـ CRM، البريد، الـ DNS، والإعلانات يجب أن يعملوا كنظام واحد.",
          en: "The page, CRM, email, DNS, and campaigns should behave like one connected system.",
        },
      },
      {
        icon: "chart",
        title: { ar: "قياس وليس تخمين", en: "Measured, not guessed" },
        body: {
          ar: "نبحث عن أرقام واضحة: استفسارات مؤهلة، وقت استجابة، ومراحل تسليم معروفة.",
          en: "We care about clear numbers: qualified inquiries, response time, and concrete delivery milestones.",
        },
      },
    ],
    capabilities: {
      title: { ar: "ما الذي نغطيه", en: "What we cover" },
      items: [
        { ar: "مواقع تعريفية وتجارية وLanding Pages عالية التحويل", en: "High-converting websites, company profiles, and landing pages" },
        { ar: "أنظمة CRM ولوحات تشغيل داخلية وربط بيانات", en: "CRM systems, operator dashboards, and data connections" },
        { ar: "تطبيقات Flutter وتجارب Mobile أقرب لفكرة المنتج", en: "Flutter apps and product-like mobile experiences" },
        { ar: "تهيئة SEO وSchema وملفات AI readiness والبنية السريعة", en: "SEO setup, schema, AI-readiness files, and fast delivery architecture" },
      ],
    },
    stack: {
      title: { ar: "تقنيات وأدوات نعتمد عليها", en: "Tools and technologies we rely on" },
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "Flutter",
        "Firebase",
        "WordPress",
        "Cloudflare",
        "Google Workspace",
        "Zoho",
        "Microsoft 365",
      ],
    },
    whyPopwam: {
      title: { ar: "لماذا POPWAM", en: "Why POPWAM" },
      items: [
        {
          title: { ar: "تنفيذ خفيف وواضح", en: "Lean and clear delivery" },
          body: {
            ar: "لا نعتمد على مكتبات ثقيلة أو تعقيد لا تحتاجه الصفحة.",
            en: "We avoid heavy libraries and unnecessary complexity.",
          },
        },
        {
          title: { ar: "لغة تجارية مفهومة", en: "Commercially useful language" },
          body: {
            ar: "المحتوى يشرح القيمة للعميل النهائي بدل الكلام العام عن التقنية.",
            en: "The copy explains business value to end clients instead of generic tech talk.",
          },
        },
        {
          title: { ar: "جاهزية للتوسع", en: "Ready to scale" },
          body: {
            ar: "يمكن البدء Static سريع ثم توصيله بأنظمة أو Apps أو CRM لاحقًا.",
            en: "You can start with a fast static layer and expand later into systems, apps, or CRM integrations.",
          },
        },
      ],
    },
  },
  servicesPage: {
    meta: {
      ar: {
        title: "الخدمات | POPWAM",
        description: "خدمات POPWAM تشمل المواقع، الأنظمة، Flutter، WordPress + Firebase، SEO، ترحيل الإيميل، السيرفرات، DNS، Automation، وحملات Google Ads.",
      },
      en: {
        title: "Services | POPWAM",
        description: "POPWAM services include websites, systems, Flutter apps, WordPress + Firebase, SEO, email migration, hosting, DNS, automation, and Google Ads campaigns.",
      },
    },
    hero: {
      title: {
        ar: "خدمات تبني الواجهة وتدعم التشغيل بعد الإطلاق",
        en: "Services that build the front-end and support operations after launch",
      },
      body: {
        ar: "كل خدمة مصممة بحيث تسد فجوة حقيقية في المبيعات أو التشغيل أو تجربة العميل، وليس مجرد تنفيذ تقني منفصل.",
        en: "Each service is scoped to solve a real sales, operations, or customer-experience gap instead of acting like an isolated technical task.",
      },
    },
    engagement: {
      title: { ar: "طرق التعاون", en: "Ways we engage" },
      items: [
        {
          title: { ar: "Sprint تنفيذي", en: "Execution sprint" },
          body: {
            ar: "لصفحة هبوط أو موقع أو MVP سريع بزمن واضح ومخرجات محددة.",
            en: "For landing pages, company sites, or fast MVPs with a clear timeline and scope.",
          },
        },
        {
          title: { ar: "مسار بناء نظام", en: "System build track" },
          body: {
            ar: "عندما تحتاج CRM أو لوحة تشغيل أو تدفق Automation متكامل.",
            en: "When you need CRM, internal dashboards, or a connected automation flow.",
          },
        },
        {
          title: { ar: "دعم نمو مستمر", en: "Ongoing growth support" },
          body: {
            ar: "SEO وتحسينات Conversion وإعلانات وصيانة تشغيلية بعد الإطلاق.",
            en: "SEO, conversion improvements, ads, and operational maintenance after launch.",
          },
        },
      ],
    },
  },
  portfolioPage: {
    meta: {
      ar: {
        title: "الأعمال | POPWAM",
        description: "استعرض 30 مشروعًا بصيغة Case Study تشمل عقارات وعيادات وتعليم وشركات وأنظمة تشغيل مع أزرار Demo وخدمات مستخدمة.",
      },
      en: {
        title: "Portfolio | POPWAM",
        description: "Browse 30 POPWAM case studies across real estate, healthcare, education, corporate sites, and operations systems with demo links and used services.",
      },
    },
    hero: {
      title: {
        ar: "أعمال منظّمة لتساعد العميل أن يتخيل نفسه داخل الحل",
        en: "A portfolio structured so the buyer can imagine themselves inside the solution",
      },
      body: {
        ar: "بدل عرض صور فقط، كل مشروع هنا يوضح القطاع، التحدي، الحل، النتائج، والخدمات المستخدمة. هذا يسهّل البيع ويعطي ثقة أعلى.",
        en: "Instead of showing visuals alone, each project explains the sector, challenge, solution, results, and service mix. That makes the portfolio useful in actual sales conversations.",
      },
    },
  },
  caseStudyIndex: {
    meta: {
      ar: {
        title: "دراسات الحالة | POPWAM",
        description: "مكتبة دراسات حالة لمشاريع POPWAM في المواقع والتطبيقات والأنظمة الداخلية والتسويق والتحسين.",
      },
      en: {
        title: "Case Studies | POPWAM",
        description: "A case study library for POPWAM projects covering websites, apps, internal systems, marketing, and optimization work.",
      },
    },
    hero: {
      title: {
        ar: "مكتبة دراسات الحالة",
        en: "Case study library",
      },
      body: {
        ar: "مفيدة للاجتماعات والعروض وإرسال أمثلة سريعة حسب قطاع العميل أو نوع الخدمة المطلوبة.",
        en: "Useful for meetings, proposals, and fast references based on client sector or requested service type.",
      },
    },
  },
  processPage: {
    meta: {
      ar: {
        title: "آلية العمل | POPWAM",
        description: "تعرف على آلية POPWAM من اكتشاف احتياج العميل إلى الإطلاق ثم التحسين المستمر للموقع أو النظام أو الحملة.",
      },
      en: {
        title: "Process | POPWAM",
        description: "See the POPWAM process from discovery through launch and continuous improvement across sites, systems, and campaigns.",
      },
    },
    hero: {
      title: {
        ar: "نشتغل بمراحل بسيطة لكن محسوبة",
        en: "We work in simple but deliberate phases",
      },
      body: {
        ar: "كل مرحلة لها مخرجات واضحة، وهذا يجعل التنفيذ أسرع ويقلل التعديلات العشوائية ويعطي العميل رؤية أفضل لما يحدث.",
        en: "Each phase has a concrete output, which keeps delivery faster, reduces random revisions, and gives the client better visibility into what is happening.",
      },
    },
    promise: {
      title: { ar: "ماذا يحصل العميل في النهاية", en: "What the client gets in the end" },
      items: [
        { ar: "بنية صفحات أو نظام واضحة وسهلة التطوير لاحقًا", en: "A page or system structure that stays clear and extendable" },
        { ar: "لغة مبيعات أقوى من مجرد وصف تقني", en: "Sales copy stronger than generic technical wording" },
        { ar: "إعداد SEO وSchema وملفات أساسية للظهور", en: "SEO, schema, and essential discoverability files" },
        { ar: "تجهيز للربط مع CRM أو حملات أو مزودي بريد واستضافة", en: "Prepared connections to CRM, campaigns, or email and hosting providers" },
      ],
    },
  },
  contactPage: {
    meta: {
      ar: {
        title: "تواصل | POPWAM",
        description: "ابدأ مع POPWAM من خلال نموذج Brief سريع أو واتساب أو البريد لتجهيز تصور للموقع أو النظام أو الحملة المناسبة.",
      },
      en: {
        title: "Contact | POPWAM",
        description: "Start with POPWAM through a quick brief form, WhatsApp, or email and get a practical outline for your website, system, or campaign.",
      },
    },
    hero: {
      title: {
        ar: "أرسل Brief مختصر وسنحوّله إلى تصور تنفيذي",
        en: "Send a short brief and we will turn it into a practical rollout",
      },
      body: {
        ar: "هذا الموقع Static، لذلك النموذج لا يحتاج Backend. بعد الإرسال نفتح لك رسالة واتساب جاهزة بالمعلومات حتى نبدأ بسرعة ومن غير تعقيد.",
        en: "This site is fully static, so the form does not need a backend. When you submit, we prefill a WhatsApp brief so we can move quickly without extra complexity.",
      },
    },
    form: {
      name: { ar: "الاسم", en: "Name" },
      company: { ar: "الشركة أو النشاط", en: "Company or business" },
      email: { ar: "البريد الإلكتروني", en: "Email" },
      service: { ar: "الخدمة المطلوبة", en: "Requested service" },
      timeline: { ar: "التوقيت المتوقع", en: "Target timeline" },
      details: { ar: "تفاصيل مختصرة", en: "Brief details" },
      submit: { ar: "أرسل عبر واتساب", en: "Send via WhatsApp" },
      helper: {
        ar: "يمكنك أيضًا التواصل بالبريد إذا كان المشروع يحتاج تفاصيل أو ملفات إضافية.",
        en: "You can also switch to email if the project needs files or longer notes.",
      },
    },
    contactCards: [
      {
        icon: "chat",
        title: { ar: "واتساب", en: "WhatsApp" },
        body: {
          ar: "للرد السريع، تحديد الاحتياج، وتجهيز أول تصور.",
          en: "For quick replies, discovery, and first-scope discussions.",
        },
      },
      {
        icon: "mail",
        title: { ar: "البريد", en: "Email" },
        body: {
          ar: "مناسب للعروض الرسمية والملفات وروابط النماذج المرجعية.",
          en: "Best for formal proposals, files, and reference links.",
        },
      },
      {
        icon: "phone",
        title: { ar: "مكالمة تعريفية", en: "Intro call" },
        body: {
          ar: "إذا كان المطلوب System أو أكثر من مسار تنفيذ معًا.",
          en: "Ideal when the scope includes a system or multiple tracks at once.",
        },
      },
    ],
    faq: [
      {
        q: {
          ar: "هل يمكن البدء بموقع سريع ثم التطوير لاحقًا؟",
          en: "Can we launch a fast site first and expand later?",
        },
        a: {
          ar: "نعم. هذه من أفضل طرق التنفيذ. نبدأ بطبقة Static سريعة وواضحة ثم نضيف CRM أو تطبيق أو Automation حسب الحاجة.",
          en: "Yes. That is often the best route. We launch a clear static layer first, then add CRM, apps, or automation as needed.",
        },
      },
      {
        q: {
          ar: "هل POPWAM تعمل فقط على البرمجة؟",
          en: "Does POPWAM only handle coding?",
        },
        a: {
          ar: "لا. التغطية تشمل المحتوى، UX، البنية، SEO، الإيميل، الاستضافة، والتحويلات الإعلانية إذا كان ذلك ضمن الهدف.",
          en: "No. The scope can include copy, UX, architecture, SEO, email, hosting, and paid-conversion support when it serves the goal.",
        },
      },
      {
        q: {
          ar: "هل هذا مناسب للشركات الصغيرة والمتوسطة؟",
          en: "Is this approach suitable for small and mid-size businesses?",
        },
        a: {
          ar: "نعم، خصوصًا عندما يحتاج النشاط لواجهة قوية لكن لا يريد تعقيدًا تشغيليًا أو ميزانية Backend من اليوم الأول.",
          en: "Yes, especially for businesses that need a strong front-end presence without the cost or complexity of a backend from day one.",
        },
      },
    ],
  },
  services: [
    {
      key: "web",
      icon: "window",
      title: { ar: "مواقع و Landing Pages", en: "Websites and Landing Pages" },
      summary: {
        ar: "مواقع تعريفية وتجارية وصفحات هبوط مصممة لتقود العميل إلى خطوة واضحة.",
        en: "Company sites, marketing sites, and landing pages built to move visitors toward a clear next step.",
      },
      bullets: [
        { ar: "Mobile First وواجهة أقرب لفكرة App", en: "Mobile-first, app-like interface patterns" },
        { ar: "صفحات خدمة ومبيعات ومقارنات وعروض", en: "Service, sales, comparison, and proposal pages" },
        { ar: "نصوص وCTA وهيكل Conversion واضح", en: "Clear copy, CTA logic, and conversion flow" },
      ],
      outcome: {
        ar: "أفضل عندما تريد واجهة سريعة، نظيفة، وسهلة الإرسال للعملاء.",
        en: "Best when you need a fast, clean surface that is easy to send to prospects.",
      },
    },
    {
      key: "crm",
      icon: "database",
      title: { ar: "CRM وأنظمة تشغيل", en: "CRM and Internal Systems" },
      summary: {
        ar: "أنظمة مخصصة لإدارة العملاء، المبيعات، المتابعة، أو العمليات الداخلية.",
        en: "Custom systems for managing leads, sales pipelines, follow-ups, or internal operations.",
      },
      bullets: [
        { ar: "لوحات Dashboard واضحة للمدير والفريق", en: "Clear dashboards for leaders and operators" },
        { ar: "صلاحيات وأدوار ونماذج إدخال عملية", en: "Practical roles, permissions, and entry forms" },
        { ar: "ربط مع بريد، واتساب، أو أدوات خارجية", en: "Connections to email, WhatsApp, or outside tools" },
      ],
      outcome: {
        ar: "يقلل العمل اليدوي ويوحد المعلومات بدل التشتيت بين ملفات وأدوات مختلفة.",
        en: "Reduces manual work and centralizes information instead of scattering it across tools.",
      },
    },
    {
      key: "mobile",
      icon: "phone",
      title: { ar: "تطبيقات Flutter", en: "Flutter Mobile Apps" },
      summary: {
        ar: "تطبيقات موبايل سريعة للبائعين أو العملاء أو فرق التشغيل.",
        en: "Fast mobile apps for customers, field teams, or internal operators.",
      },
      bullets: [
        { ar: "MVP عملي سريع الإطلاق", en: "Practical MVP delivery" },
        { ar: "واجهات محسنة للهواتف منذ البداية", en: "Phone-first experiences from the start" },
        { ar: "ربط مع Firebase أو APIs حسب الحاجة", en: "Connections to Firebase or external APIs" },
      ],
      outcome: {
        ar: "مفيد عندما تحتاج تجربة Mobile حقيقية بدل موقع فقط.",
        en: "Useful when the business needs a true mobile layer beyond the web surface.",
      },
    },
    {
      key: "wordpress-firebase",
      icon: "stack",
      title: { ar: "WordPress + Firebase", en: "WordPress + Firebase" },
      summary: {
        ar: "حلول هجينة تجمع سهولة إدارة المحتوى مع طبقات بيانات أو أعضاء أو صلاحيات.",
        en: "Hybrid setups combining content-editing simplicity with data, member, or permissions layers.",
      },
      bullets: [
        { ar: "واجهات محتوى سهلة التسليم للفريق", en: "Editor-friendly content management" },
        { ar: "ربط Forms وأعضاء وبيانات حية", en: "Connected forms, members, and live data" },
        { ar: "مناسب للمنصات الصغيرة والمتوسطة", en: "Well suited for small and mid-sized platforms" },
      ],
      outcome: {
        ar: "خيار جيد عندما تحتاج تحديث المحتوى باستمرار مع وظائف أبعد من WordPress التقليدي.",
        en: "A strong fit when you need frequent content updates plus capabilities beyond standard WordPress.",
      },
    },
    {
      key: "seo",
      icon: "search",
      title: { ar: "SEO وهيكلة المحتوى", en: "SEO and Content Structure" },
      summary: {
        ar: "تهيئة المحتوى والصفحات والروابط والـ Schema لتحسين الظهور العضوي.",
        en: "Page structure, copy, links, and schema tuned for organic discoverability.",
      },
      bullets: [
        { ar: "Meta tags وSchema وClean URLs", en: "Meta tags, schema, and clean URLs" },
        { ar: "محتوى خدمات وFAQ وتوزيع كلمات منطقي", en: "Service copy, FAQs, and logical keyword distribution" },
        { ar: "جاهزية لفهرسة محركات البحث وLLMs", en: "Prepared for search engines and LLM indexing" },
      ],
      outcome: {
        ar: "يجعل الموقع أصلًا تسويقيًا طويل المدى بدل مجرد حملة وقتية.",
        en: "Turns the site into a long-term marketing asset instead of a one-off campaign page.",
      },
    },
    {
      key: "email-migration",
      icon: "mail",
      title: { ar: "ترحيل البريد المؤسسي", en: "Email Migration" },
      summary: {
        ar: "نقل البريد بين Google Workspace وZoho وMicrosoft 365 بدون فوضى تشغيلية.",
        en: "Move business email between Google Workspace, Zoho, and Microsoft 365 with minimal disruption.",
      },
      bullets: [
        { ar: "تجهيز الدومين والسجلات وDNS", en: "Domain, records, and DNS preparation" },
        { ar: "تقسيم الحسابات والفرق والصلاحيات", en: "User, team, and permission planning" },
        { ar: "اختبار التسليم والـ SPF وDKIM وDMARC", en: "Delivery validation and SPF, DKIM, DMARC setup" },
      ],
      outcome: {
        ar: "مهم للشركات التي تريد بريدًا موثوقًا بدون توقف أو ضياع رسائل.",
        en: "Important for businesses that need reliable mail without downtime or lost messages.",
      },
    },
    {
      key: "infrastructure",
      icon: "server",
      title: { ar: "Servers وHosting وDNS", en: "Servers, Hosting, and DNS" },
      summary: {
        ar: "تجهيز الاستضافة، CDN، الحماية، الدومينات، وسجلات البريد والموقع.",
        en: "Hosting, CDN, protection, domains, and the records behind both the site and email stack.",
      },
      bullets: [
        { ar: "Cloudflare وتهيئة DNS عملية", en: "Practical Cloudflare and DNS setups" },
        { ar: "تحسين السرعة والاعتمادية", en: "Speed and reliability improvements" },
        { ar: "ربط النطاقات والخدمات الفرعية بسهولة", en: "Clean domain and subservice connections" },
      ],
      outcome: {
        ar: "يعطي المشروع أساسًا ثابتًا بدل مشاكل نشر ودومينات متكررة.",
        en: "Gives the project a stable base instead of recurring deployment and domain issues.",
      },
    },
    {
      key: "automation",
      icon: "flow",
      title: { ar: "Automation", en: "Automation" },
      summary: {
        ar: "أتمتة تحويلات العملاء والتنبيهات والتحديثات وربط الأدوات اليومية.",
        en: "Automations for lead routing, alerts, status updates, and connected daily tools.",
      },
      bullets: [
        { ar: "ربط Forms وCRM وإيميل وتقارير", en: "Connect forms, CRM, email, and reporting" },
        { ar: "تقليل المتابعة اليدوية المتكررة", en: "Reduce repetitive manual follow-up" },
        { ar: "مسارات موافقة أو إشعارات داخلية", en: "Approval paths and internal notifications" },
      ],
      outcome: {
        ar: "يفيد الفرق الصغيرة التي تحتاج سرعة أعلى بدون توظيف إضافي مبكرًا.",
        en: "Great for small teams that need more speed before adding headcount.",
      },
    },
    {
      key: "ads",
      icon: "megaphone",
      title: { ar: "Google Ads Campaigns", en: "Google Ads Campaigns" },
      summary: {
        ar: "إعداد صفحات ورسائل تحويل وحملات تستفيد من بنية الموقع والبيانات.",
        en: "Campaign structures, landing pages, and conversion messaging tied to the site and data flow.",
      },
      bullets: [
        { ar: "تنسيق الرسائل بين الإعلان والصفحة", en: "Match the ad message to the landing experience" },
        { ar: "تتبع تحويلات وربطها بنتائج التشغيل", en: "Track conversions against operating outcomes" },
        { ar: "اختبار عروض وخدمات ورسائل متعددة", en: "Test multiple offers, services, and value angles" },
      ],
      outcome: {
        ar: "أنسب عندما تريد حملات مدفوعة مبنية على صفحة مصممة أصلًا للتحويل.",
        en: "Best when paid campaigns sit on top of a page already built for conversion.",
      },
    },
    {
      key: "analytics",
      icon: "chart",
      title: { ar: "تقارير وتحليلات تنفيذية", en: "Reporting and Performance Analytics" },
      summary: {
        ar: "عرض الأرقام المهمة في لوحات مفهومة للإدارة والمبيعات والتشغيل.",
        en: "Surface the important numbers in dashboards managers, sales teams, and operators can actually use.",
      },
      bullets: [
        { ar: "تقارير استفسارات وتحويلات ومصادر", en: "Lead, conversion, and source reporting" },
        { ar: "لوحات متابعة للحملات أو الفرق", en: "Dashboards for campaigns or delivery teams" },
        { ar: "مؤشرات تساعد على القرار لا مجرد عرض بيانات", en: "Decision-oriented metrics instead of data dumping" },
      ],
      outcome: {
        ar: "تحول الأرقام إلى قرارات أسرع بدل انتظار تقارير يدوية متأخرة.",
        en: "Turns numbers into faster decisions instead of delayed manual reports.",
      },
    },
  ],
  processSteps: [
    {
      key: "discover",
      icon: "search",
      title: { ar: "اكتشاف الهدف", en: "Discover the objective" },
      body: {
        ar: "نفهم نوع العميل والخدمة والمشكلة الحالية والنتيجة المطلوبة من الموقع أو النظام.",
        en: "We map the buyer type, service, current friction, and the outcome the site or system must deliver.",
      },
      deliverable: { ar: "Brief واضح ومحدد الأولوية", en: "A clear, prioritized brief" },
    },
    {
      key: "structure",
      icon: "stack",
      title: { ar: "هيكلة الحل", en: "Structure the solution" },
      body: {
        ar: "نحدد الصفحات أو الشاشات أو المسارات التشغيلية قبل الدخول في التنفيذ التفصيلي.",
        en: "We define the pages, screens, and operator flows before detailed implementation starts.",
      },
      deliverable: { ar: "خريطة صفحات أو System flow", en: "Page map or system flow" },
    },
    {
      key: "design",
      icon: "spark",
      title: { ar: "تصميم وتجربة", en: "Design and experience" },
      body: {
        ar: "نصمم بطابع حديث يعتمد على الأيقونات والوضوح والحركة الهادئة.",
        en: "We design with a modern icon-driven feel, sharp clarity, and restrained motion.",
      },
      deliverable: { ar: "واجهة قابلة للمراجعة", en: "A reviewable interface layer" },
    },
    {
      key: "build",
      icon: "window",
      title: { ar: "تنفيذ وربط", en: "Build and connect" },
      body: {
        ar: "نبني الطبقة الأمامية أو النظام أو التطبيق ونربطه بالأدوات اللازمة للتشغيل.",
        en: "We build the front-end, system, or app and connect the tools needed for operations.",
      },
      deliverable: { ar: "نسخة قابلة للتجربة", en: "A working release candidate" },
    },
    {
      key: "launch",
      icon: "server",
      title: { ar: "إطلاق وتجهيز بنية الظهور", en: "Launch and discovery setup" },
      body: {
        ar: "نجهز الاستضافة وSEO وSchema والملفات الأساسية ونتأكد من الأداء على الموبايل.",
        en: "We handle hosting, SEO, schema, essential files, and mobile performance checks.",
      },
      deliverable: { ar: "إطلاق منظم", en: "A clean launch" },
    },
    {
      key: "improve",
      icon: "chart",
      title: { ar: "تحسين مستمر", en: "Continuous improvement" },
      body: {
        ar: "بعد الإطلاق نراجع النتائج ونحسن الرسائل أو المسارات أو التكاملات حسب ما يظهر من الاستخدام.",
        en: "After launch we review performance and improve messaging, flows, or integrations based on what usage shows.",
      },
      deliverable: { ar: "قائمة تحسينات قابلة للقياس", en: "A measurable optimization backlog" },
    },
  ],
  projects: [
    {
      slug: "prime-estates-platform",
      sector: "real-estate",
      featured: true,
      title: { ar: "منصة Prime Estates للمبيعات العقارية", en: "Prime Estates Sales Platform" },
      client: { ar: "شركة تطوير عقاري إقليمية", en: "Regional real estate developer" },
      summary: {
        ar: "موقع بيع عقاري مع صفحات مشاريع، نماذج مؤهلة، ولوحة متابعة للمهتمين حسب المرحلة والمصدر.",
        en: "A sales-led real estate site with project pages, qualified lead forms, and follow-up logic grouped by stage and source.",
      },
      challenge: {
        ar: "كانت الشركة تعتمد على صفحات عامة ورسائل واتساب غير منظمة، فكان من الصعب معرفة أي مشروع يجذب عملاء مؤهلين فعلًا.",
        en: "The team relied on generic pages and unstructured WhatsApp inquiries, making it hard to see which development was bringing qualified demand.",
      },
      solution: {
        ar: "تم بناء واجهة Mobile First لكل مشروع مع مقارنة وحدات واضحة وربط الاستفسارات بمسار CRM يوزع العملاء على فريق المبيعات.",
        en: "We built mobile-first project pages, clear unit-comparison flows, and a CRM-ready inquiry path that routes leads into the sales team workflow.",
      },
      impact: [
        { ar: "زيادة الاستفسارات المؤهلة من الصفحة الرئيسية وصفحات المشاريع.", en: "More qualified inquiries from the homepage and individual project pages." },
        { ar: "تقليل الوقت الضائع في المتابعة اليدوية الأولية.", en: "Less time wasted on first-stage manual triage." },
        { ar: "إمكانية قياس أداء كل مشروع بشكل منفصل.", en: "Project-by-project performance visibility." },
      ],
      metrics: [
        { value: "3.4x", label: { ar: "ارتفاع في الاستفسارات المؤهلة", en: "qualified lead lift" } },
        { value: "42%", label: { ar: "انخفاض في الوقت الضائع قبل التأهيل", en: "less pre-qualification waste" } },
        { value: "12d", label: { ar: "من الفكرة للإطلاق", en: "from brief to launch" } },
      ],
      services: ["web", "crm", "automation", "seo"],
      stack: ["HTML", "CSS", "JavaScript", "CRM Flow", "Cloudflare"],
      demo: "/demos/prime-estates-platform/",
    },
    {
      slug: "brokerhub-crm",
      sector: "real-estate",
      featured: true,
      title: { ar: "BrokerHub CRM للوسطاء العقاريين", en: "BrokerHub CRM for Property Brokers" },
      client: { ar: "شبكة وسطاء مستقلة", en: "Independent broker network" },
      summary: {
        ar: "CRM خفيف لمتابعة العملاء، الجدولة، حالة الحجز، وملاحظات الزيارات من الهاتف مباشرة.",
        en: "A lightweight CRM for lead tracking, appointments, reservation status, and mobile visit notes.",
      },
      challenge: {
        ar: "المتابعة كانت موزعة بين إكسل وواتساب، لذلك تضيع حالات كثيرة ولا يعرف المدير أين تتوقف الصفقات.",
        en: "Follow-ups were split across spreadsheets and chat threads, so deals stalled without visibility into where they broke down.",
      },
      solution: {
        ar: "تم تصميم لوحة تشغيل مع حالات بيع واضحة وفلاتر حسب المشروع والوسيط ومصدر العميل.",
        en: "We designed an operator dashboard with clear sales stages and filters by project, broker, and lead source.",
      },
      impact: [
        { ar: "توثيق أفضل لكل عميل وكل زيارة.", en: "Better documentation for every prospect and every visit." },
        { ar: "وضوح أعلى لأداء الوسطاء والمشاريع.", en: "Clearer visibility into broker and project performance." },
        { ar: "تسليم أسرع للمهتمين الجدد إلى الشخص المناسب.", en: "Faster lead routing to the right owner." },
      ],
      metrics: [
        { value: "28%", label: { ar: "تحسن في سرعة الرد", en: "faster first response" } },
        { value: "5", label: { ar: "مراحل بيع موحدة", en: "standardized sales stages" } },
        { value: "1", label: { ar: "واجهة موحدة بدل أدوات متفرقة", en: "single operating workspace" } },
      ],
      services: ["crm", "automation", "analytics"],
      stack: ["JavaScript", "Firebase", "Spreadsheet Sync"],
      demo: "/demos/brokerhub-crm/",
    },
    {
      slug: "blueharbor-launch-page",
      sector: "real-estate",
      featured: false,
      title: { ar: "Landing Page لإطلاق مشروع Blue Harbor", en: "Blue Harbor Launch Landing Page" },
      client: { ar: "مشروع ساحلي جديد", en: "New coastal development" },
      summary: {
        ar: "صفحة هبوط عالية التحويل لحجز الاهتمام الأولي قبل فتح مركز المبيعات.",
        en: "A high-conversion launch page capturing early demand before the physical sales center opened.",
      },
      challenge: {
        ar: "كان المطلوب اختبار الطلب على المشروع سريعًا مع ربط الحملة بإعلان Google ورسائل واتساب.",
        en: "The team needed to test demand quickly while tying campaign traffic into Google Ads and WhatsApp conversion flows.",
      },
      solution: {
        ar: "تم بناء صفحة مختصرة بنمط بطاقة تطبيق مع مزايا المشروع ونموذج قصير واختبار رسائل متعددة.",
        en: "We built a concise app-card style landing page with key project benefits, a short form, and multiple message tests.",
      },
      impact: [
        { ar: "إطلاق أسرع للحملة قبل اكتمال الموقع الكامل.", en: "Campaign launch before the full site was ready." },
        { ar: "رسائل أوضح لما يجذب المهتمين فعليًا.", en: "Clearer insight into which messages actually pulled interest." },
        { ar: "نقطة تحويل مستقلة سهلة القياس.", en: "A measurable conversion surface separated from the broader brand site." },
      ],
      metrics: [
        { value: "9d", label: { ar: "مدة التنفيذ", en: "delivery time" } },
        { value: "21%", label: { ar: "متوسط تحويل النموذج", en: "average form conversion" } },
        { value: "4", label: { ar: "رسائل عرض تم اختبارها", en: "tested value angles" } },
      ],
      services: ["web", "ads", "seo"],
      stack: ["HTML", "CSS", "JavaScript", "Google Ads"],
      demo: "/demos/blueharbor-launch-page/",
    },
    {
      slug: "compound-scout-app",
      sector: "real-estate",
      featured: false,
      title: { ar: "تطبيق Compound Scout للمندوبين", en: "Compound Scout Mobile App" },
      client: { ar: "فريق مبيعات ميداني", en: "Field sales team" },
      summary: {
        ar: "تطبيق Flutter يساعد المندوبين على عرض الوحدات، حفظ الملاحظات، ومشاركة الخيارات المناسبة للعملاء.",
        en: "A Flutter app helping field reps showcase units, log notes, and share fitting options with prospects.",
      },
      challenge: {
        ar: "المندوب في الزيارات الخارجية كان يعود إلى ملفات PDF وصور متفرقة بدل أداة موحدة سريعة.",
        en: "Field reps were relying on disconnected PDFs and image folders instead of a single fast tool during site visits.",
      },
      solution: {
        ar: "تم بناء تطبيق موبايل ببحث سريع وفلاتر وأسهم مشاركة للوحدات وربط ملاحظات كل زيارة.",
        en: "We shipped a mobile app with quick search, filters, shareable unit cards, and visit-note logging.",
      },
      impact: [
        { ar: "تحسين تجربة الشرح أثناء الزيارة.", en: "A smoother on-site explanation flow." },
        { ar: "تقليل الاعتماد على ملفات قديمة أو غير محدثة.", en: "Less reliance on outdated materials." },
        { ar: "استفادة أفضل من بيانات الاهتمام بعد كل زيارة.", en: "Better capture of post-visit interest signals." },
      ],
      metrics: [
        { value: "2m", label: { ar: "لتجهيز العرض المناسب", en: "to prepare the right shortlist" } },
        { value: "60%", label: { ar: "تقليل زمن البحث اليدوي", en: "less manual searching" } },
        { value: "Flutter", label: { ar: "تجربة موبايل أصلية", en: "native-like mobile layer" } },
      ],
      services: ["mobile", "crm", "analytics"],
      stack: ["Flutter", "Firebase", "Push Notifications"],
      demo: "/demos/compound-scout-app/",
    },
    {
      slug: "rental-ops-dashboard",
      sector: "real-estate",
      featured: false,
      title: { ar: "لوحة Rental Ops لإدارة العقارات المؤجرة", en: "Rental Ops Dashboard" },
      client: { ar: "شركة إدارة عقارات", en: "Property management company" },
      summary: {
        ar: "لوحة تشغيل لإدارة الوحدات، الصيانة، المستأجرين، والفواتير الأساسية.",
        en: "An operating dashboard for units, maintenance tickets, tenant tracking, and key billing checkpoints.",
      },
      challenge: {
        ar: "الفريق كان يتعامل مع طلبات الصيانة والمستأجرين عبر الهاتف فقط، مع فقدان التتبع على مستوى الوحدة.",
        en: "The team handled maintenance and tenant requests mostly by phone, losing unit-level visibility.",
      },
      solution: {
        ar: "أنشأنا لوحة موحدة بحالات واضحة للطلبات وربط لكل وحدة وسجل نشاط داخلي للفريق.",
        en: "We created a unified dashboard with request stages, per-unit history, and an internal activity log.",
      },
      impact: [
        { ar: "تنظيم أعلى في متابعة طلبات الصيانة.", en: "More organized maintenance follow-up." },
        { ar: "تقليل الضياع بين الاتصالات الفردية.", en: "Less leakage across one-off phone interactions." },
        { ar: "رؤية أسرع لحالة كل وحدة ومستأجر.", en: "Faster visibility into each unit and tenant." },
      ],
      metrics: [
        { value: "37%", label: { ar: "تقليل الطلبات غير الموثقة", en: "fewer undocumented requests" } },
        { value: "24h", label: { ar: "متوسط أول تحديث للحالة", en: "average first status update" } },
        { value: "1", label: { ar: "سجل موحد لكل وحدة", en: "single record per unit" } },
      ],
      services: ["crm", "automation", "analytics"],
      stack: ["JavaScript", "Firebase", "Email Alerts"],
      demo: "/demos/rental-ops-dashboard/",
    },
    {
      slug: "clinic-booking-pro",
      sector: "healthcare",
      featured: true,
      title: { ar: "Clinic Booking Pro", en: "Clinic Booking Pro" },
      client: { ar: "سلسلة عيادات متخصصة", en: "Specialty clinic group" },
      summary: {
        ar: "موقع حجز مواعيد مع صفحات خدمات، أطباء، وجدولة مبسطة للموبايل.",
        en: "An appointment-focused clinic site with doctor profiles, service pages, and a mobile-friendly booking flow.",
      },
      challenge: {
        ar: "كانت الحجوزات تأتي من أرقام متعددة وصفحات متفرقة بدون توحيد للمعلومات المطلوبة قبل الرد.",
        en: "Bookings were arriving from multiple numbers and scattered pages without standardized intake details.",
      },
      solution: {
        ar: "تم تنظيم الموقع حول العيادات والخدمات والأطباء مع نموذج حجز قصير ورسائل متابعة تلقائية.",
        en: "We organized the site around clinics, services, and doctors, then added a concise booking form and follow-up automation.",
      },
      impact: [
        { ar: "تحسين جودة بيانات الحجز قبل التواصل.", en: "Better booking data before the first outreach." },
        { ar: "تجربة أبسط للموبايل خصوصًا للمرضى الجدد.", en: "A simpler mobile flow, especially for new patients." },
        { ar: "تقليل الأخطاء في توجيه المواعيد للتخصص المناسب.", en: "Fewer routing mistakes across specialties." },
      ],
      metrics: [
        { value: "31%", label: { ar: "ارتفاع في الحجوزات المكتملة", en: "completed booking lift" } },
        { value: "7s", label: { ar: "زمن الوصول للحجز من أول شاشة", en: "to reach booking CTA" } },
        { value: "4", label: { ar: "تخصصات داخل مسار واحد", en: "specialties under one flow" } },
      ],
      services: ["web", "automation", "seo"],
      stack: ["HTML", "CSS", "JavaScript", "Calendar Integration"],
      demo: "/demos/clinic-booking-pro/",
    },
    {
      slug: "dental-branch-site",
      sector: "healthcare",
      featured: false,
      title: { ar: "موقع فروع Bright Dental", en: "Bright Dental Branch Site" },
      client: { ar: "سلسلة عيادات أسنان", en: "Dental branch chain" },
      summary: {
        ar: "موقع تعريفي يبرز الفروع والخدمات والعروض ويقود إلى الحجز أو المكالمة المناسبة.",
        en: "A dental brand site highlighting branches, offers, and services while routing users into the right booking or call path.",
      },
      challenge: {
        ar: "المستخدم لا يعرف أي فرع أو خدمة تناسبه، بينما الفريق يستقبل استفسارات عامة يصعب تحويلها بسرعة.",
        en: "Users were unsure which branch or service fit them, while the staff received vague inquiries that slowed conversion.",
      },
      solution: {
        ar: "أنشأنا بنية سهلة للموبايل تربط كل خدمة بأقرب فرع ونقطة تحويل واضحة.",
        en: "We created a phone-first structure tying each service to the nearest branch and a clear next action.",
      },
      impact: [
        { ar: "تحسين وضوح الخدمات وعروضها.", en: "Clearer service and offer presentation." },
        { ar: "توجيه أفضل للمرضى حسب الموقع والخدمة.", en: "Better routing by branch and service." },
        { ar: "واجهة أخف وأسهل للإرسال في الحملات.", en: "A lighter site easier to use in campaigns." },
      ],
      metrics: [
        { value: "5", label: { ar: "فروع ضمن تجربة واحدة", en: "branches in one experience" } },
        { value: "18%", label: { ar: "زيادة مكالمات الفرع المناسب", en: "more correct branch calls" } },
        { value: "94", label: { ar: "نتيجة Lighthouse موبايل", en: "mobile Lighthouse score" } },
      ],
      services: ["web", "seo", "ads"],
      stack: ["HTML", "CSS", "JavaScript"],
      demo: "/demos/dental-branch-site/",
    },
    {
      slug: "telehealth-mobile-suite",
      sector: "healthcare",
      featured: false,
      title: { ar: "Telehealth Mobile Suite", en: "Telehealth Mobile Suite" },
      client: { ar: "خدمة استشارات عن بُعد", en: "Remote consultation service" },
      summary: {
        ar: "تطبيق Flutter للمرضى يسهّل حجز الاستشارة ومتابعة التوصيات والملفات.",
        en: "A Flutter app for booking remote sessions and tracking recommendations and shared files.",
      },
      challenge: {
        ar: "كانت الاستشارات تبدأ من رسائل غير منظمة ويضيع معها تجهيز الموعد والمستندات.",
        en: "Consultations started in unstructured chats, which made prep work and document handling messy.",
      },
      solution: {
        ar: "قمنا بتصميم تجربة موبايل واضحة مع حالة لكل جلسة وتذكيرات ووصول سريع للملفات.",
        en: "We designed a clear mobile experience with per-session status, reminders, and fast file access.",
      },
      impact: [
        { ar: "تقليل التشتت قبل الجلسة.", en: "Less pre-session confusion." },
        { ar: "تجربة متابعة أبسط للمرضى.", en: "Simpler ongoing patient follow-up." },
        { ar: "منصة قابلة للتوسع لخدمات إضافية.", en: "A mobile base ready for future services." },
      ],
      metrics: [
        { value: "22%", label: { ar: "انخفاض في المواعيد الفائتة", en: "fewer missed sessions" } },
        { value: "3", label: { ar: "حالات رئيسية للجلسة", en: "main session states" } },
        { value: "Flutter", label: { ar: "تجربة تطبيق حقيقية", en: "native-like app flow" } },
      ],
      services: ["mobile", "automation", "analytics"],
      stack: ["Flutter", "Firebase", "Secure Storage"],
      demo: "/demos/telehealth-mobile-suite/",
    },
    {
      slug: "lab-booking-system",
      sector: "healthcare",
      featured: false,
      title: { ar: "نظام حجز Lab Booking", en: "Lab Booking System" },
      client: { ar: "مختبر تحاليل", en: "Diagnostic lab" },
      summary: {
        ar: "نظام لحجز التحاليل المنزلية وتتبع العينات وحالة السداد بشكل أبسط للفريق والعميل.",
        en: "A booking and sample-tracking system for home lab visits with cleaner operator and customer flows.",
      },
      challenge: {
        ar: "الطلبات المنزلية كانت تسبب تضاربًا في الجداول وتكرارًا في الاتصالات بين الفريق والعملاء.",
        en: "Home visits created schedule conflicts and repetitive coordination calls between staff and customers.",
      },
      solution: {
        ar: "بنيناه بمراحل حالة واضحة من الطلب إلى السداد والزيارة ثم تسليم النتائج.",
        en: "We mapped the experience into clear states from request to payment, visit, and results delivery.",
      },
      impact: [
        { ar: "جدولة أنظف للطلبات المنزلية.", en: "Cleaner home-visit scheduling." },
        { ar: "تقليل الارتباك داخل فريق العمليات.", en: "Less internal operations confusion." },
        { ar: "تحديثات أفضل للعميل.", en: "Better customer status visibility." },
      ],
      metrics: [
        { value: "45%", label: { ar: "تقليل الاتصالات المتكررة", en: "fewer repetitive calls" } },
        { value: "6", label: { ar: "مراحل تشغيل أساسية", en: "core operating states" } },
        { value: "1", label: { ar: "لوحة متابعة موحدة", en: "single tracking board" } },
      ],
      services: ["crm", "automation", "analytics"],
      stack: ["JavaScript", "Firebase", "Email/SMS Alerts"],
      demo: "/demos/lab-booking-system/",
    },
    {
      slug: "medical-funnel-campaign",
      sector: "healthcare",
      featured: false,
      title: { ar: "Medical Funnel Campaign", en: "Medical Funnel Campaign" },
      client: { ar: "عيادة تجميل", en: "Aesthetic clinic" },
      summary: {
        ar: "صفحة هبوط + حملة Google Ads تستهدف خدمة واحدة برسائل وإثباتات وتجربة حجز سريعة.",
        en: "A focused landing page and Google Ads campaign for one service line with proof, trust, and a fast booking path.",
      },
      challenge: {
        ar: "الإعلانات كانت تذهب إلى موقع عام لا يركز على الخدمة الأساسية، ما يضعف التحويل.",
        en: "Ads were landing on a general site rather than a service-specific experience, hurting conversion.",
      },
      solution: {
        ar: "أنشأنا مسارًا مستقلًا للخدمة مع أسئلة شائعة ومقارنات ورسائل متابعة للحالات الجادة.",
        en: "We created a dedicated service funnel with FAQs, comparisons, and lead follow-up messaging for serious inquiries.",
      },
      impact: [
        { ar: "تحويل أوضح بين الإعلان والصفحة.", en: "Tighter message match between ad and page." },
        { ar: "فلترة أفضل للحالات قبل الاتصال الهاتفي.", en: "Stronger lead filtering before phone contact." },
        { ar: "إمكانية اختبار العروض بوضوح.", en: "Clearer offer testing." },
      ],
      metrics: [
        { value: "2.1x", label: { ar: "تحسن في معدل التحويل", en: "conversion rate improvement" } },
        { value: "3", label: { ar: "زوايا عرض تم اختبارها", en: "offer angles tested" } },
        { value: "11%", label: { ar: "انخفاض تكلفة الاستفسار", en: "lower cost per lead" } },
      ],
      services: ["web", "ads", "seo", "automation"],
      stack: ["HTML", "CSS", "JavaScript", "Google Ads"],
      demo: "/demos/medical-funnel-campaign/",
    },
    {
      slug: "tutor-booking-app",
      sector: "education",
      featured: true,
      title: { ar: "Tutor Booking App", en: "Tutor Booking App" },
      client: { ar: "منصة مدرسين خصوصيين", en: "Private tutor marketplace" },
      summary: {
        ar: "تطبيق وخط سير حجز يربط ولي الأمر بالمدرس المناسب حسب المادة والمرحلة والموقع.",
        en: "A booking app and matching flow that connects parents with the right tutor by subject, level, and location.",
      },
      challenge: {
        ar: "الإدارة كانت تراجع طلبات أولياء الأمور يدويًا وتوزعها على المدرسين بدون مسار واضح أو أرشفة مناسبة.",
        en: "The team manually reviewed parent requests and assigned them to tutors without a clear or well-archived process.",
      },
      solution: {
        ar: "تم بناء تجربة Mobile تشمل فلاتر، ملفات مدرسين، ونظام حالة للحجز والتأكيد والمتابعة.",
        en: "We shipped a mobile experience with filters, tutor profiles, and status flows for booking, confirmation, and follow-up.",
      },
      impact: [
        { ar: "تسريع المطابقة بين الطلب والمدرس المناسب.", en: "Faster matching between demand and the right tutor." },
        { ar: "صورة احترافية أعلى للمنصة أمام أولياء الأمور.", en: "A more professional impression for parents." },
        { ar: "توثيق أفضل لحالة كل طلب.", en: "Stronger tracking for each inquiry." },
      ],
      metrics: [
        { value: "33%", label: { ar: "تسريع في إغلاق أول تواصل", en: "faster first-match closure" } },
        { value: "8", label: { ar: "معايير فلترة رئيسية", en: "key filtering dimensions" } },
        { value: "Flutter", label: { ar: "تجربة هاتف أولًا", en: "phone-first experience" } },
      ],
      services: ["mobile", "crm", "automation"],
      stack: ["Flutter", "Firebase", "Push Notifications"],
      demo: "/demos/tutor-booking-app/",
    },
    {
      slug: "academy-learning-hub",
      sector: "education",
      featured: false,
      title: { ar: "Academy Learning Hub", en: "Academy Learning Hub" },
      client: { ar: "أكاديمية دورات", en: "Course academy" },
      summary: {
        ar: "موقع أكاديمية يشرح المسارات التعليمية ويقود الزائر إلى التسجيل أو طلب استشارة.",
        en: "An academy website that explains learning tracks and guides visitors into registration or course advice.",
      },
      challenge: {
        ar: "العروض التعليمية الكثيرة كانت تجعل الزائر يضيع بين المسارات المختلفة ولا يعرف نقطة البداية.",
        en: "Too many educational offers made it hard for visitors to identify the right starting point.",
      },
      solution: {
        ar: "بنيناه حول مسارات واضحة مع صفحات مقارنة وأسئلة شائعة وCTA حسب هدف المتعلم.",
        en: "We restructured it around clear tracks, comparison pages, FAQs, and goal-based CTAs.",
      },
      impact: [
        { ar: "وضوح أعلى للمسارات التعليمية.", en: "Greater clarity across course paths." },
        { ar: "استفسارات أدق بدل رسائل عامة.", en: "More specific inquiries instead of generic messages." },
        { ar: "صفحات أسهل في الإعلانات العضوية والمدفوعة.", en: "Pages better suited for organic and paid traffic." },
      ],
      metrics: [
        { value: "14", label: { ar: "صفحة مسار وخدمة", en: "track and service pages" } },
        { value: "26%", label: { ar: "تحسن في الوصول لنموذج التسجيل", en: "more registration-path clicks" } },
        { value: "92", label: { ar: "نتيجة أداء الموبايل", en: "mobile performance score" } },
      ],
      services: ["web", "seo", "ads"],
      stack: ["HTML", "CSS", "JavaScript"],
      demo: "/demos/academy-learning-hub/",
    },
    {
      slug: "school-parent-portal",
      sector: "education",
      featured: false,
      title: { ar: "School Parent Portal", en: "School Parent Portal" },
      client: { ar: "مدرسة خاصة", en: "Private school" },
      summary: {
        ar: "بوابة مبسطة لأولياء الأمور لعرض الأخبار والرسوم والمستندات الأساسية وتحديث الطلبات.",
        en: "A simplified parent portal for updates, fee checkpoints, required documents, and request tracking.",
      },
      challenge: {
        ar: "الإدارة المدرسية كانت تستقبل أسئلة متكررة على قنوات متعددة حول الرسوم والأوراق والمواعيد.",
        en: "School operations kept handling repeat questions across multiple channels about fees, documents, and dates.",
      },
      solution: {
        ar: "تم تنظيم المعلومات في بوابة واحدة مع حالات واضحة للطلبات والأسئلة المتكررة.",
        en: "We organized the information into a single portal with clear request states and FAQ-driven content.",
      },
      impact: [
        { ar: "تقليل الضغط على الإدارة.", en: "Reduced load on admin teams." },
        { ar: "وضوح أعلى لأولياء الأمور.", en: "Clearer visibility for parents." },
        { ar: "واجهة سهلة للهواتف بدون تعقيد غير ضروري.", en: "A phone-friendly experience without unnecessary complexity." },
      ],
      metrics: [
        { value: "39%", label: { ar: "انخفاض الأسئلة المتكررة", en: "fewer repetitive inquiries" } },
        { value: "1", label: { ar: "مرجع موحد للمعلومات", en: "single information hub" } },
        { value: "6", label: { ar: "أنواع طلبات أساسية", en: "core request types" } },
      ],
      services: ["wordpress-firebase", "automation", "seo"],
      stack: ["WordPress", "Firebase", "Cloudflare"],
      demo: "/demos/school-parent-portal/",
    },
    {
      slug: "executive-profile-site",
      sector: "corporate",
      featured: true,
      title: { ar: "Executive Profile Site", en: "Executive Profile Site" },
      client: { ar: "شركة استشارات", en: "Consulting firm" },
      summary: {
        ar: "موقع بروفايل شركات يشرح الخدمات، القطاعات، ودراسات حالة مختصرة بلغة مقنعة.",
        en: "A corporate profile site explaining services, sectors, and proof points in a persuasive format.",
      },
      challenge: {
        ar: "الملف التعريفي القديم PDF فقط ولا يساعد في الإرسال السريع أو الظهور في البحث أو إضافة تحديثات.",
        en: "The old company profile lived only as a PDF, which made it hard to share, search, or update quickly.",
      },
      solution: {
        ar: "حولنا البروفايل إلى موقع خفيف مع أقسام خدمات ومشاريع وأسئلة شائعة ونقاط تواصل واضحة.",
        en: "We transformed the profile into a lightweight site with service sections, project proof, FAQs, and clear contact routes.",
      },
      impact: [
        { ar: "سهولة أعلى في إرسال الملف للشركات المحتملة.", en: "Easier sharing with prospective clients." },
        { ar: "تحسين الظهور والاحترافية مقارنة بـ PDF منفصل.", en: "Stronger discoverability and professionalism than a standalone PDF." },
        { ar: "قابلية أسهل لتحديث المحتوى والخدمات.", en: "Simpler ongoing updates to services and positioning." },
      ],
      metrics: [
        { value: "1", label: { ar: "بروفايل حي بدل ملف ثابت", en: "live profile instead of static PDF" } },
        { value: "8", label: { ar: "صفحات خدمة مقسمة", en: "segmented service sections" } },
        { value: "95", label: { ar: "سرعة موبايل", en: "mobile speed score" } },
      ],
      services: ["web", "seo", "analytics"],
      stack: ["HTML", "CSS", "JavaScript"],
      demo: "/demos/executive-profile-site/",
    },
    {
      slug: "manufacturing-erp-lite",
      sector: "corporate",
      featured: false,
      title: { ar: "Manufacturing ERP Lite", en: "Manufacturing ERP Lite" },
      client: { ar: "مصنع متوسط الحجم", en: "Mid-size manufacturer" },
      summary: {
        ar: "نظام داخلي مبسط لتتبع أوامر العمل، التسليمات، ومتابعة الحالة بين الأقسام.",
        en: "A simplified internal system for work orders, delivery checkpoints, and cross-team status tracking.",
      },
      challenge: {
        ar: "كان المصنع يعتمد على أوراق ورسائل منفصلة بين الإنتاج والمخزن والإدارة، مما يسبب تأخيرًا وتضاربًا.",
        en: "The factory relied on paper and fragmented messages between production, inventory, and management, causing delays and mismatch.",
      },
      solution: {
        ar: "صممنا مسار حالة واضح لكل أمر عمل ولوحة تلخص ما هو متأخر وما هو جاهز للتسليم.",
        en: "We built clear work-order stages and a summary board showing what was delayed and what was ready to ship.",
      },
      impact: [
        { ar: "رؤية أوضح لحالة التشغيل اليومية.", en: "Better daily operations visibility." },
        { ar: "تقليل الالتباس بين الفرق.", en: "Less confusion between teams." },
        { ar: "بداية عملية قبل الاستثمار في ERP كبير.", en: "A practical stepping stone before a heavier ERP investment." },
      ],
      metrics: [
        { value: "5", label: { ar: "أقسام تشغيل تحت لوحة واحدة", en: "functions under one board" } },
        { value: "29%", label: { ar: "انخفاض التأخير غير الموثق", en: "less undocumented delay" } },
        { value: "1w", label: { ar: "لتجهيز النسخة الأولى", en: "to deliver first version" } },
      ],
      services: ["crm", "automation", "analytics"],
      stack: ["JavaScript", "Firebase", "Email Alerts"],
      demo: "/demos/manufacturing-erp-lite/",
    },
    {
      slug: "law-firm-intake-site",
      sector: "corporate",
      featured: false,
      title: { ar: "Law Firm Intake Site", en: "Law Firm Intake Site" },
      client: { ar: "مكتب قانوني", en: "Law office" },
      summary: {
        ar: "موقع خدمات قانونية يركز على أنواع القضايا، الأسئلة الشائعة، ونموذج تأهيل أولي.",
        en: "A legal services site centered around case types, FAQs, and a first-pass qualification form.",
      },
      challenge: {
        ar: "الاستفسارات كانت عامة جدًا، ما يجعل الفريق يضيّع وقتًا في فرز الحالات غير المناسبة.",
        en: "Inquiries were too broad, forcing the firm to spend time sorting out unsuitable cases.",
      },
      solution: {
        ar: "هيكلنا الخدمات حسب نوع القضية وأضفنا أسئلة تأهيل قبل الحجز أو التواصل المباشر.",
        en: "We organized services by case type and added a pre-qualification layer before booking or direct contact.",
      },
      impact: [
        { ar: "نوعية أفضل من العملاء المحتملين.", en: "Higher-quality potential cases." },
        { ar: "وضوح أكبر في نطاق الخدمات القانونية.", en: "Clearer scope presentation." },
        { ar: "لغة أكثر طمأنة وثقة للمستخدم.", en: "A calmer, trust-focused user experience." },
      ],
      metrics: [
        { value: "24%", label: { ar: "انخفاض الاستفسارات غير الملائمة", en: "fewer unfit inquiries" } },
        { value: "6", label: { ar: "مسارات خدمة مقسمة", en: "segmented service paths" } },
        { value: "10d", label: { ar: "زمن الإطلاق", en: "launch timeline" } },
      ],
      services: ["web", "seo", "automation"],
      stack: ["HTML", "CSS", "JavaScript"],
      demo: "/demos/law-firm-intake-site/",
    },
    {
      slug: "corporate-brand-refresh",
      sector: "corporate",
      featured: false,
      title: { ar: "Corporate Brand Refresh Site", en: "Corporate Brand Refresh Site" },
      client: { ar: "شركة حلول أعمال", en: "Business solutions firm" },
      summary: {
        ar: "إعادة بناء الموقع التعريفي ليحمل الطابع الجديد للشركة مع صفحات خدمة أوضح ودعوات فعل أقوى.",
        en: "A full corporate-site rebuild aligned with a refreshed brand and stronger service-specific calls to action.",
      },
      challenge: {
        ar: "الهوية الجديدة لم تنعكس على الموقع، والرسائل القديمة كانت عامة وغير متخصصة.",
        en: "The new identity was not reflected in the site, and the old messaging felt broad and undifferentiated.",
      },
      solution: {
        ar: "قدمنا واجهة أبيض وأسود مع لون داعم، مع نظام بطاقات وخدمات وخلاصة أعمال حديثة.",
        en: "We introduced a black-and-white system with a strong accent, plus modern service cards and proof-led sections.",
      },
      impact: [
        { ar: "تماسك أكبر بين البراند والواجهة.", en: "Stronger brand-to-site consistency." },
        { ar: "وضوح أفضل لما تقدمه الشركة فعلًا.", en: "Clearer communication of what the company actually delivers." },
        { ar: "موقع قابل للتوسع مع أقسام جديدة مستقبلًا.", en: "A site structure ready for future sections." },
      ],
      metrics: [
        { value: "12", label: { ar: "مكوّنًا موحدًا في النظام البصري", en: "reusable UI patterns" } },
        { value: "3", label: { ar: "خدمات رئيسية أبرزناها", en: "flagship services highlighted" } },
        { value: "96", label: { ar: "أداء سطح المكتب", en: "desktop performance score" } },
      ],
      services: ["web", "seo", "analytics"],
      stack: ["HTML", "CSS", "JavaScript"],
      demo: "/demos/corporate-brand-refresh/",
    },
    {
      slug: "b2b-proposal-hub",
      sector: "corporate",
      featured: false,
      title: { ar: "B2B Proposal Hub", en: "B2B Proposal Hub" },
      client: { ar: "شركة خدمات تقنية", en: "Tech services company" },
      summary: {
        ar: "مركز رقمي لعرض الباقات والعروض ودراسات الحالة بدل إرسال ملفات كثيرة منفصلة.",
        en: "A digital proposal hub replacing fragmented pitch decks and attachments with a single sharable space.",
      },
      challenge: {
        ar: "عملية البيع كانت تعتمد على إرسال عروض مختلفة حسب العميل، ما يستهلك وقتًا ويزيد عدم التناسق.",
        en: "Sales relied on hand-assembled proposal sets, which consumed time and created inconsistency.",
      },
      solution: {
        ar: "بنينا مركزًا موحدًا للعروض والخدمات والمشاريع يمكن تخصيصه حسب القطاع.",
        en: "We built a single hub for offers, services, and case studies that can be tailored per sector.",
      },
      impact: [
        { ar: "تجهيز أسرع للعرض التجاري.", en: "Faster proposal preparation." },
        { ar: "صورة احترافية أعلى أثناء التفاوض.", en: "A sharper presentation during negotiations." },
        { ar: "سهولة إعادة استخدام المحتوى في مواقف مختلفة.", en: "Easy reuse across different sales scenarios." },
      ],
      metrics: [
        { value: "47%", label: { ar: "تقليل وقت إعداد العرض", en: "less proposal prep time" } },
        { value: "1", label: { ar: "رابط موحد بدل مرفقات كثيرة", en: "single link instead of many files" } },
        { value: "7", label: { ar: "أنواع عرض قابلة للتخصيص", en: "customizable proposal modules" } },
      ],
      services: ["web", "automation", "analytics"],
      stack: ["HTML", "CSS", "JavaScript"],
      demo: "/demos/b2b-proposal-hub/",
    },
    {
      slug: "logistics-control-tower",
      sector: "operations",
      featured: true,
      title: { ar: "Logistics Control Tower", en: "Logistics Control Tower" },
      client: { ar: "شركة شحن ونقل", en: "Logistics company" },
      summary: {
        ar: "لوحة تشغيل لمتابعة الشحنات والسائقين والمهام اليومية مع تحديثات سريعة للحالة.",
        en: "An operations board for shipments, drivers, and daily tasks with fast state updates.",
      },
      challenge: {
        ar: "التحديثات كانت تصل متأخرة من السائقين أو عبر اتصالات متفرقة، فلا تظهر الصورة الكاملة للإدارة.",
        en: "Driver updates arrived late or through fragmented calls, leaving management without a full operating picture.",
      },
      solution: {
        ar: "تم توحيد الحالات الأساسية للشحنات وربطها بلوحة تعرض التأخير والأولوية والمهام المفتوحة.",
        en: "We standardized shipment states and surfaced them in a board showing delay, priority, and open work.",
      },
      impact: [
        { ar: "رؤية لحظية أفضل لخط سير الشحنات.", en: "Better real-time shipment visibility." },
        { ar: "تحسين قرار التصعيد أو إعادة التوزيع.", en: "Faster escalation and reassignment decisions." },
        { ar: "تقارير أوضح للإدارة والعميل.", en: "Clearer reporting for managers and clients." },
      ],
      metrics: [
        { value: "32%", label: { ar: "انخفاض وقت تحديث الحالة", en: "faster status updates" } },
        { value: "1", label: { ar: "لوحة عمليات مركزية", en: "central operations board" } },
        { value: "4", label: { ar: "تنبيهات أولوية أساسية", en: "core priority alert types" } },
      ],
      services: ["crm", "automation", "analytics"],
      stack: ["JavaScript", "Firebase", "Map Integrations"],
      demo: "/demos/logistics-control-tower/",
    },
    {
      slug: "hotel-booking-suite",
      sector: "operations",
      featured: false,
      title: { ar: "Hotel Booking Suite", en: "Hotel Booking Suite" },
      client: { ar: "فندق بوتيك", en: "Boutique hotel" },
      summary: {
        ar: "موقع حجز وترويج للفندق يبرز الغرف والعروض ويجمع الطلبات المباشرة بعيدًا عن منصات الوساطة فقط.",
        en: "A booking-focused hotel site presenting rooms and offers while driving more direct requests beyond listing platforms.",
      },
      challenge: {
        ar: "الفندق كان يعتمد على منصات خارجية ولم يكن لديه مسار مباشر قوي للحجوزات الخاصة والعروض.",
        en: "The hotel depended heavily on third-party platforms and lacked a strong direct-booking path.",
      },
      solution: {
        ar: "صممنا واجهة راقية خفيفة مع صفحات غرف وعروض وأسئلة وطلب حجز واضح جدًا للموبايل.",
        en: "We created a clean premium-feel interface with room pages, offers, FAQs, and an obvious mobile-first booking request path.",
      },
      impact: [
        { ar: "زيادة الحجوزات المباشرة.", en: "More direct booking requests." },
        { ar: "صورة أقوى للعلامة الفندقية.", en: "A stronger hospitality brand presence." },
        { ar: "مرجع أوضح للعروض الموسمية.", en: "A clearer home for seasonal offers." },
      ],
      metrics: [
        { value: "19%", label: { ar: "زيادة الطلبات المباشرة", en: "more direct inquiries" } },
        { value: "7", label: { ar: "أنواع غرف ضمن تجربة واحدة", en: "room types in one journey" } },
        { value: "90+", label: { ar: "أداء على الموبايل", en: "mobile performance" } },
      ],
      services: ["web", "seo", "ads"],
      stack: ["HTML", "CSS", "JavaScript"],
      demo: "/demos/hotel-booking-suite/",
    },
    {
      slug: "restaurant-qr-ordering",
      sector: "operations",
      featured: false,
      title: { ar: "Restaurant QR Ordering", en: "Restaurant QR Ordering" },
      client: { ar: "مطعم متعدد الفروع", en: "Multi-branch restaurant" },
      summary: {
        ar: "تجربة طلب QR مبنية كصفحات سريعة تشبه التطبيق وتخفف الاعتماد على القوائم الورقية.",
        en: "A QR-driven ordering flow built as a fast app-like web experience to reduce reliance on printed menus.",
      },
      challenge: {
        ar: "القوائم الورقية والعروض المتغيرة كانت تسبب أخطاء وتأخيرًا في تحديث الأسعار أو الأصناف.",
        en: "Printed menus and changing offers made it slow and error-prone to update prices and menu items.",
      },
      solution: {
        ar: "تم تصميم واجهة قائمة خفيفة مع تقسيم الأصناف والعروض وتوجيه سهل للفروع والطاولات.",
        en: "We designed a lightweight menu interface with category grouping, offer blocks, and branch/table routing.",
      },
      impact: [
        { ar: "تحديث أسرع للقائمة والعروض.", en: "Faster menu and offer updates." },
        { ar: "تجربة أوضح على الهاتف داخل المكان.", en: "Clearer in-venue mobile ordering." },
        { ar: "تقليل تكاليف الطباعة والتعديل اليدوي.", en: "Less printing and manual revision overhead." },
      ],
      metrics: [
        { value: "0", label: { ar: "طباعة دورية للقوائم", en: "recurring print runs" } },
        { value: "5s", label: { ar: "للوصول للقسم المطلوب", en: "to reach a category" } },
        { value: "12", label: { ar: "أقسام أصناف منظمة", en: "organized menu categories" } },
      ],
      services: ["web", "wordpress-firebase", "automation"],
      stack: ["WordPress", "JavaScript", "QR Flow"],
      demo: "/demos/restaurant-qr-ordering/",
    },
    {
      slug: "retail-ops-dashboard",
      sector: "operations",
      featured: false,
      title: { ar: "Retail Ops Dashboard", en: "Retail Ops Dashboard" },
      client: { ar: "متجر متعدد القنوات", en: "Omnichannel retailer" },
      summary: {
        ar: "لوحة متابعة للطلبات، المخزون السريع، وحالة التوصيل مع ملخص يومي للإدارة.",
        en: "A board for orders, fast inventory signals, and delivery status with daily summaries for management.",
      },
      challenge: {
        ar: "المتجر كان يفقد الرؤية بين أوامر الموقع ورسائل السوشيال والمخزون المتاح فعليًا.",
        en: "The retailer lacked visibility across web orders, social messages, and actual stock availability.",
      },
      solution: {
        ar: "قمنا بتجميع المدخلات في لوحة حالة موحدة مع تنبيهات بسيطة لما يحتاج تدخلًا.",
        en: "We grouped the inputs into one status board with light alerts around what needed intervention.",
      },
      impact: [
        { ar: "إدارة أسرع للطلبات اليومية.", en: "Faster day-to-day order handling." },
        { ar: "تقليل التأخير غير الملاحظ.", en: "Fewer unnoticed delays." },
        { ar: "إشارات أوضح لنقاط الضغط التشغيلية.", en: "Clearer signals around operating pressure points." },
      ],
      metrics: [
        { value: "27%", label: { ar: "تحسن في سرعة إقفال الطلب", en: "faster order closure" } },
        { value: "3", label: { ar: "مصادر طلبات تحت لوحة واحدة", en: "order sources unified" } },
        { value: "1", label: { ar: "ملخص يومي واضح", en: "daily executive snapshot" } },
      ],
      services: ["crm", "automation", "analytics"],
      stack: ["JavaScript", "Firebase", "Webhook Integrations"],
      demo: "/demos/retail-ops-dashboard/",
    },
    {
      slug: "contractor-project-portal",
      sector: "operations",
      featured: false,
      title: { ar: "Contractor Project Portal", en: "Contractor Project Portal" },
      client: { ar: "مقاول أعمال وتشطيبات", en: "Contracting and fit-out firm" },
      summary: {
        ar: "بوابة لمتابعة مواقع المشاريع وحالة التنفيذ والمستخلصات والملفات المشتركة مع العملاء.",
        en: "A portal for project-site status, execution updates, payment milestones, and shared files with clients.",
      },
      challenge: {
        ar: "كان العميل يطلب تحديثات مستمرة بينما الفريق يحتفظ بالمعلومات في مجموعات دردشة وصور متفرقة.",
        en: "Clients needed regular updates while the internal team kept progress in scattered chats and photo threads.",
      },
      solution: {
        ar: "أنشأنا بوابة حالة لكل مشروع تعرض الإنجاز الحالي والملاحظات والمرفقات الأساسية بوضوح.",
        en: "We created a project-status portal showing live progress, notes, and key attachments in one place.",
      },
      impact: [
        { ar: "ثقة أعلى من العملاء بسبب الوضوح.", en: "Higher client confidence through transparency." },
        { ar: "تقليل وقت تحديثات الحالة اليدوية.", en: "Less manual time spent on update messages." },
        { ar: "مرجع أسهل للملفات والصور.", en: "A cleaner home for files and progress photos." },
      ],
      metrics: [
        { value: "41%", label: { ar: "تقليل رسائل المتابعة اليدوية", en: "fewer manual update messages" } },
        { value: "8", label: { ar: "مشروعات تتابَع في وقت واحد", en: "parallel tracked jobs" } },
        { value: "1", label: { ar: "بوابة عميل لكل مشروع", en: "client portal per project" } },
      ],
      services: ["wordpress-firebase", "automation", "analytics"],
      stack: ["WordPress", "Firebase", "Cloud Storage"],
      demo: "/demos/contractor-project-portal/",
    },
    {
      slug: "ads-roi-dashboard",
      sector: "marketing",
      featured: true,
      title: { ar: "Ads ROI Dashboard", en: "Ads ROI Dashboard" },
      client: { ar: "فريق تسويق داخلي", en: "In-house marketing team" },
      summary: {
        ar: "لوحة تلخص أداء حملات Google Ads مع الربط بنتائج الاستفسارات والصفحات والخدمات.",
        en: "A dashboard summarizing Google Ads performance and tying it to inquiries, pages, and service lines.",
      },
      challenge: {
        ar: "الفريق يرى أرقام الإعلان لكن لا يربطها بسهولة بجودة العملاء أو الصفحات التي تحقق أفضل عائد.",
        en: "The team could see ad metrics but struggled to connect them to lead quality or the strongest-performing pages.",
      },
      solution: {
        ar: "بنينا طبقة تقارير تنفيذية تربط الحملات بالصفحات ونوع الخدمة ونتائج التأهيل الأولي.",
        en: "We built an executive reporting layer linking campaigns to pages, service type, and first-stage qualification outcomes.",
      },
      impact: [
        { ar: "قرارات أسرع بخصوص الميزانيات والرسائل.", en: "Faster budget and messaging decisions." },
        { ar: "رؤية أوضح لأداء كل Landing Page.", en: "Clearer performance insight by landing page." },
        { ar: "تقليل الاعتماد على تقارير يدوية متفرقة.", en: "Less dependence on fragmented manual reports." },
      ],
      metrics: [
        { value: "1", label: { ar: "لوحة تجمع الأداء والتحويل", en: "dashboard linking spend to outcomes" } },
        { value: "6", label: { ar: "مقاييس قرار أساسية", en: "decision-grade metrics" } },
        { value: "18%", label: { ar: "تحسن في توزيع الميزانية", en: "better budget allocation" } },
      ],
      services: ["ads", "analytics", "automation"],
      stack: ["JavaScript", "Google Ads", "Reporting Layer"],
      demo: "/demos/ads-roi-dashboard/",
    },
    {
      slug: "beauty-clinic-funnel",
      sector: "marketing",
      featured: false,
      title: { ar: "Beauty Clinic Funnel", en: "Beauty Clinic Funnel" },
      client: { ar: "عيادة تجميل", en: "Beauty clinic" },
      summary: {
        ar: "فَنَل لخدمة تجميل محددة يربط الإعلان بصفحة إقناع ورسائل متابعة وتحويل سريع للموبايل.",
        en: "A focused treatment funnel connecting ads to a persuasive mobile page, follow-up messages, and fast lead capture.",
      },
      challenge: {
        ar: "الخدمة كانت تُعرض داخل موقع عام ولا تمتلك صفحة تجيب على الاعتراضات الأساسية أو تبني الثقة بسرعة.",
        en: "The service lived inside a broad site and lacked a page that handled objections or built trust quickly.",
      },
      solution: {
        ar: "قدمنا صفحة مختصرة مع Before/After logic وأسئلة شائعة وعناصر ثقة ورسالة حجز مباشرة.",
        en: "We delivered a concise page with before/after logic, FAQs, trust blocks, and a direct booking message.",
      },
      impact: [
        { ar: "تحويل أعلى من الزيارات المدفوعة.", en: "Stronger conversion from paid traffic." },
        { ar: "حالات أكثر جدية قبل التواصل.", en: "More serious leads before outreach." },
        { ar: "مرونة في اختبار عروض متعددة.", en: "Flexibility in testing different offers." },
      ],
      metrics: [
        { value: "2.6x", label: { ar: "نمو الطلبات المؤهلة", en: "qualified inquiry growth" } },
        { value: "13%", label: { ar: "انخفاض تكلفة التحويل", en: "lower cost per conversion" } },
        { value: "4", label: { ar: "زوايا إقناع قابلة للاختبار", en: "testable persuasion angles" } },
      ],
      services: ["web", "ads", "automation", "seo"],
      stack: ["HTML", "CSS", "JavaScript", "Google Ads"],
      demo: "/demos/beauty-clinic-funnel/",
    },
    {
      slug: "ngo-donation-landing",
      sector: "marketing",
      featured: false,
      title: { ar: "NGO Donation Landing", en: "NGO Donation Landing" },
      client: { ar: "مبادرة مجتمعية", en: "Community initiative" },
      summary: {
        ar: "صفحة توعوية وجمع تبرعات توصل الرسالة بسرعة وتوضح الأثر ونقطة المشاركة.",
        en: "A donation landing page that communicates the mission quickly, shows impact, and directs supporters to act.",
      },
      challenge: {
        ar: "المبادرة كانت تعتمد على منشورات وسوشيال فقط بدون صفحة تجمع القصة والأثر وخيارات المشاركة.",
        en: "The initiative relied on social posts alone with no dedicated page unifying the story, impact, and ways to contribute.",
      },
      solution: {
        ar: "صممنا صفحة قصيرة ذات إيقاع واضح تعرض المشكلة، الأثر، طرق التبرع، والأسئلة الأساسية.",
        en: "We designed a focused page that lays out the problem, impact, donation paths, and the main supporter questions.",
      },
      impact: [
        { ar: "شرح أوضح للمبادرة في رابط واحد.", en: "A clearer single-link explanation for supporters." },
        { ar: "قدرة أعلى على استخدام الصفحة في الحملات.", en: "Better reusability in campaigns." },
        { ar: "تجربة أسرع على الهاتف للمتبرع.", en: "Faster mobile journey for donors." },
      ],
      metrics: [
        { value: "1", label: { ar: "رابط موحد للحملة", en: "single campaign link" } },
        { value: "5", label: { ar: "عناصر ثقة وأثر", en: "impact and trust blocks" } },
        { value: "93", label: { ar: "نتيجة الأداء", en: "performance score" } },
      ],
      services: ["web", "seo", "analytics"],
      stack: ["HTML", "CSS", "JavaScript"],
      demo: "/demos/ngo-donation-landing/",
    },
    {
      slug: "event-ticketing-app",
      sector: "marketing",
      featured: false,
      title: { ar: "Event Ticketing App", en: "Event Ticketing App" },
      client: { ar: "منظم فعاليات", en: "Event organizer" },
      summary: {
        ar: "تطبيق أو تجربة Web App لتوضيح الفعالية وجدولة التذاكر ومتابعة التسجيل.",
        en: "A mobile booking experience for event discovery, ticket choice, and registration follow-up.",
      },
      challenge: {
        ar: "عمليات التسجيل كانت تنتقل بين نماذج ورسائل متعددة مع ضياع التذاكر والحالات المؤكدة.",
        en: "Registrations jumped between forms and messages, making ticket states and confirmations messy.",
      },
      solution: {
        ar: "أنشأنا تدفقًا مبسطًا لاختيار التذكرة والتأكيد والتذكير قبل الحدث.",
        en: "We created a simplified flow for selecting tickets, confirming attendance, and sending reminders.",
      },
      impact: [
        { ar: "تقليل الارتباك قبل الفعالية.", en: "Less pre-event confusion." },
        { ar: "صورة تنظيمية أعلى للمنظم.", en: "A stronger organizer impression." },
        { ar: "معلومات أوضح عن حالة الحضور.", en: "Better visibility into attendee status." },
      ],
      metrics: [
        { value: "34%", label: { ar: "تحسن في إكمال التسجيل", en: "better registration completion" } },
        { value: "3", label: { ar: "حالات تذكرة واضحة", en: "clear ticket states" } },
        { value: "Flutter", label: { ar: "للتجربة الموبايلية", en: "for the mobile layer" } },
      ],
      services: ["mobile", "automation", "analytics"],
      stack: ["Flutter", "Firebase", "QR Passes"],
      demo: "/demos/event-ticketing-app/",
    },
    {
      slug: "membership-portal-wpfb",
      sector: "operations",
      featured: false,
      title: { ar: "Membership Portal WP + Firebase", en: "Membership Portal WP + Firebase" },
      client: { ar: "مجتمع أعمال خاص", en: "Private business community" },
      summary: {
        ar: "منصة أعضاء هجينة تسمح بإدارة المحتوى مع صلاحيات ودخول وبيانات أعضاء خفيفة.",
        en: "A hybrid member portal combining easy content publishing with access control and lightweight member data.",
      },
      challenge: {
        ar: "احتاج العميل سرعة WordPress لكن مع صلاحيات وبيانات لا يوفّرها الحل التقليدي بسهولة.",
        en: "The client wanted WordPress simplicity but needed permissions and data flows beyond the standard setup.",
      },
      solution: {
        ar: "استخدمنا WordPress للواجهة والمحتوى، وFirebase لطبقة العضوية وبعض التفاعلات الحية.",
        en: "We used WordPress for content and presentation, with Firebase powering membership logic and live interactions.",
      },
      impact: [
        { ar: "سهولة إدارة للمحتوى من فريق غير تقني.", en: "Easy content control for non-technical staff." },
        { ar: "تجربة عضوية أنظف من إضافات متزاحمة.", en: "A cleaner member experience than stacking plugins." },
        { ar: "مرونة للتوسع بخدمات أخرى لاحقًا.", en: "Room to grow into more features later." },
      ],
      metrics: [
        { value: "2", label: { ar: "طبقتا النظام الرئيسيتان", en: "main platform layers" } },
        { value: "19%", label: { ar: "تحسن بقاء الأعضاء", en: "better retention signal" } },
        { value: "1", label: { ar: "لوحة محتوى سهلة", en: "editor-friendly workspace" } },
      ],
      services: ["wordpress-firebase", "automation", "analytics"],
      stack: ["WordPress", "Firebase", "JavaScript"],
      demo: "/demos/membership-portal-wpfb/",
    },
    {
      slug: "multi-branch-email-migration",
      sector: "corporate",
      featured: false,
      title: { ar: "Multi-Branch Email Migration", en: "Multi-Branch Email Migration" },
      client: { ar: "شركة بخمس فروع", en: "Five-branch company" },
      summary: {
        ar: "ترحيل من مزود قديم إلى Microsoft 365 مع تنظيف DNS وصلاحيات الفروع ومراجعة التسليم.",
        en: "A migration from a legacy provider to Microsoft 365 including DNS cleanup, branch permissions, and delivery validation.",
      },
      challenge: {
        ar: "البريد كان غير مستقر وبعض الرسائل تذهب إلى Spam مع توزيع غير واضح للصلاحيات بين الفروع.",
        en: "Email delivery was inconsistent, some messages hit spam, and branch permissions were unclear.",
      },
      solution: {
        ar: "أعدنا هيكلة الحسابات والسجلات ومرحلة النقل والاختبار على دفعات لتفادي التوقف.",
        en: "We restructured accounts, records, and the migration sequence in controlled batches to avoid downtime.",
      },
      impact: [
        { ar: "استقرار أعلى للبريد.", en: "More stable business email." },
        { ar: "وضوح أفضل في إدارة الفروع والحسابات.", en: "Clearer branch and account governance." },
        { ar: "انخفاض مشاكل التسليم والتأخير.", en: "Fewer delivery problems and delays." },
      ],
      metrics: [
        { value: "5", label: { ar: "فروع تم نقلها بدون توقف ملحوظ", en: "branches migrated smoothly" } },
        { value: "0", label: { ar: "رسائل حرجة مفقودة", en: "critical emails lost" } },
        { value: "SPF/DKIM", label: { ar: "إعداد تسليم كامل", en: "full delivery setup" } },
      ],
      services: ["email-migration", "infrastructure"],
      stack: ["Microsoft 365", "DNS", "Cloudflare"],
      demo: "/demos/multi-branch-email-migration/",
    },
    {
      slug: "hiring-automation-flow",
      sector: "operations",
      featured: false,
      title: { ar: "Hiring Automation Flow", en: "Hiring Automation Flow" },
      client: { ar: "شركة خدمات سريعة النمو", en: "Fast-growing service company" },
      summary: {
        ar: "مسار أتمتة لطلبات التوظيف والفرز والتنسيق للمقابلات والإشعارات الداخلية.",
        en: "An automation flow for hiring requests, candidate screening, interview coordination, and internal notifications.",
      },
      challenge: {
        ar: "طلبات التوظيف كانت تضيع بين البريد والرسائل ولا يوجد مسار واضح من الطلب حتى المقابلة.",
        en: "Hiring requests got lost across email and messages with no clean path from opening the role to booking interviews.",
      },
      solution: {
        ar: "صممنا نموذج طلب داخلي وربطناه بمراحل مراجعة وتنبيهات وتحديثات حالة للمرشحين.",
        en: "We designed an internal request form tied to review stages, alerts, and candidate status updates.",
      },
      impact: [
        { ar: "تنظيم أعلى لعمليات التوظيف.", en: "Cleaner hiring operations." },
        { ar: "سرعة أكبر في التنسيق بين الموارد البشرية والمديرين.", en: "Faster coordination between HR and hiring managers." },
        { ar: "تقليل الخطوات اليدوية المتكررة.", en: "Less repetitive manual work." },
      ],
      metrics: [
        { value: "44%", label: { ar: "تقليل وقت التنسيق", en: "less coordination time" } },
        { value: "5", label: { ar: "مراحل ترشيح واضحة", en: "clear screening stages" } },
        { value: "1", label: { ar: "مسار طلب موحد", en: "single request flow" } },
      ],
      services: ["automation", "analytics", "crm"],
      stack: ["JavaScript", "Email Alerts", "Workflow Logic"],
      demo: "/demos/hiring-automation-flow/",
    },
  ],
};

module.exports = data;
