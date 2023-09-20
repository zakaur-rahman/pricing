
document.addEventListener('DOMContentLoaded', function () {
    var userSlider = document.getElementById('userSlider');
    var cards = document.querySelectorAll('.card');

    if (cards.length > 0) {
        cards[0].classList.add('highlight');
    }

    userSlider.addEventListener('input', function () {
        var selectedUsers = parseInt(userSlider.value);
        var highlightedPlanIndex;

        if (selectedUsers >= 0 && selectedUsers <= 10) {
            highlightedPlanIndex = 1;
        } else if (selectedUsers >= 11 && selectedUsers <= 20) {
            highlightedPlanIndex = 2;
        } else if (selectedUsers >= 21 && selectedUsers <= 30) {
            highlightedPlanIndex = 3;
        } else {
            highlightedPlanIndex = 0;
        }

        cards.forEach(function (card) {
            card.classList.remove('highlight');
        });

        if (highlightedPlanIndex > 0) {
            cards[highlightedPlanIndex - 1].classList.add('highlight');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var submitBtn = document.getElementById('submitBtn');


    submitBtn.addEventListener('click', async function () {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('comments').value;


        const formData = new FormData();
        formData.append('firstname', name);
        formData.append('email', email);
        formData.append('message', message);

        console.log(formData)

        try {
            const response = await fetch('https://forms.maakeetoo.com/formapi/630', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Form submitted successfully.');
            } else {
                console.error('Form submission failed.');
            }
        } catch (error) {
            console.error('An error occurred while submitting the form:', error);
        }
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('comments').value = '';

        $('#myModal').modal('hide');
    });
});

//lazy loader
let page = 1;
let isLoading = false;
var resultsContainer
var resultList
var loadingIndicator
var spinner;

document.addEventListener('DOMContentLoaded', function () {
    resultsContainer = document.getElementById('results');
    resultList = document.getElementById('result-list');
    loadingIndicator = document.getElementById("spinner");

    spinner = document.createElement('img');
    spinner.src = 'spinner.gif';
    spinner.width = 50;
    spinner.height = 50;
    spinner.className = 'spinner-img'
});

// Function to fetch more results
function fetchMoreResults() {

    isLoading = true;
    isLoading ? loadingIndicator.appendChild(spinner): null
     
   
    const apiUrl = `https://api.pexels.com/v1/search?query=nature&page=${page}&per_page=6`;
    const headers = {
        'Authorization': 'f3Nye7wY1gV0ceSj8xGg1LDlkDFdGChscsAF46x1Q7lz1oTrjOvRBNMt'
    }

    fetch(apiUrl, {
        method: 'GET',
        headers: headers,
    })
        .then((response) => response.json())
        .then((data) => {
          //  console.log('Data:',data);
            setTimeout(() => {
                
                data.photos.forEach((result) => {
                    const listItem = document.createElement('img');
                    listItem.src = result.src.medium;
                    listItem.width = 280;
                    listItem.height = 360;  
                    resultList.appendChild(listItem);
                });

                isLoading = false;
                spinner.style.display = "none";
                page++; 
            }, 1000); // Simulated delay (remove in production)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            isLoading = false;
            spinner.style.display = "none";
        });
}



// Event listener for scrolling
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;

    console.log("scrollTop: ", scrollTop);
    console.log("windowHeight: ", windowHeight);
    console.log("documentHeight: ", documentHeight);

    if (scrollTop + windowHeight >= documentHeight) {
        spinner.style.display = "block";
        fetchMoreResults();
    }
});
