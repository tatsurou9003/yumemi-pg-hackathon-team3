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
import { Route as LayoutHomeIndexImport } from "./routes/_layout/home/index";
import { Route as LayoutHomeRoomIdImport } from "./routes/_layout/home/$roomId";

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

const LayoutHomeIndexRoute = LayoutHomeIndexImport.update({
  id: "/home/",
  path: "/home/",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutHomeRoomIdRoute = LayoutHomeRoomIdImport.update({
  id: "/home/$roomId",
  path: "/home/$roomId",
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
    "/_layout/profile": {
      id: "/_layout/profile";
      path: "/profile";
      fullPath: "/profile";
      preLoaderRoute: typeof LayoutProfileImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/home/$roomId": {
      id: "/_layout/home/$roomId";
      path: "/home/$roomId";
      fullPath: "/home/$roomId";
      preLoaderRoute: typeof LayoutHomeRoomIdImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/home/": {
      id: "/_layout/home/";
      path: "/home";
      fullPath: "/home";
      preLoaderRoute: typeof LayoutHomeIndexImport;
      parentRoute: typeof LayoutImport;
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
  LayoutProfileRoute: typeof LayoutProfileRoute;
  LayoutHomeRoomIdRoute: typeof LayoutHomeRoomIdRoute;
  LayoutHomeIndexRoute: typeof LayoutHomeIndexRoute;
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutProfileRoute: LayoutProfileRoute,
  LayoutHomeRoomIdRoute: LayoutHomeRoomIdRoute,
  LayoutHomeIndexRoute: LayoutHomeIndexRoute,
};

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "": typeof LayoutRouteWithChildren;
  "/profile": typeof LayoutProfileRoute;
  "/home/$roomId": typeof LayoutHomeRoomIdRoute;
  "/home": typeof LayoutHomeIndexRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "": typeof LayoutRouteWithChildren;
  "/profile": typeof LayoutProfileRoute;
  "/home/$roomId": typeof LayoutHomeRoomIdRoute;
  "/home": typeof LayoutHomeIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/_layout": typeof LayoutRouteWithChildren;
  "/_layout/profile": typeof LayoutProfileRoute;
  "/_layout/home/$roomId": typeof LayoutHomeRoomIdRoute;
  "/_layout/home/": typeof LayoutHomeIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "" | "/profile" | "/home/$roomId" | "/home";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "" | "/profile" | "/home/$roomId" | "/home";
  id:
  | "__root__"
  | "/"
  | "/_layout"
  | "/_layout/profile"
  | "/_layout/home/$roomId"
  | "/_layout/home/";
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
        "/_layout/profile",
        "/_layout/home/$roomId",
        "/_layout/home/"
      ]
    },
    "/_layout/profile": {
      "filePath": "_layout/profile.tsx",
      "parent": "/_layout"
    },
    "/_layout/home/$roomId": {
      "filePath": "_layout/home/$roomId.tsx",
      "parent": "/_layout"
    },
    "/_layout/home/": {
      "filePath": "_layout/home/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/$roomId/history": {
      "filePath": "_layout/$roomId/history.tsx",
      "parent": "/_layout/$roomId"
    }
  }
}
ROUTE_MANIFEST_END */
