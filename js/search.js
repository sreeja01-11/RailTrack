document.addEventListener("DOMContentLoaded", () => {
    if (window.initSystemData) {
        window.initSystemData();
    }
    

    function setupAutocomplete(inputId, hiddenId, dropdownId) {
        const input = document.getElementById(inputId);
        const hidden = document.getElementById(hiddenId);
        const dropdown = document.getElementById(dropdownId);
        if(!input) return;

        let debounceTimeout;

        input.addEventListener("input", function() {
            clearTimeout(debounceTimeout);
            let val = this.value.trim();
            dropdown.innerHTML = "";
            
            if (!val || val.length < 2) {
                hidden.value = "";
                return;
            }

            debounceTimeout = setTimeout(() => {
                let matches = window.searchStations(val);
                dropdown.innerHTML = "";
                
                if (!matches || matches.length === 0) {
                    dropdown.innerHTML = "<div style='padding:10px; color:#999;'>No stations found. Try a different name or code.</div>";
                    return;
                }

                matches.slice(0, 10).forEach(s => {
                    if (!s.name || !s.code) return;
                    let b = document.createElement("DIV");
                    b.innerHTML = `<strong>${s.name}</strong> <span style="color:#666;">(${s.code})</span>`;
                    b.style.cursor = "pointer";
                    b.addEventListener("click", function() {
                        input.value = `${s.name} (${s.code})`;
                        hidden.value = s.code;
                        dropdown.innerHTML = "";
                    });
                    dropdown.appendChild(b);
                });
            }, 200);
        });

        document.addEventListener("click", function (e) {
            if (e.target !== input) dropdown.innerHTML = "";
        });
    }

    setupAutocomplete("source", "sourceCode", "sourceDropdown");
    setupAutocomplete("dest", "destCode", "destDropdown");


    const user = Storage.getCurrentUser();
    const authLink = document.getElementById("authLink");
    const navItems = document.getElementById("navItems");
    if(authLink) {
        if(!user) {
            authLink.textContent = "Login";
            authLink.onclick = () => { window.location.href = "login.html"; return false; };
            if(navItems) navItems.style.display = "none";
        } else {
            authLink.textContent = `Logout (${user.username})`;
            authLink.onclick = logout;
            
            const recentSec = document.getElementById("recentBookingsSection");
            const homeList = document.getElementById("homeBookingsList");
            if (recentSec && homeList) {
                const myTickets = Storage.getPassengers().filter(p => p.user === user.username);
                if (myTickets.length > 0) {
                    recentSec.style.display = "block";
                    const uniquePnrs = [...new Set(myTickets.map(t => t.pnr))].reverse();
                    
                    homeList.innerHTML = uniquePnrs.slice(0, 3).map(pnr => {
                        const pnrTickets = myTickets.filter(t => t.pnr === pnr);
                        const primary = pnrTickets[0];
                        return `
                        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius:4px; background:white;">
                            <strong>PNR: ${pnr}</strong> - ${primary.trainName} (${primary.trainNo})<br>
                            Passengers: ${pnrTickets.length} | Journey: ${primary.source} to ${primary.dest} on ${primary.date}
                        </div>`;
                    }).join("");
                }
            }
        }
    }


    const searchForm = document.getElementById("searchForm");
    if(searchForm) {
        const dateInput = document.getElementById("date");
        if(dateInput) dateInput.min = new Date().toISOString().split("T")[0];

        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const source = document.getElementById("sourceCode").value;
            const dest = document.getElementById("destCode").value;
            const date = document.getElementById("date").value;
            
            if(!source || !dest) {
                alert("Please select a valid origin and destination from the dropdown.");
                return;
            }
            if(source === dest) {
                alert("Source and Destination cannot be same!");
                return;
            }

            const resultsDiv = document.getElementById("searchResults");
            const tbody = document.getElementById("trainList");
            

            const results = window.fetchTrainsBetweenStations(source, dest);
            tbody.innerHTML = "";

            if(results.length > 0) {
                results.forEach(train => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${train.number}</td>
                        <td>${train.name}</td>
                        <td>${train.departure}</td>
                        <td>${train.arrival}</td>
                        <td>${train.duration}</td>
                        <td>₹${train.fare}</td>
                        <td><button class="btn btn-primary" onclick='bookTrain(${JSON.stringify(train).replace(/'/g, "\\\\'")},\"${date}\")'>Book Now</button></td>
                    `;
                    tbody.appendChild(tr);
                });
            } else {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px; color:#c00;">
                    No trains found between <strong>${source}</strong> and <strong>${dest}</strong>.<br>
                    <span style="color:#999; font-size:13px;">Try different stations — only direct trains with both stops on their route are shown.</span>
                </td></tr>`;
            }
            resultsDiv.style.display = "block";
        });
    }
});


function bookTrain(trainInfo, date) {
    if(!Storage.getCurrentUser()) {
        alert("Please login to book tickets.");
        window.location.href = "login.html";
        return;
    }
    localStorage.setItem("selectedTrain", JSON.stringify({
        trainNo: trainInfo.number,
        date: date,
        source: trainInfo.source,
        dest: trainInfo.dest,
        trainData: trainInfo
    }));
    window.location.href = "booking.html";
}
