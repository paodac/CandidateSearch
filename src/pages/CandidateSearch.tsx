import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import ProfileCard from '../components/ProfileCard';
import '../styles/ProfileCard.css'

interface GithubUser {
  avatar_url: string;
  login: string;
  location: string | null;
  email: string | null;
  company: string | null;
  bio: string | null;
}

const CandidateSearch = () => {
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState<GithubUser|null>(null); // Add a state to store the user data
  const [savedCandidates, setSavedCandidates] = useState<GithubUser[]>(() => {
    const saved = localStorage.getItem('savedCandidate');
    return saved ? JSON.parse(saved) as GithubUser[] : [];
  });
  

  const searchUser = async () => {
    try {
      const data = await searchGithub();
      if (data && data[index]) { // Check if data is valid and index is within bounds
        const userData = await searchGithubUser(data[index].login);
        setUser(userData); // Update the user state
        console.log(userData);
      } else {
        console.error("Invalid index or data is undefined");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    searchUser();
  }, [index]);

  const handleSaveCandidate = () => {
    if (user) {
      const currentCandidates= [...savedCandidates, user]
      setSavedCandidates(currentCandidates)
      localStorage.setItem('savedCandidate', JSON.stringify(currentCandidates))
      setIndex(index + 1); // Pasar al siguiente candidato
    }
  };

  const handleSkipCandidate = () => {
    setIndex(index + 1); // Simplemente pasar al siguiente candidato
  };
  
  return (
    <div style={{ textAlign: 'center' }}>
    <h1>Candidate Search</h1>
    {user ? (
      <>
        <ProfileCard
          avatar={user.avatar_url}
          userName={user.login}
          location={user.location}
          email={user.email}
          company={user.company}
          bio={user.bio}
        />
        <div className="action-buttons">
          <button
            onClick={handleSkipCandidate}
            className="action-button skip"
          >
            -
          </button>
          <button
            onClick={handleSaveCandidate}
            className="action-button save"
          >
            +
          </button>
        </div>
      </>
    ) : (
      <p>No more candidates available.</p>
    )}
  </div>
);
};

export default CandidateSearch;

  // return (
  //   <div>
  //     <h1>CandidateSearch</h1>
  //    {user && <ProfileCard avatar={user.avatar_url} userName= {user.login} location={user.location} email={user.email} company={user.company} bio={user.bio}/>}
      {/* {user && <pre>{JSON.stringify(user, null, 2)}</pre>}  */}
//     </div>
//   );
// };

// export default CandidateSearch;
