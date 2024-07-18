document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("date");
    const slotSelect = document.getElementById("slot");
    const bookingForm = document.getElementById("bookingForm");
    const responseDiv = document.getElementById("response");

    dateInput.addEventListener("change", async () => {
        const date = dateInput.value;
        if (date) {
            const response = await fetch(`/slots?date=${date}`);
            const slots = await response.json();
            slotSelect.innerHTML = '<option value="">Select a slot</option>';
            slots.forEach(slot => {
                const option = document.createElement("option");
                option.value = slot;
                option.textContent = slot;
                slotSelect.appendChild(option);
            });
        }
    });

    bookingForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const date = dateInput.value;
        const slot = slotSelect.value;

        const response = await fetch('/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, slot })
        });

        const result = await response.json();
        responseDiv.textContent = result.message;
    });
});
