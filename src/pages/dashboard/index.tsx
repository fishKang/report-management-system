import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardIndex() {
  const router = useRouter();

  const nav = [
    { href: "/dashboard", label: "概览" },
    { href: "/dashboard/reports", label: "报表" },
  ];

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <main className="flex min-h-screen bg-gray-50">
        <aside className="w-64 border-r bg-white p-4">
          <div className="mb-6 text-2xl font-bold">目录</div>
          <nav className="flex flex-col gap-2">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`block rounded px-3 py-2 hover:bg-gray-100 ${router.pathname === n.href ? "bg-gray-100 font-semibold" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="flex-1 p-8">
          <h1 className="text-3xl font-bold">概览</h1>
          <p className="mt-4 text-gray-700">这是 Dashboard 的默认页面。右侧区域用于展示具体实现的页面内容。</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded border bg-white p-4">示例卡片 1</div>
            <div className="rounded border bg-white p-4">示例卡片 2</div>
          </div>
        </section>
      </main>
    </>
  );
}
