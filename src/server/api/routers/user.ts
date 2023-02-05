/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserByEmail: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    return await ctx.prisma.user.findUnique({
      where: { email: ctx.session.user.email },
      include: {
        organization: true,
      },
    });
  }),
  createOrganization: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const { email, id } = ctx.session.user;

      if (!email || !id) throw new TRPCError({ code: "UNAUTHORIZED" });

      const organization = await ctx.prisma.organization.create({
        data: {
          name,
          userId: id,
        },
      });

      return organization;
    }),
  getOrganizationsByAuthedUser: protectedProcedure.query(async ({ ctx }) => {
    const { email, id } = ctx.session.user;

    if (!email || !id) throw new TRPCError({ code: "UNAUTHORIZED" });

    return await ctx.prisma.organization.findMany({
      where: { userId: id },
    });
  }),
  getOrganizationById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      if (!id) throw new TRPCError({ code: "BAD_REQUEST" });

      return await ctx.prisma.organization.findUnique({
        where: { id },
      });
    }),
});
