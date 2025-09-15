import { Button } from '@mui/material'
import React from 'react'

export default function Buttons({pointer, setPointer, handleSubmit}) {
  return (
    <div className="flex gap-[15px] justify-end">

      {pointer != 0 &&
        <Button
        variant="contained"
        sx={{
          padding: "10px 40px",
          borderRadius: "12px",
          backgroundColor: "#5978FF",
            color: "white",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { backgroundColor: "#4765e0" },
          }}
          onClick={() => setPointer(pointer > 2 ? pointer - 2 : pointer -1)}
          
          >
          Back
        </Button>
  }

        <Button
        variant="contained"
          sx={{
            padding: "10px 40px",
            borderRadius: "12px",
            backgroundColor: "#5978FF",
            border: "2px solid #5978FF",
            color: "white",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { backgroundColor: "#4765e0", borderColor: "#4765e0" },
          }}
          onClick={handleSubmit}
          
        >
          {pointer >= 2 ? "Submit" : "Next"}

        </Button>
      </div>
  )
}
