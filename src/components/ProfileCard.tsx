import '../styles/ProfileCard.css'; 

interface ProfileCardProps {
  avatar: string;
  userName: string;
  location?: string | null;
  email?: string | null;
  company?: string | null;
  bio?: string | null;
}

export default function ProfileCard({ avatar, userName, location, email, company, bio }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <img className="profile-avatar" src={avatar} alt={userName} />
      <div className="profile-info">
        <h2>{userName}</h2>
        <p><strong>Location:</strong> {location || "N/A"}</p>
        <p><strong>Email:</strong> {email || "N/A"}</p>
        <p><strong>Company:</strong> {company || "N/A"}</p>
        <p><strong>Bio:</strong> {bio || "N/A"}</p>
      </div>
    </div>
  );
}

