import express from "express";
import axios from "axios";

const router = express.Router();

// Configuración de variables de ambiente
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = `http://127.0.0.1:3000/auth/login_callback`;

// ------------------------------------------------------------------------------------------------------------------------

router.get("/login", async (req, res) => {
    const scope = "read write follow";
    const mastodonInstance = 'https://mastodon.social';
    const authorizationUrl = `${mastodonInstance}/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`; 
    res.json({authorizationUrl: authorizationUrl});
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
  
      res.json({ access_token });

    } catch (error) {
      console.error("Ocurrió un error en el intercambio del token de autorización", error);
      res.status(500).send("Error interno en el servidor");
    }
});

router.post("/logout", async (req, res) => {
  
  const { accessToken } = req.body;
  
  if (!accessToken) {
    return res.status(400).json({ error: 'Falta el token de acceso' });
  }

  try {
    const response = await axios.post(`https://mastodon.social/oauth/revoke`, null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        token: accessToken,
      },
    });

    if (response.status === 200) {
      res.status(200).json({ message: 'Cierre de sesión exitoso' });
    } else {
      res.status(response.status).json({ error: 'Error al cerrar sesión' });
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ error: 'Error al cerrar sesión' });
  }

});

export default router;