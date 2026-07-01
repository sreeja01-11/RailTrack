
const Storage = {
  getUsers: () => JSON.parse(localStorage.getItem('users')) || [],
  setUsers: (users) => localStorage.setItem('users', JSON.stringify(users)),
  
  getStations: () => JSON.parse(localStorage.getItem('stations')) || [],
  
  getTrains: () => JSON.parse(localStorage.getItem('trains')) || [],
  setTrains: (trains) => localStorage.setItem('trains', JSON.stringify(trains)),
  
  getPassengers: () => JSON.parse(localStorage.getItem('passengers')) || [],
  setPassengers: (passengers) => localStorage.setItem('passengers', JSON.stringify(passengers)),
  
  getCurrentUser: () => JSON.parse(localStorage.getItem('currentUser')) || null,
  setCurrentUser: (user) => localStorage.setItem('currentUser', JSON.stringify(user)),
  logout: () => localStorage.removeItem('currentUser'),


  updateTrain: (updatedTrain) => {
    let trains = Storage.getTrains();
    const index = trains.findIndex(t => t.number === updatedTrain.number);
    if(index > -1) {
      trains[index] = updatedTrain;
      Storage.setTrains(trains);
    }
  },


  saveBooking: (passenger) => {
    let passengers = Storage.getPassengers();
    passengers.push(passenger);
    Storage.setPassengers(passengers);
  },

  updateBooking: (updatedPassenger) => {
    let passengers = Storage.getPassengers();
    const index = passengers.findIndex(p => p.pnr === updatedPassenger.pnr);
    if(index > -1) {
      passengers[index] = updatedPassenger;
      Storage.setPassengers(passengers);
    }
  }
};
