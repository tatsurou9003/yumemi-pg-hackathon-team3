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
import { Route as LayoutSignupImport } from "./routes/_layout/signup";
import { Route as LayoutProfileImport } from "./routes/_layout/profile";
import { Route as LayoutLoginImport } from "./routes/_layout/login";
import { Route as LayoutCompleteImport } from "./routes/_layout/complete";
import { Route as LayoutHomeIndexImport } from "./routes/_layout/home/index";
import { Route as LayoutHomeRoomIdIndexImport } from "./routes/_layout/home/$roomId/index";
import { Route as LayoutHomeGroupCreateImport } from "./routes/_layout/home/group/create";
import { Route as LayoutHomeRoomIdPostImport } from "./routes/_layout/home/$roomId/post";
import { Route as LayoutHomeRoomIdHistoryImport } from "./routes/_layout/home/$roomId/history";
import { Route as LayoutHomeRoomIdTnreadIdIndexImport } from "./routes/_layout/home/$roomId/$tnreadId/index";
import { Route as LayoutHomeGroupGroupIdEditImport } from "./routes/_layout/home/group/$groupId/edit";

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

const LayoutSignupRoute = LayoutSignupImport.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutProfileRoute = LayoutProfileImport.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutLoginRoute = LayoutLoginImport.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutCompleteRoute = LayoutCompleteImport.update({
  id: "/complete",
  path: "/complete",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutHomeIndexRoute = LayoutHomeIndexImport.update({
  id: "/home/",
  path: "/home/",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutHomeRoomIdIndexRoute = LayoutHomeRoomIdIndexImport.update({
  id: "/home/$roomId/",
  path: "/home/$roomId/",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutHomeGroupCreateRoute = LayoutHomeGroupCreateImport.update({
  id: "/home/group/create",
  path: "/home/group/create",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutHomeRoomIdPostRoute = LayoutHomeRoomIdPostImport.update({
  id: "/home/$roomId/post",
  path: "/home/$roomId/post",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutHomeRoomIdHistoryRoute = LayoutHomeRoomIdHistoryImport.update({
  id: "/home/$roomId/history",
  path: "/home/$roomId/history",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutHomeRoomIdTnreadIdIndexRoute =
  LayoutHomeRoomIdTnreadIdIndexImport.update({
    id: "/home/$roomId/$tnreadId/",
    path: "/home/$roomId/$tnreadId/",
    getParentRoute: () => LayoutRoute,
  } as any);

const LayoutHomeGroupGroupIdEditRoute = LayoutHomeGroupGroupIdEditImport.update(
  {
    id: "/home/group/$groupId/edit",
    path: "/home/group/$groupId/edit",
    getParentRoute: () => LayoutRoute,
  } as any,
);

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
    "/_layout/complete": {
      id: "/_layout/complete";
      path: "/complete";
      fullPath: "/complete";
      preLoaderRoute: typeof LayoutCompleteImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/login": {
      id: "/_layout/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LayoutLoginImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/profile": {
      id: "/_layout/profile";
      path: "/profile";
      fullPath: "/profile";
      preLoaderRoute: typeof LayoutProfileImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/signup": {
      id: "/_layout/signup";
      path: "/signup";
      fullPath: "/signup";
      preLoaderRoute: typeof LayoutSignupImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/home/": {
      id: "/_layout/home/";
      path: "/home";
      fullPath: "/home";
      preLoaderRoute: typeof LayoutHomeIndexImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/home/$roomId/history": {
      id: "/_layout/home/$roomId/history";
      path: "/home/$roomId/history";
      fullPath: "/home/$roomId/history";
      preLoaderRoute: typeof LayoutHomeRoomIdHistoryImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/home/$roomId/post": {
      id: "/_layout/home/$roomId/post";
      path: "/home/$roomId/post";
      fullPath: "/home/$roomId/post";
      preLoaderRoute: typeof LayoutHomeRoomIdPostImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/home/group/create": {
      id: "/_layout/home/group/create";
      path: "/home/group/create";
      fullPath: "/home/group/create";
      preLoaderRoute: typeof LayoutHomeGroupCreateImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/home/$roomId/": {
      id: "/_layout/home/$roomId/";
      path: "/home/$roomId";
      fullPath: "/home/$roomId";
      preLoaderRoute: typeof LayoutHomeRoomIdIndexImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/home/group/$groupId/edit": {
      id: "/_layout/home/group/$groupId/edit";
      path: "/home/group/$groupId/edit";
      fullPath: "/home/group/$groupId/edit";
      preLoaderRoute: typeof LayoutHomeGroupGroupIdEditImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/home/$roomId/$tnreadId/": {
      id: "/_layout/home/$roomId/$tnreadId/";
      path: "/home/$roomId/$tnreadId";
      fullPath: "/home/$roomId/$tnreadId";
      preLoaderRoute: typeof LayoutHomeRoomIdTnreadIdIndexImport;
      parentRoute: typeof LayoutImport;
    };
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutCompleteRoute: typeof LayoutCompleteRoute;
  LayoutLoginRoute: typeof LayoutLoginRoute;
  LayoutProfileRoute: typeof LayoutProfileRoute;
  LayoutSignupRoute: typeof LayoutSignupRoute;
  LayoutHomeIndexRoute: typeof LayoutHomeIndexRoute;
  LayoutHomeRoomIdHistoryRoute: typeof LayoutHomeRoomIdHistoryRoute;
  LayoutHomeRoomIdPostRoute: typeof LayoutHomeRoomIdPostRoute;
  LayoutHomeGroupCreateRoute: typeof LayoutHomeGroupCreateRoute;
  LayoutHomeRoomIdIndexRoute: typeof LayoutHomeRoomIdIndexRoute;
  LayoutHomeGroupGroupIdEditRoute: typeof LayoutHomeGroupGroupIdEditRoute;
  LayoutHomeRoomIdTnreadIdIndexRoute: typeof LayoutHomeRoomIdTnreadIdIndexRoute;
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutCompleteRoute: LayoutCompleteRoute,
  LayoutLoginRoute: LayoutLoginRoute,
  LayoutProfileRoute: LayoutProfileRoute,
  LayoutSignupRoute: LayoutSignupRoute,
  LayoutHomeIndexRoute: LayoutHomeIndexRoute,
  LayoutHomeRoomIdHistoryRoute: LayoutHomeRoomIdHistoryRoute,
  LayoutHomeRoomIdPostRoute: LayoutHomeRoomIdPostRoute,
  LayoutHomeGroupCreateRoute: LayoutHomeGroupCreateRoute,
  LayoutHomeRoomIdIndexRoute: LayoutHomeRoomIdIndexRoute,
  LayoutHomeGroupGroupIdEditRoute: LayoutHomeGroupGroupIdEditRoute,
  LayoutHomeRoomIdTnreadIdIndexRoute: LayoutHomeRoomIdTnreadIdIndexRoute,
};

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "": typeof LayoutRouteWithChildren;
  "/complete": typeof LayoutCompleteRoute;
  "/login": typeof LayoutLoginRoute;
  "/profile": typeof LayoutProfileRoute;
  "/signup": typeof LayoutSignupRoute;
  "/home": typeof LayoutHomeIndexRoute;
  "/home/$roomId/history": typeof LayoutHomeRoomIdHistoryRoute;
  "/home/$roomId/post": typeof LayoutHomeRoomIdPostRoute;
  "/home/group/create": typeof LayoutHomeGroupCreateRoute;
  "/home/$roomId": typeof LayoutHomeRoomIdIndexRoute;
  "/home/group/$groupId/edit": typeof LayoutHomeGroupGroupIdEditRoute;
  "/home/$roomId/$tnreadId": typeof LayoutHomeRoomIdTnreadIdIndexRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "": typeof LayoutRouteWithChildren;
  "/complete": typeof LayoutCompleteRoute;
  "/login": typeof LayoutLoginRoute;
  "/profile": typeof LayoutProfileRoute;
  "/signup": typeof LayoutSignupRoute;
  "/home": typeof LayoutHomeIndexRoute;
  "/home/$roomId/history": typeof LayoutHomeRoomIdHistoryRoute;
  "/home/$roomId/post": typeof LayoutHomeRoomIdPostRoute;
  "/home/group/create": typeof LayoutHomeGroupCreateRoute;
  "/home/$roomId": typeof LayoutHomeRoomIdIndexRoute;
  "/home/group/$groupId/edit": typeof LayoutHomeGroupGroupIdEditRoute;
  "/home/$roomId/$tnreadId": typeof LayoutHomeRoomIdTnreadIdIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/_layout": typeof LayoutRouteWithChildren;
  "/_layout/complete": typeof LayoutCompleteRoute;
  "/_layout/login": typeof LayoutLoginRoute;
  "/_layout/profile": typeof LayoutProfileRoute;
  "/_layout/signup": typeof LayoutSignupRoute;
  "/_layout/home/": typeof LayoutHomeIndexRoute;
  "/_layout/home/$roomId/history": typeof LayoutHomeRoomIdHistoryRoute;
  "/_layout/home/$roomId/post": typeof LayoutHomeRoomIdPostRoute;
  "/_layout/home/group/create": typeof LayoutHomeGroupCreateRoute;
  "/_layout/home/$roomId/": typeof LayoutHomeRoomIdIndexRoute;
  "/_layout/home/group/$groupId/edit": typeof LayoutHomeGroupGroupIdEditRoute;
  "/_layout/home/$roomId/$tnreadId/": typeof LayoutHomeRoomIdTnreadIdIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | ""
    | "/complete"
    | "/login"
    | "/profile"
    | "/signup"
    | "/home"
    | "/home/$roomId/history"
    | "/home/$roomId/post"
    | "/home/group/create"
    | "/home/$roomId"
    | "/home/group/$groupId/edit"
    | "/home/$roomId/$tnreadId";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | ""
    | "/complete"
    | "/login"
    | "/profile"
    | "/signup"
    | "/home"
    | "/home/$roomId/history"
    | "/home/$roomId/post"
    | "/home/group/create"
    | "/home/$roomId"
    | "/home/group/$groupId/edit"
    | "/home/$roomId/$tnreadId";
  id:
    | "__root__"
    | "/"
    | "/_layout"
    | "/_layout/complete"
    | "/_layout/login"
    | "/_layout/profile"
    | "/_layout/signup"
    | "/_layout/home/"
    | "/_layout/home/$roomId/history"
    | "/_layout/home/$roomId/post"
    | "/_layout/home/group/create"
    | "/_layout/home/$roomId/"
    | "/_layout/home/group/$groupId/edit"
    | "/_layout/home/$roomId/$tnreadId/";
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
        "/_layout/complete",
        "/_layout/login",
        "/_layout/profile",
        "/_layout/signup",
        "/_layout/home/",
        "/_layout/home/$roomId/history",
        "/_layout/home/$roomId/post",
        "/_layout/home/group/create",
        "/_layout/home/$roomId/",
        "/_layout/home/group/$groupId/edit",
        "/_layout/home/$roomId/$tnreadId/"
      ]
    },
    "/_layout/complete": {
      "filePath": "_layout/complete.tsx",
      "parent": "/_layout"
    },
    "/_layout/login": {
      "filePath": "_layout/login.tsx",
      "parent": "/_layout"
    },
    "/_layout/profile": {
      "filePath": "_layout/profile.tsx",
      "parent": "/_layout"
    },
    "/_layout/signup": {
      "filePath": "_layout/signup.tsx",
      "parent": "/_layout"
    },
    "/_layout/home/": {
      "filePath": "_layout/home/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/home/$roomId/history": {
      "filePath": "_layout/home/$roomId/history.tsx",
      "parent": "/_layout"
    },
    "/_layout/home/$roomId/post": {
      "filePath": "_layout/home/$roomId/post.tsx",
      "parent": "/_layout"
    },
    "/_layout/home/group/create": {
      "filePath": "_layout/home/group/create.tsx",
      "parent": "/_layout"
    },
    "/_layout/home/$roomId/": {
      "filePath": "_layout/home/$roomId/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/home/group/$groupId/edit": {
      "filePath": "_layout/home/group/$groupId/edit.tsx",
      "parent": "/_layout"
    },
    "/_layout/home/$roomId/$tnreadId/": {
      "filePath": "_layout/home/$roomId/$tnreadId/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
