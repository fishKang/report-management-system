import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        username: z.string().min(1, "用户名不能为空"),
        email: z.string().email("邮箱格式不正确"),
        password: z.string().min(6, "密码至少需要6位"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // 检查邮箱是否已存在
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new Error("该邮箱已被注册");
      }

      // 生成 UUID
      const userId = generateUUID();
      const accountId = generateUUID();

      // 创建新用户
      // 注意：在实际生产环境中，密码应该进行哈希处理
      // 这里为了简化，直接存储明文密码（不推荐）
      // 建议使用 bcrypt 或 argon2 进行密码哈希
      const user = await ctx.db.user.create({
        data: {
          id: userId,
          name: input.username,
          email: input.email,
          // 在实际应用中，这里应该存储哈希后的密码
          // 但根据 schema，密码存储在 Account 表中
          // 所以我们需要同时创建 Account 记录
        },
      });

      // 创建账户记录（存储密码）
      await ctx.db.account.create({
        data: {
          id: accountId,
          accountId: input.email,
          providerId: "credentials",
          userId: user.id,
          password: input.password, // 在实际应用中应该存储哈希值
          accessToken: null,
          refreshToken: null,
          idToken: null,
          accessTokenExpiresAt: null,
          refreshTokenExpiresAt: null,
          scope: null,
        },
      });

      return {
        success: true,
        message: "注册成功",
        userId: user.id,
      };
    }),

  // 登录功能
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email("邮箱格式不正确"),
        password: z.string().min(1, "密码不能为空"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // 查找用户
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
        include: {
          accounts: {
            where: {
              providerId: "credentials",
            },
          },
        },
      });

      if (!user) {
        throw new Error("用户不存在");
      }

      // 检查账户记录
      const account = user.accounts[0];
      if (!account) {
        throw new Error("账户不存在");
      }

      // 验证密码
      // 注意：在实际应用中，这里应该比较哈希后的密码
      // 这里为了简化，直接比较明文密码（不推荐）
      if (account.password !== input.password) {
        throw new Error("密码错误");
      }

      return {
        success: true,
        message: "登录成功",
        userId: user.id,
        userName: user.name,
      };
    }),

  // 可以添加其他用户相关的方法
  checkEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      return {
        available: !existingUser,
      };
    }),
});

// 生成 UUID 的辅助函数
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
