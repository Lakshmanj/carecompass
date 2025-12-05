import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [resources, setResources] = useState([]);
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('');

  // Fetch resources from your API
  useEffect(() => {
    const params = {};
    if (category) params.category = category;
    if (urgency) params.urgency = urgency;

    axios.get('http://localhost:5000/api/resources', { params })
      .then(res => setResources(res.data))
      .catch(err => console.error(err));
  }, [category, urgency]);

  return (
    <div className="container">
      <h2>Find Mental Health Support</h2>
      
      {/* Search Filters (U-01) */}
      <div className="filters">
        <select onChange={e => setCategory(e.target.value)} value={category}>
          <option value="">All Topics</option>
          <option value="Anxiety">Anxiety</option>
          <option value="Depression">Depression</option>
          <option value="Stress">Stress</option>
          <option value="Crisis">Crisis</option>
        </select>
        
        <select onChange={e => setUrgency(e.target.value)} value={urgency}>
          <option value="">All Urgency Levels</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Resource List */}
      {resources.length === 0 ? <p>No resources found matching filters.</p> : null}
      
      {resources.map(r => (
        <div key={r._id} className="card">
          <h3>{r.title}</h3>
          <p>{r.description}</p>
          <div>
            <span className={`tag Urgency-${r.urgency}`}>{r.urgency} Urgency</span>
            <span className="tag Category">{r.category}</span>
          </div>
          <a href={r.link} target="_blank" rel="noreferrer" style={{display:'block', marginTop:'15px', color:'#3498db', fontWeight:'bold'}}>
            Visit Resource &rarr;
          </a>
        </div>
      ))}
    </div>
  );
}

// purpose of the page - this page is particularly going to cover the user story U-01: Filtering Resources