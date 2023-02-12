// 3. Async/Await
async function helloworld(URL) {
  return await fetch(URL)
    .then((response) => response.text())
    .then((data) => data)
    .catch((error) => error);
}

helloworld("https://jsonplaceholder.typicode.com/posts/1").then(
  (data) => (document.getElementById("url-response").innerText = data)
);
