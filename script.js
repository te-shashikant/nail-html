// Bootstrap-based JavaScript with all functionality

class BootstrapNavigation {
  constructor() {
    this.navbar = document.querySelector(".custom-navbar");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.init();
  }

  init() {
    // Handle scroll effects
    window.addEventListener("scroll", () => this.handleScroll());

    // Handle smooth scrolling
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleSmoothScroll(e));
    });

    // Handle active link updates
    window.addEventListener("scroll", () => this.updateActiveLink());
  }

  handleScroll() {
    const scrollTop = window.pageYOffset;

    if (scrollTop > 50) {
      this.navbar.classList.add("scrolled");
    } else {
      this.navbar.classList.remove("scrolled");
    }
  }

  handleSmoothScroll(e) {
    const href = e.target.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetSection = document.querySelector(href);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  }

  updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.pageYOffset + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
}

// Enhanced News Slider with Images
class NewsSliderWithImages {
  constructor() {
    this.currentSlide = 0;
    this.slides = [
      {
        title: "New Sustainability Reporting Guidelines Released",
        description:
          "Updated framework helps SMEs align with global standards while simplifying the reporting process.",
        tag: "NEWS",
        image: "/placeholder.svg?height=120&width=120&text=Guidelines",
      },
      {
        title: "Climate Action Summit 2024 Highlights",
        description:
          "Key insights from industry leaders on implementing sustainable practices in small businesses.",
        tag: "EVENT",
        image: "/placeholder.svg?height=120&width=120&text=Summit",
      },
      {
        title: "AI-Powered Data Analytics Now Available",
        description:
          "Enhanced reporting capabilities with machine learning insights for better decision making.",
        tag: "FEATURE",
        image: "/placeholder.svg?height=120&width=120&text=AI+Analytics",
      },
      {
        title: "Partnership with Global Sustainability Network",
        description:
          "Expanding our reach to support more SMEs worldwide in their sustainability journey.",
        tag: "PARTNERSHIP",
        image: "/placeholder.svg?height=120&width=120&text=Partnership",
      },
      {
        title: "Q3 Impact Report Published",
        description:
          "See how our platform has helped thousands of businesses improve their sustainability reporting.",
        tag: "REPORT",
        image: "/placeholder.svg?height=120&width=120&text=Q3+Report",
      },
    ];

    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.dots = document.querySelectorAll(".dot");
    this.newsTitle = document.querySelector(".news-title");
    this.newsDescription = document.querySelector(".news-description");
    this.newsTag = document.querySelector(".news-tag");
    this.slideImage = document.getElementById("slideImage");

    this.init();
  }

  init() {
    this.prevBtn?.addEventListener("click", () => this.previousSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Auto-play slider
    this.startAutoPlay();

    // Pause auto-play on hover
    const sliderContainer = document.querySelector(".slider-container");
    sliderContainer?.addEventListener("mouseenter", () => this.stopAutoPlay());
    sliderContainer?.addEventListener("mouseleave", () => this.startAutoPlay());

    // Initial slide setup
    this.updateSlide();
  }

  updateSlide() {
    const currentSlideData = this.slides[this.currentSlide];

    // Update content with fade effect
    this.fadeOut(() => {
      this.newsTitle.textContent = currentSlideData.title;
      this.newsDescription.textContent = currentSlideData.description;
      this.newsTag.textContent = currentSlideData.tag;
      this.slideImage.src = currentSlideData.image;
      this.slideImage.alt = currentSlideData.title;
      this.fadeIn();
    });

    // Update dots
    this.dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.remove("bg-secondary");
        dot.classList.add("bg-primary", "active");
      } else {
        dot.classList.remove("bg-primary", "active");
        dot.classList.add("bg-secondary");
      }
    });
  }

  fadeOut(callback) {
    const content = document.querySelector(".news-content");
    const image = this.slideImage;

    content.style.opacity = "0";
    content.style.transform = "translateY(20px)";
    image.style.opacity = "0";
    image.style.transform = "scale(0.9)";

    setTimeout(callback, 300);
  }

  fadeIn() {
    const content = document.querySelector(".news-content");
    const image = this.slideImage;

    setTimeout(() => {
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
      image.style.opacity = "1";
      image.style.transform = "scale(1)";
    }, 100);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlide();
  }

  previousSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlide();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlide();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

// Enhanced Report Library with Working Pagination
class ReportLibraryWithPagination {
  constructor() {
    this.reports = [
      {
        id: 1,
        title: "EcoTech Solutions Sustainability Report",
        description:
          "Comprehensive overview of environmental initiatives, carbon reduction strategies, and social responsibility programs.",
        industry: "Manufacturing",
        year: "2023",
        region: "Asia Pacific",
        tags: ["Carbon Neutral", "Social Impact", "Renewable Energy"],
        keywords: [
          "environmental",
          "carbon",
          "social",
          "responsibility",
          "ecotech",
          "sustainability",
        ],
      },
      {
        id: 2,
        title: "GreenSoft Technologies ESG Report",
        description:
          "Detailed analysis of environmental footprint, governance practices, and community engagement initiatives.",
        industry: "Technology",
        year: "2023",
        region: "North America",
        tags: ["ESG", "Governance", "Diversity"],
        keywords: [
          "esg",
          "governance",
          "community",
          "environmental",
          "greensoft",
          "technology",
        ],
      },
      {
        id: 3,
        title: "Sustainable Farms Collective Annual Report",
        description:
          "Focus on regenerative agriculture practices, water conservation efforts, and fair trade commitments.",
        industry: "Agriculture",
        year: "2022",
        region: "Europe",
        tags: ["Regenerative", "Water Conservation", "Fair Trade"],
        keywords: [
          "agriculture",
          "regenerative",
          "water",
          "conservation",
          "fair",
          "trade",
          "farms",
        ],
      },
      {
        id: 4,
        title: "EcoRetail Solutions Sustainability Report",
        description:
          "Highlights sustainable supply chain management, packaging innovations, and ethical sourcing practices.",
        industry: "Retail",
        year: "2022",
        region: "South America",
        tags: ["Supply Chain", "Packaging", "Ethical Sourcing"],
        keywords: [
          "retail",
          "supply",
          "chain",
          "packaging",
          "ethical",
          "sourcing",
          "sustainable",
        ],
      },
      {
        id: 5,
        title: "CleanPower Co-op Impact Report",
        description:
          "Details on renewable energy production, community ownership model, and carbon offset achievements.",
        industry: "Energy",
        year: "2021",
        region: "Europe",
        tags: ["Solar", "Community Owned", "Carbon Offset"],
        keywords: [
          "energy",
          "renewable",
          "solar",
          "community",
          "carbon",
          "offset",
          "cleanpower",
        ],
      },
      {
        id: 6,
        title: "CircularTech Manufacturing ESG Report",
        description:
          "Focus on circular economy principles, waste reduction initiatives, and employee wellbeing programs.",
        industry: "Manufacturing",
        year: "2021",
        region: "Asia Pacific",
        tags: ["Circular Economy", "Zero Waste", "Employee Wellbeing"],
        keywords: [
          "circular",
          "economy",
          "waste",
          "reduction",
          "employee",
          "wellbeing",
          "manufacturing",
        ],
      },
      // Add more reports for pagination testing
      {
        id: 7,
        title: "GreenTech Innovations Sustainability Report",
        description:
          "Breakthrough technologies for environmental monitoring and carbon capture solutions.",
        industry: "Technology",
        year: "2023",
        region: "North America",
        tags: ["Innovation", "Carbon Capture", "Environmental Tech"],
        keywords: [
          "greentech",
          "innovation",
          "carbon",
          "capture",
          "environmental",
          "technology",
        ],
      },
      {
        id: 8,
        title: "Sustainable Agriculture Cooperative Report",
        description:
          "Community-driven sustainable farming practices and biodiversity conservation efforts.",
        industry: "Agriculture",
        year: "2022",
        region: "South America",
        tags: ["Biodiversity", "Community", "Sustainable Farming"],
        keywords: [
          "agriculture",
          "biodiversity",
          "community",
          "sustainable",
          "farming",
          "cooperative",
        ],
      },
      {
        id: 9,
        title: "Clean Energy Solutions Annual Report",
        description:
          "Comprehensive analysis of renewable energy projects and their environmental impact.",
        industry: "Energy",
        year: "2023",
        region: "Europe",
        tags: ["Renewable Energy", "Environmental Impact", "Clean Tech"],
        keywords: [
          "clean",
          "energy",
          "renewable",
          "environmental",
          "impact",
          "solutions",
        ],
      },
    ];

    this.filteredReports = [...this.reports];
    this.currentPage = 1;
    this.reportsPerPage = 6;
    this.currentFilters = {
      search: "",
      industry: "All Industries",
      year: "All Years",
      region: "All Regions",
      sort: "Newest First",
    };

    this.init();
  }

  init() {
    // Get filter elements
    this.searchInput = document.getElementById("search");
    this.industrySelect = document.getElementById("industry");
    this.yearSelect = document.getElementById("year");
    this.regionSelect = document.getElementById("region");
    this.sortSelect = document.getElementById("sort");
    this.applyBtn = document.querySelector(".apply-filters-btn");

    // Add event listeners
    this.searchInput?.addEventListener(
      "input",
      this.debounce(() => this.handleSearch(), 300)
    );
    this.industrySelect?.addEventListener("change", () =>
      this.handleFilterChange()
    );
    this.yearSelect?.addEventListener("change", () =>
      this.handleFilterChange()
    );
    this.regionSelect?.addEventListener("change", () =>
      this.handleFilterChange()
    );
    this.sortSelect?.addEventListener("change", () => this.handleSort());
    this.applyBtn?.addEventListener("click", () => this.applyFilters());

    // Initial render
    this.applyFilters();
  }

  handleSearch() {
    this.currentFilters.search = this.searchInput.value.toLowerCase().trim();
    this.applyFilters();
  }

  handleFilterChange() {
    this.currentFilters.industry = this.industrySelect.value;
    this.currentFilters.year = this.yearSelect.value;
    this.currentFilters.region = this.regionSelect.value;
  }

  handleSort() {
    this.currentFilters.sort = this.sortSelect.value;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.reports];

    // Apply search filter
    if (this.currentFilters.search) {
      filtered = filtered.filter((report) => {
        const searchTerm = this.currentFilters.search;
        return (
          report.title.toLowerCase().includes(searchTerm) ||
          report.description.toLowerCase().includes(searchTerm) ||
          report.keywords.some((keyword) => keyword.includes(searchTerm)) ||
          report.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        );
      });
    }

    // Apply industry filter
    if (this.currentFilters.industry !== "All Industries") {
      filtered = filtered.filter(
        (report) => report.industry === this.currentFilters.industry
      );
    }

    // Apply year filter
    if (this.currentFilters.year !== "All Years") {
      filtered = filtered.filter(
        (report) => report.year === this.currentFilters.year
      );
    }

    // Apply region filter
    if (this.currentFilters.region !== "All Regions") {
      filtered = filtered.filter(
        (report) => report.region === this.currentFilters.region
      );
    }

    // Apply sorting
    this.sortReports(filtered);

    this.filteredReports = filtered;
    this.currentPage = 1; // Reset to first page when filters change
    this.renderReports();
    this.renderPagination();
    this.updateResultsCounter();
  }

  sortReports(reports) {
    switch (this.currentFilters.sort) {
      case "Newest First":
        reports.sort(
          (a, b) => Number.parseInt(b.year) - Number.parseInt(a.year)
        );
        break;
      case "Oldest First":
        reports.sort(
          (a, b) => Number.parseInt(a.year) - Number.parseInt(b.year)
        );
        break;
      case "A-Z":
        reports.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        reports.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
  }

  renderReports() {
    const reportsGrid = document.querySelector(".reports-grid");
    if (!reportsGrid) return;

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.reportsPerPage;
    const endIndex = startIndex + this.reportsPerPage;
    const currentReports = this.filteredReports.slice(startIndex, endIndex);

    if (currentReports.length === 0) {
      reportsGrid.innerHTML = `
        <div class="col-12">
          <div class="no-results text-center py-5">
            <h3 class="h4 mb-3">No reports found</h3>
            <p class="text-muted mb-4">Try adjusting your filters or search terms.</p>
            <button class="btn btn-primary" onclick="reportLibrary.clearFilters()">Clear Filters</button>
          </div>
        </div>
      `;
      return;
    }

    reportsGrid.innerHTML = currentReports
      .map(
        (report) => `
      <div class="col-lg-4 col-md-6">
        <div class="card report-card h-100 border-0 shadow-sm">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="badge industry-tag ${report.industry.toLowerCase()}">${
          report.industry
        }</span>
              <small class="text-muted fw-medium">${report.year}</small>
            </div>
            <h3 class="card-title h6 fw-bold mb-3">${report.title}</h3>
            <p class="card-text text-muted small mb-3">${report.description}</p>
            <div class="mb-3">
              ${report.tags
                .map(
                  (tag) =>
                    `<span class="tag ${this.getTagClass(tag)}">${tag}</span>`
                )
                .join("")}
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">${report.region}</small>
              <a href="#" class="text-primary fw-semibold text-decoration-none small" onclick="reportLibrary.downloadReport(${
                report.id
              })">
                Download PDF <i class="bi bi-download"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  renderPagination() {
    const pagination = document.getElementById("reportsPagination");
    if (!pagination) return;

    const totalPages = Math.ceil(
      this.filteredReports.length / this.reportsPerPage
    );

    if (totalPages <= 1) {
      pagination.innerHTML = "";
      return;
    }

    let paginationHTML = "";

    // Previous button
    paginationHTML += `
      <li class="page-item ${this.currentPage === 1 ? "disabled" : ""}">
        <a class="page-link" href="#" onclick="reportLibrary.goToPage(${
          this.currentPage - 1
        })" ${this.currentPage === 1 ? 'tabindex="-1"' : ""}>
          Previous
        </a>
      </li>
    `;

    // Page numbers
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(totalPages, this.currentPage + 2);

    if (startPage > 1) {
      paginationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="reportLibrary.goToPage(1)">1</a></li>`;
      if (startPage > 2) {
        paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
        <li class="page-item ${i === this.currentPage ? "active" : ""}">
          <a class="page-link" href="#" onclick="reportLibrary.goToPage(${i})">${i}</a>
        </li>
      `;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
      paginationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="reportLibrary.goToPage(${totalPages})">${totalPages}</a></li>`;
    }

    // Next button
    paginationHTML += `
      <li class="page-item ${
        this.currentPage === totalPages ? "disabled" : ""
      }">
        <a class="page-link" href="#" onclick="reportLibrary.goToPage(${
          this.currentPage + 1
        })" ${this.currentPage === totalPages ? 'tabindex="-1"' : ""}>
          Next
        </a>
      </li>
    `;

    pagination.innerHTML = paginationHTML;
  }

  goToPage(page) {
    const totalPages = Math.ceil(
      this.filteredReports.length / this.reportsPerPage
    );
    if (page < 1 || page > totalPages) return;

    this.currentPage = page;
    this.renderReports();
    this.renderPagination();

    // Scroll to reports section
    document
      .getElementById("report-library")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  getTagClass(tag) {
    const tagClasses = {
      "Carbon Neutral": "carbon",
      "Social Impact": "social",
      "Renewable Energy": "energy",
      ESG: "esg",
      Governance: "governance",
      Diversity: "diversity",
      Regenerative: "regenerative",
      "Water Conservation": "water",
      "Fair Trade": "trade",
      "Supply Chain": "supply",
      Packaging: "packaging",
      "Ethical Sourcing": "ethical",
      Solar: "solar",
      "Community Owned": "community",
      "Carbon Offset": "offset",
      "Circular Economy": "circular",
      "Zero Waste": "waste",
      "Employee Wellbeing": "employee",
      Innovation: "carbon",
      "Carbon Capture": "carbon",
      "Environmental Tech": "energy",
      Biodiversity: "regenerative",
      Community: "community",
      "Sustainable Farming": "regenerative",
      "Environmental Impact": "energy",
      "Clean Tech": "energy",
    };
    return tagClasses[tag] || "carbon";
  }

  updateResultsCounter() {
    const counter = document.querySelector(".results-counter");
    if (!counter) return;

    const total = this.reports.length;
    const filtered = this.filteredReports.length;
    const startIndex = (this.currentPage - 1) * this.reportsPerPage + 1;
    const endIndex = Math.min(this.currentPage * this.reportsPerPage, filtered);

    if (filtered === 0) {
      counter.innerHTML = `No reports found out of ${total} total reports`;
    } else {
      counter.innerHTML = `Showing ${startIndex}-${endIndex} of ${filtered} reports (${total} total)`;
    }
  }

  downloadReport(reportId) {
    const report = this.reports.find((r) => r.id === reportId);
    if (report) {
      console.log(`Downloading: ${report.title}`);
      // Show Bootstrap toast or modal
      this.showToast(`Downloading: ${report.title}`, "success");
    }
  }

  clearFilters() {
    this.searchInput.value = "";
    this.industrySelect.value = "All Industries";
    this.yearSelect.value = "All Years";
    this.regionSelect.value = "All Regions";
    this.sortSelect.value = "Newest First";

    this.currentFilters = {
      search: "",
      industry: "All Industries",
      year: "All Years",
      region: "All Regions",
      sort: "Newest First",
    };

    this.applyFilters();
  }

  showToast(message, type = "info") {
    // Create Bootstrap toast
    const toastHTML = `
      <div class="toast align-items-center text-white bg-${
        type === "success" ? "success" : "primary"
      } border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    `;

    // Add to toast container or create one
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className =
        "toast-container position-fixed bottom-0 end-0 p-3";
      document.body.appendChild(toastContainer);
    }

    toastContainer.insertAdjacentHTML("beforeend", toastHTML);
    const toastElement = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    // Remove toast element after it's hidden
    toastElement.addEventListener("hidden.bs.toast", () => {
      toastElement.remove();
    });
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Learning Hub Filter
class LearningHubFilter {
  constructor() {
    this.webinars = [
      {
        id: 1,
        title: "Carbon Accounting for Small Businesses",
        date: "June 15, 2023",
        time: "10:00 AM GMT",
        presenter: "Dr. Sarah Johnson",
        institute: "Climate Solutions Institute",
        topic: "Carbon Management",
        registered: false,
      },
      {
        id: 2,
        title: "ESG Reporting for SMEs: Simplified Approaches",
        date: "June 22, 2023",
        time: "2:00 PM GMT",
        presenter: "Michael Chen",
        institute: "Sustainable Business Alliance",
        topic: "Reporting",
        registered: false,
      },
      {
        id: 3,
        title: "Building a Sustainable Supply Chain",
        date: "July 5, 2023",
        time: "11:00 AM GMT",
        presenter: "Dr. Amara Patel",
        institute: "Global Supply Network",
        topic: "Supply Chain",
        registered: false,
      },
      {
        id: 4,
        title: "Diversity & Inclusion in Sustainability Reporting",
        date: "July 18, 2023",
        time: "3:00 PM GMT",
        presenter: "Elena Rodriguez",
        institute: "Inclusive Futures Institute",
        topic: "Social Impact",
        registered: false,
      },
    ];

    this.init();
  }

  init() {
    this.renderWebinars();
  }

  renderWebinars() {
    const tableBody = document.getElementById("webinarsTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = this.webinars
      .map(
        (webinar) => `
      <tr>
        <td>
          <div class="fw-medium">${webinar.date}</div>
          <small class="text-muted">${webinar.time}</small>
        </td>
        <td class="fw-medium">${webinar.title}</td>
        <td>
          <div class="fw-medium">${webinar.presenter}</div>
          <small class="text-muted">${webinar.institute}</small>
        </td>
        <td>
          <span class="badge topic-tag ${webinar.topic
            .toLowerCase()
            .replace(" ", "")}">${webinar.topic}</span>
        </td>
        <td>
          <a href="#" class="btn btn-sm ${
            webinar.registered ? "btn-success" : "btn-outline-primary"
          }" 
             onclick="learningHub.registerWebinar(${webinar.id})">
            ${webinar.registered ? "Registered ✓" : "Register"}
          </a>
        </td>
      </tr>
    `
      )
      .join("");
  }

  registerWebinar(webinarId) {
    const webinar = this.webinars.find((w) => w.id === webinarId);
    if (webinar && !webinar.registered) {
      webinar.registered = true;
      this.renderWebinars();

      // Show success message
      const toast = `
        <div class="toast align-items-center text-white bg-success border-0" role="alert">
          <div class="d-flex">
            <div class="toast-body">Successfully registered for: ${webinar.title}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      `;

      let toastContainer = document.querySelector(".toast-container");
      if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className =
          "toast-container position-fixed bottom-0 end-0 p-3";
        document.body.appendChild(toastContainer);
      }

      toastContainer.insertAdjacentHTML("beforeend", toast);
      const toastElement = toastContainer.lastElementChild;
      const bsToast = new bootstrap.Toast(toastElement);
      bsToast.show();
    }
  }
}

// Global Search Handler
class GlobalSearchHandler {
  constructor() {
    this.searchInput = document.querySelector(".search-input");
    this.searchBtn = document.querySelector(".search-btn");
    this.init();
  }

  init() {
    this.searchBtn?.addEventListener("click", () => this.performSearch());
    this.searchInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.performSearch();
      }
    });
  }

  performSearch() {
    const query = this.searchInput.value.trim();
    if (!query) return;

    console.log("Global search for:", query);

    // Show search results in a modal
    this.showSearchModal(query);
  }

  showSearchModal(query) {
    const modalHTML = `
      <div class="modal fade" id="searchModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Search Results for "${query}"</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="alert alert-info">
                <i class="bi bi-info-circle me-2"></i>
                This would typically show search results across all sections of the website.
              </div>
              <p>Search functionality would include:</p>
              <ul>
                <li>Reports matching your query</li>
                <li>Learning resources and guides</li>
                <li>Upcoming webinars</li>
                <li>News and announcements</li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById("searchModal");
    if (existingModal) {
      existingModal.remove();
    }

    // Add modal to body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById("searchModal"));
    modal.show();
  }
}

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add transition styles for news content
  const newsContent = document.querySelector(".news-content");
  const slideImage = document.getElementById("slideImage");

  if (newsContent) {
    newsContent.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  }

  if (slideImage) {
    slideImage.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  }

  // Initialize all components
  window.navigation = new BootstrapNavigation();
  window.newsSlider = new NewsSliderWithImages();
  window.reportLibrary = new ReportLibraryWithPagination();
  window.learningHub = new LearningHubFilter();
  window.globalSearch = new GlobalSearchHandler();

  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
      }
    });
  }, observerOptions);

  // Observe resource cards
  document
    .querySelectorAll(".resource-card, .resource-library-card, .featured-card")
    .forEach((card) => {
      observer.observe(card);
    });
});

// Mobile Navigation Toggle
/*class Navigation {
  constructor() {
    this.hamburger = document.querySelector(".hamburger")
    this.navMenu = document.querySelector(".nav-menu")
    this.navLinks = document.querySelectorAll(".nav-link")

    this.init()
  }

  init() {
    this.hamburger.addEventListener("click", () => this.toggleMobileMenu())
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMobileMenu())
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
        this.closeMobileMenu()
      }
    })
  }

  toggleMobileMenu() {
    this.hamburger.classList.toggle("active")
    this.navMenu.classList.toggle("active")

    // Animate hamburger bars
    const bars = this.hamburger.querySelectorAll(".bar")
    if (this.hamburger.classList.contains("active")) {
      bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
      bars[1].style.opacity = "0"
      bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
    } else {
      bars[0].style.transform = "none"
      bars[1].style.opacity = "1"
      bars[2].style.transform = "none"
    }
  }

  closeMobileMenu() {
    this.hamburger.classList.remove("active")
    this.navMenu.classList.remove("active")

    const bars = this.hamburger.querySelectorAll(".bar")
    bars[0].style.transform = "none"
    bars[1].style.opacity = "1"
    bars[2].style.transform = "none"
  }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-link[href^="#"]')
    this.init()
  }

  init() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleClick(e))
    })
  }

  handleClick(e) {
    e.preventDefault()
    const targetId = e.target.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }
}

// News Slider
class NewsSlider {
  constructor() {
    this.currentSlide = 0
    this.slides = [
      {
        title: "New Sustainability Reporting Guidelines Released",
        description:
          "Updated framework helps SMEs align with global standards while simplifying the reporting process.",
        tag: "NEWS",
      },
      {
        title: "Climate Action Summit 2024 Highlights",
        description: "Key insights from industry leaders on implementing sustainable practices in small businesses.",
        tag: "EVENT",
      },
      {
        title: "AI-Powered Data Analytics Now Available",
        description: "Enhanced reporting capabilities with machine learning insights for better decision making.",
        tag: "FEATURE",
      },
      {
        title: "Partnership with Global Sustainability Network",
        description: "Expanding our reach to support more SMEs worldwide in their sustainability journey.",
        tag: "PARTNERSHIP",
      },
      {
        title: "Q3 Impact Report Published",
        description: "See how our platform has helped thousands of businesses improve their sustainability reporting.",
        tag: "REPORT",
      },
    ]

    this.prevBtn = document.getElementById("prevBtn")
    this.nextBtn = document.getElementById("nextBtn")
    this.dots = document.querySelectorAll(".dot")
    this.newsTitle = document.querySelector(".news-title")
    this.newsDescription = document.querySelector(".news-description")
    this.newsTag = document.querySelector(".news-tag")

    this.init()
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.previousSlide())
    this.nextBtn.addEventListener("click", () => this.nextSlide())

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index))
    })

    // Auto-play slider
    this.startAutoPlay()

    // Pause auto-play on hover
    const sliderContainer = document.querySelector(".slider-container")
    sliderContainer.addEventListener("mouseenter", () => this.stopAutoPlay())
    sliderContainer.addEventListener("mouseleave", () => this.startAutoPlay())
  }

  updateSlide() {
    const currentSlideData = this.slides[this.currentSlide]

    // Update content with fade effect
    this.fadeOut(() => {
      this.newsTitle.textContent = currentSlideData.title
      this.newsDescription.textContent = currentSlideData.description
      this.newsTag.textContent = currentSlideData.tag
      this.fadeIn()
    })

    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide)
    })
  }

  fadeOut(callback) {
    const content = document.querySelector(".news-content")
    content.style.opacity = "0"
    content.style.transform = "translateY(20px)"
    setTimeout(callback, 300)
  }

  fadeIn() {
    const content = document.querySelector(".news-content")
    setTimeout(() => {
      content.style.opacity = "1"
      content.style.transform = "translateY(0)"
    }, 100)
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length
    this.updateSlide()
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.updateSlide()
  }

  goToSlide(index) {
    this.currentSlide = index
    this.updateSlide()
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
    }
  }
}

// Scroll Effects
class ScrollEffects {
  constructor() {
    this.navbar = document.querySelector(".navbar")
    this.init()
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll())

    // Intersection Observer for animations
    this.observeElements()
  }

  handleScroll() {
    const scrollTop = window.pageYOffset

    // Navbar background opacity
    if (scrollTop > 50) {
      this.navbar.style.background = "rgba(255, 255, 255, 0.98)"
      this.navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      this.navbar.style.background = "rgba(255, 255, 255, 0.95)"
      this.navbar.style.boxShadow = "none"
    }
  }

  observeElements() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    // Observe resource cards
    document.querySelectorAll(".resource-card").forEach((card) => {
      observer.observe(card)
    })
  }
}

// Search Functionality
class SearchHandler {
  constructor() {
    this.searchInput = document.querySelector(".search-input")
    this.searchBtn = document.querySelector(".search-btn")
    this.init()
  }

  init() {
    this.searchBtn.addEventListener("click", () => this.handleSearch())
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleSearch()
      }
    })

    // Add search suggestions (placeholder functionality)
    this.searchInput.addEventListener("input", () => this.handleInput())
  }

  handleSearch() {
    const query = this.searchInput.value.trim()
    if (query) {
      console.log("Searching for:", query)
      // Implement actual search functionality here
      this.showSearchResults(query)
    }
  }

  handleInput() {
    const query = this.searchInput.value.trim()
    if (query.length > 2) {
      // Show search suggestions (placeholder)
      console.log("Showing suggestions for:", query)
    }
  }

  showSearchResults(query) {
    // Placeholder for search results display
    alert(
      `Searching for: "${query}"\n\nThis would typically redirect to a search results page or show results in a modal.`,
    )
  }
}

// Report Library Filtering System
class ReportLibraryFilter {
  constructor() {
    this.reports = [
      {
        id: 1,
        title: "EcoTech Solutions Sustainability Report",
        description:
          "Comprehensive overview of environmental initiatives, carbon reduction strategies, and social responsibility programs.",
        industry: "Manufacturing",
        year: "2023",
        region: "Asia Pacific",
        tags: ["Carbon Neutral", "Social Impact", "Renewable Energy"],
        keywords: ["environmental", "carbon", "social", "responsibility", "ecotech", "sustainability"],
      },
      {
        id: 2,
        title: "GreenSoft Technologies ESG Report",
        description:
          "Detailed analysis of environmental footprint, governance practices, and community engagement initiatives.",
        industry: "Technology",
        year: "2023",
        region: "North America",
        tags: ["ESG", "Governance", "Diversity"],
        keywords: ["esg", "governance", "community", "environmental", "greensoft", "technology"],
      },
      {
        id: 3,
        title: "Sustainable Farms Collective Annual Report",
        description:
          "Focus on regenerative agriculture practices, water conservation efforts, and fair trade commitments.",
        industry: "Agriculture",
        year: "2022",
        region: "Europe",
        tags: ["Regenerative", "Water Conservation", "Fair Trade"],
        keywords: ["agriculture", "regenerative", "water", "conservation", "fair", "trade", "farms"],
      },
      {
        id: 4,
        title: "EcoRetail Solutions Sustainability Report",
        description:
          "Highlights sustainable supply chain management, packaging innovations, and ethical sourcing practices.",
        industry: "Retail",
        year: "2022",
        region: "South America",
        tags: ["Supply Chain", "Packaging", "Ethical Sourcing"],
        keywords: ["retail", "supply", "chain", "packaging", "ethical", "sourcing", "sustainable"],
      },
      {
        id: 5,
        title: "CleanPower Co-op Impact Report",
        description:
          "Details on renewable energy production, community ownership model, and carbon offset achievements.",
        industry: "Energy",
        year: "2021",
        region: "Europe",
        tags: ["Solar", "Community Owned", "Carbon Offset"],
        keywords: ["energy", "renewable", "solar", "community", "carbon", "offset", "cleanpower"],
      },
      {
        id: 6,
        title: "CircularTech Manufacturing ESG Report",
        description:
          "Focus on circular economy principles, waste reduction initiatives, and employee wellbeing programs.",
        industry: "Manufacturing",
        year: "2021",
        region: "Asia Pacific",
        tags: ["Circular Economy", "Zero Waste", "Employee Wellbeing"],
        keywords: ["circular", "economy", "waste", "reduction", "employee", "wellbeing", "manufacturing"],
      },
    ]

    this.filteredReports = [...this.reports]
    this.currentFilters = {
      search: "",
      industry: "All Industries",
      year: "All Years",
      region: "All Regions",
      sort: "Newest First",
    }

    this.init()
  }

  init() {
    // Get filter elements
    this.searchInput = document.getElementById("search")
    this.industrySelect = document.getElementById("industry")
    this.yearSelect = document.getElementById("year")
    this.regionSelect = document.getElementById("region")
    this.sortSelect = document.getElementById("sort")
    this.applyBtn = document.querySelector(".apply-filters-btn")

    // Add event listeners
    this.searchInput?.addEventListener(
      "input",
      Utils.debounce(() => this.handleSearch(), 300),
    )
    this.industrySelect?.addEventListener("change", () => this.handleFilterChange())
    this.yearSelect?.addEventListener("change", () => this.handleFilterChange())
    this.regionSelect?.addEventListener("change", () => this.handleFilterChange())
    this.sortSelect?.addEventListener("change", () => this.handleSort())
    this.applyBtn?.addEventListener("click", () => this.applyFilters())

    // Initial render
    this.renderReports()
  }

  handleSearch() {
    this.currentFilters.search = this.searchInput.value.toLowerCase().trim()
    this.applyFilters()
  }

  handleFilterChange() {
    this.currentFilters.industry = this.industrySelect.value
    this.currentFilters.year = this.yearSelect.value
    this.currentFilters.region = this.regionSelect.value
  }

  handleSort() {
    this.currentFilters.sort = this.sortSelect.value
    this.applyFilters()
  }

  applyFilters() {
    let filtered = [...this.reports]

    // Apply search filter
    if (this.currentFilters.search) {
      filtered = filtered.filter((report) => {
        const searchTerm = this.currentFilters.search
        return (
          report.title.toLowerCase().includes(searchTerm) ||
          report.description.toLowerCase().includes(searchTerm) ||
          report.keywords.some((keyword) => keyword.includes(searchTerm)) ||
          report.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        )
      })
    }

    // Apply industry filter
    if (this.currentFilters.industry !== "All Industries") {
      filtered = filtered.filter((report) => report.industry === this.currentFilters.industry)
    }

    // Apply year filter
    if (this.currentFilters.year !== "All Years") {
      filtered = filtered.filter((report) => report.year === this.currentFilters.year)
    }

    // Apply region filter
    if (this.currentFilters.region !== "All Regions") {
      filtered = filtered.filter((report) => report.region === this.currentFilters.region)
    }

    // Apply sorting
    this.sortReports(filtered)

    this.filteredReports = filtered
    this.renderReports()
    this.updateResultsCount()
  }

  sortReports(reports) {
    switch (this.currentFilters.sort) {
      case "Newest First":
        reports.sort((a, b) => Number.parseInt(b.year) - Number.parseInt(a.year))
        break
      case "Oldest First":
        reports.sort((a, b) => Number.parseInt(a.year) - Number.parseInt(b.year))
        break
      case "A-Z":
        reports.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "Z-A":
        reports.sort((a, b) => b.title.localeCompare(a.title))
        break
    }
  }

  renderReports() {
    const reportsGrid = document.querySelector(".reports-grid")
    if (!reportsGrid) return

    if (this.filteredReports.length === 0) {
      reportsGrid.innerHTML = `
                <div class="no-results">
                    <h3>No reports found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            `
      return
    }

    reportsGrid.innerHTML = this.filteredReports
      .map(
        (report) => `
            <div class="report-card" data-id="${report.id}">
                <div class="report-header">
                    <span class="industry-tag ${report.industry.toLowerCase()}">${report.industry}</span>
                    <span class="year-tag">${report.year}</span>
                </div>
                <h3 class="report-title">${report.title}</h3>
                <p class="report-description">${report.description}</p>
                <div class="report-tags">
                    ${report.tags.map((tag) => `<span class="tag ${this.getTagClass(tag)}">${tag}</span>`).join("")}
                </div>
                <div class="report-footer">
                    <span class="report-region">${report.region}</span>
                    <a href="#" class="download-btn" onclick="reportLibraryFilter.downloadReport(${report.id})">Download PDF ↓</a>
                </div>
            </div>
        `,
      )
      .join("")
  }

  getTagClass(tag) {
    const tagClasses = {
      "Carbon Neutral": "carbon",
      "Social Impact": "social",
      "Renewable Energy": "energy",
      ESG: "esg",
      Governance: "governance",
      Diversity: "diversity",
      Regenerative: "regenerative",
      "Water Conservation": "water",
      "Fair Trade": "trade",
      "Supply Chain": "supply",
      Packaging: "packaging",
      "Ethical Sourcing": "ethical",
      Solar: "solar",
      "Community Owned": "community",
      "Carbon Offset": "offset",
      "Circular Economy": "circular",
      "Zero Waste": "waste",
      "Employee Wellbeing": "employee",
    }
    return tagClasses[tag] || "default"
  }

  updateResultsCount() {
    const count = this.filteredReports.length
    const total = this.reports.length

    // Add results counter if it doesn't exist
    let counter = document.querySelector(".results-counter")
    if (!counter) {
      counter = document.createElement("div")
      counter.className = "results-counter"
      const reportsGrid = document.querySelector(".reports-grid")
      reportsGrid.parentNode.insertBefore(counter, reportsGrid)
    }

    counter.innerHTML = `Showing ${count} of ${total} reports`
  }

  downloadReport(reportId) {
    const report = this.reports.find((r) => r.id === reportId)
    if (report) {
      console.log(`Downloading: ${report.title}`)
      // Simulate download
      alert(`Downloading: ${report.title}\n\nThis would typically start a PDF download.`)
    }
  }

  clearFilters() {
    this.searchInput.value = ""
    this.industrySelect.value = "All Industries"
    this.yearSelect.value = "All Years"
    this.regionSelect.value = "All Regions"
    this.sortSelect.value = "Newest First"

    this.currentFilters = {
      search: "",
      industry: "All Industries",
      year: "All Years",
      region: "All Regions",
      sort: "Newest First",
    }

    this.applyFilters()
  }
}

// Learning Hub Filtering System
class LearningHubFilter {
  constructor() {
    this.resources = [
      {
        id: 1,
        title: "SME Sustainability Reporting Starter Kit",
        description:
          "A comprehensive guide to help small businesses begin their sustainability reporting journey with templates and examples.",
        type: "Toolkit",
        topic: "ESG Reporting",
        date: "May 2023",
        featured: true,
        color: "blue",
      },
      {
        id: 2,
        title: "Carbon Accounting for Small Businesses",
        description:
          "Learn practical approaches to measure, report, and reduce your carbon footprint with expert guidance.",
        type: "Webinar",
        topic: "Carbon Management",
        date: "June 15, 2023",
        featured: true,
        color: "purple",
      },
      {
        id: 3,
        title: "Sustainable Supply Chain Management",
        description:
          "Practical steps to assess, improve, and report on the sustainability of your supply chain operations.",
        type: "Guide",
        topic: "Supply Chain",
        date: "April 2023",
        featured: true,
        color: "green",
      },
      {
        id: 4,
        title: "ESG Reporting Template Pack",
        description: "Ready-to-use templates for creating comprehensive ESG reports.",
        type: "Template",
        topic: "ESG Reporting",
        date: "March 2023",
        featured: false,
      },
      {
        id: 5,
        title: "Water Conservation Best Practices",
        description: "Guidelines for implementing water-saving initiatives in your business.",
        type: "Guide",
        topic: "Environmental",
        date: "February 2023",
        featured: false,
      },
      {
        id: 6,
        title: "Social Impact Measurement Toolkit",
        description: "Tools and frameworks for measuring and reporting social impact.",
        type: "Toolkit",
        topic: "Social Impact",
        date: "January 2023",
        featured: false,
      },
    ]

    this.webinars = [
      {
        id: 1,
        title: "Carbon Accounting for Small Businesses",
        date: "June 15, 2023",
        time: "10:00 AM GMT",
        presenter: "Dr. Sarah Johnson",
        institute: "Climate Solutions Institute",
        topic: "Carbon Management",
        registered: false,
      },
      {
        id: 2,
        title: "ESG Reporting for SMEs: Simplified Approaches",
        date: "June 22, 2023",
        time: "2:00 PM GMT",
        presenter: "Michael Chen",
        institute: "Sustainable Business Alliance",
        topic: "Reporting",
        registered: false,
      },
      {
        id: 3,
        title: "Building a Sustainable Supply Chain",
        date: "July 5, 2023",
        time: "11:00 AM GMT",
        presenter: "Dr. Amara Patel",
        institute: "Global Supply Network",
        topic: "Supply Chain",
        registered: false,
      },
      {
        id: 4,
        title: "Diversity & Inclusion in Sustainability Reporting",
        date: "July 18, 2023",
        time: "3:00 PM GMT",
        presenter: "Elena Rodriguez",
        institute: "Inclusive Futures Institute",
        topic: "Social Impact",
        registered: false,
      },
    ]

    this.filteredResources = [...this.resources]
    this.currentFilters = {
      resourceType: "All Resources",
      topic: "All Topics",
    }

    this.init()
  }

  init() {
    this.resourceTypeSelect = document.getElementById("resource-type")
    this.topicSelect = document.getElementById("topic")
    this.filterBtn = document.querySelector(".filter-resources-btn")

    this.resourceTypeSelect?.addEventListener("change", () => this.handleFilterChange())
    this.topicSelect?.addEventListener("change", () => this.handleFilterChange())
    this.filterBtn?.addEventListener("click", () => this.applyFilters())

    this.renderFeaturedResources()
    this.renderWebinars()
  }

  handleFilterChange() {
    this.currentFilters.resourceType = this.resourceTypeSelect.value
    this.currentFilters.topic = this.topicSelect.value
  }

  applyFilters() {
    let filtered = [...this.resources]

    if (this.currentFilters.resourceType !== "All Resources") {
      filtered = filtered.filter((resource) => resource.type === this.currentFilters.resourceType)
    }

    if (this.currentFilters.topic !== "All Topics") {
      filtered = filtered.filter((resource) => resource.topic === this.currentFilters.topic)
    }

    this.filteredResources = filtered
    this.renderFilteredResults()
  }

  renderFeaturedResources() {
    const featuredGrid = document.querySelector(".featured-grid")
    if (!featuredGrid) return

    const featuredResources = this.resources.filter((resource) => resource.featured)

    featuredGrid.innerHTML = featuredResources
      .map(
        (resource) => `
            <div class="featured-card ${resource.color}">
                <div class="featured-icon">
                    ${this.getResourceIcon(resource.type)}
                </div>
                <div class="featured-content">
                    <span class="featured-type">${resource.type}</span>
                    <span class="featured-date">Updated: ${resource.date}</span>
                    <h4 class="featured-resource-title">${resource.title}</h4>
                    <p class="featured-description">${resource.description}</p>
                    <a href="#" class="featured-link" onclick="learningHubFilter.accessResource(${resource.id})">
                        ${resource.type === "Webinar" ? "Register Now" : "Download " + resource.type} →
                    </a>
                </div>
            </div>
        `,
      )
      .join("")
  }

  renderWebinars() {
    const webinarsTable = document.querySelector(".webinars-table")
    if (!webinarsTable) return

    const tableRows = this.webinars
      .map(
        (webinar) => `
            <div class="table-row">
                <div class="table-col">
                    <div class="date-time">${webinar.date}<br><span class="time">${webinar.time}</span></div>
                </div>
                <div class="table-col">${webinar.title}</div>
                <div class="table-col">
                    <div class="presenter">${webinar.presenter}<br><span class="institute">${webinar.institute}</span></div>
                </div>
                <div class="table-col"><span class="topic-tag ${webinar.topic.toLowerCase().replace(" ", "")}">${webinar.topic}</span></div>
                <div class="table-col">
                    <a href="#" class="register-link ${webinar.registered ? "registered" : ""}" 
                       onclick="learningHubFilter.registerWebinar(${webinar.id})">
                        ${webinar.registered ? "Registered" : "Register"}
                    </a>
                </div>
            </div>
        `,
      )
      .join("")

    // Keep the existing header and add the rows
    const existingHeader = webinarsTable.querySelector(".table-header")
    webinarsTable.innerHTML = existingHeader.outerHTML + tableRows
  }

  renderFilteredResults() {
    // Create or update filtered results section
    let resultsSection = document.querySelector(".filtered-results")
    if (!resultsSection) {
      resultsSection = document.createElement("div")
      resultsSection.className = "filtered-results"
      const featuredSection = document.querySelector(".featured-resources")
      featuredSection.parentNode.insertBefore(resultsSection, featuredSection.nextSibling)
    }

    if (this.filteredResources.length === 0) {
      resultsSection.innerHTML = `
                <div class="no-results">
                    <h3>No resources found</h3>
                    <p>Try adjusting your filters.</p>
                    <button onclick="learningHubFilter.clearFilters()" class="clear-filters-btn">Clear Filters</button>
                </div>
            `
      return
    }

    resultsSection.innerHTML = `
            <h3 class="filtered-title">Filtered Results (${this.filteredResources.length})</h3>
            <div class="filtered-grid">
                ${this.filteredResources
                  .map(
                    (resource) => `
                    <div class="resource-result-card">
                        <div class="resource-type-badge ${resource.type.toLowerCase()}">${resource.type}</div>
                        <h4 class="resource-result-title">${resource.title}</h4>
                        <p class="resource-result-description">${resource.description}</p>
                        <div class="resource-result-meta">
                            <span class="resource-topic">${resource.topic}</span>
                            <span class="resource-date">${resource.date}</span>
                        </div>
                        <a href="#" class="resource-result-link" onclick="learningHubFilter.accessResource(${resource.id})">
                            ${resource.type === "Webinar" ? "Register" : "Download"} →
                        </a>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        `
  }

  getResourceIcon(type) {
    const icons = {
      Toolkit: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
      Webinar: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
      Guide: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
    }
    return icons[type] || icons["Guide"]
  }

  accessResource(resourceId) {
    const resource = this.resources.find((r) => r.id === resourceId)
    if (resource) {
      console.log(`Accessing: ${resource.title}`)
      if (resource.type === "Webinar") {
        alert(`Registering for webinar: ${resource.title}\n\nThis would typically open a registration form.`)
      } else {
        alert(`Downloading: ${resource.title}\n\nThis would typically start a download.`)
      }
    }
  }

  registerWebinar(webinarId) {
    const webinar = this.webinars.find((w) => w.id === webinarId)
    if (webinar && !webinar.registered) {
      webinar.registered = true
      this.renderWebinars()
      alert(`Successfully registered for: ${webinar.title}\n\nYou will receive a confirmation email shortly.`)
    } else if (webinar.registered) {
      alert(`You are already registered for: ${webinar.title}`)
    }
  }

  clearFilters() {
    this.resourceTypeSelect.value = "All Resources"
    this.topicSelect.value = "All Topics"
    this.currentFilters = {
      resourceType: "All Resources",
      topic: "All Topics",
    }

    const resultsSection = document.querySelector(".filtered-results")
    if (resultsSection) {
      resultsSection.remove()
    }
  }
}

// Global search functionality
class GlobalSearch {
  constructor() {
    this.searchInput = document.querySelector(".search-input")
    this.searchBtn = document.querySelector(".search-btn")
    this.init()
  }

  init() {
    this.searchBtn?.addEventListener("click", () => this.performGlobalSearch())
    this.searchInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.performGlobalSearch()
      }
    })
  }

  performGlobalSearch() {
    const query = this.searchInput.value.trim()
    if (!query) return

    console.log("Global search for:", query)

    // Simulate global search across all sections
    const results = this.searchAllSections(query)
    this.displayGlobalResults(results, query)
  }

  searchAllSections(query) {
    const results = {
      reports: [],
      resources: [],
      webinars: [],
    }

    // Search reports
    if (window.reportLibraryFilter) {
      results.reports = reportLibraryFilter.reports.filter(
        (report) =>
          report.title.toLowerCase().includes(query.toLowerCase()) ||
          report.description.toLowerCase().includes(query.toLowerCase()) ||
          report.keywords.some((keyword) => keyword.includes(query.toLowerCase())),
      )
    }

    // Search learning resources
    if (window.learningHubFilter) {
      results.resources = learningHubFilter.resources.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query.toLowerCase()) ||
          resource.description.toLowerCase().includes(query.toLowerCase()) ||
          resource.topic.toLowerCase().includes(query.toLowerCase()),
      )

      results.webinars = learningHubFilter.webinars.filter(
        (webinar) =>
          webinar.title.toLowerCase().includes(query.toLowerCase()) ||
          webinar.presenter.toLowerCase().includes(query.toLowerCase()) ||
          webinar.topic.toLowerCase().includes(query.toLowerCase()),
      )
    }

    return results
  }

  displayGlobalResults(results, query) {
    const totalResults = results.reports.length + results.resources.length + results.webinars.length

    let message = `Global search results for "${query}":\n\n`
    message += `Found ${totalResults} total results:\n`
    message += `• ${results.reports.length} reports\n`
    message += `• ${results.resources.length} learning resources\n`
    message += `• ${results.webinars.length} webinars\n\n`

    if (totalResults > 0) {
      message += "This would typically display results in a dedicated search page or modal."
    } else {
      message += "No results found. Try different keywords."
    }

    alert(message)
  }
}

// Initialize all filter systems when DOM is loaded
/*document.addEventListener("DOMContentLoaded", () => {
  // Initialize existing components
  new Navigation()
  new SmoothScroll()
  new NewsSlider()
  new ScrollEffects()
  new SearchHandler()

  // Initialize new filtering systems
  window.reportLibraryFilter = new ReportLibraryFilter()
  window.learningHubFilter = new LearningHubFilter()
  window.globalSearch = new GlobalSearch()

  // Add CSS transition for news content
  const newsContent = document.querySelector(".news-content")
  if (newsContent) {
    newsContent.style.transition = "opacity 0.3s ease, transform 0.3s ease"
  }
})

// Utility Functions
const Utils = {
  // Debounce function for performance optimization
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },
}

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Navigation,
    SmoothScroll,
    NewsSlider,
    ScrollEffects,
    SearchHandler,
    Utils,
    ReportLibraryFilter,
    LearningHubFilter,
    GlobalSearch,
  }
}*/
