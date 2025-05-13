import { exportToPdf } from "@/lib/utils/export-to-pdf";
import { Button } from "@mui/material";

interface ExportButtonProps {
  elementId: string;
  filename: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ elementId, filename }) => {
  const handleExport = () => {
    exportToPdf(elementId, filename);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleExport}
      sx={{ mt: 2 }}
    >
      Exportar a PDF
    </Button>
  );
};

export default ExportButton;
