var bgText = document.getElementById("bg-text");
var bgValue = "About";

const targets = document.querySelectorAll(".container");

const setObserver = (target) => {
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setBackground(entry.target.id);
        }
      });
    },
    { threshold: [0.5] }
  );

  io.observe(target);
};
targets.forEach(setObserver);

const setBackground = (val) => {
  let innerHTML = val;
  switch (val) {
    case "about":
      innerHTML = "About";
      break;
    case "whatido":
      innerHTML = "Skills";
      break;
    case "xp":
      innerHTML = "XP";
      break;
    case "projects":
      innerHTML = "Projects";
      break;
    case "fun-projects":
      innerHTML = ":)";
      break;
    case "freelance":
      innerHTML = "$$$";
      break;
  }
  if (innerHTML === bgValue) return;
  bgValue = innerHTML;
  bgText.innerHTML = innerHTML;
};
