---
id: 'linux-vm-azure'
title: 'Creating a Linux Virtual Machine on Azure'
slug: 'linux-vm-on-azure'
date: 2025-12-22
summary: 'A step-by-step guide to deploying your first Ubuntu server on Microsoft Azure, from creation to SSH connection.'
tags: ['Azure', 'Linux', 'Ubuntu', 'Cloud Computing']
image: /img/blog/default_blog.jpg
author: David Deras
lastmod: 2025-12-22
---

In this guide, we will learn how to deploy a Linux virtual machine (VM) (specifically Ubuntu) on Microsoft Azure cloud. We will go through the step-by-step configuration process, from selecting the image to secure connection via SSH, and review some best practices for managing your cloud resources.

[toc]

---

## Prerequisites

Before we begin, make sure you have:

- An active Microsoft Azure account. If you don't have one, you can create a <a target="_blank" href="https://azure.microsoft.com/en-us/free/" rel="noopener noreferrer">free account</a> that includes initial credit and free services for 12 months. You can also take advantage of the free subscription if you are a student through <a target="_blank" href="https://azure.microsoft.com/en-us/free/students/" rel="noopener noreferrer">Azure for Students</a>.
- A terminal (PowerShell, CMD, Bash) and an SSH client installed on your computer.

---

## Accessing the Portal

The first step is to log in to the <a target="_blank" href="https://portal.azure.com/" rel="noopener noreferrer">Azure Portal</a>.

Once inside, in the top search bar, type "Virtual machines" and select the service.

![Searching for the virtual machines service](/blog/linux-vm-on-azure/shared/search-vm.png)
_Searching for the virtual machines service_

---

## Creating the Virtual Machine

Within the Virtual Machines panel, click on the **Create** button and select **Virtual machine**.

![Create VM button](/blog/linux-vm-on-azure/shared/create-button.png)
_Starting the creation wizard_

This will open the configuration wizard. Let's configure the most important tabs.

### 1. Basics

This is the most critical section. Here we will define what our machine is and where it will live.

Configure the following fields:

1.  **Subscription**: Select your active subscription.
2.  **Resource group**: It is a logical container for your resources. Click on "Create new" and give it a name (e.g., `rg-linux-demo`). This makes it easier to delete everything later.
3.  **Virtual machine name**: A descriptive name, for example `vm-ubuntu-01`.
4.  **Region**: Choose the region closest to you or your users (e.g., `(US) East US`).
5.  **Availability options**: For this tutorial, we can leave it as "No infrastructure redundancy required".
6.  **Security type**: Leave it as "Standard".
7.  **Image**: Here we will select the operating system. Search for and select **Ubuntu Server 24.04 LTS - x64 Gen2** (or the latest available LTS version).
8.  **Size**: This defines the power (CPU/RAM) and cost. For testing, look for the **B1s** or **B2s** series (Standard_B1s), which are usually economical or eligible for the free tier.

> **Note on costs**: Azure charges by the minute of usage. Make sure to review the estimated monthly price that appears when selecting the size.

#### Administrator Account

Here we will configure how we will access the VM.

- **Authentication type**: Select **SSH public key** (Recommended for security).
- **Username**: `azureuser` (or your preferred one).
- **SSH public key source**: Select "Generate new key pair".
- **Key pair name**: Give it a name to identify the file we will download (e.g., `vm-ubuntu-01_key`).

#### Inbound Port Rules

To be able to manage the server remotely, we need to open the SSH port.

- **Public inbound ports**: Select "Allow selected ports".
- **Select inbound ports**: Make sure **SSH (22)** is selected.

---

### 2. Disks and Networking

For a basic deployment, the default configurations in the **Disks** and **Networking** tabs are usually sufficient.

- In **Disks**, Azure will assign a Premium or Standard SSD disk by default.
- In **Networking**, it will automatically create a Virtual Network (VNet) and a Public IP so that your machine is accessible from the internet.

You can proceed by clicking **Next** until you reach the **Review + create** tab.

---

## Review + create

Azure will validate your configuration. If everything is correct, you will see a "Validation passed" message and the estimated hourly price.

Click **Create**.

<!-- ![Validation and creation](/blog/linux-vm-on-azure/shared/review-create.png)
_Final summary before creating_ -->

### Downloading the private key

Immediately after clicking create, a pop-up window will appear asking you to download the private key.

**IMPORTANT**: Click on **Download the private key and create the resource**.
A `.pem` file will be downloaded to your computer. **Do not lose this file**, it is the only "key" to access your server. Store it in a secure folder (e.g., `~/.ssh/` or in your projects folder).

<!-- ![Downloading SSH key](/blog/linux-vm-on-azure/shared/download-key.png)
_Pop-up window to download the .pem key_ -->

---

## Connecting to the VM

Wait a few minutes for the deployment to complete. When you see the message "Deployment succeeded," click on **Go to resource**.

On the Overview page of your new VM, look for the **Public IP address**. Copy it.

<!-- ![Public IP of the VM](/blog/linux-vm-on-azure/shared/public-ip.png)
_Location of the public IP_ -->

Now, open your terminal on your computer (where you saved the `.pem` file).

1.  (Optional but recommended on Linux/Mac) Change the key permissions to be read-only:

```bash
chmod 400 path/to/your/key.pem
```

2.  Connect using the SSH command:

```bash
ssh -i path/to/your/key.pem azureuser@YOUR_PUBLIC_IP
```

_Replace `path/to/your/key.pem` with the actual path and `YOUR_PUBLIC_IP` with the IP you copied from Azure._

3.  The first time, it will ask if you trust the host (`Are you sure you want to continue connecting?`). Type `yes` and press ENTER.

You're all set! You should see the Ubuntu welcome prompt.

<!-- ![Terminal connected](/blog/linux-vm-on-azure/shared/terminal-connected.png)
_Successful SSH connection_ -->

---

## First steps on your server

Once inside, it's a good practice to update the system repositories and packages. Run:

```bash
sudo apt update && sudo apt upgrade -y
```

Now you have a full Linux server at your disposal in the cloud. You can install a web server like Nginx, Docker, or deploy your applications.

---

## Cleaning up resources

If you created this machine just to test, remember to delete it to avoid unexpected costs.

The easiest way to delete everything is to delete the **Resource Group** we created at the beginning (`rg-linux-demo`). This will delete the VM, the disk, the public IP, and the virtual network all at once.

1. Go to "Resource Groups" in the portal.
2. Select your group.
3. Click on "Delete resource group".
4. Confirm the name and delete.

---
