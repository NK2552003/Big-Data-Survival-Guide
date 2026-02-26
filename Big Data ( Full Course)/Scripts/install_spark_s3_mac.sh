#!/bin/bash

set -e  # Exit on any error

echo "============================================"
echo "Spark + S3 Installation Script for macOS"
echo "============================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# CHecking whether the Homebrew is installed or not
echo "Checking for Homebrew..."
if ! command -v brew &> /dev/null; then
    print_error "Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    print_success "Homebrew installed"
else
    print_success "Homebrew is already installed"
fi

# Installing Apache Spark from Here
echo ""
echo "Installing Apache Spark..."
if brew list apache-spark &> /dev/null; then
    print_info "Apache Spark is already installed"
    SPARK_VERSION=$(brew list --versions apache-spark | awk '{print $2}')
    print_info "Current version: $SPARK_VERSION"
else
    brew install apache-spark
    print_success "Apache Spark installed"
fi

# Get Spark installation path
SPARK_HOME=$(brew --prefix apache-spark)/libexec
print_info "Spark installation path: $SPARK_HOME"

# Check AWS CLI installation
echo ""
echo "Checking AWS CLI..."
if ! command -v aws &> /dev/null; then
    print_info "AWS CLI not found. Installing AWS CLI..."
    brew install awscli
    print_success "AWS CLI installed"
    print_info "Please run 'aws configure' to set up your credentials"
else
    print_success "AWS CLI is already installed"
    
    # Check if AWS credentials are configured
    if aws configure list | grep -q "access_key.*<not set>"; then
        print_error "AWS credentials not configured!"
        print_info "Please run: aws configure"
    else
        print_success "AWS credentials are configured"
    fi
fi

# Create directory for JARs
echo ""
echo "Setting up JAR directory..."
JAR_DIR="$SPARK_HOME/jars"
print_info "JAR directory: $JAR_DIR"

# Download required JARs
echo ""
echo "Downloading S3 connector JARs..."

# Define JAR versions (compatible with Spark 4.0.1 / Hadoop 3.4.1)
HADOOP_VERSION="3.4.1"
AWS_SDK_V1_VERSION="1.12.780"
AWS_SDK_V2_VERSION="2.29.52"

# JAR URLs
HADOOP_AWS_URL="https://repo1.maven.org/maven2/org/apache/hadoop/hadoop-aws/${HADOOP_VERSION}/hadoop-aws-${HADOOP_VERSION}.jar"
AWS_SDK_V1_URL="https://repo1.maven.org/maven2/com/amazonaws/aws-java-sdk-bundle/${AWS_SDK_V1_VERSION}/aws-java-sdk-bundle-${AWS_SDK_V1_VERSION}.jar"
AWS_SDK_V2_URL="https://repo1.maven.org/maven2/software/amazon/awssdk/bundle/${AWS_SDK_V2_VERSION}/bundle-${AWS_SDK_V2_VERSION}.jar"

# Create temporary directory for downloads
TEMP_DIR=$(mktemp -d)
print_info "Downloading JARs to: $TEMP_DIR"

# Download JARs
echo "  - Downloading hadoop-aws-${HADOOP_VERSION}.jar..."
curl -L -o "$TEMP_DIR/hadoop-aws-${HADOOP_VERSION}.jar" "$HADOOP_AWS_URL" 2>/dev/null
print_success "Downloaded hadoop-aws"

echo "  - Downloading aws-java-sdk-bundle-${AWS_SDK_V1_VERSION}.jar..."
curl -L -o "$TEMP_DIR/aws-java-sdk-bundle-${AWS_SDK_V1_VERSION}.jar" "$AWS_SDK_V1_URL" 2>/dev/null
print_success "Downloaded AWS SDK v1 bundle"

echo "  - Downloading bundle-${AWS_SDK_V2_VERSION}.jar..."
curl -L -o "$TEMP_DIR/bundle-${AWS_SDK_V2_VERSION}.jar" "$AWS_SDK_V2_URL" 2>/dev/null
print_success "Downloaded AWS SDK v2 bundle"

# Copy JARs to Spark jars directory
echo ""
echo "Installing JARs to Spark..."
sudo cp "$TEMP_DIR"/*.jar "$JAR_DIR/"
print_success "JARs installed to $JAR_DIR"

# Clean up temporary directory
rm -rf "$TEMP_DIR"
print_success "Cleaned up temporary files"

# Configure spark-defaults.conf
echo ""
echo "Configuring Spark defaults..."
SPARK_CONF_DIR="$SPARK_HOME/conf"
SPARK_DEFAULTS_CONF="$SPARK_CONF_DIR/spark-defaults.conf"

# Create conf directory if it doesn't exist
if [ ! -d "$SPARK_CONF_DIR" ]; then
    sudo mkdir -p "$SPARK_CONF_DIR"
fi

# Backup existing config if present
if [ -f "$SPARK_DEFAULTS_CONF" ]; then
    sudo cp "$SPARK_DEFAULTS_CONF" "$SPARK_DEFAULTS_CONF.backup.$(date +%Y%m%d_%H%M%S)"
    print_info "Backed up existing spark-defaults.conf"
fi

# Create/update spark-defaults.conf
sudo tee "$SPARK_DEFAULTS_CONF" > /dev/null << 'EOF'
# Spark S3 Configuration
spark.hadoop.fs.s3a.impl org.apache.hadoop.fs.s3a.S3AFileSystem
spark.hadoop.fs.s3a.aws.credentials.provider software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider
spark.hadoop.fs.s3a.connection.timeout 60000
spark.hadoop.fs.s3a.connection.establish.timeout 60000
spark.hadoop.fs.s3a.socket.timeout 60000
EOF

print_success "Spark configuration file created/updated"

# Verify installation
echo ""
echo "============================================"
echo "Verifying Installation"
echo "============================================"

# Check Spark version
echo ""
SPARK_VERSION=$(spark-shell --version 2>&1 | grep "version" | head -1)
print_success "Spark: $SPARK_VERSION"

# Check for JARs
echo ""
echo "Checking installed JARs:"
if [ -f "$JAR_DIR/hadoop-aws-${HADOOP_VERSION}.jar" ]; then
    print_success "hadoop-aws-${HADOOP_VERSION}.jar"
else
    print_error "hadoop-aws JAR not found"
fi

if [ -f "$JAR_DIR/aws-java-sdk-bundle-${AWS_SDK_V1_VERSION}.jar" ]; then
    print_success "aws-java-sdk-bundle-${AWS_SDK_V1_VERSION}.jar"
else
    print_error "AWS SDK v1 bundle not found"
fi

if [ -f "$JAR_DIR/bundle-${AWS_SDK_V2_VERSION}.jar" ]; then
    print_success "bundle-${AWS_SDK_V2_VERSION}.jar"
else
    print_error "AWS SDK v2 bundle not found"
fi

# Final message
echo ""
echo "============================================"
echo "Installation Complete!"
echo "============================================"
echo ""
print_success "Apache Spark with S3 support is now installed and configured"
echo ""
echo "Next steps:"
echo "  1. Configure AWS credentials (if not done already):"
echo "     aws configure"
echo ""
echo "  2. Test your setup with PySpark:"
echo "     pyspark"
echo "     >>> spark.read.text('s3a://your-bucket-name/path/file.txt').show()"
echo ""
echo "  3. Or test with Spark Shell:"
echo "     spark-shell"
echo "     scala> spark.read.text(\"s3a://your-bucket-name/path/file.txt\").show()"
echo ""
print_info "Use 's3a://' protocol for S3 paths (not s3:// or s3n://)"
echo ""
