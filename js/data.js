
const ALL_STATIONS = [
  { name: "New Delhi", code: "NDLS" },
  { name: "Mumbai Central", code: "MMCT" },
  { name: "Chennai Central", code: "MAS" },
  { name: "Kolkata Howrah", code: "HWH" },
  { name: "Bangalore City", code: "SBC" },
  { name: "Hyderabad Deccan", code: "HYB" },
  { name: "Ahmedabad Junction", code: "ADI" },
  { name: "Pune Junction", code: "PUNE" },
  { name: "Jaipur Junction", code: "JP" },
  { name: "Lucknow Charbagh", code: "LKO" },
  { name: "Kanpur Central", code: "CNB" },
  { name: "Agra Cantt", code: "AGC" },
  { name: "Bhopal Junction", code: "BPL" },
  { name: "Nagpur Junction", code: "NGP" },
  { name: "Patna Junction", code: "PNBE" },
  { name: "Varanasi Junction", code: "BSB" },
  { name: "Guwahati", code: "GHY" },
  { name: "Thiruvananthapuram Central", code: "TVC" },
  { name: "Kochi Ernakulam", code: "ERS" },
  { name: "Coimbatore Junction", code: "CBE" },
  { name: "Visakhapatnam", code: "VSKP" },
  { name: "Secunderabad Junction", code: "SC" },
  { name: "Surat", code: "ST" },
  { name: "Vadodara Junction", code: "BRC" },
  { name: "Indore Junction", code: "INDB" },
  { name: "Amritsar Junction", code: "ASR" },
  { name: "Chandigarh", code: "CDG" },
  { name: "Dehradun", code: "DDN" },
  { name: "Jammu Tawi", code: "JAT" },
  { name: "Goa Madgaon", code: "MAO" },
  { name: "Mysuru Junction", code: "MYS" },
  { name: "Vijayawada Junction", code: "BZA" },
  { name: "Raipur Junction", code: "R" },
  { name: "Ranchi", code: "RNC" },
  { name: "Bhubaneswar", code: "BBS" },
  { name: "Kota Junction", code: "KOTA" },
  { name: "Jodhpur Junction", code: "JU" },
  { name: "Udaipur City", code: "UDZ" },
  { name: "Allahabad Junction", code: "ALD" },
  { name: "Gwalior Junction", code: "GWL" }
];


const ALL_TRAINS = [
  {
    number: "12301",
    name: "Rajdhani Express",
    route: [
      { station: "NDLS", name: "New Delhi", arrival: "--", departure: "16:55", day: 1 },
      { station: "CNB", name: "Kanpur Central", arrival: "21:30", departure: "21:35", day: 1 },
      { station: "ALD", name: "Allahabad Junction", arrival: "00:10", departure: "00:15", day: 2 },
      { station: "BSB", name: "Varanasi Junction", arrival: "03:00", departure: "03:10", day: 2 },
      { station: "PNBE", name: "Patna Junction", arrival: "07:40", departure: "07:50", day: 2 },
      { station: "HWH", name: "Kolkata Howrah", arrival: "13:05", departure: "--", day: 2 }
    ],
    fare: 1450,
    coaches: 4
  },
  {
    number: "12951",
    name: "Mumbai Rajdhani Express",
    route: [
      { station: "MMCT", name: "Mumbai Central", arrival: "--", departure: "17:40", day: 1 },
      { station: "BRC", name: "Vadodara Junction", arrival: "21:15", departure: "21:20", day: 1 },
      { station: "KOTA", name: "Kota Junction", arrival: "01:45", departure: "01:50", day: 2 },
      { station: "AGC", name: "Agra Cantt", arrival: "05:30", departure: "05:35", day: 2 },
      { station: "NDLS", name: "New Delhi", arrival: "08:35", departure: "--", day: 2 }
    ],
    fare: 1650,
    coaches: 4
  },
  {
    number: "12621",
    name: "Tamil Nadu Express",
    route: [
      { station: "NDLS", name: "New Delhi", arrival: "--", departure: "22:30", day: 1 },
      { station: "AGC", name: "Agra Cantt", arrival: "01:50", departure: "01:55", day: 2 },
      { station: "GWL", name: "Gwalior Junction", arrival: "03:35", departure: "03:40", day: 2 },
      { station: "BPL", name: "Bhopal Junction", arrival: "08:15", departure: "08:25", day: 2 },
      { station: "NGP", name: "Nagpur Junction", arrival: "14:00", departure: "14:10", day: 2 },
      { station: "BZA", name: "Vijayawada Junction", arrival: "23:30", departure: "23:40", day: 2 },
      { station: "MAS", name: "Chennai Central", arrival: "07:10", departure: "--", day: 3 }
    ],
    fare: 1100,
    coaches: 3
  },
  {
    number: "12259",
    name: "Sealdah Duronto Express",
    route: [
      { station: "NDLS", name: "New Delhi", arrival: "--", departure: "20:15", day: 1 },
      { station: "CNB", name: "Kanpur Central", arrival: "00:45", departure: "00:50", day: 2 },
      { station: "PNBE", name: "Patna Junction", arrival: "08:20", departure: "08:30", day: 2 },
      { station: "HWH", name: "Kolkata Howrah", arrival: "13:40", departure: "--", day: 2 }
    ],
    fare: 1350,
    coaches: 3
  },
  {
    number: "12723",
    name: "Telangana Express",
    route: [
      { station: "NDLS", name: "New Delhi", arrival: "--", departure: "06:50", day: 1 },
      { station: "AGC", name: "Agra Cantt", arrival: "10:20", departure: "10:25", day: 1 },
      { station: "BPL", name: "Bhopal Junction", arrival: "17:00", departure: "17:10", day: 1 },
      { station: "NGP", name: "Nagpur Junction", arrival: "23:10", departure: "23:20", day: 1 },
      { station: "SC", name: "Secunderabad Junction", arrival: "09:50", departure: "10:00", day: 2 },
      { station: "HYB", name: "Hyderabad Deccan", arrival: "10:30", departure: "--", day: 2 }
    ],
    fare: 950,
    coaches: 3
  },
  {
    number: "12627",
    name: "Karnataka Express",
    route: [
      { station: "NDLS", name: "New Delhi", arrival: "--", departure: "21:15", day: 1 },
      { station: "AGC", name: "Agra Cantt", arrival: "00:25", departure: "00:30", day: 2 },
      { station: "GWL", name: "Gwalior Junction", arrival: "02:10", departure: "02:15", day: 2 },
      { station: "BPL", name: "Bhopal Junction", arrival: "06:35", departure: "06:45", day: 2 },
      { station: "PUNE", name: "Pune Junction", arrival: "17:55", departure: "18:10", day: 2 },
      { station: "SBC", name: "Bangalore City", arrival: "06:40", departure: "--", day: 3 }
    ],
    fare: 1250,
    coaches: 3
  },
  {
    number: "12431",
    name: "Trivandrum Rajdhani Express",
    route: [
      { station: "NDLS", name: "New Delhi", arrival: "--", departure: "10:55", day: 1 },
      { station: "BPL", name: "Bhopal Junction", arrival: "18:30", departure: "18:40", day: 1 },
      { station: "NGP", name: "Nagpur Junction", arrival: "01:15", departure: "01:25", day: 2 },
      { station: "SC", name: "Secunderabad Junction", arrival: "11:00", departure: "11:10", day: 2 },
      { station: "ERS", name: "Kochi Ernakulam", arrival: "03:05", departure: "03:15", day: 3 },
      { station: "TVC", name: "Thiruvananthapuram Central", arrival: "07:30", departure: "--", day: 3 }
    ],
    fare: 2100,
    coaches: 3
  },
  {
    number: "12002",
    name: "Bhopal Shatabdi Express",
    route: [
      { station: "NDLS", name: "New Delhi", arrival: "--", departure: "06:15", day: 1 },
      { station: "AGC", name: "Agra Cantt", arrival: "08:12", departure: "08:14", day: 1 },
      { station: "GWL", name: "Gwalior Junction", arrival: "09:45", departure: "09:47", day: 1 },
      { station: "BPL", name: "Bhopal Junction", arrival: "14:15", departure: "--", day: 1 }
    ],
    fare: 750,
    coaches: 3
  },
  {
    number: "12839",
    name: "Chennai Mail",
    route: [
      { station: "HWH", name: "Kolkata Howrah", arrival: "--", departure: "23:00", day: 1 },
      { station: "VSKP", name: "Visakhapatnam", arrival: "11:15", departure: "11:30", day: 2 },
      { station: "BZA", name: "Vijayawada Junction", arrival: "17:00", departure: "17:15", day: 2 },
      { station: "MAS", name: "Chennai Central", arrival: "23:45", departure: "--", day: 2 }
    ],
    fare: 850,
    coaches: 3
  },
  {
    number: "12903",
    name: "Golden Temple Mail",
    route: [
      { station: "MMCT", name: "Mumbai Central", arrival: "--", departure: "21:30", day: 1 },
      { station: "ST", name: "Surat", arrival: "01:10", departure: "01:15", day: 2 },
      { station: "BRC", name: "Vadodara Junction", arrival: "03:10", departure: "03:15", day: 2 },
      { station: "KOTA", name: "Kota Junction", arrival: "09:30", departure: "09:35", day: 2 },
      { station: "JP", name: "Jaipur Junction", arrival: "13:50", departure: "14:00", day: 2 },
      { station: "NDLS", name: "New Delhi", arrival: "19:10", departure: "19:30", day: 2 },
      { station: "CDG", name: "Chandigarh", arrival: "23:15", departure: "23:25", day: 2 },
      { station: "ASR", name: "Amritsar Junction", arrival: "04:30", departure: "--", day: 3 }
    ],
    fare: 980,
    coaches: 3
  }
];


function generateCoaches(numCoaches) {
  const coaches = [];
  for (let c = 1; c <= numCoaches; c++) {
    const seats = [];
    for (let i = 1; i <= 72; i++) {
      const m = i % 8;
      let type;
      if (m === 1 || m === 4) type = "Lower";
      else if (m === 2 || m === 5) type = "Middle";
      else if (m === 3 || m === 6) type = "Upper";
      else if (m === 7) type = "Side Lower";
      else type = "Side Upper";
      seats.push({ seatNo: i, type });
    }
    coaches.push({ name: `S${c}`, seats });
  }
  return coaches;
}


window.initSystemData = function () {
  if (!localStorage.getItem('passengers')) localStorage.setItem('passengers', JSON.stringify([]));
  if (!localStorage.getItem('trains')) localStorage.setItem('trains', JSON.stringify([]));
  return true;
}


window.searchStations = function (query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return ALL_STATIONS.filter(s =>
    s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
  );
}

window.fetchTrainsBetweenStations = function (sourceCode, destCode) {
  const results = [];

  ALL_TRAINS.forEach(t => {
    const routeCodes = t.route.map(r => r.station);
    const srcIdx = routeCodes.indexOf(sourceCode);
    const destIdx = routeCodes.indexOf(destCode);

    if (srcIdx !== -1 && destIdx !== -1 && srcIdx < destIdx) {
      const srcStop = t.route[srcIdx];
      const destStop = t.route[destIdx];
      const durationHrs = (destStop.day - srcStop.day) * 24;

      results.push({
        number: t.number,
        name: t.name,
        departure: srcStop.departure !== "--" ? srcStop.departure : srcStop.arrival,
        arrival: destStop.arrival !== "--" ? destStop.arrival : destStop.departure,
        duration: `${durationHrs > 0 ? durationHrs + 'h+' : 'Same day'}`,
        fare: t.fare,
        source: sourceCode,
        dest: destCode
      });
    }
  });

  return results;
}


window.fetchTrainSchedule = function (trainNo) {
  const train = ALL_TRAINS.find(t => t.number === trainNo);
  return train ? train.route : [];
}


window.getOrCreateBookableTrain = function (trainInfo) {
  let trains = Storage.getTrains();
  let existing = trains.find(t => t.number === trainInfo.number);
  if (existing) return existing;


  const fullTrain = ALL_TRAINS.find(t => t.number === trainInfo.number);
  const fullRoute = fullTrain
    ? fullTrain.route.map(r => r.station)
    : [trainInfo.source, trainInfo.dest];

  const bookable = {
    number: trainInfo.number,
    name: trainInfo.name,
    departure: trainInfo.departure,
    arrival: trainInfo.arrival,
    duration: trainInfo.duration,
    fare: trainInfo.fare,
    route: fullRoute,
    coaches: generateCoaches(fullTrain ? fullTrain.coaches : 3)
  };

  trains.push(bookable);
  Storage.setTrains(trains);
  return bookable;
}
