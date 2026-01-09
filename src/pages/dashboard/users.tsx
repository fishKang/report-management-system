import Head from "next/head";
import DashboardLayout from "~/components/DashboardLayout";

export default function DashboardUsers() {
  return (
    <>
      <Head>
        <title>Dashboard - 用户管理</title>
      </Head>

      <DashboardLayout title="用户管理">
        <div className="space-y-6">
          {/* 用户统计 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">总用户数</p>
                  <p className="text-3xl font-bold mt-2">1,248</p>
                </div>
                <div className="text-3xl text-blue-500">👥</div>
              </div>
              <p className="text-sm text-green-600 mt-2">↑ 12% 较上月</p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">活跃用户</p>
                  <p className="text-3xl font-bold mt-2">842</p>
                </div>
                <div className="text-3xl text-green-500">✅</div>
              </div>
              <p className="text-sm text-green-600 mt-2">↑ 8% 较上周</p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">新注册</p>
                  <p className="text-3xl font-bold mt-2">48</p>
                </div>
                <div className="text-3xl text-yellow-500">📈</div>
              </div>
              <p className="text-sm text-green-600 mt-2">本月新增</p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">管理员</p>
                  <p className="text-3xl font-bold mt-2">12</p>
                </div>
                <div className="text-3xl text-purple-500">👑</div>
              </div>
              <p className="text-sm text-gray-600 mt-2">系统管理员</p>
            </div>
          </div>

          {/* 用户列表 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">用户列表</h3>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="搜索用户..."
                  className="rounded border px-3 py-2 w-64"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                  <span>➕</span>
                  <span>添加用户</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">用户</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">邮箱</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">角色</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">最后登录</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "张三", email: "zhangsan@example.com", role: "管理员", status: "活跃", lastLogin: "今天 10:30", avatarColor: "bg-blue-100 text-blue-600" },
                    { name: "李四", email: "lisi@example.com", role: "编辑", status: "活跃", lastLogin: "今天 09:15", avatarColor: "bg-green-100 text-green-600" },
                    { name: "王五", email: "wangwu@example.com", role: "查看者", status: "活跃", lastLogin: "昨天 16:45", avatarColor: "bg-yellow-100 text-yellow-600" },
                    { name: "赵六", email: "zhaoliu@example.com", role: "编辑", status: "离线", lastLogin: "2天前", avatarColor: "bg-purple-100 text-purple-600" },
                    { name: "钱七", email: "qianqi@example.com", role: "查看者", status: "禁用", lastLogin: "1周前", avatarColor: "bg-red-100 text-red-600" },
                    { name: "孙八", email: "sunba@example.com", role: "管理员", status: "活跃", lastLogin: "今天 08:20", avatarColor: "bg-indigo-100 text-indigo-600" },
                    { name: "周九", email: "zhoujiu@example.com", role: "编辑", status: "活跃", lastLogin: "今天 11:45", avatarColor: "bg-pink-100 text-pink-600" },
                    { name: "吴十", email: "wushi@example.com", role: "查看者", status: "离线", lastLogin: "3天前", avatarColor: "bg-gray-100 text-gray-600" },
                  ].map((user, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.avatarColor}`}>
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">ID: USER-{1000 + index}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === '管理员' ? 'bg-purple-100 text-purple-800' :
                          user.role === '编辑' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === '活跃' ? 'bg-green-100 text-green-800' :
                          user.status === '离线' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{user.lastLogin}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">编辑</button>
                          <button className="text-gray-600 hover:text-gray-800 text-sm">重置密码</button>
                          <button className="text-red-600 hover:text-red-800 text-sm">禁用</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">显示 1-8 条，共 1,248 位用户</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">上一页</button>
                <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600 border-blue-200">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">...</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">156</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">下一页</button>
              </div>
            </div>
          </div>

          {/* 角色管理 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">角色权限</h3>
              <div className="space-y-4">
                {[
                  { role: "管理员", description: "完全系统访问权限", users: 12, permissions: "所有权限" },
                  { role: "编辑", description: "可以创建和编辑内容", users: 45, permissions: "创建、编辑、删除" },
                  { role: "查看者", description: "只能查看内容", users: 1191, permissions: "只读访问" },
                ].map((role, index) => (
                  <div key={index} className="p-4 border rounded hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{role.role}</div>
                        <div className="text-sm text-gray-500 mt-1">{role.description}</div>
                        <div className="text-sm text-gray-600 mt-2">{role.users} 位用户</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-700">{role.permissions}</div>
                        <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">编辑权限</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">用户活动</h3>
              <div className="space-y-4">
                {[
                  { user: "张三", action: "创建了新报告", time: "10分钟前" },
                  { user: "李四", action: "修改了用户权限", time: "25分钟前" },
                  { user: "王五", action: "导出了数据报表", time: "1小时前" },
                  { user: "赵六", action: "登录系统", time: "2小时前" },
                  { user: "钱七", action: "重置了密码", time: "3小时前" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.user} {activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border rounded text-gray-600 hover:bg-gray-50">
                查看所有活动
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
