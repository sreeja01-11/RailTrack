# RailTrack

RailTrack is a browser-based railway reservation system that simulates core functionalities of the Indian Railways reservation workflow. The application supports train search, ticket booking, berth preference allocation, PNR status lookup, RAC/Waitlist management, automated queue promotion, and an administrative dashboard—all running entirely on the client side using **Vanilla JavaScript** and **localStorage**.

> **No backend or database is required.** All application data is stored locally inside the browser.

---

## Features

### Train Search
- Search trains between source and destination stations.
- Autocomplete station selection with debounced search.
- Route validation and travel date selection.

### Ticket Booking
- Multi-passenger booking support.
- Automatic PNR generation.
- Printable Electronic Reservation Slip (ERS).
- Booking history management.

### Smart Berth Allocation
- Supports berth preferences:
  - Lower (LB)
  - Middle (MB)
  - Upper (UB)
  - Side Lower (SL)
  - Side Upper (SU)
- Falls back to the next available berth when the preferred option is unavailable.

### Segment-Based Seat Reservation
Unlike traditional seat allocation systems, RailTrack allocates seats based on travel segments.

A single physical seat can be assigned to multiple passengers if their travel paths do not overlap, maximizing seat utilization similar to the actual Indian Railways reservation system.

Example:

Passenger A:
```
Delhi ───────── Kanpur
```

Passenger B:
```
Prayagraj ───────── Howrah
```

Since the travel segments do not overlap, both passengers can occupy the same seat.

---

### RAC & Waitlist Management

When all confirmed seats are occupied:

- New passengers receive **RAC**
- Once RAC is full, passengers are placed in the **Waitlist**

Separate queues are maintained for every train and travel date.

---

### Automated Promotion Engine

Whenever a confirmed passenger cancels:

1. Ticket is cancelled.
2. First eligible RAC passenger is promoted to Confirmed.
3. Coach and seat are reassigned.
4. First Waitlisted passenger moves into RAC.
5. Queue status is updated automatically.

A real-time animated modal visually demonstrates every promotion step.

---

### PNR Status Lookup

- Search bookings using a unique 10-digit PNR.
- Displays:
  - Passenger details
  - Seat number
  - Coach
  - Booking status
  - Journey details

---

### Printable E-Ticket

Generates an Electronic Reservation Slip (ERS) optimized using CSS print media queries.

Includes:

- Passenger details
- Journey information
- Coach & seat
- PNR
- Booking status

---

### Admin Dashboard

Provides real-time analytics including:

- Total trains
- Total bookings
- Revenue
- Cancelled tickets

Also includes an interactive seat map showing:

- Available seats
- Fully booked seats
- Partially occupied seats (segment booking)

Hovering over seats displays passenger information and reservation segments.

---

## Tech Stack

| Technology | Usage |
|------------|------|
| HTML5 | Page Structure |
| CSS3 | Responsive UI |
| CSS Variables | Theme Configuration |
| Vanilla JavaScript (ES6) | Application Logic |
| Browser localStorage | Data Persistence |
| Node.js + http-server | Local Development Server |

---

# Project Structure

```
RailTrack/
│
├── admin.html              # Admin dashboard
├── booking.html            # Ticket booking page
├── index.html              # Home & train search
├── login.html              # Login & Signup
├── mybookings.html         # Booking history
├── pnr.html                # PNR lookup
├── ticket.html             # Printable ERS
├── package.json
│
├── css/
│   └── style.css
│
└── js/
    ├── auth.js
    ├── booking.js
    ├── cancel.js
    ├── data.js
    ├── pnr.js
    ├── search.js
    ├── seatAllocator.js
    └── storage.js
```

---

# System Architecture

```
                    User
                      │
                      ▼
             Search Trains
                      │
                      ▼
             Booking Module
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
 Seat Allocation              RAC / WL Queue
        │                           │
        └─────────────┬─────────────┘
                      ▼
               localStorage
                      │
      ┌───────────────┴───────────────┐
      ▼                               ▼
PNR Lookup                    Admin Dashboard
```

All application state is managed using **localStorage**, making the system completely serverless.

---

# Core Algorithms

## 1. Segment-Based Seat Allocation

Instead of considering seats as simply available or occupied, RailTrack maps each booking to the train's route.

When a booking request is made:

1. Source and destination station indexes are determined.
2. Existing reservations for the same seat are checked.
3. If no travel segments overlap, the seat is considered available.

Example:

```
Seat 21

Passenger A
Delhi ---------------- Kanpur

Passenger B
Prayagraj ---------------- Howrah

No overlap

Seat can be reused.
```

This significantly improves seat utilization.

---

## 2. Cancellation & Promotion Algorithm

When a confirmed passenger cancels:

```
Confirmed Cancellation
        │
        ▼
Vacant Seat Created
        │
        ▼
Promote First RAC Passenger
        │
        ▼
Assign Coach & Seat
        │
        ▼
Promote First Waitlisted Passenger
        │
        ▼
Update Queue
        │
        ▼
Refresh UI
```

The promotion sequence is animated with timed updates to simulate real railway reservation processing.

---

## Data Persistence

RailTrack stores all information in browser localStorage.

Example keys:

```
users

bookings

trains

activeTrain

rac_<trainNo>_<date>

wl_<trainNo>_<date>
```

No backend database is required.

---

# Installation

## Clone Repository

```bash
git clone https://github.com/sreeja01-11/RailTrack.git
cd RailTrack
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Local Server

```bash
npm start
```

Application will run at

```
http://localhost:8080
```

---

# Demo Workflow

## 1. Create Accounts

- Register an Admin account.
- Register a User account.
- Login as User.

---

## 2. Search Trains

Example:

```
Source:
New Delhi (NDLS)

Destination:
Howrah (HWH)

Travel Date:
Choose any date
```

Select a train and continue.

---

## 3. Book Tickets

- Add multiple passengers.
- Choose berth preferences.
- Confirm booking.
- Print the generated ERS.

---

## 4. Test RAC & Waitlist

Continue booking tickets for the same train and date until:

- Confirmed seats become full.
- New bookings receive RAC.
- Later bookings receive Waitlist.

Cancel a confirmed booking to observe automatic queue promotion.

---

## 5. Explore Admin Dashboard

Login as Admin.

View:

- Booking statistics
- Revenue
- Seat occupancy
- Coach visualization
- Passenger allocation

---

# Highlights

- Client-side railway reservation simulator
- Segment-based seat allocation
- Smart berth preference algorithm
- Dynamic RAC & Waitlist queues
- Automated cancellation promotion engine
- Interactive coach seat visualization
- Real-time PNR lookup
- Printable Electronic Reservation Slip
- Fully responsive interface
- Zero backend dependencies

---

# Future Enhancements

- Backend integration using Node.js & Express
- MongoDB/PostgreSQL database support
- Online payment gateway
- Email & SMS ticket notifications
- Live train status tracking
- Seat availability prediction
- QR Code based ticket verification
- Admin authentication with JWT
- REST API integration

---