# Template Selling Website - Frontend Only

This AngularJS application has been modified to run independently without the REST-WebAPI backend.

## Changes Made

### 1. Authentication (Hardcoded)
- **File**: `app/app.service.js`
- **Changes**: Replaced backend authentication with hardcoded credentials
- **Demo Credentials**:
  - Username: `admin`, Password: `password`

### 2. Contact Form (Mocked)
- **File**: `app/components/Contact/ContactService.js`
- **Changes**: Contact form now returns a mock success response instead of calling the backend

### 3. Payment Processing (Mocked)
- **File**: `app/components/Selling/SellingService.js`
- **Changes**: Payment processing now returns a mock success response with a fake transaction ID

### 4. API Constants (Commented)
- **File**: `app/app.constants.js`
- **Changes**: All API URLs are marked as not used since backend calls are disabled

## How to Run

### Option 1: Direct Browser Opening
1. Open `standalone.html` directly in your web browser
2. The application will load with a demo notice showing available credentials

### Option 2: Local Web Server (Recommended)
1. Navigate to the project directory:
   ```bash
   cd /path/to/AngularJS-Project/AngularJS-Project/AngularJS-Project
   ```

2. Start a simple HTTP server:
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Using Python 2
   python -m SimpleHTTPServer 8080
   
   # Using Node.js (if you have http-server installed)
   npx http-server -p 8080
   ```

3. Open your browser and navigate to:
   - `http://localhost:8080/standalone.html` (for standalone version)
   - `http://localhost:8080/app/index.html` (for original version)

## Features Available

- ✅ **Login System**: Use any of the demo credentials to authenticate
- ✅ **Template Browsing**: View available templates with mock data
- ✅ **Contact Form**: Submit contact requests (returns success message)
- ✅ **Payment Gateway**: Process payments (returns mock transaction ID)
- ✅ **Navigation**: Full navigation between different sections

## Demo Credentials

| Username | Password | Description |
|----------|----------|-------------|
| admin    | password | Single demo account |

## Technical Notes

- All backend API calls have been replaced with mock responses
- The application maintains the same user interface and flow
- Template data is still loaded from the local JSON file
- All AngularJS routing and components remain functional
- Bootstrap CSS is loaded from CDN for better compatibility

## Troubleshooting

- If you see CORS errors, use Option 2 (local web server) instead of opening files directly
- Make sure all JavaScript files are loading correctly by checking the browser console
- The application requires an internet connection for Bootstrap CSS and AngularJS libraries
