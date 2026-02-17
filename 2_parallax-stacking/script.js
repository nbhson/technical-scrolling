const sections = document.querySelectorAll('section');
const totalSections = sections.length;
const windowHeight = window.innerHeight;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // For each section (except the last one which stays at bottom/back)
    sections.forEach((section, index) => {
        // We only move the sections that are "above" based on scroll
        // Logic:
        // 0 - 100vh: Section 1 moves
        // 100vh - 200vh: Section 2 moves
        // etc.

        // Calculate the effective scroll range for this section
        const start = index * windowHeight;

        // If we have scrolled PAST this section's start point
        if (scrollY > start) {
            // Calculate how far into this section's "move zone" we are
            let offset = scrollY - start;

            // Limit offset to 100vh (so it doesn't keep going forever if we want)
            // But actually we want it to move completely out of view.

            // Apply transform: Move UP
            // But only if it's not the LAST section (Section 4 matches z-index 1)
            // Actually, user wants "Previous moves, Next stays".
            // So Section 1 moves away to reveal Section 2.
            // Section 2 moves away to reveal Section 3.
            // Section 4 stays.

            if (index < totalSections - 1) { // Don't move the very last section
                section.style.transform = `translateY(-${offset}px)`;
            }
        } else {
            // Reset if we scroll back up
            section.style.transform = `translateY(0px)`;
        }
    });
});
