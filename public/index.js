const navbarLinks = document.querySelectorAll(".navbar-menu a")

navbarLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
      event.stopPropagation(); // Prevent the event from bubbling up
  
      // Remove the "is-active" class from the currently active link
      var currentActiveLink = document.querySelector(".navbar-menu .is-active");
      if (currentActiveLink) {
        currentActiveLink.classList.remove("is-active");
      }
  
      // Add the "is-active" class to the clicked link
      link.classList.add("is-active");
    });
  });
  
  // Remove the "is-active" class from the first link on page load
  var firstLink = document.querySelector(".navbar-menu a");
  if (firstLink) {
    firstLink.classList.remove("is-active");
  }
  