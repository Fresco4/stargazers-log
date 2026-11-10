const list = document.querySelector("#starred");
const status = document.querySelector("#status");

if (!list) {
  console.error("#starred list not found.");
} else {
  fetch("events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load events: ${response.status} ${response.statusText}`);
      }

      return response.json();
    })
    .then((events) => {
      if (!Array.isArray(events)) {
        throw new TypeError("Events data is not an array.");
      }

      list.innerHTML = "";

      const validEvents = events.filter(
        (event) =>
          event &&
          typeof event.name === "string" &&
          event.name.trim() !== "" &&
          typeof event.starred === "string" &&
          event.starred.trim() !== ""
      );

      if (validEvents.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No starred repositories available.";
        list.appendChild(emptyItem);

        if (status) {
          status.textContent = "No starred repositories available.";
        }
        return;
      }

      validEvents.forEach((event) => {
        const item = document.createElement("li");
        item.textContent = `${event.name} — starred ${event.starred}`;
        list.appendChild(item);
      });

      if (status) {
        status.textContent = `Loaded ${validEvents.length} starred repositories.`;
      }
    })
    .catch((error) => {
      console.error("Unable to load starred repositories:", error);
      list.innerHTML = "";

      const errorItem = document.createElement("li");
      errorItem.textContent = "Unable to load starred repositories right now.";
      list.appendChild(errorItem);

      if (status) {
        status.textContent = "Unable to load starred repositories right now.";
      }
    });
}