// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");

      // Toggle hamburger animation
      const lines = mobileMenuBtn.querySelectorAll(".hamburger-line");
      lines.forEach((line, index) => {
        if (mobileMenu.classList.contains("active")) {
          if (index === 0)
            line.style.transform = "rotate(45deg) translate(5px, 5px)";
          if (index === 1) line.style.opacity = "0";
          if (index === 2)
            line.style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
          line.style.transform = "";
          line.style.opacity = "";
        }
      });
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        const lines = mobileMenuBtn.querySelectorAll(".hamburger-line");
        lines.forEach((line) => {
          line.style.transform = "";
          line.style.opacity = "";
        });
      });
    });
  }
});

// Hero Form Validation (Homepage)
const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const problem = document.getElementById("problem").value;
    const specialist = document.getElementById("specialist").value;

    if (!problem || !specialist) {
      alert(
        "Please select both a problem and a specialist to search for doctors."
      );
      return;
    }

    alert(
      `Searching for ${specialist} for ${problem}. This would redirect to search results.`
    );
  });
}

// DocOnline Form Validation
const startConsultationBtn = document.getElementById("startConsultationBtn");
if (startConsultationBtn) {
  startConsultationBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const problem = document.getElementById("onlineProblem").value;
    const specialist = document.getElementById("onlineSpecialist").value;

    if (!problem || !specialist) {
      alert(
        "Please select both a problem and a specialist to start consultation."
      );
      return;
    }

    alert(
      `Starting video consultation with ${specialist} for ${problem}. Connecting you now...`
    );
  });
}

// Password Toggle Functionality
function setupPasswordToggle(passwordId, toggleId) {
  const passwordInput = document.getElementById(passwordId);
  const toggleBtn = document.getElementById(toggleId);

  if (passwordInput && toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Update icon (in a real implementation, you'd change the SVG)
      const icon = toggleBtn.querySelector(".eye-icon");
      if (type === "text") {
        // Show "eye-off" icon
        icon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                `;
      } else {
        // Show "eye" icon
        icon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                `;
      }
    });
  }
}

// Setup password toggles for different forms
setupPasswordToggle("password", "passwordToggle");
setupPasswordToggle("confirmPassword", "confirmPasswordToggle");

// Form Submissions
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(signupForm);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    alert(
      "Account created successfully! Please check your email for verification."
    );
    console.log("Signup data:", Object.fromEntries(formData));
  });
}

const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(signinForm);
    alert("Signed in successfully!");
    console.log("Signin data:", Object.fromEntries(formData));
  });
}

const appointmentForm = document.getElementById("appointmentForm");
if (appointmentForm) {
  appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(appointmentForm);
    const serviceFee = formData.get("serviceFee");
    const paymentMethod = formData.get("paymentMethod");

    if (!serviceFee) {
      alert("Please agree to the service fee to proceed.");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Validate file uploads
    const reports = document.getElementById("reports").files;
    for (let file of reports) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size should not exceed 5MB.");
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPG, and PNG files are allowed.");
        return;
      }
    }

    alert(
      "Appointment booked successfully! You will receive confirmation within 6 hours."
    );
    console.log("Appointment data:", Object.fromEntries(formData));
  });
}

const clinicForm = document.getElementById("clinicForm");
if (clinicForm) {
  clinicForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(clinicForm);
    const terms = formData.get("terms");
    const registrationFee = formData.get("registrationFee");

    if (!terms) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }

    if (!registrationFee) {
      alert("Please agree to the registration fee to proceed.");
      return;
    }

    // Validate certificate upload
    const certificate = document.getElementById("certificate").files[0];
    if (certificate) {
      if (certificate.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("Certificate file size should not exceed 5MB.");
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedTypes.includes(certificate.type)) {
        alert("Only PDF, JPG, and PNG files are allowed for certificate.");
        return;
      }
    }

    alert(
      "Clinic registration submitted successfully! We will review your application and contact you within 48 hours."
    );
    console.log("Clinic registration data:", Object.fromEntries(formData));
  });
}

// Newsletter Subscription
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = e.target.querySelector('input[type="email"]').value;
    alert("Thank you for subscribing to our newsletter!");
    console.log("Newsletter subscription:", email);
    e.target.reset();
  });
}

// Blog Category Filter
const categoryPills = document.querySelectorAll(".category-pill");
const blogCards = document.querySelectorAll(".blog-card");

categoryPills.forEach((pill) => {
  pill.addEventListener("click", function () {
    // Remove active class from all pills
    categoryPills.forEach((p) => p.classList.remove("active"));

    // Add active class to clicked pill
    this.classList.add("active");

    const selectedCategory = this.getAttribute("data-category");

    // Filter blog cards
    blogCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (selectedCategory === "all" || cardCategory === selectedCategory) {
        card.style.display = "block";
        card.classList.add("fade-in");
      } else {
        card.style.display = "none";
        card.classList.remove("fade-in");
      }
    });
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form input animations and validations
const formInputs = document.querySelectorAll(
  ".form-input, .form-select, .form-textarea"
);
formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    this.parentElement.classList.remove("focused");

    // Basic validation
    if (this.hasAttribute("required") && !this.value.trim()) {
      this.classList.add("error");
    } else {
      this.classList.remove("error");
    }
  });

  input.addEventListener("input", function () {
    this.classList.remove("error");
  });
});

// Date input minimum date (today)
const dateInputs = document.querySelectorAll('input[type="date"]');
dateInputs.forEach((input) => {
  const today = new Date().toISOString().split("T")[0];
  input.setAttribute("min", today);
});

// File upload preview
const fileInputs = document.querySelectorAll('input[type="file"]');
fileInputs.forEach((input) => {
  input.addEventListener("change", function () {
    const files = this.files;
    const fileList = [];

    for (let file of files) {
      fileList.push(file.name);
    }

    if (fileList.length > 0) {
      const preview = document.createElement("div");
      preview.className = "file-preview";
      preview.innerHTML = `<small>Selected: ${fileList.join(", ")}</small>`;

      // Remove existing preview
      const existingPreview = this.parentElement.querySelector(".file-preview");
      if (existingPreview) {
        existingPreview.remove();
      }

      this.parentElement.appendChild(preview);
    }
  });
});

// Add loading states to buttons
const submitButtons = document.querySelectorAll('button[type="submit"]');
submitButtons.forEach((button) => {
  const form = button.closest("form");
  if (form) {
    form.addEventListener("submit", function () {
      button.disabled = true;
      button.innerHTML = "Processing...";

      // Re-enable after 3 seconds (in real app, this would be when the request completes)
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML =
          button.getAttribute("data-original-text") || "Submit";
      }, 3000);
    });
  }
});

// Initialize animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe elements for animations
const animateElements = document.querySelectorAll(
  ".service-card, .benefit-card, .step, .doctor-card, .testimonial, .blog-card"
);
animateElements.forEach((el) => {
  observer.observe(el);
});

// Console log for debugging
console.log("DocSetGo website loaded successfully!");
