📌 Product Management & Invoice Generation Portal
This project is a React-based web application designed to manage products across multiple stores and generate invoices efficiently.

📝 Project Overview
This application consists of the following key features:

✅ Task 1: Invoice Generation Portal (Mandatory)
Generates invoices for all stores.
Displays order details, including:
Store Name, Order ID, Date, Quantity
Regular Price, Deal Price, Item Total, Item-wise Tax
Grand Total (with & without tax)

✅ Task 2: Product Management Portal (Mandatory)
Displays all stores and products.
CRUD operations (Edit, Delete, Update products).
Allows filtering by store and searching by product name.

⚡ Task 3: Additional Features (Optional)
Filter invoices by date and item.
Generate invoices in PDF format.
Store Owners can log in and manage their store details.
View and download invoices securely.

🎯 Technologies Used
Frontend: React.js (Styled Components for UI)
Backend: Node.js + Express.js
Database: MySQL
Authentication: JWT-based authentication for store owners
State Management: Context API / Redux
PDF Generation: React-PDF / jsPDF


🛠 Installation & Setup

1️⃣ Clone the repository
sh
Copy
Edit
git clone https://github.com/VenkateshLatchireddy/Product-Management-Portal.git
cd Product-Management-Portal


2️⃣ Install dependencies (Frontend & Backend)

sh
Copy
Edit
# Navigate to the frontend folder and install dependencies
cd Frontend
npm install

# Navigate to the backend folder and install dependencies
cd ../Backend
npm install


3️⃣ Start the Backend Server (Runs on Port 5000)

sh
Copy
Edit
cd Backend
node server.js
The backend server will run at: http://localhost:5000


4️⃣ Start the Frontend Server

sh
Copy
Edit
cd ../Frontend
npm start
The frontend will run at: http://localhost:3000

This will ensure clear backend startup instructions using node server.js. 🚀
Let me know if you need any modifications! 😊
🖼 Project Screenshots

![Login Page](https://raw.githubusercontent.com/VenkateshLatchireddy/Product-Management-Portal/main/Frontend/src/assets/loginpage.png)


![Products List](https://raw.githubusercontent.com/VenkateshLatchireddy/Product-Management-Portal/main/Frontend/src/assets/productlist.png)

![Stores](https://raw.githubusercontent.com/VenkateshLatchireddy/Product-Management-Portal/main/Frontend/src/assets/stores.png)

![Store Search](https://raw.githubusercontent.com/VenkateshLatchireddy/Product-Management-Portal/main/Frontend/src/assets/storesearch.png)

![Edit Product Details](https://raw.githubusercontent.com/VenkateshLatchireddy/Product-Management-Portal/main/Frontend/src/assets/editproductdetails.png)

![PDF Generation](https://raw.githubusercontent.com/VenkateshLatchireddy/Product-Management-Portal/main/Frontend/src/assets/pdfgeneration.png)


🔑 User Roles & Features
Role	Features
Store Owner	Login, Manage Store Details, View & Download Invoices
Admin	Manage All Stores & Products, Generate Reports
User (Read-only)	View Store Products
🚀 Future Enhancements
Export Reports (Excel, CSV)
Multi-user roles & permissions
Email invoices to customers
Graphical sales reports & insights
🤝 Contributing
Contributions are welcome! Feel free to fork the repo, create a new branch, and submit a pull request.

📜 License
This project is licensed under the MIT License.

🎯 Let me know if you want any modifications! 🚀
This version highlights your interview project professionally and makes it easy for the interviewer to understand your work.
