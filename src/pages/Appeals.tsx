import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const STATUSES = ["Все", "В работе", "Решено", "Просрочено", "Новое"];
const TOPICS_FILTER = ["Все тематики", "Дороги", "Двор", "Освещение", "Отопление/ГВС", "Снег и наледь", "Безопасность", "Строительство"];

const STATUS_COLORS: Record<string, string> = {
  "В работе": "bg-blue-50 text-blue-700 border-blue-200",
  "Решено": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Просрочено": "bg-red-50 text-red-700 border-red-200",
  "Новое": "bg-sky-50 text-sky-700 border-sky-200",
};

const PRIORITY_COLORS: Record<string, string> = {
  "Высокий": "text-red-600",
  "Средний": "text-amber-600",
  "Низкий": "text-emerald-600",
};

const APPEALS = Array.from({ length: 30 }, (_, i) => {
  const topics = ["Дороги", "Двор", "Освещение", "Отопление/ГВС", "Снег и наледь", "Безопасность", "Строительство", "МФЦ", "Социальная сфера", "Энергетика"];
  const statuses = ["В работе", "Решено", "Просрочено", "Новое"];
  const priorities = ["Высокий", "Средний", "Низкий"];
  const names = ["Иванов И.И.", "Петрова А.В.", "Сидоров К.М.", "Козлова О.Н.", "Новикова Т.Р.", "Морозов Д.А.", "Волков Е.С."];
  const texts = [
    "Прошу принять меры по ремонту дорожного покрытия на ул. Ленина, д. 14. Яма глубиной около 30 см.",
    "На дворовой территории по адресу ул. Садовая, 7 не работает 3 из 5 фонарей освещения.",
    "В доме по пр. Мира, 22 не подаётся горячее водоснабжение уже 5 дней.",
    "Прошу очистить тротуар по ул. Советской от снега и наледи. Невозможно пройти.",
    "Необходима установка светофора на пересечении ул. Гагарина и ул. Строителей.",
    "Поступает жалоба на незаконное строительство на участке по ул. Парковой, 15.",
    "Прошу рассмотреть вопрос завышения тарифов на коммунальные услуги в нашем районе.",
  ];
  const seed = i * 17 + 5;
  const days = (seed * 3 + 1) % 28 + 1;
  const month = (seed % 5) + 1;
  return {
    id: `ОБР-2025-${String(i + 1001).padStart(4, '0')}`,
    topic: topics[i % topics.length],
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    author: names[i % names.length],
    date: `${String(days).padStart(2, '0')}.0${month}.2025`,
    text: texts[i % texts.length],
    daysLeft: statuses[i % statuses.length] === "Просрочено" ? -(seed % 10 + 1) : (seed % 20 + 1),
    executor: names[(i + 2) % names.length],
  };
});

export default function Appeals() {
  const [status, setStatus] = useState("Все");
  const [topicFilter, setTopicFilter] = useState("Все тематики");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof APPEALS[0] | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = APPEALS.filter(a =>
    (status === "Все" || a.status === status) &&
    (topicFilter === "Все тематики" || a.topic === topicFilter) &&
    (search === "" || a.text.toLowerCase().includes(search.toLowerCase()) || a.id.includes(search) || a.author.toLowerCase().includes(search.toLowerCase()))
  );

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Обращения</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Реестр входящих обращений граждан</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Найдено:</span>
          <span className="font-bold text-primary">{filtered.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border p-4 space-y-3 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => { setStatus(s); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${status === s ? 'bg-primary text-white border-primary' : 'bg-white text-muted-foreground border-border hover:border-primary/50'}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Поиск по тексту, номеру или автору..."
              className="w-full pl-8 pr-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:border-primary bg-background"
            />
          </div>
          <select
            value={topicFilter}
            onChange={e => { setTopicFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:border-primary bg-background text-foreground"
          >
            {TOPICS_FILTER.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs">Номер</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs">Тематика</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs hidden sm:table-cell">Статус</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs hidden md:table-cell">Приоритет</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs hidden lg:table-cell">Заявитель</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs hidden md:table-cell">Дата</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs"></th>
              </tr>
            </thead>
            <tbody>
              {paged.map((a, i) => (
                <tr key={a.id} className={`border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-muted/10'}`} onClick={() => setSelected(a)}>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-semibold text-primary">{a.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">{a.topic}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_COLORS[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-semibold ${PRIORITY_COLORS[a.priority]}`}>{a.priority}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{a.author}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground">{a.date}</td>
                  <td className="px-4 py-3">
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
            <span className="text-xs text-muted-foreground">Стр. {page} из {pages}</span>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors">
                <Icon name="ChevronLeft" size={14} className="text-foreground" />
              </button>
              <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors">
                <Icon name="ChevronRight" size={14} className="text-foreground" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <span className="font-mono text-primary">{selected?.id}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${selected ? STATUS_COLORS[selected.status] : ''}`}>{selected?.status}</span>
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 pt-1">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-foreground leading-relaxed">{selected.text}</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Тематика</p>
                  <p className="text-sm font-semibold text-foreground">{selected.topic}</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Приоритет</p>
                  <p className={`text-sm font-semibold ${PRIORITY_COLORS[selected.priority]}`}>{selected.priority}</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Заявитель</p>
                  <p className="text-sm font-semibold text-foreground">{selected.author}</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Дата подачи</p>
                  <p className="text-sm font-semibold text-foreground">{selected.date}</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Исполнитель</p>
                  <p className="text-sm font-semibold text-foreground">{selected.executor}</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Срок</p>
                  <p className={`text-sm font-semibold ${selected.daysLeft < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {selected.daysLeft < 0 ? `просрочено ${Math.abs(selected.daysLeft)} дн.` : `${selected.daysLeft} дн. осталось`}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-primary text-white hover:bg-primary/90 gap-2">
                  <Icon name="CheckCircle2" size={14} />
                  Отметить решённым
                </Button>
                <Button variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary hover:text-white">
                  <Icon name="Forward" size={14} />
                  Переназначить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
