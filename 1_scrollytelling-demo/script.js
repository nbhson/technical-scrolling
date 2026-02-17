document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.pinned-section-wrapper');
    const pinnedElement = document.querySelector('.pinned-element');
    const title = document.getElementById('dynamic-title');
    const cards = document.querySelectorAll('.card');
    const progressBar = document.querySelector('.progress-bar');

    // Total number of cards
    const totalSteps = cards.length + 1; // +1 for the title introduction

    // Function to handle scroll updates
    function handleScroll() {
        if (!wrapper) return;

        const wrapperRect = wrapper.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate how far we've scrolled INTO the wrapper
        // start: when wrapper top hits viewport top (0)
        // end: when wrapper bottom hits viewport bottom (which means we scrolled past it)
        // The total scrollable distance inside the wrapper is wrapper.offsetHeight - viewportHeight

        const start = 0;
        const end = wrapper.offsetHeight - viewportHeight;

        // wrapperRect.top is the distance from the top of the viewport to the top of the element.
        // It starts positive, goes to 0, then goes negative as we scroll down.
        // Current scroll progress inside the wrapper:
        let progress = -wrapperRect.top;

        // Normalize progress between 0 and 1 based on the available scroll track
        let normalizedProgress = Math.max(0, Math.min(progress / end, 1));

        // Update Progress Bar
        progressBar.style.width = `${normalizedProgress * 100}%`;

        // Logic for triggering animations based on progress
        // Split progress into segments for each step

        // Step 0: Title appears (0.0 - 0.2)
        if (normalizedProgress > 0.05) {
            title.classList.add('visible');
            title.textContent = "Giữ Nguyên Viewport";
        } else {
            title.classList.remove('visible');
        }

        if (normalizedProgress > 0.15) {
            title.textContent = "Nội dung thay đổi...";
        }

        // Logic for Cards (Distributed across the remaining 0.2 to 1.0 range)
        // Range for cards: 0.2 to 1.0
        const cardStartProgress = 0.2;
        const cardProgressRange = 1.0 - cardStartProgress;
        const progressPerCard = cardProgressRange / cards.length;

        cards.forEach((card, index) => {
            // Calculate specific trigger points for this card
            const cardIn = cardStartProgress + (index * progressPerCard);
            const cardOut = cardIn + progressPerCard;

            // Check if we are in the active range for this card
            // We give a little overlap or buffer
            if (normalizedProgress >= cardIn && normalizedProgress < cardOut + 0.1) {
                // Determine if it should be entering or exiting
                // For a simple stack effect:
                // If we are past the 'in' point, show it.
                // If we are significantly past the 'out' point, maybe hide it? 
                // Let's keep it simple: Show card if we passed its start point
                card.classList.add('visible');
                card.classList.remove('exiting');

                // Parallax/Stacking effect:
                // As we move through the card's phase, maybe push it up slightly?
                // skipping complicated transforms for now, trusting CSS transition

            } else if (normalizedProgress >= cardOut + 0.1) {
                // Scrolled past this card's section
                card.classList.add('exiting');
                card.classList.remove('visible');
            } else {
                // Haven't reached yet
                card.classList.remove('visible');
                card.classList.remove('exiting');
            }
        });
    }

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
});
