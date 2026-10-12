// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Save destinations (client-side demo)
const savedPlaces = [];
const savedStatus = document.getElementById("savedStatus");

document.querySelectorAll(".save-button").forEach((button) => {
  button.addEventListener("click", () => {
    const place = button.dataset.place;
    const alreadySaved = savedPlaces.includes(place);

    if (alreadySaved) {
      savedPlaces.splice(savedPlaces.indexOf(place), 1);
      button.classList.remove("saved");
      button.textContent = "＋ Save trip";
    } else {
      savedPlaces.push(place);
      button.classList.add("saved");
      button.textContent = "✓ Saved";
    }

    savedStatus.textContent = savedPlaces.length
      ? "Saved destinations: " + savedPlaces.join(" • ")
      : "Your saved destinations will appear here.";
  });
});

// Experience selector
const moodIdeas = {
  "Adventure": "Try a guided mountain trek, a cycling route, or a sunrise hike. Start with the Himalayas for dramatic views.",
  "Slow travel": "Choose one place, stay longer, explore local cafés, and leave room in your plan for unplanned discoveries.",
  "Culture": "Explore local markets, heritage streets, museums, and food tours. Bali offers a rich mix of temples and traditions.",
  "Nature": "Look for national parks, coastal walks, forests, and responsible wildlife experiences. Leave every place as you found it."
};

document.querySelectorAll(".experience-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    const mood = tile.dataset.mood;
    document.getElementById("moodResult").textContent = mood + " idea: " + moodIdeas[mood];
    document.querySelectorAll(".experience-tile").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === tile));
    });
  });
});

// Demo trip form: validate and display a local confirmation (no server submission)
document.getElementById("tripForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("travellerName").value.trim();
  const mood = document.getElementById("tripMood").value;
  const monthValue = document.getElementById("travelMonth").value;
  const message = document.getElementById("formMessage");

  if (!name || !mood || !monthValue) {
    message.textContent = "Please complete all fields.";
    return;
  }

  const date = new Date(monthValue + "-01T12:00:00");
  const month = date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  message.textContent = `Nice, ${name}! Your ${mood.toLowerCase()} trip idea is set for ${month}. This is a demo confirmation.`;
});

document.getElementById("year").textContent = new Date().getFullYear();
