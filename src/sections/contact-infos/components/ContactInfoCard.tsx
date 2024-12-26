import React from "react";
import { ContactInfo, ContactInfoDetails } from "@/lib/types/contactInfo";
import { Card } from "@mui/material";
import ContactInfoDetailsContent from "./ContactInfoDetailsContent";

interface Props {
  data: ContactInfo | ContactInfoDetails;
}

export default function ContactInfoCard({ data: contactInfo }: Props) {
  return (
    <Card 
      elevation={1} 
      sx={{ 
        mb: 2, 
        borderRadius: 2, 
        overflow: "hidden", 
        height: "100%", 
        display: "flex", 
        flexDirection: "column" 
      }}
    >
      <ContactInfoDetailsContent contactInfo={contactInfo} />
    </Card>
  );
}

