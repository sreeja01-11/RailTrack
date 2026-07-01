document.addEventListener("DOMContentLoaded", () => {
    const selected = JSON.parse(localStorage.getItem("selectedTrain"));
    if(!selected) {
        window.location.href = "index.html";
        return;
    }


    const train = window.getOrCreateBookableTrain(selected.trainData);

    if (!train) {
        alert("Failed to load train data. Please search again.");
        window.location.href = "index.html";
        return;
    }


    if (!train.route || train.route.length < 2) {
        train.route = [selected.source, selected.dest];
    }

    document.getElementById("trainTitle").textContent = `Book Ticket - ${train.name} (${train.number})`;
    document.getElementById("fareAmount").textContent = train.fare || 0;

    const bookingForm = document.getElementById("bookingForm");
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        
        const entries = document.querySelectorAll(".passenger-entry");
        let allAllocated = [];

        entries.forEach(entry => {
            const name = entry.querySelector(".pName").value;
            const age = entry.querySelector(".pAge").value;
            const gender = entry.querySelector(".pGender").value;
            const preference = entry.querySelector(".pPreference").value;

            const allocation = SeatAllocator.allocateSeat(train, selected.date, preference, selected.source, selected.dest);
            
            if(allocation.status === "Regret/Full") {
                alert(`Sorry, tickets are completely full. ${name} could not be booked.`);
            } else {
                const passenger = {
                    pnr,
                    user: Storage.getCurrentUser().username,
                    trainNo: train.number,
                    trainName: train.name,
                    date: selected.date,
                    name, age, gender,
                    source: selected.source,
                    dest: selected.dest,
                    coach: allocation.coach,
                    seat: allocation.seat,
                    status: allocation.status,
                    fare: train.fare || 0
                };
                allAllocated.push({passenger, allocation});
            }
        });

        if(allAllocated.length === 0) return;

        allAllocated.forEach(item => {
            Storage.saveBooking(item.passenger);
            if(item.allocation.status === "RAC") {
                SeatAllocator.addToQueue(train.number, selected.date, item.passenger, "rac");
            } else if(item.allocation.status === "WL") {
                SeatAllocator.addToQueue(train.number, selected.date, item.passenger, "wl");
            }
        });

        alert(`Booking successful! PNR: ${pnr}`);
        localStorage.setItem("viewPnr", pnr);
        window.location.href = "ticket.html";
    });
});
