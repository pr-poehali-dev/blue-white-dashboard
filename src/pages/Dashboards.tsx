import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TOPICS = [
  { id: 1, name: "Архитектура и градостроительство", icon: "Building2", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: 2, name: "Безопасность", icon: "Shield", color: "bg-sky-50 text-sky-700 border-sky-200" },
  { id: 3, name: "Ведомства МО", icon: "Landmark", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { id: 4, name: "Вне компетенции Ведомств МО", icon: "CircleOff", color: "bg-slate-50 text-slate-600 border-slate-200" },
  { id: 5, name: "Двор", icon: "Trees", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { id: 6, name: "Дороги", icon: "Route", color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: 7, name: "Земельно-имущественные отношения", icon: "MapPin", color: "bg-sky-50 text-sky-800 border-sky-200" },
  { id: 8, name: "Информационные технологии", icon: "Monitor", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  { id: 9, name: "МФЦ", icon: "Building", color: "bg-blue-50 text-blue-800 border-blue-200" },
  { id: 10, name: "Общественные территории", icon: "Landmark", color: "bg-cyan-50 text-cyan-800 border-cyan-200" },
  { id: 11, name: "Общественный транспорт", icon: "Bus", color: "bg-sky-50 text-sky-700 border-sky-200" },
  { id: 12, name: "Освещение", icon: "Lightbulb", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: 13, name: "Отопление/ГВС", icon: "Flame", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { id: 14, name: "Природа, экология", icon: "Leaf", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { id: 15, name: "Сельское хозяйство и продовольствие", icon: "Wheat", color: "bg-sky-50 text-sky-800 border-sky-200" },
  { id: 16, name: "Снег и наледь", icon: "Snowflake", color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: 17, name: "Социальная сфера", icon: "Heart", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  { id: 18, name: "Строительство", icon: "HardHat", color: "bg-slate-50 text-slate-700 border-slate-200" },
  { id: 19, name: "Цены и тарифы", icon: "CircleDollarSign", color: "bg-sky-50 text-sky-700 border-sky-200" },
  { id: 20, name: "Энергетика", icon: "Zap", color: "bg-blue-50 text-blue-800 border-blue-200" },
];

function generateData(seed: number, period: string) {
  const base = (seed * 37 + 100) % 300 + 50;
  const mult = period === "day" ? 1 : period === "week" ? 7 : 30;
  return {
    total: Math.floor(base * mult * (0.8 + Math.random() * 0.4)),
    resolved: Math.floor(base * mult * 0.6 * (0.8 + Math.random() * 0.4)),
    pending: Math.floor(base * mult * 0.25 * (0.8 + Math.random() * 0.4)),
    overdue: Math.floor(base * mult * 0.08 * (0.8 + Math.random() * 0.2)),
    trend: Math.floor(Math.random() * 30) - 10,
  };
}

function generateForecast(seed: number) {
  const base = (seed * 37 + 100) % 300 + 50;
  return {
    nextWeek: Math.floor(base * 7 * 1.1),
    nextMonth: Math.floor(base * 30 * 1.05),
    growth: (Math.random() * 20 - 5).toFixed(1),
    risk: Math.random() > 0.7 ? "высокий" : Math.random() > 0.4 ? "средний" : "низкий",
  };
}

const PERIODS = [
  { id: "day", label: "Сегодня" },
  { id: "week", label: "Неделя" },
  { id: "month", label: "Месяц" },
];

interface TopicCardProps {
  topic: typeof TOPICS[0];
  period: string;
  onForecast: (topic: typeof TOPICS[0]) => void;
}

function TopicCard({ topic, period, onForecast }: TopicCardProps) {
  const data = generateData(topic.id, period);
  const resolveRate = Math.round((data.resolved / data.total) * 100);

  return (
    <div className="metric-card animate-fade-in group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg border ${topic.color}`}>
            <Icon name={topic.icon} fallback="FileText" size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-tight">{topic.name}</h3>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${data.trend > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {data.trend > 0 ? '+' : ''}{data.trend}%
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <p className="text-2xl font-bold text-primary">{data.total.toLocaleString('ru')}</p>
          <p className="text-xs text-muted-foreground">всего</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-emerald-600">{data.resolved.toLocaleString('ru')}</p>
          <p className="text-xs text-muted-foreground">сегодня</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-500">{data.overdue.toLocaleString('ru')}</p>
          <p className="text-xs text-muted-foreground">прогноз</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Исполнение</span>
          <span>{resolveRate}%</span>
        </div>
        <Progress value={resolveRate} className="h-1.5" />
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs border-primary/30 text-primary hover:bg-primary hover:text-white transition-all"
        onClick={() => onForecast(topic)}
      >
        <Icon name="TrendingUp" size={12} />
        Прогноз показателей
      </Button>
    </div>
  );
}

function ForecastModal({ topic, onClose }: { topic: typeof TOPICS[0] | null; onClose: () => void }) {
  if (!topic) return null;
  const forecast = generateForecast(topic.id);
  const riskColor = forecast.risk === "высокий" ? "text-red-600 bg-red-50" : forecast.risk === "средний" ? "text-amber-600 bg-amber-50" : "text-emerald-600 bg-emerald-50";

  return (
    <Dialog open={!!topic} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="TrendingUp" size={18} className="text-primary" />
            Прогноз: {topic.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-xs text-muted-foreground mb-1">Следующая неделя</p>
              <p className="text-2xl font-bold text-primary">{forecast.nextWeek.toLocaleString('ru')}</p>
              <p className="text-xs text-blue-600">обращений</p>
            </div>
            <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
              <p className="text-xs text-muted-foreground mb-1">Следующий месяц</p>
              <p className="text-2xl font-bold text-sky-700">{forecast.nextMonth.toLocaleString('ru')}</p>
              <p className="text-xs text-sky-600">обращений</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
            <div>
              <p className="text-sm font-medium">Прогнозный рост</p>
              <p className="text-xs text-muted-foreground">по сравнению с текущим периодом</p>
            </div>
            <span className="text-lg font-bold text-primary">{forecast.growth > 0 ? '+' : ''}{forecast.growth}%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
            <div>
              <p className="text-sm font-medium">Уровень риска перегрузки</p>
              <p className="text-xs text-muted-foreground">на основе исторических данных</p>
            </div>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${riskColor}`}>{forecast.risk}</span>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-700 font-medium mb-1">Рекомендация системы</p>
            <p className="text-xs text-blue-600">
              {forecast.risk === "высокий"
                ? "Рекомендуется увеличить штатную численность обработки обращений по данной тематике на 20-30%."
                : forecast.risk === "средний"
                  ? "Целесообразно подготовить резервный ресурс обработки обращений на случай всплеска."
                  : "Текущий ресурс обработки обращений по данной тематике достаточен."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Dashboards() {
  const [period, setPeriod] = useState("week");
  const [selectedTopic, setSelectedTopic] = useState<typeof TOPICS[0] | null>(null);
  const [decision, setDecision] = useState("");
  const [metrics, setMetrics] = useState<null | { efficiency: number; coverage: number; speed: number; risk: string }>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([]);

  const totalAll = TOPICS.reduce((sum, t) => sum + generateData(t.id, period).total, 0);
  const resolvedAll = TOPICS.reduce((sum, t) => sum + generateData(t.id, period).resolved, 0);
  const overdueAll = TOPICS.reduce((sum, t) => sum + generateData(t.id, period).overdue, 0);
  const resolveRate = Math.round((resolvedAll / totalAll) * 100);

  function calcMetrics() {
    if (!decision.trim()) return;
    setMetrics({
      efficiency: Math.min(99, resolveRate + Math.floor(Math.random() * 15) + 5),
      coverage: Math.floor(Math.random() * 20) + 75,
      speed: Math.floor(Math.random() * 30) + 60,
      risk: Math.random() > 0.6 ? "умеренный" : "низкий",
    });
  }

  function exportReport() {
    const rows = TOPICS.map(t => {
      const d = generateData(t.id, period);
      return `${t.name}\t${d.total}\t${d.resolved}\t${d.pending}\t${d.overdue}`;
    });
    const header = `Оперативный отчёт по обращениям\nПериод: ${PERIODS.find(p => p.id === period)?.label}\nДата формирования: ${new Date().toLocaleDateString('ru-RU')}\n\nТематика\tВсего\tРешено\tВ работе\tПросрочено\n`;
    const content = header + rows.join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `otchet_obrashcheniy_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
  }

  function sendChat() {
    if (!chatQuestion.trim()) return;
    const q = chatQuestion;
    setChatQuestion("");
    setChatMessages(prev => [...prev, { role: "user", text: q }]);
    setTimeout(() => {
      const answers = [
        `По теме "${q}" в системе зафиксировано повышенное число обращений за последний период. Рекомендуется усилить контроль исполнения.`,
        `Анализ показывает, что обращения по данному направлению решаются в среднем за 4,2 рабочих дня. Норматив выполняется.`,
        `На основе входящих данных: 78% обращений решены в установленные сроки. Выявлено 12 системных проблем, требующих управленческого решения.`,
        `По данному вопросу выявлен рост обращений на 23% по сравнению с прошлым периодом. Рекомендуется инициировать межведомственное совещание.`,
      ];
      const answer = answers[Math.floor(Math.random() * answers.length)];
      setChatMessages(prev => [...prev, { role: "assistant", text: answer }]);
    }, 800);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Дашборды по обращениям</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Сводная статистика по всем тематикам</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-secondary rounded-xl p-1 gap-1">
            {PERIODS.map(p => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${period === p.id ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setChatOpen(true)} className="gap-2 border-primary/30 text-primary hover:bg-primary hover:text-white">
            <Icon name="MessageSquare" size={14} />
            Вопросы
          </Button>
          <Button size="sm" onClick={exportReport} className="gap-2 bg-primary text-white hover:bg-primary/90">
            <Icon name="Download" size={14} />
            Отчёт
          </Button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Всего обращений", value: totalAll.toLocaleString('ru'), icon: "FileText", color: "text-primary", bg: "bg-blue-50" },
          { label: "Решено", value: resolvedAll.toLocaleString('ru'), icon: "CheckCircle2", color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Просрочено", value: overdueAll.toLocaleString('ru'), icon: "AlertCircle", color: "text-red-500", bg: "bg-red-50" },
          { label: "Исполнение", value: `${resolveRate}%`, icon: "BarChart3", color: "text-sky-600", bg: "bg-sky-50" },
        ].map((kpi, i) => (
          <div key={i} className={`metric-card animate-fade-in stagger-${i + 1}`}>
            <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
              <Icon name={kpi.icon} size={20} className={kpi.color} />
            </div>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Topic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {TOPICS.map(topic => (
          <TopicCard key={topic.id} topic={topic} period={period} onForecast={setSelectedTopic} />
        ))}
      </div>

      {/* Decision Block */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="Lightbulb" size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Управленческое решение</h2>
            <p className="text-xs text-muted-foreground">Введите решение для расчёта прогнозных метрик</p>
          </div>
        </div>
        <Textarea
          value={decision}
          onChange={e => setDecision(e.target.value)}
          placeholder="Введите управленческое решение... Например: «Увеличить штат отдела по работе с дорожными обращениями на 3 единицы и установить норматив обработки 2 рабочих дня»"
          className="min-h-24 mb-4 resize-none border-primary/20 focus:border-primary text-sm"
        />
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Button onClick={calcMetrics} className="bg-primary text-white hover:bg-primary/90 gap-2">
            <Icon name="Calculator" size={14} />
            Рассчитать метрики
          </Button>
          {metrics && (
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-center">
                <p className="text-lg font-bold text-primary">{metrics.efficiency}%</p>
                <p className="text-xs text-muted-foreground">Эффективность</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-sky-600">{metrics.coverage}%</p>
                <p className="text-xs text-muted-foreground">Охват</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-indigo-600">{metrics.speed}%</p>
                <p className="text-xs text-muted-foreground">Скорость</p>
              </div>
              <div className="text-center">
                <p className={`text-lg font-bold ${metrics.risk === 'низкий' ? 'text-emerald-600' : 'text-amber-600'}`}>{metrics.risk}</p>
                <p className="text-xs text-muted-foreground">Риск</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Forecast Modal */}
      <ForecastModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />

      {/* Chat Dialog */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="MessageSquare" size={18} className="text-primary" />
              Вопросы по обращениям
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="min-h-48 max-h-72 overflow-y-auto space-y-3 p-1">
              {chatMessages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
                  <Icon name="MessageCircle" size={32} className="mx-auto mb-2 opacity-30" />
                  <p>Задайте вопрос по входящим обращениям</p>
                </div>
              )}
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={chatQuestion}
                onChange={e => setChatQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                placeholder="Введите вопрос..."
                className="flex-1 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:border-primary bg-background"
              />
              <Button size="sm" onClick={sendChat} className="bg-primary text-white">
                <Icon name="Send" size={14} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}