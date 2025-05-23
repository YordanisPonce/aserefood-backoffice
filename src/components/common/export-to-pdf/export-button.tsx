import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { exportToPdf } from "@/lib/utils/export-to-pdf";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";

interface ExportButtonProps {
  elementId: string;
  filename: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ elementId, filename }) => {
  const [loading, setLoading] = useState(false);
  const { openSnackBar } = useSnackBar();

  const handleExport = async () => {
    setLoading(true);
    try {
      await exportToPdf(elementId, filename);
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
