import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Icon from "@/components/ui/icon";
import Dashboards from "@/pages/Dashboards";
import Analytics from "@/pages/Analytics";
import Appeals from "@/pages/Appeals";
import Help from "@/pages/Help";

const NAV = [
  { id: "dashboards", label: "Дашборды", icon: "LayoutDashboard" },
  { id: "analytics", label: "Аналитика", icon: "BarChart3" },
  { id: "appeals", label: "Обращения", icon: "FileText" },
  { id: "help", label: "Справка", icon: "HelpCircle" },
];

function AppLayout() {
  const [active, setActive] = useState("dashboards");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const current = NAV.find(n => n.id === active);

  function renderPage() {
    if (active === "dashboards") return <Dashboards />;
    if (active === "analytics") return <Analytics />;
    if (active === "appeals") return <Appeals />;
    if (active === "help") return <Help />;
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 flex-shrink-0 flex flex-col
        bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))]
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="px-5 py-5 border-b border-[hsl(var(--sidebar-border))]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[hsl(var(--sidebar-primary))] flex items-center justify-center flex-shrink-0">
              <Icon name="Building2" size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[hsl(var(--sidebar-accent-foreground))] leading-tight">АИС «Обращения»</p>
              <p className="text-xs text-[hsl(var(--sidebar-foreground))] opacity-70">Правительство МО</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
              className={`sidebar-nav-item w-full ${active === item.id ? 'active' : ''}`}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {active === item.id && <Icon name="ChevronRight" size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[hsl(var(--sidebar-border))]">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--sidebar-accent))] flex items-center justify-center">
              <Icon name="User" size={14} className="text-[hsl(var(--sidebar-accent-foreground))]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[hsl(var(--sidebar-accent-foreground))] truncate">Администратор</p>
              <p className="text-xs text-[hsl(var(--sidebar-foreground))] opacity-60 truncate">admin@region.gov.ru</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-secondary transition-colors"
            >
              <Icon name="Menu" size={18} className="text-foreground" />
            </button>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Icon name="Home" size={14} />
              <Icon name="ChevronRight" size={12} />
              <span className="font-semibold text-foreground">{current?.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Система активна
            </div>
            <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors relative">
              <Icon name="Bell" size={18} className="text-muted-foreground" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="User" size={14} className="text-white" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AppLayout />
  </TooltipProvider>
);

export default App;
