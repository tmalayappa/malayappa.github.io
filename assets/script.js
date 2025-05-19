const gistUrl = 'https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        const tableContainer = document.getElementById('table-container');
        tableContainer.innerHTML = `<div class="text-red-500 text-center">Failed to load data. Please check your network connection.</div>`;
        const paginationContainer = document.getElementById('pagination-container');
        paginationContainer.innerHTML = ''; // Clear pagination
        throw error; // Re-throw to stop further processing
    }
}

function displayData(data, page = 1, limit = 10) {
    const tableBody = document.querySelector('.table-body');
    tableBody.innerHTML = ''; // Clear existing data
    const descriptionElement = document.getElementById('description');

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pageData = data.slice(startIndex, endIndex);

    if (pageData.length === 0 && page > 1) {
        displayData(data, page - 1, limit); // Go to the previous page
        return;
    }
    let totalPages = Math.ceil(data.length/limit);
    descriptionElement.textContent = `Page ${page} of ${totalPages}`;

    pageData.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'table-body-row';
        row.innerHTML = `
            <td class="table-body-cell">${item.id}</td>
            <td class="table-body-cell">${item.name}</td>
            <td class="table-body-cell email">${item.email}</td>
        `;
        tableBody.appendChild(row);
    });
}

function displayPagination(data, currentPage, limit = 10) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Clear existing pagination

    const totalPages = Math.ceil(data.length / limit);

    if (totalPages <= 1) return; // Don't show pagination if there's only one page

    const createButton = (text, page, isActive = false, isDisabled = false) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'pagination-button';
        if (isActive) {
            button.classList.add('active');
        }
        if (isDisabled) {
            button.classList.add('disabled');
        }

        if (!isDisabled) {
            button.addEventListener('click', () => {
                displayData(data, page, limit);
                displayPagination(data, page, limit);
            });
        }
        return button;
    };

    // "Previous" button
    const prevButton = createButton('Previous', Math.max(1, currentPage - 1), false, currentPage === 1);
    paginationContainer.appendChild(prevButton);

    // First page button, if not on first page
    if (currentPage > 3) {
        paginationContainer.appendChild(createButton('1', 1));
        if (currentPage > 4) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.className = 'dots';
            paginationContainer.appendChild(dots);
        }
    }

    // Display up to 5 page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
        endPage = Math.min(totalPages, 5);
    } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = createButton(String(i), i, i === currentPage);
        paginationContainer.appendChild(pageButton);
    }

    // Last page button, if not on last page
    if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.className = 'dots';
            paginationContainer.appendChild(dots);
        }
        paginationContainer.appendChild(createButton(String(totalPages), totalPages));
    }

    // "Next" button
    const nextButton = createButton('Next', Math.min(totalPages, currentPage + 1), false, currentPage === totalPages);
    paginationContainer.appendChild(nextButton);
}

async function initialize() {
    try {
        const data = await fetchData(gistUrl);
        displayData(data); // Initial display
        displayPagination(data, 1); // Initial pagination
        return true; // Indicate successful initialization
    } catch (error) {
        console.error("Initialization failed", error);
        return false; // Indicate failure
    }
}

// Test Suite
async function runTestSuite() {
    const testResultsContainer = document.getElementById('test-results');
    let testCount = 0;
    let passedCount = 0;

    const assert = (condition, description) => {
        testCount++;
        const result = condition ? 'pass' : 'fail';
        const message = `<p class="${result}">Test ${testCount}: ${description} - <b>${result}</b></p>`;
        testResultsContainer.insertAdjacentHTML('beforeend', message);
        if (condition) {
            passedCount++;
        }
    };

    // Mock data for testing (independent of the fetched data for unit tests)
    const mockData = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
        { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com' },
        { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com' },
        { id: 6, name: 'Eva Wilson', email: 'eva.wilson@example.com' },
        { id: 7, name: 'Frank Miller', email: 'frank.miller@example.com' },
        { id: 8, name: 'Grace Taylor', email: 'grace.taylor@example.com' },
        { id: 9, name: 'Henry Anderson', email: 'henry.anderson@example.com' },
        { id: 10, name: 'Isabella Martinez', email: 'isabella.martinez@example.com' },
        { id: 11, name: 'Jacob Robinson', email: 'jacob.robinson@example.com' },
        { id: 12, name: 'Sophia Clark', email: 'sophia.clark@example.com' },
        { id: 13, name: 'Daniel Rodriguez', email: 'daniel.rodriguez@example.com' },
        { id: 14, name: 'Mia Lopez', email: 'mia.lopez@example.com' },
        { id: 15, name: 'David Young', email: 'david.young@example.com' },
        { id: 16, name: 'Olivia King', email: 'olivia.king@example.com' },
        { id: 17, name: 'Joseph Wright', email: 'joseph.wright@example.com' },
        { id: 18, name: 'Emily Hall', email: 'emily.hall@example.com' },
        { id: 19, name: 'Michael Lewis', email: 'michael.lewis@example.com' },
        { id: 20, name: 'Natalie Hill', email: 'natalie.hill@example.com' },
    ];

    // Test case 1: Correct number of rows on the first page
    displayData(mockData, 1, 5);
    const firstPageRows = document.querySelectorAll('.table-body-row');
    assert(firstPageRows.length === 5, 'Test Case 1: Correct number of rows on the first page');

    // Test case 2: Correct data on the first row of the first page
    const firstRowFirstPage = firstPageRows[0];
    assert(firstRowFirstPage.querySelector('.table-body-cell:nth-child(1)').textContent === '1', 'Test Case 2: Correct ID on the first row of the first page');
    assert(firstRowFirstPage.querySelector('.table-body-cell:nth-child(2)').textContent === 'John Doe', 'Test Case 2: Correct name on the first row of the first page');
    assert(firstRowFirstPage.querySelector('.table-body-cell:nth-child(3)').textContent === 'john.doe@example.com', 'Test Case 2: Correct email on the first row of the first page');

    // Test case 3: Correct number of rows on the second page
    displayData(mockData, 2, 5);
    const secondPageRows = document.querySelectorAll('.table-body-row');
    assert(secondPageRows.length === 5, 'Test Case 3: Correct number of rows on the second page');

    // Test case 4: Correct data on the first row of the second page
    const firstRowSecondPage = secondPageRows[0];
    assert(firstRowSecondPage.querySelector('.table-body-cell:nth-child(1)').textContent === '6', 'Test Case 4: Correct ID on the first row of the second page');
    assert(firstRowSecondPage.querySelector('.table-body-cell:nth-child(2)').textContent === 'Eva Wilson', 'Test Case 4: Correct name on the first row of the second page');
    assert(firstRowSecondPage.querySelector('.table-body-cell:nth-child(3)').textContent === 'eva.wilson@example.com', 'Test Case 4: Correct email on the first row of the second page');

    // Test case 5: Correct number of rows on the last page
    displayData(mockData, 4, 5);
    const lastPageRows = document.querySelectorAll('.table-body-row');
    assert(lastPageRows.length === 5, 'Test Case 5: Correct number of rows on the last page');

    // Test case 6: Correct data on the last row of the last page
    const lastRowLastPage = lastPageRows[4];
    assert(lastRowLastPage.querySelector('.table-body-cell:nth-child(1)').textContent === '20', 'Test Case 6: Correct ID on the last row of the last page');
    assert(lastRowLastPage.querySelector('.table-body-cell:nth-child(2)').textContent === 'Natalie Hill', 'Test Case 6: Correct name on the last row of the last page');
    assert(lastRowLastPage.querySelector('.table-body-cell:nth-child(3)').textContent === 'natalie.hill@example.com', 'Test Case 6: Correct email on the last row of the last page');

    // Test case 7: Ensure pagination buttons are created
    displayPagination(mockData, 1, 5);
    const paginationButtons = document.querySelectorAll('.pagination-button');
    assert(paginationButtons.length > 0, 'Test Case 7: Pagination buttons are created');

    // Test case 8: Ensure "Previous" button is disabled on the first page
    displayPagination(mockData, 1, 5);
    const prevButtonFirstPage = document.querySelector('.pagination-button:first-child');
    assert(prevButtonFirstPage.classList.contains('disabled'), 'Test Case 8: Previous button is disabled on the first page');

    // Test case 9: Ensure "Next" button is disabled on the last page
    displayPagination(mockData, 4, 5);
    const nextButtonLastPage = document.querySelector('.pagination-button:last-child');
    assert(nextButtonLastPage.classList.contains('disabled'), 'Test Case 9: Next button is disabled on the last page');

    // Test case 10: Correct number of pages
    const calculatePages = Math.ceil(mockData.length / 5);
    assert(calculatePages === 4, 'Test Case 10: Correct number of pages');

    // Test case 11: Check if the title element exists
    const titleElement = document.getElementById('title');
    assert(titleElement !== null, 'Test Case 11: Check if the title element exists');

    // Test case 12: Check if the description element exists
    const descriptionElement = document.getElementById('description');
    assert(descriptionElement !== null, 'Test Case 12: Check if the description element exists');

    // Test case 13: Check if the table-responsive element exists
    const tableResponsiveElement = document.querySelector('.table-responsive');
    assert(tableResponsiveElement !== null, 'Test Case 13: Check if the table-responsive element exists');

    // Test case 14: Check if the table element has the class "table table-bordered"
    const tableElement = document.querySelector('table.table-bordered');
    assert(tableElement !== null, 'Test Case 14: Check if the table element has the class "table table-bordered"');

    console.log(`${passedCount} / ${testCount} tests passed`);
    const summary = `<p><b>${passedCount} / ${testCount} tests passed</b></p>`;
    testResultsContainer.insertAdjacentHTML('beforeend', summary);
}

initialize();
runTestSuite();
