/* 
import { importSchema } from 'graphql-import';
const typeDefsInvestors = importSchema('data/schema/investors.graphql');
const typeDefsPassengers = importSchema('data/schema/passengers.graphql');
export {typeDefsInvestors,typeDefsPassengers};  */

 import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, './types'));

export default mergeTypes(typesArray, { all: true }); 