let users = [];

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    users = data;
    displayUsers();
  })
  .catch(error => console.error(error));

function displayUsers() {
  const userList = document.getElementById('user-list');

  users.forEach(user => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = user.name;
    button.addEventListener('click', () => {
      window.location.href = `user.html?id=${user.id}`;
    });
    li.appendChild(button);
    userList.appendChild(li);
  });
}
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

if (userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      displayUser(user);
    })
    .catch(error => console.error(error));
}

function displayUser(user) {
  const userDetails = document.getElementById('user-details');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  
  const row1 = createTableRow('Name', user.name);
  const row2 = createTableRow('Username', user.username);
  const row3 = createTableRow('Email', user.email);
  const row4 = createTableRow('Phone', user.phone);
  const row5 = createTableRow('Website', user.website);
  const row6 = createTableRow('Address', formatAddress(user.address));
  const row7 = createTableRow('Company', user.company.name);

  tbody.appendChild(row1);
  tbody.appendChild(row2);
  tbody.appendChild(row3);
  tbody.appendChild(row4);
  tbody.appendChild(row5);
  tbody.appendChild(row6);
  tbody.appendChild(row7);
  
  table.appendChild(tbody);
  userDetails.appendChild(table);

  const loadPostsBtn = document.getElementById('load-posts-btn');
  loadPostsBtn.addEventListener('click', () => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
      .then(response => response.json())
      .then(posts => {
        displayPosts(posts);
      })
      .catch(error => console.error(error));
  });
}

function createTableRow(label, value) {
  const row = document.createElement('tr');
  const labelCell = document.createElement('td');
  labelCell.textContent = label;
  const valueCell = document.createElement('td');
  valueCell.textContent = value;
  row.appendChild(labelCell);
  row.appendChild(valueCell);
  return row;
}

function formatAddress(address) {
  return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
}

function displayPosts(posts) {
  const userPosts = document.getElementById('user-posts');
  const postList = document.createElement('ul');
  postList.style.listStyleType = 'none';
  posts.forEach(post => {
    const postItem = document.createElement('li');
    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    const postBody = document.createElement('p');
    postBody.textContent = post.body;
    postItem.appendChild(postTitle);
    postItem.appendChild(postBody);
    postList.appendChild(postItem);
  });
  userPosts.appendChild(postList);

  const loadPostsBtn = document.getElementById('load-posts-btn');
  loadPostsBtn.style.display = 'none';
}
