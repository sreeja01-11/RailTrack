document.addEventListener("DOMContentLoaded", () => {
    loadBookings();
});

function loadBookings() {
    const user = Storage.getCurrentUser();
    if(!user) {
        window.location.href = "login.html";
        return;
    }

    const passengers = Storage.getPassengers();
    const myTickets = passengers.filter(p => p.user === user.username);
    const listDiv = document.getElementById("bookingsList");
    
    listDiv.innerHTML = "";
    
    if(myTickets.length === 0) {
        listDiv.innerHTML = "<p>You have no bookings.</p>";
        return;
    }


    const uniquePnrs = [...new Set(myTickets.map(t => t.pnr))].reverse();
    
    uniquePnrs.forEach(pnr => {
        const pnrTickets = myTickets.filter(t => t.pnr === pnr);
        const primary = pnrTickets[0];
        
        const div = document.createElement("div");
        div.className = "booking-card";
        
        div.innerHTML = `
            <div>
                <h4>${primary.trainName} (${primary.trainNo}) - ${primary.date}</h4>
                <p><strong>PNR:</strong> ${pnr} | <strong>Passengers:</strong> ${pnrTickets.length}</p>
                <p><strong>Route:</strong> ${primary.source} to ${primary.dest}</p>
                <div style="margin-top:10px;">
                    <strong>Passenger Details:</strong>
                    <ul style="list-style-type: none; padding-left: 0; margin-top: 5px;">
                        ${pnrTickets.map(t => `
                            <li style="margin-bottom: 5px;">
                                ${t.name} (${t.age}, ${t.gender}) - <span style="color:${t.status === 'Confirmed' ? 'green' : (t.status === 'Cancelled' ? 'red' : '#f7931e')}; font-weight:bold;">${t.status}</span>
                                ${t.status !== 'Cancelled' ? `<button class="btn btn-danger" style="padding: 2px 8px; font-size: 12px; margin-left: 10px;" onclick="cancelPassenger('${pnr}', '${t.name}')">Cancel Ticket</button>` : ''}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            <div>
                ${pnrTickets.some(t => t.status !== 'Cancelled') ? `<button class="btn btn-danger" onclick="cancelTicket('${pnr}')">Cancel All</button>` : ''}
                <button class="btn btn-primary" onclick="viewTicket('${pnr}')">View Ticket</button>
            </div>
        `;
        listDiv.appendChild(div);
    });
}

function viewTicket(pnr) {
    localStorage.setItem("viewPnr", pnr);
    window.location.href = "ticket.html";
}

async function cancelPassenger(pnr, passengerName) {
    if(!confirm(`Are you sure you want to cancel the ticket for ${passengerName}?`)) return;
    await processCancellation(pnr, [passengerName]);
}

async function cancelTicket(pnr) {
    if(!confirm("Are you sure you want to cancel ALL passengers under this PNR?")) return;
    await processCancellation(pnr, null);
}

async function processCancellation(pnr, passengerNames = null) {
    let passengers = Storage.getPassengers();
    let pnrTickets = passengers.filter(p => p.pnr === pnr);
    
    if(pnrTickets.length === 0) return;


    const modal = document.getElementById("cancelModal");
    const stepsDiv = document.getElementById("animationSteps");
    stepsDiv.innerHTML = `<p style="color:red">1. Processing cancellation for PNR ${pnr}...</p>`;
    modal.style.display = "flex";
    
    let trainNo = pnrTickets[0].trainNo;
    let date = pnrTickets[0].date;
    let trains = Storage.getTrains();
    let train = trains.find(t => t.number === trainNo);
    
    for(let t of pnrTickets) {
        if((passengerNames === null || passengerNames.includes(t.name)) && (t.status === "Confirmed" || t.status === "RAC" || t.status === "WL")) {
            t.status = "Cancelled";
            stepsDiv.innerHTML += `<p style="color:red">Seat/Berth for ${t.name} freed up.</p>`;
        }
    }
    

    Storage.setPassengers(passengers);

    await sleep(1500);


    let racList = JSON.parse(localStorage.getItem(`rac_${trainNo}_${date}`)) || [];
    let remainingRac = [];
    
    for (let racPnr of racList) {
        if(passengerNames === null && racPnr === pnr) continue;
        
        let racPass = passengers.find(p => p.pnr === racPnr && p.status === "RAC" && (passengerNames === null || !passengerNames.includes(p.name)));
        if(racPass) {
            let alloc = SeatAllocator.allocateSeat(train, date, "No Preference", racPass.source, racPass.dest);
            if(alloc && alloc.status === "Confirmed") {
                racPass.status = "Confirmed";
                racPass.coach = alloc.coach;
                racPass.seat = alloc.seat;
                stepsDiv.innerHTML += `<p style="color:green">↓<br>RAC passenger (${racPass.name}) promoted to Confirmed (Coach ${alloc.coach}, Seat ${alloc.seat}).</p>`;
                Storage.setPassengers(passengers);
                await sleep(1000);
            } else {
                remainingRac.push(racPnr);
            }
        } else {
             remainingRac.push(racPnr);
        }
    }
    localStorage.setItem(`rac_${trainNo}_${date}`, JSON.stringify(remainingRac));


    await sleep(1500);
    let wlList = JSON.parse(localStorage.getItem(`wl_${trainNo}_${date}`)) || [];
    let remainingWl = [];
    
    let currentRacCount = remainingRac.length;
    
    for(let wlPnr of wlList) {
        if(passengerNames === null && wlPnr === pnr) continue;
        let wlPass = passengers.find(p => p.pnr === wlPnr && p.status === "WL" && (passengerNames === null || !passengerNames.includes(p.name)));
        
        if(wlPass && currentRacCount < SeatAllocator.MAX_RAC) {
            wlPass.status = "RAC";
            wlPass.seat = ++currentRacCount;
            remainingRac.push(wlPnr);
            stepsDiv.innerHTML += `<p style="color:blue">↓<br>Waitlist passenger (${wlPass.name}) promoted to RAC.</p>`;
            Storage.setPassengers(passengers);
            await sleep(1000);
        } else {
            remainingWl.push(wlPnr);
        }
    }
    
    localStorage.setItem(`rac_${trainNo}_${date}`, JSON.stringify(remainingRac));
    localStorage.setItem(`wl_${trainNo}_${date}`, JSON.stringify(remainingWl));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function closeModal() {
    document.getElementById("cancelModal").style.display = "none";
    loadBookings();
}
