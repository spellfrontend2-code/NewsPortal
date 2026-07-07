export const PERMISSIONS = {
  ADS: {
    CREATE: "ads.create",
    VIEW: "ads.view",
    UPDATE: "ads.update",
    DELETE: "ads.delete",
  },

  ARTICLE: {
    CREATE: "article.create",
    VIEW: "article.view",
    UPDATE: "article.update",
    DELETE: "article.delete",
    UPDATE_STATUS: "article.update_status",
  },

  CATEGORY: {
    CREATE: "category.create",
    VIEW: "category.view",
    UPDATE: "category.update",
    DELETE: "category.delete",
  },

  COMMENT: {
    CREATE: "comment.create",
    VIEW: "comment.view",
    UPDATE: "comment.update",
    DELETE: "comment.delete",
    MODERATE: "comment.moderate",
  },

  COMPANY: {
    VIEW: "company.view",
    UPDATE: "company.update",
  },

  MEDIA: {
    CREATE: "media.create",
    VIEW: "media.view",
    DELETE: "media.delete",
  },

  PERMISSION: {
    VIEW: "permission.view",
    ASSIGN: "permission.assign",
  },

  ROLE: {
    VIEW: "role.view",
    ASSIGN: "role.assign",
  },

  READING_HISTORY: {
    VIEW: "reading_history.view",
    DELETE: "reading_history.delete",
  },

  TAG: {
    CREATE: "tag.create",
    VIEW: "tag.view",
    UPDATE: "tag.update",
    DELETE: "tag.delete",
  },

  USER: {
    CREATE: "user.create",
    VIEW: "user.view",
    UPDATE: "user.update",
    DELETE: "user.delete",
    BAN: "user.ban",
    SUSPEND: "user.suspend",
    ACTIVATE: "user.activate",
  },
} as const;
   export type ModuleName = keyof typeof PERMISSIONS;
