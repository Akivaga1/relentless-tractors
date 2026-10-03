/**
 * RELENTLESS TRACTORS — OFFICIAL CLIENT ENGINE
 * Handles Catalogue Filtering, Search, Product Modals,
 * Quotation Submissions, WhatsApp Integration, Gallery Lightbox,
 * and Mobile Interactions.
 */

// 1. VERIFIED INVENTORY DATABASE
const INVENTORY_DATA = [
  {
    id: "zoomlion-rc904a",
    name: "Zoomlion RC904-A 90HP 4WD",
    shortName: "Zoomlion RC904-A",
    category: "tractors",
    categoryLabel: "Agricultural Tractor",
    brand: "Zoomlion",
    model: "RC904-A",
    year: "2026",
    condition: "new",
    conditionLabel: "Brand New",
    availability: "in-showroom",
    availabilityLabel: "In Showroom (Chemelil Yard)",
    priceText: "Price on Enquiry",
    hp: 90,
    hpCategory: "75-100",
    image: "assets/tractor-zoomlion-rc904a.jpg",
    images: [
      "assets/tractor-zoomlion-rc904a.jpg",
      "assets/showroom-chemilil-tractors.jpg",
      "assets/hero-tractor.jpg"
    ],
    brief: "Proven 90HP 4WD workhorse engineered for heavy tillage, disc plowing, and sugarcane transport across Kenyan soils.",
    description: "The Zoomlion RC904-A is Kenya's premier heavy utility tractor, blending high mechanical reliability with exceptional fuel economy. Equipped with a direct-injection 4-cylinder turbocharged diesel engine and a 12F+12R synchromesh transmission, it delivers formidable drawbar pull for 3-furrow and 4-furrow disc ploughs. Its high ground clearance and dual-acting steering cylinder excel in rough sugarcane furrowing and Rift Valley arable soils.",
    specs: {
      "Rated Engine Power": "90 HP @ 2,300 RPM",
      "Engine Configuration": "4-Cylinder Turbocharged Direct Injection Diesel",
      "Drivetrain": "Selective 4WD (4x4) with Mechanical Differential Lock",
      "Transmission": "12 Forward + 12 Reverse Synchromesh Shuttle Shift",
      "PTO Speed": "Dual Speed 540 / 1000 RPM (6-Spline)",
      "Hydraulic Lifting Capacity": "2,800 kg at 610mm behind hitch point",
      "Remote Hydraulic Valves": "2-Pair (4 Outlets) Quick Couplers",
      "Fuel Tank Capacity": "150 Liters (Full-Day Field Endurance)",
      "Operating Weight": "3,950 kg (with front ballast weights)",
      "Warranty Backup": "1-Year / 1,000 Hours Comprehensive Dealership Warranty"
    },
    idealFor: "Maize & wheat plowing, sugarcane haulage, 3-4 furrow disc plowing, heavy subsoiling, institutional contracting."
  },
  {
    id: "zoomlion-130hp",
    name: "Zoomlion 130HP Heavy Commercial 4WD",
    shortName: "Zoomlion 130HP Cabin",
    category: "tractors",
    categoryLabel: "Heavy Commercial Tractor",
    brand: "Zoomlion",
    model: "130HP Cabin",
    year: "2026",
    condition: "new",
    conditionLabel: "Brand New",
    availability: "in-showroom",
    availabilityLabel: "In Showroom (Chemelil Yard)",
    priceText: "Price on Enquiry",
    hp: 130,
    hpCategory: "100-plus",
    image: "assets/tractor-zoomlion-130hp.jpg",
    images: [
      "assets/tractor-zoomlion-130hp.jpg",
      "assets/showroom-chemilil-tractors.jpg"
    ],
    brief: "High-horsepower 6-cylinder diesel tractor with air-conditioned luxury cab for large estates, sugarcane haulage, and commercial contracting.",
    description: "Built for demanding continuous operations, the Zoomlion 130HP Heavy Duty tractor is outfitted with an enclosed, pressurized, climate-controlled safety cab that protects operators from tropical dust, rain, and heat. Powered by a high-torque 6-cylinder intercooled turbo engine, this flagship tractor effortlessly pulls 5-furrow disc ploughs, 12-ton haulage trailers, and wide-span seedbed cultivators.",
    specs: {
      "Rated Engine Power": "130 HP @ 2,200 RPM",
      "Engine Configuration": "6-Cylinder Intercooled Turbocharged Diesel",
      "Cabin": "Pressurized ROPS/FOPS Sealed Cab with AC & Dust Filtration",
      "Drivetrain": "Heavy 4WD with Heavy Planetary Reduction Final Drives",
      "Transmission": "16 Forward + 8 Reverse Creeper & Transport Gears",
      "PTO Speed": "540 / 1000 RPM Independent Power Take-Off",
      "Hydraulic Lift Capacity": "4,200 kg Heavy Cat II/III Three-Point Linkage",
      "Remote Hydraulic Valves": "3-Pair (6 Outlets) High-Flow Ports",
      "Fuel Tank Capacity": "240 Liters",
      "Operating Weight": "5,600 kg",
      "Warranty Backup": "1-Year / 1,200 Hours Relentless Dealership Warranty"
    },
    idealFor: "Commercial sugarcane estates, 5-furrow heavy plowing, grain harvesting support, 12-15 ton trailer haulage, large farm operations."
  },
  {
    id: "disc-plough-3furrow",
    name: "Heavy-Duty 3-Furrow Disc Plough (DP-300)",
    shortName: "3-Furrow Disc Plough",
    category: "implements",
    categoryLabel: "Tillage Implement",
    brand: "Agri-Pro",
    model: "DP-300 Heavy",
    year: "2026",
    condition: "new",
    conditionLabel: "Brand New",
    availability: "in-stock",
    availabilityLabel: "In Stock (Ready to Dispatch)",
    priceText: "Price on Enquiry",
    hp: 80,
    hpCategory: "75-100",
    image: "assets/implement-disc-plough.jpg",
    images: [
      "assets/implement-disc-plough.jpg"
    ],
    brief: "Robust boron steel disc plough engineered for hardpan soils, stony terrain, and unplowed African virgin soils.",
    description: "The DP-300 Heavy-Duty 3-Furrow Disc Plough is engineered to operate in the toughest clay and rocky conditions without stone damage or disc shattering. Each 26-inch boron alloy disc rotates independently with adjustable scraper blades to prevent mud clogging in wet black cotton soil.",
    specs: {
      "Tractor Power Required": "70 - 95 HP (Cat II 3-Point Hitch)",
      "Number of Furrows": "3 Reversible Dished Discs",
      "Disc Diameter & Thickness": "26 Inches (660 mm) x 6 mm Boron Steel",
      "Working Width": "900 - 1,050 mm (Adjustable Cut Width)",
      "Maximum Plowing Depth": "Up to 300 mm (12 inches)",
      "Main Frame": "120 x 100 mm Heavy Seamless Rectangular Hollow Steel",
      "Furrow Wheel": "Spring-loaded rear depth guide wheel included",
      "Total Weight": "430 kg"
    },
    idealFor: "Primary tillage, virgin land preparation, hard clay breaking, maize and wheat crop establishment."
  },
  {
    id: "rotary-tiller-rt210",
    name: "Commercial Rotary Tiller / Rotavator (RT-210)",
    shortName: "Rotary Tiller RT-210",
    category: "implements",
    categoryLabel: "Seedbed Preparation",
    brand: "Agri-Pro",
    model: "RT-210",
    year: "2026",
    condition: "new",
    conditionLabel: "Brand New",
    availability: "in-stock",
    availabilityLabel: "In Stock (Ready to Dispatch)",
    priceText: "Price on Enquiry",
    hp: 85,
    hpCategory: "75-100",
    image: "assets/implement-rotary-tiller.jpg",
    images: [
      "assets/implement-rotary-tiller.jpg"
    ],
    brief: "2.1-meter heavy-duty gear-driven rotavator that produces a fine, weed-free seedbed in a single pass.",
    description: "The RT-210 Rotary Tiller transforms clod-heavy plowed land into uniform, aerated planting beds in one single pass. Built with a heavy oil-bath side gear drive (eliminating belt slippage), 54 heat-treated L-blades, and an adjustable spring-loaded rear leveler board.",
    specs: {
      "Tractor Power Required": "75 - 110 HP",
      "Working Width": "2,100 mm (2.1 meters)",
      "Number of Blades": "54 Curved Boron Alloy Forged Tines",
      "Transmission Drive": "Heavy Side Gear Drive in Constant Oil Bath",
      "PTO Drive Shaft": "Heavy-duty with friction slip clutch safety protection",
      "Working Depth": "120 mm - 200 mm",
      "Total Weight": "520 kg"
    },
    idealFor: "Horticulture, sugarcane re-planting seedbeds, rice paddy puddling, weed eradication, soil incorporation."
  },
  {
    id: "tipping-trailer-12t",
    name: "12-Ton Tandem Axle Hydraulic Tipping Trailer",
    shortName: "12-Ton Tipping Trailer",
    category: "trailers",
    categoryLabel: "Haulage & Transport",
    brand: "Agri-Trail HD",
    model: "HD-12T",
    year: "2026",
    condition: "new",
    conditionLabel: "Brand New",
    availability: "in-showroom",
    availabilityLabel: "In Showroom & Made to Order",
    priceText: "Price on Enquiry",
    hp: 90,
    hpCategory: "75-100",
    image: "assets/implement-tipping-trailer.jpg",
    images: [
      "assets/implement-tipping-trailer.jpg"
    ],
    brief: "Heavy-gauge steel tipping trailer with twin oscillating axles and dual-ram hydraulics for sugarcane, silage, and grain transport.",
    description: "Designed specifically for Kenyan plantation tracks and estate transport. The HD-12T features 4.5mm ribbed steel flooring, high-clearance tandem bogie walking-beam axles, and multi-stage hydraulic telescopic rams that tilt up to 50 degrees for clean, effortless unloading.",
    specs: {
      "Payload Capacity": "12 Metric Tons",
      "Tipping System": "Twin Multi-Stage Telescopic Hydraulic Rams",
      "Axle System": "Heavy Tandem Walking-Beam Bogie Axles",
      "Sides & Tailgate": "Removable Ribbed Steel Drop-Sides with Auto-Release Gate",
      "Tires": "4x Low-Ground-Pressure Agricultural Flotation Tires",
      "Hitch Coupling": "Heavy Forged Swivel Eye Hitch with Safety Chains",
      "Floor Material": "4.5mm Heavy Reinforcement Steel Plate"
    },
    idealFor: "Sugarcane field-to-weighbridge transport, bulk grain harvest, manure spreading, farm silage haulage."
  },
  {
    id: "genuine-spares-pack",
    name: "OEM Genuine Spare Parts & Filtration Packs",
    shortName: "OEM Genuine Spare Parts",
    category: "spares",
    categoryLabel: "Genuine Spare Parts",
    brand: "Zoomlion & OEM Universal",
    model: "Filtration & Service Kits",
    year: "2026",
    condition: "new",
    conditionLabel: "100% Genuine OEM",
    availability: "in-stock",
    availabilityLabel: "In Stock (Chemelil Spares Depot)",
    priceText: "Price by Part Number",
    hp: 0,
    hpCategory: "all",
    image: "assets/spares-genuine-parts.jpg",
    images: [
      "assets/spares-genuine-parts.jpg"
    ],
    brief: "Complete stocks of genuine fuel filters, hydraulic filters, clutches, belts, and engine overhaul components.",
    description: "Prevent costly downtime during peak planting and harvesting seasons. Relentless Tractors maintains an extensive inventory of genuine manufacturer-approved filters, water traps, hydraulic pump valves, clutch discs, pressure plates, injector nozzles, and high-temp fan belts.",
    specs: {
      "Filtration Components": "Primary/Secondary Fuel, Engine Oil, Hydraulic Return Filters",
      "Transmission & Drive": "Heavy Organic & Ceramic Clutch Discs, Pressure Plates",
      "Electrical & Hydraulics": "Heavy Duty Alternators, Starter Motors, Remote Control Valves",
      "Gaskets & Seals": "Cylinder Head Gaskets, O-Ring Kits, Hub Oil Seals",
      "Dispatch Speed": "Same-day courier dispatch across all 47 Kenyan counties"
    },
    idealFor: "Preventive 250hr/500hr service intervals, emergency breakdowns, engine overhaul, seasonal maintenance."
  },
  {
    id: "inspected-preowned-utility",
    name: "Relentless Certified Pre-Owned Utility Tractors",
    shortName: "Certified Pre-Owned 75-90HP",
    category: "pre-owned",
    categoryLabel: "Pre-Owned & Inspected",
    brand: "Multi-Brand Verified",
    model: "75HP - 90HP Series",
    year: "2022-2024",
    condition: "pre-owned",
    conditionLabel: "50-Point Certified Pre-Owned",
    availability: "in-showroom",
    availabilityLabel: "Chemelil Yard (Limited Units)",
    priceText: "Price on Enquiry",
    hp: 85,
    hpCategory: "75-100",
    image: "assets/showroom-chemilil-tractors.jpg",
    images: [
      "assets/showroom-chemilil-tractors.jpg",
      "assets/tractor-zoomlion-rc904a.jpg"
    ],
    brief: "Thoroughly tested and refurbished utility tractors with verified hours, fresh fluids, and dealership warranty.",
    description: "For agricultural operations seeking maximum capital efficiency, Relentless Tractors provides rigorously inspected pre-owned machinery. Every unit undergoes a stringent 50-point technical assessment including engine compression testing, hydraulic pressure calibration, gearbox synchronizer checks, and full fluid replacement.",
    specs: {
      "Inspection Standard": "50-Point Certified Mechanical & Electrical Protocol",
      "Engine Compression": "Verified within 95% factory tolerance",
      "Hydraulic Pressure": "Calibrated to factory bar ratings under load test",
      "Tires": "Minimum 75% agricultural tread depth guaranteed",
      "Included Documentation": "Inspection report, logbook transfer, operation manual",
      "Warranty": "3-Month Powertrain Warranty Included"
    },
    idealFor: "Commercial smallholders, expanding farms, seasonal contract plowing, budget-conscious agribusinesses."
  }
];

// 2. BLOG & GUIDES DATABASE
const BLOG_ARTICLES = [
  {
    id: "choose-tractor-horsepower",
    title: "How to Choose the Right Tractor Horsepower for Kenyan Soil & Altitude",
    tag: "Buying Guide",
    date: "September 2026",
    readTime: "6 min read",
    image: "assets/hero-tractor.jpg",
    summary: "A practical guide to calculating actual horsepower demands when navigating Rift Valley clay, Lake Basin loam, and high-altitude power derating.",
    content: `
      <h4>1. The Altitude Power Derating Factor in Kenya</h4>
      <p>A common mistake made by tractor buyers in Kenya is purchasing a machine rated at sea level without accounting for altitude. Areas like Eldoret (2,100m ASL), Kitale (1,900m ASL), and Kericho (2,000m ASL) have thinner air. Naturally aspirated diesel engines lose roughly <strong>3% of their power for every 300 meters above sea level</strong>. A naturally aspirated 75HP tractor in Eldoret may only produce around 60HP at the flywheel.</p>
      <p><strong>The Solution:</strong> Choose turbocharged models like the Zoomlion RC904-A or 130HP series. Turbochargers compress intake air, mitigating altitude power loss and maintaining full torque output.</p>
      
      <h4>2. Soil Resistance & Implement Sizing</h4>
      <p>Kenyan soils vary dramatically:
      <ul>
        <li><strong>Western Kenya / Chemelil (Black Cotton & Clay Loam):</strong> High shear resistance. Requires at least 25 to 30 HP per furrow of a 26-inch disc plough.</li>
        <li><strong>Trans-Nzoia / Uasin Gishu (Sandy Clay Loam):</strong> Moderate resistance. A 75HP-90HP tractor handles 3 to 4 furrows comfortably.</li>
        <li><strong>Central & Rift Valley (Volcanic Ash / Loam):</strong> Friable soil allowing higher working speeds with rotavators and chisel ploughs.</li>
      </ul></p>

      <h4>3. Fuel Consumption vs Engine Utilization</h4>
      <p>Running a 50HP tractor at 95% load consumes more fuel and accelerates component wear compared to running an 85HP tractor at 65% capacity. Right-sizing your tractor provides a torque reserve that handles tough patches without stalling.</p>
    `
  },
  {
    id: "tractor-maintenance-checklist",
    title: "Essential Tractor Maintenance Tips Before the Long Rains Planting Season",
    tag: "Maintenance",
    date: "September 2026",
    readTime: "5 min read",
    image: "assets/service-maintenance.jpg",
    summary: "Prevent costly downtime when every hour counts. Follow our certified mechanic checklist for fluids, filters, and hydraulics.",
    content: `
      <h4>1. Drain Water from Fuel Sedimenters</h4>
      <p>Condensation in farm fuel drums is common in humid agricultural zones. Water entering common-rail or inline injector pumps causes immediate scoring and nozzle failure. Inspect and drain the water-separator bowl daily before starting morning operations.</p>

      <h4>2. Dual-Stage Air Cleaner Inspection</h4>
      <p>Kenyan tillage conditions create heavy dust. Always clean the outer primary filter element with low-pressure compressed air (blowing inside out). Never blow or wash the inner safety element—replace it annually.</p>

      <h4>3. Hydraulic Oil & Strainer Cleanliness</h4>
      <p>Heavy implement lifting requires uncompromised hydraulic pressure. Ensure hydraulic oil is topped with high-grade UTTO (Universal Tractor Transmission Oil). Inspect quick-coupler seals before connecting disc ploughs or tipping trailers to avoid pumping field grit into the transmission.</p>

      <h4>4. Tire Pressure & Ballast Optimization</h4>
      <p>Over-inflated tires cause excessive wheel slippage (wasting up to 20% of your diesel). Set rear tire pressure between 14-18 PSI for field tillage to maximize tire footprint, and ensure front counterweights are fitted to maintain steering traction.</p>
    `
  },
  {
    id: "disc-plough-vs-rotary-tiller",
    title: "Disc Plough vs Rotary Tiller: When and How to Deploy Each on Your Farm",
    tag: "Agronomy & Machinery",
    date: "August 2026",
    readTime: "7 min read",
    image: "assets/implement-disc-plough.jpg",
    summary: "Understanding the agronomic differences between deep primary tillage with discs and precision seedbed finishing with a rotavator.",
    content: `
      <h4>Primary Tillage: The Role of the Disc Plough</h4>
      <p>The heavy disc plough (such as our 3-furrow DP-300) is the undisputed master for virgin land breaking, sugarcane stool cutting, and deep root inversion. Discs roll over subterranean rocks, stumps, and dense clay without shear-bolt snapping, inverting topsoil to bury crop residues and expose pest larvae to sunlight.</p>

      <h4>Secondary Tillage: The Precision of the Rotary Tiller</h4>
      <p>While the disc plough breaks the soil into rough clods, planting maize, sunflower, or horticultural crops requires fine, uniform tilth for seed-to-soil contact. A commercial rotavator (like the RT-210) pulverizes clods, incorporates basal manure/fertilizer evenly through the top 15cm, and creates flat seedbeds in a single fuel-saving pass.</p>

      <h4>The Ideal Workflow for Kenyan Agribusinesses</h4>
      <p>For maximum crop emergence and moisture conservation:
      <ol>
        <li>Perform primary plowing with a 3-furrow disc plough immediately after the previous crop harvest while moisture is still present.</li>
        <li>Follow 10 days later with a rotary tiller pass just before planting to level ridges, kill germinating weeds, and build the perfect seedbed.</li>
      </ol></p>
    `
  }
];

// 3. CORE INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNav();
  initRevealAnimations();
  initLazyImages();
  initCatalogue();
  initModals();
  initQuotationForm();
  initContactForm();
  initGalleryLightbox();
  initBlogReader();
});

// 4. HEADER SCROLL & MOBILE DRAWER
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

function initRevealAnimations() {
  const revealTargets = document.querySelectorAll(
    ".section, .machinery-card, .service-card, .gallery-card, .blog-card, .quote-card, .faq-item, .contact-card, .feature-panel, .stat-card, .about-visual, .cta-banner"
  );

  if (!revealTargets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
        entry.target.style.transitionDelay = `${Math.min(index * 70, 260)}ms`;
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px"
  });

  revealTargets.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}

function initLazyImages() {
  const lazyImages = document.querySelectorAll("img[loading='lazy'], img[data-src]");
  if (!lazyImages.length) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const img = entry.target;
      if (!entry.isIntersecting) return;

      if (img.dataset.src) {
        img.src = img.dataset.src;
        delete img.dataset.src;
      }

      img.classList.add("is-loaded");
      imageObserver.unobserve(img);
    });
  }, {
    rootMargin: "80px 0px",
    threshold: 0.15
  });

  lazyImages.forEach((img) => {
    img.classList.add("lazy-image");
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
    imageObserver.observe(img);
  });
}

function initMobileNav() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("drawerCloseBtn");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("drawerOverlay");
  const drawerLinks = drawer?.querySelectorAll("a") || [];

  if (!menuBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add("open");
    overlay.classList.add("active");
    drawer.removeAttribute("inert");
    drawer.setAttribute("aria-hidden", "false");
    overlay.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    closeBtn?.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("active");
    drawer.setAttribute("inert", "");
    drawer.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  menuBtn.addEventListener("click", openDrawer);
  if (closeBtn) {
    closeBtn.addEventListener("click", closeDrawer);
    closeBtn.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && event.shiftKey) {
        event.preventDefault();
        drawerLinks[drawerLinks.length - 1]?.focus();
      }
    });
  }
  overlay.addEventListener("click", closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  drawer.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDrawer();
      menuBtn.focus();
    } else if (event.key === "Tab" && !event.shiftKey && document.activeElement === drawerLinks[drawerLinks.length - 1]) {
      event.preventDefault();
      closeBtn?.focus();
    }
  });
}

// 5. CATALOGUE SEARCH & FILTERING SYSTEM
let activeCategory = "all";
let activeCondition = "all";
let activeHpRange = "all";
let activeSort = "featured";
let searchQuery = "";

function initCatalogue() {
  const container = document.getElementById("catalogueGrid");
  if (!container) return;

  // Search input with debounce
  const searchInput = document.getElementById("catalogueSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCatalogue();
    });
  }

  // Category Pills
  const catPills = document.querySelectorAll(".cat-pill-btn");
  catPills.forEach(pill => {
    pill.addEventListener("click", () => {
      catPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category") || "all";
      renderCatalogue();
    });
  });

  // Dropdown Filters
  const hpSelect = document.getElementById("filterHpSelect");
  if (hpSelect) {
    hpSelect.addEventListener("change", (e) => {
      activeHpRange = e.target.value;
      renderCatalogue();
    });
  }

  const condSelect = document.getElementById("filterConditionSelect");
  if (condSelect) {
    condSelect.addEventListener("change", (e) => {
      activeCondition = e.target.value;
      renderCatalogue();
    });
  }

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSort = e.target.value;
      renderCatalogue();
    });
  }

  // Initial render
  renderCatalogue();
}

function filterAndSortData() {
  return INVENTORY_DATA.filter(item => {
    // Category check
    if (activeCategory !== "all" && item.category !== activeCategory) {
      return false;
    }

    // Condition check
    if (activeCondition !== "all" && item.condition !== activeCondition) {
      return false;
    }

    // Horsepower check
    if (activeHpRange !== "all") {
      if (activeHpRange === "under-75" && (item.hp >= 75 || item.hp === 0)) return false;
      if (activeHpRange === "75-100" && (item.hp < 75 || item.hp > 100)) return false;
      if (activeHpRange === "100-plus" && item.hp < 100) return false;
    }

    // Keyword search
    if (searchQuery) {
      const matchTarget = `${item.name} ${item.brand} ${item.model} ${item.categoryLabel} ${item.brief} ${item.idealFor}`.toLowerCase();
      if (!matchTarget.includes(searchQuery)) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (activeSort === "hp-high") return b.hp - a.hp;
    if (activeSort === "hp-low") return a.hp - b.hp;
    if (activeSort === "name-asc") return a.name.localeCompare(b.name);
    return 0; // default featured
  });
}

function renderCatalogue() {
  const container = document.getElementById("catalogueGrid");
  const counterEl = document.getElementById("catalogueCounter");
  if (!container) return;

  const filtered = filterAndSortData();

  if (counterEl) {
    counterEl.textContent = `Showing ${filtered.length} of ${INVENTORY_DATA.length} machines in showroom inventory`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--surface-card); border-radius: var(--radius-md); border: 1px dashed var(--border-light);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 16px; color: var(--gold);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <h3 style="font-size: 1.25rem; margin-bottom: 8px;">No matching machinery found</h3>
        <p style="color: var(--text-muted); max-width: 440px; margin: 0 auto 20px;">We may have incoming shipments or custom implement sourcing available for your specifications.</p>
        <button class="btn btn-primary" onclick="openQuotationModal('Custom Machinery Sourcing')">Request Custom Machinery Quote</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <article class="machinery-card" data-id="${item.id}">
      <div class="card-image-box" onclick="openProductModal('${item.id}')">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="card-badge-layer">
          <span class="badge ${item.condition === 'new' ? 'badge-green' : 'badge-gold'}">${item.conditionLabel}</span>
          <span class="badge badge-stock">${item.availabilityLabel}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="card-meta-row">
          <span class="card-category">${item.categoryLabel}</span>
          <span class="card-model-year">${item.brand} · ${item.year}</span>
        </div>
        <h3 class="card-title" onclick="openProductModal('${item.id}')" style="cursor: pointer;">${item.name}</h3>
        <p class="card-desc-brief">${item.brief}</p>
        
        <div class="specs-pills-grid">
          <div class="spec-pill">
            <span class="spec-pill-label">Power Rating</span>
            <span class="spec-pill-val">${item.hp > 0 ? item.hp + ' HP' : 'Standard Ag'}</span>
          </div>
          <div class="spec-pill">
            <span class="spec-pill-label">Drivetrain</span>
            <span class="spec-pill-val">${item.category === 'tractors' ? '4WD Dual Hub' : '3-Point / PTO'}</span>
          </div>
        </div>

        <div class="card-price-row">
          <span class="price-label">Official Dealership Price</span>
          <span class="price-val">${item.priceText}</span>
        </div>

        <div class="card-actions-row">
          <button class="btn btn-secondary btn-sm" onclick="openProductModal('${item.id}')">
            View Specs
          </button>
          <button class="btn btn-primary btn-sm" onclick="openQuotationModal('${item.name}')">
            Request Quote
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// 6. PRODUCT DETAILS MODAL SYSTEM
function initModals() {
  const modalBackdrop = document.getElementById("productModalBackdrop");
  const closeBtn = document.getElementById("productModalClose");

  if (!modalBackdrop) return;

  const closeModal = () => {
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeLightbox();
      closeBlogModal();
      closeQuoteConfirmation();
    }
  });
}

function openProductModal(productId) {
  const item = INVENTORY_DATA.find(p => p.id === productId);
  if (!item) return;

  const modalBackdrop = document.getElementById("productModalBackdrop");
  const modalBody = document.getElementById("productModalContent");
  if (!modalBackdrop || !modalBody) return;

  const specsRows = Object.entries(item.specs).map(([label, val]) => `
    <tr>
      <td>${label}</td>
      <td>${val}</td>
    </tr>
  `).join("");

  const waMessage = encodeURIComponent(`Hello Relentless Tractors! I would like to request technical details and official pricing for the ${item.name}. Please share current availability and delivery timeline.`);

  modalBody.innerHTML = `
    <div class="modal-inner-grid">
      <div class="modal-media-col">
        <div class="modal-main-img-box">
          <img id="modalViewerMainImg" src="${item.image}" alt="${item.name}">
        </div>
        <div style="display: flex; gap: 8px;">
          ${item.images.map((img, idx) => `
            <img src="${img}" alt="Thumbnail ${idx}" style="width: 70px; height: 50px; object-fit: cover; border-radius: 4px; cursor: pointer; border: 2px solid ${idx === 0 ? 'var(--primary-green)' : 'transparent'};" onclick="document.getElementById('modalViewerMainImg').src='${img}'; this.parentElement.querySelectorAll('img').forEach(el => el.style.borderColor='transparent'); this.style.borderColor='var(--primary-green)';">
          `).join("")}
        </div>
        <div style="margin-top: 12px; background: var(--surface-alt); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
          <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--gold); display: block; margin-bottom: 4px;">Recommended Farm Applications</span>
          <p style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 0;">${item.idealFor}</p>
        </div>
      </div>

      <div class="modal-details-col">
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
          <span class="badge ${item.condition === 'new' ? 'badge-green' : 'badge-gold'}">${item.conditionLabel}</span>
          <span class="badge badge-stock">${item.availabilityLabel}</span>
        </div>
        <h2 style="font-size: 1.75rem; margin-bottom: 6px; font-family: 'Fraunces', serif;">${item.name}</h2>
        <div style="font-size: 0.88rem; color: var(--gold); font-weight: 700; margin-bottom: 14px;">${item.brand} · ${item.model} (${item.year})</div>
        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px;">${item.description}</p>
        
        <h4 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-main); margin-top: 18px; margin-bottom: 8px; border-bottom: 2px solid var(--gold); padding-bottom: 4px; display: inline-block;">Technical Specifications</h4>
        <table class="specs-table">
          <tbody>
            ${specsRows}
          </tbody>
        </table>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 24px;">
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="btn btn-primary" style="flex: 1;" onclick="closeProductModal(); openQuotationModal('${item.name}')">
              Request Official Quotation
            </button>
            <a href="https://wa.me/254708421323?text=${waMessage}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="flex: 1;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.1-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.6 0-3.1-.43-4.4-1.19l-.31-.18-3.03.79.81-2.95-.2-.31A7.95 7.95 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.4-5.6c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12s-.62.79-.76.95-.28.18-.52.06a6.6 6.6 0 01-1.93-1.19 7.2 7.2 0 01-1.33-1.65c-.14-.24 0-.36.11-.48.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3s-.85.83-.85 2.02.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/></svg>
              Enquire on WhatsApp
            </a>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-subtle); text-align: center;">
            Chemelil Showroom Hotline: <strong>+254 708 421 323</strong> · Fast nationwide delivery
          </div>
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const modalBackdrop = document.getElementById("productModalBackdrop");
  if (modalBackdrop) modalBackdrop.classList.remove("active");
  document.body.style.overflow = "";
}

// 7. QUOTATION ENQUIRY FORM & CONFIRMATION
function initQuotationForm() {
  const form = document.getElementById("quotationForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateQuotationForm()) return;

    // Collect data
    const fullName = document.getElementById("quoteFullName").value.trim();
    const phone = document.getElementById("quotePhone").value.trim();
    const email = document.getElementById("quoteEmail").value.trim();
    const county = document.getElementById("quoteCounty").value;
    const farmName = document.getElementById("quoteFarmName").value.trim();
    const product = document.getElementById("quoteProduct").value;
    const quantity = document.getElementById("quoteQuantity").value;
    const intendedUse = document.getElementById("quoteIntendedUse").value;
    const notes = document.getElementById("quoteNotes").value.trim();
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked')?.value || "WhatsApp";

    // Generate formal Reference Number
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const refNumber = `RT-2026-${randomDigits}`;

    const quoteRecord = {
      refNumber,
      fullName,
      phone,
      email,
      county,
      farmName: farmName || "N/A",
      product,
      quantity,
      intendedUse,
      notes: notes || "Standard dealership quotation requested",
      contactMethod,
      timestamp: new Date().toISOString()
    };

    // Save locally
    try {
      localStorage.setItem("last_relentless_quote", JSON.stringify(quoteRecord));
    } catch(err) {
      console.warn("Storage not available", err);
    }

    // Show Confirmation Modal
    showQuotationConfirmation(quoteRecord);
    form.reset();
  });
}

function validateQuotationForm() {
  let isValid = true;

  const checkField = (id, condition) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!condition(el.value)) {
      el.classList.add("error");
      isValid = false;
    } else {
      el.classList.remove("error");
    }
  };

  checkField("quoteFullName", val => val.trim().length >= 3);
  checkField("quotePhone", val => val.trim().length >= 9);
  checkField("quoteCounty", val => val !== "");
  checkField("quoteProduct", val => val !== "");

  const consent = document.getElementById("quoteConsent");
  if (consent && !consent.checked) {
    showToast("Please agree to follow-up communication to proceed.");
    isValid = false;
  }

  return isValid;
}

function openQuotationModal(preselectedProduct) {
  const quoteSection = document.getElementById("quote");
  const productSelect = document.getElementById("quoteProduct");

  if (productSelect && preselectedProduct) {
    // If exact match doesn't exist, create an option
    let found = false;
    for (let opt of productSelect.options) {
      if (opt.value === preselectedProduct || opt.text === preselectedProduct) {
        opt.selected = true;
        found = true;
        break;
      }
    }
    if (!found) {
      const newOpt = new Option(preselectedProduct, preselectedProduct, true, true);
      productSelect.add(newOpt);
    }
  }

  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: "smooth" });
    const nameInput = document.getElementById("quoteFullName");
    if (nameInput) setTimeout(() => nameInput.focus(), 600);
  }
}

function showQuotationConfirmation(quote) {
  const modal = document.getElementById("quoteConfirmModal");
  if (!modal) return;

  const refEl = document.getElementById("confirmRefNumber");
  const detailsEl = document.getElementById("confirmSummaryBody");
  const waBtn = document.getElementById("confirmWhatsAppActionBtn");

  if (refEl) refEl.textContent = quote.refNumber;

  if (detailsEl) {
    detailsEl.innerHTML = `
      <div style="background: var(--surface-light); padding: 18px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); margin: 18px 0; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><strong>Customer:</strong> <span>${quote.fullName}</span></div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><strong>Location / County:</strong> <span>${quote.county}</span></div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><strong>Equipment of Interest:</strong> <span style="color: var(--primary-green); font-weight: 700;">${quote.product}</span></div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><strong>Quantity:</strong> <span>${quote.quantity} unit(s)</span></div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><strong>Primary Application:</strong> <span>${quote.intendedUse}</span></div>
        <div style="display: flex; justify-content: space-between;"><strong>Preferred Contact:</strong> <span>${quote.contactMethod} (${quote.phone})</span></div>
      </div>
    `;
  }

  // Pre-generate WhatsApp message for instant customer forwarding
  if (waBtn) {
    const waText = encodeURIComponent(
      `Hello Relentless Tractors Sales Team!\n\nI have just submitted a quotation request on your website.\n\n*Reference:* ${quote.refNumber}\n*Name:* ${quote.fullName}\n*Location:* ${quote.county}\n*Equipment:* ${quote.product}\n*Quantity:* ${quote.quantity}\n*Application:* ${quote.intendedUse}\n*Phone:* ${quote.phone}\n\nPlease confirm receipt and provide proforma quotation details.`
    );
    waBtn.href = `https://wa.me/254708421323?text=${waText}`;
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeQuoteConfirmation() {
  const modal = document.getElementById("quoteConfirmModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

// 8. CONTACT FORM
function initContactForm() {
  const contactForm = document.getElementById("contactDirectForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName")?.value.trim();
    const phone = document.getElementById("contactPhone")?.value.trim();
    const message = document.getElementById("contactMessage")?.value.trim();

    if (!name || !phone || !message) {
      showToast("Please complete all required fields.");
      return;
    }

    showToast("Message received! A Relentless machinery specialist will contact you shortly.");
    contactForm.reset();
  });
}

// 9. GALLERY LIGHTBOX
let activeGalleryIdx = 0;
const GALLERY_ITEMS = [
  {
    src: "assets/tractor-zoomlion-rc904a.jpg",
    title: "Zoomlion RC904-A (90HP 4WD)",
    subtitle: "Canopy utility tractor ready in Chemelil showroom yard"
  },
  {
    src: "assets/tractor-zoomlion-130hp.jpg",
    title: "Zoomlion 130HP Heavy Commercial",
    subtitle: "Pressurized luxury cabin tractor for estate sugarcane operations"
  },
  {
    src: "assets/showroom-chemilil-tractors.jpg",
    title: "Relentless Tractors Chemelil Showroom",
    subtitle: "Direct machinery yard serving Western, Nandi and Rift Valley"
  },
  {
    src: "assets/implement-disc-plough.jpg",
    title: "Heavy-Duty 3-Furrow Disc Plough (DP-300)",
    subtitle: "Heat-treated boron steel discs for tough virgin soil tillage"
  },
  {
    src: "assets/implement-rotary-tiller.jpg",
    title: "Agri-Pro 2.1M Rotary Tiller (Rotavator)",
    subtitle: "High-carbon curved tines with oil-bath gear transmission"
  },
  {
    src: "assets/implement-tipping-trailer.jpg",
    title: "12-Ton Tandem Axle Tipping Trailer",
    subtitle: "Heavy steel dropside trailer for cane haulage and harvest carting"
  },
  {
    src: "assets/service-maintenance.jpg",
    title: "Certified Dealership Technical Servicing",
    subtitle: "Mobile mechanics with electronic diagnostics and on-farm support"
  },
  {
    src: "assets/spares-genuine-parts.jpg",
    title: "Genuine Spares & Scheduled Service Kits",
    subtitle: "OEM filtration, clutch, and hydraulic components in stock"
  },
  {
    src: "assets/hero-tractor.jpg",
    title: "Commercial Plowing in High-Yield Soil",
    subtitle: "High drawbar horsepower delivering consistent furrow depth"
  }
];

function initGalleryLightbox() {
  const lightbox = document.getElementById("lightboxModal");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!lightbox) return;

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      activeGalleryIdx = (activeGalleryIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      updateLightboxContent();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      activeGalleryIdx = (activeGalleryIdx + 1) % GALLERY_ITEMS.length;
      updateLightboxContent();
    });
  }
}

function openLightbox(index) {
  const lightbox = document.getElementById("lightboxModal");
  if (!lightbox) return;
  activeGalleryIdx = index;
  updateLightboxContent();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateLightboxContent() {
  const imgEl = document.getElementById("lightboxImg");
  const titleEl = document.getElementById("lightboxTitle");
  const subEl = document.getElementById("lightboxSub");
  const item = GALLERY_ITEMS[activeGalleryIdx];

  if (!item) return;
  if (imgEl) imgEl.src = item.src;
  if (titleEl) titleEl.textContent = item.title;
  if (subEl) subEl.textContent = item.subtitle;
}

function closeLightbox() {
  const lightbox = document.getElementById("lightboxModal");
  if (lightbox) lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

// 10. BLOG READER MODAL
function initBlogReader() {
  const modal = document.getElementById("blogReaderModal");
  const closeBtn = document.getElementById("blogReaderClose");

  if (!modal) return;
  if (closeBtn) closeBtn.addEventListener("click", closeBlogModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeBlogModal();
  });
}

function openBlogModal(articleId) {
  const article = BLOG_ARTICLES.find(a => a.id === articleId);
  if (!article) return;

  const modal = document.getElementById("blogReaderModal");
  const contentEl = document.getElementById("blogReaderContent");
  if (!modal || !contentEl) return;

  contentEl.innerHTML = `
    <div style="padding: 36px 40px;">
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 14px;">
        <span class="badge badge-gold">${article.tag}</span>
        <span style="font-size: 0.85rem; color: var(--text-subtle);">${article.date} · ${article.readTime}</span>
      </div>
      <h2 style="font-size: 2rem; font-family: 'Fraunces', serif; margin-bottom: 20px; line-height: 1.2;">${article.title}</h2>
      <div style="border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 26px; max-height: 340px;">
        <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 320px; object-fit: cover;">
      </div>
      <div class="article-body-text" style="font-size: 1rem; color: var(--text-main); line-height: 1.75;">
        ${article.content}
      </div>
      <div style="margin-top: 36px; padding: 24px; background: var(--surface-alt); border-radius: var(--radius-md); border: 1px solid var(--border-light); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <div>
          <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Need machinery advice for your specific soil type?</h4>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0;">Our agricultural advisors are available at Chemelil or on WhatsApp.</p>
        </div>
        <button class="btn btn-primary" onclick="closeBlogModal(); openQuotationModal('${article.title}')">Talk to an Advisor</button>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBlogModal() {
  const modal = document.getElementById("blogReaderModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

// 11. TOAST NOTIFICATION UTILITY
function showToast(msg) {
  let toast = document.getElementById("toastNotice");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotice";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${msg}</span>
  `;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4200);
}

// Global functions exposed for inline onclicks
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.openQuotationModal = openQuotationModal;
window.closeQuoteConfirmation = closeQuoteConfirmation;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.openBlogModal = openBlogModal;
window.closeBlogModal = closeBlogModal;
