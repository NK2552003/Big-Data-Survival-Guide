# Linux Basics

## **1. Introduction to Linux**

### **1.1 What is Linux?**

Linux is a **free and open-source operating system (OS)** based on **Unix**. Like Windows or macOS, it manages hardware and software resources and provides services for running applications.

However, unlike proprietary systems, Linux is:

- **Open source**: Anyone can view, modify, and distribute the source code.
- **Modular**: It follows a layered structure where each component is independent.
- **Secure and stable**: Known for its reliability, especially in servers and development environments.
- **Multi-user and multitasking**: Supports multiple users and tasks simultaneously without interference.

**Core Concept:**

Linux isn’t a single OS — it’s a **kernel** (the core of the system). Various organizations and communities build complete OS distributions around it, such as **Ubuntu**, **Fedora**, **Debian**, **Arch**, and **CentOS**.

### **1.2 What is the Kernel?**

The **kernel** is the core component of Linux — it sits between hardware and software. It manages:

- **Process management** (running programs)
- **Memory management** (RAM allocation)
- **Device management** (drivers for hardware)
- **File system management**
- **System calls** (communication between software and hardware)

Think of the kernel as the “brain” of the system that controls everything behind the scenes.

**Types of Kernels:**

- **Monolithic Kernel (used by Linux):** All core functions run in one large process — efficient but complex.
- **Microkernel:** Minimal kernel functions, with most services running in user space — simpler but slower.

### **1.3 Linux Distributions (Distros)**

A **Linux distribution** is a complete package that includes the Linux kernel, software utilities, desktop environment, and package management tools.

**Popular Distributions:**

- **Ubuntu (Debian-based)** – User-friendly, best for beginners.
- **Debian** – Stable, community-driven base distribution.
- **Fedora** – Red Hat–sponsored, bleeding-edge software.
- **CentOS / Rocky Linux** – Enterprise-level, stable environments.
- **Arch Linux** – Lightweight and highly customizable.
- **Kali Linux** – Security and penetration testing.

**Ubuntu** is one of the most popular distributions because:

- It is easy to install and use.
- It has a large software repository.
- It receives long-term support (LTS) updates for stability.
- It has excellent hardware compatibility.

## **2. Understanding the Linux Architecture**

Linux has a layered architecture divided into four major components:

1. **Hardware Layer** – Physical components like CPU, memory, storage, and devices.
2. **Kernel Layer** – Manages communication between software and hardware.
3. **System Libraries and Utilities** – Provide functions and tools to interact with the kernel (e.g., `glibc`).
4. **User Space** – Includes the shell, GUI, and user applications.

### **2.1 The Shell**

The **shell** is the interface between the user and the kernel. It interprets user commands and executes them.

**Common Shells in Linux:**

- **Bash (Bourne Again Shell):** Default shell on most Linux systems (including Ubuntu).
- **Zsh (Z Shell):** Enhanced shell with advanced features.
- **Fish:** User-friendly and interactive shell.
- **Dash, Ksh, Tcsh:** Other specialized shells.

**Shell Types:**

- **Interactive Shell:** Used when you type commands directly in a terminal.
- **Non-interactive Shell:** Runs scripts automatically without user input.

### **2.2 The Terminal**

The **terminal** (or command-line interface) is where users interact with the shell.

In Ubuntu, you can open it using:

- Keyboard shortcut: **Ctrl + Alt + T**
- Application menu: “Terminal” or “GNOME Terminal”

The terminal is powerful because it allows automation, system control, and deeper interaction than graphical interfaces.

## **3. Linux File System Structure**

Linux organizes files in a **hierarchical directory structure**, starting from the root directory `/`.

```
/
├── bin/        → Essential user binaries (commands)
├── boot/       → Boot loader files (kernel, GRUB)
├── dev/        → Device files
├── etc/        → System configuration files
├── home/       → Home directories of users
├── lib/        → Shared libraries
├── media/      → Mount points for removable devices
├── mnt/        → Temporary mount points
├── opt/        → Optional third-party software
├── proc/       → System and process information
├── root/       → Root user’s home directory
├── sbin/       → System administration binaries
├── tmp/        → Temporary files
├── usr/        → User programs and utilities
└── var/        → Variable files (logs, spool files)

```

**Key Directories Explained:**

- `/home`: Each user gets a personal directory (e.g., `/home/alex`).
- `/etc`: System configuration files like network, users, and startup scripts.
- `/var/log`: Log files for monitoring system events.
- `/dev`: Hardware devices are represented as files (e.g., `/dev/sda` for hard disks).
- `/proc`: Virtual directory showing system info like CPU and memory usage.

## **4. File and Directory Operations**

Linux commands follow this general syntax:

```
command [options] [arguments]
```

**Examples:**

| Command | Description |
| --- | --- |
| `pwd` | Show current working directory |
| `ls` | List files and directories |
| `cd [directory]` | Change directory |
| `mkdir [name]` | Create directory |
| `rmdir [name]` | Remove empty directory |
| `cp [source] [destination]` | Copy files |
| `mv [source] [destination]` | Move or rename files |
| `rm [file]` | Remove files |
| `touch [filename]` | Create an empty file |
| `cat [filename]` | Display file contents |
| `head / tail` | Show first/last lines of file |
| `less / more` | View file contents interactively |
| `find` | Search for files |
| `grep` | Search within files |

**Example Workflow:**

```bash
cd /home/user/Documents
mkdir projects
touch report.txt
cp report.txt /home/user/Desktop
rm report.txt
```

## **5. File Permissions and Ownership**

Linux is a **multi-user system**, and permissions are essential for security.

Each file has three permission categories:

- **User (u)** – Owner of the file
- **Group (g)** – Group of users
- **Others (o)** – Everyone else

And three permission types:

- **r (read)** – View file contents
- **w (write)** – Modify file contents
- **x (execute)** – Run file as a program

**Example of Permission:**

```
-rwxr-xr--
```

- The first character () indicates a regular file.
- Next three (`rwx`) are user permissions.
- Next three (`r-x`) are group permissions.
- Last three (`r--`) are others’ permissions.

**Changing Permissions:**

- `chmod 755 filename` → Grants full access to user, read/execute to others.
- `chown user:group filename` → Change ownership.
- `ls -l` → View permissions and ownership.

## **6. Package Management in Ubuntu**

Ubuntu uses **APT (Advanced Package Tool)** for installing and managing software.

**Common APT Commands:**

| Command | Description |
| --- | --- |
| `sudo apt update` | Update package list |
| `sudo apt upgrade` | Upgrade installed packages |
| `sudo apt install [package]` | Install a package |
| `sudo apt remove [package]` | Remove a package |
| `sudo apt autoremove` | Remove unused dependencies |
| `apt list --installed` | Show installed packages |

**Example:**

```bash
sudo apt update
sudo apt install git
```

**Other Tools:**

- **dpkg** – Low-level package manager for `.deb` files.
- **snap** – Ubuntu’s modern package system for containerized applications.
    
    ```bash
    sudo snap install code --classic
    ```
    

## **7. Users and Groups**

Linux supports multiple users and user groups for managing access and security.

**User Management Commands:**

- `whoami` – Display current user.
- `adduser username` – Add a new user.
- `passwd username` – Change password.
- `deluser username` – Delete user.
- `su username` – Switch user.
- `sudo command` – Run command as administrator.

**Group Management Commands:**

- `groupadd groupname` – Create a group.
- `usermod -aG groupname username` – Add user to group.

**Administrator Access:**

Ubuntu uses `sudo` (superuser do) to grant temporary administrative privileges.

Example:

```bash
sudo apt install nginx
```

## **8. System Monitoring and Process Management**

Linux allows detailed process and resource monitoring.

**Key Commands:**

| Command | Description |
| --- | --- |
| `ps` | Show running processes |
| `top` | Real-time process monitor |
| `htop` | Interactive process viewer (install with apt) |
| `kill [PID]` | Terminate a process by ID |
| `free -h` | Display memory usage |
| `df -h` | Show disk space |
| `du -sh [dir]` | Show size of a directory |
| `uptime` | Show system running time |
| `uname -a` | Display system info |

**Example:**

```bash
ps aux | grep python
kill 1234
```

## **9. Networking Basics**

Linux offers powerful tools for networking.

**Common Commands:**

| Command | Description |
| --- | --- |
| `ifconfig` / `ip a` | Display network interfaces |
| `ping [host]` | Test connectivity |
| `netstat -tulnp` | Show active network connections |
| `curl [URL]` | Transfer data from URLs |
| `wget [URL]` | Download files |
| `ssh [user@host]` | Connect to remote server |
| `scp [file] [user@host:/path]` | Securely copy files |
| `ufw` | Firewall configuration tool |

**Example:**

```bash
ping google.com
ssh user@192.168.1.100
```

## **10. Disk Management and File Systems**

**Disk Utilities:**

- `lsblk` – List block devices.
- `fdisk` – Partition disk.
- `mount / umount` – Mount or unmount file systems.
- `df` – Show disk usage.
- `fsck` – Check and repair file systems.

**Example:**

```bash
sudo fdisk -l
sudo mount /dev/sdb1 /mnt
```

Ubuntu typically uses **EXT4** as its default file system.

## **11. System Services and Daemons**

Linux uses background processes called **daemons** to perform system tasks (networking, logging, etc.).

Ubuntu uses **systemd** to manage services.

**Systemctl Commands:**

- `systemctl status` – Show system status.
- `systemctl start [service]` – Start a service.
- `systemctl stop [service]` – Stop a service.
- `systemctl enable [service]` – Enable at startup.
- `systemctl list-units --type=service` – List services.

**Example:**

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

## **12. Shell Scripting Basics**

Shell scripts automate tasks by running a series of commands.

**Creating a Script:**

1. Create a file:
    
    ```bash
    nano backup.sh
    ```
    
2. Add commands:
    
    ```bash
    #!/bin/bash
    echo "Starting backup..."
    cp /home/user/Documents /mnt/backup/
    echo "Backup complete."
    ```
    
3. Make it executable:
    
    ```bash
    chmod +x backup.sh
    ./backup.sh
    ```
    

**Script Features:**

- Variables: `name="Ubuntu"`
- Conditional Statements: `if`, `else`
- Loops: `for`, `while`
- Functions: reusable blocks of code

## **13. System Logs and Troubleshooting**

Logs help diagnose issues and monitor system activities.

**Log Locations:**

- `/var/log/syslog` – General system messages
- `/var/log/auth.log` – Authentication logs
- `/var/log/dmesg` – Kernel messages
- `/var/log/apt/` – Package management logs

**Commands:**

- `dmesg | less`
- `tail -f /var/log/syslog`

## **14. Security and Updates**

**Security Practices:**

- Use `sudo` responsibly.
- Keep software updated.
- Enable firewall:
    
    ```bash
    sudo ufw enable
    sudo ufw status
    ```
    
- Manage users with least privileges.

**Updates:**

```bash
sudo apt update && sudo apt upgrade
sudo apt dist-upgrade
```

## **15. Common Directories for Administration**

| Directory | Purpose |
| --- | --- |
| `/etc/` | Configuration files |
| `/var/log/` | System logs |
| `/usr/bin/` | Executable programs |
| `/usr/lib/` | Libraries |
| `/tmp/` | Temporary files |
| `/home/` | User directories |
| `/root/` | Root user’s directory |

## **16. Essential Linux Commands Every Developer and User Must Know**

## **1. File and Directory Management Commands**

These commands help you navigate, create, modify, and manage files and directories in the Linux filesystem.

| **Command** | **Description** | **Example Usage** |
| --- | --- | --- |
| `pwd` | Displays the current working directory. | `pwd` |
| `ls` | Lists files and directories. | `ls -l` (detailed view), `ls -a` (show hidden files) |
| `cd` | Changes the current directory. | `cd /home/user/Documents` |
| `mkdir` | Creates a new directory. | `mkdir projects` |
| `rmdir` | Removes an empty directory. | `rmdir old_folder` |
| `touch` | Creates an empty file or updates timestamp. | `touch notes.txt` |
| `cp` | Copies files or directories. | `cp file.txt /home/user/Desktop` |
| `mv` | Moves or renames files/directories. | `mv oldname.txt newname.txt` |
| `rm` | Deletes files or directories. | `rm file.txt`, `rm -r folder_name` |
| `cat` | Displays the contents of a file. | `cat file.txt` |
| `less` | Views large files page by page. | `less /var/log/syslog` |
| `head` | Displays the first few lines of a file. | `head -n 10 file.txt` |
| `tail` | Displays the last few lines of a file. | `tail -f /var/log/syslog` |
| `file` | Identifies the file type. | `file document.pdf` |
| `find` | Searches for files/directories recursively. | `find /home -name "*.txt"` |
| `locate` | Quickly finds files using a database. | `locate index.html` |
| `du` | Shows disk usage of files/directories. | `du -sh /home/user` |
| `df` | Shows available disk space. | `df -h` |
| `stat` | Displays detailed file information. | `stat file.txt` |

**Example Workflow:**

```bash
cd /home/user/Documents
mkdir reports
touch summary.txt
cp summary.txt reports/
ls -l reports/
```

## **2. File Viewing and Editing Commands**

| **Command** | **Description** | **Example Usage** |
| --- | --- | --- |
| `nano` | Simple terminal text editor. | `nano notes.txt` |
| `vi` / `vim` | Powerful modal text editor. | `vi script.sh` |
| `gedit` | GUI text editor (Ubuntu). | `gedit report.txt &` |
| `cat` | View file contents. | `cat /etc/hostname` |
| `less` | View file page by page. | `less /etc/passwd` |
| `grep` | Search text patterns in files. | `grep "error" /var/log/syslog` |
| `sort` | Sorts lines in text files. | `sort names.txt` |
| `uniq` | Removes duplicate lines. | `uniq list.txt` |
| `wc` | Counts lines, words, and characters. | `wc -l file.txt` |
| `cut` | Extracts columns from text. | `cut -d: -f1 /etc/passwd` |
| `diff` | Compares two files line by line. | `diff file1.txt file2.txt` |
| `awk` | Pattern scanning and text processing. | `awk '{print $1}' file.txt` |
| `sed` | Stream editor for text replacement. | `sed 's/old/new/g' file.txt` |

## **3. User and Permission Management Commands**

| **Command** | **Description** | **Example Usage** |
| --- | --- | --- |
| `whoami` | Displays current username. | `whoami` |
| `id` | Displays user ID and group ID. | `id username` |
| `adduser` | Adds a new user. | `sudo adduser john` |
| `passwd` | Changes user password. | `passwd john` |
| `deluser` | Removes a user. | `sudo deluser john` |
| `groupadd` | Creates a new group. | `sudo groupadd developers` |
| `usermod` | Modifies a user’s properties. | `sudo usermod -aG sudo john` |
| `groups` | Displays group memberships. | `groups john` |
| `su` | Switches user account. | `su john` |
| `sudo` | Runs command as administrator. | `sudo apt update` |
| `chmod` | Changes file permissions. | `chmod 755 script.sh` |
| `chown` | Changes file ownership. | `sudo chown john:john file.txt` |
| `umask` | Sets default permission mask. | `umask 022` |

**Example:**

```bash
sudo adduser alice
sudo usermod -aG sudo alice
sudo chown alice:alice project.txt
chmod 700 project.txt
```

## **4. Process and System Monitoring Commands**

| **Command** | **Description** | **Example Usage** |
| --- | --- | --- |
| `ps` | Lists running processes. | `ps aux` |
| `top` | Displays active processes dynamically. | `top` |
| `htop` | Interactive process viewer (requires install). | `htop` |
| `kill` | Terminates a process by PID. | `kill 1234` |
| `killall` | Kills processes by name. | `killall firefox` |
| `nice` | Sets process priority. | `nice -n 10 command` |
| `renice` | Changes priority of running process. | `renice -n 5 -p 1234` |
| `jobs` | Lists background jobs. | `jobs` |
| `bg` | Resumes a job in background. | `bg %1` |
| `fg` | Brings a job to foreground. | `fg %1` |
| `uptime` | Shows system uptime and load. | `uptime` |
| `free` | Displays memory usage. | `free -h` |
| `vmstat` | Displays memory and process statistics. | `vmstat 2` |
| `df` | Disk space usage. | `df -h` |
| `du` | Directory space usage. | `du -sh *` |

**Example:**

```bash
ps aux | grep nginx
kill 2531
free -h
df -Th
```

## **5. Networking Commands**

| **Command** | **Description** | **Example Usage** |
| --- | --- | --- |
| `ifconfig` | Displays network interfaces (deprecated, use `ip`). | `ifconfig` |
| `ip a` | Displays IP addresses and interfaces. | `ip a` |
| `ping` | Tests network connectivity. | `ping google.com` |
| `curl` | Sends HTTP requests. | `curl https://example.com` |
| `wget` | Downloads files from the web. | `wget https://file.com/file.zip` |
| `ssh` | Connects to a remote server securely. | `ssh user@192.168.1.10` |
| `scp` | Copies files over SSH. | `scp file.txt user@192.168.1.10:/home/user/` |
| `netstat` | Displays network connections. | `netstat -tulnp` |
| `ss` | Modern replacement for `netstat`. | `ss -tuln` |
| `traceroute` | Shows path packets take to reach a destination. | `traceroute google.com` |
| `nslookup` | DNS lookup for domain names. | `nslookup openai.com` |
| `hostname` | Displays or sets system hostname. | `hostnamectl set-hostname server1` |
| `ufw` | Simple firewall management tool. | `sudo ufw enable` |

**Example:**

```bash
ping -c 4 8.8.8.8
curl -I https://ubuntu.com
ssh admin@192.168.1.5
sudo ufw allow 22/tcp
```

## **6. Package Management Commands (Ubuntu)**

| **Command** | **Description** | **Example Usage** |
| --- | --- | --- |
| `apt update` | Updates package index. | `sudo apt update` |
| `apt upgrade` | Upgrades all installed packages. | `sudo apt upgrade` |
| `apt install` | Installs a package. | `sudo apt install git` |
| `apt remove` | Removes a package. | `sudo apt remove nginx` |
| `apt purge` | Removes package and configuration files. | `sudo apt purge nginx` |
| `apt autoremove` | Removes unused dependencies. | `sudo apt autoremove` |
| `dpkg -l` | Lists installed packages. | `dpkg -l |
| `snap install` | Installs Snap package. | `sudo snap install code --classic` |

**Example:**

```bash
sudo apt update
sudo apt install htop curl
sudo apt autoremove
```

## **7. Disk, Storage, and File System Commands**

| **Command** | **Description** | **Example Usage** |
| --- | --- | --- |
| `lsblk` | Lists block devices. | `lsblk` |
| `fdisk` | Partition management tool. | `sudo fdisk -l` |
| `mount` | Mounts file systems. | `sudo mount /dev/sdb1 /mnt` |
| `umount` | Unmounts file systems. | `sudo umount /mnt` |
| `blkid` | Shows device UUIDs. | `sudo blkid` |
| `fsck` | Checks and repairs file systems. | `sudo fsck /dev/sda1` |
| `parted` | Disk partition editor. | `sudo parted /dev/sda` |
| `mkfs` | Creates a file system on a partition. | `sudo mkfs.ext4 /dev/sdb1` |

## **8. System Information and Hardware Commands**

| **Command** | **Description** | **Example Usage** |
| --- | --- | --- |
| `uname -a` | Displays kernel and system information. | `uname -a` |
| `lscpu` | Shows CPU details. | `lscpu` |
| `lsusb` | Lists connected USB devices. | `lsusb` |
| `lspci` | Lists PCI devices. | `lspci` |
| `dmidecode` | Shows hardware information. | `sudo dmidecode -t system` |
| `lsmod` | Lists loaded kernel modules. | `lsmod` |
| `dmesg` | Displays kernel messages. | `dmesg |
| `uptime` | Shows system uptime and load. | `uptime` |
| `hostnamectl` | Displays system and OS details. | `hostnamectl` |

## **9. Compression and Archiving Commands**

| **Command** | **Description** | **Example Usage** |
| --- | --- | --- |
| `tar` | Creates or extracts tar archives. | `tar -czvf archive.tar.gz folder/` |
| `gzip` | Compresses files. | `gzip file.txt` |
| `gunzip` | Decompresses `.gz` files. | `gunzip file.txt.gz` |
| `zip` | Compresses files into zip archive. | `zip archive.zip file1 file2` |
| `unzip` | Extracts zip archives. | `unzip archive.zip` |

## **10. System Management and Services**

| **Command** | **Description** | **Example Usage** |
| --- | --- | --- |
| `systemctl` | Controls systemd services. | `sudo systemctl start nginx` |
| `service` | Manages system services (older systems). | `sudo service ssh restart` |
| `journalctl` | Views system logs. | `journalctl -u nginx` |
| `shutdown` | Shuts down the system. | `sudo shutdown now` |
| `reboot` | Restarts the system. | `sudo reboot` |
| `hostnamectl` | Sets hostname. | `sudo hostnamectl set-hostname server1` |
| `timedatectl` | Manages time settings. | `timedatectl list-timezones` |
| `cron` | Schedules recurring tasks. | `crontab -e` |