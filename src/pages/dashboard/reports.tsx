import Head from "next/head";
import DashboardLayout from "~/components/DashboardLayout";

export default function DashboardReports() {
  return (
    <>
      <Head>
        <title>Dashboard - 报表</title>
      </Head>

      <DashboardLayout title="报表">
        <div className="space-y-6">
          {/* 报表筛选器 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">报表筛选</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">时间范围</label>
                <select className="w-full rounded border px-3 py-2">
                  <option>最近7天</option>
                  <option>最近30天</option>
                  <option>本季度</option>
                  <option>本年度</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">报表类型</label>
                <select className="w-full rounded border px-3 py-2">
                  <option>所有类型</option>
                  <option>销售报表</option>
                  <option>运营报表</option>
                  <option>财务报表</option>
                  <option>分析报表</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
                <select className="w-full rounded border px-3 py-2">
                  <option>所有状态</option>
                  <option>已完成</option>
                  <option>处理中</option>
                  <option>待审批</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">应用筛选</button>
            </div>
          </div>

          {/* 报表统计 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">本月生成报表</p>
                  <p className="text-3xl font-bold mt-2">42</p>
                </div>
                <div className="text-3xl text-blue-500">📈</div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>完成率</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">平均处理时间</p>
                  <p className="text-3xl font-bold mt-2">2.4天</p>
                </div>
                <div className="text-3xl text-green-500">⏱️</div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>较上月</span>
                  <span className="text-green-600">↓ 0.8天</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">用户满意度</p>
                  <p className="text-3xl font-bold mt-2">4.8/5.0</p>
                </div>
                <div className="text-3xl text-yellow-500">⭐</div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>评分分布</span>
                  <span>96% 好评</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 报表列表 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">最近报表</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                <span>📋</span>
                <span>新建报表</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">报表名称</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">类型</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">创建时间</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Q4销售分析报告", type: "销售报表", date: "2024-01-05", status: "已完成", statusColor: "bg-green-100 text-green-800" },
                    { name: "月度运营总结", type: "运营报表", date: "2024-01-04", status: "处理中", statusColor: "bg-blue-100 text-blue-800" },
                    { name: "年度财务审计", type: "财务报表", date: "2024-01-03", status: "待审批", statusColor: "bg-yellow-100 text-yellow-800" },
                    { name: "用户行为分析", type: "分析报表", date: "2024-01-02", status: "已完成", statusColor: "bg-green-100 text-green-800" },
                    { name: "市场趋势预测", type: "分析报表", date: "2024-01-01", status: "已归档", statusColor: "bg-gray-100 text-gray-800" },
                  ].map((report, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-gray-500">ID: REP-{1000 + index}</div>
                      </td>
                      <td className="py-3 px-4">{report.type}</td>
                      <td className="py-3 px-4">{report.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${report.statusColor}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">查看</button>
                          <button className="text-gray-600 hover:text-gray-800 text-sm">下载</button>
                          <button className="text-red-600 hover:text-red-800 text-sm">删除</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">显示 1-5 条，共 128 条报表</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">上一页</button>
                <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600 border-blue-200">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">下一页</button>
              </div>
            </div>
          </div>

          {/* 图表预览 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">报表生成趋势</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📊</div>
                  <p>图表预览区域</p>
                  <p className="text-sm">这里可以显示报表生成的趋势图表</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">类型分布</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🥧</div>
                  <p>饼图预览区域</p>
                  <p className="text-sm">这里可以显示报表类型的分布图</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
