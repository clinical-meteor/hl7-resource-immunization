

import ImmunizationsPage from './client/ImmunizationsPage';
import ImmunizationsTable from './client/ImmunizationsTable';
import { Immunization, Immunizations, ImmunizationSchema } from './lib/Immunizations';

var DynamicRoutes = [{
  'name': 'ImmunizationsPage',
  'path': '/immunizations',
  'component': ImmunizationsPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Immunizations',
  'to': '/immunizations',
  'href': '/immunizations'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  ImmunizationsPage,
  ImmunizationsTable
};


