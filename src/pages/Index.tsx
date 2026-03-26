import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_SLIDES = [
  {
    img: "https://cdn.poehali.dev/projects/6954bfe6-128d-4f4d-96b0-7855acb4980b/files/f0a28dfa-c51e-4922-a365-4ffec22d988f.jpg",
    label: "Эпичное шоу",
  },
  {
    img: "https://cdn.poehali.dev/projects/6954bfe6-128d-4f4d-96b0-7855acb4980b/files/e41e4a63-8f3b-421b-8d9c-8e3469b9833d.jpg",
    label: "Розовое золото",
  },
  {
    img: "https://cdn.poehali.dev/projects/6954bfe6-128d-4f4d-96b0-7855acb4980b/files/1923f43f-44b9-483b-9911-7b2189b95024.jpg",
    label: "Большой финал",
  },
  {
    img: "https://cdn.poehali.dev/projects/6954bfe6-128d-4f4d-96b0-7855acb4980b/files/2b9dd31b-601d-45e4-a55d-70e127486104.jpg",
    label: "Классика",
  },
];

const CATEGORIES = [
  { id: 1, icon: "🎆", name: "Салюты", desc: "Профессиональные батареи", count: 87, color: "from-red-700 to-orange-600" },
  { id: 2, icon: "🚀", name: "Ракеты", desc: "Одиночные запуски", count: 45, color: "from-orange-600 to-yellow-500" },
  { id: 3, icon: "⛲", name: "Фонтаны", desc: "Наземная пиротехника", count: 63, color: "from-yellow-500 to-amber-600" },
  { id: 4, icon: "🎉", name: "Петарды", desc: "Хлопушки и бенгалы", count: 112, color: "from-amber-600 to-red-600" },
  { id: 5, icon: "🎊", name: "Наборы", desc: "Готовые комплекты", count: 28, color: "from-red-600 to-pink-700" },
  { id: 6, icon: "✨", name: "Бенгалы", desc: "Световые эффекты", count: 34, color: "from-pink-700 to-purple-700" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Звёздный дождь",
    category: "Салют",
    shots: "100 залпов",
    price: 3490,
    oldPrice: 4200,
    badge: "ХИТ",
    badgeColor: "bg-red-600",
    stars: 5,
    reviews: 234,
    emoji: "🎆",
  },
  {
    id: 2,
    name: "Огненный шторм",
    category: "Батарея",
    shots: "200 залпов",
    price: 6990,
    oldPrice: null,
    badge: "НОВИНКА",
    badgeColor: "bg-amber-500",
    stars: 5,
    reviews: 89,
    emoji: "🔥",
  },
  {
    id: 3,
    name: "Золотой фейерверк",
    category: "Салют",
    shots: "49 залпов",
    price: 1890,
    oldPrice: 2300,
    badge: "-18%",
    badgeColor: "bg-orange-600",
    stars: 4,
    reviews: 156,
    emoji: "✨",
  },
  {
    id: 4,
    name: "Праздничный набор",
    category: "Набор",
    shots: "Ассорти",
    price: 4990,
    oldPrice: 5800,
    badge: "ВЫГОДА",
    badgeColor: "bg-green-700",
    stars: 5,
    reviews: 312,
    emoji: "🎊",
  },
  {
    id: 5,
    name: "Серебряный каскад",
    category: "Фонтан",
    shots: "60 сек",
    price: 990,
    oldPrice: null,
    badge: null,
    badgeColor: "",
    stars: 4,
    reviews: 67,
    emoji: "⛲",
  },
  {
    id: 6,
    name: "Галактика",
    category: "Батарея",
    shots: "150 залпов",
    price: 8990,
    oldPrice: 10500,
    badge: "ПРЕМИУМ",
    badgeColor: "bg-purple-700",
    stars: 5,
    reviews: 45,
    emoji: "🌌",
  },
];

const ADVANTAGES = [
  { icon: "ShieldCheck", title: "Сертифицированная продукция", desc: "Вся пиротехника прошла сертификацию и соответствует ГОСТ" },
  { icon: "Truck", title: "Доставка по всей России", desc: "Быстрая доставка курьером или до пункта выдачи" },
  { icon: "Package", title: "Более 300 позиций", desc: "Огромный выбор от петард до профессиональных шоу" },
  { icon: "Headphones", title: "Консультация эксперта", desc: "Поможем подобрать пиротехнику под ваш праздник" },
];

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    delay: `${(i * 0.4) % 3}s`,
    size: i % 3 === 0 ? "w-1 h-1" : "w-0.5 h-0.5",
    color: i % 3 === 0 ? "bg-yellow-400" : i % 3 === 1 ? "bg-orange-400" : "bg-red-400",
    duration: `${2 + (i * 0.3) % 3}s`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.size} ${p.color}`}
          style={{
            left: p.left,
            top: p.top,
            animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < stars ? "text-yellow-400" : "text-gray-600"} style={{ fontSize: "12px" }}>★</span>
      ))}
    </div>
  );
}

export default function Index() {
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [activeSlide, setActiveSlide] = useState(0);
  const [typedText, setTypedText] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const SLOGAN = "В нашей Галактике только одна Планета фейерверков";

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    setTypedText("");
    const timer = setInterval(() => {
      if (i < SLOGAN.length) {
        setTypedText(SLOGAN.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToCart = (id: number) => {
    setCartCount((c) => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="min-h-screen font-roboto" style={{ background: "#0A0A0F", color: "#FFF8E7" }}>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(10,10,15,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,107,0,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎆</div>
              <div>
                <div className="font-oswald font-bold text-lg leading-none" style={{ color: "#FF6EC7" }}>ПЛАНЕТА</div>
                <div className="font-oswald text-xs tracking-[0.2em]" style={{ color: "#FF6B00" }}>ФЕЙЕРВЕРКОВ</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Каталог", "Акции", "О нас", "Доставка", "Контакты"].map((item) => (
                <a key={item} href="#" className="font-roboto text-sm font-medium transition-colors hover:text-yellow-400" style={{ color: "rgba(255,248,231,0.75)" }}>
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a href="tel:+78001234567" className="hidden sm:flex items-center gap-2 text-sm font-medium" style={{ color: "#FF6EC7" }}>
                <Icon name="Phone" size={16} />
                <span className="font-oswald">8 800 123-45-67</span>
              </a>
              <button
                className="relative p-2 rounded-lg transition-all hover:scale-110"
                style={{ background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.3)" }}
              >
                <Icon name="ShoppingCart" size={20} style={{ color: "#FF6B00" }} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center animate-scale-in"
                    style={{ background: "#FF1A1A", color: "white" }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Slider backgrounds */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeSlide === i ? 1 : 0 }}
          >
            <img
              src={slide.img}
              alt={slide.label}
              className="w-full h-full object-cover"
              style={{ opacity: 0.5 }}
            />
          </div>
        ))}

        {/* Overlay gradients */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(to right, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.6) 55%, rgba(10,10,15,0.4) 100%)"
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(to top, rgba(10,10,15,0.85) 0%, transparent 40%)"
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 15% 60%, rgba(255,45,138,0.1) 0%, transparent 55%)"
        }} />

        <FloatingParticles />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 animate-fade-in"
              style={{ background: "rgba(255,45,138,0.15)", border: "1px solid rgba(255,45,138,0.35)", color: "#FF6EC7", animationDelay: "0.1s", opacity: 0, letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FF2D8A" }} />
              Более 300 видов пиротехники
            </div>

            {/* Main headline */}
            <h1
              className="font-oswald font-bold leading-[0.95] mb-6 animate-fade-in"
              style={{ fontSize: "clamp(3.2rem, 9vw, 6.5rem)", animationDelay: "0.15s", opacity: 0 }}
            >
              <span style={{ color: "#FFF8E7" }}>ВЗОРВИ</span>
              <br />
              <span className="text-gradient-fire">ПРАЗДНИК</span>
            </h1>

            {/* Slogan typewriter */}
            <div
              className="mb-10 animate-fade-in"
              style={{ animationDelay: "0.3s", opacity: 0 }}
            >
              <p
                className="font-roboto text-lg md:text-xl leading-relaxed"
                style={{ color: "rgba(255,248,231,0.75)", maxWidth: "520px" }}
              >
                {typedText}
                <span
                  className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse"
                  style={{ background: "#FF2D8A", opacity: typedText.length < SLOGAN.length ? 1 : 0 }}
                />
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
              <button
                className="btn-gold px-9 py-4 rounded-2xl text-base font-bold tracking-wide"
                style={{ fontFamily: "Oswald, sans-serif", fontSize: "1rem" }}
              >
                🎆 Смотреть каталог
              </button>
              <a
                href="#"
                className="flex items-center justify-center gap-2 text-sm font-medium transition-all group"
                style={{ color: "rgba(255,248,231,0.55)", letterSpacing: "0.06em", fontFamily: "Oswald, sans-serif", fontSize: "0.9rem", textTransform: "uppercase" }}
              >
                Акции и скидки
                <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 animate-fade-in" style={{ animationDelay: "0.65s", opacity: 0 }}>
              {[
                { value: "300+", label: "товаров" },
                { value: "15 000+", label: "клиентов" },
                { value: "10 лет", label: "на рынке" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-oswald font-bold text-2xl" style={{ color: "#FF2D8A" }}>{stat.value}</span>
                  <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,248,231,0.4)" }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: activeSlide === i ? "28px" : "8px",
                height: "8px",
                background: activeSlide === i ? "#FF2D8A" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 right-8 hidden md:flex flex-col items-center gap-2 animate-float">
          <span className="text-xs tracking-[0.2em]" style={{ color: "rgba(255,248,231,0.3)", writingMode: "vertical-rl" }}>SCROLL</span>
          <Icon name="ChevronDown" size={16} style={{ color: "rgba(255,45,138,0.5)" }} />
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" ref={setRef("categories")} className="py-20" style={{ background: "#0D0D16" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${visibleSections.has("categories") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="font-oswald text-sm tracking-[0.3em] mb-2" style={{ color: "#FF6B00" }}>ЧТО МЫ ПРЕДЛАГАЕМ</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: "#FFF8E7" }}>
              КАТЕГОРИИ <span style={{ color: "#FF2D8A" }}>ТОВАРОВ</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                className={`group relative p-5 rounded-2xl text-center transition-all duration-300 card-glow ${visibleSections.has("categories") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: "#1A1A28", border: "1px solid rgba(255,107,0,0.15)", transitionDelay: `${i * 0.07}s` }}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <div className="font-oswald font-semibold text-sm mb-1" style={{ color: "#FFF8E7" }}>{cat.name}</div>
                <div className="text-xs mb-1" style={{ color: "rgba(255,248,231,0.5)" }}>{cat.desc}</div>
                <div className="text-xs font-medium" style={{ color: "#FF6B00" }}>{cat.count} шт.</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-6"
            style={{ background: "linear-gradient(135deg, #1a0505 0%, #2d0a00 40%, #1a0505 100%)", border: "1px solid rgba(255,107,0,0.3)", boxShadow: "0 0 60px rgba(255,107,0,0.15)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(255,107,0,0.1)" }} />
            <div className="text-6xl md:text-8xl animate-float">🎆</div>
            <div className="flex-1 text-center md:text-left">
              <div className="font-oswald text-sm tracking-widest mb-2" style={{ color: "#FF6B00" }}>АКЦИЯ НЕДЕЛИ</div>
              <h3 className="font-oswald font-bold text-3xl md:text-4xl mb-2" style={{ color: "#FF6EC7" }}>СКИДКА 20% НА ВСЕ НАБОРЫ</h3>
              <p style={{ color: "rgba(255,248,231,0.65)" }}>Только до конца месяца. Успей заказать праздничные комплекты по специальной цене!</p>
            </div>
            <button className="btn-fire px-8 py-4 rounded-xl text-base whitespace-nowrap" style={{ fontFamily: "Oswald, sans-serif" }}>
              Получить скидку
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" ref={setRef("products")} className="py-20" style={{ background: "#0A0A0F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-end justify-between mb-10 transition-all duration-700 ${visibleSections.has("products") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="font-oswald text-sm tracking-[0.3em] mb-2" style={{ color: "#FF6B00" }}>НАШИ ТОВАРЫ</div>
              <h2 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: "#FFF8E7" }}>
                ПОПУЛЯРНЫЕ <span style={{ color: "#FF2D8A" }}>ПОЗИЦИИ</span>
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-yellow-400 transition-colors" style={{ color: "rgba(255,248,231,0.6)" }}>
              Все товары <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product, i) => (
              <div
                key={product.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 card-glow ${visibleSections.has("products") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: "#1A1A28", border: "1px solid rgba(255,107,0,0.15)", transitionDelay: `${i * 0.08}s` }}
              >
                {product.badge && (
                  <div className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded text-xs font-bold ${product.badgeColor}`} style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                    {product.badge}
                  </div>
                )}

                <div className="relative h-48 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #12121E, #1E1E30)" }}>
                  <div className="text-7xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{product.emoji}</div>
                  <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at center, rgba(255,107,0,0.4) 0%, transparent 70%)" }} />
                </div>

                <div className="p-5">
                  <div className="text-xs mb-1 font-medium" style={{ color: "#FF6B00" }}>{product.category} · {product.shots}</div>
                  <h3 className="font-oswald font-semibold text-xl mb-2" style={{ color: "#FFF8E7" }}>{product.name}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <StarRating stars={product.stars} />
                    <span className="text-xs" style={{ color: "rgba(255,248,231,0.4)" }}>{product.reviews} отзывов</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-oswald font-bold text-2xl" style={{ color: "#FF6EC7" }}>
                        {product.price.toLocaleString("ru-RU")} ₽
                      </span>
                      {product.oldPrice && (
                        <span className="ml-2 text-sm line-through" style={{ color: "rgba(255,248,231,0.35)" }}>
                          {product.oldPrice.toLocaleString("ru-RU")} ₽
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="p-3 rounded-xl transition-all hover:scale-110 active:scale-95"
                      style={{
                        background: addedId === product.id ? "rgba(74,222,128,0.2)" : "rgba(255,107,0,0.2)",
                        border: addedId === product.id ? "1px solid rgba(74,222,128,0.5)" : "1px solid rgba(255,107,0,0.4)",
                        color: addedId === product.id ? "#4ade80" : "#FF6B00",
                      }}
                    >
                      <Icon name={addedId === product.id ? "Check" : "ShoppingCart"} size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="btn-fire px-10 py-4 rounded-xl text-lg" style={{ fontFamily: "Oswald, sans-serif" }}>
              Показать все товары
            </button>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" ref={setRef("advantages")} className="py-20" style={{ background: "#0D0D16" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${visibleSections.has("advantages") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="font-oswald text-sm tracking-[0.3em] mb-2" style={{ color: "#FF6B00" }}>ПОЧЕМУ МЫ</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: "#FFF8E7" }}>
              НАШИ <span style={{ color: "#FF2D8A" }}>ПРЕИМУЩЕСТВА</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((adv, i) => (
              <div
                key={adv.title}
                className={`p-6 rounded-2xl transition-all duration-500 card-glow ${visibleSections.has("advantages") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: "#1A1A28", border: "1px solid rgba(255,107,0,0.15)", transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center animate-glow-pulse"
                  style={{ background: "rgba(255,45,138,0.12)", border: "1px solid rgba(255,45,138,0.3)" }}
                >
                  <Icon name={adv.icon} size={22} style={{ color: "#FF2D8A" }} />
                </div>
                <h3 className="font-oswald font-semibold text-lg mb-2" style={{ color: "#FFF8E7" }}>{adv.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,248,231,0.55)" }}>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" ref={setRef("cta")} className="py-24 relative overflow-hidden" style={{ background: "#0A0A0F" }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, #FF2D8A, transparent)" }} />
        </div>

        <div className={`max-w-3xl mx-auto px-4 text-center transition-all duration-700 ${visibleSections.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-5xl mb-6 animate-float">🎆</div>
          <h2 className="font-oswald font-bold text-4xl md:text-5xl mb-4" style={{ color: "#FFF8E7" }}>
            ГОТОВ УСТРОИТЬ<br /><span className="text-gradient-fire">НЕЗАБЫВАЕМОЕ ШОУ?</span>
          </h2>
          <p className="text-lg mb-8" style={{ color: "rgba(255,248,231,0.6)" }}>
            Свяжитесь с нами — поможем подобрать пиротехнику под ваш бюджет и подарим промокод на первый заказ!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-gold px-8 py-4 rounded-xl text-lg font-bold" style={{ fontFamily: "Oswald, sans-serif" }}>
              📞 Заказать консультацию
            </button>
            <button
              className="px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:bg-white/10"
              style={{ fontFamily: "Oswald, sans-serif", border: "2px solid rgba(255,107,0,0.5)", color: "#FF6B00" }}
            >
              Написать в WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#070710", borderTop: "1px solid rgba(255,107,0,0.15)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎆</span>
                <div>
                  <div className="font-oswald font-bold text-xl" style={{ color: "#FF6EC7" }}>ПЛАНЕТА</div>
                  <div className="font-oswald text-xs tracking-widest" style={{ color: "#FF6B00" }}>ФЕЙЕРВЕРКОВ</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,248,231,0.45)" }}>
                Профессиональная пиротехника для любого праздника. Работаем с 2014 года.
              </p>
            </div>

            {[
              { title: "Каталог", links: ["Салюты", "Ракеты", "Фонтаны", "Петарды", "Наборы"] },
              { title: "Компания", links: ["О нас", "Доставка", "Оплата", "Возврат", "Вакансии"] },
              { title: "Контакты", links: ["8 800 123-45-67", "info@planeta-fw.ru", "Пн–Вс 9:00–21:00"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-oswald font-semibold text-base mb-4" style={{ color: "#FF6EC7" }}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-yellow-400 transition-colors" style={{ color: "rgba(255,248,231,0.5)" }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,107,0,0.12)" }}>
            <p className="text-xs" style={{ color: "rgba(255,248,231,0.3)" }}>© 2024 Планета Фейерверков. Все права защищены.</p>
            <p className="text-xs" style={{ color: "rgba(255,248,231,0.3)" }}>Пиротехника для лиц старше 18 лет. Используйте с соблюдением правил безопасности.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}