import Head from "next/head";
import DashboardLayout from "~/components/DashboardLayout";

export default function DashboardIndex() {
  return (
    <>
      <Head>
        <title>Dashboard - 概览</title>
      </Head>

      <DashboardLayout title="概览">
        <div className="space-y-6">
          {/* 欢迎卡片 */}
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <h2 className="text-2xl font-bold">欢迎回来！</h2>
            <p className="mt-2 opacity-90">今天是 {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
            <p className="mt-1 opacity-90">您有3个待处理报告，2个需要审批</p>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">总报告数</p>
                  <p className="text-3xl font-bold mt-2">128</p>
                </div>
                <div className="text-3xl">📄</div>
              </div>
              <p className="text-sm text-green-600 mt-2">↑ 12% 较上月</p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">待处理</p>
                  <p className="text-3xl font-bold mt-2">12</p>
                </div>
                <div className="text-3xl">⏳</div>
              </div>
              <p className="text-sm text-yellow-600 mt-2">3个需要紧急处理</p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">已完成</p>
                  <p className="text-3xl font-bold mt-2">89</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
              <p className="text-sm text-blue-600 mt-2">70% 完成率</p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">用户活跃</p>
                  <p className="text-3xl font-bold mt-2">24</p>
                </div>
                <div className="text-3xl">👥</div>
              </div>
              <p className="text-sm text-purple-600 mt-2">今日活跃用户</p>
            </div>
          </div>

          {/* 最近活动 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">最近活动</h3>
            <div className="space-y-4">
              {[
                { user: "张三", action: "创建了新报告", time: "10分钟前", type: "create" },
                { user: "李四", action: "提交了审批", time: "1小时前", type: "submit" },
                { user: "王五", action: "评论了报告", time: "2小时前", type: "comment" },
                { user: "赵六", action: "完成了分析", time: "3小时前", type: "complete" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'create' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'submit' ? 'bg-green-100 text-green-600' :
                    activity.type === 'comment' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'create' ? '📝' :
                     activity.type === 'submit' ? '📤' :
                     activity.type === 'comment' ? '💬' : '📊'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.user} {activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 快速操作 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">快速操作</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded border hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📋</span>
                    <div>
                      <p className="font-medium">新建报告</p>
                      <p className="text-sm text-gray-500">创建新的分析报告</p>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded border hover:bg-green-50 hover:border-green-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <div>
                      <p className="font-medium">查看统计</p>
                      <p className="text-sm text-gray-500">查看系统统计数据</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">系统状态</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">存储空间</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">系统负载</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-500">最后更新：今天 14:30</p>
                  <p className="text-sm text-green-600 mt-1">✓ 所有系统运行正常</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
