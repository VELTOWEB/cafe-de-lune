const mobileMenu = document.getElementById("mobileMenu");
const menuButton = document.querySelector(".menu-button");

function setMenuState(isOpen) {
    mobileMenu.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기");
}

function toggleMenu() {
    setMenuState(!mobileMenu.classList.contains("active"));
}

function closeMenu() {
    setMenuState(false);
}

// ESC 키로 모바일 메뉴 닫기
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// 화면이 커졌을 때 모바일 메뉴 상태 초기화
window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
        closeMenu();
    }
});

// ==============================
// 스크롤 등장 애니메이션
// ==============================

const revealElements = document.querySelectorAll(
    ".about-image, .about-text, .featured-card, .simple-menu-column, .gallery-item, .location-title, .location-box, .location-visual"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("show");
    });
}
