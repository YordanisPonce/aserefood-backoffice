import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { ContactInfoDetails } from "@/lib/types/contactInfo";
import { OrderDetails } from "@/lib/types/order";
import { generateOrderPdf } from "@/lib/utils/generateOrderPdf";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";

interface ExportButtonProps {
  elementId: string;
  filename: string;
  orderDetails: OrderDetails;
  contactInfo: ContactInfoDetails;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  orderDetails,
  contactInfo,
}) => {
  const [loading, setLoading] = useState(false);
  const { openSnackBar } = useSnackBar();

  const handleExport = async () => {
    setLoading(true);
    try {
      console.log("orderDetails", orderDetails);
      console.log("contactInfo", contactInfo);

      await generateOrderPdf(orderDetails, contactInfo);
      openSnackBar(`PDF exportado correctamente`, "success");
    } catch (error) {
      openSnackBar(`Error al exportar PDF`, "warning");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleExport}
      sx={{ mt: 2 }}
    >
      {loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        "Exportar a PDF"
      )}
    </Button>
  );
};

export default ExportButton;
