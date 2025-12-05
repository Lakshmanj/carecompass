import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'General', urgency: 'Low', link: ''
  });

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) navigate('/login');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/resources', formData);
      alert('Resource Added Successfully!');
      setFormData({ title: '', description: '', category: 'General', urgency: 'Low', link: '' });
    } catch (err) {
      alert('Error adding resource. Check server console.');
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div className="card">
        <h3>Add New Resource Entry</h3>
        <form onSubmit={handleSubmit}>
          <label>Resource Title</label>
          <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          
          <label>Description</label>
          <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          
          <div style={{display:'flex', gap:'20px'}}>
            <div style={{flex:1}}>
              <label>Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="General">General</option>
                <option value="Anxiety">Anxiety</option>
                <option value="Depression">Depression</option>
                <option value="Stress">Stress</option>
                <option value="Crisis">Crisis</option>
              </select>
            </div>
            <div style={{flex:1}}>
              <label>Urgency Level</label>
              <select value={formData.urgency} onChange={e => setFormData({...formData, urgency: e.target.value})}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <label>External Link URL</label>
          <input type="url" placeholder="https://..." value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} required />

          <button type="submit">Add Resource to Database</button>
        </form>
      </div>
    </div>
  );
}


// purpose of the page - this page is particularly going to cover the user story U-04: Adding a Resource