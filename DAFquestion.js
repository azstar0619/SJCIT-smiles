document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('questionnaire-form');

    if (!form) {
        console.error('Form not found! Check your HTML and form ID.');
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Form submission started');

        // Collect all range slider values
        const rangeInputs = document.querySelectorAll('input[type="range"]');
        
        // Map the range input values from 0-10 to 1-10
        const responses = Array.from(rangeInputs).map(input => {
            // Map the value from 0-10 to 1-10
            const sliderValue = parseInt(input.value, 10);
            if (sliderValue == 0) {
                return 1; // Map 0 to 1
            } else if (sliderValue == 10) {
                return 10; // Map 10 to 10
            } else {
                return sliderValue + 0; // Map other values from 1 to 9
            }
        });

        // Print all slider values (mapped from 0-10 to 1-10)
        console.log('Mapped Slider values (1-10):', responses);

        // Calculate GAF
        const result = calculateGAF(responses);
        if (result) {
            console.log('GAF Score Calculation:');
            console.log(`Average Score: ${result.averageScore}`);
            console.log(`Mapped GAF Score: ${result.gafScore}`);
        } else {
            console.error('Invalid responses. Please check the sliders.');
        }

        // Redirect to main.html after submission
        window.location.href = 'main.html';
    });
});

// GAF Calculation Function
function calculateGAF(responses) {
    if (responses.length !== 10) {
        console.error("Invalid number of responses. Please provide 10 responses.");
        return null;
    }
    const totalScore = responses.reduce((sum, value) => sum + value, 0);
    const averageScore = totalScore / responses.length;

    let gafScore;
    if (totalScore >= 91) gafScore = "Superior functioning (91-100)";
    else if (totalScore >= 81) gafScore = "Minimal symptoms or good functioning (81-90)";
    else if (totalScore >= 71) gafScore = "Slight symptoms or some difficulty (71-80)";
    else if (totalScore >= 61) gafScore = "Mild symptoms or some difficulty (61-70)";
    else if (totalScore >= 51) gafScore = "Moderate symptoms or moderate difficulty (51-60)";
    else if (totalScore >= 41) gafScore = "Serious symptoms or impairment (41-50)";
    else if (totalScore >= 31) gafScore = "Major impairment (31-40)";
    else if (totalScore >= 21) gafScore = "Severe impairment (21-30)";
    else if (totalScore >= 11) gafScore = "Very severe impairment (11-20)";
    else if (totalScore >= 1) gafScore = "Persistent danger or unable to care for self (1-10)";
    else totalScore = "Invalid score";

    return {
        averageScore: averageScore,
        gafScore: gafScore
    };
}
