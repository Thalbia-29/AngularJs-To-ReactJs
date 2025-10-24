import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TemplateList from './components/TemplateList';
import PaymentPage from './components/Payment/PaymentPage';
import LogIn from './components/Login/LogIn';
 import { AuthProvider } from './components/Context/AuthContext';
 import Register from './components/Login/Register.jsx';
import Layout from './components/Header/Layout.jsx';
import Header from './components/Header/Header';

function App() {
  return (
      <Router>
        <div className="containerr">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LogIn />} />
            <Route element={<Layout />}>
             <Route path="/register" element={<Register />} />
            <Route path="/templates" element={<TemplateList />} />
            <Route path="/payment/:templateId" element={<PaymentPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;

//  return (

      
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<LogIn />} />

//         <Route element={<Layout />}>
//           <Route path="/home" element={<Home />} />
//           <Route path="/welcome" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//         </Route>

//         <Route path="/" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </BrowserRouter>
 
//   );
