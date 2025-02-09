export default function ErrorComp() {
  return (
    <div className="error-container">
      <h2>404 Error: Page Not Found</h2>
      <p>
        Oops! The URL you entered does not exist. Please check the URL and try
        again.
      </p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}
