
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Tokens
 * 
 */
export type Tokens = $Result.DefaultSelection<Prisma.$TokensPayload>
/**
 * Model OAuthProvider
 * 
 */
export type OAuthProvider = $Result.DefaultSelection<Prisma.$OAuthProviderPayload>
/**
 * Model UserCredentials
 * 
 */
export type UserCredentials = $Result.DefaultSelection<Prisma.$UserCredentialsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProviderType: {
  KAKAO: 'KAKAO',
  GOOGLE: 'GOOGLE',
  APPLE: 'APPLE'
};

export type ProviderType = (typeof ProviderType)[keyof typeof ProviderType]

}

export type ProviderType = $Enums.ProviderType

export const ProviderType: typeof $Enums.ProviderType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tokens
 * const tokens = await prisma.tokens.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tokens
   * const tokens = await prisma.tokens.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.tokens`: Exposes CRUD operations for the **Tokens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.tokens.findMany()
    * ```
    */
  get tokens(): Prisma.TokensDelegate<ExtArgs>;

  /**
   * `prisma.oAuthProvider`: Exposes CRUD operations for the **OAuthProvider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthProviders
    * const oAuthProviders = await prisma.oAuthProvider.findMany()
    * ```
    */
  get oAuthProvider(): Prisma.OAuthProviderDelegate<ExtArgs>;

  /**
   * `prisma.userCredentials`: Exposes CRUD operations for the **UserCredentials** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserCredentials
    * const userCredentials = await prisma.userCredentials.findMany()
    * ```
    */
  get userCredentials(): Prisma.UserCredentialsDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.2.0
   * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Tokens: 'Tokens',
    OAuthProvider: 'OAuthProvider',
    UserCredentials: 'UserCredentials'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    authDB?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "tokens" | "oAuthProvider" | "userCredentials"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Tokens: {
        payload: Prisma.$TokensPayload<ExtArgs>
        fields: Prisma.TokensFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokensFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokensPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokensFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokensPayload>
          }
          findFirst: {
            args: Prisma.TokensFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokensPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokensFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokensPayload>
          }
          findMany: {
            args: Prisma.TokensFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokensPayload>[]
          }
          create: {
            args: Prisma.TokensCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokensPayload>
          }
          createMany: {
            args: Prisma.TokensCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TokensDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokensPayload>
          }
          update: {
            args: Prisma.TokensUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokensPayload>
          }
          deleteMany: {
            args: Prisma.TokensDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokensUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TokensUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokensPayload>
          }
          aggregate: {
            args: Prisma.TokensAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTokens>
          }
          groupBy: {
            args: Prisma.TokensGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokensGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokensCountArgs<ExtArgs>
            result: $Utils.Optional<TokensCountAggregateOutputType> | number
          }
        }
      }
      OAuthProvider: {
        payload: Prisma.$OAuthProviderPayload<ExtArgs>
        fields: Prisma.OAuthProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthProviderPayload>
          }
          findFirst: {
            args: Prisma.OAuthProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthProviderPayload>
          }
          findMany: {
            args: Prisma.OAuthProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthProviderPayload>[]
          }
          create: {
            args: Prisma.OAuthProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthProviderPayload>
          }
          createMany: {
            args: Prisma.OAuthProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OAuthProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthProviderPayload>
          }
          update: {
            args: Prisma.OAuthProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthProviderPayload>
          }
          deleteMany: {
            args: Prisma.OAuthProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OAuthProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthProviderPayload>
          }
          aggregate: {
            args: Prisma.OAuthProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthProvider>
          }
          groupBy: {
            args: Prisma.OAuthProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthProviderCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthProviderCountAggregateOutputType> | number
          }
        }
      }
      UserCredentials: {
        payload: Prisma.$UserCredentialsPayload<ExtArgs>
        fields: Prisma.UserCredentialsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserCredentialsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserCredentialsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialsPayload>
          }
          findFirst: {
            args: Prisma.UserCredentialsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserCredentialsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialsPayload>
          }
          findMany: {
            args: Prisma.UserCredentialsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialsPayload>[]
          }
          create: {
            args: Prisma.UserCredentialsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialsPayload>
          }
          createMany: {
            args: Prisma.UserCredentialsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserCredentialsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialsPayload>
          }
          update: {
            args: Prisma.UserCredentialsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialsPayload>
          }
          deleteMany: {
            args: Prisma.UserCredentialsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserCredentialsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserCredentialsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialsPayload>
          }
          aggregate: {
            args: Prisma.UserCredentialsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserCredentials>
          }
          groupBy: {
            args: Prisma.UserCredentialsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserCredentialsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCredentialsCountArgs<ExtArgs>
            result: $Utils.Optional<UserCredentialsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Tokens
   */

  export type AggregateTokens = {
    _count: TokensCountAggregateOutputType | null
    _min: TokensMinAggregateOutputType | null
    _max: TokensMaxAggregateOutputType | null
  }

  export type TokensMinAggregateOutputType = {
    id: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    isRevoked: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    expiresAt: Date | null
  }

  export type TokensMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    isRevoked: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    expiresAt: Date | null
  }

  export type TokensCountAggregateOutputType = {
    id: number
    userId: number
    accessToken: number
    refreshToken: number
    isRevoked: number
    createdAt: number
    updatedAt: number
    expiresAt: number
    _all: number
  }


  export type TokensMinAggregateInputType = {
    id?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    isRevoked?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
  }

  export type TokensMaxAggregateInputType = {
    id?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    isRevoked?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
  }

  export type TokensCountAggregateInputType = {
    id?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    isRevoked?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type TokensAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to aggregate.
     */
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokensOrderByWithRelationInput | TokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokensMaxAggregateInputType
  }

  export type GetTokensAggregateType<T extends TokensAggregateArgs> = {
        [P in keyof T & keyof AggregateTokens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokens[P]>
      : GetScalarType<T[P], AggregateTokens[P]>
  }




  export type TokensGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokensWhereInput
    orderBy?: TokensOrderByWithAggregationInput | TokensOrderByWithAggregationInput[]
    by: TokensScalarFieldEnum[] | TokensScalarFieldEnum
    having?: TokensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokensCountAggregateInputType | true
    _min?: TokensMinAggregateInputType
    _max?: TokensMaxAggregateInputType
  }

  export type TokensGroupByOutputType = {
    id: string
    userId: string
    accessToken: string
    refreshToken: string
    isRevoked: boolean
    createdAt: Date
    updatedAt: Date
    expiresAt: Date
    _count: TokensCountAggregateOutputType | null
    _min: TokensMinAggregateOutputType | null
    _max: TokensMaxAggregateOutputType | null
  }

  type GetTokensGroupByPayload<T extends TokensGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokensGroupByOutputType[P]>
            : GetScalarType<T[P], TokensGroupByOutputType[P]>
        }
      >
    >


  export type TokensSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    isRevoked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["tokens"]>



  export type TokensSelectScalar = {
    id?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    isRevoked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
  }


  export type $TokensPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tokens"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      accessToken: string
      refreshToken: string
      isRevoked: boolean
      createdAt: Date
      updatedAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["tokens"]>
    composites: {}
  }

  type TokensGetPayload<S extends boolean | null | undefined | TokensDefaultArgs> = $Result.GetResult<Prisma.$TokensPayload, S>

  type TokensCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokensFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TokensCountAggregateInputType | true
    }

  export interface TokensDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tokens'], meta: { name: 'Tokens' } }
    /**
     * Find zero or one Tokens that matches the filter.
     * @param {TokensFindUniqueArgs} args - Arguments to find a Tokens
     * @example
     * // Get one Tokens
     * const tokens = await prisma.tokens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokensFindUniqueArgs>(args: SelectSubset<T, TokensFindUniqueArgs<ExtArgs>>): Prisma__TokensClient<$Result.GetResult<Prisma.$TokensPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tokens that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokensFindUniqueOrThrowArgs} args - Arguments to find a Tokens
     * @example
     * // Get one Tokens
     * const tokens = await prisma.tokens.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokensFindUniqueOrThrowArgs>(args: SelectSubset<T, TokensFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokensClient<$Result.GetResult<Prisma.$TokensPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensFindFirstArgs} args - Arguments to find a Tokens
     * @example
     * // Get one Tokens
     * const tokens = await prisma.tokens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokensFindFirstArgs>(args?: SelectSubset<T, TokensFindFirstArgs<ExtArgs>>): Prisma__TokensClient<$Result.GetResult<Prisma.$TokensPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tokens that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensFindFirstOrThrowArgs} args - Arguments to find a Tokens
     * @example
     * // Get one Tokens
     * const tokens = await prisma.tokens.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokensFindFirstOrThrowArgs>(args?: SelectSubset<T, TokensFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokensClient<$Result.GetResult<Prisma.$TokensPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.tokens.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.tokens.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokensWithIdOnly = await prisma.tokens.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokensFindManyArgs>(args?: SelectSubset<T, TokensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokensPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tokens.
     * @param {TokensCreateArgs} args - Arguments to create a Tokens.
     * @example
     * // Create one Tokens
     * const Tokens = await prisma.tokens.create({
     *   data: {
     *     // ... data to create a Tokens
     *   }
     * })
     * 
     */
    create<T extends TokensCreateArgs>(args: SelectSubset<T, TokensCreateArgs<ExtArgs>>): Prisma__TokensClient<$Result.GetResult<Prisma.$TokensPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tokens.
     * @param {TokensCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const tokens = await prisma.tokens.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokensCreateManyArgs>(args?: SelectSubset<T, TokensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tokens.
     * @param {TokensDeleteArgs} args - Arguments to delete one Tokens.
     * @example
     * // Delete one Tokens
     * const Tokens = await prisma.tokens.delete({
     *   where: {
     *     // ... filter to delete one Tokens
     *   }
     * })
     * 
     */
    delete<T extends TokensDeleteArgs>(args: SelectSubset<T, TokensDeleteArgs<ExtArgs>>): Prisma__TokensClient<$Result.GetResult<Prisma.$TokensPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tokens.
     * @param {TokensUpdateArgs} args - Arguments to update one Tokens.
     * @example
     * // Update one Tokens
     * const tokens = await prisma.tokens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokensUpdateArgs>(args: SelectSubset<T, TokensUpdateArgs<ExtArgs>>): Prisma__TokensClient<$Result.GetResult<Prisma.$TokensPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tokens.
     * @param {TokensDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.tokens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokensDeleteManyArgs>(args?: SelectSubset<T, TokensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const tokens = await prisma.tokens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokensUpdateManyArgs>(args: SelectSubset<T, TokensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tokens.
     * @param {TokensUpsertArgs} args - Arguments to update or create a Tokens.
     * @example
     * // Update or create a Tokens
     * const tokens = await prisma.tokens.upsert({
     *   create: {
     *     // ... data to create a Tokens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tokens we want to update
     *   }
     * })
     */
    upsert<T extends TokensUpsertArgs>(args: SelectSubset<T, TokensUpsertArgs<ExtArgs>>): Prisma__TokensClient<$Result.GetResult<Prisma.$TokensPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.tokens.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokensCountArgs>(
      args?: Subset<T, TokensCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokensAggregateArgs>(args: Subset<T, TokensAggregateArgs>): Prisma.PrismaPromise<GetTokensAggregateType<T>>

    /**
     * Group by Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokensGroupByArgs['orderBy'] }
        : { orderBy?: TokensGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tokens model
   */
  readonly fields: TokensFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tokens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokensClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tokens model
   */ 
  interface TokensFieldRefs {
    readonly id: FieldRef<"Tokens", 'String'>
    readonly userId: FieldRef<"Tokens", 'String'>
    readonly accessToken: FieldRef<"Tokens", 'String'>
    readonly refreshToken: FieldRef<"Tokens", 'String'>
    readonly isRevoked: FieldRef<"Tokens", 'Boolean'>
    readonly createdAt: FieldRef<"Tokens", 'DateTime'>
    readonly updatedAt: FieldRef<"Tokens", 'DateTime'>
    readonly expiresAt: FieldRef<"Tokens", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tokens findUnique
   */
  export type TokensFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where: TokensWhereUniqueInput
  }

  /**
   * Tokens findUniqueOrThrow
   */
  export type TokensFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where: TokensWhereUniqueInput
  }

  /**
   * Tokens findFirst
   */
  export type TokensFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokensOrderByWithRelationInput | TokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokensScalarFieldEnum | TokensScalarFieldEnum[]
  }

  /**
   * Tokens findFirstOrThrow
   */
  export type TokensFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokensOrderByWithRelationInput | TokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokensScalarFieldEnum | TokensScalarFieldEnum[]
  }

  /**
   * Tokens findMany
   */
  export type TokensFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokensOrderByWithRelationInput | TokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokensScalarFieldEnum | TokensScalarFieldEnum[]
  }

  /**
   * Tokens create
   */
  export type TokensCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * The data needed to create a Tokens.
     */
    data: XOR<TokensCreateInput, TokensUncheckedCreateInput>
  }

  /**
   * Tokens createMany
   */
  export type TokensCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokensCreateManyInput | TokensCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tokens update
   */
  export type TokensUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * The data needed to update a Tokens.
     */
    data: XOR<TokensUpdateInput, TokensUncheckedUpdateInput>
    /**
     * Choose, which Tokens to update.
     */
    where: TokensWhereUniqueInput
  }

  /**
   * Tokens updateMany
   */
  export type TokensUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokensUpdateManyMutationInput, TokensUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokensWhereInput
  }

  /**
   * Tokens upsert
   */
  export type TokensUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * The filter to search for the Tokens to update in case it exists.
     */
    where: TokensWhereUniqueInput
    /**
     * In case the Tokens found by the `where` argument doesn't exist, create a new Tokens with this data.
     */
    create: XOR<TokensCreateInput, TokensUncheckedCreateInput>
    /**
     * In case the Tokens was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokensUpdateInput, TokensUncheckedUpdateInput>
  }

  /**
   * Tokens delete
   */
  export type TokensDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Filter which Tokens to delete.
     */
    where: TokensWhereUniqueInput
  }

  /**
   * Tokens deleteMany
   */
  export type TokensDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokensWhereInput
  }

  /**
   * Tokens without action
   */
  export type TokensDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
  }


  /**
   * Model OAuthProvider
   */

  export type AggregateOAuthProvider = {
    _count: OAuthProviderCountAggregateOutputType | null
    _min: OAuthProviderMinAggregateOutputType | null
    _max: OAuthProviderMaxAggregateOutputType | null
  }

  export type OAuthProviderMinAggregateOutputType = {
    id: string | null
    provider: $Enums.ProviderType | null
    providerId: string | null
    userId: string | null
    createAt: Date | null
    updateAt: Date | null
  }

  export type OAuthProviderMaxAggregateOutputType = {
    id: string | null
    provider: $Enums.ProviderType | null
    providerId: string | null
    userId: string | null
    createAt: Date | null
    updateAt: Date | null
  }

  export type OAuthProviderCountAggregateOutputType = {
    id: number
    provider: number
    providerId: number
    userId: number
    createAt: number
    updateAt: number
    _all: number
  }


  export type OAuthProviderMinAggregateInputType = {
    id?: true
    provider?: true
    providerId?: true
    userId?: true
    createAt?: true
    updateAt?: true
  }

  export type OAuthProviderMaxAggregateInputType = {
    id?: true
    provider?: true
    providerId?: true
    userId?: true
    createAt?: true
    updateAt?: true
  }

  export type OAuthProviderCountAggregateInputType = {
    id?: true
    provider?: true
    providerId?: true
    userId?: true
    createAt?: true
    updateAt?: true
    _all?: true
  }

  export type OAuthProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthProvider to aggregate.
     */
    where?: OAuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthProviders to fetch.
     */
    orderBy?: OAuthProviderOrderByWithRelationInput | OAuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthProviders
    **/
    _count?: true | OAuthProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthProviderMaxAggregateInputType
  }

  export type GetOAuthProviderAggregateType<T extends OAuthProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthProvider[P]>
      : GetScalarType<T[P], AggregateOAuthProvider[P]>
  }




  export type OAuthProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthProviderWhereInput
    orderBy?: OAuthProviderOrderByWithAggregationInput | OAuthProviderOrderByWithAggregationInput[]
    by: OAuthProviderScalarFieldEnum[] | OAuthProviderScalarFieldEnum
    having?: OAuthProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthProviderCountAggregateInputType | true
    _min?: OAuthProviderMinAggregateInputType
    _max?: OAuthProviderMaxAggregateInputType
  }

  export type OAuthProviderGroupByOutputType = {
    id: string
    provider: $Enums.ProviderType
    providerId: string
    userId: string
    createAt: Date
    updateAt: Date
    _count: OAuthProviderCountAggregateOutputType | null
    _min: OAuthProviderMinAggregateOutputType | null
    _max: OAuthProviderMaxAggregateOutputType | null
  }

  type GetOAuthProviderGroupByPayload<T extends OAuthProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthProviderGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthProviderGroupByOutputType[P]>
        }
      >
    >


  export type OAuthProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerId?: boolean
    userId?: boolean
    createAt?: boolean
    updateAt?: boolean
  }, ExtArgs["result"]["oAuthProvider"]>



  export type OAuthProviderSelectScalar = {
    id?: boolean
    provider?: boolean
    providerId?: boolean
    userId?: boolean
    createAt?: boolean
    updateAt?: boolean
  }


  export type $OAuthProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthProvider"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: $Enums.ProviderType
      providerId: string
      userId: string
      createAt: Date
      updateAt: Date
    }, ExtArgs["result"]["oAuthProvider"]>
    composites: {}
  }

  type OAuthProviderGetPayload<S extends boolean | null | undefined | OAuthProviderDefaultArgs> = $Result.GetResult<Prisma.$OAuthProviderPayload, S>

  type OAuthProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthProviderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OAuthProviderCountAggregateInputType | true
    }

  export interface OAuthProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthProvider'], meta: { name: 'OAuthProvider' } }
    /**
     * Find zero or one OAuthProvider that matches the filter.
     * @param {OAuthProviderFindUniqueArgs} args - Arguments to find a OAuthProvider
     * @example
     * // Get one OAuthProvider
     * const oAuthProvider = await prisma.oAuthProvider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthProviderFindUniqueArgs>(args: SelectSubset<T, OAuthProviderFindUniqueArgs<ExtArgs>>): Prisma__OAuthProviderClient<$Result.GetResult<Prisma.$OAuthProviderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OAuthProvider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthProviderFindUniqueOrThrowArgs} args - Arguments to find a OAuthProvider
     * @example
     * // Get one OAuthProvider
     * const oAuthProvider = await prisma.oAuthProvider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthProviderClient<$Result.GetResult<Prisma.$OAuthProviderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OAuthProvider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthProviderFindFirstArgs} args - Arguments to find a OAuthProvider
     * @example
     * // Get one OAuthProvider
     * const oAuthProvider = await prisma.oAuthProvider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthProviderFindFirstArgs>(args?: SelectSubset<T, OAuthProviderFindFirstArgs<ExtArgs>>): Prisma__OAuthProviderClient<$Result.GetResult<Prisma.$OAuthProviderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OAuthProvider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthProviderFindFirstOrThrowArgs} args - Arguments to find a OAuthProvider
     * @example
     * // Get one OAuthProvider
     * const oAuthProvider = await prisma.oAuthProvider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthProviderClient<$Result.GetResult<Prisma.$OAuthProviderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OAuthProviders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthProviders
     * const oAuthProviders = await prisma.oAuthProvider.findMany()
     * 
     * // Get first 10 OAuthProviders
     * const oAuthProviders = await prisma.oAuthProvider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthProviderWithIdOnly = await prisma.oAuthProvider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthProviderFindManyArgs>(args?: SelectSubset<T, OAuthProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthProviderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OAuthProvider.
     * @param {OAuthProviderCreateArgs} args - Arguments to create a OAuthProvider.
     * @example
     * // Create one OAuthProvider
     * const OAuthProvider = await prisma.oAuthProvider.create({
     *   data: {
     *     // ... data to create a OAuthProvider
     *   }
     * })
     * 
     */
    create<T extends OAuthProviderCreateArgs>(args: SelectSubset<T, OAuthProviderCreateArgs<ExtArgs>>): Prisma__OAuthProviderClient<$Result.GetResult<Prisma.$OAuthProviderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OAuthProviders.
     * @param {OAuthProviderCreateManyArgs} args - Arguments to create many OAuthProviders.
     * @example
     * // Create many OAuthProviders
     * const oAuthProvider = await prisma.oAuthProvider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthProviderCreateManyArgs>(args?: SelectSubset<T, OAuthProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OAuthProvider.
     * @param {OAuthProviderDeleteArgs} args - Arguments to delete one OAuthProvider.
     * @example
     * // Delete one OAuthProvider
     * const OAuthProvider = await prisma.oAuthProvider.delete({
     *   where: {
     *     // ... filter to delete one OAuthProvider
     *   }
     * })
     * 
     */
    delete<T extends OAuthProviderDeleteArgs>(args: SelectSubset<T, OAuthProviderDeleteArgs<ExtArgs>>): Prisma__OAuthProviderClient<$Result.GetResult<Prisma.$OAuthProviderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OAuthProvider.
     * @param {OAuthProviderUpdateArgs} args - Arguments to update one OAuthProvider.
     * @example
     * // Update one OAuthProvider
     * const oAuthProvider = await prisma.oAuthProvider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthProviderUpdateArgs>(args: SelectSubset<T, OAuthProviderUpdateArgs<ExtArgs>>): Prisma__OAuthProviderClient<$Result.GetResult<Prisma.$OAuthProviderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OAuthProviders.
     * @param {OAuthProviderDeleteManyArgs} args - Arguments to filter OAuthProviders to delete.
     * @example
     * // Delete a few OAuthProviders
     * const { count } = await prisma.oAuthProvider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthProviderDeleteManyArgs>(args?: SelectSubset<T, OAuthProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthProviders
     * const oAuthProvider = await prisma.oAuthProvider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthProviderUpdateManyArgs>(args: SelectSubset<T, OAuthProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OAuthProvider.
     * @param {OAuthProviderUpsertArgs} args - Arguments to update or create a OAuthProvider.
     * @example
     * // Update or create a OAuthProvider
     * const oAuthProvider = await prisma.oAuthProvider.upsert({
     *   create: {
     *     // ... data to create a OAuthProvider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthProvider we want to update
     *   }
     * })
     */
    upsert<T extends OAuthProviderUpsertArgs>(args: SelectSubset<T, OAuthProviderUpsertArgs<ExtArgs>>): Prisma__OAuthProviderClient<$Result.GetResult<Prisma.$OAuthProviderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OAuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthProviderCountArgs} args - Arguments to filter OAuthProviders to count.
     * @example
     * // Count the number of OAuthProviders
     * const count = await prisma.oAuthProvider.count({
     *   where: {
     *     // ... the filter for the OAuthProviders we want to count
     *   }
     * })
    **/
    count<T extends OAuthProviderCountArgs>(
      args?: Subset<T, OAuthProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthProviderAggregateArgs>(args: Subset<T, OAuthProviderAggregateArgs>): Prisma.PrismaPromise<GetOAuthProviderAggregateType<T>>

    /**
     * Group by OAuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthProviderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthProviderGroupByArgs['orderBy'] }
        : { orderBy?: OAuthProviderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthProvider model
   */
  readonly fields: OAuthProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthProvider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OAuthProvider model
   */ 
  interface OAuthProviderFieldRefs {
    readonly id: FieldRef<"OAuthProvider", 'String'>
    readonly provider: FieldRef<"OAuthProvider", 'ProviderType'>
    readonly providerId: FieldRef<"OAuthProvider", 'String'>
    readonly userId: FieldRef<"OAuthProvider", 'String'>
    readonly createAt: FieldRef<"OAuthProvider", 'DateTime'>
    readonly updateAt: FieldRef<"OAuthProvider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthProvider findUnique
   */
  export type OAuthProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthProvider
     */
    select?: OAuthProviderSelect<ExtArgs> | null
    /**
     * Filter, which OAuthProvider to fetch.
     */
    where: OAuthProviderWhereUniqueInput
  }

  /**
   * OAuthProvider findUniqueOrThrow
   */
  export type OAuthProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthProvider
     */
    select?: OAuthProviderSelect<ExtArgs> | null
    /**
     * Filter, which OAuthProvider to fetch.
     */
    where: OAuthProviderWhereUniqueInput
  }

  /**
   * OAuthProvider findFirst
   */
  export type OAuthProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthProvider
     */
    select?: OAuthProviderSelect<ExtArgs> | null
    /**
     * Filter, which OAuthProvider to fetch.
     */
    where?: OAuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthProviders to fetch.
     */
    orderBy?: OAuthProviderOrderByWithRelationInput | OAuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthProviders.
     */
    cursor?: OAuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthProviders.
     */
    distinct?: OAuthProviderScalarFieldEnum | OAuthProviderScalarFieldEnum[]
  }

  /**
   * OAuthProvider findFirstOrThrow
   */
  export type OAuthProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthProvider
     */
    select?: OAuthProviderSelect<ExtArgs> | null
    /**
     * Filter, which OAuthProvider to fetch.
     */
    where?: OAuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthProviders to fetch.
     */
    orderBy?: OAuthProviderOrderByWithRelationInput | OAuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthProviders.
     */
    cursor?: OAuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthProviders.
     */
    distinct?: OAuthProviderScalarFieldEnum | OAuthProviderScalarFieldEnum[]
  }

  /**
   * OAuthProvider findMany
   */
  export type OAuthProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthProvider
     */
    select?: OAuthProviderSelect<ExtArgs> | null
    /**
     * Filter, which OAuthProviders to fetch.
     */
    where?: OAuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthProviders to fetch.
     */
    orderBy?: OAuthProviderOrderByWithRelationInput | OAuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthProviders.
     */
    cursor?: OAuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthProviders.
     */
    skip?: number
    distinct?: OAuthProviderScalarFieldEnum | OAuthProviderScalarFieldEnum[]
  }

  /**
   * OAuthProvider create
   */
  export type OAuthProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthProvider
     */
    select?: OAuthProviderSelect<ExtArgs> | null
    /**
     * The data needed to create a OAuthProvider.
     */
    data: XOR<OAuthProviderCreateInput, OAuthProviderUncheckedCreateInput>
  }

  /**
   * OAuthProvider createMany
   */
  export type OAuthProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthProviders.
     */
    data: OAuthProviderCreateManyInput | OAuthProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthProvider update
   */
  export type OAuthProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthProvider
     */
    select?: OAuthProviderSelect<ExtArgs> | null
    /**
     * The data needed to update a OAuthProvider.
     */
    data: XOR<OAuthProviderUpdateInput, OAuthProviderUncheckedUpdateInput>
    /**
     * Choose, which OAuthProvider to update.
     */
    where: OAuthProviderWhereUniqueInput
  }

  /**
   * OAuthProvider updateMany
   */
  export type OAuthProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthProviders.
     */
    data: XOR<OAuthProviderUpdateManyMutationInput, OAuthProviderUncheckedUpdateManyInput>
    /**
     * Filter which OAuthProviders to update
     */
    where?: OAuthProviderWhereInput
  }

  /**
   * OAuthProvider upsert
   */
  export type OAuthProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthProvider
     */
    select?: OAuthProviderSelect<ExtArgs> | null
    /**
     * The filter to search for the OAuthProvider to update in case it exists.
     */
    where: OAuthProviderWhereUniqueInput
    /**
     * In case the OAuthProvider found by the `where` argument doesn't exist, create a new OAuthProvider with this data.
     */
    create: XOR<OAuthProviderCreateInput, OAuthProviderUncheckedCreateInput>
    /**
     * In case the OAuthProvider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthProviderUpdateInput, OAuthProviderUncheckedUpdateInput>
  }

  /**
   * OAuthProvider delete
   */
  export type OAuthProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthProvider
     */
    select?: OAuthProviderSelect<ExtArgs> | null
    /**
     * Filter which OAuthProvider to delete.
     */
    where: OAuthProviderWhereUniqueInput
  }

  /**
   * OAuthProvider deleteMany
   */
  export type OAuthProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthProviders to delete
     */
    where?: OAuthProviderWhereInput
  }

  /**
   * OAuthProvider without action
   */
  export type OAuthProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthProvider
     */
    select?: OAuthProviderSelect<ExtArgs> | null
  }


  /**
   * Model UserCredentials
   */

  export type AggregateUserCredentials = {
    _count: UserCredentialsCountAggregateOutputType | null
    _min: UserCredentialsMinAggregateOutputType | null
    _max: UserCredentialsMaxAggregateOutputType | null
  }

  export type UserCredentialsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCredentialsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCredentialsCountAggregateOutputType = {
    id: number
    userId: number
    email: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserCredentialsMinAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCredentialsMaxAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCredentialsCountAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserCredentialsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCredentials to aggregate.
     */
    where?: UserCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCredentials to fetch.
     */
    orderBy?: UserCredentialsOrderByWithRelationInput | UserCredentialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserCredentials
    **/
    _count?: true | UserCredentialsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserCredentialsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserCredentialsMaxAggregateInputType
  }

  export type GetUserCredentialsAggregateType<T extends UserCredentialsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserCredentials]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCredentials[P]>
      : GetScalarType<T[P], AggregateUserCredentials[P]>
  }




  export type UserCredentialsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCredentialsWhereInput
    orderBy?: UserCredentialsOrderByWithAggregationInput | UserCredentialsOrderByWithAggregationInput[]
    by: UserCredentialsScalarFieldEnum[] | UserCredentialsScalarFieldEnum
    having?: UserCredentialsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCredentialsCountAggregateInputType | true
    _min?: UserCredentialsMinAggregateInputType
    _max?: UserCredentialsMaxAggregateInputType
  }

  export type UserCredentialsGroupByOutputType = {
    id: string
    userId: string
    email: string
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    _count: UserCredentialsCountAggregateOutputType | null
    _min: UserCredentialsMinAggregateOutputType | null
    _max: UserCredentialsMaxAggregateOutputType | null
  }

  type GetUserCredentialsGroupByPayload<T extends UserCredentialsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserCredentialsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserCredentialsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCredentialsGroupByOutputType[P]>
            : GetScalarType<T[P], UserCredentialsGroupByOutputType[P]>
        }
      >
    >


  export type UserCredentialsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userCredentials"]>



  export type UserCredentialsSelectScalar = {
    id?: boolean
    userId?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $UserCredentialsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserCredentials"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      email: string
      passwordHash: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userCredentials"]>
    composites: {}
  }

  type UserCredentialsGetPayload<S extends boolean | null | undefined | UserCredentialsDefaultArgs> = $Result.GetResult<Prisma.$UserCredentialsPayload, S>

  type UserCredentialsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserCredentialsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCredentialsCountAggregateInputType | true
    }

  export interface UserCredentialsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserCredentials'], meta: { name: 'UserCredentials' } }
    /**
     * Find zero or one UserCredentials that matches the filter.
     * @param {UserCredentialsFindUniqueArgs} args - Arguments to find a UserCredentials
     * @example
     * // Get one UserCredentials
     * const userCredentials = await prisma.userCredentials.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserCredentialsFindUniqueArgs>(args: SelectSubset<T, UserCredentialsFindUniqueArgs<ExtArgs>>): Prisma__UserCredentialsClient<$Result.GetResult<Prisma.$UserCredentialsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserCredentials that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserCredentialsFindUniqueOrThrowArgs} args - Arguments to find a UserCredentials
     * @example
     * // Get one UserCredentials
     * const userCredentials = await prisma.userCredentials.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserCredentialsFindUniqueOrThrowArgs>(args: SelectSubset<T, UserCredentialsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserCredentialsClient<$Result.GetResult<Prisma.$UserCredentialsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialsFindFirstArgs} args - Arguments to find a UserCredentials
     * @example
     * // Get one UserCredentials
     * const userCredentials = await prisma.userCredentials.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserCredentialsFindFirstArgs>(args?: SelectSubset<T, UserCredentialsFindFirstArgs<ExtArgs>>): Prisma__UserCredentialsClient<$Result.GetResult<Prisma.$UserCredentialsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserCredentials that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialsFindFirstOrThrowArgs} args - Arguments to find a UserCredentials
     * @example
     * // Get one UserCredentials
     * const userCredentials = await prisma.userCredentials.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserCredentialsFindFirstOrThrowArgs>(args?: SelectSubset<T, UserCredentialsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserCredentialsClient<$Result.GetResult<Prisma.$UserCredentialsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCredentials
     * const userCredentials = await prisma.userCredentials.findMany()
     * 
     * // Get first 10 UserCredentials
     * const userCredentials = await prisma.userCredentials.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userCredentialsWithIdOnly = await prisma.userCredentials.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserCredentialsFindManyArgs>(args?: SelectSubset<T, UserCredentialsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCredentialsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserCredentials.
     * @param {UserCredentialsCreateArgs} args - Arguments to create a UserCredentials.
     * @example
     * // Create one UserCredentials
     * const UserCredentials = await prisma.userCredentials.create({
     *   data: {
     *     // ... data to create a UserCredentials
     *   }
     * })
     * 
     */
    create<T extends UserCredentialsCreateArgs>(args: SelectSubset<T, UserCredentialsCreateArgs<ExtArgs>>): Prisma__UserCredentialsClient<$Result.GetResult<Prisma.$UserCredentialsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserCredentials.
     * @param {UserCredentialsCreateManyArgs} args - Arguments to create many UserCredentials.
     * @example
     * // Create many UserCredentials
     * const userCredentials = await prisma.userCredentials.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCredentialsCreateManyArgs>(args?: SelectSubset<T, UserCredentialsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserCredentials.
     * @param {UserCredentialsDeleteArgs} args - Arguments to delete one UserCredentials.
     * @example
     * // Delete one UserCredentials
     * const UserCredentials = await prisma.userCredentials.delete({
     *   where: {
     *     // ... filter to delete one UserCredentials
     *   }
     * })
     * 
     */
    delete<T extends UserCredentialsDeleteArgs>(args: SelectSubset<T, UserCredentialsDeleteArgs<ExtArgs>>): Prisma__UserCredentialsClient<$Result.GetResult<Prisma.$UserCredentialsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserCredentials.
     * @param {UserCredentialsUpdateArgs} args - Arguments to update one UserCredentials.
     * @example
     * // Update one UserCredentials
     * const userCredentials = await prisma.userCredentials.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserCredentialsUpdateArgs>(args: SelectSubset<T, UserCredentialsUpdateArgs<ExtArgs>>): Prisma__UserCredentialsClient<$Result.GetResult<Prisma.$UserCredentialsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserCredentials.
     * @param {UserCredentialsDeleteManyArgs} args - Arguments to filter UserCredentials to delete.
     * @example
     * // Delete a few UserCredentials
     * const { count } = await prisma.userCredentials.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserCredentialsDeleteManyArgs>(args?: SelectSubset<T, UserCredentialsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCredentials
     * const userCredentials = await prisma.userCredentials.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserCredentialsUpdateManyArgs>(args: SelectSubset<T, UserCredentialsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserCredentials.
     * @param {UserCredentialsUpsertArgs} args - Arguments to update or create a UserCredentials.
     * @example
     * // Update or create a UserCredentials
     * const userCredentials = await prisma.userCredentials.upsert({
     *   create: {
     *     // ... data to create a UserCredentials
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCredentials we want to update
     *   }
     * })
     */
    upsert<T extends UserCredentialsUpsertArgs>(args: SelectSubset<T, UserCredentialsUpsertArgs<ExtArgs>>): Prisma__UserCredentialsClient<$Result.GetResult<Prisma.$UserCredentialsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialsCountArgs} args - Arguments to filter UserCredentials to count.
     * @example
     * // Count the number of UserCredentials
     * const count = await prisma.userCredentials.count({
     *   where: {
     *     // ... the filter for the UserCredentials we want to count
     *   }
     * })
    **/
    count<T extends UserCredentialsCountArgs>(
      args?: Subset<T, UserCredentialsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCredentialsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserCredentialsAggregateArgs>(args: Subset<T, UserCredentialsAggregateArgs>): Prisma.PrismaPromise<GetUserCredentialsAggregateType<T>>

    /**
     * Group by UserCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserCredentialsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCredentialsGroupByArgs['orderBy'] }
        : { orderBy?: UserCredentialsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserCredentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserCredentialsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserCredentials model
   */
  readonly fields: UserCredentialsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCredentials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCredentialsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserCredentials model
   */ 
  interface UserCredentialsFieldRefs {
    readonly id: FieldRef<"UserCredentials", 'String'>
    readonly userId: FieldRef<"UserCredentials", 'String'>
    readonly email: FieldRef<"UserCredentials", 'String'>
    readonly passwordHash: FieldRef<"UserCredentials", 'String'>
    readonly createdAt: FieldRef<"UserCredentials", 'DateTime'>
    readonly updatedAt: FieldRef<"UserCredentials", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserCredentials findUnique
   */
  export type UserCredentialsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredentials
     */
    select?: UserCredentialsSelect<ExtArgs> | null
    /**
     * Filter, which UserCredentials to fetch.
     */
    where: UserCredentialsWhereUniqueInput
  }

  /**
   * UserCredentials findUniqueOrThrow
   */
  export type UserCredentialsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredentials
     */
    select?: UserCredentialsSelect<ExtArgs> | null
    /**
     * Filter, which UserCredentials to fetch.
     */
    where: UserCredentialsWhereUniqueInput
  }

  /**
   * UserCredentials findFirst
   */
  export type UserCredentialsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredentials
     */
    select?: UserCredentialsSelect<ExtArgs> | null
    /**
     * Filter, which UserCredentials to fetch.
     */
    where?: UserCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCredentials to fetch.
     */
    orderBy?: UserCredentialsOrderByWithRelationInput | UserCredentialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCredentials.
     */
    cursor?: UserCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCredentials.
     */
    distinct?: UserCredentialsScalarFieldEnum | UserCredentialsScalarFieldEnum[]
  }

  /**
   * UserCredentials findFirstOrThrow
   */
  export type UserCredentialsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredentials
     */
    select?: UserCredentialsSelect<ExtArgs> | null
    /**
     * Filter, which UserCredentials to fetch.
     */
    where?: UserCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCredentials to fetch.
     */
    orderBy?: UserCredentialsOrderByWithRelationInput | UserCredentialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCredentials.
     */
    cursor?: UserCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCredentials.
     */
    distinct?: UserCredentialsScalarFieldEnum | UserCredentialsScalarFieldEnum[]
  }

  /**
   * UserCredentials findMany
   */
  export type UserCredentialsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredentials
     */
    select?: UserCredentialsSelect<ExtArgs> | null
    /**
     * Filter, which UserCredentials to fetch.
     */
    where?: UserCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCredentials to fetch.
     */
    orderBy?: UserCredentialsOrderByWithRelationInput | UserCredentialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserCredentials.
     */
    cursor?: UserCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCredentials.
     */
    skip?: number
    distinct?: UserCredentialsScalarFieldEnum | UserCredentialsScalarFieldEnum[]
  }

  /**
   * UserCredentials create
   */
  export type UserCredentialsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredentials
     */
    select?: UserCredentialsSelect<ExtArgs> | null
    /**
     * The data needed to create a UserCredentials.
     */
    data: XOR<UserCredentialsCreateInput, UserCredentialsUncheckedCreateInput>
  }

  /**
   * UserCredentials createMany
   */
  export type UserCredentialsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserCredentials.
     */
    data: UserCredentialsCreateManyInput | UserCredentialsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserCredentials update
   */
  export type UserCredentialsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredentials
     */
    select?: UserCredentialsSelect<ExtArgs> | null
    /**
     * The data needed to update a UserCredentials.
     */
    data: XOR<UserCredentialsUpdateInput, UserCredentialsUncheckedUpdateInput>
    /**
     * Choose, which UserCredentials to update.
     */
    where: UserCredentialsWhereUniqueInput
  }

  /**
   * UserCredentials updateMany
   */
  export type UserCredentialsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserCredentials.
     */
    data: XOR<UserCredentialsUpdateManyMutationInput, UserCredentialsUncheckedUpdateManyInput>
    /**
     * Filter which UserCredentials to update
     */
    where?: UserCredentialsWhereInput
  }

  /**
   * UserCredentials upsert
   */
  export type UserCredentialsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredentials
     */
    select?: UserCredentialsSelect<ExtArgs> | null
    /**
     * The filter to search for the UserCredentials to update in case it exists.
     */
    where: UserCredentialsWhereUniqueInput
    /**
     * In case the UserCredentials found by the `where` argument doesn't exist, create a new UserCredentials with this data.
     */
    create: XOR<UserCredentialsCreateInput, UserCredentialsUncheckedCreateInput>
    /**
     * In case the UserCredentials was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserCredentialsUpdateInput, UserCredentialsUncheckedUpdateInput>
  }

  /**
   * UserCredentials delete
   */
  export type UserCredentialsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredentials
     */
    select?: UserCredentialsSelect<ExtArgs> | null
    /**
     * Filter which UserCredentials to delete.
     */
    where: UserCredentialsWhereUniqueInput
  }

  /**
   * UserCredentials deleteMany
   */
  export type UserCredentialsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCredentials to delete
     */
    where?: UserCredentialsWhereInput
  }

  /**
   * UserCredentials without action
   */
  export type UserCredentialsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredentials
     */
    select?: UserCredentialsSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TokensScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    isRevoked: 'isRevoked',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    expiresAt: 'expiresAt'
  };

  export type TokensScalarFieldEnum = (typeof TokensScalarFieldEnum)[keyof typeof TokensScalarFieldEnum]


  export const OAuthProviderScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    providerId: 'providerId',
    userId: 'userId',
    createAt: 'createAt',
    updateAt: 'updateAt'
  };

  export type OAuthProviderScalarFieldEnum = (typeof OAuthProviderScalarFieldEnum)[keyof typeof OAuthProviderScalarFieldEnum]


  export const UserCredentialsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserCredentialsScalarFieldEnum = (typeof UserCredentialsScalarFieldEnum)[keyof typeof UserCredentialsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TokensOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken'
  };

  export type TokensOrderByRelevanceFieldEnum = (typeof TokensOrderByRelevanceFieldEnum)[keyof typeof TokensOrderByRelevanceFieldEnum]


  export const OAuthProviderOrderByRelevanceFieldEnum: {
    id: 'id',
    providerId: 'providerId',
    userId: 'userId'
  };

  export type OAuthProviderOrderByRelevanceFieldEnum = (typeof OAuthProviderOrderByRelevanceFieldEnum)[keyof typeof OAuthProviderOrderByRelevanceFieldEnum]


  export const UserCredentialsOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    email: 'email',
    passwordHash: 'passwordHash'
  };

  export type UserCredentialsOrderByRelevanceFieldEnum = (typeof UserCredentialsOrderByRelevanceFieldEnum)[keyof typeof UserCredentialsOrderByRelevanceFieldEnum]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'ProviderType'
   */
  export type EnumProviderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProviderType'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type TokensWhereInput = {
    AND?: TokensWhereInput | TokensWhereInput[]
    OR?: TokensWhereInput[]
    NOT?: TokensWhereInput | TokensWhereInput[]
    id?: StringFilter<"Tokens"> | string
    userId?: StringFilter<"Tokens"> | string
    accessToken?: StringFilter<"Tokens"> | string
    refreshToken?: StringFilter<"Tokens"> | string
    isRevoked?: BoolFilter<"Tokens"> | boolean
    createdAt?: DateTimeFilter<"Tokens"> | Date | string
    updatedAt?: DateTimeFilter<"Tokens"> | Date | string
    expiresAt?: DateTimeFilter<"Tokens"> | Date | string
  }

  export type TokensOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
    _relevance?: TokensOrderByRelevanceInput
  }

  export type TokensWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    accessToken?: string
    refreshToken?: string
    AND?: TokensWhereInput | TokensWhereInput[]
    OR?: TokensWhereInput[]
    NOT?: TokensWhereInput | TokensWhereInput[]
    userId?: StringFilter<"Tokens"> | string
    isRevoked?: BoolFilter<"Tokens"> | boolean
    createdAt?: DateTimeFilter<"Tokens"> | Date | string
    updatedAt?: DateTimeFilter<"Tokens"> | Date | string
    expiresAt?: DateTimeFilter<"Tokens"> | Date | string
  }, "id" | "accessToken" | "refreshToken">

  export type TokensOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
    _count?: TokensCountOrderByAggregateInput
    _max?: TokensMaxOrderByAggregateInput
    _min?: TokensMinOrderByAggregateInput
  }

  export type TokensScalarWhereWithAggregatesInput = {
    AND?: TokensScalarWhereWithAggregatesInput | TokensScalarWhereWithAggregatesInput[]
    OR?: TokensScalarWhereWithAggregatesInput[]
    NOT?: TokensScalarWhereWithAggregatesInput | TokensScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tokens"> | string
    userId?: StringWithAggregatesFilter<"Tokens"> | string
    accessToken?: StringWithAggregatesFilter<"Tokens"> | string
    refreshToken?: StringWithAggregatesFilter<"Tokens"> | string
    isRevoked?: BoolWithAggregatesFilter<"Tokens"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Tokens"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tokens"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Tokens"> | Date | string
  }

  export type OAuthProviderWhereInput = {
    AND?: OAuthProviderWhereInput | OAuthProviderWhereInput[]
    OR?: OAuthProviderWhereInput[]
    NOT?: OAuthProviderWhereInput | OAuthProviderWhereInput[]
    id?: StringFilter<"OAuthProvider"> | string
    provider?: EnumProviderTypeFilter<"OAuthProvider"> | $Enums.ProviderType
    providerId?: StringFilter<"OAuthProvider"> | string
    userId?: StringFilter<"OAuthProvider"> | string
    createAt?: DateTimeFilter<"OAuthProvider"> | Date | string
    updateAt?: DateTimeFilter<"OAuthProvider"> | Date | string
  }

  export type OAuthProviderOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    _relevance?: OAuthProviderOrderByRelevanceInput
  }

  export type OAuthProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerId?: OAuthProviderProviderProviderIdCompoundUniqueInput
    AND?: OAuthProviderWhereInput | OAuthProviderWhereInput[]
    OR?: OAuthProviderWhereInput[]
    NOT?: OAuthProviderWhereInput | OAuthProviderWhereInput[]
    provider?: EnumProviderTypeFilter<"OAuthProvider"> | $Enums.ProviderType
    providerId?: StringFilter<"OAuthProvider"> | string
    userId?: StringFilter<"OAuthProvider"> | string
    createAt?: DateTimeFilter<"OAuthProvider"> | Date | string
    updateAt?: DateTimeFilter<"OAuthProvider"> | Date | string
  }, "id" | "provider_providerId">

  export type OAuthProviderOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    _count?: OAuthProviderCountOrderByAggregateInput
    _max?: OAuthProviderMaxOrderByAggregateInput
    _min?: OAuthProviderMinOrderByAggregateInput
  }

  export type OAuthProviderScalarWhereWithAggregatesInput = {
    AND?: OAuthProviderScalarWhereWithAggregatesInput | OAuthProviderScalarWhereWithAggregatesInput[]
    OR?: OAuthProviderScalarWhereWithAggregatesInput[]
    NOT?: OAuthProviderScalarWhereWithAggregatesInput | OAuthProviderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthProvider"> | string
    provider?: EnumProviderTypeWithAggregatesFilter<"OAuthProvider"> | $Enums.ProviderType
    providerId?: StringWithAggregatesFilter<"OAuthProvider"> | string
    userId?: StringWithAggregatesFilter<"OAuthProvider"> | string
    createAt?: DateTimeWithAggregatesFilter<"OAuthProvider"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"OAuthProvider"> | Date | string
  }

  export type UserCredentialsWhereInput = {
    AND?: UserCredentialsWhereInput | UserCredentialsWhereInput[]
    OR?: UserCredentialsWhereInput[]
    NOT?: UserCredentialsWhereInput | UserCredentialsWhereInput[]
    id?: StringFilter<"UserCredentials"> | string
    userId?: StringFilter<"UserCredentials"> | string
    email?: StringFilter<"UserCredentials"> | string
    passwordHash?: StringFilter<"UserCredentials"> | string
    createdAt?: DateTimeFilter<"UserCredentials"> | Date | string
    updatedAt?: DateTimeFilter<"UserCredentials"> | Date | string
  }

  export type UserCredentialsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: UserCredentialsOrderByRelevanceInput
  }

  export type UserCredentialsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    email?: string
    AND?: UserCredentialsWhereInput | UserCredentialsWhereInput[]
    OR?: UserCredentialsWhereInput[]
    NOT?: UserCredentialsWhereInput | UserCredentialsWhereInput[]
    passwordHash?: StringFilter<"UserCredentials"> | string
    createdAt?: DateTimeFilter<"UserCredentials"> | Date | string
    updatedAt?: DateTimeFilter<"UserCredentials"> | Date | string
  }, "id" | "userId" | "email">

  export type UserCredentialsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCredentialsCountOrderByAggregateInput
    _max?: UserCredentialsMaxOrderByAggregateInput
    _min?: UserCredentialsMinOrderByAggregateInput
  }

  export type UserCredentialsScalarWhereWithAggregatesInput = {
    AND?: UserCredentialsScalarWhereWithAggregatesInput | UserCredentialsScalarWhereWithAggregatesInput[]
    OR?: UserCredentialsScalarWhereWithAggregatesInput[]
    NOT?: UserCredentialsScalarWhereWithAggregatesInput | UserCredentialsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserCredentials"> | string
    userId?: StringWithAggregatesFilter<"UserCredentials"> | string
    email?: StringWithAggregatesFilter<"UserCredentials"> | string
    passwordHash?: StringWithAggregatesFilter<"UserCredentials"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserCredentials"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserCredentials"> | Date | string
  }

  export type TokensCreateInput = {
    id?: string
    userId: string
    accessToken: string
    refreshToken: string
    isRevoked?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    expiresAt: Date | string
  }

  export type TokensUncheckedCreateInput = {
    id?: string
    userId: string
    accessToken: string
    refreshToken: string
    isRevoked?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    expiresAt: Date | string
  }

  export type TokensUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokensUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokensCreateManyInput = {
    id?: string
    userId: string
    accessToken: string
    refreshToken: string
    isRevoked?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    expiresAt: Date | string
  }

  export type TokensUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokensUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthProviderCreateInput = {
    id?: string
    provider: $Enums.ProviderType
    providerId: string
    userId: string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type OAuthProviderUncheckedCreateInput = {
    id?: string
    provider: $Enums.ProviderType
    providerId: string
    userId: string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type OAuthProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthProviderCreateManyInput = {
    id?: string
    provider: $Enums.ProviderType
    providerId: string
    userId: string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type OAuthProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCredentialsCreateInput = {
    id?: string
    userId: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCredentialsUncheckedCreateInput = {
    id?: string
    userId: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCredentialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCredentialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCredentialsCreateManyInput = {
    id?: string
    userId: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCredentialsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCredentialsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TokensOrderByRelevanceInput = {
    fields: TokensOrderByRelevanceFieldEnum | TokensOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TokensCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type TokensMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type TokensMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumProviderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderType | EnumProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderType[]
    notIn?: $Enums.ProviderType[]
    not?: NestedEnumProviderTypeFilter<$PrismaModel> | $Enums.ProviderType
  }

  export type OAuthProviderOrderByRelevanceInput = {
    fields: OAuthProviderOrderByRelevanceFieldEnum | OAuthProviderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OAuthProviderProviderProviderIdCompoundUniqueInput = {
    provider: $Enums.ProviderType
    providerId: string
  }

  export type OAuthProviderCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type OAuthProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type OAuthProviderMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type EnumProviderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderType | EnumProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderType[]
    notIn?: $Enums.ProviderType[]
    not?: NestedEnumProviderTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProviderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderTypeFilter<$PrismaModel>
    _max?: NestedEnumProviderTypeFilter<$PrismaModel>
  }

  export type UserCredentialsOrderByRelevanceInput = {
    fields: UserCredentialsOrderByRelevanceFieldEnum | UserCredentialsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCredentialsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCredentialsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCredentialsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumProviderTypeFieldUpdateOperationsInput = {
    set?: $Enums.ProviderType
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumProviderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderType | EnumProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderType[]
    notIn?: $Enums.ProviderType[]
    not?: NestedEnumProviderTypeFilter<$PrismaModel> | $Enums.ProviderType
  }

  export type NestedEnumProviderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderType | EnumProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderType[]
    notIn?: $Enums.ProviderType[]
    not?: NestedEnumProviderTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProviderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderTypeFilter<$PrismaModel>
    _max?: NestedEnumProviderTypeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}