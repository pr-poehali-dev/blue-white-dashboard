import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";

const TOPICS_SHORT = [
  "Архитектура", "Безопасность", "Ведомства МО", "Вне компетенции", "Двор",
  "Дороги", "Земельно-имущ.", "ИТ", "МФЦ", "Общ. территории",
  "Общ. транспорт", "Освещение", "Отопление/ГВС", "Природа", "С/х и продов.",
  "Снег и наледь", "Соц. сфера", "Строительство", "Цены и тарифы", "Энергетика",
];

const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

function rnd(seed: number, min: number, max: number) {
  return Math.floor(((seed * 1664525 + 1013904223) & 0x7fffffff) % (max - min)) + min;
}

export default function Analytics() {
  const [activeMonth, setActiveMonth] = useState(4);

  const topicData = TOPICS_SHORT.map((name, i) => ({
    name,
    count: rnd(i * 7 + activeMonth * 13, 40, 320),
    resolved: rnd(i * 5 + activeMonth * 9, 30, 280),
    growth: rnd(i * 3 + activeMonth, -20, 40) - 15,
  }));

  const sorted = [...topicData].sort((a, b) => b.count - a.count);
  const maxCount = sorted[0].count;

  const monthData = MONTHS.map((m, idx) => ({
    month: m,
    count: rnd(idx * 11 + 7, 800, 2400),
    resolved: rnd(idx * 9 + 3, 600, 2000),
  }));
  const maxMonthCount = Math.max(...monthData.map(d => d.count));

  const totalYear = monthData.reduce((s, d) => s + d.count, 0);
  const resolvedYear = monthData.reduce((s, d) => s + d.resolved, 0);
  const avgMonth = Math.round(totalYear / 12);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Аналитика</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Сравнительный анализ и динамика обращений</p>
      </div>

      {/* Year KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Всего за год", value: totalYear.toLocaleString('ru'), icon: "BarChart3", color: "text-primary", bg: "bg-blue-50" },
          { label: "Решено за год", value: resolvedYear.toLocaleString('ru'), icon: "CheckCircle2", color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "В среднем в месяц", value: avgMonth.toLocaleString('ru'), icon: "CalendarDays", color: "text-sky-600", bg: "bg-sky-50" },
          { label: "Процент решения", value: `${Math.round(resolvedYear / totalYear * 100)}%`, icon: "PieChart", color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((kpi, i) => (
          <div key={i} className="metric-card">
            <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
              <Icon name={kpi.icon} size={20} className={kpi.color} />
            </div>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Monthly chart */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-foreground">Динамика по месяцам</h2>
            <p className="text-xs text-muted-foreground">Нажмите на месяц для детализации по тематикам</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary inline-block" />Всего</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" />Решено</span>
          </div>
        </div>
        <div className="flex items-end gap-2 h-40">
          {monthData.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveMonth(i)}
              className="flex-1 flex flex-col items-center gap-1 group"
            >
              <div className="w-full flex flex-col items-center gap-0.5">
                <div
                  className={`w-full rounded-t-md transition-all ${activeMonth === i ? 'bg-primary' : 'bg-primary/25 group-hover:bg-primary/50'}`}
                  style={{ height: `${(d.count / maxMonthCount) * 120}px` }}
                />
                <div
                  className={`w-full rounded-t-md transition-all ${activeMonth === i ? 'bg-emerald-400' : 'bg-emerald-200 group-hover:bg-emerald-300'}`}
                  style={{ height: `${(d.resolved / maxMonthCount) * 120 * 0.35}px` }}
                />
              </div>
              <span className={`text-xs font-medium transition-colors ${activeMonth === i ? 'text-primary' : 'text-muted-foreground'}`}>{d.month}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Topics ranking for selected month */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-foreground">Рейтинг тематик — {MONTHS[activeMonth]}</h2>
            <p className="text-xs text-muted-foreground">Топ по количеству входящих обращений</p>
          </div>
          <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">
            {topicData.reduce((s, d) => s + d.count, 0).toLocaleString('ru')} обращений
          </span>
        </div>
        <div className="space-y-3">
          {sorted.map((t, i) => (
            <div key={i} className="flex items-center gap-3 group">
              <span className={`w-6 text-xs font-bold text-center ${i < 3 ? 'text-primary' : 'text-muted-foreground'}`}>{i + 1}</span>
              <div className="w-32 sm:w-44 text-sm font-medium text-foreground truncate">{t.name}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${i < 3 ? 'bg-primary' : 'bg-sky-300'}`}
                      style={{ width: `${(t.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground w-10 text-right">{t.count}</span>
                </div>
              </div>
              <span className={`text-xs font-medium w-14 text-right ${t.growth > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                {t.growth > 0 ? '+' : ''}{t.growth}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Resolution rate by topic */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-base font-bold text-foreground mb-5">Процент исполнения по тематикам</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {topicData.map((t, i) => {
            const rate = Math.round((t.resolved / t.count) * 100);
            return (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground truncate max-w-36">{t.name}</span>
                  <span className={`font-semibold ${rate >= 80 ? 'text-emerald-600' : rate >= 60 ? 'text-amber-600' : 'text-red-500'}`}>{rate}%</span>
                </div>
                <Progress value={rate} className="h-1.5" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
