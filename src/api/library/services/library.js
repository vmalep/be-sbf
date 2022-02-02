'use strict';

/**
 * library service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::library.library');
