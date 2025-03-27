# comp353-main-project
Database system for the Montréal Youth Volleyball Club – COMP 353
# COMP 353 – Montréal Youth Volleyball Club Database System

## Project Overview
This database system models the Montréal Youth Volleyball Club, handling:
- Member registration (ages 11–18)
- Payments and donations
- Family relationships
- Game and training sessions
- Personnel roles and mandates
- Email logging and data integrity rules

## File Structure
| File | Description |
|------|-------------|
| `schema.sql` | Full schema: tables, constraints, triggers, and sample data |
| `queries.sql` | 20+ required queries using joins, grouping, conditions, etc. |
| `README.md` | Project description, schema summary, and usage instructions |
| `sample_output/` | (Optional) Query screenshots or .txt files |

---

## Technologies Used
- MySQL 8.x
- MySQL Workbench
- SQL (DDL, DML, Triggers, Views)
- GitHub (version control)
- (Optional) GUI by teammate using _______________

---

## Key Features
- **3NF/BCNF Schema** with strong normalization
- **Triggers** for:
  - Player deactivation at age 19
  - Session time conflict prevention
  - Email logging
- **CHECK constraints** for rule enforcement
- **EmailLog table** simulating automated notifications
- **20+ SQL queries** showing full system interaction

---

## How to Run the Project

1. Clone the repo  
