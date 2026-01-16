import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <Card className="w-full max-w-md text-center">
        {/* Illustration */}
        <div className="mb-6 flex justify-center">
          <svg width="140" height="140" viewBox="0 0 512 512" aria-hidden>
            <circle
              cx="256"
              cy="256"
              r="220"
              fill="#f5f5f5"
              stroke="#000"
              strokeOpacity="0.1"
              strokeWidth="8"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".35em"
              fontSize="120"
              fill="#000"
              opacity="0.6"
              fontFamily="system-ui, sans-serif"
            >
              404
            </text>
          </svg>
        </div>

        {/* Text */}
        <h1 className="mb-2 text-2xl font-semibold text-black">
          Page not found
        </h1>
        <p className="mb-6 text-sm text-black/60">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* Action */}
        <Button size="lg" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Card>
    </div>
  );
}
