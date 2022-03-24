module.exports = {
  routes: [
    {
      method: "GET",
      path: "/my-reservations",
      handler: "reservation.getMyReservation",
    }  
  ],
};