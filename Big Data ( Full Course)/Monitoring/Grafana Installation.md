# Grafana Installation Guide

## 📋 Overview
Grafana is an open-source analytics and interactive visualization platform. This guide covers installation across different operating systems and setup configurations.

---

## 🐧 Linux Installation (Ubuntu/Debian)

### Method 1: Using APT Repository (Recommended)

1. **Install prerequisite packages:**
```bash
sudo apt-get install -y apt-transport-https software-properties-common wget
```

2. **Import the GPG key:**
```bash
sudo mkdir -p /etc/apt/keyrings/
wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
```

3. **Add repository for stable releases:**
```bash
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

4. **Update package list:**
```bash
sudo apt-get update
```

5. **Install Grafana OSS:**
```bash
sudo apt-get install grafana
```

### Method 2: Using .deb Package
```bash
wget https://dl.grafana.com/oss/release/grafana_10.3.0_amd64.deb
sudo dpkg -i grafana_10.3.0_amd64.deb
```

---

## 🍎 macOS Installation

### Method 1: Using Homebrew (Recommended)
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Grafana
brew update
brew install grafana
```

### Method 2: Using Binary
```bash
# Download and extract
wget https://dl.grafana.com/oss/release/grafana-10.3.0.darwin-amd64.tar.gz
tar -zxvf grafana-10.3.0.darwin-amd64.tar.gz
cd grafana-10.3.0
```

---

## 🪟 Windows Installation

### Method 1: Using Chocolatey
```powershell
# Install Chocolatey if not installed
# Then install Grafana
choco install grafana
```

### Method 2: Manual Installation
1. Download the Windows installer from [Grafana Downloads](https://grafana.com/grafana/download)
2. Run the installer and follow the setup wizard
3. Grafana will be installed as a Windows service

---

## 🐳 Docker Installation

### Quick Start
```bash
# Run Grafana in Docker
docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss:latest
```

### With Persistent Storage
```bash
# Create volume for data persistence
docker volume create grafana-storage

# Run with persistent volume
docker run -d \
  -p 3000:3000 \
  --name=grafana \
  -v grafana-storage:/var/lib/grafana \
  grafana/grafana-oss:latest
```

### Using Docker Compose
```yaml
version: '3.8'
services:
  grafana:
    image: grafana/grafana-oss:latest
    container_name: grafana
    restart: unless-stopped
    ports:
      - '3000:3000'
    volumes:
      - grafana-storage:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123

volumes:
  grafana-storage:
```

---

## ⚙️ Service Management

### Linux (systemd)
```bash
# Start Grafana service
sudo systemctl start grafana-server

# Enable auto-start on boot
sudo systemctl enable grafana-server

# Check service status
sudo systemctl status grafana-server

# Stop Grafana service
sudo systemctl stop grafana-server

# Restart Grafana service
sudo systemctl restart grafana-server

# View logs
sudo journalctl -u grafana-server -f
```

### macOS (Homebrew)
```bash
# Start Grafana
brew services start grafana

# Stop Grafana
brew services stop grafana

# Restart Grafana
brew services restart grafana
```

### Manual Start (Binary)
```bash
# Navigate to Grafana directory and start
./bin/grafana-server
```

---

## 🌐 Initial Setup & Access

### Default Access
- **URL:** `http://localhost:3000`
- **Default Username:** `admin`
- **Default Password:** `admin`

### First Login Steps
1. Open browser and navigate to `http://localhost:3000`
2. Login with default credentials
3. **Change the default password** when prompted
4. Complete the initial setup wizard

---

## ⚙️ Configuration

### Main Configuration File Locations
- **Linux:** `/etc/grafana/grafana.ini`
- **macOS (Homebrew):** `/usr/local/etc/grafana/grafana.ini`
- **Windows:** `<GRAFANA_HOME>\conf\grafana.ini`

### Common Configuration Changes
```ini
# Custom HTTP port
[server]
http_port = 3000

# Custom domain
domain = your-domain.com

# Enable anonymous access
[auth.anonymous]
enabled = true
org_role = Viewer

# SMTP settings for email alerts
[smtp]
enabled = true
host = smtp.gmail.com:587
user = your-email@gmail.com
password = your-app-password
from_address = your-email@gmail.com
```

---

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use:**
```bash
# Check what's using port 3000
sudo lsof -i :3000

# Kill process using the port
sudo kill -9 <PID>
```

2. **Permission issues (Linux):**
```bash
# Fix permissions
sudo chown -R grafana:grafana /var/lib/grafana
sudo chown -R grafana:grafana /etc/grafana
```

3. **Service won't start:**
```bash
# Check logs
sudo journalctl -u grafana-server -n 50

# Check configuration
sudo grafana-server -config /etc/grafana/grafana.ini test
```

### Log Locations
- **Linux:** `/var/log/grafana/grafana.log`
- **macOS:** `/usr/local/var/log/grafana/grafana.log`
- **Docker:** `docker logs grafana`

---

## 📊 Next Steps

After installation:

1. **Add Data Sources** (Prometheus, InfluxDB, etc.)
2. **Import Dashboards** from Grafana Community
3. **Configure Alerts** for monitoring
4. **Set up User Management** and organizations
5. **Configure Plugins** for extended functionality

---

## 🔗 Useful Links

- [Grafana Official Documentation](https://grafana.com/docs/)
- [Grafana Community Dashboards](https://grafana.com/grafana/dashboards/)
- [Grafana GitHub Repository](https://github.com/grafana/grafana)
- [Grafana Cloud (SaaS option)](https://grafana.com/cloud/)

---

## 📋 Quick Commands Reference

```bash
# Installation verification
grafana-server -v

# Test configuration
grafana-server test

# Reset admin password
grafana-cli admin reset-admin-password newpassword

# Update Grafana (Linux)
sudo apt-get update && sudo apt-get upgrade grafana
```

---

*This guide covers Grafana installation and basic setup. For advanced configurations and integrations, refer to the official Grafana documentation.*