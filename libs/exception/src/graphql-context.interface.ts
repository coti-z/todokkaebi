import { Request, Response } from 'express';

/**
 * GraphQL Context Interface
 *
 * @remarks
 * Defines the shape of NestJS GraphQL context object
 * Contains optional Express request and response objects
 */
export interface GraphQLContext {
  req?: Request;
  res?: Response;
}
