const educationTitle = document.querySelector(".education-title-container");
const educationList = document.querySelector(".education-list");
const educationControl = document.querySelector(".education-control");
const el = document.querySelector(".slider");

educationTitle.addEventListener("click", () => {
  educationList.classList.toggle("hidden");
  educationControl.classList.toggle("rotate");
});

let items = document.querySelectorAll(".project");
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
}

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

document.querySelector(".arrow-prev").addEventListener("click", function () {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector(".arrow-next").addEventListener("click", function () {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

// swiper with mouse by Shalyapin

const swipeDetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  surface.addEventListener("mousedown", function (e) {
    e.preventDefault();

    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
  });

  surface.addEventListener("mouseup", function (e) {
    e.preventDefault();

    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if ((Math.abs(distX) > threshold) && (Math.abs(distY) <= restraint)) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
  });

  surface.addEventListener("touchstart", function (e) {
    if (e.target.classList.contains("arrow")) {
      console.log("e.target.classList.contains( arrow )");
      if (e.target.classList.contains("arrow-prev")) {
        if (isEnabled) {
          previousItem(currentItem);
        }
      } else if (e.target.classList.contains("arrow-next")) {
        if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }

    if (e.target.classList.contains("project-show-repair")) {
      document.querySelector(".project-desc-repair").classList.toggle("open-desc");
    }

    if (e.target.classList.contains("project-show-theyallow")) {
      document.querySelector(".project-desc-theyallow").classList.toggle("open-desc");
    }

    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
  });

  surface.addEventListener("touchend", function (e) {
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if ((Math.abs(distX) > threshold) && (Math.abs(distY) <= restraint)) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
  });
}

swipeDetect(el);

// END of swiper by Shalyapin
// Webinar 17.10.2019 Swiper & Slider Examples https://youtu.be/rkz6LURkbBw