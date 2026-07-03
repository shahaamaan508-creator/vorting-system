import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Home/Hero';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import VotingBooth from './components/Voting/VotingBooth';
import ElectionResults from './components/Results/ElectionResults';
import LivePolls from './components/LivePolls/LivePolls';
import Analytics from './components/Analytics/Analytics';
import HistoricalData from './components/Historical/HistoricalData';
import Reports from './components/Reports/Reports';
import Notes from './components/Notes/Notes';
import Settings from './components/Settings/Settings';
import Construction from './components/Construction/Construction';
import VoterEducation from './components/Education/VoterEducation';
import ElectionCalendar from './components/Calendar/ElectionCalendar';
import Feedback from './components/Support/Feedback';
import Contact from './components/Support/Contact';
import HelpUs from './components/Support/HelpUs';
import ResetPassword from './components/Auth/ResetPassword';
import ElectionObserver from './components/Volunteer/ElectionObserver';
import DigitalAmbassador from './components/Volunteer/DigitalAmbassador';
import CommunityEducator from './components/Volunteer/CommunityEducator';
import GetStarted from './components/GetStarted/GetStarted';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/voting" element={<VotingBooth />} />
              <Route path="/results" element={<ElectionResults />} />
              <Route path="/live-polls" element={<LivePolls />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/historical" element={<HistoricalData />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/construction" element={<Construction />} />
              <Route path="/education" element={<VoterEducation />} />
              <Route path="/calendar" element={<ElectionCalendar />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help-us" element={<HelpUs />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/volunteer/election-observer" element={<ElectionObserver />} />
              <Route path="/volunteer/digital-ambassador" element={<DigitalAmbassador />} />
              <Route path="/volunteer/community-educator" element={<CommunityEducator />} />
              <Route path="/get-started" element={<GetStarted />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;