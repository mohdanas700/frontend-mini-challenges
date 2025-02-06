// Select important HTML elements
const container = document.querySelector('.post-container');
const loader = document.querySelector('.loader');
const endOfContentEl = document.querySelector('.end-of-content');
const errorEl = document.querySelector('.fetch-error');

// Local state variables to track pagination and fetching status
let startIndex = 0;
let endIndex = getNextPostsCount(startIndex);
let isFetching = false;
let isError = false;
let endOfContent = false;
let attempt = 0;
const MAX_RETRIES = 3; // Maximum retries for API failures

// Function to calculate the number of posts to fetch based on window height
function getNextPostsCount(start) {
  const postHeight = 90; // Approximate height of each post in pixels
  const newPostCount = Math.ceil(window.innerHeight / postHeight); // Calculate how many posts fit on screen
  return start + newPostCount;
}

// Function to add posts to the DOM
function addPosts(posts = []) {
  posts.forEach((post, index) => {
    const postContainer = document.createElement('div');
    postContainer.className = 'post';

    const postNumberEl = document.createElement('span');
    postNumberEl.className = 'post-number';
    postNumberEl.textContent = startIndex + index + 1; // Display post number

    const postContentEl = document.createElement('span');
    postContentEl.className = 'post-body';
    postContentEl.textContent = post.body; // Display post content

    postContainer.appendChild(postNumberEl);
    postContainer.appendChild(postContentEl);
    container.appendChild(postContainer);
  });
}

// Function to show 'End of Content' message
function showEndContent() {
  endOfContentEl.style.display = 'block';
}

// Function to show/hide error message
function toggleError(display) {
  errorEl.style.display = display;
}

// Function to show/hide loading indicator
function toggleLoader(loaderStatus) {
  loader.style.display = loaderStatus;
}

// Function to fetch posts from the API
function fetchPostsApi(start, end) {
  const url = `https://jsonplaceholder.typicode.com/posts?_start=${start}&_end=${end}`;
  isFetching = true;
  toggleError('none'); // Hide error message before fetching
  toggleLoader('block'); // Show loading indicator

  setTimeout(async () => {
    try {
      const res = await fetch(url);
      const posts = await res.json();

      // Check if fewer posts were returned than requested (indicates end of content)
      if (posts.length < end - start) {
        endOfContent = true; // Mark end of content
        toggleLoader('none'); // Hide loading indicator
        if (posts.length > 0) {
          addPosts(posts); // Add remaining posts
        }
        showEndContent(); // Show end of content message
      } else {
        addPosts(posts); // Add fetched posts
        startIndex = end; // Update start index for next fetch
        endIndex = getNextPostsCount(startIndex); // Calculate next batch size
      }
      attempt = 0; // Reset retry attempt counter
      isError = false; // Reset error flag
    } catch (err) {
      console.log(err); // Log error

      attempt++; // Increment retry counter
      const renderedPosts = document.getElementsByClassName('post').length;

      // If max retries exceeded, show error message
      if (attempt > MAX_RETRIES) {
        toggleError('block');
        isError = true;
      } else if (renderedPosts === 0) {
        // If no posts have been rendered, retry fetching
        fetchPostsApi(start, end);
      }
      toggleLoader('none'); // Hide loading indicator
    } finally {
      isFetching = false; // Mark fetching as complete
    }
  }, 500); // Simulate slight delay before fetching
}

// Fetch initial set of posts on page load
fetchPostsApi(startIndex, endIndex);

// Function to check scroll position and fetch more posts if needed
function checkAndGetPosts() {
  if (isFetching || endOfContent || isError) return; // Stop if already fetching or at end of content
  const scrolledHeight = Math.ceil(window.innerHeight + window.scrollY);
  const docOffset = window.document.body.offsetHeight - 36;
  if (scrolledHeight >= docOffset) {
    fetchPostsApi(startIndex, endIndex); // Fetch more posts if user scrolled to bottom
  }
}

// Listen for scroll event to trigger fetching more posts
window.addEventListener('scroll', checkAndGetPosts);

// Listen for window resize event to adjust post calculations
window.addEventListener('resize', checkAndGetPosts);
