const SeatAllocator = {
    MAX_RAC: 10,
    MAX_WL: 10,

    allocateSeat: (train, date, preference, source, dest) => {
        const srcIdx = train.route.indexOf(source);
        const destIdx = train.route.indexOf(dest);
        
        const passengers = Storage.getPassengers().filter(p => p.trainNo === train.number && p.date === date && p.status === "Confirmed");
        
        function isSeatAvailable(coachName, seatNo) {
            const occupants = passengers.filter(p => p.coach === coachName && p.seat === seatNo);
            
            for(let occ of occupants) {
                const occSrc = train.route.indexOf(occ.source);
                const occDest = train.route.indexOf(occ.dest);
                

                if(srcIdx < occDest && destIdx > occSrc) {
                    return false;
                }
            }
            return true;
        }

        let allocated = null;
        

        if(preference && preference !== "No Preference") {
            for(let c of train.coaches) {
                let seat = c.seats.find(s => s.type === preference && isSeatAvailable(c.name, s.seatNo));
                if(seat) {
                    allocated = { coach: c.name, seat: seat.seatNo, status: "Confirmed", type: seat.type };
                    break;
                }
            }
        }


        if(!allocated) {
            for(let c of train.coaches) {
                let seat = c.seats.find(s => isSeatAvailable(c.name, s.seatNo));
                if(seat) {
                    allocated = { coach: c.name, seat: seat.seatNo, status: "Confirmed", type: seat.type };
                    break;
                }
            }
        }

        if(allocated) {
            return allocated;
        }


        let racList = JSON.parse(localStorage.getItem(`rac_${train.number}_${date}`)) || [];
        if(racList.length < SeatAllocator.MAX_RAC) {
            let racNo = racList.length + 1;
            return { coach: "RAC", seat: racNo, status: "RAC", type: "-" };
        }


        let wlList = JSON.parse(localStorage.getItem(`wl_${train.number}_${date}`)) || [];
        if(wlList.length < SeatAllocator.MAX_WL) {
            let wlNo = wlList.length + 1;
            return { coach: "WL", seat: wlNo, status: "WL", type: "-" };
        }


        return { coach: "-", seat: "-", status: "Regret/Full", type: "-" };
    },

    addToQueue: (trainNo, date, passenger, type) => {
        let list = JSON.parse(localStorage.getItem(`${type}_${trainNo}_${date}`)) || [];
        list.push(passenger.pnr);
        localStorage.setItem(`${type}_${trainNo}_${date}`, JSON.stringify(list));
    }
};
