Project Description
This project is a web application called Read Journey, designed for users to explore and manage their reading activities, recommend books, and organize their personal library. The platform enables users to register, log in, browse recommended books, add them to their library, and track their reading progress.

Key Features:
User Authentication: Register, login, and logout functionality with automatic redirection to private pages upon successful authentication.
Responsive Design: The application is designed to be fully responsive, with specific layouts for mobile (320px and above), tablet (768px and above), and desktop (1440px and above).
Book Recommendation: Users can view a list of recommended books, with pagination and filtering options to refine book searches.
Library Management: Users can manage their personal library, including adding and removing books, marking their reading progress, and viewing detailed book information.
Reading Tracker: Track reading progress with a detailed diary or statistics graph to monitor pages read, time spent, and reading speed.
Interactive Modals: Modals are used for adding books to the library, starting and stopping reading, and viewing detailed book information.
Technologies:
React: For building the user interface and handling state management.
React Router: For routing between different pages.
React Hook Form & Yup: For form validation in the registration, login, and book addition forms.
Redux: For managing user authentication state and other global application states.
CSS (Responsive Layout): Custom styling with responsive design based on HTML5 standards.
Backend: Interfacing with a backend API to manage book data, user library, and reading progress.
Tasks and Functionality:
User Registration & Login:
Register Page (/register):

Form validation using react-hook-form and Yup.
Fields include Name, Email, and Password, with specified validation rules.
On successful registration, user is redirected to the Recommended page.
Login Page (/login):

Form validation for Email and Password.
Upon successful login, the user is redirected to the Recommended page.
Main Layout:
Header: Visible on all pages for logged-in users, containing navigation links (Recommended, My Library), user info, and a logout button.
The logout process includes clearing session data (Redux store, localStorage) and redirecting to the welcome page.
Recommended Page (/recommended):
Dashboard: Includes a filter form to refine recommended book results by category.
RecommendedBooks: Displays recommended books with pagination and a "Load More" button.
Clicking on a book opens a modal with detailed information and an "Add to Library" button.
Filters: Allows filtering books based on categories or other criteria.
My Library Page (/library):
Dashboard: Displays a form to add new books to the library, validated before submitting.
MyLibraryBooks: Displays books in the user's library with the option to delete or mark books as read.
Library Filtering: Books can be filtered by their reading status.
Reading Page (/reading):
Dashboard: Includes a form to track reading progress.

"To Start" and "To Stop" buttons allow users to mark the current page of the book.
On success, the user's reading data is updated on the backend, and progress is shown.
Diary & Statistics: Two views for tracking reading history, including pages read, time spent, and a graphical view of reading progress.

General Features:
Modals: Used to handle actions like adding books to the library, viewing book details, and interacting with the reading tracker.
Responsive Layout: The design adapts to different screen sizes, ensuring a seamless experience across mobile, tablet, and desktop devices.
Backend Integration:
The backend API manages user sessions, book data, library items, and reading progress. It is integrated with the frontend for real-time updates and data retrieval.
Conclusion:
Read Journey is a robust web application that combines a clean and intuitive interface with powerful functionality for book lovers. Whether it's finding new reading material, managing a personal library, or tracking progress, users are provided with all the tools needed to enhance their reading experience.
