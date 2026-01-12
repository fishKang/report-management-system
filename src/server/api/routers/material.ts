import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const materialRouter = createTRPCRouter({
  // 获取所有原料信息
  getAllMaterialsInfo: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.materialsInfo.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  // 获取所有原料明细
  getAllMaterialsDetails: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.materialsDetail.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  // 创建原料信息
  createMaterialInfo: publicProcedure
    .input(
      z.object({
        serialNumber: z.string().min(1),
        materialName: z.string().min(1),
        totalQuantity: z.number().min(0),
        lastTotalQuantity: z.number().min(0),
        totalPrice: z.number().min(0),
        lastTotalPrice: z.number().min(0),
        lastOperator: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.materialsInfo.create({
        data: {
          serialNumber: input.serialNumber,
          materialName: input.materialName,
          totalQuantity: input.totalQuantity,
          lastTotalQuantity: input.lastTotalQuantity,
          totalPrice: input.totalPrice,
          lastTotalPrice: input.lastTotalPrice,
          lastOperator: input.lastOperator,
          lastModifiedDate: new Date(),
          lastModifiedTime: new Date(),
        },
      });
    }),

  // 创建原料明细
  createMaterialDetail: publicProcedure
    .input(
      z.object({
        serialNumber: z.string().min(1),
        materialName: z.string().min(1),
        quantity: z.number().min(0),
        price: z.number().min(0),
        operator: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 首先检查原料信息表中是否有相同原料名称的记录
      const existingMaterialInfo = await ctx.db.materialsInfo.findFirst({
        where: { materialName: input.materialName },
      });

      const now = new Date();
      const currentTotalPrice = input.quantity * input.price;
      
      if (existingMaterialInfo) {
        // 如果存在，更新原料信息表
        await ctx.db.materialsInfo.update({
          where: { id: existingMaterialInfo.id },
          data: {
            lastTotalQuantity: existingMaterialInfo.totalQuantity,
            totalQuantity: existingMaterialInfo.totalQuantity + input.quantity,
            lastTotalPrice: existingMaterialInfo.totalPrice,
            totalPrice: existingMaterialInfo.totalPrice + currentTotalPrice,
            lastModifiedDate: now,
            lastModifiedTime: now,
            lastOperator: input.operator,
          },
        });
      } else {
        // 如果不存在，创建新的原料信息记录
        await ctx.db.materialsInfo.create({
          data: {
            serialNumber: input.serialNumber,
            materialName: input.materialName,
            totalQuantity: input.quantity,
            lastTotalQuantity: 0,
            totalPrice: currentTotalPrice,
            lastTotalPrice: 0,
            lastModifiedDate: now,
            lastModifiedTime: now,
            lastOperator: input.operator,
          },
        });
      }

      // 创建原料明细记录
      return ctx.db.materialsDetail.create({
        data: {
          serialNumber: input.serialNumber,
          materialName: input.materialName,
          quantity: input.quantity,
          price: input.price,
          operator: input.operator,
          createTime: now,
        },
      });
    }),

  // 获取原料信息统计
  getMaterialsStats: publicProcedure.query(async ({ ctx }) => {
    const materialsInfo = await ctx.db.materialsInfo.findMany();
    const materialsDetails = await ctx.db.materialsDetail.findMany();

    const totalValue = materialsInfo.reduce(
      (sum, material) => sum + material.totalPrice,
      0,
    );

    const totalMaterials = materialsInfo.length;
    const totalTransactions = materialsDetails.length;

    return {
      totalValue,
      totalMaterials,
      totalTransactions,
      recentTransactions: materialsDetails.slice(0, 5),
    };
  }),

  // 根据序号获取原料信息
  getMaterialInfoBySerial: publicProcedure
    .input(z.object({ serialNumber: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.materialsInfo.findUnique({
        where: { serialNumber: input.serialNumber },
      });
    }),

  // 根据原料名称搜索
  searchMaterialsByName: publicProcedure
    .input(z.object({ materialName: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.materialsInfo.findMany({
        where: {
          materialName: {
            contains: input.materialName,
            mode: "insensitive",
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }),
});
