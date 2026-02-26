# First make the script executable

## FOR MAC 
- Run the following commands
```bash
chmod +x <Script_Path_Here>
#example
chmod +x ./install_hadoop_spark_mac.sh
```
- then run the following command to execute it
```bash
./install_hadoop_spark_mac.sh
```

---

## After Installation

```
---------------------------------------------
 Installation Complete! 🎉
---------------------------------------------
Hadoop UI:   http://localhost:9870
YARN UI:     http://localhost:8088
---------------------------------------------
Run next time:
   start-dfs.sh
   start-yarn.sh
---------------------------------------------
```

### Troubleshooting

If it doesn't run or displays errors, try:

1. **Enable Remote Login with Full Disk Access:**
   - Go to **Settings > General > Sharing > Remote Login**
   - Allow full disk access to terminal
   - Restart the terminal

2. **Setup SSH:**
   ```bash
   ssh localhost
   ```
   Type `yes` and hit enter

3. **Start Hadoop Services:**
   ```bash
   start-dfs.sh
   start-yarn.sh
   ```
   It'll work fine now.

---

## FOR WINDOWS

### Step 1: Install WSL (Windows Subsystem for Linux)

1. Open PowerShell as Administrator and run:
   ```powershell
   wsl --install
   ```

2. Restart your computer when prompted

3. After restart, WSL will automatically open and ask you to create a Ubuntu user account

### Step 2: Install Ubuntu (if not already installed)

1. Open PowerShell and check installed distributions:
   ```powershell
   wsl --list --verbose
   ```

2. If Ubuntu is not installed, install it:
   ```powershell
   wsl --install -d Ubuntu
   ```

### Step 3: Run the Installation Script

1. Open Ubuntu (WSL) from Start Menu or run `wsl` in PowerShell

2. Navigate to the scripts directory:
   ```bash
   cd /mnt/c/Users/YourUsername/Downloads/big_data_course/Scripts
   ```

3. Make the script executable:
   ```bash
   sudo chmod +x install_hadoop_spark_ubuntu.sh
   ```

4. Run the script:
   ```bash
   ./install_hadoop_spark_ubuntu.sh
   ```

### Step 4: After Installation

```
============================================
  Hadoop + Spark Installation Complete! 🎉
============================================

HADOOP SERVICES:
  NameNode UI       : http://localhost:9870
  YARN ResourceMgr  : http://localhost:8088

SPARK:
  Spark Home        : /opt/spark
  Spark Version     : 4.0.1 (Hadoop 3 compatible)

HADOOP USER:
  Username          : hadoop
  Password          : hadoop
  Switch to user    : sudo su - hadoop

TO TEST SPARK WITH HADOOP:
  1. Switch to hadoop user: sudo su - hadoop
  2. Start spark-shell: spark-shell
  3. Test HDFS connection:
     scala> val data = sc.textFile("hdfs:///data/data.csv")
     scala> data.take(5)

Note: Make sure HDFS is running and you have data uploaded
============================================
```

### Troubleshooting for Windows/WSL

1. **If WSL is not recognized:**
   - Make sure Windows is updated to version 1903 or higher
   - Run `wsl --update` in PowerShell as Administrator

2. **If you can't access the script:**
   - Windows drives are mounted at `/mnt/` in WSL
   - C: drive is at `/mnt/c/`
   - Adjust the path according to where you saved the files

3. **If services don't start:**
   - run `hdfs namenode -format`
   - `restart the terminal`
   - Switch to hadoop user: `sudo su - hadoop`
   - Start services manually:
     ```bash
     start-dfs.sh
     start-yarn.sh
     ```
---

