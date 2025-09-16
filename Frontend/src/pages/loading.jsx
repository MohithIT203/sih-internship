import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import "./loading.css"; // import our custom CSS
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev === 100) navigate("/dashboard");
        return prev + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="card">
        <div className="card-content">
          <div className="icon-pulse">
            <Brain className="icon" />
          </div>
          <h3 className="title">Analyzing Your Profile</h3>
          <p className="subtitle">
            Our AI is finding the perfect internship matches for you...
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="progress-text">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
