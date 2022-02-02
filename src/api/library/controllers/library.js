'use strict';

/**
 *  library controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::library.library');
