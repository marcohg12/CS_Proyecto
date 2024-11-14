import express from "express";
import axios from "axios";

const router = express.Router();

// Configuración de variables de ambiente
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// ------------------------------------------------------------------------------------------------------------------------

router.get("/login", async (req, res) => {
    const scope = "read write follow";
    const redirectUri = `http://127.0.0.1:${process.env.PORT}/auth/login_callback`;
    const mastodonInstance = 'https://mastodon.social';
    const authorizationUrl = `${mastodonInstance}/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`; 
    res.redirect(authorizationUrl);
});

router.get("/login_callback", async (req, res) => {
    
    const { code } = req.query;
  
    if (!code) {
      return res.status(400).send("Error, falta el código de autorización");
    }
  
    try {
      const response = await axios.post('https://mastodon.social/oauth/token', null, {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      const { access_token, token_type, scope, created_at } = response.data;
  
      console.log('Access Token:', access_token);
  
      res.json({ access_token });

    } catch (error) {
      console.error("Ocurrió un error en el intercambio del token de autorización", error);
      res.status(500).send("Error interno en el servidor");
    }
});

export default router;