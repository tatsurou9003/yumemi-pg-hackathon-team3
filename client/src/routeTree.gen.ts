/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as IndexImport } from './routes/index'
import { Route as LayoutProfileImport } from './routes/_layout/profile'
import { Route as LayoutLoginImport } from './routes/_layout/login'
import { Route as LayoutHomeImport } from './routes/_layout/home'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LayoutProfileRoute = LayoutProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutLoginRoute = LayoutLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutHomeRoute = LayoutHomeImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/home': {
      id: '/_layout/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof LayoutHomeImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/login': {
      id: '/_layout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LayoutLoginImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/profile': {
      id: '/_layout/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof LayoutProfileImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutHomeRoute: typeof LayoutHomeRoute
  LayoutLoginRoute: typeof LayoutLoginRoute
  LayoutProfileRoute: typeof LayoutProfileRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutHomeRoute: LayoutHomeRoute,
  LayoutLoginRoute: LayoutLoginRoute,
  LayoutProfileRoute: LayoutProfileRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof LayoutRouteWithChildren
  '/home': typeof LayoutHomeRoute
  '/login': typeof LayoutLoginRoute
  '/profile': typeof LayoutProfileRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof LayoutRouteWithChildren
  '/home': typeof LayoutHomeRoute
  '/login': typeof LayoutLoginRoute
  '/profile': typeof LayoutProfileRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/_layout/home': typeof LayoutHomeRoute
  '/_layout/login': typeof LayoutLoginRoute
  '/_layout/profile': typeof LayoutProfileRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/home' | '/login' | '/profile'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/home' | '/login' | '/profile'
  id:
    | '__root__'
    | '/'
    | '/_layout'
    | '/_layout/home'
    | '/_layout/login'
    | '/_layout/profile'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LayoutRoute: typeof LayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LayoutRoute: LayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_layout"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/home",
        "/_layout/login",
        "/_layout/profile"
      ]
    },
    "/_layout/home": {
      "filePath": "_layout/home.tsx",
      "parent": "/_layout"
    },
    "/_layout/login": {
      "filePath": "_layout/login.tsx",
      "parent": "/_layout"
    },
    "/_layout/profile": {
      "filePath": "_layout/profile.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
