import { Card, CardContent, Box, Typography, Divider } from "@mui/material";
import Image from "next/image";

interface ProductRowProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function ProductRow({
  id,
  name,
  price,
  quantity,
  imageUrl = "/placeholder.svg?height=80&width=80",
}: ProductRowProps) {
  return (
    <Card
      sx={{
        marginBottom: "1.5rem",
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardContent sx={{ padding: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Box sx={{ flexShrink: 0 }}>
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "medium" }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ID: {id}
            </Typography>
          </Box>

          <Divider orientation="vertical" sx={{ height: "3rem", marginX: "0.5rem" }} />

          <Box sx={{ textAlign: "center", paddingX: "1rem" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Precio
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "semibold" }}>
              ${price.toFixed(2)}
            </Typography>
          </Box>

          <Divider orientation="vertical" sx={{ height: "3rem", marginX: "0.5rem" }} />

          <Box sx={{ textAlign: "center", paddingX: "1rem" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Cantidad
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "semibold" }}>
              {quantity}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

