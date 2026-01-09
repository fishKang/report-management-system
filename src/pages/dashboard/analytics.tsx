import Head from "next/head";
import DashboardLayout from "~/components/DashboardLayout";

export default function DashboardAnalytics() {
  return (
    <>
      <Head>
        <title>Dashboard - 分析</title>
      </Head>

      <DashboardLayout title="数据分析">
        <div className="space-y-6">
          {/* 关键指标 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">访问量</p>
                  <p className="text-3xl font-bold mt-2">2,847</p>
                </div>
                <div className="text-3xl text-blue-500">👁️</div>
              </div>
              <p className="text-sm text-green-600 mt-2">↑ 24% 较上周</p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">用户参与度</p>
                  <p className="text-3xl font-bold mt-2">78%</p>
                </div>
                <div className="text-3xl text-green-500">📊</div>
              </div>
              <p className="text-sm text-green-600 mt-2">↑ 8% 较上周</p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">平均停留时间</p>
                  <p className="text-3xl font-bold mt-2">4.2m</p>
                </div>
                <div className="text-3xl text-yellow-500">⏱️</div>
              </div>
              <p className="text-sm text-red-600 mt-2">↓ 0.3m 较上周</p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">转化率</p>
                  <p className="text-3xl font-bold mt-2">12.5%</p>
                </div>
                <div className="text-3xl text-purple-500">📈</div>
              </div>
              <p className="text-sm text-green-600 mt-2">↑ 2.1% 较上周</p>
            </div>
          </div>

          {/* 图表区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">访问趋势</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📈</div>
                  <p>访问趋势图表</p>
                  <p className="text-sm">这里可以显示每日/每周访问量趋势</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">用户分布</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p>用户地理分布图</p>
                  <p className="text-sm">这里可以显示用户的地理位置分布</p>
                </div>
              </div>
            </div>
          </div>

          {/* 用户行为分析 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">用户行为分析</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">页面</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">访问量</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">平均停留时间</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">跳出率</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">转化率</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { page: "概览页面", visits: "1,248", time: "3:42", bounce: "32%", conversion: "15%" },
                    { page: "报表页面", visits: "892", time: "5:18", bounce: "28%", conversion: "22%" },
                    { page: "分析页面", visits: "567", time: "4:12", bounce: "35%", conversion: "18%" },
                    { page: "设置页面", visits: "321", time: "2:45", bounce: "42%", conversion: "8%" },
                    { page: "用户管理", visits: "198", time: "6:23", bounce: "24%", conversion: "31%" },
                  ].map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{item.page}</td>
                      <td className="py-3 px-4">{item.visits}</td>
                      <td className="py-3 px-4">{item.time}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          parseFloat(item.bounce) < 35 ? 'bg-green-100 text-green-800' : 
                          parseFloat(item.bounce) < 40 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.bounce}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          parseFloat(item.conversion) > 20 ? 'bg-green-100 text-green-800' : 
                          parseFloat(item.conversion) > 10 ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.conversion}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 设备分析 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">设备分布</h3>
              <div className="space-y-4">
                {[
                  { device: "桌面端", percentage: 58, color: "bg-blue-500" },
                  { device: "移动端", percentage: 35, color: "bg-green-500" },
                  { device: "平板", percentage: 7, color: "bg-yellow-500" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.device}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">流量来源</h3>
              <div className="space-y-4">
                {[
                  { source: "直接访问", percentage: 42, color: "bg-purple-500" },
                  { source: "搜索引擎", percentage: 35, color: "bg-blue-500" },
                  { source: "社交媒体", percentage: 15, color: "bg-pink-500" },
                  { source: "外部链接", percentage: 8, color: "bg-green-500" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.source}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">时段分析</h3>
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🕒</div>
                  <p>时段热力图</p>
                  <p className="text-sm">这里可以显示用户活跃时段</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
