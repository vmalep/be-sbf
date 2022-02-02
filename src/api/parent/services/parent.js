'use strict';

/**
 * parent service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::parent.parent');
