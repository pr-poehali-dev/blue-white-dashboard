import { useState } from "react";
import Icon from "@/components/ui/icon";

const FAQ = [
  {
    q: "Как изменить период отображения данных на дашборде?",
    a: "На странице «Дашборды» в правом верхнем углу находятся кнопки выбора периода: «Сегодня», «Неделя», «Месяц». Нажмите нужный период — данные обновятся автоматически.",
  },
  {
    q: "Как получить прогноз показателей по тематике?",
    a: "На карточке каждой тематики в дашборде нажмите кнопку «Прогноз показателей». Откроется окно с прогнозом на следующую неделю и месяц, а также оценкой уровня риска.",
  },
  {
    q: "Как выгрузить оперативный отчёт?",
    a: "На странице «Дашборды» нажмите кнопку «Отчёт» в правом верхнем углу. Файл с данными по всем тематикам за выбранный период будет загружен на ваш компьютер.",
  },
  {
    q: "Как задать вопрос по входящим обращениям?",
    a: "На странице «Дашборды» нажмите кнопку «Вопросы». Откроется диалоговое окно, где вы можете задать любой вопрос по аналитике обращений.",
  },
  {
    q: "Как рассчитать метрики по управленческому решению?",
    a: "В нижней части страницы «Дашборды» находится блок «Управленческое решение». Введите текст решения и нажмите «Рассчитать метрики» — система покажет прогноз эффективности, охвата, скорости и уровня риска.",
  },
  {
    q: "Как найти конкретное обращение?",
    a: "На странице «Обращения» используйте строку поиска — можно искать по номеру обращения, тексту или имени заявителя. Также доступна фильтрация по статусу и тематике.",
  },
  {
    q: "Что означают цвета статусов обращений?",
    a: "Синий — «В работе», зелёный — «Решено», красный — «Просрочено», голубой — «Новое». Просроченными считаются обращения, по которым истёк нормативный срок рассмотрения.",
  },
  {
    q: "Как читать график динамики на странице Аналитика?",
    a: "График показывает количество обращений по месяцам. Тёмно-синие столбцы — всего поступило, зелёные — решено. Нажмите на столбец месяца, чтобы увидеть рейтинг тематик за этот месяц.",
  },
];

const CONTACTS = [
  { name: "Техническая поддержка", value: "support@region.gov.ru", icon: "Mail" },
  { name: "Горячая линия", value: "+7 (495) 000-00-00", icon: "Phone" },
  { name: "Регламент работы с обращениями", value: "Пн–Пт, 09:00–18:00", icon: "Clock" },
];

export default function Help() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Справка</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Руководство по работе с системой</p>
      </div>

      {/* Quick start */}
      <div className="bg-gradient-to-br from-primary to-sky-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Icon name="BookOpen" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">АИС «Обращения»</h2>
            <p className="text-white/80 text-sm">Аналитическая информационная система</p>
          </div>
        </div>
        <p className="text-white/90 text-sm leading-relaxed">
          Система предназначена для мониторинга, анализа и управления обращениями граждан по тематикам деятельности органов государственной власти Московской области. Включает инструменты прогнозирования, аналитики и формирования управленческих решений.
        </p>
      </div>

      {/* Navigation guide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: "LayoutDashboard", title: "Дашборды", desc: "Сводная статистика по всем 20 тематикам с фильтрацией по периоду, прогнозированием и выгрузкой отчётов." },
          { icon: "BarChart3", title: "Аналитика", desc: "Динамика обращений по месяцам, рейтинг тематик, процент исполнения и сводная статистика за год." },
          { icon: "FileText", title: "Обращения", desc: "Реестр всех обращений с фильтрацией, поиском и детальным просмотром каждого обращения." },
          { icon: "HelpCircle", title: "Справка", desc: "Руководство пользователя, ответы на часто задаваемые вопросы и контактная информация." },
        ].map((item, i) => (
          <div key={i} className="metric-card flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Icon name={item.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-muted/20">
          <h2 className="font-bold text-base text-foreground">Часто задаваемые вопросы</h2>
        </div>
        <div className="divide-y">
          {FAQ.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/20 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">{item.q}</span>
                <Icon
                  name={open === i ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className={`flex-shrink-0 transition-transform text-muted-foreground ${open === i ? 'text-primary' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-4 animate-fade-in">
                  <p className="text-sm text-muted-foreground leading-relaxed bg-blue-50 rounded-xl p-4 border border-blue-100">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="font-bold text-base text-foreground mb-4">Контакты и поддержка</h2>
        <div className="space-y-3">
          {CONTACTS.map((c, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <Icon name={c.icon} size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{c.name}</p>
                <p className="text-sm font-semibold text-foreground">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Version */}
      <div className="text-center text-xs text-muted-foreground pb-2">
        АИС «Обращения» v1.0 · Правительство Московской области
      </div>
    </div>
  );
}
