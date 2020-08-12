const heading = document.getElementById('heading')
const workoutWeekday = document.getElementById('workout');
const modal = document.getElementById('modal');
const showModal = document.getElementById('show-modal');
const closeModal = document.getElementById('close-modal');
const typeWorkout = document.getElementById('workout-type');
const workoutForm = document.getElementById('workout-form');
const typeExercise = document.getElementById('exercise');
const workoutWeekdaySelection = document.getElementById('weekdays');
const theExercises = document.getElementById('exercises'); 

let workoutWeek = []
let today = new Date();
let weekday;
let month;
let date;
let exercises = [];

// Initialize Weekday Objects to Local Storage
function initializeWeekdayObjects() {
    if (localStorage.getItem('workouts')) {
        workoutWeek = JSON.parse(localStorage.getItem('workouts'));
    }
    else {
        workoutWeek.push(
            {
                name: 'Sunday',
                workout: '',
                exercise: [],
            },
            {
                name: 'Monday',
                workout: '',
                exercise: [],
            },
            {
                name: 'Tuesday',
                workout: '',
                exercise: [],
            },
            {
                name: 'Wednesday',
                workout: '',
                exercise: [],
            },
            {
                name: 'Thursday',
                workout: '',
                exercise: [],
            },
            {
                name: 'Friday',
                workout: '',
                exercise: [],
            },
            {
                name: 'Saturday',
                workout: '',
                exercise: [],
            },
        )
        localStorage.setItem('workouts', JSON.stringify(workoutWeek));
    }
    displayExercises();
}

// Converts Number to String of Month
function createMonth(monthNumber) {
    if(monthNumber === 0){
        month = 'January';
    }
    if(monthNumber === 1){
        month = 'February';
    }
    if(monthNumber === 2){
        month = 'March';
    }
    if(monthNumber === 3){
        month = 'April';
    }
    if(monthNumber === 4){
        month = 'May';
    }
    if(monthNumber === 5){
        month = 'June';
    }
    if(monthNumber === 6){
        month = 'July';
    }
    if(monthNumber === 7){
        month = 'August';
    }
    if(monthNumber === 8){
        month = 'September';
    }
    if(monthNumber === 9){
        month = 'October';
    }
    if(monthNumber === 10){
        month = 'November';
    }
    if(monthNumber === 11){
        month = 'December';
    }
}

// Converts Number to String of Weekday
function createWeekDay(day) {
    if(day === 0){
        weekday = 'Sunday';
    }
    if(day === 1){
        weekday = 'Monday';
    }
    if(day === 2){
        weekday = 'Tuesday';
    }
    if(day === 3){
        weekday = 'Wednesday';
    }
    if(day === 4){
        weekday = 'Thursday';
    }
    if(day === 5){
        weekday = 'Friday';
    }
    if(day === 6){
        weekday = 'Saturday';
    }
}

// Modal Event Listeners
showModal.addEventListener('click', () => modal.classList.add('show-modal'));
closeModal.addEventListener('click', () => modal.classList.remove('show-modal'));


// Set The Heading to the Correct Date
function setHeading() {
    createMonth(today.getMonth());
    date = today.getDate();
    heading.textContent = `Workout Champ, ${month} ${date}`;
}

// Set the Workout Heading to the Correct weekday
function setWorkoutWeekday() {
    createWeekDay(today.getDay());
    workoutWeek = JSON.parse(localStorage.getItem('workouts'));
    let typeOfWorkout = "Today's Workout";
    for (i = 0; i < workoutWeek.length; i++) {
        if(workoutWeek[i].name === weekday){
            typeOfWorkout = workoutWeek[i].workout;
        }
    }
    workoutWeekday.textContent = `${weekday}: ${typeOfWorkout}`;
}

// Handle Data from Form
function storeWorkout(e){
    e.preventDefault();
    workoutWeek = JSON.parse(localStorage.getItem('workouts'));
    if (workoutWeek[today.getDay()].exercise.length === 0){
        theExercises.removeChild(theExercises.firstChild);
    }
    const workoutValue = typeWorkout.value;
    const exercise = typeExercise.value;
    const weekdayChoice = workoutWeekdaySelection.value;
    for (i = 0; i < workoutWeek.length; i++) {
        if(workoutWeek[i].name === weekdayChoice){
            workoutWeek[i].workout = workoutValue;
            workoutWeek[i].exercise.push(exercise);
        }
    }
    localStorage.setItem('workouts', JSON.stringify(workoutWeek));
    typeExercise.focus();
    setWorkoutWeekday();
    initializeWeekdayObjects();
}

// Display Workout
function displayExercises() {
    workoutWeek = JSON.parse(localStorage.getItem('workouts'));
    if (workoutWeek[today.getDay()].exercise.length === 0){
        if (theExercises.hasChildNodes()){
            theExercises.removeChild(theExercises.firstChild);
        }
        let exerciseItem = document.createElement('div');
        exerciseItem.classList.add('exercise');
        exerciseItem.textContent = "No exercises added yet, hit the button to get started!";
        theExercises.appendChild(exerciseItem);
    }
    else {
        theExercises.textContent = '';
        workoutWeek[today.getDay()].exercise.forEach(item => {
            let exerciseItem = document.createElement('div');
            exerciseItem.classList.add('exercise');
            exerciseItem.textContent = item;
            const closeIcon = document.createElement('i');
            closeIcon.classList.add('fas', 'fa-times', 'close-exercise-icon');
            closeIcon.setAttribute('title', 'Delete Exercise');
            closeIcon.setAttribute('onclick', `deleteExercise('${item}')`);
            exerciseItem.appendChild(closeIcon);
            theExercises.appendChild(exerciseItem);
        });
    }
}

// Delete Exercise
function deleteExercise(exercise){
    workoutWeek = JSON.parse(localStorage.getItem('workouts'));
    workoutWeek[today.getDay()].exercise.forEach((item, i) => {
        if (item === exercise){
            workoutWeek[today.getDay()].exercise.splice(i, 1);
        }
    });
    localStorage.setItem('workouts', JSON.stringify(workoutWeek));
    initializeWeekdayObjects();
}

// Event Listener
workoutForm.addEventListener('submit', storeWorkout);

// On Load
initializeWeekdayObjects();
setHeading();
setWorkoutWeekday();
