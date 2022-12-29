import React from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = "https://api.shrtco.de/v2/shorten";

function App() {
  const [links, setLinks] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const longLink = e.target.link.value;

    try {
      await axios.post(`${BASE_URL}?url=${longLink}`).then((response) => {
        const result = response.data.result;
        let shortlinks = [];
        shortlinks.unshift(result.short_link, result.short_link2);
        setLinks(shortlinks);
        if (response.data.ok) {
          setErrorMessage("");
        }
      });
    } catch (err) {
      setErrorMessage(err.response.data.error);
      setLinks([]);
    }
  }

  return (
    <div className="App">
      <h1>Link Shortener</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="link">URL 👇</label>
        <input type="text" name="link" id="link" placeholder="Input the URL" />
        <button type="submit">Shorten</button>
      </form>

      {links.length > 0 ? (
        <section className="card">
          😃
          <ul className="card-links">
            {links.map((link, index) => (
              <li key={`link${index}`}>
                Short URL {index === 0 ? " " : index + 1}: {link}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {errorMessage ? <p className="error">🙈 {errorMessage}</p> : null}
    </div>
  );
}

export default App;
