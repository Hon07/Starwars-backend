import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../component/index.css';

const EntityDetails = ({ match }) => {
  const [entity, setEntity] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const entityType = match.params.entityType;
  const entityId = match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://swapi.tech/api/${entityType}/${entityId}`);
      setEntity(response.data.result.properties);
    };
    fetchData();
  }, [entityType, entityId]);

  if (!entity) return <div>Loading...</div>;

  const imagePath = `https://starwars-visualguide.com/assets/img/${entityType}/${entityId}.jpg`;

  const handleDetailsClick = () => {
    setShowDetails(true);
  };

  const handleCloseClick = () => {
    setShowDetails(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={imagePath} className="img-fluid" alt={entity.name} />
        </div>
        <div className="col-md-6">
          <h2>{entity.name}</h2>
          <button className="btn btn-primary mb-3" onClick={handleDetailsClick}>View Details</button>
          {showDetails && (
            <div className="entity-details">
              {Object.entries(entity).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.replace('_', ' ')}:</strong> {value}
                </p>
              ))}
              <button className="btn btn-secondary" onClick={handleCloseClick}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityDetails;
