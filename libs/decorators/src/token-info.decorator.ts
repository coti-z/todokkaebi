import { JwtPayload } from '@libs/jwt';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const TokenInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = GqlExecutionContext.create(ctx);
    const getCtx = request.getContext();
    return getCtx.req.user;
  },
);
