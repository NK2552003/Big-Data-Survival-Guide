# AWS Setup + S3

# STEP-1 — Create IAM User (for S3 + CLI + Hadoop/Spark)

## 1) Go to AWS Console

Login normally.

Then go:

**Services → IAM → Users**

Click:

**“Create User”**

## 2) Give user a name

Example:

`hadoop-user`

(or anything simple)

Click **Next**.

## 3) Assign permissions

Choose:

**Attach policies directly**

Then select the policy:

`AmazonS3FullAccess`

(for learning, this is fine — later you reduce)

Click **Next**, then **Create User**.

## 4) Generate ACCESS KEYS

Now open your newly created user.

Tabs:

Go to:

**Security credentials**

Scroll to:

**Access keys**

Click:

**Create access key**

Choose:

**Command Line Interface (CLI)**

Confirm.

You will be shown:

- Access Key ID
- Secret Access Key

DOWNLOAD the `.csv`

**DON’T LOSE IT**

You’ll need this for:

- AWS CLI
- Hadoop core-site.xml
- Spark

# STEP-2 — Create S3 Bucket

Now go:

**Services → S3**

Click:

**Create bucket**

## Bucket settings

Bucket name:

```
my-first-bucket-harshit
```

Region:

```
ap-south-1 (Mumbai)
```

**Disable block public access?**

KEEP enabled

(no need public bucket for now)

Create Bucket

Done.

# STEP-4 - Install AWS CLI

## **1. Download the AWS CLI Installer:**

Open your terminal and download the AWS CLI v2 installer using `curl`:

Code

```jsx
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
```

## **2. Unzip the Installer:**

Ensure you have `unzip` installed (if not, install it with `sudo apt install unzip`), then extract the downloaded zip file:

Code

```jsx
unzip awscliv2.zip
```

## **3. Run the Installer:**

Navigate into the extracted `aws` directory and run the installation script:

Code

```jsx
sudo ./aws/install
```

## **4. Verify the Installation:**

Confirm that the AWS CLI is installed and check its version:

Code

```jsx
aws --version
```

# STEP-5 — Test Using AWS CLI (inside WSL)

Inside WSL:

Run:

```bash
aws configure
```

enter:

- AWS Access Key
- AWS Secret Key
- region: ap-south-1
- output: json

Now test:

```bash
aws s3 ls
```

you should see your bucket.

GOOD.

Now create a test file:

```bash
echo "hello harshit" > hello.txt
```

Upload:

```bash
aws s3 cp hello.txt s3://my-first-bucket-harshit/
```

Check:

```bash
aws s3 ls s3://my-first-bucket-harshit/
```

You should see `hello.txt`.