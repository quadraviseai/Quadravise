# Quadravise Project Architecture Documentation

**Project Type:** Full-Stack Web Application (CRM + Marketing Website)  
**Current Date:** February 8, 2026  
**Repository:** Quadravise_main

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [High-Level Architecture](#high-level-architecture)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Database Schema](#database-schema)
7. [API Design](#api-design)
8. [Authentication & Authorization](#authentication--authorization)
9. [Data Flow](#data-flow)
10. [Deployment Structure](#deployment-structure)

---

## Project Overview

**Quadravise** is a comprehensive full-stack web application consisting of:

1. **Marketing Website** - A static/semi-static React-based website showcasing agency services, portfolio, and contact information
2. **CRM System** - A customer relationship management platform for managing accounts, contacts, deals, tasks, and financial transactions
3. **Backend API** - A Django REST Framework API serving both the CRM and website

### Key Use Cases

- Marketing and lead generation for a web development agency
- CRM operations (account/contact management, deal tracking, task management)
- Financial transaction tracking and reporting
- Role-based user access control
- Multi-user collaboration and task assignment

---

## Technology Stack

### Frontend

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React | 18.3.1 |
| **Router** | React Router DOM | 6.30.1 |
| **UI Library** | Ant Design (AntD) | 6.2.1 |
| **HTTP Client** | Axios | 1.13.2 |
| **State Management** | React Context API / React Query | - / 5.90.2 |
| **Animation** | Framer Motion + GSAP | 12.23.26 / 3.14.2 |
| **Charts** | Recharts | 2.15.0 |
| **Build Tool** | React Scripts | 5.0.1 |
| **Styling** | CSS + Tailwind (via tailwind.config.js) | - |
| **Forms** | React Input Mask | 2.0.4 |
| **Helmet** | React Helmet Async | 2.0.5 |

### Backend

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Django | 5.0+ |
| **API Framework** | Django REST Framework | Latest |
| **Database** | PostgreSQL | 12+ |
| **Database Driver** | psycopg2-binary | Latest |
| **CORS Handling** | django-cors-headers | Latest |
| **Environment Config** | python-dotenv | Latest |
| **Language** | Python | 3.8+ |

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Marketing Website    │    CRM System (Authenticated)  │ │
│  │  - Home              │  - Dashboard                   │ │
│  │  - Services          │  - Accounts Management         │ │
│  │  - Products          │  - Contacts Management         │ │
│  │  - About Us          │  - Deals Pipeline              │ │
│  │  - Case Studies      │  - Tasks Management            │ │
│  │  - Blog              │  - Finance Tracking            │ │
│  │  - Contact Us        │  - Reports & Analytics         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      │ HTTP/REST API
                      │ (Axios)
                      │
┌─────────────────────▼──────────────────────────────────────┐
│              Backend (Django REST Framework)                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ API Routes:                                           │ │
│  │ - /api/v1/auth/ (Authentication & Authorization)     │ │
│  │ - /api/v1/accounts/ (Account Management)             │ │
│  │ - /api/v1/contacts/ (Contact Management)             │ │
│  │ - /api/v1/deals/ (Deal Management)                   │ │
│  │ - /api/v1/tasks/ (Task Management)                   │ │
│  │ - /api/v1/finance/ (Financial Transactions)          │ │
│  │ - /api/v1/dashboard/ (Dashboard Data)                │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      │ ORM (Django ORM)
                      │
┌─────────────────────▼──────────────────────────────────────┐
│              PostgreSQL Database                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ - Users & Authentication                              │ │
│  │ - Accounts (Companies)                                │ │
│  │ - Contacts (People)                                   │ │
│  │ - Deals (Sales Pipeline)                              │ │
│  │ - Tasks & Activities                                  │ │
│  │ - Finance Transactions & Audit Logs                   │ │
│  │ - Permissions & Roles                                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Directory Structure

```
src/
├── assets/                    # Static assets
│   └── images/               # Image files
├── components/               # Reusable React components
│   ├── common/              # Common components (CookieBanner, Modals, etc.)
│   ├── layout/              # Layout components (Header, Footer, PageLayout)
│   ├── sections/            # Page sections
│   ├── ui/                  # UI-specific components
│   └── utils/               # Utility components
├── context/                 # React Context
│   └── AuthContext.js       # Authentication context (user, auth state)
├── CRM/                     # CRM Module
│   ├── CRMLayout.js        # CRM main layout
│   ├── components/         # CRM-specific components
│   ├── hooks/              # Custom hooks for CRM
│   └── providers/          # Context providers for CRM
├── hooks/                  # Custom React hooks
│   └── useCookieTracking.js # Cookie tracking hook
├── pages/                  # Page components
│   ├── Login/             # Authentication pages
│   ├── Services/          # Service detail pages
│   ├── AboutUs.js
│   ├── HomePage.js
│   ├── ContactUsPage.js
│   ├── Products.js
│   ├── Blog.js
│   ├── CaseStudies.js
│   ├── Privacy.js
│   ├── CookiePolicy.js
│   ├── TermsOfService.js
│   └── NotFoundPage.js
├── routes/                # Route configuration
│   └── ProtectedRoute.js  # Protected route wrapper
├── services/              # API service layer
│   ├── api.js            # Axios instance & base config
│   ├── accountsAPI.js    # Account API calls
│   ├── contactsAPI.js    # Contact API calls
│   ├── dealsAPI.js       # Deal API calls
│   ├── tasksAPI.js       # Task API calls
│   ├── financeService.js # Finance API calls
│   ├── dashboardAPI.js   # Dashboard data API
│   ├── usersAPI.js       # User management API
│   ├── permissionService.js # Permission checks
│   └── aiService.js      # AI-related API calls
├── templates/            # Email/content templates
│   └── Login/
├── App.js               # Main App component with routing
├── App.css             # Global styles
├── index.js            # Entry point
├── index.css           # Global styles
└── setupTests.js       # Test configuration
```

### Component Organization

#### Public Pages (Marketing Website)
- **HomePage** - Landing page with hero, features, CTA
- **Services** - Main services overview
- **Products** - Product listings
- **AboutUs** - Company information
- **Blog** - Blog articles listing
- **CaseStudies** - Portfolio/case studies
- **ContactUsPage** - Contact form and information
- **Privacy, CookiePolicy, TermsOfService** - Legal pages

#### Authentication Pages
- **Login** - User login with email/password
- **ForgotPassword** - Password reset request
- **ResetPassword** - Password reset with token
- **LoginPageOne, LoginPageTwo** - Alternative login designs

#### CRM Module Pages
- **Dashboard** - Overview of CRM metrics and activities
- **Accounts** - Company/account management
- **Contacts** - Contact management for each account
- **Deals** - Sales pipeline and deal tracking
- **Tasks** - Task management and assignment
- **Finance** - Financial transaction tracking and reports

### Routing Structure

```javascript
Routes:
├── Public Routes (no authentication required)
│   ├── / → HomePage
│   ├── /products → Products
│   ├── /services → Services
│   ├── /about → AboutUs
│   ├── /blog → Blog
│   ├── /case-studies → CaseStudies
│   ├── /contact → ContactUsPage
│   ├── /services/:serviceType → Service details
│   ├── /privacy → Privacy
│   ├── /cookie-policy → CookiePolicy
│   ├── /terms → TermsOfService
│   ├── /login → Login
│   ├── /forgot-password → ForgotPassword
│   └── /reset-password → ResetPassword
├── Protected Routes (authentication required)
│   └── /crm/* → CRM Module
│       ├── /crm/dashboard → Dashboard
│       ├── /crm/accounts → Accounts
│       ├── /crm/contacts → Contacts
│       ├── /crm/deals → Deals
│       ├── /crm/tasks → Tasks
│       └── /crm/finance → Finance
└── Fallback
    └── * → NotFoundPage
```

### State Management

**Current Implementation:**
- **React Context API** - Authentication context (user session, auth tokens)
- **React Query (@tanstack/react-query)** - Server state management for API data
  - Caching and automatic refetching
  - Query and mutation management
  - DevTools for debugging

**State Stores:**
```javascript
// AuthContext provides:
- currentUser { email, firstName, lastName, role, id }
- isAuthenticated (boolean)
- login(email, password)
- logout()
- updateProfile()

// Local Component State:
- Form inputs and validation
- UI state (modals, dropdowns, loading states)
- Pagination and filtering
```

### API Integration Layer

All API calls are centralized in `/src/services/`:

```javascript
// Base API Configuration (api.js)
- Axios instance with base URL
- Request/response interceptors
- Error handling
- CSRF token management

// Individual Service Modules:
- accountsAPI.js - GET, POST, PUT, DELETE for accounts
- contactsAPI.js - Contact CRUD operations
- dealsAPI.js - Deal pipeline management
- tasksAPI.js - Task management
- financeService.js - Financial transaction tracking
- dashboardAPI.js - Dashboard statistics and metrics
- usersAPI.js - User management and team operations
- permissionService.js - Role-based access control checks
- aiService.js - AI service integrations
```

---

## Backend Architecture

### Django Project Structure

```
backend/
├── manage.py                          # Django management command
├── requirements.txt                   # Python dependencies
├── quadravise_backend/               # Main Django project
│   ├── __init__.py
│   ├── settings.py                   # Django configuration
│   ├── urls.py                       # URL routing
│   ├── wsgi.py                       # WSGI application
│   └── asgi.py                       # ASGI application
├── authentication/                   # Authentication app
│   ├── models.py                    # User, RolePermission, AuditLog, etc.
│   ├── views.py                     # Auth views (Login, Logout, etc.)
│   ├── serializers.py               # DRF serializers
│   ├── permissions.py               # Custom permission classes
│   ├── urls.py                      # Auth routes
│   ├── admin.py                     # Admin configuration
│   ├── apps.py                      # App configuration
│   ├── tests.py                     # Unit tests
│   │
│   └── migrations/                  # Database migrations
│       ├── 0001_initial.py          # Initial User model
│       └── 0002_rolepermission.py   # Role-based permissions
│
└── core/                             # Core CRM app
    ├── models.py                    # Account, Contact, Deal, Task, etc.
    ├── views.py                     # CRM ViewSets and Views
    ├── serializers.py               # DRF serializers
    ├── urls.py                      # Core routes
    ├── admin.py                     # Admin configuration
    ├── apps.py                      # App configuration
    ├── tests.py                     # Unit tests
    │
    └── migrations/                  # Database migrations
        ├── 0001_initial.py
        ├── 0002_contact_deal_task.py
        ├── ...
        └── 0013_financeaireport.py
```

### Django Apps

#### 1. Authentication App (`authentication/`)

**Models:**
- `User` - Custom user model (extends AbstractBaseUser)
  - `email` (unique, primary identifier)
  - `first_name`, `last_name`
  - `role` (dynamic, e.g., ADMIN, FINANCE_MANAGER)
  - `is_active`, `is_staff`, `created_at`, `updated_at`

- `RolePermission` - Role-based access control
  - `role` (unique role identifier)
  - `modules` (JSONField - list of allowed modules)
  
- `AuditLog` - User activity tracking
  - `user`, `action`, `ip_address`, `timestamp`, `details`

- `PasswordResetToken` - Secure password reset
  - `user`, `token`, `created_at`, `expires_at`, `used`

**Views/Endpoints:**
- `POST /api/v1/auth/login/` - User login
- `POST /api/v1/auth/logout/` - User logout
- `GET /api/v1/auth/me/` - Get current user profile
- `POST /api/v1/auth/forgot-password/` - Request password reset
- `POST /api/v1/auth/reset-password/` - Reset password with token
- `GET /api/v1/auth/users/` - List all users (admin)
- `POST /api/v1/auth/users/create/` - Create new user (admin)
- `GET /api/v1/auth/users/permissions/` - Get role permissions

#### 2. Core App (`core/`)

**Models:**

1. **Account** - Company/Organization entity
   - Company information (name, industry, website, email, phone)
   - Address (address, city, state, country)
   - Contact person details
   - Service requirements (Website Dev, Mobile App, etc.)
   - CRM info (lead_source, owner, status)
   - Relationships: One-to-Many with Contact, Deal, Task, Finance

2. **Contact** - Individual person at an account
   - Name, title, email, phone, role
   - ForeignKey to Account
   - Relationships: One-to-Many with ContactNote

3. **Deal** - Sales opportunity/pipeline item
   - Name, amount, stage (New, In Progress, Won, Lost)
   - Close date, owner user
   - ForeignKey to Account
   - Relationships: One-to-Many with Task

4. **Task** - Activity/todo item
   - Title, description, due_date
   - Priority (High, Medium, Low)
   - Status (To Do, In Progress, Done)
   - ForeignKey to Account, Deal
   - assigned_to user, tagged_users (Many-to-Many)

5. **ContactNote** - Notes/history for contacts
   - Note text, type, title
   - ForeignKey to Contact
   - Created by user, timestamp

6. **FinanceTransaction** - Financial records
   - Date, description, category, amount
   - Type (Income/Expense)
   - Owner (user)
   - Relationships: One-to-One with TransactionAudit

7. **TransactionAudit** - Audit trail for transactions
   - Financial transaction reference
   - Changes and modifications tracked
   - Created_by user, timestamp

8. **FinanceAIReport** - AI-generated financial reports/insights
   - Report data, metrics
   - Generated_by user, period
   - Timestamp and status

**ViewSets/Endpoints:**
- `GET/POST /api/v1/accounts/` - Account management
- `GET/POST /api/v1/contacts/` - Contact management
- `GET/POST /api/v1/deals/` - Deal management
- `GET/POST /api/v1/tasks/` - Task management
- `GET/POST /api/v1/contacts/{id}/notes/` - Contact notes
- `GET/POST /api/v1/finance/transactions/` - Financial transactions
- `GET /api/v1/finance/reports/` - Finance reports
- `GET /api/v1/dashboard/` - Dashboard metrics and summaries

### Settings Configuration

**Key Settings (settings.py):**

```python
# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', '127.0.0.1'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# Installed Apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'authentication',
    'core',
]

# Middleware
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # CORS support
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # ... other middleware
]

# Authentication
AUTHENTICATION_BACKENDS = ['authentication.backends.EmailBackend']  # Email-based auth
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────────┐
│      User           │
├─────────────────────┤
│ id (PK)             │
│ email (unique)      │
│ password            │
│ first_name          │
│ last_name           │
│ role                │
│ is_active           │
│ is_staff            │
│ created_at          │
│ updated_at          │
└─────────────────────┘
         │
         │ 1:N (owner)
         ▼
┌─────────────────────┐              ┌──────────────────┐
│     Account         │─────1:N─────▶│     Contact      │
├─────────────────────┤              ├──────────────────┤
│ id (PK)             │              │ id (PK)          │
│ company_name        │              │ name             │
│ industry            │              │ email            │
│ website             │              │ phone            │
│ email               │              │ account_id (FK)  │
│ phone               │              │ is_decision_maker│
│ address             │              │ created_at       │
│ city, state, country│              │ updated_at       │
│ contact_person_name │              └──────────────────┘
│ contact_person_title│                      │
│ lead_source         │                      │ 1:N
│ status              │                      ▼
│ owner_id (FK→User)  │              ┌──────────────────┐
│ created_at          │              │  ContactNote     │
│ updated_at          │              ├──────────────────┤
└─────────────────────┘              │ id (PK)          │
         │                           │ contact_id (FK)  │
         │ 1:N                       │ note             │
         ▼                           │ type             │
┌─────────────────────┐              │ title            │
│      Deal           │              │ created_by (FK)  │
├─────────────────────┤              │ created_at       │
│ id (PK)             │              └──────────────────┘
│ name                │
│ amount              │
│ stage               │
│ close_date          │
│ account_id (FK)     │
│ owner_id (FK→User)  │
│ created_at          │
│ updated_at          │
└─────────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────────┐
│       Task          │
├─────────────────────┤
│ id (PK)             │
│ title               │
│ description         │
│ due_date            │
│ priority            │
│ status              │
│ account_id (FK)     │
│ deal_id (FK)        │
│ assigned_to (FK)    │
│ tagged_users (M:M)  │
│ created_at          │
│ updated_at          │
└─────────────────────┘

┌──────────────────────────┐
│ FinanceTransaction       │
├──────────────────────────┤
│ id (PK)                  │
│ date                     │
│ description              │
│ category                 │
│ amount                   │
│ type (Income/Expense)    │
│ owner_id (FK→User)       │
│ created_at               │
│ updated_at               │
└──────────────────────────┘
         │
         │ 1:1
         ▼
┌──────────────────────────┐
│  TransactionAudit        │
├──────────────────────────┤
│ id (PK)                  │
│ transaction_id (FK)      │
│ changes (JSON)           │
│ created_by (FK→User)     │
│ timestamp                │
└──────────────────────────┘

┌──────────────────────────┐
│  FinanceAIReport         │
├──────────────────────────┤
│ id (PK)                  │
│ report_data (JSON)       │
│ metrics (JSON)           │
│ generated_by (FK→User)   │
│ period                   │
│ created_at               │
└──────────────────────────┘

┌──────────────────────────┐
│  RolePermission          │
├──────────────────────────┤
│ id (PK)                  │
│ role (unique)            │
│ modules (JSON - list)    │
│ updated_at               │
└──────────────────────────┘

┌──────────────────────────┐
│  AuditLog                │
├──────────────────────────┤
│ id (PK)                  │
│ user_id (FK)             │
│ action                   │
│ ip_address               │
│ timestamp                │
│ details (JSON)           │
└──────────────────────────┘
```

---

## API Design

### API Versioning & Base URL

```
Base URL: http://backend-domain/api/v1/
Protocol: REST with JSON
Authentication: Token/Session-based (HTTP Only Cookies)
CORS: Enabled for frontend domain
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login/` | User login | No |
| POST | `/auth/logout/` | User logout | Yes |
| GET | `/auth/me/` | Get current user | Yes |
| POST | `/auth/forgot-password/` | Request password reset | No |
| POST | `/auth/reset-password/` | Reset password with token | No |
| GET | `/auth/users/` | List all users | Yes (Admin) |
| POST | `/auth/users/create/` | Create new user | Yes (Admin) |
| GET | `/auth/users/permissions/` | Get role permissions | Yes |

### Core Endpoints

| Resource | GET | POST | PUT/PATCH | DELETE |
|----------|-----|------|-----------|--------|
| `/accounts/` | List | Create | - | - |
| `/accounts/{id}/` | Retrieve | - | Update | Delete |
| `/accounts/{id}/contacts/` | List contacts | Create | - | - |
| `/accounts/{id}/deals/` | List deals | Create | - | - |
| `/accounts/{id}/tasks/` | List tasks | Create | - | - |
| `/contacts/` | List | Create | - | - |
| `/contacts/{id}/` | Retrieve | - | Update | Delete |
| `/contacts/{id}/notes/` | List notes | Create | - | Delete |
| `/deals/` | List | Create | - | - |
| `/deals/{id}/` | Retrieve | - | Update | Delete |
| `/deals/{id}/tasks/` | List tasks | Create | - | - |
| `/tasks/` | List | Create | - | - |
| `/tasks/{id}/` | Retrieve | - | Update | Delete |
| `/finance/transactions/` | List | Create | - | - |
| `/finance/transactions/{id}/` | Retrieve | - | Update | Delete |
| `/finance/reports/` | List | - | - | - |
| `/dashboard/` | Get metrics | - | - | - |

### Request/Response Format

**Request Example:**
```json
POST /api/v1/accounts/
{
  "company_name": "Tech Startup Inc",
  "industry": "Technology",
  "website": "https://techstartup.com",
  "email": "contact@techstartup.com",
  "phone": "+1-555-0100",
  "address": "123 Tech Ave",
  "city": "San Francisco",
  "state": "CA",
  "country": "USA",
  "contact_person_name": "John Smith",
  "contact_person_title": "CEO",
  "lead_source": "Referral",
  "service_requirement": "Website Development",
  "status": "Active"
}
```

**Response Example (201 Created):**
```json
{
  "id": 1,
  "company_name": "Tech Startup Inc",
  "industry": "Technology",
  "website": "https://techstartup.com",
  "email": "contact@techstartup.com",
  "phone": "+1-555-0100",
  "status": "Active",
  "owner": 5,
  "owner_name": "John Doe",
  "created_at": "2026-02-08T10:30:00Z",
  "updated_at": "2026-02-08T10:30:00Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Invalid request",
  "details": {
    "company_name": ["This field is required."],
    "email": ["Enter a valid email address."]
  }
}
```

---

## Authentication & Authorization

### Authentication Flow

```
┌─────────────┐
│   Frontend  │
└──────┬──────┘
       │
       │ 1. POST /auth/login/ (email, password)
       ▼
┌──────────────────────────────────────┐
│         Backend (Django)             │
│  - Authenticate credentials          │
│  - Create session/token              │
│  - Set HTTP-Only Cookie              │
└──────┬───────────────────────────────┘
       │
       │ 2. Set-Cookie: sessionid=xxx
       ▼
┌─────────────────────────────────────┐
│    Frontend (React)                 │
│ - Store auth state in Context       │
│ - Store user info                   │
│ - Subsequent requests include cookies│
└─────────────────────────────────────┘
       │
       │ 3. GET /auth/me/ (with cookie)
       ▼
┌──────────────────────────────────┐
│  Backend                         │
│ - Validate session/token         │
│ - Return user details + role     │
└──────────────────────────────────┘
```

### Authorization (Role-Based Access Control)

**Role Hierarchy:**
- `ADMIN` - Full system access
- `MANAGER` - Team and account management
- `SALES` - Sales-focused features (deals, contacts)
- `FINANCE_MANAGER` - Finance module access
- `SUPPORT` - Limited access to accounts and contacts

**Permission System:**
- Roles are defined in `RolePermission` model (JSON-based modules)
- Modules: `['dashboard', 'accounts', 'contacts', 'deals', 'tasks', 'finance', 'reports']`
- Implemented via custom Django permission classes in `authentication/permissions.py`

**Example Permission Check:**
```python
class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'ADMIN'

class HasModuleAccess(permissions.BasePermission):
    def has_permission(self, request, view):
        module = view.module_name  # Set on ViewSet
        role_perms = RolePermission.objects.get(role=request.user.role)
        return module in role_perms.modules
```

### Frontend Authorization

- **ProtectedRoute Component** - Wraps routes requiring authentication
- **Permission Service** - Checks user role and module access
- **Conditional UI Rendering** - Show/hide features based on user role
- **API Interceptor** - Handles 401/403 responses and redirects to login

---

## Data Flow

### Account Creation Flow

```
1. Frontend (CRM)
   └─ User fills form: Company details, contact info, service requirement
   
2. Form Validation
   └─ Client-side validation with React Hook Form
   
3. Submit to Backend
   └─ POST /api/v1/accounts/
      └─ Axios with auth token/cookie
      
4. Backend Processing
   └─ authentication/permissions.py checks user is authenticated
   └─ core/serializers.py validates data
   └─ core/models.py Account.objects.create()
   └─ Auto-assigns owner to current user
   
5. Response to Frontend
   └─ Return 201 Created with account data
   
6. Frontend Update
   └─ React Query invalidates and refetches account list
   └─ UI updates to show new account
   └─ Navigation to account detail view
```

### Deal Pipeline Update Flow

```
1. Frontend (CRM)
   └─ User drags deal card to different stage
   
2. Drag Event Handler
   └─ Update local state optimistically
   └─ Call dealAPI.updateDeal(dealId, { stage: "In Progress" })
   
3. API Request
   └─ PUT /api/v1/deals/{id}/
      └─ AuthContext provides token
      
4. Backend Processing
   └─ Validate permission (user owns deal or is manager)
   └─ Update Deal.stage field
   └─ Create audit log entry
   └─ Return 200 OK with updated deal
   
5. Frontend Update
   └─ React Query updates cache
   └─ UI re-renders with new stage
   └─ Toast notification shown to user
   
6. Real-time Updates (future enhancement)
   └─ Could use WebSocket for live updates across team
```

### Financial Reporting Flow

```
1. Frontend (Finance Dashboard)
   └─ User select period (month, quarter, year)
   └─ Call financeService.getTransactions({ period: "month" })
   
2. Backend Query
   └─ GET /api/v1/finance/transactions/?period=month
   └─ Filter FinanceTransaction by date range
   └─ Exclude transactions from other users
   
3. Data Processing
   └─ Aggregate by category
   └─ Calculate totals and percentages
   └─ Generate charts data
   
4. Backend Response
   └─ Return transactions array with totals
   
5. Frontend Rendering
   └─ Recharts displays line, bar, pie charts
   └─ Ant Design tables show transaction details
   
6. AI Report Generation (Optional)
   └─ Backend can generate FinanceAIReport
   └─ Call financeService.generateReport()
   └─ Display insights and recommendations
```

---

## Deployment Structure

### Development Environment

```
Local Machine
├── Frontend (React Dev Server)
│   ├── npm start / npm run dev
│   ├── Hot Module Replacement (HMR)
│   └── Runs on http://localhost:3000
│
└── Backend (Django Development Server)
    ├── python manage.py runserver
    ├── Auto-reload on file changes
    └── Runs on http://localhost:8000
```

### Production Environment Structure

```
┌─────────────────────────────────────┐
│         CDN / Static Assets         │
│      (CSS, JS, Images)              │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│    Web Server (Nginx/Apache)        │
├─────────────────────────────────────┤
│ - Serve React frontend (SPA)        │
│ - Proxy /api/* to backend           │
│ - HTTPS/SSL termination             │
│ - Compression (gzip)                │
└──────────────┬──────────────────────┘
               │
      ┌────────┴─────────┐
      │                  │
┌─────▼─────────┐  ┌─────▼──────────┐
│ Django App 1  │  │ Django App 2   │
│   (Gunicorn)  │  │  (Gunicorn)    │
└─────┬─────────┘  └─────┬──────────┘
      │                  │
      └────────┬─────────┘
               │
     ┌─────────▼─────────┐
     │  PostgreSQL DB    │
     │ (Primary/Replica) │
     └───────────────────┘
```

### Environment Variables

**Backend (.env):**
```
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

DB_ENGINE=django.db.backends.postgresql
DB_NAME=quadravise_db
DB_USER=postgres
DB_PASSWORD=secure_password
DB_HOST=db.yourdomain.com
DB_PORT=5432

CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

ENVIRONMENT=production
```

**Frontend (.env):**
```
REACT_APP_API_URL=https://api.yourdomain.com/api/v1
REACT_APP_ENVIRONMENT=production
```

### Build & Deploy Process

**Frontend:**
```bash
# Build production bundle
npm run build
# Output: build/ directory with optimized React SPA

# Deploy to CDN/Hosting
- Upload contents of build/ to web server
- Configure web server to serve index.html for all routes (SPA routing)
```

**Backend:**
```bash
# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate

# Start with Gunicorn
gunicorn quadravise_backend.wsgi:application --workers 4 --bind 0.0.0.0:8000
```

---

## Key Features & Components

### Marketing Website Features
- ✅ Responsive design (mobile-first)
- ✅ SEO-optimized pages
- ✅ Cookie consent management
- ✅ Contact form integration
- ✅ Blog/case study sections
- ✅ Service showcase pages
- ✅ Team/about page

### CRM Features
- ✅ Account management (companies)
- ✅ Contact management (people)
- ✅ Deal pipeline tracking
- ✅ Task management and assignment
- ✅ Activity/note tracking
- ✅ Financial transaction tracking
- ✅ Audit logging
- ✅ Role-based access control
- ✅ Dashboard with analytics
- ✅ Reporting and AI insights (optional)

### Security Features
- ✅ Custom user model with email authentication
- ✅ Password encryption and validation
- ✅ Password reset with time-limited tokens
- ✅ CORS protection
- ✅ CSRF token handling
- ✅ Session-based authentication
- ✅ Role-based authorization
- ✅ Audit logging for all actions
- ✅ IP address tracking

---

## Development Tools & Scripts

### Frontend Development
```bash
npm start              # Start dev server with HMR
npm run build          # Build production bundle
npm test               # Run unit tests
npm run eject          # Eject from create-react-app (not recommended)
```

### Backend Development
```bash
# Setup
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Database
python manage.py migrate                    # Run migrations
python manage.py makemigrations             # Create new migrations
python manage.py createsuperuser            # Create admin user
python manage.py shell                      # Django shell

# Server
python manage.py runserver                  # Dev server on :8000
python manage.py test                       # Run tests
python manage.py dumpdata > backup.json     # Backup data
```

### Admin Scripts
```bash
# Reset admin user
python backend/reset_backend_admin.py

# Run server with batch file (Windows)
backend/run_server.bat

# Reset admin via batch
reset_admin.bat
```

---

## Future Enhancements

1. **Real-time Collaboration**
   - WebSocket integration for live notifications
   - Real-time task and deal updates

2. **Advanced Analytics**
   - Predictive sales forecasting
   - Customer lifetime value calculations
   - Churn prediction

3. **Integrations**
   - Email integration (Gmail, Outlook)
   - Calendar sync
   - Third-party tools (Slack, Zapier)

4. **Mobile App**
   - React Native or Flutter for iOS/Android

5. **Advanced Reporting**
   - Scheduled report generation
   - Email delivery of reports
   - Custom report builder

6. **AI Features**
   - Automated lead scoring
   - Intelligent meeting scheduling
   - Smart email suggestions

---

## Conclusion

Quadravise is a well-structured full-stack application with:
- **Clear separation of concerns** between frontend and backend
- **RESTful API design** for clean data communication
- **Role-based access control** for security
- **Scalable architecture** ready for growth
- **Modern tech stack** (React + Django REST)
- **Database-driven** with PostgreSQL for reliability

The architecture supports both marketing/public-facing content and internal CRM operations, making it a versatile platform for a web development agency.

---

**Document Version:** 1.0  
**Last Updated:** February 8, 2026  
**Maintained By:** Development Team
