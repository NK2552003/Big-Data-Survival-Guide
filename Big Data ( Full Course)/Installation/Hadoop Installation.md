# Hadoop Installation

# Installing WSL, Ubuntu, JDK, Hadoop, and Running Hadoop on Windows 11

(With separate “hadoop” user, simple SSH setup, and nano-based environment setup)

# 1. Understanding the Basics Before Starting

Before installing anything, you must understand three things: WSL, Linux, and Hadoop.

## 1.1 What is WSL?

WSL (Windows Subsystem for Linux) allows you to run Linux inside Windows without a virtual machine.

You get a real Linux terminal where you can run commands.

## 1.2 What is Ubuntu?

Ubuntu is a popular Linux operating system.

WSL installs Ubuntu automatically.

## 1.3 Why Hadoop needs Linux?

Hadoop is built to run on Linux-based clusters.

Linux provides SSH, permissions, background processes, and directory structures that Hadoop depends on.

# 2. Install WSL on Windows 11

## Step 1: Open PowerShell as Administrator

Search “PowerShell”, right-click → Run as Administrator.

## Step 2: Install WSL

```powershell
wsl --install
```

This installs WSL + Ubuntu.

Restart if required.

## Step 3: Open Ubuntu

Search “Ubuntu” in Start → open.

It will ask for a Linux username and password.

This is your Linux environment.

# 3. Learn Basic Linux Commands (Beginner-Friendly)

```bash
pwd      # shows current directory
ls       # lists files
cd dir   # go into folder
cd ..    # go back one folder
mkdir a  # create folder
rm f     # delete file
sudo     # run command as admin
```

Enough to follow this guide.

# 4. Update Ubuntu

```bash
sudo apt update
sudo apt upgrade -y
```

# 5. Install Required Tools

```bash
sudo apt install -y wget curl vim unzip rsync
```

Explanation:

- wget → download files
- curl → send/receive data
- vim → text editor
- unzip → extract files
- ssh → required by Hadoop
- rsync → used internally by Hadoop

# 6. Install JDK (Java Development Kit)

Hadoop requires Java.

Install Java 11:

```bash
sudo apt install -y default-jdk
```

Check Java:

```bash
java -version
```

Find JAVA_HOME:

```bash
readlink -f $(which java) | sed "s:bin/java::"
```

You will get something like:

```
/usr/lib/jvm/java-11-openjdk-amd64/
```

Copy this path (you will paste it in .bashrc later).

# 7. Create a Dedicated Hadoop User

This is cleaner and avoids permission issues.

```bash
sudo adduser hadoop
```

Give a password (anything you like).

Add hadoop user to sudo:

```bash
sudo usermod -aG sudo hadoop
```

Switch to Hadoop user:

```bash
su - hadoop
```

# 8. Enable SSH (Simple Setup)

Install SSH server:

```bash
sudo apt install openssh-client
sudo apt install openssh-server
```

Start SSH:

```bash
sudo service ssh start
```

Create SSH key (no password):

```bash
ssh-keygen -t rsa
```

Add key to authorized keys:

```bash
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

Fix permissions:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

Test SSH:

```bash
ssh localhost
```

If it logs in without asking password, SSH is set.

# 9. Download and Install Hadoop

Login as hadoop user:

```bash
su - hadoop
```

Download Hadoop 3.4.2 (latest as of now):

```bash
cd ~
wget https://downloads.apache.org/hadoop/common/hadoop-3.4.2/hadoop-3.4.2.tar.gz
tar -xzf hadoop-3.4.2.tar.gz
mv hadoop-3.4.2 hadoop
```

# 10. Add Environment Variables (Using nano as you requested)

Open .bashrc:

```bash
nano ~/.bashrc
```

Add these lines at the **end** of the file:

```
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export HADOOP_HOME=/home/hadoop/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```

Save nano:

- Press Ctrl + O
- Press Enter
- Press Ctrl + X

Reload .bashrc:

```bash
source ~/.bashrc
```

Check:

```bash
hadoop version
```

# 11. Understand Hadoop Folder Structure

Inside the Hadoop directory:

- bin/ → Hadoop commands
- sbin/ → start/stop scripts
- etc/hadoop/ → configuration files
- logs/ → logs generated later

All configuration happens inside `etc/hadoop`.

# 12. Configure Hadoop (Single Node Cluster)

Go into config directory:

```bash
cd $HADOOP_HOME/etc/hadoop
```

## 12.1 Edit hadoop-env.sh

```bash
nano hadoop-env.sh
```

Find the line:

```
export JAVA_HOME=
```

Replace with:

```
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
```

Save and exit.

## 12.2 core-site.xml

```bash
nano core-site.xml
```

Paste this:

```
<?xml version="1.0"?>
<configuration>
  <property>
    <name>fs.defaultFS</name>
    <value>hdfs://localhost:9000</value>
  </property>
  <property>
    <name>hadoop.tmp.dir</name>
    <value>/home/hadoop/hadoop_tmp</value>
  </property>
</configuration>
```

## 12.3 hdfs-site.xml

```bash
nano hdfs-site.xml
```

Paste:

```
<?xml version="1.0"?>
<configuration>
  <property>
    <name>dfs.replication</name>
    <value>1</value>
  </property>
  <property>
    <name>dfs.namenode.name.dir</name>
    <value>file:/home/hadoop/hadoop_tmp/hdfs/namenode</value>
  </property>
  <property>
    <name>dfs.datanode.data.dir</name>
    <value>file:/home/hadoop/hadoop_tmp/hdfs/datanode</value>
  </property>
</configuration>
```

## 12.4 mapred-site.xml

```bash
nano mapred-site.xml
```

Paste:

```
<?xml version="1.0"?>
<configuration>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>
</configuration>
```

## 12.5 yarn-site.xml

```bash
nano yarn-site.xml
```

Paste:

```
<?xml version="1.0"?>
<configuration>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
</configuration>
```

# 13. Create Hadoop Data Directories

```bash
mkdir -p ~/hadoop_tmp/hdfs/namenode
mkdir -p ~/hadoop_tmp/hdfs/datanode
```

# 14. Format NameNode

```bash
hdfs namenode -format
```

If you see "successfully formatted", it's correct.

# 15. Start Hadoop

Start HDFS:

```bash
start-dfs.sh
```

Start YARN:

```bash
start-yarn.sh
```

Check running processes:

```bash
jps
```

You should see:

- NameNode
- DataNode
- SecondaryNameNode
- ResourceManager
- NodeManager

# 16. Access Hadoop on Windows Browser

Open Chrome/Edge on Windows:

NameNode:

```
http://localhost:9870/
```

YARN ResourceManager:

```
http://localhost:8088/
```

# 17. Test HDFS

```bash
hdfs dfs -mkdir /user/hadoop
echo "hello world" > test.txt
hdfs dfs -put test.txt /user/hadoop/
hdfs dfs -ls /user/hadoop/
hdfs dfs -cat /user/hadoop/test.txt
```

# 18. Stop Hadoop

```bash
stop-yarn.sh
stop-dfs.sh
```