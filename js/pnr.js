function searchPNR() {
    const pnr = document.getElementById("pnrInput").value;
    if(pnr.length !== 10) {
        alert("Please enter a valid 10-digit PNR number.");
        return;
    }

    const passengers = Storage.getPassengers();
    const pnrTickets = passengers.filter(p => p.pnr === pnr);
    const resDiv = document.getElementById("pnrResult");

    if(pnrTickets.length > 0) {
        const primary = pnrTickets[0];
        
        let passengerRows = pnrTickets.map(t => {
            let statusColor = "black";
            if(t.status === "Confirmed") statusColor = "green";
            else if(t.status === "Cancelled") statusColor = "red";
            else statusColor = "#f7931e";
            
            let seatInfo = (t.status === 'Confirmed' || t.status === 'Cancelled') ? `Coach ${t.coach}, Seat ${t.seat}` : `WL/RAC No: ${t.seat}`;
            
            return `<tr>
                <td>${t.name} (${t.age}, ${t.gender})</td>
                <td><span style="color:${statusColor}">${t.status}</span></td>
                <td>${seatInfo}</td>
            </tr>`;
        }).join('');

        resDiv.innerHTML = `
            <h3>PNR Details</h3>
            <p><strong>Train:</strong> ${primary.trainNo} - ${primary.trainName}</p>
            <p><strong>Journey:</strong> ${primary.source} to ${primary.dest} on ${primary.date}</p>
            <table class="table" style="margin-top:10px;">
                <thead>
                    <tr><th>Passenger</th><th>Status</th><th>Seat Details</th></tr>
                </thead>
                <tbody>${passengerRows}</tbody>
            </table>
        `;
        resDiv.style.display = "block";
    } else {
        resDiv.innerHTML = `<p style="color:red;">PNR Not Found. Please check the number and try again.</p>`;
        resDiv.style.display = "block";
    }
}
