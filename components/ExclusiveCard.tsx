"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export interface ExclusiveContent {
  id: number;
  title: string;
  image: string;
  description: string;
}
export default function ExclusiveCard(content: ExclusiveContent) {
  return (
    <Box sx={{ maxWidth: 200 }}>
      <Card
        variant="outlined"
        sx={{
          bgcolor: "#BF8C93",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className="card-hover"
      >
        <React.Fragment>
          <CardContent>
            <h1 className="font-mono text-4xl text-white text-center py-4">
              {content.title ? content.title : "Title Render"}
            </h1>
            <Image
              src={content.image}
              alt="card image"
              width={100}
              height={100}
            />
          </CardContent>
          <CardActions>
            <IconButton
              sx={{
                backgroundColor: "#1976d2", // your theme color
                color: "#fff",
                width: 56,
                height: 56,
                "&:hover": {
                  backgroundColor: "#1565c0", // darker on hover
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
