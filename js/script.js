document.addEventListener('DOMContentLoaded', function () {
    // Keep the existing Challenges page navigation in sync with the 2026 site.
    // This runs before mobile-nav event handlers are attached.
    if (document.body.classList.contains('challenges-page')) {
        const menu = document.querySelector('.fixed-header nav ul');
        if (menu) {
            const links = [
                ['index.html#home', 'Home'],
                ['index.html#about', 'About'],
                ['index.html#call', 'Call for Papers'],
                ['challenges.html', 'Challenges'],
                ['papers.html', 'Accepted Papers'],
                ['index.html#schedule', 'Schedule'],
                ['index.html#speakers', 'Speakers'],
                ['index.html#organizers', 'Organizers'],
                ['committee.html', 'Committee'],
                ['index.html#contact', 'Contact']
            ];
            menu.replaceChildren();
            for (const [href, label] of links) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = href;
                a.textContent = label;
                if (href === 'challenges.html') {
                    a.className = 'active';
                    a.setAttribute('aria-current', 'page');
                }
                li.appendChild(a);
                menu.appendChild(li);
            }
            const divider = document.createElement('li');
            divider.className = 'nav-divider';
            menu.appendChild(divider);
            const edition = document.createElement('li');
            const editionLink = document.createElement('a');
            editionLink.href = 'https://mozhgan91.github.io/vlm4rwd-neurips25-ws/';
            editionLink.textContent = '2025 Edition';
            editionLink.className = 'previous-edition-link';
            editionLink.target = '_blank';
            editionLink.rel = 'noopener';
            edition.appendChild(editionLink);
            menu.appendChild(edition);
        }
    }
    // Initialize Vanta.js background effect
const heroBackground = document.querySelector('#hero-background');
if (heroBackground && window.VANTA && VANTA.WAVES) {
const vantaEffect = VANTA.WAVES({
    el: "#hero-background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,

    // Deep emerald
    color: 0x0B6B53,

    shininess: 45.0,
    waveHeight: 18.0,
    waveSpeed: 0.8,
    zoom: 1.05
});
}

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a, .cta-buttons a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only prevent default for links that point to sections on this page
            const targetId = this.getAttribute('href');
            if (targetId && (targetId.startsWith('#') || (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) && targetId.startsWith('index.html#'))) {
                e.preventDefault();

                const targetSection = document.querySelector(targetId.startsWith('#') ? targetId : targetId.slice('index.html'.length));
                if (targetSection) {
                    // Get the height of the fixed header
                    const headerHeight = document.querySelector('.fixed-header').offsetHeight;

                    // Calculate the target scroll position
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');

                    // Update active link
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY + 150; // Offset to account for header height

        // Get all sections
        const sections = document.querySelectorAll('section[id]');

        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding nav link
                const targetLink = document.querySelector(`nav a[href="index.html#${section.id}"]`);
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            }
        });
    });

    // FAQ accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');

    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');

            header.addEventListener('click', function () {
                // Close all other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // In a real implementation, you would send the form data to a server
            // For demonstration purposes, we'll just show an alert
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}); 


// Data-driven paper and committee directories; keep source data in the corresponding files.
document.addEventListener('DOMContentLoaded', () => {
 const create = (tag, cls, value) => { const el=document.createElement(tag); if(cls) el.className=cls; if(value !== undefined) el.textContent=value; return el; };
 const cleanUrl = value => { try { const u=new URL(value); return ['https:','http:'].includes(u.protocol)?u.href:null; } catch(e) { return null; } };
 const papers = Array.isArray(window.VLM4RWD_PAPERS) ? window.VLM4RWD_PAPERS : [];
 const paperRoot = document.getElementById('papers-directory');
 if(paperRoot){
   const search = document.getElementById('paper-search'), count=document.getElementById('paper-count'), empty=document.getElementById('paper-empty'), none=document.getElementById('paper-no-results');
   const render = () => {
     const query=search.value.trim().toLocaleLowerCase(); paperRoot.replaceChildren();
     const matches=papers.filter(p=>[p.title,p.authors,(p.keywords||[]).join(' '),p.presentation].join(' ').toLocaleLowerCase().includes(query));
     matches.forEach(p=>{
       const card=create('article','directory-paper'); const upper=create('div','paper-card-top');
       if(p.presentation) upper.append(create('span','paper-type',p.presentation)); card.append(upper);
       card.append(create('h3','',p.title||'Untitled paper'),create('p','paper-authors',p.authors||''));
       if(Array.isArray(p.keywords)&&p.keywords.length){const tags=create('div','paper-keywords');p.keywords.forEach(k=>tags.append(create('span','',k)));card.append(tags);}
       const url=cleanUrl(p.url);if(url){const link=create('a','paper-card-link','View paper ↗');link.href=url;link.target='_blank';link.rel='noopener noreferrer';card.append(link);}
       paperRoot.append(card);
     });
     empty.hidden=papers.length>0;none.hidden=!papers.length||matches.length>0;
     count.textContent=papers.length ? `${matches.length} of ${papers.length} papers` : '';
   };
   search.addEventListener('input',render);render();
 }
 const acRoot=document.getElementById('ac-directory'), reviewRoot=document.getElementById('reviewer-directory');
 if(acRoot){
   const chairs=Array.isArray(window.VLM4RWD_AREA_CHAIRS)?window.VLM4RWD_AREA_CHAIRS:[];
   const reviewers=Array.isArray(window.VLM4RWD_REVIEWERS)?window.VLM4RWD_REVIEWERS:[];
   const makeCard=(person,small)=>{
     if(typeof person==='string')person={name:person};
     const card=create('article','committee-card'+(small?' reviewer-card':''));card.append(create('span','person-icon','♙'));
     const info=create('div','person-info'),title=create('h3','');const url=cleanUrl(person.url);
     if(url){const link=create('a','',person.name);link.href=url;link.target='_blank';link.rel='noopener noreferrer';title.append(link);}else title.textContent=person.name||'';
     info.append(title);if(!small&&person.affiliation)info.append(create('p','',person.affiliation));card.append(info);return card;
   };
   chairs.forEach(p=>acRoot.append(makeCard(p,false))); document.getElementById('ac-empty').hidden=chairs.length>0;
   const search=document.getElementById('reviewer-search'),count=document.getElementById('reviewer-count'),empty=document.getElementById('reviewer-empty'),none=document.getElementById('reviewer-no-results');
   const render=()=>{
     const q=search.value.trim().toLocaleLowerCase(); reviewRoot.replaceChildren();
     const matches=reviewers.filter(p=>(typeof p==='string'?p:p.name||'').toLocaleLowerCase().includes(q));
     matches.forEach(p=>reviewRoot.append(makeCard(p,true)));
     empty.hidden=reviewers.length>0;none.hidden=!reviewers.length||matches.length>0;
     count.textContent=reviewers.length?`${matches.length} of ${reviewers.length} reviewers`:'';
   };search.addEventListener('input',render);render();
 }
});
