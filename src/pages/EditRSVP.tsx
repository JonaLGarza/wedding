import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RSVPForm, { RSVPFormData } from "../components/organisms/RSVPForm/RSVPForm";
import Confirmation from "../components/organisms/Confirmation/Confirmation";
import Heading from "../components/atoms/Heading/Heading";
import { Button } from "../components/atoms/Button/Button";
import { Helmet } from "react-helmet-async";

const EditRSVPPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RSVPFormData | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  useEffect(() => {
    // Mock API call to fetch RSVP data by code
    // In a real implementation, you would call your API here
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (code === "demo") {
          const mockData: RSVPFormData = {
            name: "John Smith",
            phone: "555-0123",
            attending: "yes",
            guestCount: 2,
          };
          setFormData(mockData);
        } else {
          setError("Invalid RSVP code. Please check and try again.");
        }
      } catch {
        setError("Failed to load RSVP data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [code]);
  
  const handleSubmit = (data: RSVPFormData) => {
    // Here you would typically update this data in your backend
    console.log("RSVP updated:", data);
    setFormData(data);
    setFormSubmitted(true);
  };
  
  const handleEdit = () => {
    setFormSubmitted(false);
  };
  
  const handleBackHome = () => {
    navigate("/");
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heading level={2}>Loading your RSVP...</Heading>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-6">
        <Heading level={2}>Error</Heading>
        {error && (
          <p className="text-lg text-[var(--brand-terracotta)]">{error}</p>
        )}
        <Button onClick={handleBackHome}>Back to Home</Button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Edit RSVP - Wedding Invitation</title>
        <meta name="description" content="Edit your RSVP for our wedding" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 space-y-8">
        <Heading level={1} className="text-center">Edit Your RSVP</Heading>
        
        {formSubmitted && formData ? (
          <Confirmation data={formData} onEdit={handleEdit} />
        ) : (
          <>
            {formData && <RSVPForm onSubmit={handleSubmit} />}
          </>
        )}
        
        <div className="text-center mt-10">
          <Button variant="outline" onClick={handleBackHome}>
            Back to Wedding Details
          </Button>
        </div>
      </div>
      
      <footer className="text-center py-10 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Wedding Couple. All rights reserved.
      </footer>
    </>
  );
};

export default EditRSVPPage; 