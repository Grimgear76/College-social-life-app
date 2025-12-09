
# **College Social Life App**

A full-stack **MERN** social platform built to help students connect, share posts, and interact in real time. This project explores modern web development, networking, security, and deployment using **Cloudflare Tunnel** and a self-hosted server.

---

## 🚀 **Features**

* User accounts & authentication
* Create, like, and interact with posts
* Real-time updates using WebSockets
* Modern React interface
* Express/Node.js backend
* MongoDB database
* Fully documented setup & deployment guides

---

## 📚 **Documentation**

All project documentation is available in the GitHub Wiki:

👉 **Full Documentation:**
[https://github.com/Grimgear76/College-social-life-app/wiki](https://github.com/Grimgear76/College-social-life-app/wiki)

The documentation includes:

### **1. Setup Guide**

* Installing dependencies
* Running the backend and frontend
* Environment variables
* Database configuration
* Running the website on localhost

### **2. Online Deployment via Cloudflare Tunnel**

* How Cloudflare Tunnel exposes local services
* Domain connection
* HTTPS routing
* Docker + Tunnel configuration
* Making the site publicly accessible through your home server

### **3. Networking Architecture**

Explains how:

* HTTP and WebSocket traffic moves through Cloudflare Tunnel
* Ports, routing, DNS, and secure connections work
* Backend/frontend communication happens
* WebSockets update live events (e.g., real-time post likes)

### **4. Software Development Process**

Covers:

* User Stories and Validation Sketches
* Website Flowchart
* System Archetecture
* Websocket, Redux, and API concepts used in this project

### **5. Security Considerations**
* UNDER CONSTRUCTION :)

---

## **Tech Stack**

### **MERN**

* **MongoDB** – NoSQL database for storing user data and posts
* **Express** – REST API and backend logic
* **React** – Dynamic and responsive frontend UI
* **Node.js** – Server runtime

Why MERN?

* Single language (JavaScript) across the entire stack
* Fast, scalable backend with event-driven architecture
* React provides component-driven UI development
* Excellent fit for real-time interactions

---

## ⚡ **Project Goals**

* Build a real social platform as a networking, web dev, and systems project
* Learn real deployment with Cloudflare Tunnel + self-hosting
* Understand frontend-backend communication
* Develop real-time functionality
* Practice secure system design
* Gain full-stack experience from concept → deployment

---

## 🧩 **System Overview**

The app is structured as:

```
Frontend (React)
    ↓ WebSockets / REST
Backend API (Express + Node.js)
    ↓
Database (MongoDB)
    ↓
Cloudflare Tunnel (for public deployment)
    ↓
Public Internet / Users
```

---


## **About the Project**

This repository represents a complete learning experience across:

* Full-stack development
* Real-world networking
* Cloudflare tunnels
* Hosting through a home server
* Security best practices
* Documentation writing
* System architecture & planning

