import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  IconButton,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";



export default function CompanyInternshipModal({ open, onClose, company }) {
  const c = {
    name: "—",
    internship: {
      title: "—",
      sector: "—",
      area: "—",
      opportunities: 0,
      candidates: 0,
    },
    description: "",
    location: {
      state: "—",
      district: "—",
      village: "—",
      zipcode: "—",
    },
    qualification: {
      minQualification: "—",
      course: "—",
      certification: "—",
      specialization: "—",
      skills: [],
    },
    ...company,
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">{c.name}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Internship details
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Internship Details */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            width: "100%",
            height: "30px",
            textAlign: "center",
            background: "linear-gradient(135deg, #c7d2fe, #ddd6fe)", 
            color: "#333",
            fontWeight: 600,
            alignContent: "center",
          }}
        >
          Internship
        </Typography>
        <Grid container spacing={4} sx={{ mb: 2, gap: 20, mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Title:</strong> {c.internship.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Sector:</strong> {c.internship.sector}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Area / Field:</strong> {c.internship.area}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Opportunities:</strong> {c.internship.opportunities}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Number of Candidates:</strong> {c.internship.candidates}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 1 }} />

        {/* Description */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            width: "100%",
            height: "30px",
            textAlign: "center",
            background: "linear-gradient(135deg, #c7d2fe, #ddd6fe)", // light indigo → light purple
            color: "#333",
            fontWeight: 600,
            alignContent: "center",
          }}
        >
          Description
        </Typography>
        <Typography
          variant="body2"
          paragraph
          sx={{ whiteSpace: "pre-wrap", mt: 2 }}
        >
          {c.description || "No description provided."}
        </Typography>

        <Divider sx={{ my: 1 }} />

        {/* Location */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            width: "100%",
            height: "30px",
            textAlign: "center",
            background: "linear-gradient(135deg, #c7d2fe, #ddd6fe)",
            color: "#333",
            fontWeight: 600,
            alignContent: "center",
          }}
        >
          Location
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2, gap: 20, mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>State:</strong> {c.location.state}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>District:</strong> {c.location.district}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Village:</strong> {c.location.village}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Zipcode:</strong> {c.location.zipcode}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 1 }} />

        {/* Qualification */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            width: "100%",
            height: "30px",
            textAlign: "center",
            background: "linear-gradient(135deg, #c7d2fe, #ddd6fe)", 
            color: "#333",
            fontWeight: 600,
            alignContent: "center",
          }}
        >
          Qualification Details
        </Typography>
        <Grid container spacing={2} sx={{ mb: 1, mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Minimum Qualification:</strong>{" "}
              {c.qualification.minQualification}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Course:</strong> {c.qualification.course}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Certification:</strong> {c.qualification.certification}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Specialization:</strong> {c.qualification.specialization}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Required Skills:</strong>
            </Typography>

            <Box
              sx={{
                // marginLeft: "30px",
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                flexDirection: "row",
              }}
            >
              {(c.qualification.skills || []).length ? (
                c.qualification.skills.map((s, idx) => (
                  <Typography
                    sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                  >
                    • {s}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No skills listed.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* small footer info */}
        <Divider sx={{ my: 1 }} />
        <Typography variant="caption" color="text.secondary">
          Last updated:{" "}
          {c.updatedAt ? new Date(c.updatedAt).toLocaleString() : "—"}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "row ",
          gap: 3,
        }}
      >
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          onClick={() => {
            if (typeof company?.onApply === "function") company.onApply();
            onClose();
          }}
          sx={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",

            color: "white",
            p: 1,
            borderRadius: 2,
            minWidth: "100px",
            maxWidth: "150px",
            minHeight: "35px",
            maxHeight: "55px",
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CompanyInternshipModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  company: PropTypes.object,
};


export function ExampleUsage() {
  const [open, setOpen] = React.useState(false);

  const sampleCompany = {
    name: "NextGen Labs Pvt Ltd",
    internship: {
      title: "Frontend Intern (React)",
      sector: "Software / IT",
      area: "Web Development",
      opportunities: 4,
      candidates: 40,
    },
    description:
      "Work on modern React applications building components, pages and integrations.\nYou will collaborate with the design team and backend engineers.\nGain hands-on experience with APIs and deployment.\nMentorship and code reviews provided weekly.\nStipend and certificate on successful completion.",
    location: {
      state: "Karnataka",
      district: "Bengaluru Urban",
      village: "Jalahalli",
      zipcode: "560013",
    },
    qualification: {
      minQualification: "Undergraduate",
      course: "B.Tech / B.E / B.Sc (CS)",
      certification: "Any relevant certification is a plus",
      specialization: "Computer Science / IT",
      skills: ["React", "JavaScript", "HTML/CSS", "Git"],
    },
    updatedAt: new Date().toISOString(),
    onApply: () => {
      alert("Apply clicked — integrate your flow here");
    },
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open internship modal
      </Button>

      <CompanyInternshipModal
        open={open}
        onClose={() => setOpen(false)}
        company={sampleCompany}
      />
    </div>
  );
}

