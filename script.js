document.addEventListener('DOMContentLoaded', () => {
    const seatingChart = document.getElementById('seating-chart');
    const reserveBtn = document.getElementById('reserve-btn');
    const reservationInfo = document.getElementById('reservation-info');

    const rows = 25;
    const cols = 20;
    let selectedSeats = [];

    // Initialize seating chart
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.dataset.row = i;
            seat.dataset.col = j;

            // Example conditions for different seat types
            if (i < 1 && j < 2) {
                seat.classList.add('judge');
            } else if (i % 5 === 0 && j % 2 === 0) {
                seat.classList.add('unavailable');
            }

            seat.addEventListener('click', () => {
                if (!seat.classList.contains('unavailable') && !seat.classList.contains('judge')) {
                    seat.classList.toggle('selected');
                    const seatIndex = selectedSeats.findIndex(s => s.row === i && s.col === j);
                    if (seatIndex === -1) {
                        selectedSeats.push({ row: i, col: j });
                    } else {
                        selectedSeats.splice(seatIndex, 1);
                    }
                }
            });

            seatingChart.appendChild(seat);
        }
    }

    // Reserve selected seats
    reserveBtn.addEventListener('click', () => {
        if (selectedSeats.length > 0) {
            const reservationNumber = Math.floor(Math.random() * 1000000);
            reservationInfo.textContent = `Reservation Number: ${reservationNumber}`;
            selectedSeats.forEach(seat => {
                const seatElement = document.querySelector(`.seat[data-row='${seat.row}'][data-col='${seat.col}']`);
                seatElement.classList.remove('selected');
                seatElement.classList.add('unavailable');
            });
            selectedSeats = [];
        } else {
            reservationInfo.textContent = 'No seats selected';
        }
    });
});