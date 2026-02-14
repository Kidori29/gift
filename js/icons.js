// Custom SVG Icons Library
const Icons = {
    gift: `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7h-3.28c.41-.59.67-1.28.67-2 0-1.93-1.57-3.5-3.5-3.5-1.04 0-1.98.46-2.62 1.18l-.27.32-.27-.32C10.08 1.96 9.14 1.5 8.11 1.5c-1.93 0-3.5 1.57-3.5 3.5 0 .72.26 1.41.67 2H2v4h1v10h18V11h1V7zM13.89 3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-1.78l1.4-1.68c.25-.3.47-.61.38-.82zM8.11 3.5c.46 0 .88.2 1.17.52L11 6.5H8.61c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5zM4 9h7v2H4V9zm15 10H5v-8h6v2h2v-2h6v8zm2-10h-7V9h7v2z"/>
        </svg>
    `,

    heart: `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `,

    sparkles: `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="sparkle-1" d="M7 11H3l4-9 4 9H7zm0 2h4l-4 9-4-9h4z"/>
            <path class="sparkle-2" d="M17.5 4.5L16 8h3l-1.5 3.5L19 8h-3z"/>
            <path class="sparkle-3" d="M19 15l-1 2h2l-1 2 1-2h-2z"/>
        </svg>
    `,

    music: `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle class="note-1" cx="6" cy="17" r="2"/>
            <circle class="note-2" cx="16" cy="15" r="2"/>
            <path class="note-1" d="M8 17V5l10-2v12"/>
            <path class="note-2" d="M18 15V3"/>
        </svg>
    `,

    volumeOff: `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
    `,

    champagne: `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20h4v2h-4v-2zm4-17h-4l-2 11h8l-2-11zm-3 9l1-5h0l1 5h-2z"/>
            <circle class="bubble" cx="9" cy="2" r="1"/>
            <circle class="bubble" cx="12" cy="1.5" r="1"/>
            <circle class="bubble" cx="15" cy="2" r="1"/>
        </svg>
    `,

    rotate: `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
        </svg>
    `,

    send: `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
    `,

    spinner: `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" stroke-linecap="round"/>
        </svg>
    `
};

// Function to create icon element
function createIcon(iconName, className = '') {
    const wrapper = document.createElement('span');
    wrapper.className = `icon-${iconName} ${className}`;
    wrapper.innerHTML = Icons[iconName];
    return wrapper;
}

// Replace Font Awesome icons with custom SVG icons
function replaceIcons() {
    // Find all Font Awesome icons and replace them
    const iconMap = {
        'fa-gift': 'gift',
        'fa-heart': 'heart',
        'fa-sparkles': 'sparkles',
        'fa-music': 'music',
        'fa-volume-xmark': 'volumeOff',
        'fa-champagne-glasses': 'champagne',
        'fa-rotate-right': 'rotate'
    };

    document.querySelectorAll('[class*="fa-"]').forEach(element => {
        for (const [faClass, iconName] of Object.entries(iconMap)) {
            if (element.classList.contains(faClass)) {
                const newIcon = createIcon(iconName);
                // Preserve original classes except fa-*
                const classes = Array.from(element.classList).filter(c => !c.startsWith('fa'));
                classes.forEach(c => newIcon.classList.add(c));

                // Preserve ID
                if (element.id) {
                    newIcon.id = element.id;
                }

                element.replaceWith(newIcon);
                break;
            }
        }
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Icons, createIcon, replaceIcons };
}
