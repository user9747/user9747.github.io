var bgText = document.getElementById("bg-text");
var bgValue = "About";
var typedText = [];
var mode = "visual";
var isRandomTheme = false;

const colorThemes = [
  "light",
  "dark",
  "dracula",
  "gruvbox-dark",
  "gruvbox-light",
  "solorized-dark",
  "solorized-light",
];

const openBurger = () => {
  var element = document.getElementById("nav");
  element.classList.add("nav-mobile");
};
const closeBurger = () => {
  var element = document.getElementById("nav");
  element.classList.remove("nav-mobile");
};

const getThemeFromLocalStorage = () => {
  const theme = getLocalStorage("theme");
  if (theme && theme !== "random") {
    document.documentElement.setAttribute("data-theme", theme);
    let themeObj = document.getElementById("themes");
    themeObj.value = theme;
  } else if (theme === "random") {
    isRandomTheme = true;
  }
};

getThemeFromLocalStorage();

if (isRandomTheme) {
  document.documentElement.setAttribute(
    "data-theme",
    colorThemes[getRandomIntInclusive(0, colorThemes.length - 1)]
  );
}

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

const setTypedText = (key) => {
  switch (key) {
    case "/":
      typedText = [];
      break;

    default:
      if (typedText.length >= 5) {
        return;
      }
      typedText.push(key);
      break;
  }
};

const setCommandText = () => {
  let commandText = document.getElementById("command-text");
  commandText.innerHTML = "/" + typedText.join("");
};

const setModeVisual = () => {
  mode = "visual";
  document.getElementById("command").style.display = "none";
  typedText = [];
};

const setTheme = () => {
  if (typedText.join("").includes("lumos")) {
    document.documentElement.setAttribute("data-theme", "light");
    setModeVisual();
    return;
  }

  if (typedText.join("").includes("nox")) {
    document.documentElement.setAttribute("data-theme", "dark");
    setModeVisual();
    return;
  }
};
window.onkeydown = (e) => {
  if (mode === "command" && e.key === "Escape") {
    setModeVisual();
  }

  if (mode !== "command" && e.key === "/") {
    mode = "command";
    document.getElementById("command").style.display = "flex";
    setCommandText();
    return;
  }
  if (mode !== "command") {
    return;
  }

  if (e.key.length != 1) {
    if (e.key === "Backspace" && typedText.length) {
      typedText = typedText.slice(0, -1);
    }
  } else {
    setTypedText(e.key);
  }

  setCommandText();
  setTheme();
};

const onThemeChange = () => {
  var theme = document.getElementById("themes");
  document.documentElement.setAttribute("data-theme", theme.value);
  setLocalStorage("theme", theme.value);
  if (theme.value === "random") {
    isRandomTheme = true;
  } else {
    isRandomTheme = false;
  }
};
