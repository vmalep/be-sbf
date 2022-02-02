'use strict';

/**
 *  parent controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::parent.parent');
