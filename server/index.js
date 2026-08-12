const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all requests (crucial for local React dev)
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');
const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json');

// Helper to read miracles data
const getMiraclesData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading miracles data:', error);
    return [];
  }
};

// API route to get all miracles
app.use('/api/miracles', (req, res) => {
  const data = getMiraclesData();
  res.json(data);
});

// API route to get scientific summary metrics
app.get('/api/science-summary', (req, res) => {
  const summary = {
    bloodType: "AB (Universal Recipient)",
    tissueType: "Human Myocardium (Heart Muscle)",
    stateOfTissue: "Living state with white blood cells, showing severe stress/agony",
    preservation: "Preserved for centuries (e.g. Lanciano: 1200+ years, Siena: 290+ years) without decay or preservatives"
  };
  res.json(summary);
});

// API route to receive user inquiries
app.post('/api/inquiries', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const newInquiry = {
    id: Date.now().toString(),
    name,
    email,
    subject: subject || 'General Veneration Inquiry',
    message,
    timestamp: new Date().toISOString()
  };

  try {
    let inquiries = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      const existingData = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      inquiries = JSON.parse(existingData || '[]');
    }
    inquiries.push(newInquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf8');
    res.status(201).json({ message: 'Thank you. Your inquiry has been received.', inquiry: newInquiry });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ error: 'An error occurred while saving your inquiry.' });
  }
});

// Serve frontend in production (optional hook)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Copy generated images to the client public folder if they exist
const copyGeneratedAssets = () => {
  const artifactDir = 'C:\\Users\\Abel\\.gemini\\antigravity-ide\\brain\\943b1317-db51-4200-9089-7e5ea5e65fc1';
  const destDir = path.join(__dirname, '../client/public');

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  try {
    const files = fs.readdirSync(artifactDir);
    const monstranceFile = files.find(f => f.startsWith('monstrance_eucharist_widescreen_outpaint_') && f.endsWith('.png')) ||
                           files.find(f => f.startsWith('monstrance_eucharist_16_9_') && f.endsWith('.png')) || 
                           files.find(f => f.startsWith('monstrance_eucharist_') && f.endsWith('.png'));
    const jesusFile = files.find(f => f.startsWith('jesus_face_widescreen_outpaint_') && f.endsWith('.png')) ||
                      files.find(f => f.startsWith('jesus_face_16_9_') && f.endsWith('.png')) ||
                      files.find(f => f.startsWith('jesus_face_') && f.endsWith('.png'));

    // Copy user uploaded Jesus image
    const userJesusFile = 'C:\\Users\\Abel\\.gemini\\antigravity-ide\\brain\\77caa69f-6565-4450-9503-d67bf749d0aa\\media__1786184372024.jpg';
    if (fs.existsSync(userJesusFile)) {
      fs.copyFileSync(userJesusFile, path.join(destDir, 'jesus_face.jpg'));
      console.log('Successfully copied user-uploaded Jesus image to client/public/jesus_face.jpg');
    }

    // Copy user uploaded Monstrance image
    const userMonstranceFile = 'C:\\Users\\Abel\\.gemini\\antigravity-ide\\brain\\77caa69f-6565-4450-9503-d67bf749d0aa\\media__1786185305616.jpg';
    if (fs.existsSync(userMonstranceFile)) {
      fs.copyFileSync(userMonstranceFile, path.join(destDir, 'monstrance_eucharist.jpg'));
      console.log('Successfully copied user-uploaded Monstrance image to client/public/monstrance_eucharist.jpg');
    }



    // Temporarily disabled auto-overwrite to protect the user's custom file
    /*
    if (monstranceFile) {
      const src = path.join(artifactDir, monstranceFile);
      const dest = path.join(destDir, 'monstrance_eucharist.png');
      fs.copyFileSync(src, dest);
      console.log(`Successfully copied ${monstranceFile} to client/public/monstrance_eucharist.png`);
    }
    */

    // Search and restore original monstrance image (3,480,210 bytes) if it was overwritten
    const targetSize = 3480210;
    const searchDirs = [
      'C:\\Users\\Abel\\Downloads',
      'C:\\Users\\Abel\\Desktop',
      'C:\\Users\\Abel\\Pictures'
    ];
    let found = false;

    const findFile = (dir) => {
      if (found) return;
      try {
        const list = fs.readdirSync(dir);
        for (const file of list) {
          const fullPath = path.join(dir, file);
          let stat;
          try {
            stat = fs.statSync(fullPath);
          } catch (e) {
            continue;
          }
          if (stat.isDirectory()) {
            if (file === 'node_modules' || file === '$RECYCLE.BIN' || file === 'AppData' || file === 'System Volume Information' || file === '.git' || file === 'Library') continue;
            findFile(fullPath);
          } else if (stat.size === targetSize) {
            console.log(`FOUND FILE MATCH: ${fullPath} (Size: ${stat.size})`);
            fs.copyFileSync(fullPath, path.join(destDir, 'monstrance_eucharist.png'));
            console.log(`SUCCESSFULLY RESTORED ORIGINAL FILE from ${fullPath}`);
            found = true;
            break;
          }
        }
      } catch (e) {
        // ignore
      }
    };

    if (fs.existsSync(path.join(destDir, 'monstrance_eucharist.png'))) {
      const currentSize = fs.statSync(path.join(destDir, 'monstrance_eucharist.png')).size;
      if (currentSize !== targetSize) {
        console.log(`Current size is ${currentSize}, searching to restore ${targetSize}...`);
        for (const sDir of searchDirs) {
          findFile(sDir);
        }
      }
    } else {
      console.log(`File does not exist, searching to restore ${targetSize}...`);
      for (const sDir of searchDirs) {
        findFile(sDir);
      }
    }

    if (jesusFile) {
      const src = path.join(artifactDir, jesusFile);
      const dest = path.join(destDir, 'jesus_face.png');
      fs.copyFileSync(src, dest);
      console.log(`Successfully copied ${jesusFile} to client/public/jesus_face.png`);
    }
  } catch (error) {
    console.error('Error copying generated assets:', error);
  }
};

copyGeneratedAssets();

app.listen(PORT, () => {
  console.log(`Eucharistic Miracles Server running on http://localhost:${PORT}`);
});

