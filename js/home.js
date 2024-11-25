var siteNameInput = document.getElementById('siteName');
var siteNameIcon = document.getElementById('siteNameIcon');
var urlInput = document.getElementById('urlInput');
var urlIcon = document.getElementById('urlIcon');
var submitButton = document.getElementById('submitButton');
var bookmarksList = [];

// Load bookmarks from localStorage on page load
if (localStorage.getItem("bookmark") !== null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmark"));
  display();
}

//-----------------------------URL Validation--------------------------------------
var urlPattern = /^https:\/\/[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|info|co)$/;

function validateSiteName() {
  if (siteNameInput.value.length >= 3) {
    siteNameIcon.className = 'validation-icon fas fa-check success-icon show-icon';
    siteNameInput.classList.remove('error');
    siteNameInput.classList.add('success');
    return true;
  } else {
    siteNameIcon.className = 'validation-icon fas fa-times error-icon show-icon';
    siteNameInput.classList.remove('success');
    siteNameInput.classList.add('error');
    return false;
  }
}

function validateURL() {
  if (urlPattern.test(urlInput.value)) {
    urlIcon.className = 'validation-icon fas fa-check success-icon show-icon';
    urlInput.classList.remove('error');
    urlInput.classList.add('success');
    return true;
  } else {
    urlIcon.className = 'validation-icon fas fa-times error-icon show-icon';
    urlInput.classList.remove('success');
    urlInput.classList.add('error');
    return false;
  }
}

siteNameInput.addEventListener('input', validateSiteName);
urlInput.addEventListener('input', validateURL);

//----------------------------Submit Button Event Listener------------------------
submitButton.addEventListener('click', function (event) {
  event.preventDefault();

  var isSiteNameValid = validateSiteName();
  var isURLValid = validateURL();

  if (isSiteNameValid && isURLValid) {
    addBookmark();
    alert('Bookmark added successfully');
  } else {
    let message = 'Please correct the following errors:\n';
    if (!isSiteNameValid) message += '- Site name must be at least 3 characters long.\n';
    if (!isURLValid) message += '- URL must start with "https://" and end with a valid domain (.com, .org, etc).\n';
    alert(message);
  }
});

//----------------------------Add Bookmark--------------------------------
function addBookmark() {
  var siteName = siteNameInput.value;
  var url = urlInput.value;
  var bookmark = { siteName, url };

  bookmarksList.push(bookmark);
  localStorage.setItem("bookmark", JSON.stringify(bookmarksList));
  display();
  setTimeout(() => {
    clearForm();
  }, 100);
}

//----------------------------Display------------------------------------
function display() {
  var container = '';
  for (var i = 0; i < bookmarksList.length; i++) {
    container += `<tr>
                    <td>${i + 1}</td>
                    <td>${bookmarksList[i].siteName}</td>
                    <td>
                      <button class="btn btn-success">
                        <i class="fa-solid fa-eye me-1"></i>
                        <a href="${bookmarksList[i].url}" target="_blank" class="text-decoration-none text-white">Visit</a>
                      </button>
                    </td>
                    <td>
                      <button onclick="deleteBookmark(${i})" class="btn btn-danger">Delete</button>
                    </td>
                  </tr>`;
  }
  document.getElementById('tableBody').innerHTML = container;
}

//----------------------------Clear Form and Reset Validation---------------------
function clearForm() {
  siteNameInput.value = '';
  urlInput.value = '';

  siteNameInput.classList.remove('error', 'success');
  urlInput.classList.remove('error', 'success');

  siteNameIcon.className = 'validation-icon';
  urlIcon.className = 'validation-icon';
}

//----------------------------Delete Bookmark--------------------------------------
function deleteBookmark(index) {
  bookmarksList.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmarksList));
  display();
}
