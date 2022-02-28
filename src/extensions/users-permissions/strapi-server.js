module.exports = (plugin) => {
  //console.log('users-permissions start');
  const sanitizeOutput = (user) => {
    const {
      password,
      resetPasswordToken,
      confirmationToken,
      ...sanitizedUser
    } = user; // be careful, you need to omit other private attributes yourself
    return sanitizedUser;
  };
  // Generate 401 error (TBC)
/*   plugin.controllers.user.me = async (ctx) => {
    //console.log('user.me');
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { id: ctx.state.user.id },
      populate: { card: true, branch: true },
    });

    if (!user) {
      return ctx.unauthorized();
    }

    //ctx.body = await sanitizeUser(user, ctx);
    ctx.body = await sanitizeOutput(user, ctx);
  }; */
  
  plugin.controllers.user.find = async (ctx) => {
    //console.log('requesting find all users, start');
    if (ctx.request.query.pagination) {
      //console.log(ctx.request.query.pagination);
      const {
        pagination: { page, pageSize },
      } = ctx.request.query;
      const start = (page - 1) * pageSize; // page
      const limit = pageSize; //pageSize
      const total = await strapi.db
        .query("plugin::users-permissions.user")
        .count(); //total
      const pageCount = Math.ceil(total / limit); // pageCount

      const users = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          start: start,
          limit: limit,
          populate: { role: true },
        }
      );
      //console.log('users = ', users);
      return {
        data: users.map((user) => {
          const userId = user.id;
          const roleId = user.role.id;
          delete user.id;
          delete user.role.id;
          return {
            id: userId,
            attributes: {
              ...sanitizeOutput(user),
              role: {
                data: {
                  id: roleId,
                  attributes: user.role,
                },
              },
            },
          };
        }),
        meta: {
          pagination: {
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            pageCount: parseInt(pageCount),
            total: parseInt(total),
          },
        },
      };
    } else {
      const users = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          ...ctx.request.query,
          populate: { role: true },
        }
      );
      return {
        data: users.map((user) => {
          const userId = user.id;
          const roleId = user.role.id;
          delete user.id;
          delete user.role.id;
          return {
            id: userId,
            attributes: {
              ...sanitizeOutput(user),
              role: {
                data: {
                  id: roleId,
                  attributes: user.role,
                },
              },
            },
          };
        }),
        meta: {
          pagination: {
            page: 1,
            pageSize: 25,
            pageCount: 1,
            total: 1,
          },
        },
      };
    }
  };

  plugin.controllers.user.findOne = async (ctx) => {
    const id = ctx.params.id;
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      id,
      {
        populate: { role: true },
      }
    );
    const userId = user.id;
    const roleId = user.role.id;
    delete user.id;
    delete user.role.id;
    //console.log('user = ', user);
    return {
      data: {
        id: userId,
        attributes: {
          ...sanitizeOutput(user),
          role: {
            data: {
              id: roleId,
              attributes: user.role,
            },
          },
        },
      },
    };
  };

  plugin.controllers.user.update = async (ctx) => {
    const id = ctx.params.id;
    const data = ctx.request.body;
    const user = await strapi.entityService.update(
      "plugin::users-permissions.user",
      id,
      data
    );
    return sanitizeOutput(user);
  };

  plugin.controllers.user.create = async (ctx) => {
    const data = ctx.request.body;
    const user = await strapi.entityService.create(
      "plugin::users-permissions.user",
      data
    );
    return sanitizeOutput(user);
  };

  return plugin;
};