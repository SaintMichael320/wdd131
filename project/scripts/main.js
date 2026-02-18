// FitXcel Website JavaScript
// This file includes all required JavaScript functionality

// ==================== OBJECTS ====================
// User object to store user information
const userData = {
    name: '',
    email: '',
    program: '',
    fitnessLevel: '',
    lastVisit: null,
    preferences: {}
};

// Program object with details
const programs = [
    {
        id: 1,
        name: 'Strength Training',
        description: 'Build muscle mass and increase overall strength',
        duration: '12 weeks',
        level: 'Beginner to Advanced'
    },
    {
        id: 2,
        name: 'Fat Loss',
        description: 'Burn fat and improve cardiovascular health',
        duration: '8 weeks',
        level: 'All levels'
    },
    {
        id: 3,
        name: 'Athletic Performance',
        description: 'Enhance speed, agility, and sport-specific skills',
        duration: '10 weeks',
        level: 'Intermediate to Advanced'
    }
];

// ==================== ARRAYS AND ARRAY METHODS ====================
// Fitness tips array
const fitnessTips = [
    'Stay hydrated - drink at least 8 glasses of water daily',
    'Get 7-9 hours of quality sleep each night',
    'Include protein in every meal for muscle recovery',
    'Warm up before workouts and cool down after',
    'Progressive overload - gradually increase workout intensity',
    'Listen to your body and rest when needed'
];

// ==================== FUNCTIONS ====================

// Function 1: Load user data from localStorage
function loadUserData() {
    const savedData = localStorage.getItem('fitxcelUser');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        userData.name = parsedData.name;
        userData.email = parsedData.email;
        userData.program = parsedData.program;
        userData.fitnessLevel = parsedData.fitnessLevel;
        userData.lastVisit = parsedData.lastVisit;
        
        // Display welcome message if user exists
        displayWelcomeMessage(userData.name);
    }
}

// Function 2: Save user data to localStorage
function saveUserData(name, email, program, fitnessLevel) {
    userData.name = name;
    userData.email = email;
    userData.program = program;
    userData.fitnessLevel = fitnessLevel;
    userData.lastVisit = new Date().toISOString();
    
    // Save to localStorage using template literal for the key
    localStorage.setItem('fitxcelUser', JSON.stringify(userData));
    
    // Show success message
    return `Welcome ${name}! Your information has been saved.`;
}

// Function 3: Display welcome message
function displayWelcomeMessage(name) {
    const welcomeDiv = document.querySelector('.welcome-message');
    if (welcomeDiv && name) {
        // Using template literal
        welcomeDiv.innerHTML = `<strong>Welcome back, ${name}!</strong> Ready to continue your fitness journey?`;
        welcomeDiv.style.display = 'block';
    }
}

// Function 4: Calculate BMI
function calculateBMI(weight, height, unit) {
    let bmi;
    
    // Conditional branching based on unit
    if (unit === 'metric') {
        // height in cm, weight in kg
        const heightInMeters = height / 100;
        bmi = weight / (heightInMeters * heightInMeters);
    } else {
        // height in inches, weight in lbs
        bmi = (weight / (height * height)) * 703;
    }
    
    return bmi.toFixed(1);
}

// Function 5: Get BMI category
function getBMICategory(bmi) {
    const bmiValue = parseFloat(bmi);
    
    // Conditional branching
    if (bmiValue < 18.5) {
        return 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
        return 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}

// Function 6: Display BMI results
function displayBMIResults(bmi, category) {
    const resultDiv = document.querySelector('.calculator-result');
    if (resultDiv) {
        // Using template literal for HTML output
        resultDiv.innerHTML = `
            <h3>Your BMI Results</h3>
            <p style="font-size: 2em; font-weight: bold; color: #E74C3C;">${bmi}</p>
            <p style="font-size: 1.2em;">Category: ${category}</p>
        `;
        resultDiv.style.display = 'block';
        
        // Save to localStorage
        localStorage.setItem('lastBMI', JSON.stringify({ bmi, category, date: new Date().toISOString() }));
    }
}

// Function 7: Display programs using array method
function displayPrograms() {
    const container = document.getElementById('programs-container');
    if (!container) return;
    
    // Using array method (forEach) and template literals
    container.innerHTML = '';
    programs.forEach(program => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-icon">💪</div>
            <h3>${program.name}</h3>
            <p>${program.description}</p>
            <p><strong>Duration:</strong> ${program.duration}</p>
            <p><strong>Level:</strong> ${program.level}</p>
        `;
        container.appendChild(card);
    });
}

// Function 8: Display fitness tips using array method
function displayFitnessTips() {
    const container = document.getElementById('tips-container');
    if (!container) return;
    
    // Using array method (map) and template literals
    const tipsHTML = fitnessTips.map(tip => `<li>${tip}</li>`).join('');
    container.innerHTML = `<ul class="tips-list">${tipsHTML}</ul>`;
}

// Function 9: Validate form
function validateForm(formData) {
    const errors = [];
    
    // Conditional validation
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!formData.email || !formData.email.includes('@')) {
        errors.push('Valid email is required');
    }
    
    if (!formData.program) {
        errors.push('Please select a program');
    }
    
    return errors;
}

// Function 10: Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        program: form.querySelector('#program').value,
        fitnessLevel: form.querySelector('#fitness-level').value,
        message: form.querySelector('#message').value
    };
    
    // Validate
    const errors = validateForm(formData);
    
    // Conditional branching
    if (errors.length > 0) {
        // Show errors using template literal
        alert(`Please fix the following errors:\n${errors.join('\n')}`);
        return;
    }
    
    // Save data
    const successMessage = saveUserData(
        formData.name, 
        formData.email, 
        formData.program, 
        formData.fitnessLevel
    );
    
    // Show success
    const successDiv = document.querySelector('.form-success');
    if (successDiv) {
        successDiv.textContent = successMessage;
        successDiv.style.display = 'block';
    }
    
    // Reset form
    form.reset();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== DOM MANIPULATION & EVENT LISTENERS ====================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Load saved user data
    loadUserData();
    
    // Display programs on home page
    displayPrograms();
    
    // Display fitness tips
    displayFitnessTips();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Contact form event listener
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // BMI Calculator event listener
    const bmiForm = document.getElementById('bmi-calculator');
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            const unit = document.getElementById('unit').value;
            
            // Conditional validation
            if (!weight || !height) {
                alert('Please enter both weight and height');
                return;
            }
            
            const bmi = calculateBMI(weight, height, unit);
            const category = getBMICategory(bmi);
            displayBMIResults(bmi, category);
        });
    }
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Dynamic year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Button hover effects - DOM manipulation
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Program card click tracking
    const programCards = document.querySelectorAll('.card');
    programCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Save clicked program to localStorage
            const clickData = {
                programIndex: index,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('lastClickedProgram', JSON.stringify(clickData));
            
            // Using template literal
            console.log(`User clicked on program: ${programs[index]?.name || 'Unknown'}`);
        });
    });
});


// Function to clear all saved data
function clearUserData() {
    if (confirm('Are you sure you want to clear all saved data?')) {
        localStorage.clear();
        location.reload();
    }
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateBMI,
        getBMICategory,
        saveUserData,
        validateForm
    };
}