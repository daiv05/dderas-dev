---
id: 'linux-vm-azure'
title: 'Creating a Linux Virtual Machine on Azure'
slug: 'linux-vm-on-azure'
date: 2025-12-22
summary: 'A step-by-step guide to deploying your first Ubuntu server on Microsoft Azure, from creation to SSH connection.'
tags: ['Azure', 'Linux', 'Ubuntu', 'Cloud Computing']
image: /blog/linux-vm-on-azure/shared/azure-vm.jpeg
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
