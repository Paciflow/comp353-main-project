# 📘 COMP 353 – Montréal Youth Volleyball Club Database Project

## 📚 Project Overview
This project is a fully normalized MySQL database system for the Montréal Youth Volleyball Club. It manages:
- Member and family registrations
- Payments and membership validation
- Team formations and player roles
- Personnel assignments
- Email notifications via triggers

The system enforces data integrity through foreign keys, CHECK constraints, and TRIGGERS.

---

## 📂 Repository Structure
| File           | Description                                              |
|----------------|----------------------------------------------------------|
| `schema.sql`   | Full schema including tables, constraints, and triggers |
| `queries.sql`  | 20+ required SQL queries for analysis and reporting     |
| `README.md`    | Project overview, features, and usage instructions      |

---

## 🧱 Technologies Used
- **MySQL 8.x** (Workbench / CLI)
- SQL (DDL + DML)
- Git + GitHub for version control
- GUI (developed by teammate)

---

## ✅ Key Features
- **3NF/BCNF schema** with properly normalized tables
- **CHECK constraints** to enforce valid data
- **Triggers** for:
  - Auto-deactivating members at age 19
  - Preventing overlapping session assignments
  - Email logging on new team formations
  - Validating personnel assignments (e.g., GMs only at Head locations)
- **EmailLog** table to simulate system alerts
- 20+ analytical queries across all main tables

---

## 🚀 Getting Started

### 📥 Clone the Repo
```bash
git clone https://github.com/YOUR_USERNAME/comp353-main-project.git
cd comp353-main-project
```

### 🧑‍💻 Load the Schema & Sample Data
1. Open `schema.sql` in MySQL Workbench
2. Run the script to create tables, triggers, and constraints

### 🔎 Run Queries
1. Open `queries.sql`
2. Execute queries for reporting and demo purposes

---

## 📊 Query Highlights
- Members with incomplete payments
- Players who only played Libero
- Sessions with more than 6 players
- Members who never paid
- Players who participated in all games
- Session-player-role analytics

---

## 👨‍👩‍👦 Contributors
- **Pacifique Uwamukiza** – Schema, logic, constraints, SQL queries
- **Jeremy Tang** – GUI interface (front-end integration)
