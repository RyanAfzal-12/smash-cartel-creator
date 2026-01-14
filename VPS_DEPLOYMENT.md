# 🌐 VPS Deployment Guide: Smash Cartel Backend

Follow these steps to deploy your Uber Eats API backend on a Linux VPS (Ubuntu/Debian) for production.

---

## 🏗️ 1. Prepare Your VPS
Connect to your VPS via SSH:
```bash
ssh root@your_vps_ip
```

Update system and install Node.js:
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git-core
```

---

## 📦 2. Upload and Setup Codebase
Clone your repository (or upload via SFTP):
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/backend-api
```

Install production dependencies:
```bash
npm install --omit=dev
```

Create your production `.env` file:
```bash
nano .env
```
Paste your credentials:
```env
PORT=3001
UBER_CLIENT_ID=dCVXn3yJFKqSQGydf7B1HqLKI5MHldSs
UBER_CLIENT_SECRET=-qIKamfoDKhBl6MfN4kIE6qxzmvMTuK5VkaJ2koe
STAFF_USERNAME=admin
STAFF_PASSWORD=smash123
NODE_ENV=production
```

---

## ⚡ 3. Use PM2 for Process Management
PM2 keeps your server running 24/7 and restarts it if it crashes.
```bash
sudo npm install -g pm2
pm2 start src/index.js --name "smash-api"
pm2 save
pm2 startup
```

---

## 🛡️ 4. Set Up Nginx (Reverse Proxy)
To use a real domain (e.g., `api.smashcartel.com`) and HTTPS:

1. **Install Nginx**:
   ```bash
   sudo apt install nginx -y
   ```

2. **Configure Nginx**:
   ```bash
   sudo nano /etc/nginx/sites-available/smash-api
   ```
   Paste this (replace `api.yourdomain.com`):
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable Config**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/smash-api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## 🔒 5. Install SSL (Let's Encrypt)
Secure your API with HTTPS:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```

---

## 📍 6. Final Step: Uber Dashboard
Update your **Uber Developer Dashboard** Webhook URL to:
`https://api.yourdomain.com/api/ubereats/webhook`

---

## 📝 Maintenance Commands
- **Check Logs**: `pm2 logs smash-api`
- **Restart Server**: `pm2 restart smash-api`
- **Check Status**: `pm2 status`
