import Head from "next/head";
import DashboardLayout from "~/components/DashboardLayout";

export default function DashboardSettings() {
  return (
    <>
      <Head>
        <title>Dashboard - 设置</title>
      </Head>

      <DashboardLayout title="系统设置">
        <div className="space-y-6">
          {/* 系统设置卡片 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">基本设置</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">系统名称</label>
                <input 
                  type="text" 
                  defaultValue="报告管理系统"
                  className="w-full rounded border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">时区设置</label>
                <select className="w-full rounded border px-3 py-2">
                  <option>Asia/Shanghai (UTC+8)</option>
                  <option>Asia/Tokyo (UTC+9)</option>
                  <option>America/New_York (UTC-5)</option>
                  <option>Europe/London (UTC+0)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">语言</label>
                <select className="w-full rounded border px-3 py-2">
                  <option>简体中文</option>
                  <option>English</option>
                  <option>日本語</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">保存设置</button>
            </div>
          </div>

          {/* 通知设置 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">通知设置</h3>
            <div className="space-y-4">
              {[
                { label: "新报告通知", description: "当有新报告创建时发送通知", enabled: true },
                { label: "审批提醒", description: "报告需要审批时发送提醒", enabled: true },
                { label: "系统更新", description: "系统维护和更新通知", enabled: false },
                { label: "安全警报", description: "检测到异常活动时发送警报", enabled: true },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={item.enabled} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* 安全设置 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">安全设置</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">密码策略</label>
                <select className="w-full rounded border px-3 py-2">
                  <option>标准 (至少8位字符)</option>
                  <option>中等 (至少12位，包含数字和字母)</option>
                  <option>严格 (至少16位，包含大小写字母、数字和特殊字符)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">会话超时</label>
                <select className="w-full rounded border px-3 py-2">
                  <option>15分钟</option>
                  <option>30分钟</option>
                  <option>1小时</option>
                  <option>4小时</option>
                </select>
              </div>
              <div className="pt-4 border-t">
                <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100">
                  重置所有设置
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
