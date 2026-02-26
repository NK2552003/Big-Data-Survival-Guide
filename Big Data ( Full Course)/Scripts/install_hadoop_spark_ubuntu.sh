#!/bin/bash

echo "=============================================="
echo "   Hadoop Installer for WSL (Ubuntu on Win11)"
echo "=============================================="
sleep 1

echo ">>> Updating Ubuntu..."
sudo apt update
sudo apt upgrade -y

echo ">>> Installing required tools..."
sudo apt install -y wget curl vim nano unzip rsync openssh-server openssh-client default-jdk

echo ">>> Checking JAVA..."
java -version

JAVA_HOME_PATH=$(readlink -f $(which java) | sed "s:bin/java::")

echo "Detected JAVA_HOME: $JAVA_HOME_PATH"

echo ">>> Creating dedicated Hadoop user..."
sudo adduser --disabled-password --gecos "" hadoop
sudo usermod -aG sudo hadoop

echo ">>> Setting password for Hadoop user..."
echo "hadoop:hadoop" | sudo chpasswd

echo ">>> Configuring SSH..."
sudo service ssh start
sudo -u hadoop ssh-keygen -t rsa -N "" -f /home/hadoop/.ssh/id_rsa
sudo -u hadoop bash -c "cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys"
sudo -u hadoop chmod 700 /home/hadoop/.ssh
sudo -u hadoop chmod 600 /home/hadoop/.ssh/authorized_keys

echo ">>> Downloading Hadoop..."
sudo -u hadoop bash -c "
cd /home/hadoop
wget https://downloads.apache.org/hadoop/common/hadoop-3.4.2/hadoop-3.4.2.tar.gz
tar -xzf hadoop-3.4.2.tar.gz
mv hadoop-3.4.2 hadoop
"

echo ">>> Setting environment variables..."
sudo -u hadoop bash -c "
echo 'export JAVA_HOME=$JAVA_HOME_PATH' >> ~/.bashrc
echo 'export HADOOP_HOME=/home/hadoop/hadoop' >> ~/.bashrc
echo 'export PATH=\$PATH:\$HADOOP_HOME/bin:\$HADOOP_HOME/sbin' >> ~/.bashrc
"

sudo -u hadoop bash -c "source ~/.bashrc"

echo ">>> Configuring Hadoop XML files..."
HADOOP_HOME="/home/hadoop/hadoop"

# hadoop-env.sh
sudo -u hadoop bash -c "
echo 'export JAVA_HOME=$JAVA_HOME_PATH' >> $HADOOP_HOME/etc/hadoop/hadoop-env.sh
"

# core-site.xml
sudo -u hadoop bash -c "
cat <<EOF > $HADOOP_HOME/etc/hadoop/core-site.xml
<?xml version=\"1.0\"?>
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
EOF
"

# hdfs-site.xml
sudo -u hadoop bash -c "
cat <<EOF > $HADOOP_HOME/etc/hadoop/hdfs-site.xml
<?xml version=\"1.0\"?>
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
EOF
"

# mapred-site.xml
sudo -u hadoop bash -c "
cat <<EOF > $HADOOP_HOME/etc/hadoop/mapred-site.xml
<?xml version=\"1.0\"?>
<configuration>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>
</configuration>
EOF
"

# yarn-site.xml
sudo -u hadoop bash -c "
cat <<EOF > $HADOOP_HOME/etc/hadoop/yarn-site.xml
<?xml version=\"1.0\"?>
<configuration>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
</configuration>
EOF
"

echo ">>> Creating Hadoop data directories..."
sudo -u hadoop bash -c "
mkdir -p ~/hadoop_tmp/hdfs/namenode
mkdir -p ~/hadoop_tmp/hdfs/datanode
"

echo ">>> Formatting NameNode..."
sudo -u hadoop /home/hadoop/hadoop/bin/hdfs namenode -format

echo ">>> Starting Hadoop (DFS)..."
sudo -u hadoop /home/hadoop/hadoop/sbin/start-dfs.sh

echo ">>> Starting YARN..."
sudo -u hadoop /home/hadoop/hadoop/sbin/start-yarn.sh

echo ">>> Displaying running processes..."
sudo -u hadoop $JAVA_HOME_PATH/bin/jps

echo ""
echo "=============================================="
echo "   Starting Spark Installation"
echo "=============================================="
sleep 1

echo ">>> Downloading Spark in /tmp..."
cd /tmp
wget https://downloads.apache.org/spark/spark-4.0.1/spark-4.0.1-bin-hadoop3.tgz

echo ">>> Creating Spark installation directory..."
sudo mkdir -p /opt/spark

echo ">>> Extracting Spark to /opt/spark..."
sudo tar -xzf /tmp/spark-4.0.1-bin-hadoop3.tgz -C /opt/spark --strip-components=1

echo ">>> Setting ownership of Spark directory..."
sudo chown -R hadoop:hadoop /opt/spark

echo ">>> Configuring Spark environment variables..."
sudo -u hadoop bash -c "
echo '' >> ~/.bashrc
echo '# Spark Setup' >> ~/.bashrc
echo 'export SPARK_HOME=/opt/spark' >> ~/.bashrc
echo 'export PATH=\$PATH:\$SPARK_HOME/bin:\$SPARK_HOME/sbin' >> ~/.bashrc
echo 'export HADOOP_CONF_DIR=\$HADOOP_HOME/etc/hadoop' >> ~/.bashrc
"

echo ">>> Cleaning up temporary files..."
rm -f /tmp/spark-4.0.1-bin-hadoop3.tgz

echo ">>> Validating Spark installation..."
sudo -u hadoop bash -c "source ~/.bashrc && spark-shell --version" || echo "Note: Run 'source ~/.bashrc' after switching to hadoop user"

echo ""
echo "=============================================="
echo "   Hadoop + Spark Installation Complete! 🎉"
echo "=============================================="
echo ""
echo "HADOOP SERVICES:"
echo "  NameNode UI       : http://localhost:9870"
echo "  YARN ResourceMgr  : http://localhost:8088"
echo ""
echo "SPARK:"
echo "  Spark Home        : /opt/spark"
echo "  Spark Version     : 4.0.1 (Hadoop 3 compatible)"
echo ""
echo "HADOOP USER:"
echo "  Username          : hadoop"
echo "  Password          : hadoop"
echo "  Switch to user    : sudo su - hadoop"
echo ""
echo "TO TEST SPARK WITH HADOOP:"
echo "  1. Switch to hadoop user: sudo su - hadoop"
echo "  2. Start spark-shell: spark-shell"
echo "  3. Test HDFS connection:"
echo "     scala> val data = sc.textFile(\"hdfs:///data/data.csv\")"
echo "     scala> data.take(5)"
echo ""
echo "Note: Make sure HDFS is running and you have data uploaded"
echo "=============================================="
