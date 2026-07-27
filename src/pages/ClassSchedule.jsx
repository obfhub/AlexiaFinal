import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ClassSchedule() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to contact page instead of showing class schedule
    navigate("/contact");
  }, [navigate]);

  return null;
}