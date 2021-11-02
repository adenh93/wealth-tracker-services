export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CryptoCurrency = {
  __typename?: 'CryptoCurrency';
  id: Scalars['ID'];
  name: Scalars['String'];
  rank: Scalars['Int'];
  symbol: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  cryptoCurrencies?: Maybe<Array<CryptoCurrency>>;
};


export type QueryCryptoCurrenciesArgs = {
  query?: Maybe<Scalars['String']>;
};
