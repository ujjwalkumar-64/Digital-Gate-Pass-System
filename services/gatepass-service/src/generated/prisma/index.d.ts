
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
 * Model GatePass
 * 
 */
export type GatePass = $Result.DefaultSelection<Prisma.$GatePassPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const GatePassStatus: {
  pending: 'pending',
  issued: 'issued',
  used: 'used',
  expired: 'expired'
};

export type GatePassStatus = (typeof GatePassStatus)[keyof typeof GatePassStatus]


export const FlowType: {
  standard: 'standard',
  hostel_direct: 'hostel_direct'
};

export type FlowType = (typeof FlowType)[keyof typeof FlowType]

}

export type GatePassStatus = $Enums.GatePassStatus

export const GatePassStatus: typeof $Enums.GatePassStatus

export type FlowType = $Enums.FlowType

export const FlowType: typeof $Enums.FlowType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more GatePasses
 * const gatePasses = await prisma.gatePass.findMany()
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
   * // Fetch zero or more GatePasses
   * const gatePasses = await prisma.gatePass.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.gatePass`: Exposes CRUD operations for the **GatePass** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GatePasses
    * const gatePasses = await prisma.gatePass.findMany()
    * ```
    */
  get gatePass(): Prisma.GatePassDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    GatePass: 'GatePass'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "gatePass"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      GatePass: {
        payload: Prisma.$GatePassPayload<ExtArgs>
        fields: Prisma.GatePassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GatePassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GatePassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePassPayload>
          }
          findFirst: {
            args: Prisma.GatePassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GatePassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePassPayload>
          }
          findMany: {
            args: Prisma.GatePassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePassPayload>[]
          }
          create: {
            args: Prisma.GatePassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePassPayload>
          }
          createMany: {
            args: Prisma.GatePassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GatePassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePassPayload>[]
          }
          delete: {
            args: Prisma.GatePassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePassPayload>
          }
          update: {
            args: Prisma.GatePassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePassPayload>
          }
          deleteMany: {
            args: Prisma.GatePassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GatePassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GatePassUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePassPayload>[]
          }
          upsert: {
            args: Prisma.GatePassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePassPayload>
          }
          aggregate: {
            args: Prisma.GatePassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGatePass>
          }
          groupBy: {
            args: Prisma.GatePassGroupByArgs<ExtArgs>
            result: $Utils.Optional<GatePassGroupByOutputType>[]
          }
          count: {
            args: Prisma.GatePassCountArgs<ExtArgs>
            result: $Utils.Optional<GatePassCountAggregateOutputType> | number
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
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    gatePass?: GatePassOmit
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
   * Model GatePass
   */

  export type AggregateGatePass = {
    _count: GatePassCountAggregateOutputType | null
    _min: GatePassMinAggregateOutputType | null
    _max: GatePassMaxAggregateOutputType | null
  }

  export type GatePassMinAggregateOutputType = {
    id: string | null
    userId: string | null
    leaveId: string | null
    reason: string | null
    fromDate: Date | null
    toDate: Date | null
    status: $Enums.GatePassStatus | null
    department: string | null
    flowType: $Enums.FlowType | null
    gateOutAt: Date | null
    gateInAt: Date | null
    issuedById: string | null
    verifiedOutById: string | null
    verifiedInById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GatePassMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    leaveId: string | null
    reason: string | null
    fromDate: Date | null
    toDate: Date | null
    status: $Enums.GatePassStatus | null
    department: string | null
    flowType: $Enums.FlowType | null
    gateOutAt: Date | null
    gateInAt: Date | null
    issuedById: string | null
    verifiedOutById: string | null
    verifiedInById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GatePassCountAggregateOutputType = {
    id: number
    userId: number
    leaveId: number
    reason: number
    fromDate: number
    toDate: number
    status: number
    department: number
    flowType: number
    gateOutAt: number
    gateInAt: number
    issuedById: number
    verifiedOutById: number
    verifiedInById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GatePassMinAggregateInputType = {
    id?: true
    userId?: true
    leaveId?: true
    reason?: true
    fromDate?: true
    toDate?: true
    status?: true
    department?: true
    flowType?: true
    gateOutAt?: true
    gateInAt?: true
    issuedById?: true
    verifiedOutById?: true
    verifiedInById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GatePassMaxAggregateInputType = {
    id?: true
    userId?: true
    leaveId?: true
    reason?: true
    fromDate?: true
    toDate?: true
    status?: true
    department?: true
    flowType?: true
    gateOutAt?: true
    gateInAt?: true
    issuedById?: true
    verifiedOutById?: true
    verifiedInById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GatePassCountAggregateInputType = {
    id?: true
    userId?: true
    leaveId?: true
    reason?: true
    fromDate?: true
    toDate?: true
    status?: true
    department?: true
    flowType?: true
    gateOutAt?: true
    gateInAt?: true
    issuedById?: true
    verifiedOutById?: true
    verifiedInById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GatePassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GatePass to aggregate.
     */
    where?: GatePassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GatePasses to fetch.
     */
    orderBy?: GatePassOrderByWithRelationInput | GatePassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GatePassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GatePasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GatePasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GatePasses
    **/
    _count?: true | GatePassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GatePassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GatePassMaxAggregateInputType
  }

  export type GetGatePassAggregateType<T extends GatePassAggregateArgs> = {
        [P in keyof T & keyof AggregateGatePass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGatePass[P]>
      : GetScalarType<T[P], AggregateGatePass[P]>
  }




  export type GatePassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GatePassWhereInput
    orderBy?: GatePassOrderByWithAggregationInput | GatePassOrderByWithAggregationInput[]
    by: GatePassScalarFieldEnum[] | GatePassScalarFieldEnum
    having?: GatePassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GatePassCountAggregateInputType | true
    _min?: GatePassMinAggregateInputType
    _max?: GatePassMaxAggregateInputType
  }

  export type GatePassGroupByOutputType = {
    id: string
    userId: string
    leaveId: string
    reason: string
    fromDate: Date
    toDate: Date
    status: $Enums.GatePassStatus
    department: string
    flowType: $Enums.FlowType
    gateOutAt: Date | null
    gateInAt: Date | null
    issuedById: string | null
    verifiedOutById: string | null
    verifiedInById: string | null
    createdAt: Date
    updatedAt: Date
    _count: GatePassCountAggregateOutputType | null
    _min: GatePassMinAggregateOutputType | null
    _max: GatePassMaxAggregateOutputType | null
  }

  type GetGatePassGroupByPayload<T extends GatePassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GatePassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GatePassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GatePassGroupByOutputType[P]>
            : GetScalarType<T[P], GatePassGroupByOutputType[P]>
        }
      >
    >


  export type GatePassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    leaveId?: boolean
    reason?: boolean
    fromDate?: boolean
    toDate?: boolean
    status?: boolean
    department?: boolean
    flowType?: boolean
    gateOutAt?: boolean
    gateInAt?: boolean
    issuedById?: boolean
    verifiedOutById?: boolean
    verifiedInById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["gatePass"]>

  export type GatePassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    leaveId?: boolean
    reason?: boolean
    fromDate?: boolean
    toDate?: boolean
    status?: boolean
    department?: boolean
    flowType?: boolean
    gateOutAt?: boolean
    gateInAt?: boolean
    issuedById?: boolean
    verifiedOutById?: boolean
    verifiedInById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["gatePass"]>

  export type GatePassSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    leaveId?: boolean
    reason?: boolean
    fromDate?: boolean
    toDate?: boolean
    status?: boolean
    department?: boolean
    flowType?: boolean
    gateOutAt?: boolean
    gateInAt?: boolean
    issuedById?: boolean
    verifiedOutById?: boolean
    verifiedInById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["gatePass"]>

  export type GatePassSelectScalar = {
    id?: boolean
    userId?: boolean
    leaveId?: boolean
    reason?: boolean
    fromDate?: boolean
    toDate?: boolean
    status?: boolean
    department?: boolean
    flowType?: boolean
    gateOutAt?: boolean
    gateInAt?: boolean
    issuedById?: boolean
    verifiedOutById?: boolean
    verifiedInById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GatePassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "leaveId" | "reason" | "fromDate" | "toDate" | "status" | "department" | "flowType" | "gateOutAt" | "gateInAt" | "issuedById" | "verifiedOutById" | "verifiedInById" | "createdAt" | "updatedAt", ExtArgs["result"]["gatePass"]>

  export type $GatePassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GatePass"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      leaveId: string
      reason: string
      fromDate: Date
      toDate: Date
      status: $Enums.GatePassStatus
      department: string
      flowType: $Enums.FlowType
      gateOutAt: Date | null
      gateInAt: Date | null
      issuedById: string | null
      verifiedOutById: string | null
      verifiedInById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["gatePass"]>
    composites: {}
  }

  type GatePassGetPayload<S extends boolean | null | undefined | GatePassDefaultArgs> = $Result.GetResult<Prisma.$GatePassPayload, S>

  type GatePassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GatePassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GatePassCountAggregateInputType | true
    }

  export interface GatePassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GatePass'], meta: { name: 'GatePass' } }
    /**
     * Find zero or one GatePass that matches the filter.
     * @param {GatePassFindUniqueArgs} args - Arguments to find a GatePass
     * @example
     * // Get one GatePass
     * const gatePass = await prisma.gatePass.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GatePassFindUniqueArgs>(args: SelectSubset<T, GatePassFindUniqueArgs<ExtArgs>>): Prisma__GatePassClient<$Result.GetResult<Prisma.$GatePassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GatePass that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GatePassFindUniqueOrThrowArgs} args - Arguments to find a GatePass
     * @example
     * // Get one GatePass
     * const gatePass = await prisma.gatePass.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GatePassFindUniqueOrThrowArgs>(args: SelectSubset<T, GatePassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GatePassClient<$Result.GetResult<Prisma.$GatePassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GatePass that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GatePassFindFirstArgs} args - Arguments to find a GatePass
     * @example
     * // Get one GatePass
     * const gatePass = await prisma.gatePass.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GatePassFindFirstArgs>(args?: SelectSubset<T, GatePassFindFirstArgs<ExtArgs>>): Prisma__GatePassClient<$Result.GetResult<Prisma.$GatePassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GatePass that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GatePassFindFirstOrThrowArgs} args - Arguments to find a GatePass
     * @example
     * // Get one GatePass
     * const gatePass = await prisma.gatePass.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GatePassFindFirstOrThrowArgs>(args?: SelectSubset<T, GatePassFindFirstOrThrowArgs<ExtArgs>>): Prisma__GatePassClient<$Result.GetResult<Prisma.$GatePassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GatePasses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GatePassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GatePasses
     * const gatePasses = await prisma.gatePass.findMany()
     * 
     * // Get first 10 GatePasses
     * const gatePasses = await prisma.gatePass.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gatePassWithIdOnly = await prisma.gatePass.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GatePassFindManyArgs>(args?: SelectSubset<T, GatePassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GatePassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GatePass.
     * @param {GatePassCreateArgs} args - Arguments to create a GatePass.
     * @example
     * // Create one GatePass
     * const GatePass = await prisma.gatePass.create({
     *   data: {
     *     // ... data to create a GatePass
     *   }
     * })
     * 
     */
    create<T extends GatePassCreateArgs>(args: SelectSubset<T, GatePassCreateArgs<ExtArgs>>): Prisma__GatePassClient<$Result.GetResult<Prisma.$GatePassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GatePasses.
     * @param {GatePassCreateManyArgs} args - Arguments to create many GatePasses.
     * @example
     * // Create many GatePasses
     * const gatePass = await prisma.gatePass.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GatePassCreateManyArgs>(args?: SelectSubset<T, GatePassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GatePasses and returns the data saved in the database.
     * @param {GatePassCreateManyAndReturnArgs} args - Arguments to create many GatePasses.
     * @example
     * // Create many GatePasses
     * const gatePass = await prisma.gatePass.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GatePasses and only return the `id`
     * const gatePassWithIdOnly = await prisma.gatePass.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GatePassCreateManyAndReturnArgs>(args?: SelectSubset<T, GatePassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GatePassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GatePass.
     * @param {GatePassDeleteArgs} args - Arguments to delete one GatePass.
     * @example
     * // Delete one GatePass
     * const GatePass = await prisma.gatePass.delete({
     *   where: {
     *     // ... filter to delete one GatePass
     *   }
     * })
     * 
     */
    delete<T extends GatePassDeleteArgs>(args: SelectSubset<T, GatePassDeleteArgs<ExtArgs>>): Prisma__GatePassClient<$Result.GetResult<Prisma.$GatePassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GatePass.
     * @param {GatePassUpdateArgs} args - Arguments to update one GatePass.
     * @example
     * // Update one GatePass
     * const gatePass = await prisma.gatePass.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GatePassUpdateArgs>(args: SelectSubset<T, GatePassUpdateArgs<ExtArgs>>): Prisma__GatePassClient<$Result.GetResult<Prisma.$GatePassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GatePasses.
     * @param {GatePassDeleteManyArgs} args - Arguments to filter GatePasses to delete.
     * @example
     * // Delete a few GatePasses
     * const { count } = await prisma.gatePass.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GatePassDeleteManyArgs>(args?: SelectSubset<T, GatePassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GatePasses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GatePassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GatePasses
     * const gatePass = await prisma.gatePass.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GatePassUpdateManyArgs>(args: SelectSubset<T, GatePassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GatePasses and returns the data updated in the database.
     * @param {GatePassUpdateManyAndReturnArgs} args - Arguments to update many GatePasses.
     * @example
     * // Update many GatePasses
     * const gatePass = await prisma.gatePass.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GatePasses and only return the `id`
     * const gatePassWithIdOnly = await prisma.gatePass.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GatePassUpdateManyAndReturnArgs>(args: SelectSubset<T, GatePassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GatePassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GatePass.
     * @param {GatePassUpsertArgs} args - Arguments to update or create a GatePass.
     * @example
     * // Update or create a GatePass
     * const gatePass = await prisma.gatePass.upsert({
     *   create: {
     *     // ... data to create a GatePass
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GatePass we want to update
     *   }
     * })
     */
    upsert<T extends GatePassUpsertArgs>(args: SelectSubset<T, GatePassUpsertArgs<ExtArgs>>): Prisma__GatePassClient<$Result.GetResult<Prisma.$GatePassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GatePasses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GatePassCountArgs} args - Arguments to filter GatePasses to count.
     * @example
     * // Count the number of GatePasses
     * const count = await prisma.gatePass.count({
     *   where: {
     *     // ... the filter for the GatePasses we want to count
     *   }
     * })
    **/
    count<T extends GatePassCountArgs>(
      args?: Subset<T, GatePassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GatePassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GatePass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GatePassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GatePassAggregateArgs>(args: Subset<T, GatePassAggregateArgs>): Prisma.PrismaPromise<GetGatePassAggregateType<T>>

    /**
     * Group by GatePass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GatePassGroupByArgs} args - Group by arguments.
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
      T extends GatePassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GatePassGroupByArgs['orderBy'] }
        : { orderBy?: GatePassGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GatePassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGatePassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GatePass model
   */
  readonly fields: GatePassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GatePass.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GatePassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the GatePass model
   */
  interface GatePassFieldRefs {
    readonly id: FieldRef<"GatePass", 'String'>
    readonly userId: FieldRef<"GatePass", 'String'>
    readonly leaveId: FieldRef<"GatePass", 'String'>
    readonly reason: FieldRef<"GatePass", 'String'>
    readonly fromDate: FieldRef<"GatePass", 'DateTime'>
    readonly toDate: FieldRef<"GatePass", 'DateTime'>
    readonly status: FieldRef<"GatePass", 'GatePassStatus'>
    readonly department: FieldRef<"GatePass", 'String'>
    readonly flowType: FieldRef<"GatePass", 'FlowType'>
    readonly gateOutAt: FieldRef<"GatePass", 'DateTime'>
    readonly gateInAt: FieldRef<"GatePass", 'DateTime'>
    readonly issuedById: FieldRef<"GatePass", 'String'>
    readonly verifiedOutById: FieldRef<"GatePass", 'String'>
    readonly verifiedInById: FieldRef<"GatePass", 'String'>
    readonly createdAt: FieldRef<"GatePass", 'DateTime'>
    readonly updatedAt: FieldRef<"GatePass", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GatePass findUnique
   */
  export type GatePassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
    /**
     * Filter, which GatePass to fetch.
     */
    where: GatePassWhereUniqueInput
  }

  /**
   * GatePass findUniqueOrThrow
   */
  export type GatePassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
    /**
     * Filter, which GatePass to fetch.
     */
    where: GatePassWhereUniqueInput
  }

  /**
   * GatePass findFirst
   */
  export type GatePassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
    /**
     * Filter, which GatePass to fetch.
     */
    where?: GatePassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GatePasses to fetch.
     */
    orderBy?: GatePassOrderByWithRelationInput | GatePassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GatePasses.
     */
    cursor?: GatePassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GatePasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GatePasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GatePasses.
     */
    distinct?: GatePassScalarFieldEnum | GatePassScalarFieldEnum[]
  }

  /**
   * GatePass findFirstOrThrow
   */
  export type GatePassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
    /**
     * Filter, which GatePass to fetch.
     */
    where?: GatePassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GatePasses to fetch.
     */
    orderBy?: GatePassOrderByWithRelationInput | GatePassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GatePasses.
     */
    cursor?: GatePassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GatePasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GatePasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GatePasses.
     */
    distinct?: GatePassScalarFieldEnum | GatePassScalarFieldEnum[]
  }

  /**
   * GatePass findMany
   */
  export type GatePassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
    /**
     * Filter, which GatePasses to fetch.
     */
    where?: GatePassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GatePasses to fetch.
     */
    orderBy?: GatePassOrderByWithRelationInput | GatePassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GatePasses.
     */
    cursor?: GatePassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GatePasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GatePasses.
     */
    skip?: number
    distinct?: GatePassScalarFieldEnum | GatePassScalarFieldEnum[]
  }

  /**
   * GatePass create
   */
  export type GatePassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
    /**
     * The data needed to create a GatePass.
     */
    data: XOR<GatePassCreateInput, GatePassUncheckedCreateInput>
  }

  /**
   * GatePass createMany
   */
  export type GatePassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GatePasses.
     */
    data: GatePassCreateManyInput | GatePassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GatePass createManyAndReturn
   */
  export type GatePassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
    /**
     * The data used to create many GatePasses.
     */
    data: GatePassCreateManyInput | GatePassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GatePass update
   */
  export type GatePassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
    /**
     * The data needed to update a GatePass.
     */
    data: XOR<GatePassUpdateInput, GatePassUncheckedUpdateInput>
    /**
     * Choose, which GatePass to update.
     */
    where: GatePassWhereUniqueInput
  }

  /**
   * GatePass updateMany
   */
  export type GatePassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GatePasses.
     */
    data: XOR<GatePassUpdateManyMutationInput, GatePassUncheckedUpdateManyInput>
    /**
     * Filter which GatePasses to update
     */
    where?: GatePassWhereInput
    /**
     * Limit how many GatePasses to update.
     */
    limit?: number
  }

  /**
   * GatePass updateManyAndReturn
   */
  export type GatePassUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
    /**
     * The data used to update GatePasses.
     */
    data: XOR<GatePassUpdateManyMutationInput, GatePassUncheckedUpdateManyInput>
    /**
     * Filter which GatePasses to update
     */
    where?: GatePassWhereInput
    /**
     * Limit how many GatePasses to update.
     */
    limit?: number
  }

  /**
   * GatePass upsert
   */
  export type GatePassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
    /**
     * The filter to search for the GatePass to update in case it exists.
     */
    where: GatePassWhereUniqueInput
    /**
     * In case the GatePass found by the `where` argument doesn't exist, create a new GatePass with this data.
     */
    create: XOR<GatePassCreateInput, GatePassUncheckedCreateInput>
    /**
     * In case the GatePass was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GatePassUpdateInput, GatePassUncheckedUpdateInput>
  }

  /**
   * GatePass delete
   */
  export type GatePassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
    /**
     * Filter which GatePass to delete.
     */
    where: GatePassWhereUniqueInput
  }

  /**
   * GatePass deleteMany
   */
  export type GatePassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GatePasses to delete
     */
    where?: GatePassWhereInput
    /**
     * Limit how many GatePasses to delete.
     */
    limit?: number
  }

  /**
   * GatePass without action
   */
  export type GatePassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GatePass
     */
    select?: GatePassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GatePass
     */
    omit?: GatePassOmit<ExtArgs> | null
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


  export const GatePassScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    leaveId: 'leaveId',
    reason: 'reason',
    fromDate: 'fromDate',
    toDate: 'toDate',
    status: 'status',
    department: 'department',
    flowType: 'flowType',
    gateOutAt: 'gateOutAt',
    gateInAt: 'gateInAt',
    issuedById: 'issuedById',
    verifiedOutById: 'verifiedOutById',
    verifiedInById: 'verifiedInById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GatePassScalarFieldEnum = (typeof GatePassScalarFieldEnum)[keyof typeof GatePassScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'GatePassStatus'
   */
  export type EnumGatePassStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GatePassStatus'>
    


  /**
   * Reference to a field of type 'GatePassStatus[]'
   */
  export type ListEnumGatePassStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GatePassStatus[]'>
    


  /**
   * Reference to a field of type 'FlowType'
   */
  export type EnumFlowTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlowType'>
    


  /**
   * Reference to a field of type 'FlowType[]'
   */
  export type ListEnumFlowTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlowType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type GatePassWhereInput = {
    AND?: GatePassWhereInput | GatePassWhereInput[]
    OR?: GatePassWhereInput[]
    NOT?: GatePassWhereInput | GatePassWhereInput[]
    id?: StringFilter<"GatePass"> | string
    userId?: StringFilter<"GatePass"> | string
    leaveId?: StringFilter<"GatePass"> | string
    reason?: StringFilter<"GatePass"> | string
    fromDate?: DateTimeFilter<"GatePass"> | Date | string
    toDate?: DateTimeFilter<"GatePass"> | Date | string
    status?: EnumGatePassStatusFilter<"GatePass"> | $Enums.GatePassStatus
    department?: StringFilter<"GatePass"> | string
    flowType?: EnumFlowTypeFilter<"GatePass"> | $Enums.FlowType
    gateOutAt?: DateTimeNullableFilter<"GatePass"> | Date | string | null
    gateInAt?: DateTimeNullableFilter<"GatePass"> | Date | string | null
    issuedById?: StringNullableFilter<"GatePass"> | string | null
    verifiedOutById?: StringNullableFilter<"GatePass"> | string | null
    verifiedInById?: StringNullableFilter<"GatePass"> | string | null
    createdAt?: DateTimeFilter<"GatePass"> | Date | string
    updatedAt?: DateTimeFilter<"GatePass"> | Date | string
  }

  export type GatePassOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveId?: SortOrder
    reason?: SortOrder
    fromDate?: SortOrder
    toDate?: SortOrder
    status?: SortOrder
    department?: SortOrder
    flowType?: SortOrder
    gateOutAt?: SortOrderInput | SortOrder
    gateInAt?: SortOrderInput | SortOrder
    issuedById?: SortOrderInput | SortOrder
    verifiedOutById?: SortOrderInput | SortOrder
    verifiedInById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GatePassWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    leaveId?: string
    AND?: GatePassWhereInput | GatePassWhereInput[]
    OR?: GatePassWhereInput[]
    NOT?: GatePassWhereInput | GatePassWhereInput[]
    userId?: StringFilter<"GatePass"> | string
    reason?: StringFilter<"GatePass"> | string
    fromDate?: DateTimeFilter<"GatePass"> | Date | string
    toDate?: DateTimeFilter<"GatePass"> | Date | string
    status?: EnumGatePassStatusFilter<"GatePass"> | $Enums.GatePassStatus
    department?: StringFilter<"GatePass"> | string
    flowType?: EnumFlowTypeFilter<"GatePass"> | $Enums.FlowType
    gateOutAt?: DateTimeNullableFilter<"GatePass"> | Date | string | null
    gateInAt?: DateTimeNullableFilter<"GatePass"> | Date | string | null
    issuedById?: StringNullableFilter<"GatePass"> | string | null
    verifiedOutById?: StringNullableFilter<"GatePass"> | string | null
    verifiedInById?: StringNullableFilter<"GatePass"> | string | null
    createdAt?: DateTimeFilter<"GatePass"> | Date | string
    updatedAt?: DateTimeFilter<"GatePass"> | Date | string
  }, "id" | "leaveId">

  export type GatePassOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveId?: SortOrder
    reason?: SortOrder
    fromDate?: SortOrder
    toDate?: SortOrder
    status?: SortOrder
    department?: SortOrder
    flowType?: SortOrder
    gateOutAt?: SortOrderInput | SortOrder
    gateInAt?: SortOrderInput | SortOrder
    issuedById?: SortOrderInput | SortOrder
    verifiedOutById?: SortOrderInput | SortOrder
    verifiedInById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GatePassCountOrderByAggregateInput
    _max?: GatePassMaxOrderByAggregateInput
    _min?: GatePassMinOrderByAggregateInput
  }

  export type GatePassScalarWhereWithAggregatesInput = {
    AND?: GatePassScalarWhereWithAggregatesInput | GatePassScalarWhereWithAggregatesInput[]
    OR?: GatePassScalarWhereWithAggregatesInput[]
    NOT?: GatePassScalarWhereWithAggregatesInput | GatePassScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GatePass"> | string
    userId?: StringWithAggregatesFilter<"GatePass"> | string
    leaveId?: StringWithAggregatesFilter<"GatePass"> | string
    reason?: StringWithAggregatesFilter<"GatePass"> | string
    fromDate?: DateTimeWithAggregatesFilter<"GatePass"> | Date | string
    toDate?: DateTimeWithAggregatesFilter<"GatePass"> | Date | string
    status?: EnumGatePassStatusWithAggregatesFilter<"GatePass"> | $Enums.GatePassStatus
    department?: StringWithAggregatesFilter<"GatePass"> | string
    flowType?: EnumFlowTypeWithAggregatesFilter<"GatePass"> | $Enums.FlowType
    gateOutAt?: DateTimeNullableWithAggregatesFilter<"GatePass"> | Date | string | null
    gateInAt?: DateTimeNullableWithAggregatesFilter<"GatePass"> | Date | string | null
    issuedById?: StringNullableWithAggregatesFilter<"GatePass"> | string | null
    verifiedOutById?: StringNullableWithAggregatesFilter<"GatePass"> | string | null
    verifiedInById?: StringNullableWithAggregatesFilter<"GatePass"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GatePass"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GatePass"> | Date | string
  }

  export type GatePassCreateInput = {
    id?: string
    userId: string
    leaveId: string
    reason: string
    fromDate: Date | string
    toDate: Date | string
    status?: $Enums.GatePassStatus
    department: string
    flowType?: $Enums.FlowType
    gateOutAt?: Date | string | null
    gateInAt?: Date | string | null
    issuedById?: string | null
    verifiedOutById?: string | null
    verifiedInById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GatePassUncheckedCreateInput = {
    id?: string
    userId: string
    leaveId: string
    reason: string
    fromDate: Date | string
    toDate: Date | string
    status?: $Enums.GatePassStatus
    department: string
    flowType?: $Enums.FlowType
    gateOutAt?: Date | string | null
    gateInAt?: Date | string | null
    issuedById?: string | null
    verifiedOutById?: string | null
    verifiedInById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GatePassUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leaveId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    fromDate?: DateTimeFieldUpdateOperationsInput | Date | string
    toDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumGatePassStatusFieldUpdateOperationsInput | $Enums.GatePassStatus
    department?: StringFieldUpdateOperationsInput | string
    flowType?: EnumFlowTypeFieldUpdateOperationsInput | $Enums.FlowType
    gateOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gateInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuedById?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedOutById?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedInById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GatePassUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leaveId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    fromDate?: DateTimeFieldUpdateOperationsInput | Date | string
    toDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumGatePassStatusFieldUpdateOperationsInput | $Enums.GatePassStatus
    department?: StringFieldUpdateOperationsInput | string
    flowType?: EnumFlowTypeFieldUpdateOperationsInput | $Enums.FlowType
    gateOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gateInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuedById?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedOutById?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedInById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GatePassCreateManyInput = {
    id?: string
    userId: string
    leaveId: string
    reason: string
    fromDate: Date | string
    toDate: Date | string
    status?: $Enums.GatePassStatus
    department: string
    flowType?: $Enums.FlowType
    gateOutAt?: Date | string | null
    gateInAt?: Date | string | null
    issuedById?: string | null
    verifiedOutById?: string | null
    verifiedInById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GatePassUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leaveId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    fromDate?: DateTimeFieldUpdateOperationsInput | Date | string
    toDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumGatePassStatusFieldUpdateOperationsInput | $Enums.GatePassStatus
    department?: StringFieldUpdateOperationsInput | string
    flowType?: EnumFlowTypeFieldUpdateOperationsInput | $Enums.FlowType
    gateOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gateInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuedById?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedOutById?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedInById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GatePassUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leaveId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    fromDate?: DateTimeFieldUpdateOperationsInput | Date | string
    toDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumGatePassStatusFieldUpdateOperationsInput | $Enums.GatePassStatus
    department?: StringFieldUpdateOperationsInput | string
    flowType?: EnumFlowTypeFieldUpdateOperationsInput | $Enums.FlowType
    gateOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gateInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuedById?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedOutById?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedInById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumGatePassStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GatePassStatus | EnumGatePassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GatePassStatus[] | ListEnumGatePassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GatePassStatus[] | ListEnumGatePassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGatePassStatusFilter<$PrismaModel> | $Enums.GatePassStatus
  }

  export type EnumFlowTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FlowType | EnumFlowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FlowType[] | ListEnumFlowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlowType[] | ListEnumFlowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFlowTypeFilter<$PrismaModel> | $Enums.FlowType
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GatePassCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveId?: SortOrder
    reason?: SortOrder
    fromDate?: SortOrder
    toDate?: SortOrder
    status?: SortOrder
    department?: SortOrder
    flowType?: SortOrder
    gateOutAt?: SortOrder
    gateInAt?: SortOrder
    issuedById?: SortOrder
    verifiedOutById?: SortOrder
    verifiedInById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GatePassMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveId?: SortOrder
    reason?: SortOrder
    fromDate?: SortOrder
    toDate?: SortOrder
    status?: SortOrder
    department?: SortOrder
    flowType?: SortOrder
    gateOutAt?: SortOrder
    gateInAt?: SortOrder
    issuedById?: SortOrder
    verifiedOutById?: SortOrder
    verifiedInById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GatePassMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveId?: SortOrder
    reason?: SortOrder
    fromDate?: SortOrder
    toDate?: SortOrder
    status?: SortOrder
    department?: SortOrder
    flowType?: SortOrder
    gateOutAt?: SortOrder
    gateInAt?: SortOrder
    issuedById?: SortOrder
    verifiedOutById?: SortOrder
    verifiedInById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumGatePassStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GatePassStatus | EnumGatePassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GatePassStatus[] | ListEnumGatePassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GatePassStatus[] | ListEnumGatePassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGatePassStatusWithAggregatesFilter<$PrismaModel> | $Enums.GatePassStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGatePassStatusFilter<$PrismaModel>
    _max?: NestedEnumGatePassStatusFilter<$PrismaModel>
  }

  export type EnumFlowTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FlowType | EnumFlowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FlowType[] | ListEnumFlowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlowType[] | ListEnumFlowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFlowTypeWithAggregatesFilter<$PrismaModel> | $Enums.FlowType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFlowTypeFilter<$PrismaModel>
    _max?: NestedEnumFlowTypeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumGatePassStatusFieldUpdateOperationsInput = {
    set?: $Enums.GatePassStatus
  }

  export type EnumFlowTypeFieldUpdateOperationsInput = {
    set?: $Enums.FlowType
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumGatePassStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GatePassStatus | EnumGatePassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GatePassStatus[] | ListEnumGatePassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GatePassStatus[] | ListEnumGatePassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGatePassStatusFilter<$PrismaModel> | $Enums.GatePassStatus
  }

  export type NestedEnumFlowTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FlowType | EnumFlowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FlowType[] | ListEnumFlowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlowType[] | ListEnumFlowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFlowTypeFilter<$PrismaModel> | $Enums.FlowType
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumGatePassStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GatePassStatus | EnumGatePassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GatePassStatus[] | ListEnumGatePassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GatePassStatus[] | ListEnumGatePassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGatePassStatusWithAggregatesFilter<$PrismaModel> | $Enums.GatePassStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGatePassStatusFilter<$PrismaModel>
    _max?: NestedEnumGatePassStatusFilter<$PrismaModel>
  }

  export type NestedEnumFlowTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FlowType | EnumFlowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FlowType[] | ListEnumFlowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlowType[] | ListEnumFlowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFlowTypeWithAggregatesFilter<$PrismaModel> | $Enums.FlowType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFlowTypeFilter<$PrismaModel>
    _max?: NestedEnumFlowTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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