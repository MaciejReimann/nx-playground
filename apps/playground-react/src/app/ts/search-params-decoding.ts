// TypeScript tips and Tricks with Matt Pocock
// https://www.youtube.com/watch?v=hBk4nV7q6-w&ab_channel=VisualStudioCode

import { String, Union } from 'ts-toolbelt';

const query = `/home?a=car&b=bike`;

type Query = typeof query;

type QueryParamsPart = String.Split<Query, '?'>[1];
type QueryElements = String.Split<QueryParamsPart, '&'>;

type Key = String.Split<QueryElements[number], '='>[0];
type Value = String.Split<QueryElements[number], '='>[1];

type QueryParams = {
  [QueryElement in QueryElements[number]]: {
    [Key in String.Split<QueryElement, '='>[0]]: String.Split<
      QueryElement,
      '='
    >[1];
  };
};

type QueryValues = QueryParams[QueryElements[number]];

const paramsParts: Union.Merge<QueryValues> = {
  a: 'car',
  b: 'bike',
};
