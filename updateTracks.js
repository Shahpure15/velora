const fs = require('fs');
let code = fs.readFileSync('src/components/Tracks.jsx', 'utf8');

// Add useNavigate
code = code.replace(
  "import { motion, AnimatePresence } from 'framer-motion'",
  "import { motion, AnimatePresence } from 'framer-motion'\nimport { useNavigate } from 'react-router-dom'"
);

// Replace selectedTrack state with navigate
code = code.replace(
  "const [selectedTrack, setSelectedTrack] = useState(null)",
  "const navigate = useNavigate()"
);

// Update onClick
code = code.replace(
  /onClick=\{function \(\) \{ setSelectedTrack\(track\) \}\}/g,
  "onClick={() => navigate('/problems#' + track.id)}"
);

code = code.replace(
  /onClick=\{\(\) => setSelectedTrack\(track\)\}/g,
  "onClick={() => navigate('/problems#' + track.id)}"
);

// Remove the AnimatePresence modal block
code = code.replace(/<AnimatePresence>[\s\S]*?<\/AnimatePresence>/g, "");

fs.writeFileSync('src/components/Tracks.jsx', code);
