// Bootstrap-based JavaScript with all functionality - Fixed Version

// import bootstrap from "bootstrap";

class BootstrapNavigation {
  constructor() {
    this.navbar = document.querySelector(".custom-navbar");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.navbarCollapse = document.querySelector(".navbar-collapse");
    this.init();
  }

  init() {
    // Handle scroll effects
    window.addEventListener("scroll", () => this.handleScroll());

    // Handle smooth scrolling for anchor links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleSmoothScroll(e));
    });

    // Handle active link updates
    window.addEventListener("scroll", () => this.updateActiveLink());

    // Close mobile menu when clicking on nav links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (
          this.navbarCollapse &&
          this.navbarCollapse.classList.contains("show")
        ) {
          const bsCollapse = new bootstrap.Collapse(this.navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      });
    });
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

// Enhanced News Slider with Images - FIXED
class NewsSliderWithImages {
  constructor() {
    this.currentSlide = 0;
    this.slides = [
      {
        title:
          "India can plug its green skills gap by elevating women in the workforce ",
        description:
          "The government and business can do much more to improve training in sectors such as renewables to include more women and help meet climate goals",
        tag: "NEWS",
        image: "assets/images/slider1.png",
        readMore:
          "https://www.climatechangenews.com/2025/02/04/india-can-plug-its-green-skills-gap-by-elevating-women-in-the-workforce/",
      },
      {
        title: "L&T lists India’s first ESG bonds worth ₹500 crore on NSE",
        description:
          "This issuance falls under the Securities and Exchange Board of India’s newlyintroduced ESG and sustainability-linked bond framework.",
        tag: "NEWS",
        image: "assets/images/slider2.cms",
        readMore:
          "https://infra.economictimes.indiatimes.com/news/urban-infrastructure/lt-launches-indias-first-esg-bonds-worth-500-crore-on-nse/122029320",
      },
      {
        title:
          "India calls for 'energy transition', sees role of fossil fuels in near term",
        description:
          "For too long, energy transition has to be framed as a linear journey - from fossil fuels to renewables, from past to future, from problem to solution, Minister Hardeep Singh Puri said",
        tag: "NEWS",
        image: "assets/images/slider3.avif",
        readMore:
          "https://www.business-standard.com/industry/news/india-calls-for-energy-transition-sees-role-of-fossil-fuels-in-near-term-125021100885_1.html",
      },
      {
        title: "ESG credibility under scrutiny after Gensol, BluSmart crisis",
        description:
          "Financial malpractices in companies championing green and sustainable business practices raise concerns about environmental, social and government initiatives.",
        tag: "NEWS",
        image: "assets/images/slider4.png",
        readMore:
          "https://www.forbesindia.com/article/news/esg-credibility-under-scrutiny-after-gensol-blusmart-crisis/95931/1",
      },
      // {
      //   title: "Q3 Impact Report Published",
      //   description:
      //     "See how our platform has helped thousands of businesses improve their sustainability reporting.",
      //   tag: "REPORT",
      //   image: "/placeholder.svg?height=150&width=150&text=Q3+Report",
      // },
    ];

    this.init();
  }

  init() {
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.dots = document.querySelectorAll(".dot");
    this.newsTitle = document.querySelector(".news-title");
    this.newsDescription = document.querySelector(".news-description");
    this.newsTag = document.querySelector(".news-tag");
    this.slideImage = document.getElementById("slideImage");
    this.newsLink = document.querySelector(".news-link");

    console.log("News slider elements found:", {
      prevBtn: !!this.prevBtn,
      nextBtn: !!this.nextBtn,
      newsTitle: !!this.newsTitle,
      slideImage: !!this.slideImage,
    });

    if (!this.prevBtn || !this.nextBtn || !this.newsTitle) {
      console.log("News slider elements not found, skipping initialization");
      return;
    }

    this.prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.previousSlide();
    });

    this.nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.nextSlide();
    });

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        this.goToSlide(index);
      });
    });

    // Initial slide setup
    this.updateSlide();

    // Auto-play slider
    this.startAutoPlay();

    // Pause auto-play on hover
    const sliderContainer = document.querySelector(".slider-container");
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", () => this.stopAutoPlay());
      sliderContainer.addEventListener("mouseleave", () =>
        this.startAutoPlay()
      );
    }
  }

  updateSlide() {
    const currentSlideData = this.slides[this.currentSlide];
    console.log("Updating slide to:", currentSlideData.title);

    // Update content
    if (this.newsTitle) this.newsTitle.textContent = currentSlideData.title;
    if (this.newsDescription)
      this.newsDescription.textContent = currentSlideData.description;
    if (this.newsTag) this.newsTag.textContent = currentSlideData.tag;
    if (this.slideImage) {
      this.slideImage.src = currentSlideData.image;
      this.slideImage.alt = currentSlideData.title;
    }
    if (this.newsLink) this.newsLink.href = currentSlideData.readMore;

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

// Enhanced Report Library with Working Pagination - FIXED
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

    console.log("Report library elements found:", {
      searchInput: !!this.searchInput,
      industrySelect: !!this.industrySelect,
      applyBtn: !!this.applyBtn,
    });

    if (!this.searchInput) {
      console.log("Report library elements not found, skipping initialization");
      return;
    }

    // Add event listeners
    this.searchInput.addEventListener(
      "input",
      this.debounce(() => this.handleSearch(), 300)
    );

    if (this.industrySelect)
      this.industrySelect.addEventListener("change", () =>
        this.handleFilterChange()
      );
    if (this.yearSelect)
      this.yearSelect.addEventListener("change", () =>
        this.handleFilterChange()
      );
    if (this.regionSelect)
      this.regionSelect.addEventListener("change", () =>
        this.handleFilterChange()
      );
    if (this.sortSelect)
      this.sortSelect.addEventListener("change", () => this.handleSort());
    if (this.applyBtn)
      this.applyBtn.addEventListener("click", () => this.applyFilters());

    // Initial render
    this.applyFilters();
  }

  handleSearch() {
    this.currentFilters.search = this.searchInput.value.toLowerCase().trim();
    this.applyFilters();
  }

  handleFilterChange() {
    this.currentFilters.industry = this.industrySelect
      ? this.industrySelect.value
      : "All Industries";
    this.currentFilters.year = this.yearSelect
      ? this.yearSelect.value
      : "All Years";
    this.currentFilters.region = this.regionSelect
      ? this.regionSelect.value
      : "All Regions";
  }

  handleSort() {
    this.currentFilters.sort = this.sortSelect
      ? this.sortSelect.value
      : "Newest First";
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
    this.currentPage = 1;
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
    if (!reportsGrid) {
      console.log("Reports grid not found");
      return;
    }

    console.log("Rendering reports:", this.filteredReports.length);

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
        <a class="page-link" href="#" onclick="event.preventDefault(); reportLibrary.goToPage(${
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
      paginationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="event.preventDefault(); reportLibrary.goToPage(1)">1</a></li>`;
      if (startPage > 2) {
        paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
        <li class="page-item ${i === this.currentPage ? "active" : ""}">
          <a class="page-link" href="#" onclick="event.preventDefault(); reportLibrary.goToPage(${i})">${i}</a>
        </li>
      `;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
      paginationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="event.preventDefault(); reportLibrary.goToPage(${totalPages})">${totalPages}</a></li>`;
    }

    // Next button
    paginationHTML += `
      <li class="page-item ${
        this.currentPage === totalPages ? "disabled" : ""
      }">
        <a class="page-link" href="#" onclick="event.preventDefault(); reportLibrary.goToPage(${
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

    // Scroll to reports section smoothly
    const reportsSection = document.getElementById("report-library");
    if (reportsSection) {
      const offsetTop = reportsSection.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
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
      this.showToast(`Downloading: ${report.title}`, "success");
    }
  }

  clearFilters() {
    if (this.searchInput) this.searchInput.value = "";
    if (this.industrySelect) this.industrySelect.value = "All Industries";
    if (this.yearSelect) this.yearSelect.value = "All Years";
    if (this.regionSelect) this.regionSelect.value = "All Regions";
    if (this.sortSelect) this.sortSelect.value = "Newest First";

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

// Learning Hub Filter - FIXED
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

    this.resources = [
      {
        id: 1,
        title: "SME Sustainability Reporting Starter Kit",
        description:
          "A comprehensive guide to help small businesses begin their sustainability reporting journey.",
        type: "Toolkits",
        topic: "ESG Reporting",
        date: "May 2023",
      },
      {
        id: 2,
        title: "Carbon Footprint Calculator",
        description:
          "Easy-to-use tool for measuring your business carbon footprint.",
        type: "Toolkits",
        topic: "Carbon Management",
        date: "April 2023",
      },
      {
        id: 3,
        title: "Supply Chain Assessment Guide",
        description:
          "Step-by-step guide to evaluate sustainability in your supply chain.",
        type: "Guides",
        topic: "Supply Chain",
        date: "March 2023",
      },
      {
        id: 4,
        title: "Social Impact Measurement Framework",
        description:
          "Framework for measuring and reporting social impact initiatives.",
        type: "Templates",
        topic: "Social Impact",
        date: "February 2023",
      },
      {
        id: 5,
        title: "Water Conservation Best Practices",
        description:
          "Guidelines for implementing water-saving initiatives in your business.",
        type: "Guides",
        topic: "Environmental",
        date: "January 2023",
      },
      {
        id: 6,
        title: "Renewable Energy Transition Guide",
        description:
          "Complete guide for transitioning to renewable energy sources.",
        type: "Guides",
        topic: "Energy",
        date: "December 2022",
      },
    ];

    this.filteredResources = [...this.resources];
    this.currentFilters = {
      resourceType: "All Resources",
      topic: "All Topics",
    };

    this.init();
  }

  init() {
    this.resourceTypeSelect = document.getElementById("resource-type");
    this.topicSelect = document.getElementById("topic");
    this.filterBtn = document.querySelector(".filter-resources-btn");

    console.log("Learning hub elements found:", {
      resourceTypeSelect: !!this.resourceTypeSelect,
      topicSelect: !!this.topicSelect,
      filterBtn: !!this.filterBtn,
    });

    if (this.resourceTypeSelect) {
      this.resourceTypeSelect.addEventListener("change", () =>
        this.handleFilterChange()
      );
    }
    if (this.topicSelect) {
      this.topicSelect.addEventListener("change", () =>
        this.handleFilterChange()
      );
    }
    if (this.filterBtn) {
      this.filterBtn.addEventListener("click", () => this.applyFilters());
    }

    this.renderWebinars();
  }

  handleFilterChange() {
    this.currentFilters.resourceType = this.resourceTypeSelect
      ? this.resourceTypeSelect.value
      : "All Resources";
    this.currentFilters.topic = this.topicSelect
      ? this.topicSelect.value
      : "All Topics";
    console.log("Filter changed:", this.currentFilters);
  }

  applyFilters() {
    console.log("Applying filters:", this.currentFilters);
    let filtered = [...this.resources];

    if (this.currentFilters.resourceType !== "All Resources") {
      filtered = filtered.filter(
        (resource) => resource.type === this.currentFilters.resourceType
      );
    }

    if (this.currentFilters.topic !== "All Topics") {
      filtered = filtered.filter(
        (resource) => resource.topic === this.currentFilters.topic
      );
    }

    this.filteredResources = filtered;
    console.log("Filtered resources:", this.filteredResources.length);
    this.renderFilteredResults();
  }

  renderFilteredResults() {
    let resultsSection = document.querySelector(".filtered-results");
    if (!resultsSection) {
      resultsSection = document.createElement("div");
      resultsSection.className = "filtered-results mt-5";
      const featuredSection = document.querySelector(".featured-resources");
      if (featuredSection && featuredSection.parentNode) {
        featuredSection.parentNode.insertBefore(
          resultsSection,
          featuredSection.nextSibling
        );
      }
    }

    if (this.filteredResources.length === 0) {
      resultsSection.innerHTML = `
        <div class="card border-0 shadow-sm">
          <div class="card-body text-center py-5">
            <h3 class="h4 mb-3">No resources found</h3>
            <p class="text-muted mb-4">Try adjusting your filters.</p>
            <button onclick="learningHub.clearFilters()" class="btn btn-primary">Clear Filters</button>
          </div>
        </div>
      `;
      return;
    }

    resultsSection.innerHTML = `
      <h3 class="section-title">Filtered Results (${
        this.filteredResources.length
      })</h3>
      <div class="row g-4">
        ${this.filteredResources
          .map(
            (resource) => `
            <div class="col-lg-4 col-md-6">
              <div class="card h-100 border-0 shadow-sm">
                <div class="card-body p-4">
                  <span class="badge bg-primary mb-3">${resource.type}</span>
                  <h4 class="card-title h6 fw-bold mb-3">${resource.title}</h4>
                  <p class="card-text text-muted small mb-3">${resource.description}</p>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <small class="text-primary fw-medium">${resource.topic}</small>
                    <small class="text-muted">${resource.date}</small>
                  </div>
                  <a href="#" class="text-primary fw-semibold text-decoration-none" onclick="learningHub.accessResource(${resource.id})">
                    Download <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    `;
  }

  renderWebinars() {
    const tableBody = document.getElementById("webinarsTableBody");
    if (!tableBody) {
      console.log("Webinars table body not found");
      return;
    }

    console.log("Rendering webinars:", this.webinars.length);

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

  accessResource(resourceId) {
    const resource = this.resources.find((r) => r.id === resourceId);
    if (resource) {
      console.log(`Accessing: ${resource.title}`);
      this.showToast(`Accessing: ${resource.title}`, "info");
    }
  }

  registerWebinar(webinarId) {
    const webinar = this.webinars.find((w) => w.id === webinarId);
    if (webinar && !webinar.registered) {
      webinar.registered = true;
      this.renderWebinars();
      this.showToast(
        `Successfully registered for: ${webinar.title}`,
        "success"
      );
    } else if (webinar && webinar.registered) {
      this.showToast(
        `You are already registered for: ${webinar.title}`,
        "info"
      );
    }
  }

  clearFilters() {
    if (this.resourceTypeSelect)
      this.resourceTypeSelect.value = "All Resources";
    if (this.topicSelect) this.topicSelect.value = "All Topics";

    this.currentFilters = {
      resourceType: "All Resources",
      topic: "All Topics",
    };

    const resultsSection = document.querySelector(".filtered-results");
    if (resultsSection) {
      resultsSection.remove();
    }
  }

  showToast(message, type = "info") {
    const toastHTML = `
      <div class="toast align-items-center text-white bg-${
        type === "success" ? "success" : type === "info" ? "info" : "primary"
      } border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body">${message}</div>
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

    toastContainer.insertAdjacentHTML("beforeend", toastHTML);
    const toastElement = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    toastElement.addEventListener("hidden.bs.toast", () => {
      toastElement.remove();
    });
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
    if (this.searchBtn) {
      this.searchBtn.addEventListener("click", () => this.performSearch());
    }
    if (this.searchInput) {
      this.searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.performSearch();
        }
      });
    }
  }

  performSearch() {
    const query = this.searchInput ? this.searchInput.value.trim() : "";
    if (!query) return;

    console.log("Global search for:", query);
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

    const existingModal = document.getElementById("searchModal");
    if (existingModal) {
      existingModal.remove();
    }

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modal = new bootstrap.Modal(document.getElementById("searchModal"));
    modal.show();
  }
}

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing components...");

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

  console.log("All components initialized");

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
