import Head from "next/head";
import DashboardLayout from "~/components/DashboardLayout";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";

export default function MaterialsPage() {
  const [formData, setFormData] = useState({
    serialNumber: "",
    materialName: "",
    quantity: 0,
    price: 0,
    operator: "",
  });

  const [materialsList, setMaterialsList] = useState<any[]>([]);
  const [materialsInfoList, setMaterialsInfoList] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  // 使用tRPC查询
  const materialsDetailsQuery = api.material.getAllMaterialsDetails.useQuery();
  const materialsInfoQuery = api.material.getAllMaterialsInfo.useQuery();
  const materialsStatsQuery = api.material.getMaterialsStats.useQuery();
  const createMaterialDetailMutation = api.material.createMaterialDetail.useMutation({
    onSuccess: () => {
      materialsDetailsQuery.refetch();
      materialsInfoQuery.refetch();
      materialsStatsQuery.refetch();
      resetForm();
    },
  });

  // 检查mutation是否正在加载
  const isMutationLoading = createMaterialDetailMutation.isPending;

  // 自动生成序号（基于当前时间戳）
  const generateSerialNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `MAT-${year}${month}${day}-${hours}${minutes}${seconds}`;
  };

  // 自动生成登记日期和时间
  const generateRegistrationInfo = () => {
    const now = new Date();
    const date = now.toLocaleDateString('zh-CN');
    const time = now.toLocaleTimeString('zh-CN', { hour12: false });
    
    return { date, time };
  };

  // 自动生成操作员（从DashboardLayout获取当前用户）
  const generateOperator = () => {
    // 尝试从localStorage获取用户信息
    try {
      const savedUser = localStorage.getItem("currentUser");
      return savedUser || "管理员";
    } catch (error) {
      return "管理员";
    }
  };

  // 初始化表单
  useEffect(() => {
    const serial = generateSerialNumber();
    const { date, time } = generateRegistrationInfo();
    const operator = generateOperator();
    
    setFormData(prev => ({
      ...prev,
      serialNumber: serial,
      operator: operator,
    }));

    // 设置日期和时间显示
    const dateElement = document.getElementById('registrationDate');
    const timeElement = document.getElementById('registrationTime');
    if (dateElement) dateElement.textContent = date;
    if (timeElement) timeElement.textContent = time;
  }, []);

  // 加载数据
  useEffect(() => {
    if (materialsDetailsQuery.data) {
      setMaterialsList(materialsDetailsQuery.data);
    }
    if (materialsInfoQuery.data) {
      setMaterialsInfoList(materialsInfoQuery.data);
    }
    if (materialsStatsQuery.data) {
      setStats(materialsStatsQuery.data);
    }
  }, [materialsDetailsQuery.data, materialsInfoQuery.data, materialsStatsQuery.data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.materialName || formData.quantity <= 0) {
      alert("请填写原料名称和入库重量");
      return;
    }

    createMaterialDetailMutation.mutate({
      serialNumber: formData.serialNumber,
      materialName: formData.materialName,
      quantity: formData.quantity,
      price: formData.price,
      operator: formData.operator,
    });
  };

  const resetForm = () => {
    const serial = generateSerialNumber();
    const { date, time } = generateRegistrationInfo();
    const operator = generateOperator();
    
    setFormData({
      serialNumber: serial,
      materialName: "",
      quantity: 0,
      price: 0,
      operator: operator,
    });

    const dateElement = document.getElementById('registrationDate');
    const timeElement = document.getElementById('registrationTime');
    if (dateElement) dateElement.textContent = date;
    if (timeElement) timeElement.textContent = time;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
    }).format(amount);
  };

  return (
    <>
      <Head>
        <title>Dashboard - 原料明细</title>
      </Head>

      <DashboardLayout title="原料明细">
        <div className="space-y-6">
          {/* 统计卡片 */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">原料总价值</p>
                    <p className="text-3xl font-bold mt-2">{formatCurrency(stats.totalValue)}</p>
                  </div>
                  <div className="text-3xl">💰</div>
                </div>
                <p className="text-sm text-green-600 mt-2">库存总价值</p>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">原料种类</p>
                    <p className="text-3xl font-bold mt-2">{stats.totalMaterials}</p>
                  </div>
                  <div className="text-3xl">📦</div>
                </div>
                <p className="text-sm text-blue-600 mt-2">不同原料数量</p>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">交易记录</p>
                    <p className="text-3xl font-bold mt-2">{stats.totalTransactions}</p>
                  </div>
                  <div className="text-3xl">📝</div>
                </div>
                <p className="text-sm text-purple-600 mt-2">总入库记录</p>
              </div>
            </div>
          )}

          {/* 表单区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 入库登记表单 */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">原料入库登记</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 自动生成字段 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      序号
                    </label>
                    <input
                      type="text"
                      name="serialNumber"
                      value={formData.serialNumber}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      操作员
                    </label>
                    <input
                      type="text"
                      name="operator"
                      value={formData.operator}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      登记日期
                    </label>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                      <span id="registrationDate"></span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      登记时间
                    </label>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                      <span id="registrationTime"></span>
                    </div>
                  </div>
                </div>

                {/* 手动输入字段 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    原料名称 *
                  </label>
                  <input
                    type="text"
                    name="materialName"
                    value={formData.materialName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入原料名称"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      入库重量 (kg) *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      价格 (元/kg)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isMutationLoading}
                      className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isMutationLoading ? "提交中..." : "提交入库"}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      重置
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* 最近入库记录 */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">最近入库记录</h3>
                <button
                  onClick={() => materialsDetailsQuery.refetch()}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  刷新
                </button>
              </div>

              {materialsDetailsQuery.isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500">加载中...</p>
                </div>
              ) : materialsList.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📦</div>
                  <p>暂无入库记录</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {materialsList.slice(0, 10).map((item, index) => (
                    <div key={item.id} className="p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.materialName}</span>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                              {item.serialNumber}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            数量: {item.quantity}kg • 价格: {formatCurrency(item.price)}/kg
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(item.createdAt).toLocaleString('zh-CN')} • 操作员: {item.operator}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            {formatCurrency(item.quantity * item.price)}
                          </p>
                          <p className="text-xs text-gray-500">总价值</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 原料信息表格 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">原料库存信息</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      序号
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      原料名称
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      总量 (kg)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      上次总量 (kg)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      总价格
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      上次总价格
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      最近操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {materialsInfoList.length > 0 ? (
                    materialsInfoList.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {item.serialNumber}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.materialName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.totalQuantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.lastTotalQuantity}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-green-600">
                          {formatCurrency(item.totalPrice)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {formatCurrency(item.lastTotalPrice)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(item.lastModifiedDate).toLocaleDateString('zh-CN')}
                          <br />
                          <span className="text-xs">{item.lastOperator}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        暂无原料信息
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}