import { useRouter } from "next/router";
import Link from "next/link";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const router = useRouter();

  const navItems = [
    { href: "/dashboard", label: "概览", icon: "📊" },
    { href: "/dashboard/reports", label: "报表", icon: "📈" },
    { href: "/dashboard/settings", label: "设置", icon: "⚙️" },
    { href: "/dashboard/analytics", label: "分析", icon: "📊" },
    { href: "/dashboard/users", label: "用户管理", icon: "👥" },
  ];

  const handleLogout = () => {
    // 在实际应用中，这里应该清除用户会话/令牌
    // 然后重定向到登录页面
    router.push("/login/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 左侧导览框 */}
      <aside className="w-64 border-r bg-white shadow-sm">
        <div className="p-6 border-b">
          <div className="text-2xl font-bold text-blue-600">报告管理系统</div>
          <div className="text-sm text-gray-500 mt-1">v1.0.0</div>
        </div>
        
        <div className="p-4">
          <div className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">主菜单</div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  router.pathname === item.href
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <div className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">快捷操作</div>
            <div className="space-y-1">
              <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <span>📋</span>
                <span>新建报告</span>
              </button>
              <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <span>📁</span>
                <span>导入数据</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-64 p-4 border-t bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              U
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">当前用户</div>
              <div className="text-xs text-gray-500">管理员</div>
            </div>
          </div>
        </div>
      </aside>

      {/* 右侧主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航栏 */}
        <header className="border-b bg-white px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-500 mt-1">欢迎使用报告管理系统</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="text-lg">🔔</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="text-lg">🌙</span>
            </button>
            
            {/* 用户退出按钮 */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            >
              <span>🚪</span>
              <span className="font-medium">退出登录</span>
            </button>
          </div>
        </header>

        {/* 内容区域 */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
