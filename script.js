// Configuration toggle functionality
function toggleConfig(configId) {
    const content = document.getElementById(configId);
    const header = content.previousElementSibling;
    const icon = header.querySelector('i');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.style.transform = 'rotate(0deg)';
    } else {
        // Close all other config sections
        document.querySelectorAll('.config-content.active').forEach(activeContent => {
            activeContent.classList.remove('active');
            const activeIcon = activeContent.previousElementSibling.querySelector('i');
            activeIcon.style.transform = 'rotate(0deg)';
        });
        
        // Open the clicked section
        content.classList.add('active');
        icon.style.transform = 'rotate(180deg)';
    }
}

// Smooth scrolling for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.security-card, .skill-card, .config-card, .vlan, .network-device');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Add typing effect to terminal content
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect for terminal windows when they come into view
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.typed) {
            const preElement = entry.target.querySelector('pre');
            const originalText = preElement.textContent;
            entry.target.dataset.typed = 'true';
            
            setTimeout(() => {
                typeWriter(preElement, originalText, 20);
            }, 500);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.terminal-window').forEach(terminal => {
        terminalObserver.observe(terminal);
    });
});

// Add hover effects for network topology
document.addEventListener('DOMContentLoaded', () => {
    const networkDevices = document.querySelectorAll('.network-device');
    const vlans = document.querySelectorAll('.vlan');
    
    networkDevices.forEach(device => {
        device.addEventListener('mouseenter', () => {
            device.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.5)';
        });
        
        device.addEventListener('mouseleave', () => {
            device.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
        });
    });
    
    vlans.forEach(vlan => {
        vlan.addEventListener('mouseenter', () => {
            vlan.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        });
        
        vlan.addEventListener('mouseleave', () => {
            vlan.style.boxShadow = 'none';
        });
    });
});

// Add click-to-copy functionality for code blocks
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 8px;
            border-radius: 4px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
        
        pre.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                copyButton.style.background = '#10b981';
                
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    copyButton.style.background = '#3b82f6';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });
});

// Add progress indicator for page scroll
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #06b6d4);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});