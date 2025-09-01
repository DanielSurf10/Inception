document.addEventListener('DOMContentLoaded', function() {
	const navLinks = document.querySelectorAll('.nav-link');
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			const targetSection = document.querySelector(targetId);

			if (targetSection) {
				targetSection.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});

	function animateCounter(element) {
		const target = parseInt(element.getAttribute('data-target'));
		const duration = 2000;
		const step = target / (duration / 16);
		let current = 0;

		const timer = setInterval(() => {
			current += step;
			if (current >= target) {
				current = target;
				clearInterval(timer);
			}
			element.textContent = Math.floor(current);
		}, 16);
	}

	const counterObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const counters = entry.target.querySelectorAll('.stat-number');
				counters.forEach(counter => {
					if (counter.textContent === '0') {
						animateCounter(counter);
					}
				});
				counterObserver.unobserve(entry.target);
			}
		});
	});

	const statsSection = document.querySelector('.stats');
	if (statsSection) {
		counterObserver.observe(statsSection);
	}

	const currentDateElement = document.getElementById('current-date');
	if (currentDateElement) {
		const now = new Date();
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'America/Sao_Paulo'
		};
		currentDateElement.textContent = now.toLocaleDateString('en-US', options);
	}

	const lastUpdateElement = document.getElementById('last-update');
	if (lastUpdateElement) {
		const now = new Date();
		const timeOptions = {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			timeZone: 'America/Sao_Paulo'
		};
		lastUpdateElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
	}

	function updateServiceStatus() {
		const services = document.querySelectorAll('.service');
		services.forEach(service => {
			const statusDot = service.querySelector('.status-dot');
			if (statusDot) {
				statusDot.style.backgroundColor = '#2ecc71';
				statusDot.style.boxShadow = '0 0 10px rgba(46, 204, 113, 0.5)';
			}
		});
	}

	const serviceCards = document.querySelectorAll('.service');
	serviceCards.forEach(card => {
		card.addEventListener('mouseenter', function() {
			this.style.transform = 'translateY(-10px) scale(1.03)';
		});

		card.addEventListener('mouseleave', function() {
			this.style.transform = 'translateY(-5px) scale(1.02)';
		});
	});

	function highlightActiveSection() {
		const sections = document.querySelectorAll('section');
		const navLinks = document.querySelectorAll('.nav-link');

		window.addEventListener('scroll', () => {
			let current = '';
			sections.forEach(section => {
				const sectionTop = section.offsetTop - 160;
				const sectionHeight = section.clientHeight;
				if (window.pageYOffset >= sectionTop &&
					window.pageYOffset < sectionTop + sectionHeight) {
					current = section.getAttribute('id');
				}
			});

			navLinks.forEach(link => {
				link.classList.remove('active');
				if (link.getAttribute('href') === `#${current}`) {
					link.classList.add('active');
				}
			});
		});
	}

	function typeWriter(element, text, speed = 100) {
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

	updateServiceStatus();
	highlightActiveSection();

	setTimeout(() => {
		document.body.classList.add('loaded');
	}, 500);

	console.log('🐳 Inception Static Website loaded successfully!');
	console.log('📊 Services monitored:', serviceCards.length);
});
