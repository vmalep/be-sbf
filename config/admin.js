module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f005ff5bf906b5733ab2c2317b7b4cbe'),
  },
});
