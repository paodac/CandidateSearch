import { useEffect, useState } from 'react';
import '../styles/SavedCandidates.css'

interface GithubUser {
  avatar_url: string;
  login: string;
  location: string | null;
  email: string | null;
  company: string | null;
  bio: string | null;
  html_url: string; // Incluimos el link al perfil de GitHub
}

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<GithubUser[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidate');
    if (saved) {
      setSavedCandidates(JSON.parse(saved) as GithubUser[]);
    }
  }, []);

  const handleRemoveCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== login
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidate', JSON.stringify(updatedCandidates));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>GitHub Profile</th>
              <th>Remove</th> {/* Nueva columna para el botón */}
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    style={{ width: '50px', borderRadius: '50%' }}
                  />
                </td>
                <td>{candidate.login}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>{candidate.bio || 'N/A'}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveCandidate(candidate.login)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '5px 10px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
