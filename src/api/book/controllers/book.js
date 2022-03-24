'use strict';

/**
 *  book controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::book.book',
  ({ strapi }) => ({
    async getMyBook(ctx) {
      ctx.query = {
        ...ctx.query,
        filters: { ...ctx.query.filters, users_permissions_user: ctx.state.user.id },
      };
      const { data, meta } = await super.find(ctx);
      return { data, meta };
    },
  })
);
