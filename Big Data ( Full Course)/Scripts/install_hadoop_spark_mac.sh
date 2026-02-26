#!/bin/bash

echo "---------------------------------------------"
echo "   Hadoop + Spark Automatic Installer (mac)"
echo "---------------------------------------------"
sleep 1

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo ">>> Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == 'arm64' ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
    
    echo ">>> Homebrew installed successfully!"
else
    echo ">>> Homebrew is already installed."
fi

USER_NAME=$(whoami)
HADOOP_DIR="/Users/$USER_NAME/hadoop"

echo ">>> Updating Homebrew..."
brew update

echo ">>> Installing Java 21..."
brew install openjdk@21

echo ">>> Installing Hadoop & Spark..."
brew install hadoop
brew link hadoop --force --overwrite 2>/dev/null || true
brew install apache-spark

echo ">>> Detecting installation paths..."
HADOOP_HOME="$(brew --prefix hadoop)/libexec"
SPARK_HOME="$(brew --prefix apache-spark)/libexec"
echo "HADOOP_HOME: $HADOOP_HOME"
echo "SPARK_HOME: $SPARK_HOME"

echo ">>> Setting environment variables..."
# Remove old Hadoop/Spark entries to prevent duplicates
sed -i.bak '/# Hadoop & Spark ENV/,/SPARK_HOME\/bin/d' ~/.zshrc
sed -i.bak '/export JAVA_HOME.*openjdk@21/d' ~/.zshrc

# Add fresh environment variables
cat <<EOF >> ~/.zshrc

# Java Environment
export JAVA_HOME="\$(brew --prefix openjdk@21)"

# Hadoop & Spark Environment
export HADOOP_HOME=\$(brew --prefix hadoop)/libexec
export SPARK_HOME=\$(brew --prefix apache-spark)/libexec
export PATH=\$PATH:\$HADOOP_HOME/bin:\$HADOOP_HOME/sbin:\$SPARK_HOME/bin
EOF

source ~/.zshrc

echo ">>> Loading environment variables for current session..."
export JAVA_HOME="$(brew --prefix openjdk@21)"
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$SPARK_HOME/bin

echo ">>> Enabling SSH Remote Login..."
sudo systemsetup -setremotelogin on

echo ">>> Generating passwordless SSH keys..."
if [ ! -f ~/.ssh/id_rsa ]; then
    ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa -q
else
    echo "SSH key already exists, skipping generation."
fi
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys 2>/dev/null || true
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh

echo ">>> Creating Hadoop data directories..."
mkdir -p $HADOOP_DIR/data/name
mkdir -p $HADOOP_DIR/data/data
chmod -R 755 $HADOOP_DIR

echo ">>> Writing core-site.xml..."
cat <<EOF > $HADOOP_HOME/etc/hadoop/core-site.xml
<configuration>
 <property>
  <name>fs.defaultFS</name>
  <value>hdfs://localhost:9000</value>
 </property>

 <property>
  <name>hadoop.tmp.dir</name>
  <value>$HADOOP_DIR</value>
 </property>
</configuration>
EOF

echo ">>> Writing hdfs-site.xml..."
cat <<EOF > $HADOOP_HOME/etc/hadoop/hdfs-site.xml
<configuration>
  <property>
    <name>dfs.replication</name>
    <value>1</value>
  </property>

  <property>
    <name>dfs.namenode.name.dir</name>
    <value>file://$HADOOP_DIR/data/name</value>
  </property>

  <property>
    <name>dfs.datanode.data.dir</name>
    <value>file://$HADOOP_DIR/data/data</value>
  </property>
</configuration>
EOF

echo ">>> Writing mapred-site.xml..."
cat <<EOF > $HADOOP_HOME/etc/hadoop/mapred-site.xml
<configuration>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>

  <property>
    <name>yarn.app.mapreduce.am.env</name>
    <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
  </property>

  <property>
    <name>mapreduce.map.env</name>
    <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
  </property>

  <property>
    <name>mapreduce.reduce.env</name>
    <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
  </property>
</configuration>
EOF

echo ">>> Writing yarn-site.xml..."
cat <<EOF > $HADOOP_HOME/etc/hadoop/yarn-site.xml
<configuration>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
</configuration>
EOF

echo ">>> Configuring hadoop-env.sh with JAVA_HOME..."
if [ -f "$HADOOP_HOME/etc/hadoop/hadoop-env.sh" ]; then
    # Remove any existing JAVA_HOME lines
    sed -i.bak '/^export JAVA_HOME=/d' $HADOOP_HOME/etc/hadoop/hadoop-env.sh
    # Add JAVA_HOME to hadoop-env.sh
    echo "export JAVA_HOME=/opt/homebrew/opt/openjdk@21" >> $HADOOP_HOME/etc/hadoop/hadoop-env.sh
    echo "JAVA_HOME set in hadoop-env.sh: $(brew --prefix openjdk@21)"
else
    echo "Warning: hadoop-env.sh not found at $HADOOP_HOME/etc/hadoop/hadoop-env.sh"
fi

echo ">>> Formatting NameNode..."
hdfs namenode -format

echo ">>> Cleaning DataNode data to prevent cluster ID mismatch..."
rm -rf $HADOOP_DIR/data/data/*
mkdir -p $HADOOP_DIR/data/data
chmod -R 755 $HADOOP_DIR/data

echo ">>> Starting Hadoop DFS..."
start-dfs.sh

echo ">>> Starting YARN..."
start-yarn.sh

echo ">>> Checking running processes..."
jps

echo "---------------------------------------------"
echo " Installation Complete! 🎉"
echo "---------------------------------------------"
echo "Hadoop UI:   http://localhost:9870"
echo "YARN UI:     http://localhost:8088"
echo "---------------------------------------------"
echo "Run next time:"
echo "   start-dfs.sh"
echo "   start-yarn.sh"
echo "---------------------------------------------"
echo " if it doesn't run or display errors, then try:"
echo " Setting > General > Sharing > Remote Login > Allow full disk access to terminal and restart the terminal"
echo " Once Done , run the following commands:"
echo "   ssh localhost"
echo " type yes and hit enter"
echo "Then again run:"
echo "   start-dfs.sh"
echo "   start-yarn.sh"
echo " It'll work fine now."
echo "---------------------------------------------"