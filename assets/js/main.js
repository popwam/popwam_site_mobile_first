// year
document.getElementById('year').textContent = new Date().getFullYear();

// schema injection (org)
const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'POPWAM',
    'url': 'https://popwam.com',
    'logo': 'https://popwam.com/assets/images/logo.svg',
    'sameAs': ['https://github.com/popwam', 'https://linkedin.com/company/popwam']
};
document.getElementById('org-schema').textContent = JSON.stringify(orgSchema);

// translations
const translations = {
    ar: {
        'meta.title': 'POPWAM | برمجة و تحول رقمي',
        'meta.description': 'وكالة برمجيات مصرية تقدّم مواقع، تطبيقات، وأنظمة مخصّصة للنمو السريع.',
        'nav.home': 'الرئيسية', 'nav.services': 'الخدمات', 'nav.portfolio': 'الأعمال', 'nav.process': 'المنهجية', 'nav.contact': 'تواصل',
        'home.hero_h1': 'نحو مستقبل رقمي لشركتك', 'home.hero_p': 'نحن نبني مواقع وأنظمة تسرّع نموّك وتجذب العملاء',
        'cta.contact': 'ابدأ الآن',
        'services.title': 'خدماتنا', 'portfolio.title': 'مشاريعنا', 'process.title': 'منهجية العمل', 'contact.title': 'تواصل معنا', 'contact.name': 'الاسم', 'contact.email': 'البريد الإلكتروني', 'contact.message': 'رسالتك', 'contact.send': 'أرسل'
    },
    en: {
        'meta.title': 'POPWAM | Software & Digital Transformation',
        'meta.description': 'Egyptian tech agency delivering custom websites, apps & systems for rapid growth.',
        'nav.home': 'Home', 'nav.services': 'Services', 'nav.portfolio': 'Portfolio', 'nav.process': 'Process', 'nav.contact': 'Contact',
        'home.hero_h1': 'Digitally Accelerate Your Business', 'home.hero_p': 'We build sites & systems that boost your growth and attract customers',
        'cta.contact': 'Let’s Start',
        'services.title': 'Our Services', 'portfolio.title': 'Our Work', 'process.title': 'Our Process', 'contact.title': 'Get in Touch', 'contact.name': 'Name', 'contact.email': 'Email', 'contact.message': 'Message', 'contact.send': 'Send'
    }
};

function setLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.getElementById('langToggle').textContent = lang === 'ar' ? 'EN' : 'ع';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
}
setLang('ar');

document.getElementById('langToggle').addEventListener('click', () => {
    const current = document.documentElement.lang;
    setLang(current === 'ar' ? 'en' : 'ar');
});

// load services
const services = [
    { icon: '💻', key: 'web', title: { ar: 'مواقع وتطبيقات ويب', en: 'Web & Landing pages' }, desc: { ar: 'مواقع تجارية سريعة...', en: 'High‑performance websites…' } },
    { icon: '📱', key: 'mobile', title: { ar: 'تطبيقات موبايل', en: 'Mobile Apps' }, desc: { ar: 'تطبيقات Flutter...', en: 'Flutter apps…' } },
    { icon: '🗄️', key: 'crm', title: { ar: 'أنظمة CRM', en: 'CRM / Systems' }, desc: { ar: 'أنظمة مخصصة...', en: 'Custom back‑office systems…' } },
    { icon: '⚙️', key: 'automation', title: { ar: 'أتمتة', en: 'Automation' }, desc: { ar: 'تكامل Zapier ...', en: 'Zapier integrations…' } },
    { icon: '📈', key: 'seo', title: { ar: 'سيو وتحسين أداء', en: 'SEO & Performance' }, desc: { ar: 'تحسين محركات البحث...', en: 'Search Engine Optimization…' } },
    { icon: '✉️', key: 'email', title: { ar: 'ترحيل الإيميل', en: 'Email Migration' }, desc: { ar: 'Google Workspace, Zoho...', en: 'G‑Workspace, Zoho, M365…' } },
]
renderProjects();