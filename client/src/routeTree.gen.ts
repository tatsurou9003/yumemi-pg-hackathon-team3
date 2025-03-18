/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as LayoutImport } from "./routes/_layout";
import { Route as IndexImport } from "./routes/index";
import { Route as LayoutProfileImport } from "./routes/_layout/profile";
import { Route as LayoutHomeImport } from "./routes/_layout/home";
import { Route as LayoutRoomIdImport } from "./routes/_layout/$roomId";
import { Route as LayoutRoomIdHistoryImport } from "./routes/_layout/$roomId/history";

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: "/_layout",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const LayoutProfileRoute = LayoutProfileImport.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutHomeRoute = LayoutHomeImport.update({
  id: "/home",
  path: "/home",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutRoomIdRoute = LayoutRoomIdImport.update({
  id: "/$roomId",
  path: "/$roomId",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutRoomIdHistoryRoute = LayoutRoomIdHistoryImport.update({
  id: "/history",
  path: "/history",
  getParentRoute: () => LayoutRoomIdRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/_layout": {
      id: "/_layout";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof LayoutImport;
      parentRoute: typeof rootRoute;
    };
    "/_layout/$roomId": {
      id: "/_layout/$roomId";
      path: "/$roomId";
      fullPath: "/$roomId";
      preLoaderRoute: typeof LayoutRoomIdImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/home": {
      id: "/_layout/home";
      path: "/home";
      fullPath: "/home";
      preLoaderRoute: typeof LayoutHomeImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/profile": {
      id: "/_layout/profile";
      path: "/profile";
      fullPath: "/profile";
      preLoaderRoute: typeof LayoutProfileImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/$roomId/history": {
      id: "/_layout/$roomId/history";
      path: "/history";
      fullPath: "/$roomId/history";
      preLoaderRoute: typeof LayoutRoomIdHistoryImport;
      parentRoute: typeof LayoutRoomIdImport;
    };
  }
}

// Create and export the route tree

interface LayoutRoomIdRouteChildren {
  LayoutRoomIdHistoryRoute: typeof LayoutRoomIdHistoryRoute;
}

const LayoutRoomIdRouteChildren: LayoutRoomIdRouteChildren = {
  LayoutRoomIdHistoryRoute: LayoutRoomIdHistoryRoute,
};

const LayoutRoomIdRouteWithChildren = LayoutRoomIdRoute._addFileChildren(
  LayoutRoomIdRouteChildren,
);

interface LayoutRouteChildren {
  LayoutRoomIdRoute: typeof LayoutRoomIdRouteWithChildren;
  LayoutHomeRoute: typeof LayoutHomeRoute;
  LayoutProfileRoute: typeof LayoutProfileRoute;
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutRoomIdRoute: LayoutRoomIdRouteWithChildren,
  LayoutHomeRoute: LayoutHomeRoute,
  LayoutProfileRoute: LayoutProfileRoute,
};

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "": typeof LayoutRouteWithChildren;
  "/$roomId": typeof LayoutRoomIdRouteWithChildren;
  "/home": typeof LayoutHomeRoute;
  "/profile": typeof LayoutProfileRoute;
  "/$roomId/history": typeof LayoutRoomIdHistoryRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "": typeof LayoutRouteWithChildren;
  "/$roomId": typeof LayoutRoomIdRouteWithChildren;
  "/home": typeof LayoutHomeRoute;
  "/profile": typeof LayoutProfileRoute;
  "/$roomId/history": typeof LayoutRoomIdHistoryRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/_layout": typeof LayoutRouteWithChildren;
  "/_layout/$roomId": typeof LayoutRoomIdRouteWithChildren;
  "/_layout/home": typeof LayoutHomeRoute;
  "/_layout/profile": typeof LayoutProfileRoute;
  "/_layout/$roomId/history": typeof LayoutRoomIdHistoryRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "" | "/$roomId" | "/home" | "/profile" | "/$roomId/history";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "" | "/$roomId" | "/home" | "/profile" | "/$roomId/history";
  id:
    | "__root__"
    | "/"
    | "/_layout"
    | "/_layout/$roomId"
    | "/_layout/home"
    | "/_layout/profile"
    | "/_layout/$roomId/history";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  LayoutRoute: typeof LayoutRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LayoutRoute: LayoutRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

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
        "/_layout/$roomId",
        "/_layout/home",
        "/_layout/profile"
      ]
    },
    "/_layout/$roomId": {
      "filePath": "_layout/$roomId.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/$roomId/history"
      ]
    },
    "/_layout/home": {
      "filePath": "_layout/home.tsx",
      "parent": "/_layout"
    },
    "/_layout/profile": {
      "filePath": "_layout/profile.tsx",
      "parent": "/_layout"
    },
    "/_layout/$roomId/history": {
      "filePath": "_layout/$roomId/history.tsx",
      "parent": "/_layout/$roomId"
    }
  }
}
ROUTE_MANIFEST_END */
