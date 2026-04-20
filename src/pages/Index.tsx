import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const slides = [
  {
    id: 1,
    type: "title",
    label: "01",
  },
  {
    id: 2,
    type: "relevance",
    label: "02",
    title: "Актуальность исследования",
    points: [
      "Рост числа пожаров на промышленных объектах требует современных подходов к обеспечению безопасности",
      "Несоответствие действующей нормативной базы современным строительным технологиям и материалам",
      "Необходимость гармонизации российских стандартов с международными требованиями (ISO, EN)",
      "Экономический ущерб от пожаров в РФ ежегодно составляет десятки миллиардов рублей",
    ],
  },
  {
    id: 3,
    type: "object",
    label: "03",
    title: "Объект, предмет и цель",
    items: [
      {
        heading: "Объект исследования",
        text: "Система технического регулирования в области пожарной безопасности зданий и сооружений на территории Российской Федерации",
      },
      {
        heading: "Предмет исследования",
        text: "Нормативно-правовые акты, регулирующие требования к пожарной безопасности объектов капитального строительства",
      },
      {
        heading: "Цель исследования",
        text: "Комплексный анализ действующей системы технического регулирования и разработка предложений по её совершенствованию",
      },
    ],
  },
  {
    id: 4,
    type: "tasks",
    label: "04",
    title: "Задачи исследования",
    tasks: [
      "Изучить историческое развитие нормативной базы в области пожарной безопасности",
      "Провести анализ действующих технических регламентов и сводов правил",
      "Исследовать классификацию объектов по категориям пожарной опасности",
      "Рассмотреть современные методы огнезащиты строительных конструкций",
      "Проанализировать требования к автоматическим системам противопожарной защиты",
      "Разработать рекомендации по совершенствованию системы технического регулирования",
    ],
  },
  {
    id: 5,
    type: "legal",
    label: "05",
    title: "Правовая база",
    categories: [
      {
        name: "Федеральные законы",
        docs: [
          "Федеральный закон № 123-ФЗ «Технический регламент о требованиях пожарной безопасности»",
          "Федеральный закон № 384-ФЗ «Технический регламент о безопасности зданий и сооружений»",
          "Федеральный закон № 69-ФЗ «О пожарной безопасности»",
        ],
      },
      {
        name: "Своды правил",
        docs: [
          "СП 1.13130 — эвакуационные пути и выходы",
          "СП 2.13130 — огнестойкость конструкций",
          "СП 3.13130 — системы оповещения",
          "СП 5.13130 — автоматические установки пожаротушения",
        ],
      },
    ],
  },
  {
    id: 6,
    type: "classification",
    label: "06",
    title: "Классификация объектов",
    categories: [
      { letter: "А", name: "Повышенная взрывопожароопасность", color: "#C0392B" },
      { letter: "Б", name: "Взрывопожароопасность", color: "#E67E22" },
      { letter: "В", name: "Пожароопасность", color: "#F39C12" },
      { letter: "Г", name: "Умеренная пожароопасность", color: "#7F8C8D" },
      { letter: "Д", name: "Пониженная пожароопасность", color: "#27AE60" },
    ],
  },
  {
    id: 7,
    type: "fireprotection",
    label: "07",
    title: "Огнезащита конструкций",
    methods: [
      {
        name: "Конструктивная огнезащита",
        desc: "Облицовка материалами с низкой теплопроводностью: гипсокартон, минеральная вата, вермикулитовые плиты",
      },
      {
        name: "Тонкослойные покрытия",
        desc: "Вспучивающиеся краски и лаки, увеличивающие объём при нагреве и создающие теплоизолирующий слой",
      },
      {
        name: "Толстослойные покрытия",
        desc: "Напыляемые составы на основе цемента, гипса и вермикулита толщиной от 20 до 50 мм",
      },
      {
        name: "Пропитка",
        desc: "Глубокая пропитка антипиренами деревянных и текстильных конструкций для повышения огнестойкости",
      },
    ],
  },
  {
    id: 8,
    type: "systems",
    label: "08",
    title: "Автоматические системы защиты",
    systems: [
      { icon: "Bell", name: "АУПС", full: "Автоматическая установка пожарной сигнализации" },
      { icon: "Droplets", name: "АУПТ", full: "Автоматическая установка пожаротушения" },
      { icon: "Volume2", name: "СОУЭ", full: "Система оповещения и управления эвакуацией" },
      { icon: "Wind", name: "СПДЗ", full: "Система противодымной защиты" },
      { icon: "Zap", name: "АЗДК", full: "Автоматическое закрывание дверей и клапанов" },
    ],
  },
  {
    id: 9,
    type: "measures",
    label: "09",
    title: "Комплекс мер пожарной защиты",
    groups: [
      {
        title: "Пассивная защита",
        items: [
          "Огнестойкость несущих и ограждающих конструкций",
          "Противопожарные преграды и отсеки",
          "Пути эвакуации и эвакуационные выходы",
        ],
      },
      {
        title: "Активная защита",
        items: [
          "Автоматические системы обнаружения и тушения",
          "Системы противодымной вентиляции",
          "Внутренний и наружный противопожарный водопровод",
        ],
      },
      {
        title: "Организационные меры",
        items: [
          "Разработка планов эвакуации и инструкций",
          "Регулярное обучение персонала и учения",
          "Техническое обслуживание систем защиты",
        ],
      },
    ],
  },
  {
    id: 10,
    type: "conclusion",
    label: "10",
    title: "Выводы",
    conclusions: [
      "Действующая система технического регулирования в целом обеспечивает необходимый уровень пожарной безопасности объектов",
      "Выявлены пробелы в нормативной базе, требующие актуализации с учётом новых строительных материалов и технологий",
      "Необходима гармонизация отечественных стандартов с европейскими нормами (Eurocode) для повышения инвестиционной привлекательности",
      "Внедрение риск-ориентированного подхода позволит повысить эффективность и снизить избыточные требования для объектов с низкой пожарной нагрузкой",
      "Рекомендовано усиление контроля за качеством монтажа и обслуживания автоматических систем противопожарной защиты",
    ],
  },
];

type SlideData = typeof slides[number];

function SlideHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center gap-6">
        <span className="font-golos text-xs tracking-[0.2em] uppercase text-gray-400">
          {label} / 10
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <h2
        className="font-cormorant text-3xl md:text-5xl font-semibold text-gray-900 animate-slide-down"
        style={{ animationDelay: "0.05s" }}
      >
        {title}
      </h2>
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-0.5 flex-1 transition-all duration-500 ${
            i < current ? "bg-gray-900" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function SlideTitle() {
  return (
    <div className="flex flex-col justify-between h-full p-14 md:p-20">
      <div className="flex items-start justify-between">
        <div className="text-xs font-golos tracking-[0.2em] uppercase text-gray-400">
          Выпускная квалификационная работа
        </div>
        <div className="text-xs font-golos tracking-[0.2em] uppercase text-gray-400">
          01 / 10
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div
          className="h-px bg-gray-900 origin-left animate-line-grow"
          style={{ animationDelay: "0.1s" }}
        />
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="font-cormorant text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-gray-900 max-w-4xl">
            Техническое регулирование в области пожарной безопасности
          </h1>
        </div>
        <div
          className="h-px bg-gray-200 origin-left animate-line-grow"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
      <div
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-slide-up"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-golos tracking-[0.15em] uppercase text-gray-400">
              Выполнил
            </span>
            <span className="font-golos text-lg font-medium text-gray-900">
              Петров В.В.
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-golos tracking-[0.15em] uppercase text-gray-400">
              Научный руководитель
            </span>
            <span className="font-golos text-lg font-medium text-gray-900">
              Кирюхин А.Ю.
            </span>
          </div>
        </div>
        <div className="text-xs font-golos tracking-[0.15em] uppercase text-gray-400">
          2026
        </div>
      </div>
    </div>
  );
}

function SlideRelevance({ data }: { data: SlideData & { points: string[] } }) {
  return (
    <div className="flex flex-col h-full p-14 md:p-20">
      <SlideHeader label={data.label} title={data.title!} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 content-start">
        {data.points.map((point, i) => (
          <div
            key={i}
            className="flex gap-4 animate-slide-up"
            style={{ animationDelay: `${0.15 + i * 0.1}s` }}
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-900 flex items-center justify-center mt-0.5">
              <span className="font-golos text-xs font-semibold text-gray-900">{i + 1}</span>
            </div>
            <p className="font-golos text-base text-gray-700 leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideObject({ data }: { data: SlideData & { items: { heading: string; text: string }[] } }) {
  return (
    <div className="flex flex-col h-full p-14 md:p-20">
      <SlideHeader label={data.label} title={data.title!} />
      <div className="flex flex-col flex-1 justify-center">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row gap-4 md:gap-12 py-6 border-t border-gray-200 last:border-b animate-slide-up"
            style={{ animationDelay: `${0.15 + i * 0.12}s` }}
          >
            <div className="md:w-52 flex-shrink-0">
              <span className="font-golos text-xs tracking-[0.15em] uppercase text-gray-400">
                {item.heading}
              </span>
            </div>
            <p className="font-golos text-base text-gray-800 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideTasks({ data }: { data: SlideData & { tasks: string[] } }) {
  return (
    <div className="flex flex-col h-full p-14 md:p-20">
      <SlideHeader label={data.label} title={data.title!} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 flex-1 content-start">
        {data.tasks.map((task, i) => (
          <div
            key={i}
            className="flex gap-4 py-4 border-t border-gray-200 animate-slide-up"
            style={{ animationDelay: `${0.1 + i * 0.08}s` }}
          >
            <span className="font-cormorant text-3xl text-gray-200 leading-none mt-0.5 flex-shrink-0 w-8">
              {i + 1}
            </span>
            <p className="font-golos text-sm text-gray-700 leading-relaxed">{task}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideLegal({ data }: { data: SlideData & { categories: { name: string; docs: string[] }[] } }) {
  return (
    <div className="flex flex-col h-full p-14 md:p-20">
      <SlideHeader label={data.label} title={data.title!} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-1 content-start">
        {data.categories.map((cat, i) => (
          <div key={i} className="animate-slide-up" style={{ animationDelay: `${0.15 + i * 0.15}s` }}>
            <div className="font-golos text-xs tracking-[0.15em] uppercase text-gray-400 mb-4">
              {cat.name}
            </div>
            {cat.docs.map((doc, j) => (
              <div key={j} className="py-3 border-t border-gray-200 last:border-b">
                <p className="font-golos text-sm text-gray-800 leading-relaxed">{doc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideClassification({ data }: { data: SlideData & { categories: { letter: string; name: string; color: string }[] } }) {
  return (
    <div className="flex flex-col h-full p-14 md:p-20">
      <SlideHeader label={data.label} title={data.title!} />
      <div className="flex flex-col flex-1 justify-center">
        {data.categories.map((cat, i) => (
          <div
            key={i}
            className="flex items-center gap-6 py-4 border-t border-gray-200 last:border-b animate-slide-up"
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: cat.color + "18", border: `1px solid ${cat.color}40` }}
            >
              <span className="font-cormorant text-2xl font-semibold" style={{ color: cat.color }}>
                {cat.letter}
              </span>
            </div>
            <p className="font-golos text-base text-gray-800 flex-1">{cat.name}</p>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideFireProtection({ data }: { data: SlideData & { methods: { name: string; desc: string }[] } }) {
  return (
    <div className="flex flex-col h-full p-14 md:p-20">
      <SlideHeader label={data.label} title={data.title!} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 content-start">
        {data.methods.map((method, i) => (
          <div
            key={i}
            className="p-6 border border-gray-200 hover:border-gray-400 transition-colors duration-300 animate-slide-up"
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <div className="font-golos text-xs tracking-[0.15em] uppercase text-gray-400 mb-3">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="font-golos text-base font-semibold text-gray-900 mb-2">{method.name}</h3>
            <p className="font-golos text-sm text-gray-600 leading-relaxed">{method.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideSystems({ data }: { data: SlideData & { systems: { icon: string; name: string; full: string }[] } }) {
  return (
    <div className="flex flex-col h-full p-14 md:p-20">
      <SlideHeader label={data.label} title={data.title!} />
      <div className="flex flex-col flex-1 justify-center">
        {data.systems.map((sys, i) => (
          <div
            key={i}
            className="flex items-center gap-6 py-5 border-t border-gray-200 last:border-b animate-slide-up"
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <Icon name={sys.icon as "Bell"} size={18} className="text-gray-400 flex-shrink-0" />
            <div className="w-16 flex-shrink-0">
              <span className="font-golos text-sm font-semibold text-gray-900">{sys.name}</span>
            </div>
            <div className="h-px flex-1 bg-gray-200" />
            <p className="font-golos text-sm text-gray-600 text-right max-w-xs">{sys.full}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideMeasures({ data }: { data: SlideData & { groups: { title: string; items: string[] }[] } }) {
  return (
    <div className="flex flex-col h-full p-14 md:p-20">
      <SlideHeader label={data.label} title={data.title!} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 content-start">
        {data.groups.map((group, i) => (
          <div key={i} className="animate-slide-up" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
            <div className="font-golos text-xs tracking-[0.15em] uppercase text-gray-400 mb-5">
              {group.title}
            </div>
            {group.items.map((item, j) => (
              <div key={j} className="flex gap-3 py-3 border-t border-gray-200 last:border-b">
                <div className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0 mt-2" />
                <p className="font-golos text-sm text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideConclusion({ data }: { data: SlideData & { conclusions: string[] } }) {
  return (
    <div className="flex flex-col h-full p-14 md:p-20">
      <SlideHeader label={data.label} title={data.title!} />
      <div className="flex flex-col flex-1 justify-center">
        {data.conclusions.map((text, i) => (
          <div
            key={i}
            className="flex gap-5 py-4 border-t border-gray-200 last:border-b animate-slide-up"
            style={{ animationDelay: `${0.1 + i * 0.09}s` }}
          >
            <span className="font-cormorant text-3xl text-gray-200 leading-none mt-0.5 flex-shrink-0 w-8">
              {i + 1}
            </span>
            <p className="font-golos text-sm md:text-base text-gray-700 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= slides.length) return;
    setCurrent(index);
    setAnimKey((k) => k + 1);
  }, []);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div className="fixed inset-0 bg-white font-golos overflow-hidden flex flex-col select-none">
      <div className="flex-1 overflow-hidden">
        <div key={animKey} className="h-full">
          {slide.type === "title" && <SlideTitle />}
          {slide.type === "relevance" && "points" in slide && <SlideRelevance data={slide as SlideData & { points: string[] }} />}
          {slide.type === "object" && "items" in slide && <SlideObject data={slide as SlideData & { items: { heading: string; text: string }[] }} />}
          {slide.type === "tasks" && "tasks" in slide && <SlideTasks data={slide as SlideData & { tasks: string[] }} />}
          {slide.type === "legal" && "categories" in slide && <SlideLegal data={slide as SlideData & { categories: { name: string; docs: string[] }[] }} />}
          {slide.type === "classification" && "categories" in slide && <SlideClassification data={slide as SlideData & { categories: { letter: string; name: string; color: string }[] }} />}
          {slide.type === "fireprotection" && "methods" in slide && <SlideFireProtection data={slide as SlideData & { methods: { name: string; desc: string }[] }} />}
          {slide.type === "systems" && "systems" in slide && <SlideSystems data={slide as SlideData & { systems: { icon: string; name: string; full: string }[] }} />}
          {slide.type === "measures" && "groups" in slide && <SlideMeasures data={slide as SlideData & { groups: { title: string; items: string[] }[] }} />}
          {slide.type === "conclusion" && "conclusions" in slide && <SlideConclusion data={slide as SlideData & { conclusions: string[] }} />}
        </div>
      </div>

      <div className="flex-shrink-0 px-14 md:px-20 pb-5 pt-3 flex items-center gap-5">
        <ProgressBar current={current + 1} total={slides.length} />
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700"
            aria-label="Назад"
          >
            <Icon name="ArrowLeft" size={13} />
          </button>
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700"
            aria-label="Вперёд"
          >
            <Icon name="ArrowRight" size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}