import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./AnalyseComp.css"; // Import external CSS for gradient and styling

export default function FinBERTSentiment() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const predictSentiment = async () => {
    if (!text.trim()) {
      setResult(
        '<p class="text-danger">Please enter text for sentiment analysis.</p>'
      );
      return;
    }

    setLoading(true);
    try {
      const response = await query({ inputs: text });

      if (response && Array.isArray(response[0])) {
        const formattedResult = response[0]
          .map(
            (item) =>
              `<p class="text-success">Sentiment: <strong>${
                item.label
              }</strong>, Score: <strong>${item.score.toFixed(2)}</strong></p>`
          )
          .join("");
        setResult(formattedResult);
      } else {
        setResult(
          '<p class="text-danger">Error processing sentiment analysis.</p>'
        );
      }
    } catch (error) {
      setResult(
        '<p class="text-danger">An error occurred while fetching sentiment analysis.</p>'
      );
    }
    setLoading(false);
  };

  const query = async (data) => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/ProsusAI/finbert",
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return response.json();
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg custom-gradient-card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            Sentiment Analysis with FinBERT
          </h2>

          <div className="mb-3">
            <textarea
              className="form-control custom-textarea"
              rows="5"
              placeholder="Enter text for sentiment analysis..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-center mb-3">
            <button
              className="btn btn-gradient"
              onClick={predictSentiment}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Predict Sentiment"}
            </button>
          </div>

          <div
            className="result-box mt-3"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </div>
      </div>
    </div>
  );
}
